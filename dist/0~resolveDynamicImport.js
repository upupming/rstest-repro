import "node:module";
import { builtinModules, createRequire } from "node:module";
import { isAbsolute } from "node:path";
import { pathToFileURL } from "node:url";
const shouldInterop = ({ interopDefault = true, modulePath, mod })=>{
    if (!interopDefault) return false;
    return !modulePath.endsWith('.mjs') && 'default' in mod;
};
const isPrimitive = (v)=>v !== Object(v);
function interopModule(mod) {
    if (isPrimitive(mod)) return {
        mod: {
            default: mod
        },
        defaultExport: mod
    };
    const defaultExport = 'default' in mod ? mod.default : mod;
    if (!isPrimitive(defaultExport) && '__esModule' in defaultExport) return {
        mod: defaultExport,
        defaultExport: 'default' in defaultExport ? defaultExport.default : defaultExport
    };
    return {
        mod,
        defaultExport
    };
}
function createInteropProxy(mod, defaultExport) {
    return new Proxy(mod, {
        get (mod, prop) {
            if ('default' === prop) return defaultExport;
            if ('then' === prop && !('then' in mod) && 'function' == typeof defaultExport?.then) return;
            return mod[prop] ?? defaultExport?.[prop];
        },
        has (mod, prop) {
            if ('default' === prop) return void 0 !== defaultExport;
            return prop in mod || !isPrimitive(defaultExport) && prop in defaultExport;
        },
        getOwnPropertyDescriptor (mod, prop) {
            const descriptor = Reflect.getOwnPropertyDescriptor(mod, prop);
            if (descriptor) return descriptor;
            if ('default' === prop && void 0 !== defaultExport && Object.isExtensible(mod)) return {
                value: defaultExport,
                enumerable: true,
                configurable: true
            };
        },
        ownKeys (mod) {
            const keys = Reflect.ownKeys(mod);
            if (void 0 !== defaultExport && !keys.includes('default') && Object.isExtensible(mod)) keys.push('default');
            return keys;
        }
    });
}
const smCache = new Map();
const asModule = async (something, resolvedId, defaultExport)=>{
    const { SyntheticModule } = await import("node:vm");
    const cached = smCache.get(resolvedId);
    if (cached) return cached;
    const hasDefault = void 0 !== defaultExport || 'default' in something;
    const namedKeys = Object.keys(something).filter((k)=>'default' !== k);
    const exports = hasDefault ? [
        'default',
        ...namedKeys
    ] : namedKeys;
    const resolvedDefault = hasDefault ? defaultExport ?? something.default : void 0;
    const syntheticModule = new SyntheticModule(exports, ()=>{
        for (const name of exports)syntheticModule.setExport(name, 'default' === name ? resolvedDefault : something[name]);
    }, {
        identifier: resolvedId
    });
    smCache.set(resolvedId, syntheticModule);
    await syntheticModule.link(()=>void 0);
    if (syntheticModule.instantiate) syntheticModule.instantiate();
    await syntheticModule.evaluate();
    return syntheticModule;
};
const clearSyntheticModuleCache = ()=>{
    smCache.clear();
};
const importMetaResolve = import.meta.resolve?.bind(import.meta);
const isBuiltinSpecifier = (specifier)=>specifier.startsWith('node:') || builtinModules.includes(specifier);
const toNodeBuiltin = (specifier)=>specifier.startsWith('node:') ? specifier : `node:${specifier}`;
const resolveModule = (specifier, resolveBase)=>{
    const parentURL = resolveBase.startsWith('file:') ? resolveBase : pathToFileURL(resolveBase).href;
    if (!importMetaResolve) return pathToFileURL(createRequire(parentURL).resolve(specifier)).href;
    return importMetaResolve(specifier, parentURL);
};
const resolveImportSpecifier = ({ specifier, origin, testPath })=>{
    const resolveBase = origin ?? testPath;
    return isAbsolute(specifier) ? pathToFileURL(specifier).href : isBuiltinSpecifier(specifier) ? toNodeBuiltin(specifier) : resolveModule(specifier, resolveBase);
};
const loadWasmFromContent = async (content, resolvedId, returnModule)=>{
    const wasmModule = await WebAssembly.compile(Buffer.from(content, 'base64'));
    const exports = (await WebAssembly.instantiate(wasmModule)).exports;
    return returnModule ? asModule(exports, resolvedId, exports) : exports;
};
const finalizeDynamicImport = async ({ modulePath, importAttributes, interopDefault, returnModule })=>{
    if (importAttributes?.with?.rstest) delete importAttributes.with.rstest;
    if (modulePath.endsWith('.json')) {
        const importedModule = await import(modulePath, {
            with: {
                type: 'json'
            }
        });
        return returnModule ? asModule(importedModule.default, modulePath, importedModule.default) : {
            ...importedModule.default,
            default: importedModule.default
        };
    }
    const importedModule = await import(modulePath, importAttributes);
    if (shouldInterop({
        interopDefault,
        modulePath,
        mod: importedModule
    }) && !isBuiltinSpecifier(modulePath)) {
        const { mod, defaultExport } = interopModule(importedModule);
        if (returnModule) return asModule(mod, modulePath, defaultExport);
        return createInteropProxy(mod, defaultExport);
    }
    if (returnModule) return asModule(importedModule, modulePath, importedModule.default);
    return importedModule;
};
export { clearSyntheticModuleCache, finalizeDynamicImport, loadWasmFromContent, resolveImportSpecifier };
