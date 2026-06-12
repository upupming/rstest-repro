import "node:module";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import node_os from "node:os";
import node_v8 from "node:v8";
import { fork } from "node:child_process";
import node_events from "node:events";
import { Worker } from "node:worker_threads";
import { basename, dirname, pathe_M_eThtNZ_resolve, getForceColorEnv, needFlagExperimentalDetectModule, join, bgColor, isDeno, ENV, logger as logger_logger, getFileTaskId, getWorkerSerialization, isDebug, color as logger_color, toError } from "./2366.js";
import { wrapWorkerRequest, isRpcEnvelope, createBirpc, isWorkerResponseEnvelope, wrapRpc, deserializeError } from "./8549.js";
import { applyEnvironmentComment, parseEnvironmentCommentFromFile, noopTraceSpan, killAndWait } from "./506.js";
import { memory_isMemorySufficient } from "./0~rsbuild.js";
import { getNumCpus, parseWorkers } from "./3429.js";
const RSS_QUANTILE = 0.9;
const WINDOW_SIZE = 32;
const FAST_LANE_FACTOR = 3;
const HEAP_SAFETY_FACTOR = 1.5;
const FREEMEM_CACHE_MS = 1000;
const MEMINFO_CACHE_MS = 250;
const POLL_INTERVAL_MS = 500;
const WARMUP_SAMPLES = 0;
const p90 = (samples)=>{
    if (0 === samples.length) return 0;
    const sorted = [
        ...samples
    ].sort((a, b)=>a - b);
    const idx = Math.min(sorted.length - 1, Math.floor(RSS_QUANTILE * sorted.length));
    return sorted[idx];
};
class MemoryGate {
    rssSamples = [];
    heapDeltaSamples = [];
    freememFn;
    readMeminfoFn;
    heapTrackingEnabled = false;
    freememCache;
    memInfoCache;
    rssP90Cache;
    heapDeltaP90Cache;
    heapHeadroomCache;
    pollTimer;
    constructor(deps = {}){
        this.freememFn = deps.freemem ?? node_os.freemem;
        this.readMeminfoFn = deps.readMeminfo ?? (()=>{
            try {
                return readFileSync('/proc/meminfo', 'utf-8');
            } catch  {
                return null;
            }
        });
    }
    recordWorkerRss(rss) {
        if (rss <= 0) return;
        this.pushSample(this.rssSamples, rss);
        this.rssP90Cache = void 0;
    }
    recordDispatch() {
        if (!this.heapTrackingEnabled) return;
        return process.memoryUsage().heapUsed;
    }
    recordResolve(baseline) {
        if (!this.heapTrackingEnabled) return;
        if (void 0 === baseline) return;
        const delta = Math.max(0, process.memoryUsage().heapUsed - baseline);
        this.pushSample(this.heapDeltaSamples, delta);
        this.heapDeltaP90Cache = void 0;
    }
    canSpawnNewWorker(activeCount) {
        if (0 === activeCount) return true;
        if (this.rssSamples.length <= WARMUP_SAMPLES) return true;
        const estRss = this.rssP90Cache ??= p90(this.rssSamples);
        const freemem = this.cachedFreemem();
        if (freemem >= estRss * FAST_LANE_FACTOR) return true;
        this.heapTrackingEnabled = true;
        const available = this.accurateAvailableMemory();
        if (available < estRss) {
            this.logDeferred('system memory', {
                estRss,
                available
            });
            return false;
        }
        if (this.heapDeltaSamples.length > 0) {
            const heapHeadroom = this.cachedHeapHeadroom();
            const estHeapDelta = this.heapDeltaP90Cache ??= p90(this.heapDeltaSamples);
            if (heapHeadroom < estHeapDelta * HEAP_SAFETY_FACTOR) {
                this.logDeferred('main heap', {
                    heapHeadroom,
                    estHeapDelta
                });
                return false;
            }
        }
        return true;
    }
    attachWorker(source) {
        source.on('message', (msg)=>{
            if (!isWorkerResponseEnvelope(msg)) return;
            const r = msg.response;
            if ('runFinished' !== r.type && 'collectFinished' !== r.type) return;
            if (r.memory) this.recordWorkerRss(r.memory.rss);
        });
    }
    attachPoll(wake) {
        if (this.pollTimer) return;
        this.pollTimer = setInterval(()=>{
            if (!wake()) this.dispose();
        }, POLL_INTERVAL_MS);
        this.pollTimer.unref();
    }
    dispose() {
        if (this.pollTimer) {
            clearInterval(this.pollTimer);
            this.pollTimer = void 0;
        }
    }
    pushSample(arr, value) {
        arr.push(value);
        if (arr.length > WINDOW_SIZE) arr.shift();
    }
    cachedFreemem() {
        const now = Date.now();
        if (this.freememCache && this.freememCache.expiresAt > now) return this.freememCache.value;
        const value = this.freememFn();
        this.freememCache = {
            value,
            expiresAt: now + FREEMEM_CACHE_MS
        };
        return value;
    }
    cachedHeapHeadroom() {
        const now = Date.now();
        if (this.heapHeadroomCache && this.heapHeadroomCache.expiresAt > now) return this.heapHeadroomCache.value;
        const stats = node_v8.getHeapStatistics();
        const value = stats.heap_size_limit - stats.used_heap_size;
        this.heapHeadroomCache = {
            value,
            expiresAt: now + MEMINFO_CACHE_MS
        };
        return value;
    }
    accurateAvailableMemory() {
        const now = Date.now();
        if (this.memInfoCache && this.memInfoCache.expiresAt > now) return this.memInfoCache.value;
        let value = this.freememFn();
        const meminfo = this.readMeminfoFn();
        if (meminfo) {
            const match = meminfo.match(/^MemAvailable:\s+(\d+)\s+kB/m);
            if (match) value = 1024 * Number(match[1]);
        }
        this.memInfoCache = {
            value,
            expiresAt: now + MEMINFO_CACHE_MS
        };
        return value;
    }
    logDeferred(reason, details) {
        if (!isDebug()) return;
        const parts = Object.entries(details).map(([k, v])=>`${k}=${(v / 1024 / 1024).toFixed(0)}MB`);
        logger_logger.debug(`[pool] deferred worker spawn (${reason}): ${parts.join(', ')}`);
    }
}
const createDefaultMemoryGate = ()=>{
    if ('0' === process.env[ENV.MEMORY_AWARE]) return;
    return new MemoryGate();
};
const selectMemoryGate = (workerKind, makeGate = createDefaultMemoryGate)=>'forks' === workerKind ? makeGate() : void 0;
const WORKER_START_TIMEOUT_MS = 90000;
const MAX_STDERR_MESSAGE_BYTES = 65536;
function formatCapturedStderr(text) {
    const buf = Buffer.from(text);
    if (buf.length <= MAX_STDERR_MESSAGE_BYTES) return text;
    const half = Math.floor(MAX_STDERR_MESSAGE_BYTES / 2);
    const head = buf.subarray(0, half).toString('utf-8');
    const tail = buf.subarray(-half).toString('utf-8');
    const hiddenBytes = buf.length - 2 * half;
    return `${head}\n\n... [truncated ${hiddenBytes} bytes of stderr] ...\n\n${tail}`;
}
const createDeferred = ()=>{
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    return {
        promise,
        resolve,
        reject
    };
};
let nextTaskSeq = 0;
class PoolRunner {
    workerId;
    worker;
    state = 'IDLE';
    operationChain = Promise.resolve();
    currentTask;
    currentRpc;
    currentRpcDispatch;
    startDeferred;
    stopDeferred;
    startTimer;
    lastFatalError;
    crashed = false;
    constructor(worker, options){
        this.workerId = options.workerId;
        this.worker = worker;
        this.handleMessage = this.handleMessage.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleError = this.handleError.bind(this);
        worker.on('message', this.handleMessage);
        worker.on('exit', this.handleExit);
        worker.on('error', this.handleError);
    }
    isUsable() {
        return 'STARTED' === this.state && !this.crashed;
    }
    start() {
        return this.runOperation(async ()=>{
            if ('STARTED' === this.state) return;
            if ('IDLE' !== this.state) throw new Error(`PoolRunner.start: cannot start runner in state ${this.state}`);
            this.state = 'STARTING';
            this.startDeferred = createDeferred();
            this.startDeferred.promise.catch(()=>void 0);
            this.startTimer = setTimeout(()=>this.rejectStart(new Error(`Worker did not start within ${WORKER_START_TIMEOUT_MS}ms`)), WORKER_START_TIMEOUT_MS);
            this.startTimer.unref();
            try {
                await this.worker.start();
                this.worker.send({
                    type: 'start',
                    workerId: this.workerId
                });
                await this.startDeferred.promise;
            } catch (err) {
                this.clearStartTimer();
                this.rejectStart(toError(err));
                if ('STOPPED' !== this.state) this.state = 'START_FAILURE';
                throw toError(err);
            }
            this.state = 'STARTED';
        });
    }
    runTest(task) {
        return this.runTaskInternal('run', task);
    }
    collectTests(task) {
        return this.runTaskInternal('collect', task);
    }
    stop(options) {
        return this.runOperation(async ()=>{
            switch(this.state){
                case 'STOPPED':
                case 'IDLE':
                    return;
                case 'STOPPING':
                    if (this.stopDeferred) await this.stopDeferred.promise;
                    if (options?.force) await this.worker.stop({
                        force: true
                    });
                    return;
            }
            if (!this.worker.hasLiveChild()) {
                this.state = 'STOPPED';
                return;
            }
            this.state = 'STOPPING';
            this.stopDeferred = createDeferred();
            await this.worker.stop({
                force: options?.force ?? false
            });
            await this.stopDeferred.promise;
        });
    }
    async runOperation(op) {
        const next = this.operationChain.then(op, op);
        this.operationChain = next.catch(()=>void 0);
        return next;
    }
    installRpc(rpcMethods) {
        this.disposeRpc();
        this.currentRpc = createBirpc(rpcMethods, {
            timeout: -1,
            post: (data)=>{
                this.worker.sendRaw(wrapRpc(data));
            },
            on: (fn)=>{
                this.currentRpcDispatch = fn;
            }
        });
    }
    disposeRpc() {
        if (this.currentRpc) try {
            this.currentRpc.$close(new Error('[rstest-pool]: Pending methods while closing rpc'));
        } catch  {}
        this.currentRpc = void 0;
        this.currentRpcDispatch = void 0;
    }
    runTaskInternal(kind, task) {
        if ('STARTED' !== this.state) return Promise.reject(new Error(`PoolRunner.${kind}: runner is not in STARTED state (current=${this.state})`));
        if (this.currentTask) return Promise.reject(new Error('PoolRunner: previous task is still in progress (concurrentTasksPerWorker=1)'));
        this.installRpc(task.rpcMethods);
        this.worker.resetCapturedStderr();
        const taskId = ++nextTaskSeq;
        return new Promise((resolve, reject)=>{
            this.currentTask = {
                kind,
                taskId,
                resolve,
                reject
            };
            try {
                this.worker.send({
                    type: kind,
                    taskId,
                    options: task.options
                });
            } catch (err) {
                this.currentTask = void 0;
                this.disposeRpc();
                reject(toError(err));
            }
        }).finally(()=>{
            this.disposeRpc();
        });
    }
    handleMessage(message) {
        if (isRpcEnvelope(message)) return void this.currentRpcDispatch?.(message.payload);
        if (isWorkerResponseEnvelope(message)) this.handleResponse(message.response);
    }
    handleResponse(response) {
        switch(response.type){
            case 'started':
                this.clearStartTimer();
                this.startDeferred?.resolve();
                this.startDeferred = void 0;
                return;
            case 'runFinished':
                this.resolveTask('run', response.taskId, response.result);
                return;
            case 'collectFinished':
                this.resolveTask('collect', response.taskId, response.result);
                return;
            case 'fatal_error':
                {
                    const error = deserializeError(response.error);
                    this.crashed = true;
                    this.rejectCurrentTaskWithStderr(error);
                    this.lastFatalError = error;
                    return;
                }
        }
    }
    resolveTask(kind, taskId, result) {
        const task = this.currentTask;
        if (!task || task.kind !== kind || task.taskId !== taskId) return;
        this.currentTask = void 0;
        task.resolve(result);
    }
    handleExit(code, signal) {
        this.clearStartTimer();
        const wasStopping = 'STOPPING' === this.state;
        this.state = 'STOPPED';
        this.disposeRpc();
        this.rejectStart(new Error(`Worker exited before start ack (code=${code}, signal=${signal})`));
        if (this.stopDeferred) {
            this.stopDeferred.resolve();
            this.stopDeferred = void 0;
        }
        if (this.currentTask) {
            const error = this.lastFatalError ?? new Error(wasStopping ? `Worker stopped before task completed (code=${code}, signal=${signal})` : `Worker exited unexpectedly (code=${code}, signal=${signal})`);
            this.rejectCurrentTaskWithStderr(error);
        }
    }
    handleError(err) {
        if ('STOPPED' === this.state || 'STOPPING' === this.state) return;
        this.crashed = true;
        this.rejectStart(err);
        if (this.currentTask) this.rejectCurrentTaskWithStderr(err);
    }
    rejectStart(err) {
        if (!this.startDeferred) return;
        const deferred = this.startDeferred;
        this.startDeferred = void 0;
        this.clearStartTimer();
        deferred.reject(err);
    }
    rejectCurrentTaskWithStderr(err) {
        const task = this.currentTask;
        if (!task) return;
        this.currentTask = void 0;
        this.worker.waitForStderrSettle().then(()=>{
            this.attachStderrToError(err);
            task.reject(err);
        });
    }
    attachStderrToError(err) {
        const raw = this.worker.getCapturedStderr().trim();
        if (0 === raw.length) return;
        const stderr = formatCapturedStderr(raw);
        if (err.message.includes(stderr)) return;
        err.message = `${err.message}\n\nMaybe related stderr:\n${stderr}`;
    }
    clearStartTimer() {
        if (!this.startTimer) return;
        clearTimeout(this.startTimer);
        this.startTimer = void 0;
    }
}
const MAX_CAPTURED_STDERR_BYTES = 1048576;
const STDERR_SETTLE_MAX_WAIT = 200;
class StderrCapture {
    buffer = '';
    bytes = 0;
    closePromise;
    trackClose(stream) {
        this.closePromise = new Promise((resolve)=>{
            stream.once('close', resolve);
        });
    }
    append(text) {
        if (!text) return;
        this.buffer += text;
        this.bytes += Buffer.byteLength(text);
        if (this.bytes > MAX_CAPTURED_STDERR_BYTES) {
            const overflow = this.bytes - MAX_CAPTURED_STDERR_BYTES;
            this.buffer = this.buffer.slice(overflow);
            this.bytes = Buffer.byteLength(this.buffer);
        }
    }
    get() {
        return this.buffer;
    }
    reset() {
        this.buffer = '';
        this.bytes = 0;
    }
    async waitSettle() {
        if (!this.closePromise) return;
        await Promise.race([
            this.closePromise,
            new Promise((resolve)=>{
                const timer = setTimeout(resolve, STDERR_SETTLE_MAX_WAIT);
                timer.unref();
            })
        ]);
    }
}
class BasePoolWorker {
    name;
    emitter = new node_events();
    stderrCapture = new StderrCapture();
    forwardStdio;
    exited = false;
    startPromise;
    constructor(opts){
        this.name = opts.name;
        this.forwardStdio = opts.forwardStdio ?? true;
    }
    send(request) {
        this.sendRaw(wrapWorkerRequest(request));
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }
    getCapturedStderr() {
        return this.stderrCapture.get();
    }
    resetCapturedStderr() {
        this.stderrCapture.reset();
    }
    waitForStderrSettle() {
        return this.stderrCapture.waitSettle();
    }
    attachStdout(stdout) {
        if (!stdout) return;
        stdout.on('data', (chunk)=>{
            if (this.forwardStdio) process.stdout.write(chunk);
        });
    }
    attachStderr(stderr) {
        if (!stderr) return;
        stderr.on('data', (chunk)=>{
            this.stderrCapture.append(chunk.toString());
            if (this.forwardStdio) process.stderr.write(chunk);
        });
        this.stderrCapture.trackClose(stderr);
    }
}
const BENIGN_IPC_ERROR_CODES = new Set([
    'ERR_IPC_CHANNEL_CLOSED',
    'EPIPE',
    'ECONNRESET',
    'ERR_STREAM_WRITE_AFTER_END'
]);
const SIGKILL_FALLBACK_MS = 500;
const isBenignIpcError = (err)=>{
    if (!(err instanceof Error)) return false;
    const code = err.code;
    if (code && BENIGN_IPC_ERROR_CODES.has(code)) return true;
    if ('UNKNOWN' === code) return true;
    return /write UNKNOWN|channel closed/i.test(err.message);
};
class ForksPoolWorker extends BasePoolWorker {
    filename;
    env;
    execArgv;
    childProcess;
    constructor(options){
        super({
            name: options.name,
            forwardStdio: options.forwardStdio
        });
        this.filename = options.filename;
        this.env = options.env;
        this.execArgv = options.execArgv;
    }
    hasLiveChild() {
        return void 0 !== this.childProcess && !this.exited;
    }
    start() {
        if (this.startPromise) return this.startPromise;
        this.startPromise = new Promise((resolve, reject)=>{
            const forkOptions = {
                env: this.env,
                execArgv: this.execArgv,
                stdio: [
                    'ignore',
                    this.forwardStdio ? 'pipe' : 'ignore',
                    'pipe',
                    'ipc'
                ],
                serialization: getWorkerSerialization()
            };
            let child;
            try {
                child = fork(this.filename, [], forkOptions);
            } catch (err) {
                reject(toError(err));
                return;
            }
            this.childProcess = child;
            this.attachStdout(child.stdout);
            this.attachStderr(child.stderr);
            child.on('message', (message)=>{
                this.emitter.emit('message', message);
            });
            child.on('error', (err)=>{
                if (isBenignIpcError(err)) return;
                this.emitter.emit('error', err);
                reject(err);
            });
            child.on('exit', (code, signal)=>{
                this.exited = true;
                this.emitter.emit('exit', code, signal);
                reject(new Error(`Worker exited before start ack (code=${code}, signal=${signal})`));
            });
            resolve();
        });
        return this.startPromise;
    }
    async stop(options) {
        if (!this.hasLiveChild()) return;
        if (options?.force) return void await killAndWait(this.childProcess, 'SIGKILL');
        await killAndWait(this.childProcess, 'SIGTERM', SIGKILL_FALLBACK_MS);
    }
    sendRaw(envelope) {
        const child = this.childProcess;
        if (!child || this.exited || !child.connected) return;
        try {
            child.send(envelope, (err)=>{
                if (err && !isBenignIpcError(err)) this.emitter.emit('error', err);
            });
        } catch (err) {
            if (!isBenignIpcError(err)) throw err;
        }
    }
}
class ThreadsPoolWorker extends BasePoolWorker {
    filename;
    env;
    execArgv;
    worker;
    constructor(options){
        super({
            name: options.name,
            forwardStdio: options.forwardStdio
        });
        this.filename = options.filename;
        this.env = options.env;
        this.execArgv = options.execArgv;
    }
    hasLiveChild() {
        return void 0 !== this.worker && !this.exited;
    }
    start() {
        if (this.startPromise) return this.startPromise;
        this.startPromise = new Promise((resolve, reject)=>{
            let worker;
            try {
                worker = new Worker(this.filename, {
                    env: this.env,
                    execArgv: this.execArgv,
                    stdout: true,
                    stderr: true
                });
            } catch (err) {
                reject(toError(err));
                return;
            }
            this.worker = worker;
            this.attachStdout(worker.stdout);
            this.attachStderr(worker.stderr);
            worker.on('message', (message)=>{
                this.emitter.emit('message', message);
            });
            worker.on('error', (err)=>{
                this.emitter.emit('error', err);
                reject(err);
            });
            worker.on('exit', (code)=>{
                this.exited = true;
                this.emitter.emit('exit', code, null);
                reject(new Error(`Worker exited before start ack (code=${code})`));
            });
            resolve();
        });
        return this.startPromise;
    }
    async stop(_options) {
        if (!this.hasLiveChild()) return;
        await this.worker.terminate().catch(()=>void 0);
    }
    sendRaw(envelope) {
        const worker = this.worker;
        if (!worker || this.exited) return;
        try {
            worker.postMessage(envelope);
        } catch (err) {
            this.emitter.emit('error', toError(err));
        }
    }
}
function createPoolWorker(task, options, workerId) {
    switch(task.worker){
        case 'forks':
            return new ForksPoolWorker({
                name: `forks-${workerId}`,
                filename: options.workerEntry,
                env: options.env,
                execArgv: options.execArgv,
                forwardStdio: options.forwardStdio
            });
        case 'threads':
            return new ThreadsPoolWorker({
                name: `threads-${workerId}`,
                filename: options.workerEntry,
                env: options.env,
                execArgv: options.execArgv,
                forwardStdio: options.forwardStdio
            });
        default:
            {
                const _exhaustive = task.worker;
                throw new Error(`Unknown pool worker: ${String(_exhaustive)}`);
            }
    }
}
class Pool {
    options;
    idleRunners = [];
    activeRunners = new Set();
    stoppingRunners = new Set();
    stoppingPromises = new Set();
    slotWaiters = [];
    slotInUse = new Set();
    isClosing = false;
    isClosed = false;
    constructor(options){
        this.options = options;
    }
    async runTest(task) {
        return this.dispatch(task, 'run');
    }
    async collectTests(task) {
        return this.dispatch(task, 'collect');
    }
    async dispatch(task, op) {
        if (this.isClosing || this.isClosed) throw new Error('[rstest-pool]: pool is closed');
        const runner = await this.acquireRunner(task);
        const heapBaseline = this.options.memoryGate?.recordDispatch();
        try {
            if ('run' === op) return await runner.runTest(task);
            return await runner.collectTests(task);
        } finally{
            this.options.memoryGate?.recordResolve(heapBaseline);
            this.releaseRunner(runner);
        }
    }
    async acquireRunner(task) {
        while(true){
            const reuse = this.idleRunners.pop();
            if (reuse) {
                if (reuse.isUsable()) {
                    this.activeRunners.add(reuse);
                    return reuse;
                }
                this.disposeRunnerInBackground(reuse);
                continue;
            }
            const inFlight = this.inFlightCount;
            if (inFlight >= this.options.maxWorkers) {
                await new Promise((resolve)=>{
                    this.slotWaiters.push(resolve);
                });
                if (this.isClosing || this.isClosed) throw new Error('[rstest-pool]: pool is closed');
                continue;
            }
            const gate = this.options.memoryGate;
            if (gate && !gate.canSpawnNewWorker(inFlight)) {
                gate.attachPoll(this.tryWakeGateWaiter);
                await new Promise((resolve)=>{
                    this.slotWaiters.push(resolve);
                });
                if (this.isClosing || this.isClosed) throw new Error('[rstest-pool]: pool is closed');
                continue;
            }
            const workerId = this.acquireWorkerId();
            const worker = createPoolWorker(task, this.options, workerId);
            gate?.attachWorker(worker);
            const runner = new PoolRunner(worker, {
                workerId
            });
            this.activeRunners.add(runner);
            try {
                await runner.start();
            } catch (err) {
                this.activeRunners.delete(runner);
                this.disposeRunnerInBackground(runner, {
                    force: true
                });
                throw err;
            }
            return runner;
        }
    }
    get inFlightCount() {
        return this.activeRunners.size + this.idleRunners.length + this.stoppingRunners.size;
    }
    tryWakeGateWaiter = ()=>{
        if (0 === this.slotWaiters.length || this.isClosing || this.isClosed) return false;
        if (this.options.memoryGate?.canSpawnNewWorker(this.inFlightCount)) this.slotWaiters.shift()?.();
        return true;
    };
    acquireWorkerId() {
        for(let i = 1; i <= this.options.maxWorkers; i++)if (!this.slotInUse.has(i)) {
            this.slotInUse.add(i);
            return i;
        }
        throw new Error('[rstest-pool]: no free worker id');
    }
    releaseWorkerId(id) {
        this.slotInUse.delete(id);
    }
    releaseRunner(runner) {
        this.activeRunners.delete(runner);
        if (false !== this.options.isolate || this.isClosing || this.isClosed || !runner.isUsable()) return void this.disposeRunnerInBackground(runner);
        const minWorkers = Math.max(this.options.minWorkers, 0);
        const hasWaiter = this.slotWaiters.length > 0;
        if (hasWaiter || this.idleRunners.length < minWorkers) {
            this.idleRunners.push(runner);
            if (hasWaiter) this.slotWaiters.shift()?.();
            return;
        }
        this.disposeRunnerInBackground(runner);
    }
    disposeRunnerInBackground(runner, options) {
        this.stoppingRunners.add(runner);
        const stopPromise = runner.stop(options).catch(()=>void 0).finally(()=>{
            this.stoppingRunners.delete(runner);
            this.stoppingPromises.delete(stopPromise);
            this.releaseWorkerId(runner.workerId);
            if (!this.isClosed) this.slotWaiters.shift()?.();
        });
        this.stoppingPromises.add(stopPromise);
    }
    async close() {
        if (this.isClosed) return;
        this.isClosing = true;
        this.options.memoryGate?.dispose();
        while(this.slotWaiters.length > 0)this.slotWaiters.shift()?.();
        const runners = [
            ...this.activeRunners,
            ...this.idleRunners
        ];
        await Promise.all(runners.map((r)=>r.stop().catch(()=>void 0)));
        await Promise.all([
            ...this.stoppingPromises
        ]);
        this.idleRunners.length = 0;
        this.activeRunners.clear();
        this.isClosed = true;
    }
}
const pool_filename = fileURLToPath(import.meta.url);
const pool_dirname = dirname(pool_filename);
const getRuntimeConfig = (context)=>{
    const { testNamePattern, testTimeout, passWithNoTests, retry, globals, clearMocks, resetMocks, restoreMocks, unstubEnvs, unstubGlobals, maxConcurrency, printConsoleTrace, disableConsoleIntercept, testEnvironment, hookTimeout, isolate, coverage, snapshotFormat, env, logHeapUsage, detectAsyncLeaks, bail, chaiConfig, includeTaskLocation, silent } = context.normalizedConfig;
    return {
        env: {
            ...process.env,
            ...env
        },
        testNamePattern,
        testTimeout,
        hookTimeout,
        passWithNoTests,
        retry,
        globals,
        clearMocks,
        resetMocks,
        restoreMocks,
        unstubEnvs,
        unstubGlobals,
        maxConcurrency,
        printConsoleTrace,
        disableConsoleIntercept,
        testEnvironment,
        isolate,
        coverage: {
            ...coverage,
            reporters: []
        },
        snapshotFormat,
        logHeapUsage,
        detectAsyncLeaks,
        bail,
        chaiConfig,
        includeTaskLocation,
        silent
    };
};
const filterAssetsByEntry = async (entryInfo, getAssetFiles, getSourceMaps, setupAssets)=>{
    const assetNames = Array.from(new Set([
        ...entryInfo.files,
        ...setupAssets
    ]));
    const [neededFiles, neededSourceMaps] = await Promise.all([
        getAssetFiles(assetNames),
        getSourceMaps(assetNames)
    ]);
    return {
        assetFiles: neededFiles,
        sourceMaps: neededSourceMaps
    };
};
const getNodeExecArgv = ()=>{
    const suppressFile = join(pool_dirname, './rstestSuppressWarnings.cjs');
    return [
        '--experimental-vm-modules',
        '--experimental-import-meta-resolve',
        needFlagExperimentalDetectModule() ? '--experimental-detect-module' : void 0,
        '--require',
        suppressFile
    ].filter(Boolean);
};
const buildTask = async ({ type, workerKind, entryInfo, index, context, project, runtimeConfig, setupEntries, setupAssets, updateSnapshot, getAssetFiles, getSourceMaps, rpcMethods, traceSpan })=>{
    const getAssets = ()=>filterAssetsByEntry(entryInfo, getAssetFiles, getSourceMaps, setupAssets);
    const traceArgs = {
        project: project.name,
        testPath: entryInfo.testPath,
        type
    };
    return {
        worker: workerKind,
        type,
        options: {
            entryInfo,
            context: {
                outputModule: project.outputModule,
                taskId: index + 1,
                project: project.name,
                rootPath: context.rootPath,
                projectRoot: project.rootPath,
                runtimeConfig,
                trace: context.trace
            },
            type,
            setupEntries,
            updateSnapshot,
            assets: memory_isMemorySufficient() ? await traceSpan('host:get-assets-by-entry', 'host', getAssets, {
                ...traceArgs,
                mode: 'eager'
            }) : void 0
        },
        rpcMethods: {
            ...rpcMethods,
            getAssetsByEntry: ()=>traceSpan('host:get-assets-by-entry', 'host', getAssets, {
                    ...traceArgs,
                    mode: 'rpc'
                })
        }
    };
};
const workerErrorToResult = (err, testPath, projectName, context)=>{
    const error = toError(err);
    error.fullStack = true;
    if (error.message.includes('Worker exited unexpectedly')) delete error.stack;
    const runningModule = context.stateManager.runningModules.get(testPath);
    const runningTests = runningModule?.runningTests;
    if (runningTests?.length) {
        const getCaseName = (test)=>`"${test.name}"${test.parentNames?.length ? ` (Under suite: ${test.parentNames?.join(' > ')})` : ''}`;
        const hint = 1 === runningTests.length ? `Maybe relevant test case: ${getCaseName(runningTests[0])} which is running when the error occurs.` : `The below test cases may be relevant, as they were running when the error occurred:\n  - ${runningTests.map((t)=>getCaseName(t)).join('\n  - ')}`;
        error.message += `\n\n${logger_color.white(hint)}`;
    }
    return {
        testId: getFileTaskId(testPath),
        project: projectName,
        testPath,
        status: 'fail',
        name: '',
        results: runningModule?.results || [],
        errors: [
            error
        ]
    };
};
const createPool = async ({ context, recommendWorkerCount = 1 / 0 })=>{
    const shouldEmitUserConsoleLog = ({ log, projectConfig })=>projectConfig.onConsoleLog?.(log.content, log.type) !== false;
    const emitUserConsoleLog = async ({ log, projectConfig })=>{
        try {
            if (!shouldEmitUserConsoleLog({
                log,
                projectConfig
            })) return;
            await Promise.all(reporters.map((reporter)=>reporter.onUserConsoleLog?.(log)));
        } catch (error) {
            logger_logger.error(logger_color.red('Failed to handle console log:'), toError(error));
        }
    };
    const blockedFlags = [
        '--prof',
        '--title'
    ];
    const execArgv = process.execArgv.filter((arg, i, arr)=>{
        if (blockedFlags.some((f)=>arg === f || arg.startsWith(`${f}=`))) return false;
        if (i > 0 && '--title' === arr[i - 1]) return false;
        return true;
    });
    const numCpus = getNumCpus();
    const { normalizedConfig: { pool: poolOptions, isolate }, reporters } = context;
    const workerKind = poolOptions.type ?? 'forks';
    const threadsCount = 'watch' === context.command ? Math.max(Math.floor(numCpus / 2), 1) : Math.max(numCpus - 1, 1);
    const recommendCount = 'watch' === context.command ? threadsCount : Math.min(recommendWorkerCount, threadsCount);
    const maxWorkers = poolOptions.maxWorkers ? parseWorkers(poolOptions.maxWorkers, numCpus) : recommendCount;
    const minWorkers = poolOptions.minWorkers ? parseWorkers(poolOptions.minWorkers, numCpus) : maxWorkers < recommendCount ? maxWorkers : recommendCount;
    if (maxWorkers < minWorkers) throw `Invalid pool configuration: maxWorkers(${maxWorkers}) cannot be less than minWorkers(${minWorkers}).`;
    const pool = new Pool({
        workerEntry: pathe_M_eThtNZ_resolve(pool_dirname, './worker.js'),
        isolate,
        maxWorkers,
        minWorkers,
        execArgv: [
            ...poolOptions?.execArgv ?? [],
            ...execArgv,
            ...isDeno ? [] : getNodeExecArgv()
        ],
        env: {
            NODE_ENV: 'test',
            ...getForceColorEnv(),
            ...process.env
        },
        memoryGate: selectMemoryGate(workerKind)
    });
    const createRpcMethods = ({ runtimeConfig, projectConfig })=>({
            onTestCaseStart: async (test)=>{
                context.stateManager.onTestCaseStart(test);
                Promise.all(reporters.map((reporter)=>reporter.onTestCaseStart?.(test)));
            },
            onTestCaseResult: async (result)=>{
                context.stateManager.onTestCaseResult(result);
                await Promise.all(reporters.map((reporter)=>reporter.onTestCaseResult?.(result)));
            },
            getCountOfFailedTests: async ()=>context.stateManager.getCountOfFailedTests(),
            onConsoleLog: async (log)=>{
                if (runtimeConfig.disableConsoleIntercept) return;
                await emitUserConsoleLog({
                    log,
                    projectConfig
                });
            },
            onTestFileStart: async (test)=>{
                context.stateManager.onTestFileStart(test.testPath);
                await Promise.all(reporters.map((reporter)=>reporter.onTestFileStart?.(test)));
            },
            onTestFileReady: async (test)=>{
                await Promise.all(reporters.map((reporter)=>reporter.onTestFileReady?.(test)));
            },
            onTestSuiteStart: async (test)=>{
                await Promise.all(reporters.map((reporter)=>reporter.onTestSuiteStart?.(test)));
            },
            onTestSuiteResult: async (result)=>{
                await Promise.all(reporters.map((reporter)=>reporter.onTestSuiteResult?.(result)));
            },
            resolveSnapshotPath: (testPath)=>{
                const snapExtension = '.snap';
                const resolver = projectConfig.resolveSnapshotPath || (()=>join(dirname(testPath), '__snapshots__', `${basename(testPath)}${snapExtension}`));
                const snapshotPath = resolver(testPath, snapExtension);
                return snapshotPath;
            }
        });
    return {
        runTests: async ({ entries, getAssetFiles, getSourceMaps, setupEntries, project, updateSnapshot, onCoverageResult, onTraceEvents, traceSpan })=>{
            const projectName = project.name;
            const runtimeConfig = getRuntimeConfig(project);
            const rpcMethods = createRpcMethods({
                runtimeConfig,
                projectConfig: project.normalizedConfig
            });
            const setupAssets = setupEntries.flatMap((entry)=>entry.files || []);
            const results = await Promise.all(entries.map(async (entryInfo, index)=>{
                const traceArgs = {
                    project: projectName,
                    testPath: entryInfo.testPath
                };
                const task = await traceSpan('host:build-task', 'host', ()=>buildTask({
                        type: 'run',
                        workerKind,
                        entryInfo,
                        index,
                        context,
                        project,
                        runtimeConfig,
                        setupEntries,
                        setupAssets,
                        updateSnapshot,
                        getAssetFiles,
                        getSourceMaps,
                        rpcMethods,
                        traceSpan
                    }), traceArgs);
                const result = await traceSpan('host:pool-run-test', 'host', ()=>pool.runTest(task), {
                    ...traceArgs,
                    worker: task.worker
                }).catch((err)=>workerErrorToResult(err, entryInfo.testPath, projectName, context));
                if (result.coverage) {
                    onCoverageResult?.(result.coverage);
                    delete result.coverage;
                }
                if (result.traceEvents) {
                    onTraceEvents?.(result.traceEvents);
                    delete result.traceEvents;
                }
                context.stateManager.onTestFileResult(result);
                reporters.map((reporter)=>reporter.onTestFileResult?.(result));
                return result;
            }));
            for (const result of results)if (result.snapshotResult) context.snapshotManager.add(result.snapshotResult);
            const testResults = results.flatMap((r)=>r.results);
            return {
                results,
                testResults,
                project
            };
        },
        collectTests: async ({ entries, getAssetFiles, getSourceMaps, setupEntries, project, updateSnapshot })=>{
            const runtimeConfig = getRuntimeConfig(project);
            const projectName = project.normalizedConfig.name;
            const rpcMethods = createRpcMethods({
                runtimeConfig,
                projectConfig: project.normalizedConfig
            });
            const setupAssets = setupEntries.flatMap((entry)=>entry.files || []);
            return Promise.all(entries.map(async (entryInfo, index)=>{
                const task = await buildTask({
                    type: 'collect',
                    workerKind,
                    entryInfo,
                    index,
                    context,
                    project,
                    runtimeConfig,
                    setupEntries,
                    setupAssets,
                    updateSnapshot,
                    getAssetFiles,
                    getSourceMaps,
                    rpcMethods,
                    traceSpan: noopTraceSpan
                });
                return pool.collectTests(task).catch((err)=>{
                    err.fullStack = true;
                    return {
                        project: projectName,
                        testPath: entryInfo.testPath,
                        tests: [],
                        errors: [
                            err
                        ]
                    };
                });
            }));
        },
        close: ()=>pool.close()
    };
};
function claimGlobalSetupOnce(project, entriesLength, globalSetupEntriesLength) {
    if (!(entriesLength && globalSetupEntriesLength) || project._globalSetups) return false;
    project._globalSetups = true;
    return true;
}
const CLOSE_TIMEOUT_MS = 10000;
let globalTeardownCallbacks = [];
function applyEnvChanges(changes) {
    for(const key in changes)if (void 0 === changes[key]) Reflect.deleteProperty(process.env, key);
    else process.env[key] = changes[key];
}
const globalSetup_filename = fileURLToPath(import.meta.url);
const globalSetup_dirname = dirname(globalSetup_filename);
const isGlobalSetupResponse = (value)=>'object' == typeof value && null !== value && true === value.__rstest_global_setup__;
class GlobalSetupWorker {
    forkWorker;
    child;
    nextId = 0;
    pending = new Map();
    constructor(forkWorker = fork){
        this.forkWorker = forkWorker;
    }
    rejectPending(id, error) {
        const handler = this.pending.get(id);
        if (!handler) return;
        this.pending.delete(id);
        handler.reject(error);
    }
    rejectAllPending(error) {
        for (const handler of this.pending.values())handler.reject(error);
        this.pending.clear();
    }
    start() {
        if (this.child) return this.child;
        const child = this.forkWorker(pathe_M_eThtNZ_resolve(globalSetup_dirname, './globalSetupWorker.js'), [], {
            execArgv: [
                ...process.execArgv,
                '--experimental-vm-modules',
                '--experimental-import-meta-resolve',
                '--no-warnings'
            ],
            env: {
                NODE_ENV: 'test',
                ...getForceColorEnv(),
                ...process.env
            },
            stdio: [
                'ignore',
                'pipe',
                'pipe',
                'ipc'
            ],
            serialization: getWorkerSerialization()
        });
        child.stdout?.on('data', (chunk)=>process.stdout.write(chunk));
        child.stderr?.on('data', (chunk)=>process.stderr.write(chunk));
        child.on('message', (message)=>{
            if (!isGlobalSetupResponse(message)) return;
            const handler = this.pending.get(message.id);
            if (!handler) return;
            this.pending.delete(message.id);
            handler.resolve(message.result);
        });
        child.on('error', (error)=>{
            this.rejectAllPending(error);
            this.child = void 0;
        });
        child.on('exit', ()=>{
            const error = new Error('[rstest] global setup worker exited');
            this.rejectAllPending(error);
            this.child = void 0;
        });
        this.child = child;
        return child;
    }
    call(payload) {
        const child = this.start();
        const id = ++this.nextId;
        return new Promise((resolve, reject)=>{
            this.pending.set(id, {
                resolve,
                reject
            });
            try {
                child.send({
                    __rstest_global_setup__: true,
                    id,
                    ...payload
                }, (error)=>{
                    if (error) this.rejectPending(id, error);
                });
            } catch (err) {
                this.rejectPending(id, err instanceof Error ? err : new Error(String(err)));
            }
        });
    }
    async close() {
        const child = this.child;
        if (!child) return;
        await killAndWait(child, 'SIGTERM', CLOSE_TIMEOUT_MS);
        this.child = void 0;
    }
}
async function runGlobalSetup({ globalSetupEntries, assetFiles, sourceMaps, interopDefault, outputModule }) {
    const worker = new GlobalSetupWorker();
    const result = await worker.call({
        type: 'setup',
        payload: {
            entries: globalSetupEntries,
            assetFiles,
            interopDefault,
            outputModule,
            sourceMaps
        }
    });
    if (result.success) {
        if (result.envChanges) applyEnvChanges(result.envChanges);
        if (result.hasTeardown) globalTeardownCallbacks.push(()=>runWorkerTeardown(worker));
        else await worker.close();
    } else await worker.close();
    return {
        success: result.success,
        errors: result.errors
    };
}
async function runWorkerTeardown(worker) {
    const result = await worker.call({
        type: 'teardown'
    });
    if (!result.success) process.exitCode = 1;
    await worker.close();
}
async function runGlobalTeardown() {
    const teardownCallbacks = [
        ...globalTeardownCallbacks
    ];
    globalTeardownCallbacks = [];
    for (const teardown of teardownCallbacks.reverse())try {
        await teardown();
    } catch (error) {
        console.error(bgColor('bgRed', 'Error during global teardown'));
        if (error instanceof Error) console.error(logger_color.red(error.stack ?? error.message));
        else console.error(logger_color.red(String(error)));
        process.exitCode = 1;
    }
}
const stableJson = (value)=>{
    if (Array.isArray(value)) return `[${value.map((item)=>stableJson(item)).join(',')}]`;
    if (value && 'object' == typeof value) return `{${Object.entries(value).sort(([a], [b])=>a.localeCompare(b)).map(([key, item])=>`${JSON.stringify(key)}:${stableJson(item)}`).join(',')}}`;
    return JSON.stringify(value);
};
const formatEnvironmentName = (name)=>name.replace(/[^a-zA-Z0-9\-_$]/g, '_');
const formatGroupName = (projectName, groupIndex)=>`${projectName}-environment-${groupIndex}`;
const getProjectEnvironmentKey = (project)=>stableJson(project.normalizedConfig.testEnvironment);
const groupProjectEntriesByEnvironment = async ({ entriesCache, projects })=>{
    const groupedEntriesCache = new Map();
    const groupedProjects = [];
    let changed = false;
    for (const project of projects){
        const projectEntries = entriesCache.get(project.environmentName);
        if (!projectEntries) {
            groupedProjects.push(project);
            continue;
        }
        const groups = new Map();
        const projectEntryItems = Object.entries(projectEntries.entries);
        if (0 === projectEntryItems.length) {
            groupedProjects.push(project);
            groupedEntriesCache.set(project.environmentName, projectEntries);
            continue;
        }
        for (const [entryName, testPath] of projectEntryItems){
            const comment = await parseEnvironmentCommentFromFile(testPath);
            const testEnvironment = comment ? applyEnvironmentComment(project.normalizedConfig.testEnvironment, comment) : project.normalizedConfig.testEnvironment;
            const key = stableJson(testEnvironment);
            let group = groups.get(key);
            if (!group) {
                const config = {
                    ...project.normalizedConfig,
                    name: project.name,
                    testEnvironment
                };
                group = {
                    config,
                    entries: {}
                };
                groups.set(key, group);
            }
            group.entries[entryName] = testPath;
        }
        const baseEnvironmentKey = getProjectEnvironmentKey(project);
        const needsSplit = groups.size > 1 || !groups.has(baseEnvironmentKey);
        if (!needsSplit) {
            groupedProjects.push(project);
            groupedEntriesCache.set(project.environmentName, projectEntries);
            continue;
        }
        changed = true;
        let groupIndex = 0;
        for (const group of groups.values()){
            groupIndex += 1;
            const groupName = formatGroupName(project.name, groupIndex);
            const environmentName = formatEnvironmentName(groupName);
            group.config.name = groupName;
            groupedProjects.push({
                ...project,
                name: groupName,
                environmentName,
                normalizedConfig: group.config
            });
            groupedEntriesCache.set(environmentName, {
                ...projectEntries,
                entries: group.entries
            });
        }
    }
    return {
        entriesCache: groupedEntriesCache,
        projects: groupedProjects,
        changed
    };
};
const isBrowserProject = (project)=>project.normalizedConfig.browser.enabled;
const hasEntries = (entriesCache, environmentName)=>Object.keys(entriesCache.get(environmentName)?.entries || {}).length > 0;
const resolveRunnableProjectsByEntries = async ({ projects, entriesCache, globTestSourceEntries, skipEmptyProjects = true })=>{
    await Promise.all(projects.map((project)=>globTestSourceEntries(project.environmentName)));
    const browserProjects = projects.filter(isBrowserProject);
    const grouped = await groupProjectEntriesByEnvironment({
        entriesCache,
        projects: projects.filter((project)=>!isBrowserProject(project))
    });
    const resolvedEntriesCache = grouped.changed ? new Map([
        ...Array.from(entriesCache.entries()).filter(([environmentName])=>browserProjects.some((project)=>project.environmentName === environmentName)),
        ...grouped.entriesCache
    ]) : entriesCache;
    const resolvedProjects = grouped.changed ? [
        ...browserProjects,
        ...grouped.projects
    ] : projects;
    const shouldRunProject = (project)=>!skipEmptyProjects || hasEntries(resolvedEntriesCache, project.environmentName);
    return {
        projects: resolvedProjects,
        entriesCache: resolvedEntriesCache,
        browserProjectsToRun: resolvedProjects.filter((project)=>isBrowserProject(project) && shouldRunProject(project)),
        nodeProjectsToRun: resolvedProjects.filter((project)=>!isBrowserProject(project) && shouldRunProject(project))
    };
};
const applyEnvironmentGroupsToListEntries = async ({ context, testEntries, globTestSourceEntries })=>{
    if (!context.normalizedConfig.shard) await Promise.all(context.projects.map((project)=>globTestSourceEntries(project.environmentName)));
    const grouped = await groupProjectEntriesByEnvironment({
        entriesCache: new Map(Object.entries(testEntries).map(([environmentName, entries])=>[
                environmentName,
                {
                    entries
                }
            ])),
        projects: context.projects.filter((project)=>!isBrowserProject(project))
    });
    if (!grouped.changed) return;
    const nodeEnvironmentNames = new Set(context.projects.filter((project)=>!isBrowserProject(project)).map((project)=>project.environmentName));
    for (const key of Object.keys(testEntries))if (nodeEnvironmentNames.has(key)) delete testEntries[key];
    for (const [environmentName, entries] of grouped.entriesCache)testEntries[environmentName] = entries.entries;
    context.projects = [
        ...context.projects.filter(isBrowserProject),
        ...grouped.projects
    ];
};
export { applyEnvironmentGroupsToListEntries, claimGlobalSetupOnce, createPool, resolveRunnableProjectsByEntries, runGlobalSetup, runGlobalTeardown };
