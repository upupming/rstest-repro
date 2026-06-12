import "node:module";
import { __webpack_require__ } from "./0~rslib-runtime.js";
import "./8898.js";
import { color as logger_color } from "./2366.js";
import { formatTestError } from "./977.js";
const source_map_support = __webpack_require__("../../node_modules/.pnpm/source-map-support@0.5.21/node_modules/source-map-support/source-map-support.js");
let teardownCallbacks = [];
let initialEnv = {};
let envChanges = {};
function trackEnvChanges() {
    initialEnv = {
        ...process.env
    };
}
function captureEnvChanges() {
    const changes = {};
    for(const key in process.env)if (process.env[key] !== initialEnv[key]) changes[key] = process.env[key];
    for(const key in initialEnv)if (!(key in process.env) && void 0 !== initialEnv[key]) changes[key] = void 0;
    return changes;
}
const runGlobalSetup = async (data)=>{
    try {
        if (0 === data.entries.length) return {
            success: true,
            hasTeardown: false
        };
        (0, source_map_support.install)({
            environment: 'node',
            handleUncaughtExceptions: false,
            retrieveSourceMap: (source)=>{
                if (data.sourceMaps[source]) return {
                    url: source,
                    map: JSON.parse(data.sourceMaps[source])
                };
                return null;
            }
        });
        trackEnvChanges();
        for (const entry of data.entries){
            const { distPath, runtimeDistPath, testPath } = entry;
            const setupCodeContent = data.assetFiles[distPath];
            const { loadModule } = data.outputModule ? await import("./0~loadEsModule.js") : await import("./0~loadModule.js");
            const module = await loadModule({
                codeContent: setupCodeContent,
                distPath,
                runtimeDistPath,
                testPath,
                rstestContext: {
                    global,
                    console: global.console,
                    Error
                },
                assetFiles: data.assetFiles,
                interopDefault: data.interopDefault
            });
            let teardownCallback;
            if (module && 'object' == typeof module) {
                if (module.setup && 'function' == typeof module.setup) {
                    await module.setup();
                    if (module.teardown && 'function' == typeof module.teardown) teardownCallback = module.teardown;
                } else if (module.default && 'function' == typeof module.default) teardownCallback = await module.default();
            }
            if (teardownCallback) teardownCallbacks.push(teardownCallback);
        }
        envChanges = captureEnvChanges();
        return {
            success: true,
            hasTeardown: teardownCallbacks.length > 0,
            teardownCount: teardownCallbacks.length,
            envChanges: envChanges
        };
    } catch (error) {
        return {
            success: false,
            hasTeardown: false,
            errors: await formatTestError(error)
        };
    }
};
const isGlobalSetupRequest = (value)=>'object' == typeof value && null !== value && true === value.__rstest_global_setup__;
const sendResponse = (id, result)=>{
    const response = {
        __rstest_global_setup__: true,
        id,
        result
    };
    process.send?.(response);
};
process.on('message', async (message)=>{
    if (!isGlobalSetupRequest(message)) return;
    try {
        if ('setup' === message.type) {
            const result = await runGlobalSetup(message.payload);
            sendResponse(message.id, result);
        } else {
            const result = await runGlobalTeardown();
            sendResponse(message.id, result);
        }
    } catch (error) {
        sendResponse(message.id, {
            success: false,
            errors: await formatTestError(error)
        });
    }
});
const runGlobalTeardown = async ()=>{
    try {
        const callbacks = [
            ...teardownCallbacks
        ];
        teardownCallbacks = [];
        for (const teardown of callbacks.reverse())await teardown();
        return {
            success: true
        };
    } catch (error) {
        const message = error instanceof Error && error.stack ? error.stack : String(error);
        console.error(logger_color.red(`Error during global teardown: ${message}`));
        return {
            success: false
        };
    }
};
export { runGlobalTeardown };
