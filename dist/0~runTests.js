import "node:module";
import { constants } from "node:os";
import { fileURLToPath } from "node:url";
import { ensurePackageInstalled, ensureCoverageProviderInstalled, createCoverageProvider, isPackageInstalled, cleanCoverageReports } from "./1193.js";
import { getNoTestFilesMessage, getTestEntries, resolveShardedEntries, createTraceController, getForceRerunTriggerMessage } from "./506.js";
import { isTTY, logger as logger_logger, color as logger_color, dirname, isDebug, clearScreen, flushOutputStreams } from "./2366.js";
import { createPool, resolveRunnableProjectsByEntries, runGlobalTeardown, claimGlobalSetupOnce, runGlobalSetup } from "./0~8244.js";
import { loadBrowserModule } from "./0~browserLoader.js";
import { prepareRsbuild, createRsbuildServer } from "./0~rsbuild.js";
const EnvironmentDependencyMap = {
    jsdom: 'jsdom',
    'happy-dom': 'happy-dom'
};
const coreRoot = dirname(fileURLToPath(import.meta.url));
const createTestEnvironmentLoadError = (packageName, root, environmentName)=>{
    const error = new Error(`Failed to load testEnvironment "${environmentName}" dependency: ${logger_color.cyan(packageName)} in ${logger_color.underline(root)}, please make sure it is installed.\n`);
    error.stack = '';
    return error;
};
const installTestEnvironmentDependency = (packageName, root, environmentName, options = {})=>ensurePackageInstalled(packageName, root, {
        ...options,
        message: options.message ?? `${packageName} is required for testEnvironment "${environmentName}". Install it now?`
    });
const getPackageResolutionRoots = (projectRoot, root)=>Array.from(new Set([
        projectRoot,
        root,
        coreRoot
    ]));
const ensureTestEnvironmentDependencies = async (projects, root, options = {}, installer = installTestEnvironmentDependency, isInstalled = isPackageInstalled)=>{
    const packages = new Map();
    for (const project of projects){
        const environmentName = project.normalizedConfig.testEnvironment.name;
        const packageName = EnvironmentDependencyMap[environmentName];
        if (!packageName) continue;
        const roots = getPackageResolutionRoots(project.rootPath, root);
        if (roots.some((resolutionRoot)=>isInstalled(packageName, resolutionRoot))) continue;
        const dependency = packages.get(packageName);
        if (dependency) for (const resolutionRoot of roots)dependency.roots.add(resolutionRoot);
        else packages.set(packageName, {
            environmentName,
            roots: new Set(roots)
        });
    }
    for (const [packageName, dependency] of packages){
        await installer(packageName, root, dependency.environmentName, options);
        if (!Array.from(dependency.roots).some((resolutionRoot)=>isInstalled(packageName, resolutionRoot))) throw createTestEnvironmentLoadError(packageName, root, dependency.environmentName);
    }
};
const ensureRunDependencies = async ({ projects, rootPath, coverage })=>{
    if (projects.length) await ensureTestEnvironmentDependencies(projects, rootPath);
    if (coverage.enabled) await ensureCoverageProviderInstalled(coverage, rootPath);
};
const isCliShortcutsEnabled = ()=>isTTY('stdin');
async function setupCliShortcuts({ closeServer, runAll, updateSnapshot, runFailedTests, runWithTestNamePattern, runWithFileFilters }) {
    const { createInterface, emitKeypressEvents } = await import("node:readline");
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    let isPrompting = false;
    const clearCurrentInputLine = ()=>{
        try {
            process.stdout.write('\r\x1b[2K');
        } catch  {}
    };
    const promptInput = (promptText, onComplete)=>{
        if (isPrompting) return;
        isPrompting = true;
        let buffer = '';
        const render = ()=>{
            process.stdout.write(`\r\x1b[2K${promptText}${buffer}`);
        };
        render();
        const onPromptKey = async (str, key)=>{
            if (!isPrompting) return;
            if (key.ctrl && 'c' === key.name) return void process.kill(process.pid, 'SIGINT');
            if (key.ctrl && 'z' === key.name) {
                if ('win32' !== process.platform) process.kill(process.pid, 'SIGTSTP');
                return;
            }
            if ('return' === key.name || 'enter' === key.name) {
                process.stdin.off('keypress', onPromptKey);
                process.stdout.write('\n');
                const value = '' === buffer.trim() ? void 0 : buffer.trim();
                isPrompting = false;
                await onComplete(value);
                return;
            }
            if ('escape' === key.name) {
                clearCurrentInputLine();
                process.stdin.off('keypress', onPromptKey);
                isPrompting = false;
                return;
            }
            if ('backspace' === key.name) {
                buffer = buffer.slice(0, -1);
                render();
                return;
            }
            if ('string' == typeof str && 1 === str.length) {
                buffer += str;
                render();
            }
        };
        process.stdin.on('keypress', onPromptKey);
    };
    const shortcuts = [
        {
            key: 'f',
            description: `${logger_color.bold('f')}  ${logger_color.dim('rerun failed tests')}`,
            action: async ()=>{
                await runFailedTests();
            }
        },
        {
            key: 'a',
            description: `${logger_color.bold('a')}  ${logger_color.dim('rerun all tests')}`,
            action: async ()=>{
                await runAll();
            }
        },
        {
            key: 'u',
            description: `${logger_color.bold('u')}  ${logger_color.dim('update snapshot')}`,
            action: async ()=>{
                await updateSnapshot();
            }
        },
        {
            key: 't',
            description: `${logger_color.bold('t')}  ${logger_color.dim('filter by a test name regex pattern')}`,
            action: ()=>{
                clearCurrentInputLine();
                promptInput('Enter test name pattern (empty to clear): ', async (pattern)=>{
                    await runWithTestNamePattern(pattern);
                });
            }
        },
        {
            key: 'p',
            description: `${logger_color.bold('p')}  ${logger_color.dim('filter by a filename regex pattern')}`,
            action: ()=>{
                clearCurrentInputLine();
                promptInput('Enter file name pattern (empty to clear): ', async (input)=>{
                    const filters = input ? input.split(/\s+/).filter(Boolean) : void 0;
                    await runWithFileFilters(filters);
                });
            }
        },
        {
            key: 'c',
            description: `${logger_color.bold('c')}  ${logger_color.dim('clear screen')}`,
            action: ()=>{
                clearScreen(true);
            }
        },
        {
            key: 'q',
            description: `${logger_color.bold('q')}  ${logger_color.dim('quit process')}`,
            action: async ()=>{
                try {
                    await closeServer();
                } finally{
                    process.exit(0);
                }
            }
        }
    ];
    const handleKeypress = (str, key)=>{
        if (isPrompting) return;
        if (key.ctrl && 'c' === key.name) return void process.kill(process.pid, 'SIGINT');
        if (key.ctrl && 'z' === key.name) {
            if ('win32' !== process.platform) process.kill(process.pid, 'SIGTSTP');
            return;
        }
        for (const shortcut of shortcuts)if (str === shortcut.key) {
            clearCurrentInputLine();
            shortcut.action();
            return;
        }
        if ('h' === str) {
            clearCurrentInputLine();
            let message = `  ${logger_color.bold(logger_color.blue('Shortcuts:'))}\n`;
            for (const shortcut of shortcuts)message += `  ${shortcut.description}\n`;
            logger_logger.log(message);
        }
    };
    process.stdin.on('keypress', handleKeypress);
    return ()=>{
        try {
            process.stdin.setRawMode(false);
            process.stdin.pause();
        } catch  {}
        process.stdin.off('keypress', handleKeypress);
        rl.close();
    };
}
async function runBrowserModeTests(context, browserProjects, options) {
    const projectRoots = browserProjects.map((p)=>p.rootPath);
    const { validateBrowserConfig, runBrowserTests } = await loadBrowserModule({
        projectRoots,
        embedded: context.embedded
    });
    validateBrowserConfig(context);
    return runBrowserTests(context, options);
}
const getSignalExitCode = (signal)=>{
    const signalNumber = constants.signals[signal];
    return 'number' == typeof signalNumber ? 128 + signalNumber : 1;
};
const reportNoTestFiles = ({ context, mode = 'all' })=>{
    if ('watch' === context.command) if ('on-demand' === mode) logger_logger.log(logger_color.yellow('No test files need re-run.'));
    else logger_logger.log(logger_color.yellow('No test files found.'));
    else {
        const code = context.normalizedConfig.passWithNoTests ? 0 : 1;
        const message = getNoTestFilesMessage({
            context,
            code,
            defaultMessage: `No test files found, exiting with code ${code}.`
        });
        if (0 === code) logger_logger.log(logger_color.yellow(message));
        else logger_logger.error(logger_color.red(message));
        process.exitCode = code;
    }
    if ('all' === mode) {
        if (context.relatedFilters?.length) logger_logger.log(logger_color.gray('related: '), context.relatedFilters.join(logger_color.gray(', ')));
        else if (context.fileFilters?.length) logger_logger.log(logger_color.gray('filter: '), context.fileFilters.join(logger_color.gray(', ')));
        context.projects.forEach((p)=>{
            if (context.projects.length > 1) {
                logger_logger.log('');
                logger_logger.log(logger_color.gray('project:'), p.name);
            }
            logger_logger.log(logger_color.gray('root:'), p.rootPath);
            logger_logger.log(logger_color.gray('include:'), p.normalizedConfig.include.join(logger_color.gray(', ')));
            logger_logger.log(logger_color.gray('exclude:'), p.normalizedConfig.exclude.patterns.join(logger_color.gray(', ')));
        });
    }
};
const notifyReportersOnTestRunEnd = async ({ context, coverage, duration, getSourcemap, unhandledErrors, filterRerunTestPaths })=>{
    for (const reporter of context.reporters){
        await reporter.onTestRunEnd?.({
            results: context.reporterResults.results,
            coverage: coverage?.toJSON(),
            testResults: context.reporterResults.testResults,
            unhandledErrors,
            snapshotSummary: context.snapshotManager.summary,
            duration,
            getSourcemap,
            filterRerunTestPaths
        });
        if (false !== reporter.flushOutputStreams) await flushOutputStreams();
    }
};
const isLifecycleDebugEnabled = isDebug();
const runLifecycleStep = async (label, fn)=>{
    if (!isLifecycleDebugEnabled) return fn();
    const startTime = Date.now();
    logger_logger.debug(`lifecycle: start ${label}`);
    try {
        const result = await fn();
        logger_logger.debug(`lifecycle: finish ${label} (${Date.now() - startTime}ms)`);
        return result;
    } catch (error) {
        logger_logger.debug(`lifecycle: fail ${label} (${Date.now() - startTime}ms)`);
        throw error;
    }
};
async function runTests(context) {
    cleanCoverageReports(context.normalizedConfig.coverage);
    if ('forceRerunTrigger' === context.relatedRerunReason) logger_logger.log(`${logger_color.yellow(getForceRerunTriggerMessage(context))}\n`);
    const browserProjects = context.projects.filter((project)=>project.normalizedConfig.browser.enabled);
    const nodeProjects = context.projects.filter((project)=>!project.normalizedConfig.browser.enabled);
    const hasBrowserProjects = browserProjects.length > 0;
    const hasNodeProjects = nodeProjects.length > 0;
    const isWatchMode = 'watch' === context.command;
    const shouldUnifyReporter = !isWatchMode && hasBrowserProjects && hasNodeProjects;
    const getEmptyRunDuration = ()=>({
            totalTime: 0,
            buildTime: 0,
            testTime: 0
        });
    const traceController = createTraceController({
        enabled: context.trace,
        rootPath: context.rootPath
    });
    if (hasBrowserProjects && !hasNodeProjects) {
        if (context.relatedResolutionEmpty) {
            if (isWatchMode) await runBrowserModeTests(context, browserProjects, {
                skipOnTestRunEnd: false,
                allowEmptyWatchRun: true
            });
            else {
                reportNoTestFiles({
                    context
                });
                await notifyReportersOnTestRunEnd({
                    context,
                    duration: getEmptyRunDuration(),
                    getSourcemap: async ()=>null
                });
            }
            await runLifecycleStep('trace controller cleanup', ()=>traceController.close());
            return;
        }
        const { coverage } = context.normalizedConfig;
        await ensureRunDependencies({
            projects: [],
            rootPath: context.rootPath,
            coverage
        });
        if (coverage.enabled) logger_logger.log(` ${logger_color.gray('Coverage enabled with')} %s\n`, logger_color.yellow(coverage.provider));
        const traceRun = traceController.beginRun();
        const browserResult = await runBrowserModeTests(context, browserProjects, {
            skipOnTestRunEnd: false,
            onTraceEvents: traceRun.onEvents
        });
        if (coverage.enabled && browserResult?.results.length && !browserResult.unhandledErrors?.length) {
            const coverageProvider = await createCoverageProvider(coverage, context.rootPath);
            if (coverageProvider) {
                const browserCoverageMap = coverageProvider.createCoverageMap();
                for (const result of browserResult.results)if (result.coverage) browserCoverageMap.merge(result.coverage);
                const { generateCoverage } = await import("./0~generate.js");
                await generateCoverage(context, browserCoverageMap, coverageProvider, traceRun.span);
            }
        }
        await runLifecycleStep('trace shutdown', ()=>traceController.shutdown(traceRun));
        return;
    }
    let browserResultPromise;
    let activeTraceRun = traceController.beginRun();
    const forwardBrowserTraceEvents = context.trace ? (events)=>activeTraceRun.onEvents?.(events) : void 0;
    let allProjects = context.projects;
    const { rootPath, reporters, snapshotManager, command, normalizedConfig } = context;
    const { coverage, shard } = normalizedConfig;
    let entriesCache = await resolveShardedEntries(context) || new Map();
    const globTestSourceEntries = async (name)=>{
        if (context.relatedResolutionEmpty) return {};
        if (entriesCache.has(name)) return entriesCache.get(name).entries;
        const { include, exclude, includeSource, root } = allProjects.find((p)=>p.environmentName === name).normalizedConfig;
        const entries = await getTestEntries({
            include,
            exclude: exclude.patterns,
            includeSource,
            rootPath,
            projectRoot: root,
            fileFilters: context.fileFilters || [],
            fileFilterMode: context.fileFilterMode
        });
        entriesCache.set(name, {
            entries,
            fileFilters: context.fileFilters
        });
        return entries;
    };
    let browserProjectsToRun = browserProjects;
    let nodeProjectsToRun = nodeProjects;
    const runnable = await resolveRunnableProjectsByEntries({
        entriesCache,
        projects: allProjects,
        globTestSourceEntries,
        skipEmptyProjects: !isWatchMode
    });
    allProjects = runnable.projects;
    entriesCache = runnable.entriesCache;
    context.projects = allProjects;
    browserProjectsToRun = runnable.browserProjectsToRun;
    nodeProjectsToRun = runnable.nodeProjectsToRun;
    if (isWatchMode && shard) {
        browserProjectsToRun = browserProjectsToRun.filter((p)=>Object.keys(entriesCache.get(p.environmentName)?.entries || {}).length > 0);
        nodeProjectsToRun = nodeProjectsToRun.filter((p)=>Object.keys(entriesCache.get(p.environmentName)?.entries || {}).length > 0);
    }
    if (isWatchMode && context.relatedResolutionEmpty) {
        browserProjectsToRun = browserProjects;
        nodeProjectsToRun = [];
    }
    const hasBrowserTestsToRun = browserProjectsToRun.length > 0;
    const hasNodeTestsToRun = nodeProjectsToRun.length > 0;
    if (hasNodeTestsToRun || hasBrowserTestsToRun) await ensureRunDependencies({
        projects: nodeProjectsToRun,
        rootPath,
        coverage
    });
    if (hasBrowserTestsToRun) {
        const browserEntries = new Map();
        if (shard) for (const p of browserProjectsToRun)browserEntries.set(p.environmentName, entriesCache.get(p.environmentName));
        browserResultPromise = runBrowserModeTests(context, browserProjectsToRun, {
            skipOnTestRunEnd: shouldUnifyReporter && hasNodeTestsToRun,
            shardedEntries: shard ? browserEntries : void 0,
            allowEmptyWatchRun: isWatchMode && context.relatedResolutionEmpty,
            onTraceEvents: forwardBrowserTraceEvents
        });
        browserResultPromise.catch(()=>void 0);
    }
    if (!hasNodeTestsToRun) {
        if (browserResultPromise) await browserResultPromise;
        if (hasBrowserTestsToRun) return void await runLifecycleStep('trace shutdown', ()=>traceController.shutdown(activeTraceRun));
        if (!hasNodeProjects) return;
    }
    const projects = nodeProjectsToRun;
    const { getSetupFiles } = await import("./744.js");
    const setupFiles = Object.fromEntries(projects.map((project)=>{
        const { environmentName, rootPath, normalizedConfig: { setupFiles } } = project;
        return [
            environmentName,
            getSetupFiles(setupFiles, rootPath)
        ];
    }));
    const globalSetupFiles = Object.fromEntries(context.projects.map((project)=>{
        const { environmentName, rootPath, normalizedConfig: { globalSetup } } = project;
        return [
            environmentName,
            getSetupFiles(globalSetup, rootPath)
        ];
    }));
    const rsbuildInstance = await prepareRsbuild(context, globTestSourceEntries, setupFiles, globalSetupFiles, projects);
    const { getRsbuildStats, closeServer } = await createRsbuildServer({
        inspectedConfig: {
            ...context.normalizedConfig,
            projects: projects.map((p)=>p.normalizedConfig)
        },
        isWatchMode,
        globTestSourceEntries,
        setupFiles,
        globalSetupFiles,
        rsbuildInstance,
        rootPath
    });
    const entryFiles = Array.from(entriesCache.values()).reduce((acc, entry)=>acc.concat(Object.values(entry.entries) || []), []);
    const getRecommendWorkerCount = ()=>{
        const nodeEntries = Array.from(entriesCache.entries()).filter(([key])=>{
            const project = projects.find((p)=>p.environmentName === key);
            return project?.normalizedConfig.browser.enabled !== true;
        });
        return nodeEntries.flatMap(([_key, entry])=>Object.values(entry.entries) || []).length;
    };
    const recommendWorkerCount = 'watch' === command ? 1 / 0 : getRecommendWorkerCount();
    const pool = await createPool({
        context,
        recommendWorkerCount
    });
    const coverageProvider = coverage.enabled ? await createCoverageProvider(coverage, context.rootPath) : null;
    if (coverageProvider) logger_logger.log(` ${logger_color.gray('Coverage enabled with')} %s\n`, logger_color.yellow(coverage.provider));
    const run = async ({ fileFilters, mode = 'all', buildStart = Date.now() } = {})=>{
        for (const reporter of reporters)await reporter.onTestRunStart?.();
        let testStart;
        const currentEntries = [];
        const currentDeletedEntries = [];
        context.stateManager.reset();
        context.stateManager.testFiles = isWatchMode ? void 0 : entryFiles;
        const mergedCoverageMap = coverageProvider ? coverageProvider.createCoverageMap() : void 0;
        const traceRun = activeTraceRun;
        const { span } = traceRun;
        const returns = await Promise.all(projects.map(async (p)=>{
            const { assetNames, entries, setupEntries, globalSetupEntries, getAssetFiles, getSourceMaps, affectedEntries, deletedEntries } = await span('host:get-rsbuild-stats', 'host', ()=>getRsbuildStats({
                    environmentName: p.environmentName,
                    fileFilters
                }), {
                project: p.name,
                testPath: '<project>'
            });
            testStart ??= Date.now();
            if (claimGlobalSetupOnce(p, entries.length, globalSetupEntries.length)) {
                const files = globalSetupEntries.flatMap((e)=>e.files);
                const globalSetupTraceArgs = {
                    project: p.name,
                    testPath: '<globalSetup>'
                };
                const [assetFiles, sourceMaps] = await span('host:global-setup-assets', 'host', ()=>Promise.all([
                        getAssetFiles(files),
                        getSourceMaps(files)
                    ]), globalSetupTraceArgs);
                const { success, errors } = await span('host:global-setup', 'host', ()=>runGlobalSetup({
                        globalSetupEntries,
                        assetFiles,
                        sourceMaps,
                        interopDefault: true,
                        outputModule: p.outputModule
                    }), globalSetupTraceArgs);
                if (!success) return {
                    results: [],
                    testResults: [],
                    errors,
                    assetNames,
                    getSourceMaps: ()=>null
                };
            }
            currentDeletedEntries.push(...deletedEntries);
            let finalEntries = entries;
            if ('on-demand' === mode) {
                if (0 === affectedEntries.length) logger_logger.debug(logger_color.yellow(`No test files need re-run in project(${p.environmentName}).`));
                else logger_logger.debug(logger_color.yellow(`Test files to re-run in project(${p.environmentName}):\n`) + affectedEntries.map((e)=>e.testPath).join('\n') + '\n');
                finalEntries = affectedEntries;
            } else logger_logger.debug(logger_color.yellow(fileFilters?.length ? `Run filtered tests in project(${p.environmentName}).\n` : `Run all tests in project(${p.environmentName}).\n`));
            currentEntries.push(...finalEntries);
            const { results, testResults } = await pool.runTests({
                entries: finalEntries,
                getSourceMaps,
                setupEntries,
                getAssetFiles,
                project: p,
                updateSnapshot: context.snapshotManager.options.updateSnapshot,
                onCoverageResult: (coverage)=>mergedCoverageMap?.merge(coverage),
                onTraceEvents: traceRun.onEvents,
                traceSpan: span
            });
            return {
                results,
                testResults,
                assetNames,
                getSourceMaps
            };
        }));
        testStart ??= buildStart;
        const buildTime = testStart - buildStart;
        const testTime = Date.now() - testStart;
        const browserResult = browserResultPromise ? await browserResultPromise : void 0;
        const browserResolveSourcemap = browserResult?.resolveSourcemap;
        const browserClose = browserResult?.close;
        try {
            const nodeResourceByAssetName = new Map();
            for (const item of returns)for (const assetName of item.assetNames)nodeResourceByAssetName.set(assetName, item.getSourceMaps);
            const getSourcemap = async (sourcePath)=>{
                if (browserResolveSourcemap) {
                    const resolved = await browserResolveSourcemap(sourcePath);
                    if (resolved.handled) return resolved.sourcemap;
                }
                const getSourceMaps = nodeResourceByAssetName.get(sourcePath);
                const sourceMap = (await getSourceMaps?.([
                    sourcePath
                ]))?.[sourcePath];
                return sourceMap ? JSON.parse(sourceMap) : null;
            };
            const duration = shouldUnifyReporter && browserResult ? {
                totalTime: testTime + buildTime + browserResult.duration.totalTime,
                buildTime: buildTime + browserResult.duration.buildTime,
                testTime: testTime + browserResult.duration.testTime
            } : {
                totalTime: testTime + buildTime,
                buildTime,
                testTime
            };
            const results = returns.flatMap((r)=>r.results);
            const testResults = returns.flatMap((r)=>r.testResults);
            const errors = returns.flatMap((r)=>r.errors || []);
            if (shouldUnifyReporter && browserResult?.results) {
                results.push(...browserResult.results);
                for (const r of browserResult.results)if (r.coverage) {
                    mergedCoverageMap?.merge(r.coverage);
                    delete r.coverage;
                }
            }
            if (shouldUnifyReporter && browserResult?.testResults) testResults.push(...browserResult.testResults);
            if (shouldUnifyReporter && browserResult?.unhandledErrors) errors.push(...browserResult.unhandledErrors);
            const nodeHasFailure = results.some((r)=>'fail' === r.status) || errors.length;
            const browserHasFailure = shouldUnifyReporter && browserResult?.hasFailure;
            const noTestsDiscovered = 0 === results.length && !errors.length;
            const isFailure = nodeHasFailure || browserHasFailure;
            context.updateReporterResultState(results, testResults, currentDeletedEntries);
            if (noTestsDiscovered) reportNoTestFiles({
                context,
                mode
            });
            if (isFailure) process.exitCode = 1;
            await runLifecycleStep('reporter onTestRunEnd', ()=>notifyReportersOnTestRunEnd({
                    context,
                    coverage: mergedCoverageMap,
                    duration,
                    getSourcemap,
                    unhandledErrors: errors,
                    filterRerunTestPaths: currentEntries.length ? currentEntries.map((e)=>e.testPath) : void 0
                }));
            if (coverageProvider && (!isFailure || coverage.reportOnFailure)) {
                const { generateCoverage } = await import("./0~generate.js");
                await runLifecycleStep('coverage report generation', ()=>generateCoverage(context, mergedCoverageMap, coverageProvider, traceRun.span));
            }
            await runLifecycleStep('trace run finalize', ()=>traceRun.finalize());
            activeTraceRun = traceController.beginRun();
            if (isFailure) {
                const bail = context.normalizedConfig.bail;
                if (bail && context.stateManager.getCountOfFailedTests() >= bail) logger_logger.log(logger_color.yellow(`Test run aborted due to reaching the bail limit of ${bail} failed test(s).`));
            }
        } finally{
            if (browserClose) await runLifecycleStep('browser result cleanup', ()=>browserClose());
        }
    };
    if ('watch' === command) {
        const enableCliShortcuts = isCliShortcutsEnabled();
        let isCleaningUp = false;
        const cleanup = async ()=>{
            if (isCleaningUp) return;
            isCleaningUp = true;
            try {
                await runLifecycleStep('global teardown', ()=>runGlobalTeardown());
                await runLifecycleStep('worker pool cleanup', ()=>pool.close());
                await runLifecycleStep('rsbuild server cleanup', ()=>closeServer());
                await runLifecycleStep('trace run finalize', ()=>activeTraceRun.finalize());
                await runLifecycleStep('trace controller cleanup', ()=>traceController.close());
            } catch (error) {
                logger_logger.log(logger_color.red(`Error during cleanup: ${error}`));
            }
        };
        const handleSignal = async (signal)=>{
            logger_logger.log(logger_color.yellow(`\nReceived ${signal}, cleaning up...`));
            await cleanup();
            process.exit(getSignalExitCode(signal));
        };
        if (!context.embedded) {
            process.on('SIGINT', handleSignal);
            process.on('SIGTERM', handleSignal);
            process.on('SIGTSTP', handleSignal);
        }
        const afterTestsWatchRun = ()=>{
            logger_logger.log(logger_color.green('  Waiting for file changes...'));
            if (enableCliShortcuts) if (snapshotManager.summary.unmatched) logger_logger.log(`  ${logger_color.dim('press')} ${logger_color.yellow(logger_color.bold('u'))} ${logger_color.dim('to update snapshot')}${logger_color.dim(', press')} ${logger_color.bold('h')} ${logger_color.dim('to show help')}\n`);
            else logger_logger.log(`  ${logger_color.dim('press')} ${logger_color.bold('h')} ${logger_color.dim('to show help')}${logger_color.dim(', press')} ${logger_color.bold('q')} ${logger_color.dim('to quit')}\n`);
        };
        const { onBeforeRestart } = await import("./0~restart.js");
        onBeforeRestart(async ()=>{
            await runLifecycleStep('global teardown', ()=>runGlobalTeardown());
            await runLifecycleStep('worker pool cleanup', ()=>pool.close());
            await runLifecycleStep('rsbuild server cleanup', ()=>closeServer());
            await runLifecycleStep('trace run finalize', ()=>activeTraceRun.finalize());
            await runLifecycleStep('trace controller cleanup', ()=>traceController.close());
        });
        let buildStart;
        rsbuildInstance.onBeforeDevCompile(({ isFirstCompile })=>{
            buildStart = Date.now();
            if (!isFirstCompile) clearScreen();
        });
        rsbuildInstance.onAfterDevCompile(async ({ isFirstCompile })=>{
            snapshotManager.clear();
            await run({
                buildStart,
                mode: isFirstCompile ? 'all' : 'on-demand'
            });
            buildStart = void 0;
            if (isFirstCompile && enableCliShortcuts) {
                const closeCliShortcuts = await setupCliShortcuts({
                    closeServer: async ()=>{
                        await runLifecycleStep('worker pool cleanup', ()=>pool.close());
                        await runLifecycleStep('rsbuild server cleanup', ()=>closeServer());
                        await runLifecycleStep('trace run finalize', ()=>activeTraceRun.finalize());
                        await runLifecycleStep('trace controller cleanup', ()=>traceController.close());
                    },
                    runAll: async ()=>{
                        clearScreen();
                        snapshotManager.clear();
                        context.normalizedConfig.testNamePattern = void 0;
                        context.fileFilters = void 0;
                        await run({
                            mode: 'all'
                        });
                        afterTestsWatchRun();
                    },
                    runWithTestNamePattern: async (pattern)=>{
                        clearScreen();
                        context.normalizedConfig.testNamePattern = pattern;
                        if (pattern) logger_logger.log(`\n${logger_color.dim('Applied testNamePattern:')} ${logger_color.bold(pattern)}\n`);
                        else logger_logger.log(`\n${logger_color.dim('Cleared testNamePattern filter')}\n`);
                        snapshotManager.clear();
                        await run();
                        afterTestsWatchRun();
                    },
                    runWithFileFilters: async (filters)=>{
                        clearScreen();
                        if (filters && filters.length > 0) logger_logger.log(`\n${logger_color.dim('Applied file filters:')} ${logger_color.bold(filters.join(', '))}\n`);
                        else logger_logger.log(`\n${logger_color.dim('Cleared file filters')}\n`);
                        snapshotManager.clear();
                        context.fileFilters = filters;
                        const entries = await Promise.all(projects.map(async (p)=>globTestSourceEntries(p.environmentName))).then((entries)=>entries.reduce((acc, entry)=>acc.concat(...Object.values(entry)), []));
                        if (!entries.length) return void logger_logger.log(filters ? logger_color.yellow(`\nNo matching test files to run with current file filters: ${filters.join(',')}\n`) : logger_color.yellow('\nNo matching test files to run.\n'));
                        await run({
                            fileFilters: entries
                        });
                        afterTestsWatchRun();
                    },
                    runFailedTests: async ()=>{
                        const failedTests = context.reporterResults.results.filter((result)=>'fail' === result.status).map((r)=>r.testPath);
                        if (!failedTests.length) return void logger_logger.log(logger_color.yellow('\nNo failed tests were found that needed to be rerun.'));
                        clearScreen();
                        snapshotManager.clear();
                        await run({
                            fileFilters: failedTests,
                            mode: 'all'
                        });
                        afterTestsWatchRun();
                    },
                    updateSnapshot: async ()=>{
                        if (!snapshotManager.summary.unmatched) return void logger_logger.log(logger_color.yellow('\nNo snapshots were found that needed to be updated.'));
                        const failedTests = context.reporterResults.results.filter((result)=>result.snapshotResult?.unmatched).map((r)=>r.testPath);
                        clearScreen();
                        const originalUpdateSnapshot = snapshotManager.options.updateSnapshot;
                        snapshotManager.clear();
                        snapshotManager.options.updateSnapshot = 'all';
                        await run({
                            fileFilters: failedTests
                        });
                        afterTestsWatchRun();
                        snapshotManager.options.updateSnapshot = originalUpdateSnapshot;
                    }
                });
                onBeforeRestart(closeCliShortcuts);
            }
            afterTestsWatchRun();
        });
    } else {
        let isTeardown = false;
        let isCleaningUp = false;
        const cleanup = async ()=>{
            if (isCleaningUp) return;
            isCleaningUp = true;
            try {
                await runLifecycleStep('global teardown', ()=>runGlobalTeardown());
                await runLifecycleStep('worker pool cleanup', ()=>pool.close());
                await runLifecycleStep('rsbuild server cleanup', ()=>closeServer());
                await runLifecycleStep('trace run finalize', ()=>activeTraceRun.finalize());
                await runLifecycleStep('trace controller cleanup', ()=>traceController.close());
            } catch (error) {
                logger_logger.log(logger_color.red(`Error during cleanup: ${error}`));
            }
        };
        const unExpectedExit = (code)=>{
            if (isTeardown) logger_logger.log(logger_color.yellow(`Rstest exited unexpectedly with code ${code}, this is likely caused by test environment teardown.`));
            else {
                logger_logger.log(logger_color.red(`Rstest exited unexpectedly with code ${code}, terminating test run.`));
                runGlobalTeardown().catch((error)=>{
                    logger_logger.log(logger_color.red(`Error in global teardown: ${error}`));
                });
                process.exitCode = 1;
            }
        };
        const handleSignal = async (signal)=>{
            logger_logger.log(logger_color.yellow(`\nReceived ${signal}, cleaning up...`));
            await cleanup();
            process.exit(getSignalExitCode(signal));
        };
        if (!context.embedded) {
            process.on('exit', unExpectedExit);
            process.on('SIGINT', handleSignal);
            process.on('SIGTERM', handleSignal);
            process.on('SIGTSTP', handleSignal);
        }
        try {
            await run();
            isTeardown = true;
            await runLifecycleStep('worker pool cleanup', ()=>pool.close());
            await runLifecycleStep('rsbuild server cleanup', ()=>closeServer());
            await runLifecycleStep('global teardown', ()=>runGlobalTeardown());
        } catch (error) {
            if (context.embedded) await cleanup();
            throw error;
        } finally{
            if (!context.embedded) {
                process.off('exit', unExpectedExit);
                process.off('SIGINT', handleSignal);
                process.off('SIGTERM', handleSignal);
                process.off('SIGTSTP', handleSignal);
            }
        }
        await runLifecycleStep('trace wait for exit', ()=>traceController.waitForExit());
    }
}
export { runTests };
