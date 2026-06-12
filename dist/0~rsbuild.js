import "node:module";
import { fileURLToPath } from "node:url";
import { createRsbuild, logger } from "@rsbuild/core";
import node_process from "node:process";
import node_path from "node:path";
import { isBuiltin } from "node:module";
import node_inspector from "node:inspector";
import node_fs from "node:fs";
import "./506.js";
import { RSTEST_DYNAMIC_IMPORT_HOOK, RSTEST_REQUIRE_RESOLVE_HOOK, importMetaHook } from "./0~runtimeHooks.js";
import { posix } from "./7011.js";
import { getTempRstestOutputDirGlob, isDebug, resolveProjectBuildCache, getTempRstestOutputDir, castArray, ADDITIONAL_NODE_BUILTINS } from "./2366.js";
const DefaultMaxHeapSize = 1073741824;
function memory_isMemorySufficient(options) {
    const { memoryThreshold = 0.7, maxHeapSize = DefaultMaxHeapSize } = options || {};
    if (!node_process?.memoryUsage) return true;
    const memoryUsage = node_process.memoryUsage();
    const heapUsed = memoryUsage.heapUsed;
    const heapTotal = memoryUsage.heapTotal;
    const memoryUsageRatio = heapUsed / heapTotal;
    const isMemorySufficient = memoryUsageRatio < memoryThreshold && heapUsed < maxHeapSize;
    return isMemorySufficient;
}
const RUNTIME_CHUNK_BASE_NAME = 'runtime';
const runtimeChunkNameForEnvironment = (environmentName)=>`${environmentName}-${RUNTIME_CHUNK_BASE_NAME}`;
const isRuntimeChunk = (chunk, runtimeChunkName)=>chunk.id === runtimeChunkName || (chunk.names?.includes(runtimeChunkName) ?? false);
const requireShim = `// Rstest ESM shims
import __rstest_shim_module__ from 'node:module';
const require = /*#__PURE__*/ __rstest_shim_module__.createRequire(import.meta.url);
`;
const pluginBasic = (context)=>({
        name: 'rstest:basic',
        setup: (api)=>{
            api.modifyBundlerChain((chain, { CHAIN_ID })=>{
                chain.optimization.splitChunks({
                    chunks: 'all'
                });
                chain.module.rule(CHAIN_ID.RULE.JS).oneOf(CHAIN_ID.ONE_OF.JS_MAIN).delete('type');
            });
            api.modifyEnvironmentConfig((config, { mergeEnvironmentConfig, name })=>{
                const outputDistPathRoot = context.normalizedConfig.output.distPath.root;
                const project = context.projects.find((p)=>p.environmentName === name);
                const { normalizedConfig: { resolve, source, output, tools, dev, testEnvironment }, outputModule, rootPath } = project;
                const distRootDir = getTempRstestOutputDir({
                    distPathRoot: outputDistPathRoot,
                    environmentName: name,
                    multipleProjects: context.projects.length > 1
                });
                const buildCache = resolveProjectBuildCache({
                    context,
                    project
                });
                return mergeEnvironmentConfig(config, {
                    performance: buildCache ? {
                        buildCache
                    } : void 0,
                    tools,
                    resolve,
                    source,
                    output,
                    dev
                }, {
                    source: {
                        define: {
                            'import.meta.rstest': "global['@rstest/core']",
                            'import.meta.env': 'process.env'
                        }
                    },
                    resolve: {
                        conditionNames: 'node' === testEnvironment.name || resolve?.conditionNames ? void 0 : [
                            'browser',
                            '...'
                        ]
                    },
                    output: {
                        assetPrefix: '',
                        manifest: `${name}-manifest.json`,
                        sourceMap: {
                            js: 'source-map'
                        },
                        module: outputModule,
                        filename: outputModule ? {
                            js: '[name].mjs'
                        } : void 0,
                        distPath: {
                            root: distRootDir
                        }
                    },
                    tools: {
                        rspack: (config, { isProd, rspack })=>{
                            config.context = node_path.resolve(rootPath);
                            config.mode = isProd ? 'production' : 'development';
                            config.output ??= {};
                            config.output.iife = false;
                            config.output.importFunctionName = outputModule ? importMetaHook(RSTEST_DYNAMIC_IMPORT_HOOK) : RSTEST_DYNAMIC_IMPORT_HOOK;
                            config.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]';
                            if ('string' != typeof config.devtool || !config.devtool.includes('inline')) config.devtool = 'nosources-source-map';
                            const rstestPluginOptions = {
                                injectModulePathName: true,
                                importMetaPathName: true,
                                hoistMockModule: true,
                                manualMockRoot: posix.resolve(rootPath, '__mocks__'),
                                injectDynamicImportOrigin: true,
                                injectRequireResolveOrigin: {
                                    functionName: outputModule ? importMetaHook(RSTEST_REQUIRE_RESOLVE_HOOK) : RSTEST_REQUIRE_RESOLVE_HOOK
                                }
                            };
                            config.plugins.push(new rspack.experiments.RstestPlugin(rstestPluginOptions));
                            config.module.rules ??= [];
                            config.module.rules.push({
                                test: /\.mts$/,
                                type: "javascript/esm"
                            });
                            if (outputModule) config.plugins.push(new rspack.BannerPlugin({
                                banner: requireShim,
                                stage: rspack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE - 1,
                                raw: true,
                                include: /\.(js|mjs)$/
                            }));
                            config.module.parser ??= {};
                            config.module.parser.javascript = {
                                importDynamic: false,
                                requireDynamic: false,
                                requireAsExpression: false,
                                requireResolve: false,
                                ...config.module.parser.javascript || {},
                                exportsPresence: 'warn'
                            };
                            config.resolve ??= {};
                            config.resolve.extensions ??= [];
                            config.resolve.extensions.push('.cjs');
                            config.resolve.extensionAlias ??= {};
                            config.resolve.extensionAlias['.js'] = [
                                '.js',
                                '.ts',
                                '.tsx'
                            ];
                            config.resolve.extensionAlias['.jsx'] = [
                                '.jsx',
                                '.tsx'
                            ];
                            if ('node' === testEnvironment.name) config.resolve.mainFields = config.resolve.mainFields?.filter((filed)=>'module' !== filed) || [
                                'main'
                            ];
                            config.resolve.byDependency ??= {};
                            config.resolve.byDependency.commonjs ??= {};
                            config.resolve.byDependency.commonjs.mainFields = [
                                'main',
                                '...'
                            ];
                            config.optimization = {
                                moduleIds: 'named',
                                chunkIds: 'named',
                                nodeEnv: false,
                                ...config.optimization || {},
                                runtimeChunk: {
                                    name: runtimeChunkNameForEnvironment(name)
                                }
                            };
                        }
                    }
                });
            });
        }
    });
const PLUGIN_CSS_FILTER = 'rstest:css-filter';
const css_filter_dirname = node_path.dirname(fileURLToPath(import.meta.url));
const pluginCSSFilter = ()=>({
        name: PLUGIN_CSS_FILTER,
        setup (api) {
            api.modifyBundlerChain({
                order: 'post',
                handler: (chain, { target, CHAIN_ID, environment })=>{
                    const emitCss = environment.config.output.emitCss ?? 'web' === target;
                    if (!emitCss) {
                        const ruleIds = [
                            [
                                CHAIN_ID.RULE.CSS,
                                CHAIN_ID.ONE_OF.CSS_MAIN
                            ],
                            [
                                CHAIN_ID.RULE.SASS,
                                'sass'
                            ],
                            [
                                CHAIN_ID.RULE.LESS,
                                'less'
                            ],
                            [
                                CHAIN_ID.RULE.STYLUS,
                                'stylus'
                            ]
                        ];
                        for (const [ruleId, mainId] of ruleIds){
                            if (!chain.module.rules.has(ruleId)) continue;
                            const rule = chain.module.rule(ruleId).oneOf(mainId);
                            if (!rule.uses.has(CHAIN_ID.USE.CSS)) continue;
                            const cssLoaderOptions = rule.use(CHAIN_ID.USE.CSS).get('options');
                            if (!cssLoaderOptions.modules || 'object' == typeof cssLoaderOptions.modules && false === cssLoaderOptions.modules.auto) continue;
                            const clonedOptions = {
                                ...cssLoaderOptions,
                                importLoaders: (cssLoaderOptions.importLoaders || 0) + 1
                            };
                            rule.use(CHAIN_ID.USE.CSS).options(clonedOptions);
                            rule.use('rstest-css-pre-filter').loader(node_path.join(css_filter_dirname, 'cssFilterLoader.mjs')).options({
                                modules: cssLoaderOptions.modules
                            }).after(mainId);
                        }
                    }
                }
            });
        }
    });
class TestFileWatchPlugin {
    contextToWatch = null;
    constructor(contextToWatch){
        this.contextToWatch = contextToWatch;
    }
    apply(compiler) {
        compiler.hooks.afterCompile.tap('Rstest:TestFileWatchPlugin', (compilation)=>{
            if (null === this.contextToWatch) return;
            const contextDep = compilation.contextDependencies;
            if (!contextDep.has(this.contextToWatch)) contextDep.add(this.contextToWatch);
        });
    }
}
const pluginEntryWatch = ({ isWatch, globTestSourceEntries, setupFiles, globalSetupFiles, context })=>({
        name: 'rstest:entry-watch',
        setup: (api)=>{
            const outputDistPathRoot = context.normalizedConfig.output.distPath.root;
            api.modifyRspackConfig(async (config, { environment })=>{
                if (isWatch) {
                    config.plugins.push(new TestFileWatchPlugin(environment.config.root));
                    config.entry = async ()=>{
                        const sourceEntries = await globTestSourceEntries(environment.name);
                        return {
                            ...sourceEntries,
                            ...setupFiles[environment.name],
                            ...globalSetupFiles?.[environment.name] || {}
                        };
                    };
                    config.watchOptions ??= {};
                    config.watchOptions.aggregateTimeout = 5;
                    config.watchOptions.ignored = castArray(config.watchOptions.ignored || []);
                    if (0 === config.watchOptions.ignored.length) config.watchOptions.ignored.push('**/.git', '**/node_modules');
                    config.watchOptions.ignored.push(getTempRstestOutputDirGlob(outputDistPathRoot), context.normalizedConfig.coverage.reportsDirectory, ...Object.values(globalSetupFiles?.[environment.name] || {}), '**/*.snap');
                    const configFilePath = context.projects.find((project)=>project.environmentName === environment.name)?.configFilePath;
                    if (configFilePath) config.watchOptions.ignored.push(configFilePath);
                } else {
                    config.watch = false;
                    config.watchOptions ??= {};
                    config.watchOptions.ignored = '**/**';
                    const sourceEntries = await globTestSourceEntries(environment.name);
                    config.entry = {
                        ...setupFiles[environment.name],
                        ...globalSetupFiles?.[environment.name] || {},
                        ...sourceEntries
                    };
                }
            });
        }
    });
const NODE_MODULES_PATH_SEGMENT = '/node_modules/';
const SCRIPT_EXTENSION_RE = /\.(?:[cm]?[jt]sx?)$/;
function hasInlineLoader(request) {
    return request.split('!').length > 1;
}
function normalizePath(value) {
    return value.replaceAll('\\', '/');
}
function stripScriptExtension(specifier) {
    return specifier.replace(SCRIPT_EXTENSION_RE, '');
}
function isRelativeRequest(request) {
    return request.startsWith('.') || request.startsWith('/');
}
function getPackageName(specifier) {
    const normalizedSpecifier = normalizePath(specifier);
    if (!normalizedSpecifier || normalizedSpecifier.startsWith('.') || normalizedSpecifier.startsWith('/') || normalizedSpecifier.startsWith('node:')) return;
    const segments = normalizedSpecifier.split('/');
    if (normalizedSpecifier.startsWith('@')) return segments.length >= 2 ? `${segments[0]}/${segments[1]}` : void 0;
    return segments[0];
}
function getNodeModulesSpecifierFromResolvedPath(resolvedPath) {
    const normalizedResolvedPath = normalizePath(resolvedPath);
    const nodeModulesIndex = normalizedResolvedPath.lastIndexOf(NODE_MODULES_PATH_SEGMENT);
    if (-1 === nodeModulesIndex) return;
    return normalizedResolvedPath.slice(nodeModulesIndex + NODE_MODULES_PATH_SEGMENT.length);
}
function patternMatchesSpecifier(pattern, specifier) {
    if (pattern instanceof RegExp) return pattern.test(specifier) || pattern.test(stripScriptExtension(specifier));
    if (pattern.includes('*')) {
        const escapedPattern = pattern.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`^${escapedPattern.replaceAll('\\*', '.*')}$`);
        return regex.test(specifier) || regex.test(stripScriptExtension(specifier));
    }
    const patternPackageName = getPackageName(pattern);
    if (patternPackageName === pattern) return specifier === pattern || specifier.startsWith(`${pattern}/`);
    return specifier === pattern || stripScriptExtension(specifier) === stripScriptExtension(pattern);
}
function matchesBundledDependency(request, resolvedSpecifier, bundledDependencies) {
    if (!bundledDependencies?.length) return false;
    if (bundledDependencies.some((pattern)=>patternMatchesSpecifier(pattern, request))) return true;
    if (resolvedSpecifier && bundledDependencies.some((pattern)=>patternMatchesSpecifier(pattern, resolvedSpecifier))) return true;
    if (!resolvedSpecifier || !isRelativeRequest(request)) return false;
    const resolvedPackageName = getPackageName(resolvedSpecifier);
    if (void 0 === resolvedPackageName) return false;
    return bundledDependencies.some((pattern)=>{
        if (pattern instanceof RegExp) return false;
        return getPackageName(pattern) === resolvedPackageName;
    });
}
const autoExternalNodeModules = (outputModule, bundledDependencies)=>({ context, request, dependencyType, getResolve }, callback)=>{
        if (!request) return callback();
        if (request.startsWith('@swc/helpers/') || request.endsWith('.wasm') || hasInlineLoader(request)) return callback();
        const doExternal = (externalPath = request)=>{
            callback(void 0, externalPath, 'commonjs' === dependencyType ? 'commonjs' : outputModule ? 'module-import' : 'import');
        };
        const resolver = getResolve?.();
        if (matchesBundledDependency(request, void 0, bundledDependencies)) return callback();
        if (!resolver) return callback();
        resolver(context, request, (err, resolvePath)=>{
            if (err) return callback(void 0, request, 'node-commonjs');
            const normalizedResolvePath = 'string' == typeof resolvePath ? normalizePath(resolvePath) : resolvePath;
            const resolvedSpecifier = 'string' == typeof normalizedResolvePath ? getNodeModulesSpecifierFromResolvedPath(normalizedResolvePath) : void 0;
            const shouldBundleByResolvedPath = matchesBundledDependency(request, resolvedSpecifier, bundledDependencies);
            if (normalizedResolvePath && normalizedResolvePath.includes(NODE_MODULES_PATH_SEGMENT) && !shouldBundleByResolvedPath && !/\.(?:ts|tsx|jsx|mts|cts)$/.test(normalizedResolvePath)) return doExternal(normalizedResolvePath);
            return callback();
        });
    };
function autoExternalNodeBuiltin({ request, dependencyType }, callback) {
    if (!request) return void callback();
    const isNodeBuiltin = isBuiltin(request) || ADDITIONAL_NODE_BUILTINS.some((builtin)=>{
        if ('string' == typeof builtin) return builtin === request;
        return builtin.test(request);
    });
    if (isNodeBuiltin) callback(void 0, request, 'commonjs' === dependencyType ? 'commonjs' : 'module-import');
    else callback();
}
const pluginExternal = (context)=>({
        name: 'rstest:external',
        setup: (api)=>{
            api.modifyEnvironmentConfig((config, { mergeEnvironmentConfig, name })=>{
                const { normalizedConfig: { testEnvironment, output: { bundleDependencies } = {} }, outputModule } = context.projects.find((p)=>p.environmentName === name);
                const shouldExternalize = void 0 === bundleDependencies ? 'node' === testEnvironment.name : Array.isArray(bundleDependencies) ? true : !bundleDependencies;
                return mergeEnvironmentConfig(config, {
                    output: {
                        externals: shouldExternalize ? [
                            autoExternalNodeModules(outputModule, Array.isArray(bundleDependencies) ? bundleDependencies : void 0)
                        ] : void 0
                    },
                    tools: {
                        rspack: (config)=>{
                            config.externals = castArray(config.externals) || [];
                            config.externals.unshift({
                                '@rstest/core': 'global @rstest/core'
                            });
                            config.externalsPresets ??= {};
                            config.externalsPresets.node = false;
                            config.externals.unshift(autoExternalNodeBuiltin);
                        }
                    }
                });
            });
        }
    });
class IgnoreModuleNotFoundErrorPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Rstest:IgnoreModuleNotFoundPlugin', (stats)=>{
            for(let i = stats.compilation.errors.length - 1; i >= 0; i--)if (stats.compilation.errors[i].message.includes('Module not found')) stats.compilation.errors.splice(i, 1);
        });
    }
}
const pluginIgnoreResolveError = {
    name: 'rstest:ignore-resolve-error',
    setup: (api)=>{
        api.modifyRspackConfig((config)=>{
            config.plugins.push(new IgnoreModuleNotFoundErrorPlugin());
            config.optimization ??= {};
            config.optimization.emitOnErrors = true;
            config.ignoreWarnings ??= [];
            config.ignoreWarnings.push(/Module not found/);
        });
    }
};
const hasInspectFlag = (execArgv)=>execArgv?.some((arg)=>arg.startsWith('--inspect')) ?? false;
const pluginInspect = (options)=>{
    const enable = void 0 !== node_inspector.url() || hasInspectFlag(options?.poolExecArgv);
    return enable ? {
        name: 'rstest:inspect',
        setup: (api)=>{
            api.modifyRspackConfig((config)=>{
                config.devtool = 'inline-nosources-source-map';
                config.optimization ??= {};
                config.optimization.splitChunks = {
                    ...config.optimization.splitChunks || {},
                    maxSize: 1048576,
                    chunks: 'all'
                };
            });
        }
    } : null;
};
const mockRuntime_dirname = node_path.dirname(fileURLToPath(import.meta.url));
class MockRuntimeRspackPlugin {
    outputModule;
    constructor(outputModule){
        this.outputModule = outputModule;
    }
    apply(compiler) {
        const { RuntimeModule } = compiler.webpack;
        class RetestImportRuntimeModule extends RuntimeModule {
            constructor(){
                super('rstest runtime');
            }
            generate() {
                const code = node_fs.readFileSync(node_path.join(mockRuntime_dirname, './mockRuntimeCode.js'), 'utf8');
                return code;
            }
        }
        compiler.hooks.compilation.tap('RstestMockPlugin', (compilation)=>{
            compilation.hooks.runtimeModule.tap('RstestWasmRuntimePlugin', (module)=>{
                if ('async_wasm_loading' === module.name) {
                    const finalSource = module.source.source.toString('utf-8').replace('readFile(', this.outputModule ? 'import.meta.readWasmFile(' : 'readWasmFile(');
                    module.source.source = Buffer.from(finalSource);
                }
            });
        });
        compiler.hooks.thisCompilation.tap('RstestMockPlugin', (compilation)=>{
            compilation.hooks.additionalTreeRuntimeRequirements.tap('RstestAddMockRuntimePlugin', (chunk)=>{
                compilation.addRuntimeModule(chunk, new RetestImportRuntimeModule());
            });
        });
    }
}
const pluginMockRuntime = {
    name: 'rstest:mock-runtime',
    setup: (api)=>{
        api.modifyRspackConfig((config)=>{
            config.plugins.push(new MockRuntimeRspackPlugin(Boolean(config.output.module)));
        });
    }
};
class RstestCacheControlPlugin {
    apply(compiler) {
        const { RuntimeModule } = compiler.webpack;
        class RetestCacheControlModule extends RuntimeModule {
            constructor(){
                super('rstest_cache_control');
            }
            generate() {
                return `
global.setupIds = [];

function __rstest_clean_core_cache__() {
  if (typeof __webpack_require__ === 'undefined') {
    return;
  }
  delete __webpack_module_cache__['@rstest/core'];

  global.setupIds.forEach((id) => {
    delete __webpack_module_cache__[id];
  });
}

global.__rstest_clean_core_cache__ = __rstest_clean_core_cache__;
`;
            }
        }
        compiler.hooks.thisCompilation.tap('RstestCacheControlPlugin', (compilation)=>{
            compilation.hooks.additionalTreeRuntimeRequirements.tap('RstestAddCacheControlRuntimePlugin', (chunk)=>{
                compilation.addRuntimeModule(chunk, new RetestCacheControlModule());
            });
        });
    }
}
const pluginCacheControl = (setupFiles)=>({
        name: 'rstest:cache-control',
        setup: (api)=>{
            if (setupFiles.length) api.transform({
                test: setupFiles
            }, ({ code })=>({
                    code: `${code}
         if (global.setupIds && __webpack_module__.id) {
  global.setupIds.push(__webpack_module__.id);
}
        `
                }));
            api.modifyRspackConfig((config)=>{
                config.plugins.push(new RstestCacheControlPlugin());
            });
        }
    });
const rsbuild_dirname = posix.dirname(fileURLToPath(import.meta.url));
const getRuntimeChunkFiles = ({ chunks, outputPath, runtimeChunkName })=>{
    const runtimeChunkFiles = new Set();
    for (const chunk of chunks || [])if (isRuntimeChunk(chunk, runtimeChunkName)) for (const file of chunk.files || [])runtimeChunkFiles.add(posix.join(outputPath, String(file)));
    return runtimeChunkFiles;
};
function parseInlineSourceMapStr(code) {
    const inlineSourceMapRegex = /\/\/# sourceMappingURL=data:application\/json(?:;charset=utf-8)?;base64,(.+)\s*$/m;
    const match = inlineSourceMapRegex.exec(code);
    if (!match?.[1]) return null;
    try {
        const base64Data = match[1];
        const decodedStr = Buffer.from(base64Data, 'base64').toString('utf-8');
        return decodedStr;
    } catch  {
        return null;
    }
}
const isMultiCompiler = (compiler)=>'compilers' in compiler && Array.isArray(compiler.compilers);
const prepareRsbuild = async (context, globTestSourceEntries, setupFiles, globalSetupFiles, targetProjects, extraPlugins = [])=>{
    const { command, normalizedConfig: { isolate, dev = {}, coverage, pool } } = context;
    const projects = targetProjects?.length ? targetProjects : context.projects.filter((project)=>!project.normalizedConfig.browser.enabled);
    const debugMode = isDebug();
    logger.level = debugMode ? 'verbose' : 'error';
    const writeToDisk = dev.writeToDisk || debugMode;
    const rsbuildInstance = await createRsbuild({
        callerName: 'rstest',
        config: {
            root: context.rootPath,
            server: {
                printUrls: false,
                strictPort: false,
                middlewareMode: true,
                compress: false,
                cors: false,
                publicDir: false
            },
            dev: {
                hmr: false,
                writeToDisk
            },
            environments: Object.fromEntries(projects.map((project)=>[
                    project.environmentName,
                    {
                        plugins: project.normalizedConfig.plugins,
                        root: project.rootPath,
                        output: {
                            target: 'node'
                        }
                    }
                ])),
            plugins: [
                pluginBasic(context),
                pluginIgnoreResolveError,
                pluginMockRuntime,
                pluginCSSFilter(),
                pluginEntryWatch({
                    globTestSourceEntries,
                    setupFiles,
                    globalSetupFiles,
                    context,
                    isWatch: 'watch' === command
                }),
                pluginExternal(context),
                !isolate ? pluginCacheControl(Object.values({
                    ...setupFiles,
                    ...globalSetupFiles
                }).flatMap((files)=>Object.values(files))) : null,
                pluginInspect({
                    poolExecArgv: pool.execArgv
                }),
                ...extraPlugins
            ].filter(Boolean)
        }
    });
    if (coverage?.enabled && 'list' !== command) {
        const { loadCoverageProvider } = await import("./1193.js");
        const { pluginCoverage } = await loadCoverageProvider(coverage, context.rootPath);
        coverage.exclude.push(...Object.values(setupFiles).flatMap((files)=>Object.values(files)), ...Object.values(globalSetupFiles || {}).flatMap((files)=>Object.values(files)));
        rsbuildInstance.addPlugins([
            pluginCoverage(coverage)
        ]);
    }
    return rsbuildInstance;
};
const calcEntriesToRerun = (entries, chunks, buildData, outputPath, runtimeChunkName, setupEntries)=>{
    const entryByTestPath = new Map(entries.map((entry)=>[
            entry.testPath,
            entry
        ]));
    const chunkHashesByFile = new Map(Object.entries(buildData.chunkHashesByFile || {}));
    const runtimeChunkFiles = new Set(buildData.runtimeChunkFiles || []);
    for (const chunk of chunks || []){
        const chunkIsRuntime = isRuntimeChunk(chunk, runtimeChunkName);
        for (const file of chunk.files || []){
            const filePath = posix.join(outputPath, String(file));
            chunkHashesByFile.set(filePath, chunk.hash ?? '');
            if (chunkIsRuntime) runtimeChunkFiles.add(filePath);
        }
    }
    const buildChunkHashes = (entry, map)=>{
        const chunkHashes = Object.fromEntries((entry.files || []).filter((file)=>!runtimeChunkFiles.has(file)).map((file)=>[
                file,
                chunkHashesByFile.get(file) ?? ''
            ]));
        map.set(entry.testPath, chunkHashes);
    };
    const processEntryChanges = (prevHashes, currentHashesMap)=>{
        const affectedPaths = new Set();
        const deletedPaths = [];
        if (prevHashes) {
            const prevMap = new Map(prevHashes.map((e)=>[
                    e.name,
                    e.chunks
                ]));
            const currentNames = new Set(currentHashesMap.keys());
            deletedPaths.push(...Array.from(prevMap.keys()).filter((name)=>!currentNames.has(name)));
            currentHashesMap.forEach((currentChunks, testPath)=>{
                const prevChunks = prevMap.get(testPath);
                if (!prevChunks) return void affectedPaths.add(testPath);
                const currentChunkNames = Object.keys(currentChunks);
                const prevChunkNames = Object.keys(prevChunks);
                if (currentChunkNames.length !== prevChunkNames.length) return void affectedPaths.add(testPath);
                const hasChanges = currentChunkNames.some((chunkName)=>prevChunks[chunkName] !== currentChunks[chunkName]);
                if (hasChanges) affectedPaths.add(testPath);
            });
        }
        return {
            affectedPaths,
            deletedPaths
        };
    };
    const previousSetupHashes = buildData.setupEntryToChunkHashes;
    const previousEntryHashes = buildData.entryToChunkHashes;
    const setupEntryToChunkHashesMap = new Map();
    setupEntries.forEach((entry)=>{
        buildChunkHashes(entry, setupEntryToChunkHashesMap);
    });
    const setupEntryToChunkHashes = Array.from(setupEntryToChunkHashesMap.entries()).map(([name, chunks])=>({
            name,
            chunks
        }));
    buildData.setupEntryToChunkHashes = setupEntryToChunkHashes;
    const entryToChunkHashesMap = new Map();
    entries.forEach((entry)=>{
        buildChunkHashes(entry, entryToChunkHashesMap);
    });
    const entryToChunkHashes = Array.from(entryToChunkHashesMap.entries()).map(([name, chunks])=>({
            name,
            chunks
        }));
    buildData.entryToChunkHashes = entryToChunkHashes;
    const referencedChunkFiles = new Set();
    for (const entry of [
        ...setupEntries,
        ...entries
    ])for (const file of entry.files || [])referencedChunkFiles.add(file);
    buildData.chunkHashesByFile = Object.fromEntries(Array.from(chunkHashesByFile.entries()).filter(([file])=>referencedChunkFiles.has(file)));
    buildData.runtimeChunkFiles = Array.from(runtimeChunkFiles).filter((file)=>referencedChunkFiles.has(file));
    const { affectedPaths: affectedSetupPaths, deletedPaths: deletedSetups } = processEntryChanges(previousSetupHashes, setupEntryToChunkHashesMap);
    if (affectedSetupPaths.size > 0 || deletedSetups.length > 0) return {
        affectedEntries: entries,
        deletedEntries: []
    };
    const { affectedPaths: affectedTestPaths, deletedPaths } = processEntryChanges(previousEntryHashes, entryToChunkHashesMap);
    const affectedEntries = Array.from(affectedTestPaths).map((testPath)=>entryByTestPath.get(testPath)).filter((entry)=>void 0 !== entry);
    return {
        affectedEntries,
        deletedEntries: deletedPaths
    };
};
class AssetsMemorySafeMap extends Map {
    set(key, value) {
        if (this.has(key)) return this;
        if (!memory_isMemorySufficient()) this.clear();
        return super.set(key, value);
    }
}
const createRsbuildServer = async ({ globTestSourceEntries, setupFiles, globalSetupFiles, rsbuildInstance, inspectedConfig, isWatchMode })=>{
    let rspackCompiler;
    const rstestCompilerPlugin = {
        name: 'rstest:compiler',
        setup: (api)=>{
            api.modifyBundlerChain((chain)=>{
                chain.module.rule('rstest-mock-module-doppelgangers').test(/\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/).with({
                    rstest: 'importActual'
                }).use('import-actual-loader').loader(posix.resolve(rsbuild_dirname, './importActualLoader.mjs')).end();
            });
            api.onAfterCreateCompiler(({ compiler })=>{
                rspackCompiler = compiler;
            });
        }
    };
    rsbuildInstance.addPlugins([
        rstestCompilerPlugin
    ]);
    const devServer = await rsbuildInstance.createDevServer({
        getPortSilently: true
    });
    if (isDebug() && inspectedConfig) await rsbuildInstance.inspectConfig({
        writeToDisk: true,
        extraConfigs: {
            rstest: inspectedConfig
        }
    });
    if (!rspackCompiler) throw new Error('rspackCompiler was not initialized');
    const outputFileSystem = isMultiCompiler(rspackCompiler) ? rspackCompiler.compilers[0].outputFileSystem : rspackCompiler.outputFileSystem;
    if (!outputFileSystem) throw new Error(`Expect outputFileSystem to be defined, but got ${outputFileSystem}`);
    const cachedReadFilePromises = new Map();
    const readFile = async (fileName)=>{
        if (cachedReadFilePromises.has(fileName)) return cachedReadFilePromises.get(fileName);
        const promise = new Promise((resolve, reject)=>{
            outputFileSystem.readFile(fileName, (err, data)=>{
                if (err) reject(err);
                const content = 'string' == typeof data ? data : fileName.endsWith('.wasm') ? data.toString('base64') : data.toString('utf-8');
                resolve(content);
            });
        });
        cachedReadFilePromises.set(fileName, promise);
        promise.finally(()=>cachedReadFilePromises.delete(fileName));
        return promise;
    };
    const buildData = {};
    const getEntryFiles = (manifest, outputPath)=>{
        const entryFiles = {};
        const entries = Object.keys(manifest.entries);
        for (const entry of entries){
            const data = manifest.entries[entry];
            entryFiles[entry] = ((data?.initial?.js || []).concat(data?.async?.js || []).concat(data?.assets?.filter((asset)=>!asset.endsWith('.map')) || []) || []).map((file)=>file.startsWith(outputPath) ? file : posix.join(outputPath, file));
        }
        return entryFiles;
    };
    const getRsbuildStats = async ({ environmentName, fileFilters })=>{
        const stats = await devServer.environments[environmentName].getStats();
        const enableAssetsCache = memory_isMemorySufficient();
        const manifest = devServer.environments[environmentName].context.manifest;
        const { entrypoints, outputPath, assets, hash, chunks } = stats.toJson({
            all: false,
            hash: true,
            entrypoints: true,
            outputPath: true,
            assets: true,
            relatedAssets: true,
            cachedAssets: true,
            chunks: true,
            timings: true
        });
        const entryFiles = getEntryFiles(manifest, outputPath);
        const runtimeChunkFiles = getRuntimeChunkFiles({
            chunks,
            outputPath: outputPath,
            runtimeChunkName: runtimeChunkNameForEnvironment(environmentName)
        });
        const entries = [];
        const setupEntries = [];
        const globalSetupEntries = [];
        const sourceEntries = await globTestSourceEntries(environmentName);
        for (const entry of Object.keys(entrypoints)){
            const e = entrypoints[entry];
            const filteredAssets = e.assets.filter((asset)=>!asset.name.endsWith('.wasm'));
            const distPath = posix.join(outputPath, filteredAssets[filteredAssets.length - 1].name);
            const runtimeDistPath = entryFiles[entry]?.find((file)=>runtimeChunkFiles.has(file));
            if (setupFiles[environmentName]?.[entry]) setupEntries.push({
                distPath,
                runtimeDistPath,
                testPath: setupFiles[environmentName][entry],
                files: entryFiles[entry],
                chunks: e.chunks || []
            });
            else if (sourceEntries[entry]) {
                if (fileFilters?.length && !fileFilters.includes(sourceEntries[entry])) continue;
                entries.push({
                    distPath,
                    runtimeDistPath,
                    testPath: sourceEntries[entry],
                    files: entryFiles[entry],
                    chunks: e.chunks || []
                });
            } else if (globalSetupFiles?.[environmentName]?.[entry]) globalSetupEntries.push({
                distPath,
                runtimeDistPath,
                testPath: globalSetupFiles[environmentName][entry],
                files: entryFiles[entry],
                chunks: e.chunks || []
            });
        }
        const inlineSourceMap = 'inline-source-map' === stats.compilation.options.devtool;
        const sourceMapPaths = Object.fromEntries(assets.map((asset)=>{
            const assetFilePath = posix.join(outputPath, asset.name);
            if (inlineSourceMap) return [
                assetFilePath,
                assetFilePath
            ];
            const sourceMapPath = asset?.info.related?.sourceMap?.[0];
            if (sourceMapPath) {
                const filePath = posix.join(outputPath, sourceMapPath);
                return [
                    assetFilePath,
                    filePath
                ];
            }
            return [
                assetFilePath,
                null
            ];
        }));
        buildData[environmentName] ??= {};
        const { affectedEntries, deletedEntries } = isWatchMode ? calcEntriesToRerun(entries, chunks, buildData[environmentName], outputPath, runtimeChunkNameForEnvironment(environmentName), setupEntries) : {
            affectedEntries: [],
            deletedEntries: []
        };
        const cachedAssetFiles = new AssetsMemorySafeMap();
        const cachedSourceMaps = new AssetsMemorySafeMap();
        const readFileWithCache = async (name)=>{
            if (enableAssetsCache && cachedAssetFiles.has(name)) return cachedAssetFiles.get(name);
            const content = await readFile(name);
            if (enableAssetsCache) cachedAssetFiles.set(name, content);
            return content;
        };
        const getSourceMap = async (name)=>{
            const sourceMapPath = sourceMapPaths[name];
            if (!sourceMapPath) return null;
            if (enableAssetsCache && cachedSourceMaps.has(name)) return cachedSourceMaps.get(name);
            let content = null;
            if (inlineSourceMap) {
                const file = await readFile(sourceMapPath);
                content = parseInlineSourceMapStr(file);
            } else {
                const sourceMap = await readFile(sourceMapPath);
                content = sourceMap;
            }
            if (enableAssetsCache && content) cachedSourceMaps.set(name, content);
            return content;
        };
        const assetNames = assets.map((asset)=>posix.join(outputPath, asset.name));
        return {
            affectedEntries,
            deletedEntries,
            hash,
            entries,
            setupEntries,
            globalSetupEntries,
            assetNames,
            getAssetFiles: async (names)=>Object.fromEntries(await Promise.all(names.map(async (name)=>{
                    const content = await readFileWithCache(name);
                    return [
                        name,
                        content
                    ];
                }))),
            getSourceMaps: async (names)=>Object.fromEntries(await Promise.all(names.map(async (name)=>{
                    const content = await getSourceMap(name);
                    return [
                        name,
                        content
                    ];
                })))
        };
    };
    return {
        closeServer: devServer.close,
        getRsbuildStats
    };
};
export { createRsbuildServer, memory_isMemorySufficient, prepareRsbuild };
