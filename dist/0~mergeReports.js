import "node:module";
import { existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { createCoverageProvider, ensureCoverageProviderInstalled } from "./1193.js";
import { isBlobFile } from "./7661.js";
import "./506.js";
import { prettyTime, relative, logger as logger_logger, color as logger_color, flushOutputStreams, join } from "./2366.js";
const DEFAULT_BLOB_DIR = '.rstest-reports';
function loadBlobFiles(blobDir) {
    if (!existsSync(blobDir)) throw new Error(`Blob reports directory not found: ${logger_color.cyan(blobDir)}\nRun tests with --reporters=blob first to generate shard reports.`);
    const files = readdirSync(blobDir).filter(isBlobFile).sort();
    if (0 === files.length) throw new Error(`No blob report files found in: ${logger_color.cyan(blobDir)}\nRun tests with --reporters=blob first to generate shard reports.`);
    return files.map((file)=>{
        const content = readFileSync(join(blobDir, file), 'utf-8');
        return JSON.parse(content);
    });
}
function mergeSnapshots(summaries) {
    const merged = {
        added: 0,
        didUpdate: false,
        failure: false,
        filesAdded: 0,
        filesRemoved: 0,
        filesRemovedList: [],
        filesUnmatched: 0,
        filesUpdated: 0,
        matched: 0,
        total: 0,
        unchecked: 0,
        uncheckedKeysByFile: [],
        unmatched: 0,
        updated: 0
    };
    for (const s of summaries){
        merged.added += s.added;
        merged.filesAdded += s.filesAdded;
        merged.filesRemoved += s.filesRemoved;
        merged.filesRemovedList.push(...s.filesRemovedList);
        merged.filesUnmatched += s.filesUnmatched;
        merged.filesUpdated += s.filesUpdated;
        merged.matched += s.matched;
        merged.total += s.total;
        merged.unchecked += s.unchecked;
        merged.uncheckedKeysByFile.push(...s.uncheckedKeysByFile);
        merged.unmatched += s.unmatched;
        merged.updated += s.updated;
        if (s.didUpdate) merged.didUpdate = true;
        if (s.failure) merged.failure = true;
    }
    return merged;
}
function mergeDurations(durations) {
    let totalTime = 0;
    let buildTime = 0;
    let testTime = 0;
    for (const d of durations){
        totalTime += d.totalTime;
        buildTime += d.buildTime;
        testTime += d.testTime;
    }
    return {
        totalTime,
        buildTime,
        testTime
    };
}
function mergeBlobCoverage(blob, coverageMap) {
    if (!blob.coverage) return false;
    coverageMap.merge(blob.coverage);
    return true;
}
async function mergeReports(context, options) {
    const { path, cleanup } = options || {};
    const blobDir = path ? join(context.rootPath, path) : join(context.rootPath, DEFAULT_BLOB_DIR);
    const blobs = loadBlobFiles(blobDir);
    const coverageOptions = context.normalizedConfig.coverage;
    if (coverageOptions.enabled) await ensureCoverageProviderInstalled(coverageOptions, context.rootPath);
    const coverageProvider = coverageOptions.enabled ? await createCoverageProvider(coverageOptions, context.rootPath) : null;
    const relativeBlobDir = relative(context.rootPath, blobDir) || '.';
    logger_logger.log(`\nMerging ${logger_color.bold(String(blobs.length))} blob ${1 === blobs.length ? 'report' : 'reports'} from ${logger_color.cyan(relativeBlobDir)}\n`);
    const allResults = [];
    const allTestResults = [];
    const allDurations = [];
    const shardDurations = [];
    const allSnapshotSummaries = [];
    const allUnhandledErrors = [];
    const mergedCoverageMap = coverageProvider?.createCoverageMap();
    let hasCoverage = false;
    for (const blob of blobs){
        allResults.push(...blob.results);
        allTestResults.push(...blob.testResults);
        allDurations.push(blob.duration);
        allSnapshotSummaries.push(blob.snapshotSummary);
        const shardLabel = blob.shard ? `Shard ${blob.shard.index}/${blob.shard.count}` : 'Shard';
        shardDurations.push({
            label: shardLabel,
            duration: blob.duration
        });
        if (mergedCoverageMap && mergeBlobCoverage(blob, mergedCoverageMap)) hasCoverage = true;
        if (blob.unhandledErrors) for (const e of blob.unhandledErrors){
            const error = new Error(e.message);
            error.name = e.name || 'Error';
            error.stack = e.stack;
            allUnhandledErrors.push(error);
        }
        if (blob.consoleLogs) for (const log of blob.consoleLogs)for (const reporter of context.reporters)reporter.onUserConsoleLog?.(log);
    }
    const mergedDuration = mergeDurations(allDurations);
    const mergedSnapshotSummary = mergeSnapshots(allSnapshotSummaries);
    const mergedCoverage = hasCoverage && mergedCoverageMap ? mergedCoverageMap.toJSON() : void 0;
    const hasFailure = allResults.some((r)=>'fail' === r.status) || allUnhandledErrors.length > 0;
    if (hasFailure) process.exitCode = 1;
    for (const reporter of context.reporters)await reporter.onTestRunStart?.();
    for (const { label, duration } of shardDurations)logger_logger.log(logger_color.gray(`  ${label}: ${prettyTime(duration.totalTime)} (build ${prettyTime(duration.buildTime)}, tests ${prettyTime(duration.testTime)})`));
    if (shardDurations.length > 0) logger_logger.log('');
    for (const result of allResults)for (const reporter of context.reporters)reporter.onTestFileResult?.(result);
    for (const reporter of context.reporters){
        await reporter.onTestRunEnd?.({
            results: allResults,
            coverage: mergedCoverage,
            testResults: allTestResults,
            duration: mergedDuration,
            snapshotSummary: mergedSnapshotSummary,
            unhandledErrors: allUnhandledErrors.length ? allUnhandledErrors : void 0,
            getSourcemap: async ()=>null
        });
        if (false !== reporter.flushOutputStreams) await flushOutputStreams();
    }
    if (coverageProvider && mergedCoverageMap && (!hasFailure || coverageOptions.reportOnFailure)) {
        const { generateCoverage } = await import("./0~generate.js");
        await generateCoverage(context, mergedCoverageMap, coverageProvider);
    }
    if (cleanup && existsSync(blobDir)) {
        rmSync(blobDir, {
            recursive: true
        });
        logger_logger.log(logger_color.gray(`Cleaned up blob reports directory: ${relativeBlobDir}\n`));
    }
}
export { mergeReports };
