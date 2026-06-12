import "node:module";
import { isMainThread, parentPort, threadId } from "node:worker_threads";
import { AsyncLocalStorage, createHook } from "node:async_hooks";
import { existsSync, promises } from "node:fs";
import { __webpack_require__ } from "./0~rslib-runtime.js";
import "./8898.js";
import { basename, ENV, getFileTaskId, dirname, pathe_M_eThtNZ_resolve, globalApis, getTaskNameWithPrefix, isAbsolute, color as logger_color, join } from "./2366.js";
import { formatTestError, getRealTimers, setRealTimers } from "./977.js";
import { wrapWorkerResponse, isRpcEnvelope, isWorkerRequestEnvelope, createBirpc, wrapRpc, serializeError } from "./8549.js";
import { PhaseTracker } from "./7377.js";
import { createRequire as __rspack_createRequire } from "node:module";
const __rspack_createRequire_require = __rspack_createRequire(import.meta.url);
__webpack_require__.add({
    util (module) {
        module.exports = __rspack_createRequire_require("node:util");
    },
    timers (module) {
        module.exports = __rspack_createRequire_require("timers");
    },
    "timers/promises" (module) {
        module.exports = __rspack_createRequire_require("timers/promises");
    }
});
class BaseChannel {
    send(envelope) {
        try {
            this.post(envelope);
        } catch  {}
    }
    on(handler) {
        this.source.on('message', handler);
    }
    off(handler) {
        this.source.off('message', handler);
    }
}
class ForksChannel extends BaseChannel {
    source = process;
    processSend = process.send?.bind(process);
    post(envelope) {
        if (!this.processSend) return;
        this.processSend(envelope);
    }
}
class ThreadsChannel extends BaseChannel {
    source = parentPort;
    post(envelope) {
        this.source.postMessage(envelope);
    }
}
const channels_kind = isMainThread || null === parentPort ? 'forks' : 'threads';
const createChannel = (kind)=>{
    switch(kind){
        case 'forks':
            return new ForksChannel();
        case 'threads':
            return new ThreadsChannel();
        default:
            {
                const _exhaustive = kind;
                throw new Error(`Unknown channel kind: ${String(_exhaustive)}`);
            }
    }
};
const channel = createChannel(channels_kind);
const MAX_LEAKS_TO_REPORT = 20;
const IGNORED_ASYNC_RESOURCE_TYPES = new Set([
    'PROMISE',
    'TickObject',
    'Microtask',
    'CustomGC',
    'DNSCHANNEL',
    'ELDHISTOGRAM',
    'FILEHANDLE',
    'PerformanceObserver',
    'PIPEWRAP',
    'PROCESSWRAP',
    'RANDOMBYTESREQUEST',
    'SIGNREQUEST',
    'WORKER',
    'ZLIB',
    'STREAM_END_OF_STREAM',
    'napi_js_callback',
    'napi_rs_threadsafe_function',
    'delete_reference',
    'delete_reference_ts_fn'
]);
const formatLeakTaskName = (task)=>{
    if (!task) return 'unknown task';
    if ('file' === task.taskType) return 'file setup';
    return getTaskNameWithPrefix({
        name: task.taskName ?? '',
        parentNames: task.taskParentNames
    });
};
const isHasRefResource = (resource)=>'object' == typeof resource && null !== resource && 'hasRef' in resource && 'function' == typeof resource.hasRef;
const isIgnorableActiveResource = (leak)=>{
    const resource = leak.resourceRef?.deref();
    return void 0 !== leak.resourceRef && resource?.hasRef() !== true;
};
const getCreationStack = ()=>{
    const stack = new Error('Async resource was created here').stack;
    if (!stack) return;
    return stack.split('\n').filter((line)=>!line.includes('runtime/worker/asyncLeaks')).join('\n');
};
const createLeakError = (leak)=>{
    const taskName = formatLeakTaskName(leak.task);
    return {
        name: 'AsyncLeakError',
        message: `Detected async leak: ${leak.type} was still active after ${taskName} finished.`,
        stack: leak.stack
    };
};
const createAsyncLeakDetector = (taskContext)=>{
    const activeResources = new Map();
    const hook = createHook({
        init (asyncId, type, _triggerAsyncId, resource) {
            if (IGNORED_ASYNC_RESOURCE_TYPES.has(type)) return;
            const task = taskContext.getCurrent();
            if (!task) return;
            activeResources.set(asyncId, {
                type,
                task: {
                    ...task
                },
                stack: getCreationStack(),
                resourceRef: isHasRefResource(resource) ? new WeakRef(resource) : void 0
            });
        },
        destroy (asyncId) {
            activeResources.delete(asyncId);
        },
        promiseResolve (asyncId) {
            activeResources.delete(asyncId);
        }
    });
    return {
        enable: ()=>{
            activeResources.clear();
            hook.enable();
        },
        async collectErrors () {
            const { setImmediate: realSetImmediate, setTimeout: realSetTimeout } = getRealTimers();
            await new Promise((resolve)=>(realSetImmediate ?? globalThis.setImmediate)(resolve));
            await new Promise((resolve)=>(realSetTimeout ?? globalThis.setTimeout)(resolve, 0));
            hook.disable();
            return Array.from(activeResources.values()).filter((leak)=>!isIgnorableActiveResource(leak)).slice(0, MAX_LEAKS_TO_REPORT).map(createLeakError);
        },
        disable: ()=>{
            hook.disable();
            activeResources.clear();
        }
    };
};
const environmentLoaders = {
    jsdom: ()=>import("./0~jsdom.js"),
    'happy-dom': ()=>import("./0~happyDom.js")
};
function createWorkerRpcOptions({ dispose = [] }) {
    return {
        post (v) {
            channel.send(wrapRpc(v));
        },
        on (fn) {
            const handler = (message, ...extras)=>{
                if (!isRpcEnvelope(message)) return;
                return fn(message.payload, ...extras);
            };
            channel.on(handler);
            dispose.push(()=>channel.off(handler));
        }
    };
}
function createRuntimeRpc(options, createBirpcImpl = createBirpc) {
    const rpc = createBirpcImpl({}, {
        ...options,
        timeout: -1
    });
    return {
        rpc
    };
}
const getBufferedLogTaskId = (log)=>{
    if (log.taskId) return log.taskId;
    return getFileTaskId(log.testPath);
};
const getSuiteChainKey = (names)=>names.join('\u0000');
const pushTaskId = (taskIds, taskId)=>{
    if (!taskIds.includes(taskId)) taskIds.push(taskId);
};
const createSilentConsoleController = ({ runtimeConfig, emitInterceptedLog, writeOriginalLog })=>{
    const bufferedConsoleLogs = new Map();
    const suiteIdsByChain = new Map();
    const emitLog = (log)=>{
        if (runtimeConfig.disableConsoleIntercept) return void writeOriginalLog({
            content: `${log.content}\n`,
            type: log.type
        });
        emitInterceptedLog(log);
    };
    return {
        onConsoleLog (log) {
            if (true === runtimeConfig.silent) return;
            if ('passed-only' === runtimeConfig.silent) {
                const taskId = getBufferedLogTaskId(log);
                const logs = bufferedConsoleLogs.get(taskId) || [];
                logs.push(log);
                bufferedConsoleLogs.set(taskId, logs);
                if ('suite' === log.taskType && log.taskId) suiteIdsByChain.set(getSuiteChainKey([
                    ...log.taskParentNames || [],
                    log.taskName || ''
                ]), log.taskId);
                return;
            }
            emitLog(log);
        },
        flushBufferedLogsForTask ({ taskId, status, taskParentNames, taskType, testPath }) {
            if ('fail' !== status) return void bufferedConsoleLogs.delete(taskId);
            const taskIdsToFlush = [];
            if ('case' === taskType) {
                pushTaskId(taskIdsToFlush, getFileTaskId(testPath));
                const suiteNames = taskParentNames || [];
                for(let i = 0; i < suiteNames.length; i++){
                    const suiteId = suiteIdsByChain.get(getSuiteChainKey(suiteNames.slice(0, i + 1)));
                    if (suiteId) pushTaskId(taskIdsToFlush, suiteId);
                }
                pushTaskId(taskIdsToFlush, taskId);
            }
            if ('suite' === taskType) {
                pushTaskId(taskIdsToFlush, getFileTaskId(testPath));
                pushTaskId(taskIdsToFlush, taskId);
            }
            if ('file' === taskType) pushTaskId(taskIdsToFlush, taskId);
            for (const bufferedTaskId of taskIdsToFlush){
                const logs = bufferedConsoleLogs.get(bufferedTaskId);
                if (logs) {
                    bufferedConsoleLogs.delete(bufferedTaskId);
                    for (const log of logs)emitLog(log);
                }
            }
        }
    };
};
class NodeSnapshotEnvironment {
    constructor(options = {}){
        this.options = options;
    }
    getVersion() {
        return "1";
    }
    getHeader() {
        return `// Snapshot v${this.getVersion()}`;
    }
    async resolveRawPath(testPath, rawPath) {
        return isAbsolute(rawPath) ? rawPath : pathe_M_eThtNZ_resolve(dirname(testPath), rawPath);
    }
    async resolvePath(filepath) {
        return join(join(dirname(filepath), this.options.snapshotsDirName ?? "__snapshots__"), `${basename(filepath)}.snap`);
    }
    async prepareDirectory(dirPath) {
        await promises.mkdir(dirPath, {
            recursive: true
        });
    }
    async saveSnapshotFile(filepath, snapshot) {
        await promises.mkdir(dirname(filepath), {
            recursive: true
        });
        await promises.writeFile(filepath, snapshot, "utf-8");
    }
    async readSnapshotFile(filepath) {
        if (!existsSync(filepath)) return null;
        return promises.readFile(filepath, "utf-8");
    }
    async removeSnapshotFile(filepath) {
        if (existsSync(filepath)) await promises.unlink(filepath);
    }
}
class RstestSnapshotEnvironment extends NodeSnapshotEnvironment {
    resolveSnapshotPath;
    constructor(options){
        super();
        this.resolveSnapshotPath = options.resolveSnapshotPath;
    }
    getHeader() {
        return `// Rstest Snapshot v${this.getVersion()}`;
    }
    resolvePath(filepath) {
        return this.resolveSnapshotPath(filepath);
    }
}
const createNodeTaskContext = ()=>{
    const storage = new AsyncLocalStorage();
    let fallback;
    return {
        getCurrent: ()=>storage.getStore() ?? fallback,
        run: (task, fn)=>storage.run(task, fn),
        setFallback: (task)=>{
            fallback = task;
        }
    };
};
const source_map_support = __webpack_require__("../../node_modules/.pnpm/source-map-support@0.5.21/node_modules/source-map-support/source-map-support.js");
let sourceMaps = {};
const tracePid = isMainThread ? void 0 : 1000000 * process.pid + threadId;
(0, source_map_support.install)({
    environment: 'node',
    handleUncaughtExceptions: false,
    retrieveSourceMap: (source)=>{
        if (sourceMaps[source]) return {
            url: source,
            map: JSON.parse(sourceMaps[source])
        };
        return null;
    }
});
const registerGlobalApi = (api)=>globalApis.reduce((apis, key)=>{
        globalThis[key] = api[key];
        return apis;
    }, {});
const globalCleanups = [];
let isTeardown = false;
const setErrorName = (error, type)=>{
    try {
        error.name = type;
        return error;
    } catch  {
        try {
            Object.defineProperty(error, 'name', {
                value: type,
                configurable: true
            });
            return error;
        } catch  {
            const fallbackError = new Error(error.message);
            fallbackError.name = type;
            fallbackError.stack = error.stack;
            return fallbackError;
        }
    }
};
const setupEnv = (env)=>{
    if (env) Object.entries(env).forEach(([key, value])=>{
        if (void 0 === value) Reflect.deleteProperty(process.env, key);
        else process.env[key] = value;
    });
};
const createOriginalLogWriter = ()=>{
    const stdoutWrite = process.stdout.write.bind(process.stdout);
    const stderrWrite = process.stderr.write.bind(process.stderr);
    return ({ content, type })=>{
        if ('stderr' === type) return void stderrWrite(content);
        stdoutWrite(content);
    };
};
const preparePool = async ({ entryInfo: { distPath, testPath }, updateSnapshot, context }, tracker)=>{
    globalCleanups.forEach((fn)=>{
        fn();
    });
    globalCleanups.length = 0;
    const taskContext = createNodeTaskContext();
    setRealTimers();
    const cleanupFns = [];
    const disposeFns = [];
    const { rpc } = createRuntimeRpc(createWorkerRpcOptions({
        dispose: disposeFns
    }));
    globalCleanups.push(()=>{
        disposeFns.forEach((fn)=>{
            fn();
        });
        rpc.$close();
    });
    const { runtimeConfig: { globals, printConsoleTrace, disableConsoleIntercept, silent, testEnvironment, snapshotFormat, env } } = context;
    setupEnv(env);
    const shouldInterceptConsole = !disableConsoleIntercept || true === silent || 'passed-only' === silent;
    const silentConsoleController = createSilentConsoleController({
        runtimeConfig: {
            disableConsoleIntercept,
            silent
        },
        emitInterceptedLog: (log)=>{
            rpc.onConsoleLog(log).catch(()=>{});
        },
        writeOriginalLog: createOriginalLogWriter()
    });
    if (shouldInterceptConsole) {
        const { createCustomConsole } = await import("./0~console.js");
        global.console = createCustomConsole({
            onConsoleLog: (log)=>{
                silentConsoleController.onConsoleLog(log);
            },
            testPath,
            printConsoleTrace: !disableConsoleIntercept && printConsoleTrace,
            getCurrentTask: ()=>taskContext.getCurrent()
        });
    }
    const interopDefault = true;
    const workerState = {
        ...context,
        snapshotOptions: {
            updateSnapshot,
            snapshotEnvironment: new RstestSnapshotEnvironment({
                resolveSnapshotPath: (filepath)=>rpc.resolveSnapshotPath(filepath)
            }),
            snapshotFormat
        },
        distPath,
        testPath,
        environment: 'node'
    };
    const { createRstestRuntime } = await import("./0~api.js");
    const unhandledErrors = [];
    const handleError = (e, type)=>{
        const rawError = 'string' == typeof e ? new Error(e) : e;
        const error = rawError.name && 'Error' !== rawError.name ? rawError : setErrorName(rawError, type);
        if (isTeardown) {
            error.stack = `${logger_color.yellow('Caught error after test environment was torn down:')}\n\n${error.stack}`;
            console.error(error);
        } else {
            console.error(error);
            unhandledErrors.push(error);
        }
    };
    const uncaughtException = (e)=>handleError(e, 'uncaughtException');
    const unhandledRejection = (e)=>handleError(e, 'unhandledRejection');
    process.on('uncaughtException', uncaughtException);
    process.on('unhandledRejection', unhandledRejection);
    globalCleanups.push(()=>{
        process.off('uncaughtException', uncaughtException);
        process.off('unhandledRejection', unhandledRejection);
    });
    const { api, runner } = await createRstestRuntime(workerState, {
        taskContext
    });
    tracker?.transition('envSetup');
    if ('node' !== testEnvironment.name) {
        const loadEnvironment = environmentLoaders[testEnvironment.name];
        if (!loadEnvironment) throw new Error(`Unknown test environment: ${testEnvironment.name}`);
        const { environment } = await loadEnvironment();
        const { teardown } = await environment.setup(global, testEnvironment.options || {});
        cleanupFns.push(()=>teardown(global));
    }
    tracker?.transition('prepare');
    if (globals) registerGlobalApi(api);
    const rstestContext = {
        global,
        console: global.console,
        Error
    };
    rstestContext.global['@rstest/core'] = api;
    return {
        interopDefault,
        rstestContext,
        runner,
        rpc,
        silentConsoleController,
        api,
        taskContext,
        unhandledErrors,
        cleanup: async ()=>{
            await Promise.all(cleanupFns.map((fn)=>fn()));
        }
    };
};
const loadFiles = async ({ setupEntries, assetFiles, rstestContext, distPath, runtimeDistPath, testPath, interopDefault, isolate, outputModule, tracker })=>{
    const { loadModule } = outputModule ? await import("./0~loadEsModule.js") : await import("./0~loadModule.js");
    if (!isolate) await loadModule({
        codeContent: `if (global && typeof global.__rstest_clean_core_cache__ === 'function') {
  global.__rstest_clean_core_cache__();
  }`,
        distPath: '',
        testPath,
        rstestContext,
        assetFiles,
        interopDefault
    });
    tracker?.transition('setupFiles');
    for (const { distPath, testPath } of setupEntries){
        const setupCodeContent = assetFiles[distPath];
        await loadModule({
            codeContent: setupCodeContent,
            distPath,
            runtimeDistPath,
            testPath,
            rstestContext,
            assetFiles,
            interopDefault
        });
    }
    tracker?.transition('collect');
    await loadModule({
        codeContent: assetFiles[distPath],
        distPath,
        runtimeDistPath,
        testPath,
        rstestContext,
        assetFiles,
        interopDefault
    });
};
const runInPool = async (options)=>{
    isTeardown = false;
    const { entryInfo: { distPath, runtimeDistPath, testPath }, setupEntries, assets, type, context: { project, runtimeConfig: { isolate, bail, detectAsyncLeaks } } } = options;
    const cleanups = [];
    const exit = process.exit.bind(process);
    process.exit = (code = process.exitCode || 0)=>{
        throw new Error(`process.exit unexpectedly called with "${code}"`);
    };
    const kill = process.kill.bind(process);
    process.kill = (pid, signal)=>{
        if (-1 === pid || Math.abs(pid) === process.pid) throw new Error(`process.kill unexpectedly called with "${pid}" and "${signal}"`);
        return kill(pid, signal);
    };
    cleanups.push(()=>{
        process.kill = kill;
        process.exit = exit;
    });
    const teardown = async ()=>{
        await new Promise((resolve)=>getRealTimers().setTimeout(resolve));
        await Promise.all(cleanups.map((fn)=>fn()));
        if (!isolate) {
            const { clearModuleCache } = options.context.outputModule ? await import("./0~loadEsModule.js") : await import("./0~loadModule.js");
            clearModuleCache();
        }
        isTeardown = true;
    };
    let coverageProvider = null;
    if ('collect' === type) try {
        const { rstestContext, runner, rpc, cleanup, unhandledErrors, interopDefault } = await preparePool(options);
        const { assetFiles, sourceMaps: sourceMapsFromAssets } = assets || await rpc.getAssetsByEntry();
        sourceMaps = sourceMapsFromAssets;
        cleanups.push(cleanup);
        await loadFiles({
            rstestContext,
            distPath,
            runtimeDistPath,
            testPath,
            assetFiles,
            setupEntries,
            interopDefault,
            isolate,
            outputModule: options.context.outputModule
        });
        const tests = await runner.collectTests();
        return {
            project,
            testPath,
            tests,
            errors: await formatTestError(unhandledErrors)
        };
    } catch (err) {
        return {
            project,
            testPath,
            tests: [],
            errors: await formatTestError(err)
        };
    } finally{
        await teardown();
    }
    let taskContext;
    const tracker = new PhaseTracker(options.context.trace ? {
        trace: {
            testPath,
            project: options.context.project
        },
        pid: tracePid
    } : void 0);
    let runResult;
    let asyncLeakDetector;
    try {
        tracker.transition('prepare');
        const { rstestContext, runner, rpc, silentConsoleController, api, cleanup, unhandledErrors, interopDefault, taskContext: preparedTaskContext } = await preparePool(options, tracker);
        taskContext = preparedTaskContext;
        if (detectAsyncLeaks) {
            asyncLeakDetector = createAsyncLeakDetector(taskContext);
            asyncLeakDetector.enable();
        }
        if (bail && await rpc.getCountOfFailedTests() >= bail) {
            runResult = {
                testId: getFileTaskId(testPath),
                project,
                testPath,
                status: 'skip',
                name: '',
                results: []
            };
            return runResult;
        }
        if (options.context.runtimeConfig.coverage?.enabled) {
            const { createCoverageProvider } = await import("./1193.js");
            coverageProvider = await createCoverageProvider(options.context.runtimeConfig.coverage, options.context.projectRoot);
        }
        if (coverageProvider) await coverageProvider.init();
        tracker.transition('load');
        const { assetFiles, sourceMaps: sourceMapsFromAssets } = assets || await rpc.getAssetsByEntry();
        sourceMaps = sourceMapsFromAssets;
        cleanups.push(cleanup);
        rpc.onTestFileStart?.({
            testId: getFileTaskId(testPath),
            testPath,
            tests: []
        });
        taskContext.setFallback({
            taskId: getFileTaskId(testPath),
            taskType: 'file',
            testPath
        });
        try {
            await loadFiles({
                rstestContext,
                distPath,
                runtimeDistPath,
                testPath,
                assetFiles,
                setupEntries,
                interopDefault,
                isolate,
                outputModule: options.context.outputModule,
                tracker
            });
        } finally{
            taskContext.setFallback(void 0);
        }
        tracker.transition('tests');
        const results = await runner.runTests(testPath, {
            onTestFileReady: async (test)=>{
                await rpc.onTestFileReady(test);
            },
            onTestSuiteStart: async (test)=>{
                tracker.recordSuiteStart(test);
                await rpc.onTestSuiteStart(test);
            },
            onTestSuiteResult: async (result)=>{
                tracker.recordSuiteResult(result);
                silentConsoleController.flushBufferedLogsForTask({
                    taskId: result.testId,
                    status: result.status,
                    taskParentNames: result.parentNames,
                    taskType: 'suite',
                    testPath: result.testPath
                });
                await rpc.onTestSuiteResult(result);
            },
            onTestCaseStart: async (test)=>{
                tracker.recordCaseStart(test);
                await rpc.onTestCaseStart(test);
            },
            onTestCaseResult: async (result)=>{
                tracker.recordCaseResult(result);
                silentConsoleController.flushBufferedLogsForTask({
                    taskId: result.testId,
                    status: result.status,
                    taskParentNames: result.parentNames,
                    taskType: 'case',
                    testPath: result.testPath
                });
                await rpc.onTestCaseResult(result);
            },
            getCountOfFailedTests: async ()=>rpc.getCountOfFailedTests()
        }, api);
        if (asyncLeakDetector) {
            if (api.rstest.isFakeTimers()) api.rstest.useRealTimers();
            const asyncLeakErrors = await asyncLeakDetector.collectErrors();
            if (asyncLeakErrors.length > 0) {
                results.status = 'fail';
                results.errors = (results.errors || []).concat(asyncLeakErrors);
            }
        }
        if (unhandledErrors.length > 0) {
            results.status = 'fail';
            results.errors = (results.errors || []).concat(...await formatTestError(unhandledErrors));
        }
        silentConsoleController.flushBufferedLogsForTask({
            taskId: results.testId,
            status: results.status,
            taskParentNames: results.parentNames,
            taskType: 'file',
            testPath: results.testPath
        });
        if (coverageProvider) {
            tracker.transition('coverage');
            const coverageMap = await coverageProvider.collect({
                assetFiles,
                sourceMaps: sourceMaps,
                outputModule: options.context.outputModule
            });
            if (coverageMap) {
                results.coverage = {};
                Object.entries(coverageMap.toJSON()).forEach(([key, value])=>{
                    if ('toJSON' in value) results.coverage[key] = value.toJSON();
                    else results.coverage[key] = value;
                });
            }
        }
        runResult = results;
        return runResult;
    } catch (err) {
        runResult = {
            testId: getFileTaskId(testPath),
            project,
            testPath,
            status: 'fail',
            name: '',
            results: [],
            errors: await formatTestError(err)
        };
        return runResult;
    } finally{
        tracker.transition('teardown');
        if (coverageProvider) coverageProvider.cleanup();
        taskContext?.setFallback(void 0);
        asyncLeakDetector?.disable();
        await teardown();
        tracker.end();
        if (runResult) {
            const traceEvents = tracker.getTraceEvents();
            if (traceEvents) runResult.traceEvents = traceEvents;
        }
    }
};
const send = (response)=>{
    channel.send(wrapWorkerResponse(response));
};
let currentTaskId;
let dyingFromFatal = false;
const sendFatalError = (err)=>{
    send({
        type: 'fatal_error',
        error: serializeError(err)
    });
};
const handOffToNodeDefault = (err)=>{
    process.removeAllListeners('uncaughtException');
    process.removeAllListeners('unhandledRejection');
    process.nextTick(()=>{
        throw err;
    });
};
const fatalExit = (err)=>{
    if (dyingFromFatal) return;
    if (void 0 !== currentTaskId) return;
    dyingFromFatal = true;
    sendFatalError(err);
    handOffToNodeDefault(err);
};
process.on('uncaughtException', fatalExit);
process.on('unhandledRejection', fatalExit);
const handleStart = (request)=>{
    process.env[ENV.WORKER_ID] = String(request.workerId);
    send({
        type: 'started',
        pid: process.pid
    });
};
const RESPONSE_TYPE = {
    run: 'runFinished',
    collect: 'collectFinished'
};
const MEMORY_REPORTING_ENABLED = isMainThread && '0' !== process.env[ENV.MEMORY_AWARE];
const runTask = async (kind, request)=>{
    currentTaskId = request.taskId;
    try {
        const result = await runInPool(request.options);
        send({
            type: RESPONSE_TYPE[kind],
            taskId: request.taskId,
            result: result,
            memory: MEMORY_REPORTING_ENABLED ? {
                rss: process.memoryUsage().rss
            } : void 0
        });
    } catch (err) {
        dyingFromFatal = true;
        sendFatalError(err);
        currentTaskId = void 0;
        handOffToNodeDefault(err);
        return;
    }
    currentTaskId = void 0;
};
channel.on((message)=>{
    if (!isWorkerRequestEnvelope(message)) return;
    const request = message.request;
    switch(request.type){
        case 'start':
            handleStart(request);
            break;
        case 'run':
            runTask('run', request);
            break;
        case 'collect':
            runTask('collect', request);
            break;
    }
});
