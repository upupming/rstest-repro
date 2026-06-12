const originalWebpackRequire = __webpack_require__;
__webpack_require__ = new Proxy(function(...args) {
    try {
        return originalWebpackRequire(...args);
    } catch (e) {
        const errMsg = e.message ?? e.toString();
        if (errMsg.includes('__webpack_modules__[moduleId] is not a function')) throw new Error(`[Rstest] Cannot find module "${args[0]}"`);
        throw e;
    }
}, {
    set (target, property, value) {
        target[property] = value;
        originalWebpackRequire[property] = value;
        return true;
    },
    get (target, property) {
        if (property in target) return target[property];
        return originalWebpackRequire[property];
    }
});
__webpack_require__.rstest_original_modules = {};
__webpack_require__.rstest_original_module_factories = {};
__webpack_require__.rstest_mocked_ids_by_request = Object.create(null);
const hasOwn = (target, property)=>Object.hasOwn(target, property);
const isPromise = (value)=>value instanceof Promise;
const restoreOriginalFactory = (id)=>{
    const factory = __webpack_require__.rstest_original_module_factories[id];
    if (factory) __webpack_modules__[id] = factory;
    delete __webpack_module_cache__[id];
};
const captureOriginalFactory = (id)=>{
    if (!hasOwn(__webpack_require__.rstest_original_module_factories, id)) __webpack_require__.rstest_original_module_factories[id] = __webpack_modules__[id];
};
const defineExportsWithCjsInterop = (moduleObj, __webpack_exports__, __webpack_require__1)=>{
    __webpack_require__1.r(__webpack_exports__);
    for(const key in moduleObj)__webpack_require__1.d(__webpack_exports__, {
        [key]: ()=>moduleObj[key]
    });
    if (!moduleObj.__esModule && !('default' in moduleObj)) __webpack_require__1.d(__webpack_exports__, {
        default: ()=>moduleObj
    });
};
__webpack_require__.rstest_unmock = (id, request)=>{
    restoreOriginalFactory(id);
    if (void 0 !== request) delete __webpack_require__.rstest_mocked_ids_by_request[request];
};
__webpack_require__.rstest_do_unmock = __webpack_require__.rstest_unmock;
__webpack_require__.rstest_unmock_require = __webpack_require__.rstest_unmock;
__webpack_require__.rstest_do_unmock_require = __webpack_require__.rstest_do_unmock;
__webpack_require__.rstest_require_actual = __webpack_require__.rstest_import_actual = (id)=>{
    if (hasOwn(__webpack_require__.rstest_original_modules, id)) return __webpack_require__.rstest_original_modules[id];
    if (hasOwn(__webpack_require__.rstest_original_module_factories, id)) {
        const mod = __webpack_require__.rstest_original_module_factories[id];
        const moduleInstance = {
            exports: {}
        };
        mod(moduleInstance, moduleInstance.exports, __webpack_require__);
        __webpack_require__.rstest_original_modules[id] = moduleInstance.exports;
        return moduleInstance.exports;
    }
    return __webpack_require__(id);
};
const getMockImplementation = (mockType = 'mock')=>{
    const isMockRequire = 'mockRequire' === mockType || 'doMockRequire' === mockType;
    return (id, modFactory, request)=>{
        const registerRequestAlias = ()=>{
            if (void 0 !== request) __webpack_require__.rstest_mocked_ids_by_request[request] = id;
        };
        const installFactory = (factory)=>{
            __webpack_modules__[id] = factory;
            delete __webpack_module_cache__[id];
            registerRequestAlias();
        };
        const hasCachedModule = hasOwn(__webpack_module_cache__, id);
        let requiredModule = hasCachedModule ? __webpack_module_cache__[id].exports : void 0;
        const wasAlreadyLoaded = hasCachedModule;
        const hasSavedOriginalModule = hasOwn(__webpack_require__.rstest_original_modules, id);
        if (!hasSavedOriginalModule && hasCachedModule) __webpack_require__.rstest_original_modules[id] = requiredModule;
        captureOriginalFactory(id);
        if (modFactory && 'object' == typeof modFactory) {
            const isSpy = true === modFactory.spy;
            const isMock = true === modFactory.mock;
            if (!isSpy && !isMock) throw new Error(`[Rstest] rs.${mockType}() options must be { spy: true } or { mock: true }`);
            if (!wasAlreadyLoaded) try {
                requiredModule = __webpack_require__(id);
            } catch  {
                const optionName = isSpy ? 'spy' : 'mock';
                throw new Error(`[Rstest] rs.${mockType}('${id}', { ${optionName}: true }) failed: cannot load original module`);
            }
            if (!requiredModule) {
                const optionName = isSpy ? 'spy' : 'mock';
                throw new Error(`[Rstest] rs.${mockType}('${id}', { ${optionName}: true }) failed: cannot load original module`);
            }
            const originalModule = requiredModule;
            const mockedModule = globalThis.RSTEST_API?.rstest?.mockObject(originalModule, {
                spy: isSpy
            }) || originalModule;
            const finalModFactory = function(__webpack_module__, __webpack_exports__, __webpack_require__1) {
                if (isMockRequire) {
                    __webpack_module__.exports = mockedModule;
                    return;
                }
                defineExportsWithCjsInterop(mockedModule, __webpack_exports__, __webpack_require__1);
            };
            installFactory(finalModFactory);
            return;
        }
        if ('string' == typeof modFactory || 'number' == typeof modFactory) {
            const finalModFactory = function(__webpack_module__) {
                __webpack_module__.exports = __webpack_require__(modFactory);
            };
            installFactory(finalModFactory);
        } else if ('function' == typeof modFactory) {
            const finalModFactory = function(__webpack_module__, __webpack_exports__, __webpack_require__1) {
                const res = modFactory();
                if (isPromise(res)) {
                    __webpack_module__.exports = res;
                    return;
                }
                if (isMockRequire) {
                    __webpack_module__.exports = res;
                    return;
                }
                defineExportsWithCjsInterop(res, __webpack_exports__, __webpack_require__1);
            };
            installFactory(finalModFactory);
        }
    };
};
__webpack_require__.rstest_mock = getMockImplementation('mock');
__webpack_require__.rstest_mock_require = getMockImplementation('mockRequire');
__webpack_require__.rstest_do_mock = getMockImplementation('doMock');
__webpack_require__.rstest_do_mock_require = getMockImplementation('doMockRequire');
__webpack_require__.rstest_dynamic_require = (id, request)=>{
    const mockedId = __webpack_require__.rstest_mocked_ids_by_request[request];
    return __webpack_require__(void 0 !== mockedId ? mockedId : id);
};
__webpack_require__.rstest_reset_modules = ()=>{
    const mockedIds = Object.keys(__webpack_require__.rstest_original_modules);
    Object.keys(__webpack_module_cache__).forEach((id)=>{
        if (!mockedIds.includes(id)) delete __webpack_module_cache__[id];
    });
};
__webpack_require__.rstest_hoisted = (fn)=>fn();
