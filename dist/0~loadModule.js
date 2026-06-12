import "node:module";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import node_vm from "node:vm";
import { logger as logger_logger } from "./2366.js";
import { resolveImportSpecifier, loadWasmFromContent, clearSyntheticModuleCache, finalizeDynamicImport } from "./0~resolveDynamicImport.js";
import { posix } from "./7011.js";
import { RSTEST_REQUIRE_RESOLVE_HOOK, RSTEST_DYNAMIC_IMPORT_HOOK } from "./0~runtimeHooks.js";
const isRelativePath = (p)=>/^\.\.?\//.test(p);
const defineRstestRequireResolve = ({ testPath, distPath, assetFiles })=>(specifier, optionsOrOrigin, maybeOrigin)=>{
        const options = 'string' == typeof optionsOrOrigin ? void 0 : optionsOrOrigin;
        const origin = 'string' == typeof optionsOrOrigin ? optionsOrOrigin : maybeOrigin;
        const resolveBase = origin ?? testPath;
        const currentDirectory = posix.dirname(origin ?? distPath);
        const joinedPath = isRelativePath(specifier) ? posix.join(currentDirectory, specifier) : specifier;
        const normalizedPath = posix.normalize(joinedPath);
        if (assetFiles[normalizedPath]) return normalizedPath;
        return createRequire(resolveBase).resolve(specifier, options);
    };
const loadModule_createRequire = (filename, distPath, rstestContext, assetFiles, interopDefault)=>{
    const _require = (()=>{
        try {
            return createRequire(filename);
        } catch  {
            return createRequire(distPath);
        }
    })();
    const require = (id)=>{
        const currentDirectory = posix.dirname(distPath);
        const joinedPath = isRelativePath(id) ? posix.join(currentDirectory, id) : id;
        const content = assetFiles[joinedPath];
        if (content) try {
            return cacheableLoadModule({
                codeContent: content,
                testPath: joinedPath,
                distPath: joinedPath,
                rstestContext,
                assetFiles,
                interopDefault
            });
        } catch (err) {
            logger_logger.error(`load file ${joinedPath} failed:\n`, err instanceof Error ? err.message : err);
        }
        const resolved = _require.resolve(id);
        return _require(resolved);
    };
    const requireResolve = defineRstestRequireResolve({
        testPath: filename,
        distPath,
        assetFiles
    });
    requireResolve.paths = _require.resolve.paths.bind(_require.resolve);
    require.resolve = requireResolve;
    require.main = _require.main;
    return require;
};
const defineRstestDynamicImport = ({ testPath, interopDefault, returnModule = false, assetFiles })=>async (specifier, importAttributes, origin)=>{
        const modulePath = resolveImportSpecifier({
            specifier,
            origin,
            testPath
        });
        if (modulePath.endsWith('.wasm')) {
            const normalizedPath = posix.normalize(modulePath.startsWith('file://') ? fileURLToPath(modulePath) : modulePath);
            const content = assetFiles[normalizedPath];
            if (content) return loadWasmFromContent(content, modulePath, returnModule);
        }
        return finalizeDynamicImport({
            modulePath,
            importAttributes,
            interopDefault,
            returnModule
        });
    };
const loadModule = ({ codeContent, distPath, testPath, rstestContext, assetFiles, interopDefault })=>{
    const fileDir = posix.dirname(testPath);
    const localModule = {
        children: [],
        exports: {},
        filename: testPath,
        id: testPath,
        isPreloading: false,
        loaded: false,
        path: fileDir
    };
    const context = {
        module: localModule,
        exports: localModule.exports,
        require: loadModule_createRequire(testPath, distPath, rstestContext, assetFiles, interopDefault),
        readWasmFile: (wasmPath, callback)=>{
            const joinedPath = isRelativePath(wasmPath) ? posix.join(posix.dirname(distPath), wasmPath) : wasmPath;
            const content = assetFiles[posix.normalize(joinedPath)];
            if (content) callback(null, Buffer.from(content, 'base64'));
            else callback(new Error(`WASM file ${joinedPath} not found in asset files.`));
        },
        [RSTEST_DYNAMIC_IMPORT_HOOK]: defineRstestDynamicImport({
            testPath,
            interopDefault,
            assetFiles
        }),
        [RSTEST_REQUIRE_RESOLVE_HOOK]: defineRstestRequireResolve({
            testPath,
            distPath,
            assetFiles
        }),
        __dirname: fileDir,
        __filename: testPath,
        ...rstestContext
    };
    const codeDefinition = `'use strict';(${Object.keys(context).join(',')})=>{`;
    const code = `${codeDefinition}${codeContent}\n}`;
    const fn = node_vm.runInThisContext(code, {
        filename: distPath,
        lineOffset: 0,
        columnOffset: -codeDefinition.length,
        importModuleDynamically: (specifier, _referencer, importAttributes)=>defineRstestDynamicImport({
                testPath,
                interopDefault,
                returnModule: true,
                assetFiles
            })(specifier, importAttributes)
    });
    fn(...Object.values(context));
    return localModule.exports;
};
const moduleCache = new Map();
const cacheableLoadModule = ({ codeContent, distPath, testPath, rstestContext, assetFiles, interopDefault })=>{
    if (moduleCache.has(testPath)) return moduleCache.get(testPath);
    const mod = loadModule({
        codeContent,
        distPath,
        testPath,
        rstestContext,
        assetFiles,
        interopDefault
    });
    moduleCache.set(testPath, mod);
    return mod;
};
const clearModuleCache = ()=>{
    moduleCache.clear();
    clearSyntheticModuleCache();
};
export { cacheableLoadModule, clearModuleCache, loadModule };
