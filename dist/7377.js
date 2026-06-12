import "node:module";
import { getRealNow } from "./977.js";
class PhaseTracker {
    currentPhase = null;
    currentStart = 0;
    trace;
    pid;
    tid = nextThreadId++;
    constructor(options = {}){
        this.pid = options.pid ?? process.pid;
        this.trace = options.trace ? {
            events: [],
            meta: options.trace,
            suiteStarts: new Map(),
            caseStarts: new Map()
        } : null;
    }
    transition(phase) {
        if (!this.trace) return;
        const now = getRealNow();
        if (this.currentPhase) this.pushSlice(this.currentPhase, 'phase', this.currentStart, now - this.currentStart);
        this.sampleHeap(now);
        this.currentPhase = phase;
        this.currentStart = now;
    }
    end() {
        if (!this.trace || !this.currentPhase) return;
        const now = getRealNow();
        this.pushSlice(this.currentPhase, 'phase', this.currentStart, now - this.currentStart);
        this.sampleHeap(now);
        this.currentPhase = null;
    }
    recordSuiteStart(info) {
        if (!this.trace) return;
        this.trace.suiteStarts.set(info.testId, getRealNow());
    }
    recordSuiteResult(result) {
        if (!this.trace) return;
        const start = this.trace.suiteStarts.get(result.testId);
        this.trace.suiteStarts.delete(result.testId);
        if (void 0 === start || 'number' != typeof result.duration) return;
        this.pushSlice(result.name || '<suite>', 'suite', start, result.duration, {
            testId: result.testId,
            status: result.status
        });
    }
    recordCaseStart(info) {
        if (!this.trace) return;
        const start = 'number' == typeof info.startTime ? info.startTime : getRealNow();
        this.trace.caseStarts.set(info.testId, start);
    }
    recordCaseResult(result) {
        if (!this.trace) return;
        const start = this.trace.caseStarts.get(result.testId);
        this.trace.caseStarts.delete(result.testId);
        if (void 0 === start || 'number' != typeof result.duration) return;
        this.pushSlice(result.name, 'case', start, result.duration, {
            testId: result.testId,
            status: result.status,
            retryCount: result.retryCount
        });
    }
    getTraceEvents() {
        return this.trace && this.trace.events.length ? this.trace.events : void 0;
    }
    pushSlice(name, cat, startMs, durMs, extraArgs) {
        if (!this.trace) return;
        this.trace.events.push({
            name,
            cat,
            ph: 'X',
            ts: 1000 * startMs,
            dur: 1000 * durMs,
            pid: this.pid,
            tid: this.tid,
            args: {
                testPath: this.trace.meta.testPath,
                project: this.trace.meta.project,
                ...extraArgs
            }
        });
    }
    sampleHeap(nowMs) {
        if (!this.trace) return;
        const mem = process.memoryUsage();
        this.trace.events.push({
            name: 'heap',
            cat: 'memory',
            ph: 'C',
            ts: 1000 * nowMs,
            pid: this.pid,
            tid: this.tid,
            args: {
                heapUsedMB: round2(mem.heapUsed / 1024 / 1024),
                heapTotalMB: round2(mem.heapTotal / 1024 / 1024),
                rssMB: round2(mem.rss / 1024 / 1024)
            }
        });
    }
}
const round2 = (n)=>Math.round(100 * n) / 100;
let nextThreadId = 1;
export { PhaseTracker };
