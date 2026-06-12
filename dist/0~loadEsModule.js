import "node:module";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import node_vm from "node:vm";
import { logger as logger_logger } from "./2366.js";
import { resolveImportSpecifier, loadWasmFromContent, clearSyntheticModuleCache, finalizeDynamicImport } from "./0~resolveDynamicImport.js";
import { posix } from "./7011.js";
import { RSTEST_REQUIRE_RESOLVE_HOOK, RSTEST_DYNAMIC_IMPORT_HOOK } from "./0~runtimeHooks.js";
var loadEsModule_EsmMode = /*#__PURE__*/ function(EsmMode) {
    EsmMode[EsmMode["Unknown"] = 0] = "Unknown";
    EsmMode[EsmMode["Evaluated"] = 1] = "Evaluated";
    EsmMode[EsmMode["Unlinked"] = 2] = "Unlinked";
    return EsmMode;
}({});
const sourceUrlCommentRE = /\/\/[#@]\s*sourceURL=/;
const shouldInjectSourceURL = ()=>"u" > typeof process && process.versions?.bun !== void 0;
const isRelativePath = (p)=>/^\.\.?\//.test(p);
const appendSourceURL = (codeContent, sourceUrl)=>{
    if (sourceUrlCommentRE.test(codeContent)) return codeContent;
    const suffix = `//# sourceURL=${sourceUrl}`;
    return codeContent.endsWith('\n') ? `${codeContent}${suffix}` : `${codeContent}\n${suffix}`;
};
const defineRstestRequireResolve = ({ testPath, distPath, assetFiles })=>(specifier, optionsOrOrigin, maybeOrigin)=>{
        const options = 'string' == typeof optionsOrOrigin ? void 0 : optionsOrOrigin;
        const origin = 'string' == typeof optionsOrOrigin ? optionsOrOrigin : maybeOrigin;
        const resolveBase = origin ?? testPath;
        const currentDirectory = posix.dirname(origin ?? distPath);
        const joinedPath = isRelativePath(specifier) ? posix.join(currentDirectory, specifier) : specifier;
        const normalizedPath = posix.normalize(joinedPath.startsWith('file://') ? fileURLToPath(joinedPath) : joinedPath);
        if (assetFiles[normalizedPath]) return normalizedPath;
        return createRequire(resolveBase).resolve(specifier, options);
    };
const defineRstestDynamicImport = ({ distPath, testPath, assetFiles, interopDefault, returnModule, esmMode, runtimeDistPath })=>async (specifier, importAttributes, origin)=>{
        const currentDirectory = posix.dirname(distPath);
        const joinedPath = isRelativePath(specifier) ? posix.join(currentDirectory, specifier) : specifier;
        const normalizedPath = posix.normalize(joinedPath.startsWith('file://') ? fileURLToPath(joinedPath) : joinedPath);
        const content = assetFiles[normalizedPath];
        if (content) try {
            if (specifier.endsWith('.wasm')) return loadWasmFromContent(content, joinedPath, returnModule);
            return await loadModule({
                codeContent: content,
                testPath,
                distPath: joinedPath,
                runtimeDistPath,
                rstestContext: {},
                assetFiles,
                interopDefault,
                esmMode
            });
        } catch (err) {
            logger_logger.error(`load file ${joinedPath} failed:\n`, err instanceof Error ? err.message : err);
        }
        return finalizeDynamicImport({
            modulePath: resolveImportSpecifier({
                specifier,
                origin,
                testPath
            }),
            importAttributes,
            interopDefault,
            returnModule
        });
    };
const esmCache = new Map();
const loadModule = async ({ codeContent, distPath, testPath, assetFiles, interopDefault, esmMode = 0, runtimeDistPath })=>{
    const code = shouldInjectSourceURL() ? appendSourceURL(codeContent, distPath) : codeContent;
    let esm = esmCache.get(distPath);
    if (!esm) {
        esm = new node_vm.SourceTextModule(code, {
            identifier: distPath,
            lineOffset: 0,
            columnOffset: 0,
            initializeImportMeta: (meta)=>{
                meta.url = pathToFileURL(distPath === runtimeDistPath ? distPath : testPath).toString();
                meta[RSTEST_DYNAMIC_IMPORT_HOOK] = defineRstestDynamicImport({
                    assetFiles,
                    testPath,
                    distPath: distPath || testPath,
                    runtimeDistPath,
                    interopDefault,
                    returnModule: false,
                    esmMode: 0
                });
                meta[RSTEST_REQUIRE_RESOLVE_HOOK] = defineRstestRequireResolve({
                    assetFiles,
                    testPath,
                    distPath: distPath || testPath
                });
                meta.readWasmFile = (wasmPath, callback)=>{
                    const joinedPath = isRelativePath(wasmPath.pathname) ? posix.join(posix.dirname(distPath), wasmPath.pathname) : wasmPath.pathname;
                    const content = assetFiles[posix.normalize(joinedPath)];
                    if (content) callback(null, Buffer.from(content, 'base64'));
                    else callback(new Error(`WASM file ${joinedPath} not found in asset files.`));
                };
            },
            importModuleDynamically: (specifier, _referencer, importAttributes)=>defineRstestDynamicImport({
                    assetFiles,
                    testPath,
                    distPath: distPath || testPath,
                    runtimeDistPath,
                    interopDefault,
                    returnModule: true,
                    esmMode: 2
                })(specifier, importAttributes)
        });
        if (distPath) esmCache.set(distPath, esm);
    }
    if (2 === esmMode) return esm;
    if ('unlinked' === esm.status) await esm.link((specifier, referencingModule)=>defineRstestDynamicImport({
            assetFiles,
            testPath,
            distPath: distPath || testPath,
            runtimeDistPath,
            interopDefault,
            returnModule: true,
            esmMode: 2
        })(specifier, {}, isRelativePath(specifier) ? referencingModule.identifier : void 0));
    if ('evaluated' !== esm.status && 'evaluating' !== esm.status) await esm.evaluate();
    const ns = esm.namespace;
    return ns.default && ns.default instanceof Promise ? ns.default : ns;
};
const clearModuleCache = ()=>{
    esmCache.clear();
    clearSyntheticModuleCache();
};
export { appendSourceURL, clearModuleCache, loadEsModule_EsmMode as EsmMode, loadModule, shouldInjectSourceURL };
