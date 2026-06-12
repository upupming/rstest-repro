import "node:module";
import node_fs, { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { loadConfig, mergeRsbuildConfig } from "@rsbuild/core";
import { stripVTControlCharacters } from "node:util";
import promises from "node:fs/promises";
import node_path, { dirname as external_node_path_dirname, resolve as external_node_path_resolve } from "node:path";
import { createRequire } from "node:module";
import { __webpack_require__ } from "./0~rslib-runtime.js";
import { DEFAULT_CONFIG_NAME, globalApis, pathe_M_eThtNZ_resolve, relative, join, logger as logger_logger, prettyTime, getTempRstestOutputDirGlob, color as logger_color, isAbsolute, getOutputDistPathRoot, TEMP_RSTEST_OUTPUT_DIR, TS_CONFIG_FILE, basename, normalizeBuildCache, resolveBuildCacheDependencyPaths, dirname as pathe_M_eThtNZ_dirname, isTTY, getAbsolutePath, flushOutputStreams, formatRootStr, bgColor, ENV, determineAgent, castArray, dist_m, getTaskNameWithPrefix, isDebug, DEFAULT_CONFIG_EXTENSIONS, normalize } from "./2366.js";
import { isDynamicPattern, detect, glob, filterProjects, prettyTestPath, formatTestPath } from "./506.js";
import { posix } from "./7011.js";
import { parse as stack_trace_parser_esm_parse } from "./1672.js";
import { decode } from "./4397.js";
var init_namespaceObject = {};
__webpack_require__.r(init_namespaceObject);
__webpack_require__.d(init_namespaceObject, {
    initCli: ()=>initCli,
    mergeWithCLIOptions: ()=>mergeWithCLIOptions,
    resolveProjects: ()=>resolveProjects
});
var core_namespaceObject = {};
__webpack_require__.r(core_namespaceObject);
__webpack_require__.d(core_namespaceObject, {
    createRstest: ()=>createRstest
});
var error_namespaceObject = {};
__webpack_require__.r(error_namespaceObject);
__webpack_require__.d(error_namespaceObject, {
    C: ()=>formatStack,
    parseErrorStacktrace: ()=>error_parseErrorStacktrace,
    printError: ()=>error_printError
});
function initNodeEnv() {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
}
function initRstestEnv() {
    initNodeEnv();
    process.env[ENV.RSTEST] = 'true';
}
function prepareCli() {
    initRstestEnv();
    const { npm_execpath } = process.env;
    if (!npm_execpath || npm_execpath.includes('npx-cli.js') || npm_execpath.includes('.bun')) logger_logger.log();
}
function showRstest() {
    logger_logger.greet("  Rstest v0.10.4");
    logger_logger.log('');
}
const DEFAULT_FORCE_RERUN_TRIGGERS = [
    '**/package.json/**',
    '**/rstest.config.*'
];
const findConfig = (basePath)=>DEFAULT_CONFIG_EXTENSIONS.map((ext)=>basePath + ext).find(node_fs.existsSync);
const resolveConfigPath = (root, customConfig)=>{
    if (customConfig) {
        const customConfigPath = isAbsolute(customConfig) ? customConfig : join(root, customConfig);
        if (node_fs.existsSync(customConfigPath)) return customConfigPath;
        throw `Cannot find config file: ${logger_color.dim(customConfigPath)}`;
    }
    const configFilePath = findConfig(join(root, DEFAULT_CONFIG_NAME));
    if (configFilePath) return configFilePath;
    return null;
};
async function config_loadConfig({ cwd = process.cwd(), path, envMode, configLoader }) {
    const configFilePath = resolveConfigPath(cwd, path);
    if (!configFilePath) {
        logger_logger.debug('no rstest config file found');
        return {
            content: {},
            filePath: configFilePath
        };
    }
    const { content } = await loadConfig({
        cwd: pathe_M_eThtNZ_dirname(configFilePath),
        path: configFilePath,
        envMode,
        loader: configLoader
    });
    let config = content;
    config = await resolveExtends(config);
    return {
        content: config,
        filePath: configFilePath
    };
}
const resolveExtendEntry = async (entry, userConfig)=>{
    const resolved = 'function' == typeof entry ? await entry(userConfig) : entry;
    if ('projects' in resolved) {
        const { projects: _projects, ...rest } = resolved;
        return rest;
    }
    return resolved;
};
const resolveExtends = async (config)=>{
    if (!config.extends) return config;
    const userConfig = Object.freeze({
        ...config
    });
    const extendsEntries = castArray(config.extends);
    const resolvedExtends = await Promise.all(extendsEntries.map((entry)=>resolveExtendEntry(entry, userConfig)));
    const merged = mergeRstestConfig(...resolvedExtends, config);
    if (void 0 === config.forceRerunTriggers) {
        const extendedForceRerunTriggers = resolvedExtends.flatMap((entry)=>entry.forceRerunTriggers || []);
        if (extendedForceRerunTriggers.length) merged.forceRerunTriggers = Array.from(new Set([
            ...DEFAULT_FORCE_RERUN_TRIGGERS,
            ...extendedForceRerunTriggers
        ]));
    }
    return merged;
};
const mergeProjectConfig = (...configs)=>mergeRstestConfig(...configs);
const mergeRstestConfig = (...configs)=>configs.reduce((result, config)=>{
        const merged = mergeRsbuildConfig(result, {
            ...config,
            exclude: Array.isArray(config.exclude) ? {
                patterns: config.exclude,
                override: false
            } : config.exclude
        });
        if (!Array.isArray(config.exclude) && config.exclude?.override) merged.exclude = {
            patterns: config.exclude.patterns
        };
        if (config.browser) merged.browser = {
            ...merged.browser || {},
            ...config.browser
        };
        merged.include = config.include ?? merged.include;
        merged.forceRerunTriggers = config.forceRerunTriggers ?? merged.forceRerunTriggers;
        merged.reporters = config.reporters ?? merged.reporters;
        if (merged.coverage) merged.coverage.reporters = config.coverage?.reporters ?? merged.coverage?.reporters;
        return merged;
    }, {});
const isGithubActions = ()=>'true' === process.env.GITHUB_ACTIONS;
const getDefaultReporters = (githubActions = isGithubActions())=>githubActions ? [
        'default',
        'github-actions'
    ] : [
        'default'
    ];
const createDefaultConfig = ()=>({
        root: process.cwd(),
        name: 'rstest',
        include: [
            '**/*.{test,spec}.?(c|m)[jt]s?(x)'
        ],
        exclude: {
            patterns: [
                '**/node_modules/**',
                '**/dist/**',
                '**/.{idea,git,cache,output,temp}/**'
            ],
            override: false
        },
        setupFiles: [],
        globalSetup: [],
        includeSource: [],
        forceRerunTriggers: DEFAULT_FORCE_RERUN_TRIGGERS,
        pool: {
            type: 'forks'
        },
        isolate: true,
        globals: false,
        passWithNoTests: false,
        update: false,
        testTimeout: 5000,
        hookTimeout: 10000,
        testEnvironment: {
            name: 'node'
        },
        output: {
            distPath: {
                root: TEMP_RSTEST_OUTPUT_DIR
            }
        },
        retry: 0,
        reporters: getDefaultReporters(),
        clearMocks: false,
        resetMocks: false,
        restoreMocks: false,
        slowTestThreshold: 300,
        unstubGlobals: false,
        unstubEnvs: false,
        maxConcurrency: 5,
        printConsoleTrace: false,
        disableConsoleIntercept: false,
        silent: false,
        snapshotFormat: {},
        env: {},
        hideSkippedTests: false,
        hideSkippedTestFiles: false,
        logHeapUsage: false,
        detectAsyncLeaks: false,
        bail: 0,
        includeTaskLocation: false,
        browser: {
            enabled: false,
            provider: 'playwright',
            browser: 'chromium',
            headless: dist_m,
            strictPort: false,
            providerOptions: {}
        },
        coverage: {
            exclude: [
                '**/node_modules/**',
                '**/test/**',
                '**/__tests__/**',
                '**/__mocks__/**',
                '**/*.d.ts',
                '**/*.{test,spec}.[jt]s',
                '**/*.{test,spec}.[cm][jt]s',
                '**/*.{test,spec}.[jt]sx',
                '**/*.{test,spec}.[cm][jt]sx'
            ],
            enabled: false,
            changed: void 0,
            provider: 'istanbul',
            reporters: [
                'text',
                'html',
                'clover',
                'json'
            ],
            reportsDirectory: './coverage',
            clean: true,
            reportOnFailure: false,
            allowExternal: false
        }
    });
const withDefaultConfig = (config)=>{
    const merged = mergeRstestConfig(createDefaultConfig(), config);
    merged.setupFiles = castArray(merged.setupFiles);
    merged.globalSetup = castArray(merged.globalSetup);
    const outputDistPathRoot = getOutputDistPathRoot(merged.output?.distPath);
    merged.output.distPath = {
        root: formatRootStr(outputDistPathRoot, merged.root)
    };
    if (merged.performance?.buildCache) merged.performance.buildCache = normalizeBuildCache({
        buildCache: merged.performance.buildCache,
        root: merged.root,
        tsconfigPaths: merged.source?.tsconfigPath ? [
            merged.source.tsconfigPath
        ] : [],
        coverageEnabled: merged.coverage?.enabled,
        coverageProvider: merged.coverage?.provider,
        outputDistPathRoot: merged.output.distPath.root
    });
    merged.exclude.patterns.push(getTempRstestOutputDirGlob(merged.output?.distPath?.root));
    const reportsDirectory = formatRootStr(merged.coverage.reportsDirectory, merged.root);
    merged.coverage.reportsDirectory = isAbsolute(reportsDirectory) ? reportsDirectory : pathe_M_eThtNZ_resolve(merged.root, reportsDirectory);
    merged.pool = 'string' == typeof config.pool ? {
        type: config.pool
    } : merged.pool;
    merged.testEnvironment = 'string' == typeof config.testEnvironment ? {
        name: config.testEnvironment
    } : merged.testEnvironment;
    merged.browser = {
        enabled: merged.browser?.enabled ?? false,
        provider: merged.browser?.provider ?? 'playwright',
        browser: merged.browser?.browser ?? 'chromium',
        headless: merged.browser?.headless ?? dist_m,
        port: merged.browser?.port,
        strictPort: merged.browser?.strictPort ?? false,
        viewport: merged.browser?.viewport,
        providerOptions: merged.browser?.providerOptions ?? {}
    };
    return {
        ...merged,
        include: merged.include.map((p)=>formatRootStr(p, merged.root)),
        exclude: {
            ...merged.exclude,
            patterns: merged.exclude.patterns.map((p)=>formatRootStr(p, merged.root))
        },
        setupFiles: merged.setupFiles.map((p)=>formatRootStr(p, merged.root)),
        globalSetup: merged.globalSetup.map((p)=>formatRootStr(p, merged.root)),
        includeSource: merged.includeSource.map((p)=>formatRootStr(p, merged.root)),
        forceRerunTriggers: merged.forceRerunTriggers.map((p)=>formatRootStr(p, merged.root))
    };
};
function coerceCliBoolean(value) {
    if ('boolean' == typeof value) return value;
    if ('string' == typeof value) {
        if ('true' === value) return true;
        if ('false' === value) return false;
    }
}
const normalizeBooleanLikeCliValue = (value)=>{
    if ('false' === value) return false;
    if ('true' === value) return true;
    return value;
};
function mergeWithCLIOptions(config, options) {
    const keys = [
        'root',
        'globals',
        'isolate',
        'passWithNoTests',
        'silent',
        'update',
        'testNamePattern',
        'testTimeout',
        'hookTimeout',
        'clearMocks',
        'resetMocks',
        'restoreMocks',
        'unstubEnvs',
        'unstubGlobals',
        'retry',
        'slowTestThreshold',
        'maxConcurrency',
        'printConsoleTrace',
        'disableConsoleIntercept',
        'testEnvironment',
        'hideSkippedTests',
        'hideSkippedTestFiles',
        'logHeapUsage',
        'detectAsyncLeaks',
        'includeTaskLocation'
    ];
    for (const key of keys)if (void 0 !== options[key]) config[key] = options[key];
    if (void 0 !== options.changed && void 0 === options.passWithNoTests) config.passWithNoTests ??= true;
    if (options.reporters) config.reporters = castArray(options.reporters);
    if (options.shard) {
        const [index, count] = options.shard.split('/').map(Number);
        if (!index || !count || Number.isNaN(index) || Number.isNaN(count) || index < 1 || index > count) throw new Error(`Invalid shard option: ${options.shard}. It must be in the format of <index>/<count> and 1-based.`);
        config.shard = {
            index,
            count
        };
    }
    if (void 0 !== options.bail && ('number' == typeof options.bail || 'boolean' == typeof options.bail)) config.bail = Number(options.bail);
    if (void 0 !== options.coverage) {
        config.coverage ??= {};
        if ('boolean' == typeof options.coverage) config.coverage.enabled = options.coverage;
        else {
            let changed;
            let shouldEnableCoverage = false;
            const coverageEnabled = coerceCliBoolean(options.coverage.enabled);
            if (void 0 !== coverageEnabled) config.coverage.enabled = coverageEnabled;
            if (void 0 !== options.coverage.allowExternal) {
                config.coverage.allowExternal = options.coverage.allowExternal;
                shouldEnableCoverage = true;
            }
            if (void 0 !== options.coverage.provider) {
                config.coverage.provider = options.coverage.provider;
                shouldEnableCoverage = true;
            }
            if (void 0 !== options.coverage.include) {
                config.coverage.include = castArray(options.coverage.include);
                shouldEnableCoverage = true;
            }
            if (void 0 !== options.coverage.exclude) {
                config.coverage.exclude = [
                    ...config.coverage.exclude || [],
                    ...castArray(options.coverage.exclude)
                ];
                shouldEnableCoverage = true;
            }
            if (void 0 !== options.coverage.reporters) {
                config.coverage.reporters = castArray(options.coverage.reporters);
                shouldEnableCoverage = true;
            }
            if (void 0 !== options.coverage.reportsDirectory) {
                config.coverage.reportsDirectory = options.coverage.reportsDirectory;
                shouldEnableCoverage = true;
            }
            if (void 0 !== options.coverage.reportOnFailure) {
                const reportOnFailure = coerceCliBoolean(options.coverage.reportOnFailure);
                if (void 0 !== reportOnFailure) {
                    config.coverage.reportOnFailure = reportOnFailure;
                    shouldEnableCoverage = true;
                }
            }
            if (void 0 !== options.coverage.clean) {
                const clean = coerceCliBoolean(options.coverage.clean);
                if (void 0 !== clean) {
                    config.coverage.clean = clean;
                    shouldEnableCoverage = true;
                }
            }
            if (void 0 !== options.coverage.changed) {
                changed = normalizeBooleanLikeCliValue(options.coverage.changed);
                config.coverage.changed = changed;
                shouldEnableCoverage ||= false !== changed;
            }
            if (void 0 === coverageEnabled && void 0 === options.coverage.enabled && shouldEnableCoverage) config.coverage.enabled = true;
        }
    }
    if (options.exclude) config.exclude = castArray(options.exclude);
    if (options.include) config.include = castArray(options.include);
    if (options.source?.tsconfigPath !== void 0) {
        config.source ??= {};
        config.source.tsconfigPath = options.source.tsconfigPath;
    }
    if (options.dev?.writeToDisk !== void 0) {
        config.dev ??= {};
        config.dev.writeToDisk = options.dev.writeToDisk;
    }
    if (void 0 !== options.output) {
        config.output ??= {};
        if (void 0 !== options.output.emitAssets) config.output.emitAssets = options.output.emitAssets;
        if (void 0 !== options.output.cleanDistPath) config.output.cleanDistPath = options.output.cleanDistPath;
        if (void 0 !== options.output.module) config.output.module = options.output.module;
    }
    if (void 0 !== options.browser) {
        config.browser ??= {
            provider: 'playwright'
        };
        if ('boolean' == typeof options.browser) config.browser.enabled = options.browser;
        else {
            const browserEnabled = coerceCliBoolean(options.browser.enabled);
            if (void 0 !== browserEnabled) config.browser.enabled = browserEnabled;
            if (void 0 !== options.browser.name) config.browser.browser = options.browser.name;
            if (void 0 !== options.browser.headless) config.browser.headless = options.browser.headless;
            if (void 0 !== options.browser.port) config.browser.port = Number(options.browser.port);
            if (void 0 !== options.browser.strictPort) config.browser.strictPort = options.browser.strictPort;
        }
    }
    if (void 0 !== options.pool) {
        const poolFromCli = options.pool;
        if ('string' == typeof poolFromCli) {
            if ('string' == typeof config.pool) config.pool = {
                type: config.pool
            };
            config.pool ??= {};
            if ('object' != typeof config.pool) config.pool = {};
            const pool = config.pool;
            pool.type = poolFromCli;
        } else {
            if ('string' == typeof config.pool) config.pool = {
                type: config.pool
            };
            config.pool ??= {};
            if ('object' != typeof config.pool) config.pool = {};
            const pool = config.pool;
            if (void 0 !== poolFromCli.type) pool.type = poolFromCli.type;
            if (void 0 !== poolFromCli.maxWorkers) pool.maxWorkers = poolFromCli.maxWorkers;
            if (void 0 !== poolFromCli.minWorkers) pool.minWorkers = poolFromCli.minWorkers;
            if (void 0 !== poolFromCli.execArgv) pool.execArgv = castArray(poolFromCli.execArgv);
        }
    }
    return config;
}
async function resolveConfig(options) {
    const { content: config, filePath: configFilePath } = await config_loadConfig({
        cwd: options.cwd,
        path: options.config,
        configLoader: options.configLoader
    });
    const mergedConfig = mergeWithCLIOptions(config, options);
    if (!mergedConfig.root) mergedConfig.root = options.cwd;
    return {
        config: mergedConfig,
        configFilePath: configFilePath ?? void 0
    };
}
async function resolveProjects({ config, root, options }) {
    if (!config.projects) return [];
    const getDefaultProjectName = (dir)=>{
        const pkgJsonPath = pathe_M_eThtNZ_resolve(dir, 'package.json');
        const name = existsSync(pkgJsonPath) ? JSON.parse(readFileSync(pkgJsonPath, 'utf-8')).name : '';
        if ('string' != typeof name || !name) return basename(dir);
        return name;
    };
    const globProjects = async (patterns, root)=>{
        const globOptions = {
            absolute: true,
            dot: true,
            onlyFiles: false,
            cwd: root,
            expandDirectories: false,
            ignore: [
                '**/node_modules/**',
                '**/.DS_Store'
            ]
        };
        return glob(patterns, globOptions);
    };
    const resolvedProjectPaths = new Set();
    const getProjects = async (rstestConfig, root)=>{
        const projectPaths = [];
        const projectPatterns = [];
        const inlineProjectConfigPromises = [];
        for (const p of rstestConfig.projects || []){
            if ('object' == typeof p) {
                const projectRoot = p.root ? formatRootStr(p.root, root) : root;
                inlineProjectConfigPromises.push(resolveExtends({
                    ...p
                }).then((projectConfig)=>({
                        config: mergeWithCLIOptions({
                            root: projectRoot,
                            ...projectConfig,
                            name: p.name ? p.name : getDefaultProjectName(projectRoot)
                        }, options),
                        configFilePath: void 0
                    }), (error)=>({
                        error
                    })));
                continue;
            }
            const projectStr = formatRootStr(p, root);
            if (isDynamicPattern(projectStr)) projectPatterns.push(projectStr);
            else {
                const absolutePath = getAbsolutePath(root, projectStr);
                if (!existsSync(absolutePath)) throw `Can't resolve project "${p}", please make sure "${p}" is a existing file or a directory.`;
                projectPaths.push(absolutePath);
            }
        }
        const [inlineProjectConfigResults, globbedProjectPaths] = await Promise.all([
            Promise.all(inlineProjectConfigPromises),
            globProjects(projectPatterns, root)
        ]);
        const projectConfigs = inlineProjectConfigResults.map((result)=>{
            if ('error' in result) throw result.error;
            return result;
        });
        projectPaths.push(...globbedProjectPaths);
        const projects = [];
        await Promise.all(projectPaths.map(async (project)=>{
            const isDirectory = statSync(project).isDirectory();
            const projectRoot = isDirectory ? project : pathe_M_eThtNZ_dirname(project);
            const { config, configFilePath } = await resolveConfig({
                ...options,
                config: isDirectory ? void 0 : project,
                cwd: projectRoot
            });
            if (configFilePath) {
                if (resolvedProjectPaths.has(configFilePath)) return;
                resolvedProjectPaths.add(configFilePath);
            }
            config.name ??= getDefaultProjectName(projectRoot);
            if (config.projects?.length) {
                const childProjects = await getProjects(config, projectRoot);
                projects.push(...childProjects);
            } else projects.push({
                config,
                configFilePath
            });
        }));
        return projects.concat(projectConfigs);
    };
    const projects = await getProjects(config, root).then((p)=>filterProjects(p, options));
    if (!projects.length) {
        let errorMsg = `No projects found, please make sure you have at least one valid project.
${logger_color.gray('projects:')} ${JSON.stringify(config.projects, null, 2)}`;
        if (options.project) errorMsg += `\n${logger_color.gray('projectName filter:')} ${JSON.stringify(options.project, null, 2)}`;
        throw errorMsg;
    }
    const names = new Set();
    projects.forEach((project)=>{
        if (names.has(project.config.name)) {
            const conflictProjects = projects.filter((p)=>p.config.name === project.config.name);
            throw `Project name "${project.config.name}" is already used. Please ensure all projects have unique names.
Conflicting projects:
${conflictProjects.map((p)=>`- ${p.configFilePath || p.config.root}`).join('\n')}
        `;
        }
        names.add(project.config.name);
    });
    return projects;
}
async function initCli(options) {
    const cwd = process.cwd();
    const root = options.root ? getAbsolutePath(cwd, options.root) : cwd;
    const { config, configFilePath } = await resolveConfig({
        ...options,
        cwd: options.root ? getAbsolutePath(cwd, options.root) : cwd
    });
    if (determineAgent().isAgent && !options.reporters && null == config.reporters) config.reporters = [
        'md'
    ];
    const projects = await resolveProjects({
        config,
        root,
        options
    });
    return {
        config,
        configFilePath,
        projects
    };
}
class SnapshotManager {
    summary;
    extension = ".snap";
    constructor(options){
        this.options = options;
        this.clear();
    }
    clear() {
        this.summary = emptySummary(this.options);
    }
    add(result) {
        addSnapshotResult(this.summary, result);
    }
    resolvePath(testPath, context) {
        const resolver = this.options.resolveSnapshotPath || (()=>join(join(pathe_M_eThtNZ_dirname(testPath), "__snapshots__"), `${basename(testPath)}${this.extension}`));
        const path = resolver(testPath, this.extension, context);
        return path;
    }
    resolveRawPath(testPath, rawPath) {
        return isAbsolute(rawPath) ? rawPath : pathe_M_eThtNZ_resolve(pathe_M_eThtNZ_dirname(testPath), rawPath);
    }
}
function emptySummary(options) {
    const summary = {
        added: 0,
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
        updated: 0,
        didUpdate: "all" === options.updateSnapshot
    };
    return summary;
}
function addSnapshotResult(summary, result) {
    if (result.added) summary.filesAdded++;
    if (result.fileDeleted) summary.filesRemoved++;
    if (result.unmatched) summary.filesUnmatched++;
    if (result.updated) summary.filesUpdated++;
    summary.added += result.added;
    summary.matched += result.matched;
    summary.unchecked += result.unchecked;
    if (result.uncheckedKeys && result.uncheckedKeys.length > 0) summary.uncheckedKeysByFile.push({
        filePath: result.filepath,
        keys: result.uncheckedKeys
    });
    summary.unmatched += result.unmatched;
    summary.updated += result.updated;
    summary.total += result.added + result.matched + result.unmatched + result.updated;
}
const REPORT_INTERVAL_MS = 30000;
const SLOW_CASE_THRESHOLD_MS = 10000;
const MAX_REPORT_COUNT = 20;
class NonTTYProgressNotifier {
    rootPath;
    testState;
    reportTimeout;
    startTime;
    started = false;
    reportCount = 0;
    constructor(rootPath, testState){
        this.rootPath = rootPath;
        this.testState = testState;
    }
    start() {
        if (this.started) return;
        this.started = true;
        this.startTime ??= Date.now();
        this.scheduleReport();
    }
    notifyOutput() {
        if (this.started) this.scheduleReport();
    }
    stop() {
        this.started = false;
        if (this.reportTimeout) {
            clearTimeout(this.reportTimeout);
            this.reportTimeout = void 0;
        }
    }
    scheduleReport() {
        if (this.reportTimeout) clearTimeout(this.reportTimeout);
        this.reportTimeout = setTimeout(()=>{
            this.report();
            this.reportCount++;
            if (this.reportCount < MAX_REPORT_COUNT) this.scheduleReport();
        }, REPORT_INTERVAL_MS);
        this.reportTimeout.unref();
    }
    report() {
        const runningModules = this.testState.getRunningModules();
        const testModules = this.testState.getTestModules();
        const doneFiles = testModules.length;
        const allResults = testModules.flatMap((mod)=>mod.results).concat(Array.from(runningModules.values()).flatMap(({ results })=>results));
        const passed = allResults.filter((r)=>'pass' === r.status).length;
        const failed = allResults.filter((r)=>'fail' === r.status).length;
        const elapsed = prettyTime(Date.now() - this.startTime);
        const filePart = `test files: ${doneFiles} done${runningModules.size ? `, ${runningModules.size} running` : ''}`;
        const testParts = [
            passed ? `${passed} passed` : null,
            failed ? `${failed} failed` : null
        ].filter(Boolean);
        const parts = [
            filePart,
            testParts.length ? `tests: ${testParts.join(', ')}` : null,
            elapsed
        ].filter(Boolean);
        console.log(`[PROGRESS] ${parts.join(' | ')}`);
        if (runningModules.size > 0) {
            const now = Date.now();
            for (const [module, { runningTests }] of runningModules.entries()){
                const relativePath = relative(this.rootPath, module);
                const slowCases = runningTests.filter((t)=>t.startTime && now - t.startTime > SLOW_CASE_THRESHOLD_MS);
                if (slowCases.length > 0) {
                    const caseNames = slowCases.map((t)=>`${getTaskNameWithPrefix(t)} ${prettyTime(now - t.startTime)}`).join(', ');
                    console.log(`            Running: ${relativePath} > ${caseNames}`);
                } else console.log(`            Running: ${relativePath}`);
            }
        }
    }
}
const getSummaryStatusString = (tasks, name = 'tests', showTotal = true)=>{
    if (0 === tasks.length) return logger_color.dim(`no ${name}`);
    const passed = tasks.filter((result)=>'pass' === result.status);
    const failed = tasks.filter((result)=>'fail' === result.status);
    const skipped = tasks.filter((result)=>'skip' === result.status);
    const todo = tasks.filter((result)=>'todo' === result.status);
    const status = [
        failed.length ? logger_color.bold(logger_color.red(`${failed.length} failed`)) : null,
        passed.length ? logger_color.bold(logger_color.green(`${passed.length} passed`)) : null,
        skipped.length ? logger_color.yellow(`${skipped.length} skipped`) : null,
        todo.length ? logger_color.gray(`${todo.length} todo`) : null
    ].filter(Boolean);
    return status.join(logger_color.dim(' | ')) + (showTotal && status.length > 1 ? logger_color.gray(` (${tasks.length})`) : '');
};
const getPlainSummaryStatusString = (tasks, name = 'tests', showTotal = true)=>{
    if (0 === tasks.length) return `no ${name}`;
    const failed = tasks.filter((result)=>'fail' === result.status);
    const passed = tasks.filter((result)=>'pass' === result.status);
    const skipped = tasks.filter((result)=>'skip' === result.status);
    const todo = tasks.filter((result)=>'todo' === result.status);
    const icon = failed.length > 0 ? '❌' : '✅';
    const parts = [
        failed.length ? `${failed.length} failed` : null,
        passed.length ? `${passed.length} passed` : null,
        skipped.length ? `${skipped.length} skipped` : null,
        todo.length ? `${todo.length} todo` : null
    ].filter(Boolean);
    return `${icon} ${parts.join(' | ')}` + (showTotal && parts.length > 1 ? ` (${tasks.length})` : '');
};
const printSnapshotSummaryLog = (snapshots, rootDir)=>{
    const summary = [];
    if (snapshots.added) summary.push(logger_color.bold(logger_color.green(`${snapshots.added} written`)));
    if (snapshots.unmatched) summary.push(logger_color.bold(logger_color.red(`${snapshots.unmatched} failed`)));
    if (snapshots.updated) summary.push(logger_color.bold(logger_color.green(`${snapshots.updated} updated `)));
    if (snapshots.filesRemoved) if (snapshots.didUpdate) summary.push(logger_color.bold(logger_color.green(`${snapshots.filesRemoved} files removed `)));
    else summary.push(logger_color.bold(logger_color.yellow(`${snapshots.filesRemoved} files obsolete `)));
    if (snapshots.filesRemovedList?.length) {
        const [head, ...tail] = snapshots.filesRemovedList;
        summary.push(`${logger_color.gray("➜")} ${formatTestPath(rootDir, head)}`);
        for (const key of tail)summary.push(`  ${formatTestPath(rootDir, key)}`);
    }
    if (snapshots.unchecked) {
        if (snapshots.didUpdate) summary.push(logger_color.bold(logger_color.green(`${snapshots.unchecked} removed`)));
        else summary.push(logger_color.bold(logger_color.yellow(`${snapshots.unchecked} obsolete`)));
        for (const uncheckedFile of snapshots.uncheckedKeysByFile){
            summary.push(`${logger_color.gray("➜")} ${formatTestPath(rootDir, uncheckedFile.filePath)}`);
            for (const key of uncheckedFile.keys)summary.push(`  ${key}`);
        }
    }
    for (const [index, snapshot] of summary.entries()){
        const title = 0 === index ? 'Snapshots' : '';
        logger_logger.log(`${logger_color.gray(title.padStart(12))} ${snapshot}`);
    }
};
const TestFileSummaryLabel = logger_color.gray('Test Files'.padStart(11));
const TestSummaryLabel = logger_color.gray('Tests'.padStart(11));
const DurationLabel = logger_color.gray('Duration'.padStart(11));
const printSummaryLog = ({ results, testResults, snapshotSummary, duration, rootPath })=>{
    logger_logger.log('');
    printSnapshotSummaryLog(snapshotSummary, rootPath);
    logger_logger.log(`${TestFileSummaryLabel} ${getSummaryStatusString(results)}`);
    logger_logger.log(`${TestSummaryLabel} ${getSummaryStatusString(testResults)}`);
    logger_logger.log(`${DurationLabel} ${prettyTime(duration.totalTime)} ${logger_color.gray(`(build ${prettyTime(duration.buildTime)}, tests ${prettyTime(duration.testTime)})`)}`);
    logger_logger.log('');
};
const printSummaryErrorLogs = async ({ testResults, results, rootPath, unhandledErrors, getSourcemap, filterRerunTestPaths })=>{
    const failedTests = [
        ...results.filter((i)=>'fail' === i.status && i.errors?.length && (filterRerunTestPaths ? filterRerunTestPaths.includes(i.testPath) : true)),
        ...testResults.filter((i)=>'fail' === i.status && (filterRerunTestPaths ? filterRerunTestPaths.includes(i.testPath) : true))
    ];
    if (0 === failedTests.length && !unhandledErrors?.length) return false;
    logger_logger.stderr('');
    logger_logger.stderr(logger_color.bold('Summary of all failing tests:'));
    logger_logger.stderr('');
    const { printError } = await Promise.resolve(error_namespaceObject);
    for (const error of unhandledErrors || []){
        logger_logger.stderr(bgColor('bgRed', ' Unhandled Error '));
        await printError(error, getSourcemap, rootPath);
    }
    for (const test of failedTests){
        const relativePath = posix.relative(rootPath, test.testPath);
        const nameStr = getTaskNameWithPrefix(test);
        logger_logger.stderr(`${bgColor('bgRed', ' FAIL ')} ${prettyTestPath(relativePath)} ${nameStr.length ? `${logger_color.dim(">")} ${nameStr}` : ''}`);
        if (test.errors) {
            const { printError } = await Promise.resolve(error_namespaceObject);
            for (const error of test.errors)await printError(error, getSourcemap, rootPath);
        }
    }
    return true;
};
const DEFAULT_RENDER_INTERVAL_MS = 1000;
const ESC = '\x1B[';
const CLEAR_LINE = `${ESC}2K`;
const CARRIAGE_RETURN = '\r';
const MOVE_CURSOR_ONE_ROW_UP = `${ESC}1A`;
class WindowRenderer {
    options;
    streams;
    buffer = [];
    renderInterval = void 0;
    renderScheduled = false;
    windowHeight = 0;
    started = false;
    finished = false;
    hiddenForOutputCount = 0;
    cleanups = [];
    exitHandler = ()=>{
        this.finish();
    };
    constructor(options){
        this.options = {
            interval: DEFAULT_RENDER_INTERVAL_MS,
            ...options
        };
        this.streams = {
            output: options.logger.outputStream.write.bind(options.logger.outputStream),
            error: options.logger.errorStream.write.bind(options.logger.errorStream)
        };
        this.cleanups.push(this.interceptStream(process.stdout, 'output'), this.interceptStream(process.stderr, 'error'));
        process.once('exit', this.exitHandler);
    }
    start() {
        this.started = true;
        this.finished = false;
        clearInterval(this.renderInterval);
        this.renderInterval = setInterval(()=>this.schedule(), this.options.interval).unref();
    }
    stop() {
        this.cleanups.splice(0).map((fn)=>fn());
        clearInterval(this.renderInterval);
    }
    finish() {
        if (this.finished || !this.started) return;
        this.finished = true;
        this.flushBuffer();
        clearInterval(this.renderInterval);
    }
    schedule() {
        if (this.hiddenForOutputCount > 0) return;
        if (!this.renderScheduled) {
            this.renderScheduled = true;
            this.flushBuffer();
            setTimeout(()=>{
                this.renderScheduled = false;
            }, 100).unref();
        }
    }
    flushBuffer() {
        const messages = this.drainBuffer();
        if (0 === messages.length) return this.render();
        for (const message of messages)this.render(message.message, message.type);
    }
    render(message, type = 'output') {
        if (this.hiddenForOutputCount > 0) {
            if (message) this.write(message, type);
            return;
        }
        if (this.finished) {
            this.clearWindow();
            return this.write(message || '', type);
        }
        const windowContent = this.options.getWindow();
        if (0 === windowContent.length) {
            this.clearWindow();
            if (message) this.write(message, type);
            return;
        }
        const rowCount = getRenderedRowCount(windowContent, this.options.logger.getColumns());
        let padding = this.windowHeight - rowCount;
        if (padding > 0 && message) padding -= getRenderedRowCount([
            message
        ], this.options.logger.getColumns());
        this.clearWindow();
        if (message) this.write(message, type);
        if (padding > 0) this.write('\n'.repeat(padding));
        this.write(windowContent.join('\n'));
        this.windowHeight = rowCount + Math.max(0, padding);
    }
    clearWindow() {
        if (0 === this.windowHeight) return;
        this.write(`${CARRIAGE_RETURN}${CLEAR_LINE}`);
        for(let i = 1; i < this.windowHeight; i++)this.write(`${MOVE_CURSOR_ONE_ROW_UP}${CARRIAGE_RETURN}${CLEAR_LINE}`);
        this.windowHeight = 0;
    }
    interceptStream(stream, type) {
        const original = stream.write.bind(stream);
        stream.write = (chunk, encoding, callback)=>{
            const writeCallback = 'function' == typeof encoding ? encoding : callback;
            if (chunk) if (this.finished || !this.started || this.hiddenForOutputCount > 0) this.write(chunk.toString(), type);
            else this.buffer.push({
                type,
                message: chunk.toString()
            });
            writeCallback?.();
            return true;
        };
        return function restore() {
            stream.write = original;
        };
    }
    write(message, type = 'output') {
        this.streams[type](message);
    }
    drainBuffer() {
        const messages = [];
        let current;
        for (const next of this.buffer.splice(0)){
            if (!current) {
                current = {
                    ...next
                };
                continue;
            }
            if (current.type !== next.type) {
                messages.push(current);
                current = {
                    ...next
                };
                continue;
            }
            current.message += next.message;
        }
        if (current) messages.push(current);
        return messages;
    }
    suspendWindowOutput() {
        this.flushBuffer();
        this.clearWindow();
        this.hiddenForOutputCount += 1;
    }
    resumeWindowOutput() {
        if (0 === this.hiddenForOutputCount) return;
        this.hiddenForOutputCount -= 1;
        if (!this.finished && 0 === this.hiddenForOutputCount) this.render();
    }
}
function getRenderedRowCount(rows, columns) {
    let count = 0;
    for (const row of rows){
        const text = stripVTControlCharacters(row);
        count += Math.max(1, Math.ceil(text.length / columns));
    }
    return count;
}
class StatusRenderer {
    rootPath;
    renderer;
    startTime = void 0;
    testState;
    constructor(rootPath, state, logger){
        this.rootPath = rootPath;
        this.renderer = new WindowRenderer({
            getWindow: ()=>this.getContent(),
            logger: logger ?? {
                outputStream: process.stdout,
                errorStream: process.stderr,
                getColumns: ()=>'columns' in process.stdout ? process.stdout.columns : 80
            }
        });
        this.testState = state;
    }
    getContent() {
        this.startTime ??= Date.now();
        const now = Date.now();
        const summary = [];
        const runningModules = this.testState.getRunningModules();
        const testModules = this.testState.getTestModules();
        if (0 === runningModules.size) return [];
        const shouldDisplayRunningTests = (runningTests)=>runningTests[0]?.startTime && now - runningTests[0].startTime > 2000;
        for (const [module, { runningTests }] of runningModules.entries()){
            const relativePath = relative(this.rootPath, module);
            summary.push(`${bgColor('bgYellow', ' RUNS ')} ${prettyTestPath(relativePath)}`);
            if (runningTests.length && shouldDisplayRunningTests(runningTests)) {
                let caseLog = ` ${logger_color.gray("➜")} ${getTaskNameWithPrefix(runningTests[0])} ${logger_color.magenta(prettyTime(now - runningTests[0].startTime))}`;
                if (runningTests.length > 1) caseLog += logger_color.gray(` and ${runningTests.length - 1} more cases`);
                summary.push(caseLog);
            }
        }
        summary.push('');
        if (0 === testModules.length) summary.push(`${TestFileSummaryLabel} ${runningModules.size} total`);
        else summary.push(`${TestFileSummaryLabel} ${getSummaryStatusString(testModules, '', false)} ${logger_color.dim('|')} ${runningModules.size + testModules.length} total`);
        const testResults = Array.from(runningModules.values()).flatMap(({ results })=>results).concat(testModules.flatMap((mod)=>mod.results));
        if (testResults.length) summary.push(`${TestSummaryLabel} ${getSummaryStatusString(testResults, '', false)}`);
        summary.push(`${DurationLabel} ${prettyTime(Date.now() - this.startTime)}`);
        summary.push('');
        return summary;
    }
    onTestFileStart() {
        this.renderer.start();
        this.renderer?.schedule();
    }
    onTestCaseResult() {
        this.renderer?.schedule();
    }
    onTestFileResult() {
        this.renderer?.schedule();
    }
    clear() {
        this.startTime = void 0;
        this.renderer?.finish();
    }
    suspendWindowOutput() {
        this.renderer.suspendWindowOutput();
    }
    resumeWindowOutput() {
        this.renderer.resumeWindowOutput();
    }
}
function dashDashArg(agent, agentCommand) {
    return (args)=>{
        if (args.length > 1) return [
            agent,
            agentCommand,
            args[0],
            "--",
            ...args.slice(1)
        ];
        return [
            agent,
            agentCommand,
            args[0]
        ];
    };
}
function denoExecute() {
    return (args)=>[
            "deno",
            "run",
            `npm:${args[0]}`,
            ...args.slice(1)
        ];
}
const npm = {
    agent: [
        "npm",
        0
    ],
    run: dashDashArg("npm", "run"),
    install: [
        "npm",
        "i",
        0
    ],
    frozen: [
        "npm",
        "ci",
        0
    ],
    global: [
        "npm",
        "i",
        "-g",
        0
    ],
    add: [
        "npm",
        "i",
        0
    ],
    upgrade: [
        "npm",
        "update",
        0
    ],
    "upgrade-interactive": null,
    dedupe: [
        "npm",
        "dedupe",
        0
    ],
    execute: [
        "npx",
        0
    ],
    "execute-local": [
        "npx",
        0
    ],
    uninstall: [
        "npm",
        "uninstall",
        0
    ],
    global_uninstall: [
        "npm",
        "uninstall",
        "-g",
        0
    ]
};
const yarn = {
    agent: [
        "yarn",
        0
    ],
    run: [
        "yarn",
        "run",
        0
    ],
    install: [
        "yarn",
        "install",
        0
    ],
    frozen: [
        "yarn",
        "install",
        "--frozen-lockfile",
        0
    ],
    global: [
        "yarn",
        "global",
        "add",
        0
    ],
    add: [
        "yarn",
        "add",
        0
    ],
    upgrade: [
        "yarn",
        "upgrade",
        0
    ],
    "upgrade-interactive": [
        "yarn",
        "upgrade-interactive",
        0
    ],
    dedupe: null,
    execute: [
        "npx",
        0
    ],
    "execute-local": dashDashArg("yarn", "exec"),
    uninstall: [
        "yarn",
        "remove",
        0
    ],
    global_uninstall: [
        "yarn",
        "global",
        "remove",
        0
    ]
};
const yarnBerry = {
    ...yarn,
    frozen: [
        "yarn",
        "install",
        "--immutable",
        0
    ],
    upgrade: [
        "yarn",
        "up",
        0
    ],
    "upgrade-interactive": [
        "yarn",
        "up",
        "-i",
        0
    ],
    dedupe: [
        "yarn",
        "dedupe",
        0
    ],
    execute: [
        "yarn",
        "dlx",
        0
    ],
    "execute-local": [
        "yarn",
        "exec",
        0
    ],
    global: [
        "npm",
        "i",
        "-g",
        0
    ],
    global_uninstall: [
        "npm",
        "uninstall",
        "-g",
        0
    ]
};
const pnpm = {
    agent: [
        "pnpm",
        0
    ],
    run: [
        "pnpm",
        "run",
        0
    ],
    install: [
        "pnpm",
        "i",
        0
    ],
    frozen: [
        "pnpm",
        "i",
        "--frozen-lockfile",
        0
    ],
    global: [
        "pnpm",
        "add",
        "-g",
        0
    ],
    add: [
        "pnpm",
        "add",
        0
    ],
    upgrade: [
        "pnpm",
        "update",
        0
    ],
    "upgrade-interactive": [
        "pnpm",
        "update",
        "-i",
        0
    ],
    dedupe: [
        "pnpm",
        "dedupe",
        0
    ],
    execute: [
        "pnpm",
        "dlx",
        0
    ],
    "execute-local": [
        "pnpm",
        "exec",
        0
    ],
    uninstall: [
        "pnpm",
        "remove",
        0
    ],
    global_uninstall: [
        "pnpm",
        "remove",
        "--global",
        0
    ]
};
const bun = {
    agent: [
        "bun",
        0
    ],
    run: [
        "bun",
        "run",
        0
    ],
    install: [
        "bun",
        "install",
        0
    ],
    frozen: [
        "bun",
        "install",
        "--frozen-lockfile",
        0
    ],
    global: [
        "bun",
        "add",
        "-g",
        0
    ],
    add: [
        "bun",
        "add",
        0
    ],
    upgrade: [
        "bun",
        "update",
        0
    ],
    "upgrade-interactive": [
        "bun",
        "update",
        "-i",
        0
    ],
    dedupe: null,
    execute: [
        "bun",
        "x",
        0
    ],
    "execute-local": [
        "bun",
        "x",
        0
    ],
    uninstall: [
        "bun",
        "remove",
        0
    ],
    global_uninstall: [
        "bun",
        "remove",
        "-g",
        0
    ]
};
const deno = {
    agent: [
        "deno",
        0
    ],
    run: [
        "deno",
        "task",
        0
    ],
    install: [
        "deno",
        "install",
        0
    ],
    frozen: [
        "deno",
        "install",
        "--frozen",
        0
    ],
    global: [
        "deno",
        "install",
        "-g",
        0
    ],
    add: [
        "deno",
        "add",
        0
    ],
    upgrade: [
        "deno",
        "outdated",
        "--update",
        0
    ],
    "upgrade-interactive": [
        "deno",
        "outdated",
        "--update",
        0
    ],
    dedupe: null,
    execute: denoExecute(),
    "execute-local": [
        "deno",
        "task",
        "--eval",
        0
    ],
    uninstall: [
        "deno",
        "remove",
        0
    ],
    global_uninstall: [
        "deno",
        "uninstall",
        "-g",
        0
    ]
};
const COMMANDS = {
    npm: npm,
    yarn: yarn,
    "yarn@berry": yarnBerry,
    pnpm: pnpm,
    "pnpm@6": {
        ...pnpm,
        run: dashDashArg("pnpm", "run")
    },
    bun: bun,
    deno: deno
};
function resolveCommand(agent, command, args) {
    const value = COMMANDS[agent][command];
    return constructCommand(value, args);
}
function constructCommand(value, args) {
    if (null == value) return null;
    const list = "function" == typeof value ? value(args) : value.flatMap((v)=>{
        if ("number" == typeof v) return args;
        return [
            v
        ];
    });
    return {
        command: list[0],
        args: list.slice(1)
    };
}
const deriveRunCounts = ({ results, testResults })=>{
    const failedTests = testResults.filter((result)=>'fail' === result.status);
    const passedTests = testResults.filter((result)=>'pass' === result.status);
    const skippedTests = testResults.filter((result)=>'skip' === result.status);
    const todoTests = testResults.filter((result)=>'todo' === result.status);
    const failedFiles = results.filter((result)=>'fail' === result.status);
    return {
        failedTests,
        passedTests,
        skippedTests,
        todoTests,
        failedFiles,
        counts: {
            testFiles: results.length,
            failedFiles: failedFiles.length,
            tests: testResults.length,
            failedTests: failedTests.length,
            passedTests: passedTests.length,
            skippedTests: skippedTests.length,
            todoTests: todoTests.length
        }
    };
};
const statusStr = {
    fail: '✗',
    pass: '✓',
    todo: '-',
    skip: '-'
};
const statusColor = {
    fail: logger_color.red,
    pass: logger_color.green,
    todo: logger_color.gray,
    skip: logger_color.gray
};
const statusColorfulStr = {
    fail: statusColor.fail(statusStr.fail),
    pass: statusColor.pass(statusStr.pass),
    todo: statusColor.todo(statusStr.todo),
    skip: statusColor.skip(statusStr.skip)
};
const logCase = (result, options)=>{
    const isSlowCase = (result.duration || 0) > options.slowTestThreshold;
    if (options.hideSkippedTests && 'skip' === result.status) return;
    const icon = isSlowCase && 'pass' === result.status ? logger_color.yellow(statusStr[result.status]) : statusColorfulStr[result.status];
    const nameStr = getTaskNameWithPrefix(result);
    const duration = void 0 !== result.duration ? ` (${prettyTime(result.duration)})` : '';
    const retry = result.retryCount ? logger_color.yellow(` (retry x${result.retryCount})`) : '';
    const heap = result.heap ? ` ${logger_color.magenta(formatHeapUsed(result.heap))}` : '';
    logger_logger.log(`  ${icon} ${nameStr}${logger_color.gray(duration)}${retry}${heap}`);
    if (result.errors) for (const error of result.errors)logger_logger.log(logger_color.red(`    ${error.message}`));
};
const formatFullTestName = (test)=>{
    const names = (test.parentNames || []).concat(test.name).filter(Boolean);
    return names.join(' > ');
};
const getErrorType = (error)=>{
    const rawName = error.name || 'Error';
    if (rawName.includes('AssertionError')) return 'AssertionError';
    if (/\bSnapshot\b.*\bmismatched\b/i.test(error.message)) return 'SnapshotMismatchError';
    return rawName;
};
const collectFailures = ({ results, testResults, filterRerunTestPaths })=>{
    const shouldIncludePath = (testPath)=>filterRerunTestPaths ? filterRerunTestPaths.includes(testPath) : true;
    const failures = [];
    for (const result of results)if ('fail' === result.status && result.errors?.length && shouldIncludePath(result.testPath)) failures.push({
        test: result,
        errors: result.errors
    });
    for (const result of testResults)if ('fail' === result.status && shouldIncludePath(result.testPath)) failures.push({
        test: result,
        errors: result.errors || []
    });
    return failures;
};
const quoteShellArg = (value, alwaysQuote = false)=>{
    if (0 === value.length) return "''";
    if (alwaysQuote || /[^A-Za-z0-9_\-./]/.test(value)) return `'${value.replace(/'/g, "'\\''")}'`;
    return value;
};
const detectPackageManagerAgent = async (cwd)=>{
    const result = await detect({
        cwd
    });
    return result?.agent ?? 'npm';
};
const buildPackageManagerReproCommand = (relativePath, fullName, agent, includeTestName = true)=>{
    const args = [
        'rstest',
        relativePath
    ];
    if (includeTestName && fullName) args.push('--testNamePattern', fullName);
    const resolved = resolveCommand(agent, 'execute-local', args);
    if (!resolved) {
        const formattedArgs = args.map((arg)=>quoteShellArg(arg, arg === relativePath)).join(' ');
        return `npx ${formattedArgs}`;
    }
    const formattedArgs = resolved.args.map((arg)=>quoteShellArg(arg, arg === relativePath)).join(' ');
    return formattedArgs.length ? `${resolved.command} ${formattedArgs}` : resolved.command;
};
const escapeMarkdownTableCell = (value)=>value.replaceAll('|', '\\|');
const formatHeapUsed = (heap)=>`${Math.floor(heap / 1024 / 1024)} MB heap used`;
const logFileTitle = (test, relativePath, alwaysShowTime = false, showProjectName = false)=>{
    let title = ` ${logger_color.bold(statusColorfulStr[test.status])}`;
    if (showProjectName && test.project) title += ` ${statusColor[test.status](`[${test.project}]`)}`;
    title += ` ${prettyTestPath(relativePath)}`;
    const formatDuration = (duration)=>logger_color.green(prettyTime(duration));
    title += ` ${logger_color.gray(`(${test.results.length})`)}`;
    if (alwaysShowTime) title += ` ${formatDuration(test.duration)}`;
    if (test.heap) title += ` ${logger_color.magenta(formatHeapUsed(test.heap))}`;
    logger_logger.log(title);
};
const logUserConsoleLog = (rootPath, log)=>{
    const titles = [];
    const testPath = relative(rootPath, log.testPath);
    const taskName = [
        ...log.taskParentNames || [],
        ...log.taskName ? [
            log.taskName
        ] : []
    ].filter(Boolean).join(' > ');
    if (taskName) titles.push(testPath ? `${testPath} > ${taskName}` : taskName);
    if (log.trace) {
        const [frame] = stack_trace_parser_esm_parse(log.trace);
        const filePath = relative(rootPath, frame?.file || '');
        if (filePath && filePath !== testPath) titles.push(testPath);
        if (filePath && frame?.lineNumber != null && null != frame.column) titles.push(`${filePath}:${frame.lineNumber}:${frame.column}`);
    }
    if (0 === titles.length) titles.push(testPath);
    const logOutput = 'stdout' === log.type ? logger_logger.log : logger_logger.stderr;
    logOutput('');
    logOutput(`${log.name}${logger_color.gray(logger_color.dim(` | ${titles.join(logger_color.gray(logger_color.dim(' | ')))}`))}`);
    logOutput(log.content);
    logOutput('');
};
const ensureSingleBlankLine = (lines)=>{
    if (0 === lines.length) return;
    while(lines.length > 0 && '' === lines[lines.length - 1])lines.pop();
    lines.push('');
};
const pushHeading = (lines, level, text)=>{
    ensureSingleBlankLine(lines);
    lines.push(`${'#'.repeat(level)} ${text}`);
    lines.push('');
};
const pushFencedBlock = (lines, lang, content)=>{
    ensureSingleBlankLine(lines);
    lines.push(`\`\`\`${lang}`);
    lines.push(content);
    lines.push('```');
    lines.push('');
};
const stringifyJson = (value)=>JSON.stringify(value, null, 2);
class DefaultReporter {
    flushOutputStreams;
    rootPath;
    config;
    projectConfigs;
    options = {};
    statusRenderer;
    nonTTYProgressNotifier;
    testState;
    constructor({ rootPath, options, config, testState, projectConfigs }){
        this.rootPath = rootPath;
        this.config = config;
        this.projectConfigs = projectConfigs ?? new Map();
        this.options = options;
        this.testState = testState;
        this.flushOutputStreams = !options.logger;
        if (isTTY() || options.logger) this.statusRenderer = new StatusRenderer(rootPath, testState, options.logger);
        else this.nonTTYProgressNotifier = new NonTTYProgressNotifier(rootPath, testState);
    }
    onTestFileStart() {
        this.statusRenderer?.onTestFileStart();
        this.nonTTYProgressNotifier?.start();
    }
    withSuspendedStatusRenderer(fn) {
        if (!this.statusRenderer) return void fn();
        this.statusRenderer.suspendWindowOutput();
        try {
            fn();
        } finally{
            this.statusRenderer.resumeWindowOutput();
        }
    }
    onUserConsoleLog(log) {
        this.nonTTYProgressNotifier?.notifyOutput();
        this.withSuspendedStatusRenderer(()=>{
            logUserConsoleLog(this.rootPath, log);
        });
    }
    onTestCaseResult(_result) {
        this.statusRenderer?.onTestCaseResult();
    }
    onTestFileResult(test) {
        this.statusRenderer?.onTestFileResult();
        this.nonTTYProgressNotifier?.notifyOutput();
        const projectConfig = this.projectConfigs.get(test.project);
        const hideSkippedTestFiles = projectConfig?.hideSkippedTestFiles ?? this.config.hideSkippedTestFiles;
        if (hideSkippedTestFiles && 'skip' === test.status) return;
        const relativePath = relative(this.rootPath, test.testPath);
        const slowTestThreshold = projectConfig?.slowTestThreshold ?? this.config.slowTestThreshold;
        const logResults = ()=>{
            logFileTitle(test, relativePath, false, this.options.showProjectName);
            const showAllCases = this.testState.getTestFiles()?.length === 1;
            const hideSkippedTests = projectConfig?.hideSkippedTests ?? this.config.hideSkippedTests;
            for (const result of test.results){
                const isDisplayed = showAllCases || 'fail' === result.status || (result.duration ?? 0) > slowTestThreshold || (result.retryCount ?? 0) > 0;
                if (isDisplayed) logCase(result, {
                    slowTestThreshold,
                    hideSkippedTests
                });
            }
        };
        this.withSuspendedStatusRenderer(logResults);
    }
    onExit() {
        this.statusRenderer?.clear();
        this.nonTTYProgressNotifier?.stop();
    }
    async onTestRunEnd({ results, testResults, duration, getSourcemap, snapshotSummary, filterRerunTestPaths, unhandledErrors }) {
        this.statusRenderer?.clear();
        this.nonTTYProgressNotifier?.stop();
        if (false === this.options.summary) return;
        const hasErrorLogs = await printSummaryErrorLogs({
            testResults,
            results,
            unhandledErrors,
            rootPath: this.rootPath,
            getSourcemap,
            filterRerunTestPaths
        });
        if (hasErrorLogs && this.flushOutputStreams) await flushOutputStreams();
        printSummaryLog({
            results,
            testResults,
            duration,
            rootPath: this.rootPath,
            snapshotSummary
        });
    }
}
const DEFAULT_OUTPUT_DIR = '.rstest-reports';
const blobFileName = (shard)=>shard ? `blob-${shard.index}-${shard.count}.json` : 'blob.json';
const BLOB_FILE_RE = /^blob(-\d+-\d+)?\.json$/;
const isBlobFile = (name)=>BLOB_FILE_RE.test(name);
class BlobReporter {
    config;
    outputDir;
    consoleLogs = [];
    constructor({ rootPath, config, options }){
        this.config = config;
        this.outputDir = options?.outputDir ? join(rootPath, options.outputDir) : join(rootPath, DEFAULT_OUTPUT_DIR);
    }
    onUserConsoleLog(log) {
        this.consoleLogs.push(log);
    }
    async onTestRunEnd({ results, coverage, testResults, duration, snapshotSummary, unhandledErrors }) {
        const shard = this.config.shard;
        const fileName = blobFileName(shard);
        const blobData = {
            version: "0.10.4",
            shard: shard ? {
                index: shard.index,
                count: shard.count
            } : void 0,
            results,
            coverage,
            testResults,
            duration,
            snapshotSummary,
            unhandledErrors: unhandledErrors?.map((e)=>({
                    message: e.message,
                    stack: e.stack,
                    name: e.name
                })),
            consoleLogs: this.consoleLogs.length > 0 ? this.consoleLogs : void 0
        };
        mkdirSync(this.outputDir, {
            recursive: true
        });
        writeFileSync(join(this.outputDir, fileName), JSON.stringify(blobData), 'utf-8');
    }
}
const DOT_BY_STATUS = {
    fail: 'x',
    pass: '·',
    skip: '-',
    todo: '*'
};
const COLOR_BY_STATUS = {
    fail: logger_color.red,
    pass: logger_color.green,
    skip: logger_color.yellow,
    todo: logger_color.gray
};
class DotReporter {
    flushOutputStreams;
    rootPath;
    options;
    outputStream;
    getColumns;
    currentColumn = 0;
    constructor({ rootPath, options = {} }){
        this.rootPath = rootPath;
        this.options = options;
        this.flushOutputStreams = !options.logger;
        this.outputStream = options.logger?.outputStream ?? process.stdout;
        this.getColumns = options.logger?.getColumns ?? (()=>'columns' in process.stdout ? process.stdout.columns || 80 : 80);
    }
    onTestCaseResult(result) {
        const marker = COLOR_BY_STATUS[result.status](DOT_BY_STATUS[result.status]);
        this.outputStream.write(marker);
        this.currentColumn += 1;
        if (this.currentColumn >= this.getColumnWidth()) {
            this.outputStream.write('\n');
            this.currentColumn = 0;
        }
    }
    onUserConsoleLog(log) {
        this.flushLine();
        logUserConsoleLog(this.rootPath, log);
    }
    onExit() {
        this.flushLine();
    }
    async onTestRunEnd({ results, testResults, duration, getSourcemap, snapshotSummary, filterRerunTestPaths, unhandledErrors }) {
        this.flushLine();
        if (false === this.options.summary) return;
        const hasErrorLogs = await printSummaryErrorLogs({
            testResults,
            results,
            unhandledErrors,
            rootPath: this.rootPath,
            getSourcemap,
            filterRerunTestPaths
        });
        if (hasErrorLogs && this.flushOutputStreams) await flushOutputStreams();
        printSummaryLog({
            results,
            testResults,
            duration,
            rootPath: this.rootPath,
            snapshotSummary
        });
    }
    flushLine() {
        if (0 === this.currentColumn) return;
        this.outputStream.write('\n');
        this.currentColumn = 0;
    }
    getColumnWidth() {
        return Math.max(1, this.getColumns() || 80);
    }
}
function ansiRegex({ onlyFirst = false } = {}) {
    const ST = '(?:\\u0007|\\u001B\\u005C|\\u009C)';
    const osc = `(?:\\u001B\\][\\s\\S]*?${ST})`;
    const csi = '[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]';
    const pattern = `${osc}|${csi}`;
    return new RegExp(pattern, onlyFirst ? void 0 : 'g');
}
const regex = ansiRegex();
function stripAnsi(string) {
    if ('string' != typeof string) throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
    if (!string.includes('\u001B') && !string.includes('\u009B')) return string;
    return string.replace(regex, '');
}
const schemeRegex = /^[\w+.-]+:\/\//;
const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
function isAbsoluteUrl(input) {
    return schemeRegex.test(input);
}
function isSchemeRelativeUrl(input) {
    return input.startsWith('//');
}
function isAbsolutePath(input) {
    return input.startsWith('/');
}
function isFileUrl(input) {
    return input.startsWith('file:');
}
function isRelative(input) {
    return /^[.?#]/.test(input);
}
function parseAbsoluteUrl(input) {
    const match = urlRegex.exec(input);
    return makeUrl(match[1], match[2] || '', match[3], match[4] || '', match[5] || '/', match[6] || '', match[7] || '');
}
function parseFileUrl(input) {
    const match = fileRegex.exec(input);
    const path = match[2];
    return makeUrl('file:', '', match[1] || '', '', isAbsolutePath(path) ? path : '/' + path, match[3] || '', match[4] || '');
}
function makeUrl(scheme, user, host, port, path, query, hash) {
    return {
        scheme,
        user,
        host,
        port,
        path,
        query,
        hash,
        type: 7
    };
}
function parseUrl(input) {
    if (isSchemeRelativeUrl(input)) {
        const url = parseAbsoluteUrl('http:' + input);
        url.scheme = '';
        url.type = 6;
        return url;
    }
    if (isAbsolutePath(input)) {
        const url = parseAbsoluteUrl('http://foo.com' + input);
        url.scheme = '';
        url.host = '';
        url.type = 5;
        return url;
    }
    if (isFileUrl(input)) return parseFileUrl(input);
    if (isAbsoluteUrl(input)) return parseAbsoluteUrl(input);
    const url = parseAbsoluteUrl('http://foo.com/' + input);
    url.scheme = '';
    url.host = '';
    url.type = input ? input.startsWith('?') ? 3 : input.startsWith('#') ? 2 : 4 : 1;
    return url;
}
function stripPathFilename(path) {
    if (path.endsWith('/..')) return path;
    const index = path.lastIndexOf('/');
    return path.slice(0, index + 1);
}
function mergePaths(url, base) {
    normalizePath(base, base.type);
    if ('/' === url.path) url.path = base.path;
    else url.path = stripPathFilename(base.path) + url.path;
}
function normalizePath(url, type) {
    const rel = type <= 4;
    const pieces = url.path.split('/');
    let pointer = 1;
    let positive = 0;
    let addTrailingSlash = false;
    for(let i = 1; i < pieces.length; i++){
        const piece = pieces[i];
        if (!piece) {
            addTrailingSlash = true;
            continue;
        }
        addTrailingSlash = false;
        if ('.' !== piece) {
            if ('..' === piece) {
                if (positive) {
                    addTrailingSlash = true;
                    positive--;
                    pointer--;
                } else if (rel) pieces[pointer++] = piece;
                continue;
            }
            pieces[pointer++] = piece;
            positive++;
        }
    }
    let path = '';
    for(let i = 1; i < pointer; i++)path += '/' + pieces[i];
    if (!path || addTrailingSlash && !path.endsWith('/..')) path += '/';
    url.path = path;
}
function resolve_uri_resolve(input, base) {
    if (!input && !base) return '';
    const url = parseUrl(input);
    let inputType = url.type;
    if (base && 7 !== inputType) {
        const baseUrl = parseUrl(base);
        const baseType = baseUrl.type;
        switch(inputType){
            case 1:
                url.hash = baseUrl.hash;
            case 2:
                url.query = baseUrl.query;
            case 3:
            case 4:
                mergePaths(url, baseUrl);
            case 5:
                url.user = baseUrl.user;
                url.host = baseUrl.host;
                url.port = baseUrl.port;
            case 6:
                url.scheme = baseUrl.scheme;
        }
        if (baseType > inputType) inputType = baseType;
    }
    normalizePath(url, inputType);
    const queryHash = url.query + url.hash;
    switch(inputType){
        case 2:
        case 3:
            return queryHash;
        case 4:
            {
                const path = url.path.slice(1);
                if (!path) return queryHash || '.';
                if (isRelative(base || input) && !isRelative(path)) return './' + path + queryHash;
                return path + queryHash;
            }
        case 5:
            return url.path + queryHash;
        default:
            return url.scheme + '//' + url.user + url.host + url.port + url.path + queryHash;
    }
}
function stripFilename(path) {
    if (!path) return "";
    const index = path.lastIndexOf("/");
    return path.slice(0, index + 1);
}
function trace_mapping_resolver(mapUrl, sourceRoot) {
    const from = stripFilename(mapUrl);
    const prefix = sourceRoot ? sourceRoot + "/" : "";
    return (source)=>resolve_uri_resolve(prefix + (source || ""), from);
}
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
function maybeSort(mappings, owned) {
    const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
    if (unsortedIndex === mappings.length) return mappings;
    if (!owned) mappings = mappings.slice();
    for(let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1))mappings[i] = sortSegments(mappings[i], owned);
    return mappings;
}
function nextUnsortedSegmentLine(mappings, start) {
    for(let i = start; i < mappings.length; i++)if (!isSorted(mappings[i])) return i;
    return mappings.length;
}
function isSorted(line) {
    for(let j = 1; j < line.length; j++)if (line[j][COLUMN] < line[j - 1][COLUMN]) return false;
    return true;
}
function sortSegments(line, owned) {
    if (!owned) line = line.slice();
    return line.sort(sortComparator);
}
function sortComparator(a, b) {
    return a[COLUMN] - b[COLUMN];
}
var found = false;
function binarySearch(haystack, needle, low, high) {
    while(low <= high){
        const mid = low + (high - low >> 1);
        const cmp = haystack[mid][COLUMN] - needle;
        if (0 === cmp) {
            found = true;
            return mid;
        }
        if (cmp < 0) low = mid + 1;
        else high = mid - 1;
    }
    found = false;
    return low - 1;
}
function upperBound(haystack, needle, index) {
    for(let i = index + 1; i < haystack.length && haystack[i][COLUMN] === needle; index = i++);
    return index;
}
function lowerBound(haystack, needle, index) {
    for(let i = index - 1; i >= 0 && haystack[i][COLUMN] === needle; index = i--);
    return index;
}
function memoizedState() {
    return {
        lastKey: -1,
        lastNeedle: -1,
        lastIndex: -1
    };
}
function memoizedBinarySearch(haystack, needle, state, key) {
    const { lastKey, lastNeedle, lastIndex } = state;
    let low = 0;
    let high = haystack.length - 1;
    if (key === lastKey) {
        if (needle === lastNeedle) {
            found = -1 !== lastIndex && haystack[lastIndex][COLUMN] === needle;
            return lastIndex;
        }
        if (needle >= lastNeedle) low = -1 === lastIndex ? 0 : lastIndex;
        else high = lastIndex;
    }
    state.lastKey = key;
    state.lastNeedle = needle;
    return state.lastIndex = binarySearch(haystack, needle, low, high);
}
function parse(map) {
    return "string" == typeof map ? JSON.parse(map) : map;
}
var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
var TraceMap = class {
    constructor(map, mapUrl){
        const isString = "string" == typeof map;
        if (!isString && map._decodedMemo) return map;
        const parsed = parse(map);
        const { version, file, names, sourceRoot, sources, sourcesContent } = parsed;
        this.version = version;
        this.file = file;
        this.names = names || [];
        this.sourceRoot = sourceRoot;
        this.sources = sources;
        this.sourcesContent = sourcesContent;
        this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
        const resolve = trace_mapping_resolver(mapUrl, sourceRoot);
        this.resolvedSources = sources.map(resolve);
        const { mappings } = parsed;
        if ("string" == typeof mappings) {
            this._encoded = mappings;
            this._decoded = void 0;
        } else if (Array.isArray(mappings)) {
            this._encoded = void 0;
            this._decoded = maybeSort(mappings, isString);
        } else if (parsed.sections) throw new Error("TraceMap passed sectioned source map, please use FlattenMap export instead");
        else throw new Error(`invalid source map: ${JSON.stringify(parsed)}`);
        this._decodedMemo = memoizedState();
        this._bySources = void 0;
        this._bySourceMemos = void 0;
    }
};
function cast(map) {
    return map;
}
function decodedMappings(map) {
    var _a;
    return (_a = cast(map))._decoded || (_a._decoded = decode(cast(map)._encoded));
}
function originalPositionFor(map, needle) {
    let { line, column, bias } = needle;
    line--;
    if (line < 0) throw new Error(LINE_GTR_ZERO);
    if (column < 0) throw new Error(COL_GTR_EQ_ZERO);
    const decoded = decodedMappings(map);
    if (line >= decoded.length) return OMapping(null, null, null, null);
    const segments = decoded[line];
    const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
    if (-1 === index) return OMapping(null, null, null, null);
    const segment = segments[index];
    if (1 === segment.length) return OMapping(null, null, null, null);
    const { names, resolvedSources } = map;
    return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], 5 === segment.length ? names[segment[NAMES_INDEX]] : null);
}
function OMapping(source, line, column, name) {
    return {
        source,
        line,
        column,
        name
    };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
    let index = memoizedBinarySearch(segments, column, memo, line);
    if (found) index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
    else if (bias === LEAST_UPPER_BOUND) index++;
    if (-1 === index || index === segments.length) return -1;
    return index;
}
const isRelativePath = (p)=>/^\.\.?\//.test(p);
const isHttpLikeFile = (file)=>/^https?:\/\//.test(file);
const hintNotDefinedError = (message)=>{
    const [, varName] = /(\w+) is not defined/.exec(message) || [];
    if (varName) {
        if (globalApis.includes(varName)) return message.replace(`${varName} is not defined`, `${varName} is not defined. Did you forget to enable "globals" configuration?`);
        if ([
            'jest',
            'vitest'
        ].includes(varName)) return message.replace(`${varName} is not defined`, `${varName} is not defined. Did you mean rstest?`);
        if ('React' === varName) return message.replace(`${varName} is not defined`, `${varName} is not defined. Did you forget to install "${logger_color.yellow('@rsbuild/plugin-react')}" plugin?`);
    }
    return message;
};
async function error_printError(error, getSourcemap, rootPath) {
    const errorName = error.name || 'Unknown Error';
    if (error.message.includes('Vitest failed to access its internal state')) {
        const tips = [
            'Error: not support import `vitest` in Rstest test environment.\n',
            'Solution:',
            `  - Update your code to use imports from "${logger_color.yellow('@rstest/core')}" instead of "${logger_color.yellow('vitest')}".`,
            '  - Enable `globals` configuration and use global API.'
        ];
        logger_logger.stderr(`${logger_color.red(tips.join('\n'))}\n`);
        return;
    }
    if (error.message.includes('is not defined')) error.message = hintNotDefinedError(error.message);
    logger_logger.stderr(`${logger_color.red(logger_color.bold(errorName))}${logger_color.red(`: ${error.message}`)}\n`);
    if (error.diff) {
        logger_logger.stderr(error.diff);
        logger_logger.stderr('');
    }
    if (error.stack) {
        const stackFrames = await error_parseErrorStacktrace({
            stack: error.stack,
            fullStack: error.fullStack,
            getSourcemap
        });
        if (!stackFrames.length && !(error.fullStack || isDebug()) && !error.stack.endsWith(error.message)) logger_logger.stderr(logger_color.gray("No error stack found, set 'DEBUG=rstest' to show fullStack."));
        if (stackFrames[0]) await printCodeFrame(stackFrames[0]);
        printStack(stackFrames, rootPath);
    }
}
async function printCodeFrame(frame) {
    const filePath = frame.file?.startsWith('file') ? new URL(frame.file) : frame.file;
    if (!filePath) return;
    const source = node_fs.existsSync(filePath) ? node_fs.readFileSync(filePath, 'utf-8') : void 0;
    if (!source) return;
    const { codeFrameColumns } = await import("./0~@babel/code-frame.js").then(__webpack_require__.bind(__webpack_require__, "../../node_modules/.pnpm/@babel+code-frame@7.29.7/node_modules/@babel/code-frame/lib/index.js"));
    const result = codeFrameColumns(source, {
        start: {
            line: frame.lineNumber,
            column: frame.column
        }
    }, {
        highlightCode: true,
        linesBelow: 2
    });
    logger_logger.stderr(result);
    logger_logger.stderr('');
}
function formatStack(frame, rootPath) {
    return '<unknown>' !== frame.methodName ? `at ${frame.methodName} (${formatTestPath(rootPath, frame.file)}:${frame.lineNumber}:${frame.column})` : `at ${formatTestPath(rootPath, frame.file)}:${frame.lineNumber}:${frame.column}`;
}
function printStack(stackFrames, rootPath) {
    for (const frame of stackFrames)logger_logger.stderr(logger_color.gray(`        ${formatStack(frame, rootPath)}`));
    if (stackFrames.length) logger_logger.stderr('');
}
const stackIgnores = [
    /\/@rstest\/core/,
    /rstest\/packages\/core\/dist/,
    /node_modules\/chai/,
    /node_modules\/@vitest\/expect/,
    /node_modules\/@vitest\/snapshot/,
    /node:\w+/,
    /webpack\/runtime/,
    /rstest runtime/,
    /webpack\\runtime/,
    '<anonymous>'
];
async function error_parseErrorStacktrace({ stack, getSourcemap, fullStack = isDebug() }) {
    const traceMapCache = new Map();
    const stackFrames = await Promise.all(stack_trace_parser_esm_parse(stack).filter((frame)=>fullStack ? true : frame.file && !stackIgnores.some((entry)=>frame.file?.match(entry))).map(async (frame)=>{
        const sourcemap = await getSourcemap?.(frame.file);
        if (sourcemap) {
            let traceMap = traceMapCache.get(frame.file);
            if (!traceMap) {
                traceMap = new TraceMap(sourcemap);
                traceMapCache.set(frame.file, traceMap);
            }
            const { line, column, source, name } = originalPositionFor(traceMap, {
                line: frame.lineNumber,
                column: frame.column
            });
            if (!source) return null;
            return {
                ...frame,
                file: isRelativePath(source) ? external_node_path_resolve(frame.file, '../', source) : (()=>{
                    try {
                        return new URL(source).pathname;
                    } catch  {
                        return source;
                    }
                })(),
                lineNumber: line,
                name,
                column
            };
        }
        return frame;
    })).then((frames)=>frames.filter((frame)=>null !== frame));
    if (fullStack) return stackFrames;
    const filteredFrames = stackFrames.filter((frame)=>{
        if (!frame.file) return false;
        if (isHttpLikeFile(frame.file)) return false;
        const normalizedFile = frame.file.replace(/\\/g, '/');
        return !stackIgnores.some((entry)=>normalizedFile.match(entry));
    });
    return filteredFrames;
}
class GithubActionsReporter {
    flushOutputStreams = true;
    onWritePath;
    rootPath;
    stepSummaryPath;
    enableAnnotations;
    enableSummary;
    reportName;
    constructor({ options, rootPath, config }){
        this.onWritePath = options.onWritePath;
        this.rootPath = rootPath;
        this.stepSummaryPath = process.env.GITHUB_STEP_SUMMARY;
        this.enableAnnotations = false !== options.annotations;
        this.enableSummary = false !== options.summary;
        this.reportName = config?.name;
    }
    log(message) {
        logger_logger.log(`${message}\n`);
    }
    async appendStepSummary(content) {
        if (!this.stepSummaryPath) return;
        try {
            await promises.mkdir(node_path.dirname(this.stepSummaryPath), {
                recursive: true
            });
            await promises.appendFile(this.stepSummaryPath, content, 'utf-8');
        } catch (error) {
            logger_logger.stderr(`Failed to write GitHub step summary to ${this.stepSummaryPath}:`, error);
        }
    }
    async onTestRunEnd({ results, testResults, duration, getSourcemap, unhandledErrors }) {
        const failures = collectFailures({
            results,
            testResults
        });
        if (failures.length > 0 && this.enableAnnotations) {
            const { parseErrorStacktrace } = await Promise.resolve(error_namespaceObject);
            const logs = [];
            for (const { test, errors } of failures){
                const { testPath } = test;
                const nameStr = getTaskNameWithPrefix(test);
                const shortPath = relative(this.rootPath, testPath);
                const title = `${shortPath} > ${nameStr}`;
                for (const error of errors){
                    let file = testPath;
                    let line = 1;
                    let column = 1;
                    const message = `${error.message}${error.diff ? `\n${error.diff}` : ''}`;
                    const type = 'error';
                    if (error.stack) {
                        const stackFrames = await parseErrorStacktrace({
                            stack: error.stack,
                            fullStack: error.fullStack,
                            getSourcemap
                        });
                        if (stackFrames[0]) {
                            file = stackFrames[0].file || test.testPath;
                            line = stackFrames[0].lineNumber || 1;
                            column = stackFrames[0].column || 1;
                        }
                    }
                    logs.push(`::${type} file=${this.onWritePath?.(file) || file},line=${line},col=${column},title=${escapeData(title)}::${escapeData(message)}`);
                }
            }
            this.log('::group::Error for GitHub Actions');
            for (const log of logs)this.log(log);
            this.log('::endgroup::');
        }
        if (this.enableSummary && this.stepSummaryPath) await this.appendStepSummary(await renderStepSummary({
            results,
            testResults,
            duration,
            rootPath: this.rootPath,
            reportName: this.reportName,
            failures,
            getSourcemap,
            unhandledErrors
        }));
    }
}
function escapeData(s) {
    return s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
}
const STEP_SUMMARY_MAX_FAILURES = 20;
const STEP_SUMMARY_MAX_FLAKY_TESTS = 20;
const STEP_SUMMARY_MAX_MESSAGE_LENGTH = 400;
const STEP_SUMMARY_MAX_FLAKY_MESSAGE_LENGTH = 160;
const ROOT_PATH_PLACEHOLDER = '<ROOT>';
const DEFAULT_PROJECT_NAME = 'rstest';
function getStepSummaryDisplayPath(rootPath, githubWorkspace = process.env.GITHUB_WORKSPACE) {
    const normalizedRootPath = normalize(rootPath);
    if (!githubWorkspace) return normalizedRootPath;
    const normalizedWorkspacePath = normalize(githubWorkspace);
    const comparableRootPath = normalizeForWorkspaceComparison(normalizedRootPath);
    const comparableWorkspacePath = normalizeForWorkspaceComparison(normalizedWorkspacePath);
    if (comparableRootPath === comparableWorkspacePath) return ROOT_PATH_PLACEHOLDER;
    const comparableWorkspacePrefix = comparableWorkspacePath.endsWith('/') ? comparableWorkspacePath : `${comparableWorkspacePath}/`;
    if (comparableRootPath.startsWith(comparableWorkspacePrefix)) {
        const workspacePrefixLength = normalizedWorkspacePath.endsWith('/') ? normalizedWorkspacePath.length : normalizedWorkspacePath.length + 1;
        return `${ROOT_PATH_PLACEHOLDER}/${normalizedRootPath.slice(workspacePrefixLength)}`;
    }
    return normalizedRootPath;
}
function normalizeForWorkspaceComparison(value) {
    return /^[A-Za-z]:\//.test(value) ? value.toLowerCase() : value;
}
function getStepSummaryProjectLabel({ reportName, results, testResults, failures }) {
    if (reportName && reportName !== DEFAULT_PROJECT_NAME) return reportName;
    const projectNames = new Set();
    const collectProjectName = (project)=>{
        if (!project || project === DEFAULT_PROJECT_NAME) return;
        projectNames.add(project);
    };
    for (const result of results)collectProjectName(result.project);
    for (const testResult of testResults)collectProjectName(testResult.project);
    for (const failure of failures)collectProjectName(failure.test.project);
    if (1 === projectNames.size) return projectNames.values().next().value;
}
async function renderStepSummary({ results, testResults, duration, rootPath, reportName, failures, getSourcemap, unhandledErrors }) {
    const { parseErrorStacktrace } = await Promise.resolve(error_namespaceObject);
    const packageManagerAgent = await detectPackageManagerAgent(rootPath);
    const displayPath = getStepSummaryDisplayPath(rootPath);
    const hasUnhandledErrors = (unhandledErrors?.length ?? 0) > 0;
    const flakyTests = collectFlakyTests(testResults);
    const hasFlakyTests = flakyTests.length > 0;
    const isSuccess = 0 === failures.length && !hasUnhandledErrors;
    const reportIcon = isSuccess ? hasFlakyTests ? '⚠️' : '✅' : '❌';
    const projectLabel = getStepSummaryProjectLabel({
        reportName,
        results,
        testResults,
        failures
    });
    const reportTitle = projectLabel ? `Rstest Test Reporter (${projectLabel}) ${reportIcon}` : `Rstest Test Reporter ${reportIcon}`;
    const lines = [];
    lines.push(isSuccess && !hasFlakyTests ? '<details>' : '<details open>');
    lines.push(`<summary>${reportTitle}</summary>`);
    lines.push('');
    lines.push(`# ${reportTitle}`);
    lines.push(`> Under path: \`${displayPath || ROOT_PATH_PLACEHOLDER}\``);
    lines.push('');
    pushHeading(lines, 2, 'Summary');
    lines.push('| | Result |');
    lines.push('| :-- | :-- |');
    lines.push(`| **Test Files** | ${escapeMarkdownTableCell(getPlainSummaryStatusString(results))} |`);
    lines.push(`| **Tests** | ${escapeMarkdownTableCell(getPlainSummaryStatusString(testResults))} |`);
    lines.push(`| **Duration** | ${prettyTime(duration.totalTime)} (build ${prettyTime(duration.buildTime)}, tests ${prettyTime(duration.testTime)}) |`);
    if (flakyTests.length > 0) lines.push(`| **Flaky Tests** | ${formatFlakyTestCount(flakyTests.length)} |`);
    lines.push('');
    if (flakyTests.length > 0) {
        pushHeading(lines, 2, 'Flaky Tests');
        if (flakyTests.length > STEP_SUMMARY_MAX_FLAKY_TESTS) {
            lines.push(`Showing first ${STEP_SUMMARY_MAX_FLAKY_TESTS} of ${flakyTests.length} flaky tests.`);
            lines.push('');
        }
        for (const flakyTest of flakyTests.slice(0, STEP_SUMMARY_MAX_FLAKY_TESTS)){
            const relativePath = relative(rootPath, flakyTest.testPath);
            const fullName = formatFullTestName(flakyTest);
            const title = fullName ? `${relativePath} > ${fullName}` : relativePath;
            lines.push(`- \`${title}\` (passed after retry x${flakyTest.retryCount})`);
            const previousFailureSummary = getPreviousFailureSummary(flakyTest);
            if (previousFailureSummary) lines.push(`  Previous failure: ${previousFailureSummary}`);
        }
        lines.push('');
    }
    if (!isSuccess) {
        pushHeading(lines, 2, 'Failures');
        for(let index = 0; index < (unhandledErrors?.length ?? 0); index += 1){
            const error = unhandledErrors?.[index];
            if (error) {
                pushHeading(lines, 3, `❌ FAIL Unhandled Error ${index + 1}`);
                lines.push(`**${error.name || 'Error'}**: ${trimForSummary(error.message)}`);
                lines.push('');
                if (error.stack) pushFencedBlock(lines, '', stripAnsi(trimForSummary(error.stack)));
            }
        }
        const displayedFailures = failures.slice(0, STEP_SUMMARY_MAX_FAILURES);
        if (failures.length > STEP_SUMMARY_MAX_FAILURES) {
            lines.push(`Showing first ${STEP_SUMMARY_MAX_FAILURES} of ${failures.length} failures.`);
            lines.push('');
        }
        for(let index = 0; index < displayedFailures.length; index += 1){
            const failure = displayedFailures[index];
            if (!failure) continue;
            const { test, errors } = failure;
            const relativePath = relative(rootPath, test.testPath);
            const fullName = formatFullTestName(test);
            const title = fullName ? `${relativePath} > ${fullName}` : relativePath;
            pushHeading(lines, 3, `❌ FAIL ${title}`);
            for (const error of errors.length ? errors : [
                {
                    message: 'Unknown error'
                }
            ]){
                const errorType = getErrorType(error);
                const message = trimForSummary(error.message);
                lines.push(`**${errorType}**: ${message}`);
                lines.push('');
                if (error.diff) pushFencedBlock(lines, 'diff', stripAnsi(trimForSummary(error.diff)));
                if (error.stack) {
                    const stackFrames = await parseErrorStacktrace({
                        stack: error.stack,
                        fullStack: error.fullStack,
                        getSourcemap
                    });
                    if (stackFrames.length > 0) {
                        const stackLines = stackFrames.map((frame)=>stripAnsi(formatStack(frame, rootPath)));
                        pushFencedBlock(lines, '', stackLines.join('\n'));
                    }
                }
            }
            lines.push('<details>');
            lines.push('<summary>Repro command (or via your package manager)</summary>');
            lines.push('');
            pushFencedBlock(lines, 'bash', buildPackageManagerReproCommand(relativePath, fullName, packageManagerAgent));
            lines.push('</details>');
            lines.push('');
        }
    }
    lines.push('</details>');
    lines.push('');
    return `${lines.join('\n')}\n`;
}
function trimForSummary(input) {
    if (input.length <= STEP_SUMMARY_MAX_MESSAGE_LENGTH) return input;
    return `${input.slice(0, STEP_SUMMARY_MAX_MESSAGE_LENGTH - 1)}…`;
}
function collectFlakyTests(testResults) {
    return testResults.filter((result)=>'pass' === result.status && (result.retryCount ?? 0) > 0);
}
function getPreviousFailureSummary(testResult) {
    const parts = (testResult.retryErrors || testResult.errors || []).map((error)=>{
        const message = stripAnsi(error.message).replace(/\s+/g, ' ').trim();
        if (!message) return;
        return `${getErrorType(error)}: ${message}`;
    }).filter((part, index, items)=>Boolean(part) && items.indexOf(part) === index);
    if (0 === parts.length) return;
    const summary = parts.join('; ');
    if (summary.length <= STEP_SUMMARY_MAX_FLAKY_MESSAGE_LENGTH) return summary;
    return `${summary.slice(0, STEP_SUMMARY_MAX_FLAKY_MESSAGE_LENGTH - 1)}…`;
}
function formatFlakyTestCount(count) {
    return 1 === count ? '1 passed after retry' : `${count} passed after retry`;
}
class JsonReporter {
    config;
    rootPath;
    outputPath;
    consoleLogs = [];
    constructor({ config, rootPath, options }){
        this.config = config;
        this.rootPath = rootPath;
        this.outputPath = options?.outputPath;
    }
    onUserConsoleLog(log) {
        this.consoleLogs.push(log);
    }
    normalizeTest(test) {
        return {
            ...test,
            testPath: relative(this.rootPath, test.testPath),
            fullName: getTaskNameWithPrefix(test)
        };
    }
    createReport({ results, testResults, duration, snapshotSummary, unhandledErrors }) {
        const { failedTests, failedFiles, counts } = deriveRunCounts({
            results,
            testResults
        });
        const noTestsDiscovered = 0 === results.length && 0 === testResults.length;
        const hasFailedStatus = failedTests.length > 0 || failedFiles.length > 0 || (unhandledErrors?.length ?? 0) > 0 || noTestsDiscovered && !this.config.passWithNoTests;
        return {
            tool: 'rstest',
            version: "0.10.4",
            status: hasFailedStatus ? 'fail' : 'pass',
            summary: counts,
            durationMs: {
                total: duration.totalTime,
                build: duration.buildTime,
                tests: duration.testTime
            },
            snapshot: snapshotSummary,
            files: results.map((fileResult)=>({
                    ...fileResult,
                    testPath: relative(this.rootPath, fileResult.testPath),
                    fullName: getTaskNameWithPrefix(fileResult),
                    results: fileResult.results.map((test)=>this.normalizeTest(test))
                })),
            tests: testResults.map((test)=>this.normalizeTest(test)),
            consoleLogs: this.consoleLogs.length > 0 ? this.consoleLogs.map((log)=>({
                    ...log,
                    testPath: relative(this.rootPath, log.testPath)
                })) : void 0,
            unhandledErrors: unhandledErrors?.map((error)=>({
                    message: error.message,
                    stack: error.stack,
                    name: error.name
                }))
        };
    }
    async writeReport(content) {
        if (!this.outputPath) return void logger_logger.log(content);
        try {
            await promises.mkdir(node_path.dirname(this.outputPath), {
                recursive: true
            });
            await promises.writeFile(this.outputPath, content, 'utf-8');
            logger_logger.log(`JSON report written to: ${this.outputPath}`);
        } catch (error) {
            logger_logger.stderr(`Failed to write JSON report to ${this.outputPath}:`, error);
            logger_logger.log(content);
        }
    }
    async onTestRunEnd({ results, testResults, duration, snapshotSummary, unhandledErrors }) {
        const report = this.createReport({
            results,
            testResults,
            duration,
            snapshotSummary,
            unhandledErrors
        });
        await this.writeReport(`${JSON.stringify(report, null, 2)}\n`);
    }
}
class JUnitReporter {
    rootPath;
    outputPath;
    constructor({ rootPath, options: { outputPath } = {} }){
        this.rootPath = rootPath;
        this.outputPath = outputPath;
    }
    sanitizeXml(text) {
        let result = '';
        for (const ch of stripAnsi(text)){
            const cp = ch.codePointAt(0);
            const valid = 0x09 === cp || 0x0a === cp || 0x0d === cp || cp >= 0x20 && cp <= 0xd7ff || cp >= 0xe000 && cp <= 0xfffd || cp >= 0x10000 && cp <= 0x10ffff;
            if (valid) result += ch;
        }
        return result;
    }
    escapeXml(text) {
        const sanitized = this.sanitizeXml(text);
        return sanitized.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    }
    async createJUnitTestCase(test, getSourcemap) {
        const testCase = {
            name: getTaskNameWithPrefix(test),
            classname: relative(this.rootPath, test.testPath),
            time: (test.duration || 0) / 1000,
            status: test.status
        };
        if (test.errors && test.errors.length > 0) testCase.errors = await Promise.all(test.errors.map(async (error)=>{
            let details = `${error.message}${error.diff ? `\n${error.diff}` : ''}`;
            const stackFrames = error.stack ? await error_parseErrorStacktrace({
                stack: error.stack,
                fullStack: error.fullStack,
                getSourcemap
            }) : [];
            if (stackFrames[0]) details += `\n${formatStack(stackFrames[0], this.rootPath)}`;
            return {
                message: this.escapeXml(error.message),
                type: error.name || 'Error',
                details: this.escapeXml(details)
            };
        }));
        return testCase;
    }
    async createJUnitTestSuite(fileResult, getSourcemap) {
        const testCases = await Promise.all(fileResult.results.map(async (test)=>this.createJUnitTestCase(test, getSourcemap)));
        const failures = testCases.filter((test)=>'fail' === test.status).length;
        const errors = 0;
        const skipped = testCases.filter((test)=>'skip' === test.status || 'todo' === test.status).length;
        const totalTime = testCases.reduce((sum, test)=>sum + test.time, 0);
        return {
            name: relative(this.rootPath, fileResult.testPath),
            tests: testCases.length,
            failures,
            errors,
            skipped,
            time: totalTime,
            timestamp: new Date().toISOString(),
            testcases: testCases
        };
    }
    generateJUnitXml(report) {
        const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
        const testsuitesXml = `
<testsuites name="${this.escapeXml(report.testsuites.name)}" tests="${report.testsuites.tests}" failures="${report.testsuites.failures}" errors="${report.testsuites.errors}" skipped="${report.testsuites.skipped}" time="${report.testsuites.time}" timestamp="${this.escapeXml(report.testsuites.timestamp)}">`;
        const testsuiteXmls = report.testsuites.testsuite.map((suite)=>{
            const testsuiteStart = `
  <testsuite name="${this.escapeXml(suite.name)}" tests="${suite.tests}" failures="${suite.failures}" errors="${suite.errors}" skipped="${suite.skipped}" time="${suite.time}" timestamp="${this.escapeXml(suite.timestamp)}">`;
            const testcaseXmls = suite.testcases.map((testcase)=>{
                let testcaseXml = `
    <testcase name="${this.escapeXml(testcase.name)}" classname="${this.escapeXml(testcase.classname)}" time="${testcase.time}">`;
                if ('skip' === testcase.status || 'todo' === testcase.status) testcaseXml += `
      <skipped/>`;
                else if ('fail' === testcase.status && testcase.errors) testcase.errors.forEach((error)=>{
                    testcaseXml += `
      <failure message="${error.message}" type="${error.type}">${error.details || ''}</failure>`;
                });
                testcaseXml += `
    </testcase>`;
                return testcaseXml;
            }).join('');
            const testsuiteEnd = `
  </testsuite>`;
            return testsuiteStart + testcaseXmls + testsuiteEnd;
        }).join('');
        const testsuitesEnd = `
</testsuites>`;
        return xmlDeclaration + testsuitesXml + testsuiteXmls + testsuitesEnd;
    }
    async tryMkdir(dirname) {
        try {
            await promises.mkdir(dirname, {
                recursive: true
            });
        } catch (error) {
            if (error?.code !== 'EEXIST') throw error;
        }
    }
    async onTestRunEnd({ results, testResults, duration, getSourcemap }) {
        const testSuites = await Promise.all(results.map(async (fileResult)=>this.createJUnitTestSuite(fileResult, getSourcemap)));
        const totalTests = testResults.length;
        const totalFailures = testResults.filter((test)=>'fail' === test.status).length;
        const totalErrors = 0;
        const totalSkipped = testResults.filter((test)=>'skip' === test.status || 'todo' === test.status).length;
        const totalTime = duration.testTime / 1000;
        const report = {
            testsuites: {
                name: 'rstest tests',
                tests: totalTests,
                failures: totalFailures,
                errors: totalErrors,
                skipped: totalSkipped,
                time: totalTime,
                timestamp: new Date().toISOString(),
                testsuite: testSuites
            }
        };
        const xmlContent = this.generateJUnitXml(report);
        if (this.outputPath) try {
            const dirname = node_path.dirname(this.outputPath);
            await this.tryMkdir(dirname);
            await promises.writeFile(this.outputPath, xmlContent, 'utf-8');
            logger_logger.log(`JUnit XML report written to: ${this.outputPath}`);
        } catch (error) {
            logger_logger.stderr(`Failed to write JUnit XML report to ${this.outputPath}:`, error);
            logger_logger.log('JUnit XML Report:');
            logger_logger.log(xmlContent);
        }
        else logger_logger.log(xmlContent);
    }
}
const DEFAULT_TEST_LIST_MAX_ITEMS = 50;
const FOCUSED_RUN_MAX_TESTS = 10;
const md_require = createRequire(import.meta.url);
const defaultOptions = {
    preset: 'normal',
    header: {
        env: true
    },
    reproduction: 'file+name',
    testLists: 'auto',
    failures: {
        max: 50
    },
    codeFrame: {
        enabled: true,
        linesAbove: 2,
        linesBelow: 2
    },
    stack: 'top',
    candidateFiles: {
        enabled: true,
        max: 5
    },
    console: {
        enabled: true,
        maxLogsPerTestPath: 10,
        maxCharsPerEntry: 500
    },
    errors: {
        unhandled: true
    }
};
const presetOptions = {
    normal: {},
    compact: {
        console: {
            enabled: false,
            maxLogsPerTestPath: defaultOptions.console.maxLogsPerTestPath,
            maxCharsPerEntry: defaultOptions.console.maxCharsPerEntry
        },
        stack: 'top',
        codeFrame: {
            enabled: false,
            linesAbove: defaultOptions.codeFrame.linesAbove,
            linesBelow: defaultOptions.codeFrame.linesBelow
        },
        failures: {
            max: 20
        }
    },
    full: {
        stack: 'full',
        console: {
            enabled: defaultOptions.console.enabled,
            maxLogsPerTestPath: 200,
            maxCharsPerEntry: 5000
        },
        failures: {
            max: 200
        },
        codeFrame: {
            enabled: defaultOptions.codeFrame.enabled,
            linesAbove: 3,
            linesBelow: 3
        }
    }
};
const resolveToggleOption = (input, defaults, disabled, preset)=>{
    if (false === input) return {
        ...disabled
    };
    const base = preset ? {
        ...defaults,
        ...preset
    } : defaults;
    if (true === input || void 0 === input) return {
        ...base
    };
    return {
        ...base,
        ...input
    };
};
const resolveHeader = (input)=>resolveToggleOption(input, defaultOptions.header, {
        env: false
    });
const resolveReproduction = (input)=>{
    if (false === input) return false;
    if (true === input || void 0 === input) return defaultOptions.reproduction;
    return input;
};
const resolveFailures = (input, preset)=>({
        max: input?.max ?? preset?.failures?.max ?? defaultOptions.failures.max
    });
const resolveCodeFrame = (input, preset)=>resolveToggleOption(input, defaultOptions.codeFrame, {
        ...defaultOptions.codeFrame,
        enabled: false
    }, preset?.codeFrame);
const resolveCandidateFiles = (input)=>resolveToggleOption(input, defaultOptions.candidateFiles, {
        ...defaultOptions.candidateFiles,
        enabled: false
    });
const resolveConsole = (input, preset)=>resolveToggleOption(input, defaultOptions.console, {
        ...defaultOptions.console,
        enabled: false
    }, preset?.console);
const resolveErrors = (input)=>resolveToggleOption(input, defaultOptions.errors, {
        unhandled: false
    });
const resolveStack = (input, preset)=>input ?? preset?.stack ?? defaultOptions.stack;
const resolveOptions = (userOptions = {})=>{
    const presetName = userOptions.preset ?? defaultOptions.preset;
    const preset = presetOptions[presetName];
    return {
        preset: presetName,
        header: resolveHeader(userOptions.header),
        reproduction: resolveReproduction(userOptions.reproduction),
        testLists: userOptions.testLists ?? defaultOptions.testLists,
        failures: resolveFailures(userOptions.failures, preset),
        codeFrame: resolveCodeFrame(userOptions.codeFrame, preset),
        stack: resolveStack(userOptions.stack, preset),
        candidateFiles: resolveCandidateFiles(userOptions.candidateFiles),
        console: resolveConsole(userOptions.console, preset),
        errors: resolveErrors(userOptions.errors)
    };
};
const formatFailureTitle = (failure, index, rootPath)=>{
    const relativePath = relative(rootPath, failure.test.testPath);
    const fullName = formatFullTestName(failure.test);
    return {
        relativePath,
        fullName,
        title: fullName ? `${relativePath} :: ${fullName}` : relativePath,
        formattedId: String(index + 1).padStart(2, '0')
    };
};
const cleanString = (value)=>stripAnsi(value);
const TRUNCATION_SUFFIX = '... [truncated]';
const FAILURE_LIST_VALUE_MAX_CHARS = 200;
const truncateString = (value, maxChars)=>{
    if (maxChars <= 0) return '';
    if (value.length <= maxChars) return value;
    if (maxChars <= TRUNCATION_SUFFIX.length) return TRUNCATION_SUFFIX.slice(0, maxChars);
    return `${value.slice(0, maxChars - TRUNCATION_SUFFIX.length)}${TRUNCATION_SUFFIX}`;
};
const toSingleLine = (value)=>value.replace(/\r?\n/g, '\\n').replace(/\s+/g, ' ').trim();
const formatFailureListValue = (value)=>{
    if (void 0 === value) return '';
    if (null === value) return 'null';
    const raw = 'string' == typeof value ? value : JSON.stringify(value);
    return truncateString(toSingleLine(cleanString(raw)), FAILURE_LIST_VALUE_MAX_CHARS);
};
const formatPath = (rootPath, filePath)=>{
    if (!filePath) return;
    if (filePath.includes('://') || filePath.startsWith('node:')) return filePath;
    const normalizedRoot = pathe_M_eThtNZ_resolve(rootPath);
    const normalizedFile = pathe_M_eThtNZ_resolve(filePath);
    if (normalizedFile.startsWith(normalizedRoot)) return relative(rootPath, normalizedFile);
    return filePath;
};
const pickSnapshotSummary = (summary)=>({
        added: summary?.added ?? 0,
        updated: summary?.updated ?? 0,
        unmatched: summary?.unmatched ?? 0,
        removed: summary?.filesRemoved ?? 0,
        unchecked: summary?.unchecked ?? 0
    });
const resolveStackFrames = (frames, options)=>{
    const mode = options.stack;
    if (false === mode || 'top' === mode) return [];
    if ('full' === mode) return frames.slice(0, 50);
    if ('number' == typeof mode) return frames.slice(0, Math.max(0, mode));
    return [];
};
const resolveStackPayload = ({ rootPath, topFrame, stackFrames, mode })=>{
    if (false === mode) return {
        stackFrames: []
    };
    if ('top' === mode) return {
        topFrame: topFrame ? {
            file: formatPath(rootPath, topFrame.file),
            line: topFrame.lineNumber ?? null,
            column: topFrame.column ?? null,
            method: topFrame.methodName ?? null
        } : null,
        stackFrames: []
    };
    return {
        stackFrames
    };
};
const formatConsoleLog = (log, options)=>{
    const content = truncateString(cleanString(log.content), options.console.maxCharsPerEntry);
    return `[${log.type}] ${log.name}: ${content}`;
};
const buildCandidateFiles = (frames, rootPath, maxCandidateFiles)=>{
    const scores = new Map();
    frames.forEach((frame, index)=>{
        if (!frame.file) return;
        const formattedPath = formatPath(rootPath, frame.file) || frame.file;
        if (md_stackIgnores.some((entry)=>formattedPath.match(entry))) return;
        const entry = scores.get(formattedPath) || {
            score: 0,
            line: void 0
        };
        const weight = Math.max(1, 10 - index);
        entry.score += weight;
        entry.line = entry.line ?? frame.lineNumber;
        scores.set(formattedPath, entry);
    });
    return Array.from(scores.entries()).sort((a, b)=>b[1].score - a[1].score).slice(0, maxCandidateFiles).map(([path, meta])=>({
            path,
            line: meta.line
        }));
};
const stringifyYamlValue = (value)=>{
    if (null == value) return 'null';
    if ('string' == typeof value) return JSON.stringify(value);
    if ('number' == typeof value || 'boolean' == typeof value) return String(value);
    Array.isArray(value);
    return JSON.stringify(value);
};
const buildReproCommand = (relativePath, fullName, reproMode, agent)=>buildPackageManagerReproCommand(relativePath, fullName, agent, 'file+name' === reproMode);
const normalizeFilePath = (value)=>{
    if (!value) return;
    if (value.startsWith('file://')) try {
        return new URL(value).pathname;
    } catch  {}
    return value;
};
const md_isRelativePath = (value)=>/^\.\.\/?/.test(value);
const md_stackIgnores = [
    /\/node_modules\//,
    /\/rstest\/packages\/core\/dist/,
    /\/@rstest\/core/,
    /\/chai/,
    /\/node:\w+/,
    /webpack\/runtime/,
    /webpack\\runtime/,
    '<anonymous>'
];
const trimLeadingNodeFrames = (frames)=>{
    let startIndex = 0;
    while(startIndex < frames.length){
        const file = frames[startIndex]?.file;
        if (file?.startsWith('node:')) {
            startIndex += 1;
            continue;
        }
        break;
    }
    return frames.slice(startIndex);
};
const dropNodeFrames = (frames)=>frames.filter((frame)=>!frame.file?.startsWith('node:'));
const resolveModuleRoot = (spec)=>{
    try {
        if ('function' == typeof import.meta.resolve) {
            const resolved = import.meta.resolve(`${spec}/package.json`);
            const filePath = resolved.startsWith('file://') ? new URL(resolved).pathname : resolved;
            return external_node_path_dirname(filePath);
        }
    } catch  {}
    try {
        return external_node_path_dirname(md_require.resolve(`${spec}/package.json`));
    } catch  {
        return null;
    }
};
const excludedRoots = (()=>{
    const resolvedRoots = [];
    const candidates = [
        '@rstest/core'
    ];
    for (const spec of candidates){
        const root = resolveModuleRoot(spec);
        if (root) resolvedRoots.push(root);
    }
    return resolvedRoots;
})();
const md_parseErrorStacktrace = async ({ stack, getSourcemap, fullStack = false })=>{
    const traceMapCache = new Map();
    const frames = stack_trace_parser_esm_parse(stack).filter((frame)=>{
        if (fullStack) return true;
        if (!frame.file) return false;
        const filePath = normalizeFilePath(frame.file) || '';
        if (excludedRoots.some((root)=>filePath.startsWith(root))) return false;
        return !md_stackIgnores.some((entry)=>filePath.match(entry));
    }).map(async (frame)=>{
        const file = normalizeFilePath(frame.file);
        if (!file || !getSourcemap) return {
            ...frame,
            file
        };
        const sourcemap = await getSourcemap(file);
        if (!sourcemap) return {
            ...frame,
            file
        };
        let traceMap = traceMapCache.get(file);
        if (!traceMap) {
            traceMap = new TraceMap(sourcemap);
            traceMapCache.set(file, traceMap);
        }
        const { line, column, source, name } = originalPositionFor(traceMap, {
            line: frame.lineNumber || 1,
            column: frame.column || 1
        });
        if (!source) return null;
        const mappedFile = md_isRelativePath(source) ? external_node_path_resolve(file || '', '../', source) : (()=>{
            try {
                return new URL(source).pathname;
            } catch  {
                return source;
            }
        })();
        return {
            ...frame,
            file: mappedFile,
            lineNumber: line || frame.lineNumber,
            column: column || frame.column,
            methodName: name || frame.methodName
        };
    });
    const resolvedFrames = await Promise.all(frames);
    const filteredFrames = resolvedFrames.filter((frame)=>null !== frame);
    return dropNodeFrames(trimLeadingNodeFrames(filteredFrames));
};
const createCodeFrame = (filePath, { linesAbove, linesBelow, line, column })=>{
    if (!filePath || !node_fs.existsSync(filePath)) return null;
    const source = node_fs.readFileSync(filePath, 'utf-8');
    const sourceLines = source.split(/\r?\n/);
    const lineNumber = Math.max(1, line || 1);
    const columnNumber = Math.max(1, column || 1);
    const start = Math.max(1, lineNumber - linesAbove);
    const end = Math.min(sourceLines.length, lineNumber + linesBelow);
    const lineWidth = String(end).length;
    const frameLines = [];
    for(let i = start; i <= end; i += 1){
        const linePrefix = String(i).padStart(lineWidth, ' ');
        const lineContent = sourceLines[i - 1] ?? '';
        frameLines.push(`${linePrefix} | ${lineContent}`);
        if (i === lineNumber) {
            const marker = ' '.repeat(Math.max(0, columnNumber - 1));
            frameLines.push(`${' '.repeat(lineWidth)} | ${marker}^`);
        }
    }
    return frameLines.join('\n');
};
class MdReporter {
    rootPath;
    config;
    fileFilters;
    options;
    logsByTestPath = new Map();
    constructor({ rootPath, config, options, testState, fileFilters }){
        this.rootPath = rootPath;
        this.config = config;
        this.fileFilters = fileFilters ?? [];
        this.options = resolveOptions(options);
    }
    isFocusedRun({ testResults }) {
        if (this.fileFilters.length > 0) return true;
        if (this.config.testNamePattern) return true;
        if (testResults.length > 0 && testResults.length <= FOCUSED_RUN_MAX_TESTS) return true;
        return false;
    }
    pushTestList({ lines, heading, tests, maxItems }) {
        pushHeading(lines, 3, heading);
        if (!tests.length) return void lines.push('None.');
        const limit = Math.max(0, maxItems);
        const truncated = limit > 0 && tests.length > limit;
        const displayed = truncated ? tests.slice(0, limit) : tests;
        for (const test of displayed){
            const relativePath = relative(this.rootPath, test.testPath);
            const fullName = formatFullTestName(test);
            const title = fullName ? `${relativePath} :: ${fullName}` : relativePath;
            lines.push(`- ${title}`);
        }
        if (truncated) {
            ensureSingleBlankLine(lines);
            lines.push(`Note: list truncated (showing ${limit} of ${tests.length}).`);
        }
    }
    onUserConsoleLog(log) {
        if (!this.options.console.enabled) return;
        const logs = this.logsByTestPath.get(log.testPath) || [];
        logs.push(formatConsoleLog(log, this.options));
        this.logsByTestPath.set(log.testPath, logs);
    }
    renderFrontMatter(lines) {
        const frontMatter = {
            tool: "@rstest/core@0.10.4",
            timestamp: new Date().toISOString()
        };
        if (this.options.header.env) frontMatter.runtime = {
            node: process.version,
            platform: process.platform,
            cwd: process.cwd()
        };
        lines.push('---');
        for (const [key, value] of Object.entries(frontMatter))lines.push(`${key}: ${stringifyYamlValue(value)}`);
        lines.push('---');
        lines.push('');
    }
    renderTestsSection(lines, tests) {
        pushHeading(lines, 2, 'Tests');
        this.pushTestList({
            lines,
            heading: 'Passed',
            tests: tests.passed,
            maxItems: DEFAULT_TEST_LIST_MAX_ITEMS
        });
        this.pushTestList({
            lines,
            heading: 'Skipped',
            tests: tests.skipped,
            maxItems: DEFAULT_TEST_LIST_MAX_ITEMS
        });
        if (tests.todo.length) this.pushTestList({
            lines,
            heading: 'Todo',
            tests: tests.todo,
            maxItems: DEFAULT_TEST_LIST_MAX_ITEMS
        });
    }
    renderUnhandledErrors(lines, errors) {
        if (!this.options.errors.unhandled || !errors?.length) return;
        pushHeading(lines, 2, 'Unhandled Errors');
        for(let index = 0; index < errors.length; index += 1){
            const error = errors[index];
            if (error) {
                pushHeading(lines, 3, `Unhandled Error ${index + 1}`);
                pushFencedBlock(lines, 'json', stringifyJson({
                    name: error.name || 'Error',
                    message: cleanString(error.message),
                    stack: error.stack ? cleanString(error.stack) : void 0
                }));
            }
        }
    }
    async onTestRunEnd({ results, testResults, duration, getSourcemap, snapshotSummary, unhandledErrors, filterRerunTestPaths }) {
        const rootPath = this.rootPath || process.cwd();
        const failures = collectFailures({
            results,
            testResults,
            filterRerunTestPaths
        });
        const packageManagerAgent = this.options.reproduction ? await detectPackageManagerAgent(rootPath) : 'npm';
        const { failedTests, passedTests, skippedTests, todoTests, failedFiles, counts } = deriveRunCounts({
            results,
            testResults
        });
        const status = failedTests.length || failedFiles.length || unhandledErrors?.length ? 'fail' : 'pass';
        const focusedRun = this.isFocusedRun({
            testResults
        });
        const summaryPayload = {
            status,
            counts,
            durationMs: {
                total: duration.totalTime,
                build: duration.buildTime,
                tests: duration.testTime
            }
        };
        summaryPayload.snapshot = pickSnapshotSummary(snapshotSummary);
        const lines = [];
        this.renderFrontMatter(lines);
        pushHeading(lines, 1, 'Rstest Test Execution Report');
        pushHeading(lines, 2, 'Summary');
        pushFencedBlock(lines, 'json', stringifyJson(summaryPayload));
        if ('always' === this.options.testLists || 'pass' === status && focusedRun) this.renderTestsSection(lines, {
            passed: passedTests,
            skipped: skippedTests,
            todo: todoTests
        });
        pushHeading(lines, 2, 'Failures');
        if (failures.length) {
            const maxFailures = Math.max(0, this.options.failures.max);
            const shouldTruncate = failures.length > maxFailures;
            const displayedFailures = shouldTruncate ? failures.slice(0, maxFailures) : failures;
            if (shouldTruncate) {
                ensureSingleBlankLine(lines);
                lines.push(`Truncated failures: showing full details for first ${maxFailures} of ${failures.length} failures.`);
                lines.push(`For failures beyond ${maxFailures}, only minimal fields are shown in the failure list. Use the repro command to rerun a specific failure for full details.`);
                lines.push('');
                pushHeading(lines, 3, 'Failure List');
                for(let index = 0; index < failures.length; index += 1){
                    const failure = failures[index];
                    if (!failure) continue;
                    const { relativePath, fullName, title, formattedId } = formatFailureTitle(failure, index, rootPath);
                    lines.push(`- [F${formattedId}] ${title}`);
                    const primaryError = failure.errors[0] || {
                        message: 'Unknown error'
                    };
                    const type = getErrorType({
                        name: primaryError.name,
                        message: primaryError.message || ''
                    });
                    lines.push(`  - type: ${type}`);
                    if (primaryError.message) lines.push(`  - message: ${formatFailureListValue(primaryError.message)}`);
                    if (void 0 !== primaryError.expected) lines.push(`  - expected: ${formatFailureListValue(primaryError.expected)}`);
                    if (void 0 !== primaryError.actual) lines.push(`  - actual: ${formatFailureListValue(primaryError.actual)}`);
                    if (this.options.reproduction) lines.push(`  - repro: ${buildReproCommand(relativePath, fullName, this.options.reproduction, packageManagerAgent)}`);
                }
                pushHeading(lines, 3, `Failure Details (first ${maxFailures})`);
            }
            for(let index = 0; index < displayedFailures.length; index += 1){
                const failure = displayedFailures[index];
                if (!failure) continue;
                const { relativePath, fullName, title, formattedId } = formatFailureTitle(failure, index, rootPath);
                pushHeading(lines, 3, `[F${formattedId}] ${title}`);
                if (this.options.reproduction) {
                    lines.push('repro:');
                    pushFencedBlock(lines, 'bash', buildReproCommand(relativePath, fullName, this.options.reproduction, packageManagerAgent));
                }
                const errorEntries = await Promise.all((failure.errors.length ? failure.errors : [
                    {
                        message: 'Unknown error'
                    }
                ]).map(async (error)=>{
                    const candidateFrames = error.stack ? await md_parseErrorStacktrace({
                        stack: error.stack,
                        getSourcemap,
                        fullStack: false
                    }) : [];
                    const fullFrames = error.fullStack && error.stack ? await md_parseErrorStacktrace({
                        stack: error.stack,
                        getSourcemap,
                        fullStack: true
                    }) : candidateFrames;
                    const trimmedFrames = resolveStackFrames(fullFrames, this.options);
                    const topFrame = fullFrames[0] ?? candidateFrames[0];
                    return {
                        error,
                        topFrame,
                        candidateFrames,
                        stackFrames: trimmedFrames
                    };
                }));
                const candidateFiles = this.options.candidateFiles.enabled ? buildCandidateFiles(errorEntries.flatMap((entry)=>entry.candidateFrames), rootPath, this.options.candidateFiles.max) : [];
                const failurePayload = {
                    testPath: relativePath,
                    project: failure.test.project,
                    fullName,
                    status: failure.test.status,
                    duration: failure.test.duration,
                    retryCount: failure.test.retryCount ?? 0,
                    errors: errorEntries.map(({ error, topFrame, stackFrames })=>{
                        const mappedStackFrames = stackFrames.map((frame)=>({
                                file: formatPath(rootPath, frame.file),
                                line: frame.lineNumber,
                                column: frame.column,
                                method: frame.methodName
                            }));
                        const hasDiff = Boolean(error.diff);
                        return {
                            type: getErrorType(error),
                            message: cleanString(error.message),
                            expected: hasDiff ? void 0 : error.expected,
                            actual: hasDiff ? void 0 : error.actual,
                            ...resolveStackPayload({
                                rootPath,
                                topFrame,
                                stackFrames: mappedStackFrames,
                                mode: this.options.stack
                            })
                        };
                    }),
                    candidateFiles: candidateFiles.length ? candidateFiles : void 0
                };
                lines.push('details:');
                pushFencedBlock(lines, 'json', stringifyJson(failurePayload));
                for(let errorIndex = 0; errorIndex < errorEntries.length; errorIndex += 1){
                    const entry = errorEntries[errorIndex];
                    if (entry?.error.diff) {
                        const label = errorEntries.length > 1 ? `diff (error ${errorIndex + 1}):` : 'diff:';
                        lines.push(label);
                        pushFencedBlock(lines, 'diff', cleanString(entry.error.diff));
                    }
                }
                if (this.options.codeFrame.enabled) for(let errorIndex = 0; errorIndex < errorEntries.length; errorIndex += 1){
                    const entry = errorEntries[errorIndex];
                    if (!entry?.topFrame?.file || !entry.topFrame.lineNumber) continue;
                    const codeFrame = createCodeFrame(entry.topFrame.file, {
                        linesAbove: this.options.codeFrame.linesAbove,
                        linesBelow: this.options.codeFrame.linesBelow,
                        line: entry.topFrame.lineNumber,
                        column: entry.topFrame.column || 1
                    });
                    if (codeFrame) {
                        lines.push(`codeFrame (error ${errorIndex + 1}):`);
                        pushFencedBlock(lines, 'text', codeFrame);
                    }
                }
                if (this.options.console.enabled) {
                    const consoleLogs = this.logsByTestPath.get(failure.test.testPath) || [];
                    const limitedLogs = consoleLogs.slice(Math.max(0, consoleLogs.length - this.options.console.maxLogsPerTestPath));
                    if (limitedLogs.length) {
                        lines.push('console:');
                        pushFencedBlock(lines, 'text', limitedLogs.join('\n'));
                    }
                }
            }
        } else {
            lines.push('No test failures reported.');
            if ('pass' === status && !focusedRun && 'always' !== this.options.testLists) {
                ensureSingleBlankLine(lines);
                lines.push('Note: all tests passed. Lists omitted for brevity.');
            }
        }
        this.renderUnhandledErrors(lines, unhandledErrors);
        const output = lines.join('\n');
        process.stdout.write(`${output}\n`);
    }
}
class VerboseReporter extends DefaultReporter {
    verboseOptions = {};
    constructor({ rootPath, options, config, testState, projectConfigs }){
        super({
            rootPath,
            options: {
                ...options,
                summary: true
            },
            config,
            testState,
            projectConfigs
        });
        this.verboseOptions = options;
    }
    onTestFileResult(test) {
        this.statusRenderer?.onTestFileResult();
        this.nonTTYProgressNotifier?.notifyOutput();
        const projectConfig = this.projectConfigs.get(test.project);
        const hideSkippedTestFiles = projectConfig?.hideSkippedTestFiles ?? this.config.hideSkippedTestFiles;
        if (hideSkippedTestFiles && 'skip' === test.status) return;
        const relativePath = relative(this.rootPath, test.testPath);
        const slowTestThreshold = projectConfig?.slowTestThreshold ?? this.config.slowTestThreshold;
        const hideSkippedTests = projectConfig?.hideSkippedTests ?? this.config.hideSkippedTests;
        const logResults = ()=>{
            logFileTitle(test, relativePath, true, this.verboseOptions.showProjectName);
            for (const result of test.results)logCase(result, {
                slowTestThreshold,
                hideSkippedTests
            });
        };
        this.withSuspendedStatusRenderer(logResults);
    }
}
class TestStateManager {
    runningModules = new Map();
    testModules = [];
    testFiles = void 0;
    onTestFileStart(testPath) {
        this.runningModules.set(testPath, {
            runningTests: [],
            results: []
        });
    }
    onTestCaseResult(result) {
        const currentModule = this.runningModules.get(result.testPath);
        if (currentModule) {
            const filteredRunningTests = currentModule.runningTests.filter((t)=>t.testId !== result.testId);
            this.runningModules.set(result.testPath, {
                runningTests: filteredRunningTests,
                results: [
                    ...currentModule.results,
                    result
                ]
            });
        } else this.runningModules.set(result.testPath, {
            runningTests: [],
            results: [
                result
            ]
        });
    }
    onTestCaseStart(test) {
        const currentModule = this.runningModules.get(test.testPath);
        if (currentModule) {
            const filteredRunningTests = currentModule.runningTests.filter((t)=>t.testId !== test.testId);
            this.runningModules.set(test.testPath, {
                runningTests: [
                    ...filteredRunningTests,
                    test
                ],
                results: currentModule.results
            });
        } else this.runningModules.set(test.testPath, {
            runningTests: [
                test
            ],
            results: []
        });
    }
    getCountOfFailedTests() {
        const testResults = Array.from(this.runningModules.values()).flatMap(({ results })=>results).concat(this.testModules.flatMap((mod)=>mod.results.length > 0 ? mod.results : [
                {
                    status: mod.status
                }
            ]));
        return testResults.filter((t)=>'fail' === t.status).length;
    }
    onTestFileResult(test) {
        this.runningModules.delete(test.testPath);
        this.testModules.push(test);
    }
    reset() {
        this.runningModules.clear();
        this.testModules = [];
        this.testFiles = void 0;
    }
}
function formatEnvironmentName(name) {
    return name.replace(/[^a-zA-Z0-9\-_$]/g, '_');
}
function failConfig(embedded, message) {
    if (embedded) throw new Error(message);
    logger_logger.error(message);
    process.exit(1);
}
class Rstest {
    cwd;
    command;
    fileFilters;
    fileFilterMode;
    relatedFilters;
    relatedMode;
    relatedResolutionEmpty;
    changedCoverageFilters;
    relatedRerunReason;
    relatedRerunFiles;
    configFilePath;
    embedded;
    reporters;
    snapshotManager;
    trace;
    version;
    rootPath;
    originalConfig;
    normalizedConfig;
    reporterResults = {
        results: [],
        testResults: []
    };
    stateManager = new TestStateManager();
    testState = {
        getRunningModules: ()=>this.stateManager.runningModules,
        getTestModules: ()=>this.stateManager.testModules,
        getTestFiles: ()=>{
            if ('watch' === this.command) return;
            return this.stateManager.testFiles;
        }
    };
    projects = [];
    constructor({ cwd = process.cwd(), command, fileFilters, fileFilterMode, configFilePath, projects, trace = false, embedded = false }, userConfig){
        this.cwd = cwd;
        this.command = command;
        this.trace = trace;
        this.fileFilters = fileFilters;
        this.fileFilterMode = fileFilterMode;
        this.configFilePath = configFilePath;
        this.embedded = embedded;
        const rootPath = userConfig.root ? getAbsolutePath(cwd, userConfig.root) : cwd;
        const rstestConfig = withDefaultConfig(resolveBuildCacheDependencyPaths({
            ...userConfig,
            root: rootPath
        }, configFilePath));
        if ('watch' === command && rstestConfig.shard) failConfig(embedded, 'Test sharding is not supported in watch mode.');
        const snapshotManager = new SnapshotManager({
            updateSnapshot: rstestConfig.update ? 'all' : dist_m ? 'none' : 'new'
        });
        this.snapshotManager = snapshotManager;
        this.version = "0.10.4";
        this.rootPath = rootPath;
        this.originalConfig = userConfig;
        this.normalizedConfig = rstestConfig;
        this.projects = projects.length ? projects.map((project)=>{
            project.config.root = getAbsolutePath(rootPath, project.config.root);
            if (project.config.shard && (project.config.shard.count !== rstestConfig.shard?.count || project.config.shard.index !== rstestConfig.shard?.index)) failConfig(embedded, `The \`shard\` option is a global option and cannot be set per-project.\nglobal \`shard\` option:\n  count: ${rstestConfig.shard?.count}, index: ${rstestConfig.shard?.index}\nproject "${project.config.name}" shard option:\n  count: ${project.config.shard.count}, index: ${project.config.shard.index}`);
            const config = withDefaultConfig(resolveBuildCacheDependencyPaths(project.config, project.configFilePath ?? configFilePath));
            config.isolate = rstestConfig.isolate;
            config.coverage = rstestConfig.coverage;
            config.bail = rstestConfig.bail;
            config.source ??= {};
            if (config.source.tsconfigPath) config.source.tsconfigPath = getAbsolutePath(config.root, config.source.tsconfigPath);
            else {
                const tsconfigPath = join(config.root, TS_CONFIG_FILE);
                if (existsSync(tsconfigPath)) config.source.tsconfigPath = tsconfigPath;
            }
            const environmentName = formatEnvironmentName(config.name);
            if (config.performance?.buildCache) config.performance.buildCache = normalizeBuildCache({
                buildCache: config.performance.buildCache,
                root: config.root,
                tsconfigPaths: config.source?.tsconfigPath ? [
                    config.source.tsconfigPath
                ] : [],
                outputDistPathRoot: rstestConfig.output.distPath.root,
                environmentName,
                browserEnabled: config.browser.enabled,
                coverageEnabled: config.coverage?.enabled,
                coverageProvider: config.coverage?.provider,
                assumeNormalized: true
            });
            return {
                configFilePath: project.configFilePath,
                rootPath: config.root,
                name: config.name,
                _globalSetups: false,
                outputModule: config.output?.module ?? 'false' !== process.env[ENV.OUTPUT_MODULE],
                environmentName,
                normalizedConfig: config
            };
        }) : [
            {
                configFilePath,
                rootPath,
                _globalSetups: false,
                name: rstestConfig.name,
                outputModule: rstestConfig.output?.module ?? 'false' !== process.env[ENV.OUTPUT_MODULE],
                environmentName: formatEnvironmentName(rstestConfig.name),
                normalizedConfig: rstestConfig
            }
        ];
        const projectConfigs = new Map(this.projects.map((p)=>[
                p.name,
                p.normalizedConfig
            ]));
        const reporters = 'list' !== command ? createReporters(rstestConfig.reporters, {
            rootPath,
            config: rstestConfig,
            testState: this.testState,
            fileFilters: this.fileFilters,
            projectConfigs,
            options: {
                showProjectName: projects.length > 1
            }
        }).filter((r)=>{
            if ('merge-reports' === command && r instanceof BlobReporter) return false;
            return true;
        }) : [];
        this.reporters = reporters;
    }
    updateReporterResultState(results, testResults, deletedEntries = []) {
        results.forEach((item)=>{
            const existingIndex = this.reporterResults.results.findIndex((r)=>r.testPath === item.testPath);
            if (-1 !== existingIndex) this.reporterResults.results[existingIndex] = item;
            else this.reporterResults.results.push(item);
        });
        const testPathsToUpdate = new Set(testResults.map((r)=>r.testPath));
        this.reporterResults.testResults = this.reporterResults.testResults.filter((r)=>!testPathsToUpdate.has(r.testPath));
        this.reporterResults.testResults.push(...testResults);
        if (deletedEntries.length > 0) {
            const deletedPathsSet = new Set(deletedEntries);
            this.reporterResults.results = this.reporterResults.results.filter((r)=>!deletedPathsSet.has(r.testPath));
            this.reporterResults.testResults = this.reporterResults.testResults.filter((r)=>!deletedPathsSet.has(r.testPath));
        }
    }
}
const reportersMap = {
    default: DefaultReporter,
    dot: DotReporter,
    verbose: VerboseReporter,
    'github-actions': GithubActionsReporter,
    junit: JUnitReporter,
    json: JsonReporter,
    md: MdReporter,
    blob: BlobReporter
};
function createReporters(reporters, initConfig = {}) {
    const result = castArray(reporters).map((reporter)=>{
        if ('string' == typeof reporter || Array.isArray(reporter)) {
            const [name, options = {}] = 'string' == typeof reporter ? [
                reporter,
                {}
            ] : reporter;
            if (name in reportersMap) {
                const Reporter = reportersMap[name];
                return new Reporter({
                    ...initConfig,
                    options: {
                        ...initConfig.options || {},
                        ...options
                    }
                });
            }
            throw new Error(`Reporter ${name} not found. Please install it or use a built-in reporter.`);
        }
        return reporter;
    });
    return result;
}
function createRstest({ config, projects, configFilePath, trace, cwd = process.cwd(), embedded = false }, command, fileFilters, fileFilterMode) {
    const context = new Rstest({
        cwd,
        command,
        fileFilters,
        fileFilterMode,
        configFilePath,
        projects,
        trace,
        embedded
    }, config);
    const runTests = async ()=>{
        const { runTests } = await import("./0~runTests.js");
        await runTests(context);
    };
    const listTests = async (options)=>{
        const { listTests } = await import("./0~listTests.js");
        return listTests(context, options);
    };
    const mergeReports = async (options)=>{
        const { mergeReports } = await import("./0~mergeReports.js");
        await mergeReports(context, options);
    };
    return {
        context,
        runTests,
        listTests,
        mergeReports
    };
}
export { config_loadConfig as loadConfig, core_namespaceObject, createRstest, error_parseErrorStacktrace as parseErrorStacktrace, error_printError as printError, formatStack, initCli, initRstestEnv, init_namespaceObject, isBlobFile, mergeProjectConfig, mergeRstestConfig, mergeWithCLIOptions, prepareCli, resolveCommand, resolveExtends, resolveProjects, showRstest };
