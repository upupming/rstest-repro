import { __webpack_require__ } from "./612.js";
import { createRequire } from "node:module";
import { isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createContext } from "istanbul-lib-report";
import istanbul_reports from "istanbul-reports";
import { runInNewContext } from "node:vm";
import istanbul_lib_coverage from "istanbul-lib-coverage";
var plugin_namespaceObject = {};
__webpack_require__.r(plugin_namespaceObject);
__webpack_require__.d(plugin_namespaceObject, {
    W: ()=>pluginCoverage,
    transformCoverage: ()=>plugin_transformCoverage
});
const transformCoverageFns = {};
const plugin_transformCoverage = async (environmentName, code, filename)=>{
    if (!transformCoverageFns[environmentName]) throw new Error(`Can not transform coverage since swc transform function for ${environmentName} is not registered`);
    return transformCoverageFns[environmentName](code, filename);
};
const pluginCoverage = (options)=>({
        name: 'rstest:coverage',
        setup: (api)=>{
            const require = createRequire(import.meta.url);
            const swcPluginPath = require.resolve('swc-plugin-coverage-instrument');
            api.modifyBundlerChain({
                handler: (chain, { rspack, CHAIN_ID, environment })=>{
                    const isV1 = api.context.version.startsWith('1.');
                    const jsRule = isV1 ? chain.module.rule(CHAIN_ID.RULE.JS) : chain.module.rule(CHAIN_ID.RULE.JS).oneOf(CHAIN_ID.ONE_OF.JS_MAIN);
                    const { rspackExperiments: _rspackExperiments, collectTypeScriptInfo: _collectTypeScriptInfo, detectSyntax: _detectSyntax, ...swcOptions } = jsRule.use(CHAIN_ID.USE.SWC).get('options') || {};
                    swcOptions.jsc ??= {};
                    swcOptions.jsc.experimental ??= {};
                    swcOptions.jsc.experimental.plugins ??= [];
                    swcOptions.jsc.experimental.plugins.push([
                        swcPluginPath,
                        {
                            unstableExclude: options.exclude
                        }
                    ]);
                    transformCoverageFns[environment.name] = async (code, filename)=>rspack.experiments.swc.transform(code, {
                            ...swcOptions,
                            jsc: {
                                ...swcOptions.jsc,
                                parser: {
                                    syntax: "typescript",
                                    tsx: Boolean(swcOptions.jsc?.transform?.react),
                                    ...swcOptions.jsc?.parser || {}
                                }
                            },
                            filename
                        });
                },
                order: 'post'
            });
            api.onExit(()=>{
                for (const environmentName of Object.keys(transformCoverageFns))delete transformCoverageFns[environmentName];
            });
        }
    });
const SOURCE_MAP_SCAN_CONCURRENCY = 8;
const { createCoverageMap: createCoverageMap } = istanbul_lib_coverage;
const COVERAGE_MAGIC_KEY = '_coverageSchema';
const COVERAGE_MAGIC_VALUE = '11020577277169172593';
function readInitialCoverage(code) {
    const magicValueIndex = code.indexOf(COVERAGE_MAGIC_VALUE);
    if (-1 === magicValueIndex) throw new Error('cannot find magic value');
    let openBraceIndex = magicValueIndex;
    let remainOpenBraceCount = 1;
    while(remainOpenBraceCount > 0){
        openBraceIndex--;
        if (openBraceIndex < 0) throw new Error('cannot find open brace');
        const char = code[openBraceIndex];
        if ('}' === char) remainOpenBraceCount++;
        else if ('{' === char) remainOpenBraceCount--;
    }
    let closeBraceIndex = magicValueIndex;
    let remainCloseBraceCount = 1;
    while(remainCloseBraceCount > 0){
        closeBraceIndex++;
        if (closeBraceIndex >= code.length) throw new Error('cannot find close brace');
        const char = code[closeBraceIndex];
        if ('{' === char) remainCloseBraceCount++;
        else if ('}' === char) remainCloseBraceCount--;
    }
    const coverageDataStr = code.slice(openBraceIndex, closeBraceIndex + 1);
    const coverageData = runInNewContext(`Object(${coverageDataStr})`);
    if (coverageData?.[COVERAGE_MAGIC_KEY] !== COVERAGE_MAGIC_VALUE) throw new Error('invalid coverageData');
    return coverageData;
}
const innerRegex = /\s*[#@]\s*sourceMappingURL\s*=\s*([^\s'"]*)\s*/;
const sourceMappingURLRegex = new RegExp(`(?:/\\*(?:\\s*\r?\n(?://)?)?(?:${innerRegex.source})\\s*\\*/|//(?:${innerRegex.source}))\\s*`);
function getSourceMappingURL(code) {
    let searchIndex = code.lastIndexOf('sourceMappingURL');
    while(-1 !== searchIndex){
        const lineStart = code.lastIndexOf('\n', searchIndex);
        const lineEnd = code.indexOf('\n', searchIndex);
        const line = code.slice(lineStart + 1, -1 === lineEnd ? code.length : lineEnd);
        const match = line.match(sourceMappingURLRegex);
        if (match) {
            const sourceMappingURL = match[1] || match[2] || '';
            return sourceMappingURL ? decodeURI(sourceMappingURL) : void 0;
        }
        searchIndex = code.lastIndexOf('sourceMappingURL', lineStart - 1);
    }
}
function registerSourceMapURL(filename, code, sourcemapUrlCache) {
    if (!filename.endsWith('js')) return;
    const url = getSourceMappingURL(code);
    sourcemapUrlCache.set(filename, url);
}
const isCoverageMap = (coverage)=>'function' == typeof coverage.files && 'data' in coverage;
const getCoverageMapData = (coverage)=>isCoverageMap(coverage) ? coverage.data : coverage;
const getFileCoverageData = (coverage)=>'data' in coverage ? coverage.data : coverage;
const getFileCoveragePath = (coverage)=>coverage.path;
const hasSameKeys = (a, b)=>{
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length) return false;
    return aKeys.every((key)=>Object.hasOwn(b, key));
};
const hasSameBranchHitShape = (a, b)=>{
    if (!hasSameKeys(a, b)) return false;
    return Object.keys(a).every((key)=>a[key].length === b[key].length);
};
const hasSameOptionalBranchHitShape = (a, b)=>{
    if (!a && !b) return true;
    if (!a || !b) return false;
    return hasSameBranchHitShape(a, b);
};
const isSameRange = (a, b)=>a.start.line === b.start.line && a.start.column === b.start.column && a.end.line === b.end.line && a.end.column === b.end.column;
const hasSameStatementMap = (a, b)=>hasSameKeys(a, b) && Object.keys(a).every((key)=>isSameRange(a[key], b[key]));
const hasSameFunctionMap = (a, b)=>hasSameKeys(a, b) && Object.keys(a).every((key)=>{
        const aFunction = a[key];
        const bFunction = b[key];
        return aFunction.name === bFunction.name && aFunction.line === bFunction.line && isSameRange(aFunction.decl, bFunction.decl) && isSameRange(aFunction.loc, bFunction.loc);
    });
const hasSameBranchMap = (a, b)=>hasSameKeys(a, b) && Object.keys(a).every((key)=>{
        const aBranch = a[key];
        const bBranch = b[key];
        return aBranch.type === bBranch.type && aBranch.line === bBranch.line && isSameRange(aBranch.loc, bBranch.loc) && aBranch.locations.length === bBranch.locations.length && aBranch.locations.every((loc, index)=>isSameRange(loc, bBranch.locations[index]));
    });
const canFastMergeCoverage = (existing, incoming)=>{
    if (true === incoming.all) return true;
    if (true === existing.all) return false;
    if (!hasSameOptionalBranchHitShape(existing.bT, incoming.bT)) return false;
    if (existing.hash && incoming.hash) return existing.hash === incoming.hash;
    if (!hasSameKeys(existing.s, incoming.s) || !hasSameKeys(existing.f, incoming.f) || !hasSameBranchHitShape(existing.b, incoming.b)) return false;
    return hasSameStatementMap(existing.statementMap, incoming.statementMap) && hasSameFunctionMap(existing.fnMap, incoming.fnMap) && hasSameBranchMap(existing.branchMap, incoming.branchMap);
};
const mergeNumberHits = (target, source)=>{
    for (const key of Object.keys(source))target[key] = target[key] + source[key];
};
const mergeBranchHits = (target, source)=>{
    for (const key of Object.keys(source)){
        const targetBranches = target[key];
        const sourceBranches = source[key];
        for(let index = 0; index < sourceBranches.length; index++)targetBranches[index] = targetBranches[index] + sourceBranches[index];
    }
};
const fastMergeFileCoverage = (existing, incoming)=>{
    if (!canFastMergeCoverage(existing, incoming)) return false;
    if (true === incoming.all) return true;
    mergeNumberHits(existing.s, incoming.s);
    mergeNumberHits(existing.f, incoming.f);
    mergeBranchHits(existing.b, incoming.b);
    if (existing.bT && incoming.bT) mergeBranchHits(existing.bT, incoming.bT);
    return true;
};
function createFastCoverageMap() {
    const coverageMap = createCoverageMap({});
    const addFileCoverage = coverageMap.addFileCoverage.bind(coverageMap);
    let hasMergedCoverage = false;
    coverageMap.addFileCoverage = (coverage)=>{
        if ('string' == typeof coverage) return void addFileCoverage(coverage);
        const existingCoverage = coverageMap.data[getFileCoveragePath(coverage)];
        if (existingCoverage && fastMergeFileCoverage(getFileCoverageData(existingCoverage), getFileCoverageData(coverage))) return;
        addFileCoverage(coverage);
    };
    coverageMap.merge = (coverage)=>{
        if (!hasMergedCoverage) {
            for (const fileCoverage of Object.values(getCoverageMapData(coverage)))addFileCoverage(fileCoverage);
            hasMergedCoverage = true;
            return;
        }
        for (const fileCoverage of Object.values(getCoverageMapData(coverage)))coverageMap.addFileCoverage(fileCoverage);
    };
    return coverageMap;
}
async function mapWithConcurrency(items, concurrency, mapper) {
    const results = new Array(items.length);
    let nextIndex = 0;
    const worker = async ()=>{
        while(nextIndex < items.length){
            const currentIndex = nextIndex++;
            results[currentIndex] = await mapper(items[currentIndex], currentIndex);
        }
    };
    const workerCount = Math.min(Math.max(concurrency, 1), items.length);
    await Promise.all(Array.from({
        length: workerCount
    }, ()=>worker()));
    return results;
}
async function utils_transformCoverage(coverageMap, sourcemapUrlCache) {
    const jsFiles = coverageMap.files().filter((filename)=>filename.endsWith('js'));
    const uncachedFiles = jsFiles.filter((filename)=>!sourcemapUrlCache.has(filename));
    if (uncachedFiles.length) {
        const { readFile } = await import("node:fs/promises");
        await mapWithConcurrency(uncachedFiles, SOURCE_MAP_SCAN_CONCURRENCY, async (filename)=>{
            try {
                const content = await readFile(filename, 'utf8');
                sourcemapUrlCache.set(filename, getSourceMappingURL(content));
            } catch  {}
        });
    }
    let store;
    for (const filename of jsFiles){
        const url = sourcemapUrlCache.get(filename);
        if (url) {
            if (!store) {
                const { createSourceMapStore } = await import("istanbul-lib-source-maps");
                store = createSourceMapStore();
            }
            store.registerURL(filename, url);
        }
    }
    if (store) return store.transformCoverage(coverageMap);
    return coverageMap;
}
const UNTESTED_FILES_CONCURRENCY = 4;
class CoverageProvider {
    options;
    root;
    coverageMap = null;
    sourcemapUrlCache = new Map();
    constructor(options, root){
        this.options = options;
        this.root = root;
    }
    init() {
        if ("u" > typeof globalThis) globalThis.__coverage__ = globalThis.__coverage__ || {};
    }
    async generateCoverageForUntestedFiles({ environmentName, files }) {
        const { transformCoverage } = await Promise.resolve(plugin_namespaceObject);
        const { readFile } = await import("node:fs/promises");
        return mapWithConcurrency(files, UNTESTED_FILES_CONCURRENCY, async (file)=>{
            try {
                const content = await readFile(file, 'utf-8');
                const { code } = await transformCoverage(environmentName, content, file);
                registerSourceMapURL(file, code, this.sourcemapUrlCache);
                return readInitialCoverage(code);
            } catch (e) {
                console.error(`Can not generate coverage for untested file, file: ${file}, error: ${e}`);
                process.exitCode = 1;
                return;
            }
        }).then((results)=>results.filter((r)=>!!r));
    }
    createCoverageMap() {
        return createFastCoverageMap();
    }
    collect(_options) {
        if ("u" < typeof globalThis || !globalThis.__coverage__) return null;
        try {
            if (!this.coverageMap) this.coverageMap = this.createCoverageMap();
            if (this.coverageMap) this.coverageMap.merge(globalThis.__coverage__);
            return this.coverageMap;
        } catch (error) {
            console.error('Failed to collect coverage data:', error);
            process.exitCode = 1;
            return null;
        }
    }
    async generateReports(coverageMap) {
        const context = createContext({
            dir: this.options.reportsDirectory,
            coverageMap: await utils_transformCoverage(coverageMap, this.sourcemapUrlCache)
        });
        const reportersList = this.options.reporters;
        for (const reporter of reportersList)if ('object' == typeof reporter && 'execute' in reporter) reporter.execute(context);
        else {
            const [reporterName, reporterOptions] = Array.isArray(reporter) ? reporter : [
                reporter,
                {}
            ];
            const report = await this.createReport(reporterName, reporterOptions);
            report.execute(context);
        }
    }
    async createReport(reporterName, reporterOptions) {
        const resolvedReporterName = this.resolveReporterName(reporterName);
        if (resolvedReporterName.endsWith('.mjs')) {
            const reporterModule = await import(this.toImportSpecifier(resolvedReporterName));
            const Reporter = reporterModule.default;
            return new Reporter(reporterOptions);
        }
        try {
            return istanbul_reports.create(resolvedReporterName, reporterOptions);
        } catch (error) {
            if (!this.isRequireEsmError(error)) throw error;
        }
        const reporterModule = await import(this.toImportSpecifier(resolvedReporterName));
        const Reporter = reporterModule.default;
        return new Reporter(reporterOptions);
    }
    resolveReporterName(reporterName) {
        if (reporterName.startsWith('.')) return resolve(this.root ?? process.cwd(), reporterName);
        return reporterName;
    }
    toImportSpecifier(reporterName) {
        if (isAbsolute(reporterName)) return pathToFileURL(reporterName).toString();
        return reporterName;
    }
    isRequireEsmError(error) {
        if ('object' != typeof error || null === error || !('code' in error)) return false;
        return 'ERR_REQUIRE_ESM' === error.code;
    }
    cleanup() {
        if ("u" > typeof globalThis && '__coverage__' in globalThis) delete globalThis.__coverage__;
        this.coverageMap = null;
    }
}
export { CoverageProvider, pluginCoverage };
