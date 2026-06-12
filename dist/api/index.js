import "node:module";
import { createRstest, loadConfig as config_loadConfig, mergeWithCLIOptions, resolveExtends, mergeRstestConfig, initRstestEnv, resolveProjects } from "../7661.js";
import "../506.js";
import { getAbsolutePath } from "../2366.js";
const toSerializedError = (err, seen = new WeakSet())=>{
    if (!err || 'object' != typeof err) return {
        name: 'Error',
        message: String(err)
    };
    if (seen.has(err)) return {
        name: 'Error',
        message: '[Circular]'
    };
    seen.add(err);
    const e = err;
    return {
        name: e.name || 'Error',
        message: e.message ?? String(err),
        stack: e.stack,
        diff: e.diff,
        actual: e.actual,
        expected: e.expected,
        cause: void 0 !== e.cause ? toSerializedError(e.cause, seen) : void 0
    };
};
const toPublicTestResult = (r)=>({
        status: r.status,
        name: r.name,
        testPath: r.testPath,
        parentNames: r.parentNames,
        duration: r.duration,
        errors: r.errors?.map((err)=>toSerializedError(err)),
        retryErrors: r.retryErrors?.map((err)=>toSerializedError(err)),
        retryCount: r.retryCount,
        project: r.project
    });
const toPublicTestFileResult = (f)=>({
        ...toPublicTestResult(f),
        results: f.results.map(toPublicTestResult)
    });
const computeStats = (files)=>{
    const stats = {
        tests: {
            total: 0,
            passed: 0,
            failed: 0,
            skipped: 0,
            todo: 0
        },
        files: {
            total: files.length,
            failed: 0
        }
    };
    for (const file of files){
        if ('fail' === file.status) stats.files.failed++;
        for (const t of file.results){
            stats.tests.total++;
            switch(t.status){
                case 'pass':
                    stats.tests.passed++;
                    break;
                case 'fail':
                    stats.tests.failed++;
                    break;
                case 'skip':
                    stats.tests.skipped++;
                    break;
                case 'todo':
                    stats.tests.todo++;
                    break;
            }
        }
    }
    return stats;
};
const loadConfigForApi = async ({ cwd, configPath, inlineConfig })=>{
    let diskContent = {};
    let filePath;
    if (configPath) {
        const loaded = await config_loadConfig({
            cwd,
            path: configPath
        });
        diskContent = loaded.content;
        filePath = loaded.filePath ?? void 0;
    }
    let resolvedInline = inlineConfig ?? {};
    if (resolvedInline.extends) resolvedInline = await resolveExtends(resolvedInline);
    const merged = mergeRstestConfig(diskContent, resolvedInline);
    return {
        content: merged,
        filePath
    };
};
const snapshotProcessGuards = ()=>{
    const exitCode = process.exitCode;
    const env = {
        ...process.env
    };
    return ()=>{
        process.exitCode = exitCode;
        for (const key of Object.keys(process.env))if (!(key in env)) delete process.env[key];
        Object.assign(process.env, env);
    };
};
async function runRstest(options = {}) {
    const restoreProcessGuards = snapshotProcessGuards();
    initRstestEnv();
    try {
        const cwd = options.cwd ? getAbsolutePath(process.cwd(), options.cwd) : process.cwd();
        const captured = {
            unhandledErrors: [],
            duration: {
                total: 0
            }
        };
        const captureReporter = {
            onTestRunEnd: ({ unhandledErrors, duration, coverage, snapshotSummary })=>{
                captured.unhandledErrors = (unhandledErrors ?? []).map((err)=>toSerializedError(err));
                captured.duration = {
                    total: duration.totalTime
                };
                captured.coverage = coverage;
                captured.snapshot = snapshotSummary;
            }
        };
        let files = [];
        let rstest;
        try {
            const { content: userConfig, filePath: configFilePath } = await loadConfigForApi({
                cwd,
                configPath: options.config,
                inlineConfig: options.inlineConfig
            });
            const cliOptions = {
                testNamePattern: options.testNamePattern
            };
            mergeWithCLIOptions(userConfig, cliOptions);
            userConfig.root = userConfig.root ? getAbsolutePath(cwd, userConfig.root) : cwd;
            const projects = await resolveProjects({
                config: userConfig,
                root: userConfig.root,
                options: cliOptions
            });
            const fileFilters = options.files ?? [];
            const fileFilterMode = void 0 !== options.files ? 'exact' : 'fuzzy';
            rstest = createRstest({
                config: userConfig,
                configFilePath,
                projects,
                cwd,
                embedded: true
            }, 'run', fileFilters, fileFilterMode);
            rstest.context.reporters.push(captureReporter);
            await rstest.runTests();
        } catch (err) {
            captured.unhandledErrors.unshift(toSerializedError(err));
        } finally{
            if (rstest) files = rstest.context.reporterResults.results.map(toPublicTestFileResult);
        }
        const stats = computeStats(files);
        const noTestsFailure = !!rstest && 0 === files.length && !rstest.context.normalizedConfig.passWithNoTests;
        const ok = 0 === stats.tests.failed && 0 === stats.files.failed && 0 === captured.unhandledErrors.length && !noTestsFailure;
        return {
            ok,
            files,
            stats,
            unhandledErrors: captured.unhandledErrors,
            duration: captured.duration,
            snapshot: captured.snapshot,
            coverage: captured.coverage
        };
    } finally{
        restoreProcessGuards();
    }
}
export { runRstest };
