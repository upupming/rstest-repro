import type { config } from 'chai';
import type { RsbuildConfig } from '@rsbuild/core';
import type { Writable } from 'node:stream';

declare type BlobReporterOptions = {
    /**
     * Directory to store blob report files.
     * @default '.rstest-reports'
     */ outputDir?: string;
};

declare interface BranchMapping {
    loc: Range_2;
    type: string;
    locations: Range_2[];
    line: number;
}

/**
 * Single source of truth for the built-in browser provider identifiers.
 *
 * Core owns this list because the peer-dependency direction is one-way
 * (`@rstest/browser` depends on `@rstest/core`, never the reverse), so the CLI
 * `init` templates here cannot import the registry from `@rstest/browser`.
 * `@rstest/browser` re-exports {@link BrowserProvider} and keys its provider
 * registry by it (`Record<BrowserProvider, …>`), so adding a provider here
 * forces a matching implementation there — a missing key is a compile error.
 */
declare const BROWSER_PROVIDERS: readonly ['playwright'];

declare type BrowserModeConfig = {
    /**
     * Enable browser mode when running tests.
     *
     * @default false
     */ enabled?: boolean;
    /**
     * Browser provider to use for running tests.
     *
     * Currently only 'playwright' is supported.
     */ provider: BrowserProvider;
    /**
     * Which browser to use for testing.
     *
     * @default 'chromium'
     */ browser?: BrowserName;
    /**
     * Run browser in headless mode.
     *
     * @default Inferred from CI environment. `true` in CI, `false` otherwise.
     */ headless?: boolean;
    /**
     * Port for the browser mode dev server.
     *
     * If not specified, a random available port will be used.
     */ port?: number;
    /**
     * Default runner iframe viewport.
     *
     * When not specified, the browser UI fills the preview panel.
     */ viewport?: BrowserViewport;
    /**
     * Whether to exit if the specified port is already in use.
     *
     * @default false
     */ strictPort?: boolean;
    /**
     * Provider-specific config passed through to the selected browser provider.
     *
     * Use provider-owned types or helpers in user config when you want richer
     * IntelliSense for this field.
     */ providerOptions?: Record<string, unknown>;
};

/**
 * Supported browser types for browser mode testing.
 *
 * - `chromium` - Google Chrome, Microsoft Edge
 * - `firefox` - Mozilla Firefox
 * - `webkit` - Safari
 */ declare type BrowserName = 'chromium' | 'firefox' | 'webkit';

declare type BrowserProvider = (typeof BROWSER_PROVIDERS)[number];

declare type BrowserViewport = {
    width: number;
    height: number;
} | DevicePreset;

declare type BuiltInReporterNames = 'default' | 'dot' | 'verbose' | 'md' | 'github-actions' | 'junit' | 'json' | 'blob';

declare type BuiltinReporterOptions = {
    default: DefaultReporterOptions;
    dot: Pick<DefaultReporterOptions, 'logger' | 'summary'>;
    verbose: VerboseReporterOptions;
    md: MdReporterOptions;
    'github-actions': GithubActionsReporterOptions;
    junit: Record<string, unknown>;
    json: JsonReporterOptions;
    blob: BlobReporterOptions;
};

declare type BundleDependencyPattern = string | RegExp;

declare type ChaiConfig = Partial<Pick<typeof config, 'showDiff' | 'truncateThreshold'>>;

declare interface CloverOptions extends FileOptions, ProjectOptions {}

declare interface CoberturaOptions extends FileOptions, ProjectOptions {}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare interface Colors {
    	comment: {
        		close: string
        		open: string
        	};
    	content: {
        		close: string
        		open: string
        	};
    	prop: {
        		close: string
        		open: string
        	};
    	tag: {
        		close: string
        		open: string
        	};
    	value: {
        		close: string
        		open: string
        	};
}

declare type CompareKeys = ((a: string, b: string) => number) | null | undefined;

declare interface Config {
    	callToJSON: boolean;
    	compareKeys: CompareKeys;
    	colors: Colors;
    	escapeRegex: boolean;
    	escapeString: boolean;
    	indent: string;
    	maxDepth: number;
    	maxWidth: number;
    	min: boolean;
    	plugins: Plugins;
    	printBasicPrototype: boolean;
    	printFunctionName: boolean;
    	spacingInner: string;
    	spacingOuter: string;
}

/** The stdio stream a console log was written to */ declare type ConsoleStreamType = 'stdout' | 'stderr';

/**
 * Base class for writing content
 */
declare class ContentWriter {
    /**
     * returns the colorized version of a string. Typically,
     * content writers that write to files will return the
     * same string and ones writing to a tty will wrap it in
     * appropriate escape sequences.
     */
    colorize(str: string, clazz?: string): string;
    /**
     * writes a string appended with a newline to the destination
     */
    println(str: string): void;
    /**
     * closes this content writer. Should be called after all writes are complete.
     */
    close(): void;
}

declare interface Context {
    data: any;
    dir: string;
    sourceFinder(filepath: string): string;
    watermarks: Watermarks;
    writer: FileWriter;
    /**
     * returns the coverage class given a coverage
     * types and a percentage value.
     */
    classForPercent(type: keyof Watermarks, value: number): string;
    /**
     * returns the source code for the specified file path or throws if
     * the source could not be found.
     */
    getSource(filepath: string): string;
    getTree(summarizer?: Summarizers): Tree;
    /**
     * returns a full visitor given a partial one.
     */
    getVisitor<N extends Node_2 = Node_2>(visitor: Partial<Visitor<N>>): Visitor<N>;
    /**
     * returns a FileWriter implementation for reporting use. Also available
     * as the `writer` property on the context.
     */
    getWriter(): FileWriter;
    /**
     * returns an XML writer for the supplied content writer
     */
    getXmlWriter(contentWriter: ContentWriter): XmlWriter;
}

declare interface Coverage {
    covered: number;
    total: number;
    coverage: number;
}

declare interface CoverageMapData {
    [key: string]: FileCoverage | FileCoverageData;
}

declare type CoverageOptions = {
    /**
     * Enable coverage collection.
     * @default false
     */ enabled?: boolean;
    /**
     * A list of glob patterns that should be included for coverage collection.
     * Only collect coverage for tested files by default.
     *
     * @default undefined
     */ include?: string[];
    /**
     * Collect coverage only for files changed since a specified commit or branch.
     * When enabled from `--changed`, it inherits the changed files collected by `--changed`.
     *
     * @default undefined
     */ changed?: boolean | string;
    /**
     * A list of glob patterns that should be excluded from coverage collection.
     *
     * This option accepts an array of wax(https://crates.io/crates/wax)-compatible glob patterns
     *
     * @default ['**\/node_modules/**',
     *           '**\/test/**',
     *           '**\/__tests__/**',
     *           '**\/__mocks__/**',
     *           '**\/*.d.ts',
     *           '**\/*.{test,spec}.[jt]s',
     *           '**\/*.{test,spec}.[cm][jt]s',
     *           '**\/*.{test,spec}.[jt]sx',
     *           '**\/*.{test,spec}.[cm][jt]sx'
     * ]
     */ exclude?: string[];
    /**
     * The provider to use for coverage collection.
     * @default 'istanbul'
     */ provider?: 'istanbul' | 'v8';
    /**
     * The reporters to use for coverage collection.
     * Supports built-in istanbul reporters and custom reporters (e.g., '@canyonjs/report-html').
     * @default ['text', 'html', 'clover', 'json']
     * @example
     * // Built-in reporters
     * reporters: ['text', 'html', ['json', { file: 'coverage.json' }]]
     *
     * // Custom reporters
     * reporters: ['@canyonjs/report-html', ['custom-reporter', { outputDir: './reports' }]]
     *
     * // Mixed usage
     * reporters: ['text', '@canyonjs/report-html', ['html', { subdir: 'html-report' }]]
     */ reporters?: SupportedReporter[];
    /**
     * The directory to store coverage reports.
     * @default './coverage'
     */ reportsDirectory?: string;
    /**
     * Whether to clean the coverage directory before running tests.
     * @default true
     */ clean?: boolean;
    /**
     * Coverage thresholds
     *
     * @default undefined
     */ thresholds?: CoverageThresholds;
    /**
     * Whether to report coverage when tests fail.
     * @default false
     */ reportOnFailure?: boolean;
    /**
     * Whether to collect coverage for source files outside the project root directory.
     * This is useful in monorepo setups where tests import modules from sibling packages.
     * @default false
     */ allowExternal?: boolean;
};

declare class CoverageSummary {
    constructor(data: CoverageSummary | CoverageSummaryData);
    merge(obj: CoverageSummary): CoverageSummary;
    toJSON(): CoverageSummaryData;
    isEmpty(): boolean;
    data: CoverageSummaryData;
    lines: Totals;
    statements: Totals;
    branches: Totals;
    functions: Totals;
}

declare interface CoverageSummaryData {
    lines: Totals;
    statements: Totals;
    branches: Totals;
    functions: Totals;
}

declare type CoverageThreshold = {
    /** Threshold for statements */ statements?: number;
    /** Threshold for functions */ functions?: number;
    /** Threshold for branches */ branches?: number;
    /** Threshold for lines */ lines?: number;
};

declare type CoverageThresholds = CoverageThreshold | (CoverageThreshold & ThresholdGlobRecord);

/** Custom reporter configuration for non-istanbul reporters */ declare type CustomReporter = string | [string, Record<string, unknown>];

declare interface DecodedSourceMap extends SourceMapV3 {
    mappings: SourceMapSegment[][];
}

declare type DecodedSourceMapXInput = DecodedSourceMap & XInput;

declare type DefaultReporterOptions = {
    /**
     * prints out summary of all tests
     * @default true
     */ summary?: boolean;
    /**
     * logger which write messages to
     * @default process.stdout/process.stderr
     */ logger?: Options['logger'];
    /**
     * prints out project name in test file title
     * show project name by default when running multiple projects
     */ showProjectName?: boolean;
};

/**
 * Device presets aligned with Chrome DevTools device toolbar.
 *
 * These values are stable identifiers (not user-facing labels).
 *
 * IMPORTANT: Keep this union in sync with
 * `@rstest/browser` preset runtime source:
 * `packages/browser/src/viewportPresets.ts`.
 *
 * `@rstest/core` owns `defineConfig` typing, while `@rstest/browser` owns
 * runtime validation and resolution for preset ids.
 */ declare type DevicePreset = 'iPhoneSE' | 'iPhoneXR' | 'iPhone12Pro' | 'iPhone14ProMax' | 'Pixel7' | 'SamsungGalaxyS8Plus' | 'SamsungGalaxyS20Ultra' | 'iPadMini' | 'iPadAir' | 'iPadPro' | 'SurfacePro7' | 'SurfaceDuo' | 'GalaxyZFold5' | 'AsusZenbookFold' | 'SamsungGalaxyA51A71' | 'NestHub' | 'NestHubMax';

declare type Duration = {
    totalTime: number;
    buildTime: number;
    testTime: number;
};

declare interface EncodedSourceMap extends SourceMapV3 {
    mappings: string;
}

declare type EncodedSourceMapXInput = EncodedSourceMap & XInput;

declare type EnvironmentName = 'node' | 'jsdom' | 'happy-dom';

declare type EnvironmentWithOptions = {
    name: EnvironmentName;
    options?: Record<string, any>;
};

declare type ExtendConfig = Omit<LooseRstestConfig, 'projects'>;

declare type ExtendConfigFn = (userConfig: Readonly<LooseRstestConfig>) => MaybePromise<ExtendConfig>;

declare class FileCoverage implements FileCoverageData {
    constructor(data: string | FileCoverage | FileCoverageData);
    merge(other: FileCoverageData): void;
    getBranchCoverageByLine(): { [line: number]: Coverage };
    getLineCoverage(): { [line: number]: number };
    getUncoveredLines(): number[];
    resetHits(): void;
    computeBranchTotals(): Totals;
    computeSimpleTotals(): Totals;
    toSummary(): CoverageSummary;
    toJSON(): object;

    data: FileCoverageData;
    path: string;
    statementMap: { [key: string]: Range_2 };
    fnMap: { [key: string]: FunctionMapping };
    branchMap: { [key: string]: BranchMapping };
    s: { [key: string]: number };
    f: { [key: string]: number };
    b: { [key: string]: number[] };
}

declare interface FileCoverageData {
    path: string;
    statementMap: { [key: string]: Range_2 };
    fnMap: { [key: string]: FunctionMapping };
    branchMap: { [key: string]: BranchMapping };
    s: { [key: string]: number };
    f: { [key: string]: number };
    b: { [key: string]: number[] };
}

declare interface FileOptions {
    file: string;
}

/**
 * utility for writing files under a specific directory
 */
declare class FileWriter {
    constructor(baseDir: string);
    static startCapture(): void;
    static stopCapture(): void;
    static getOutput(): string;
    static resetOutput(): void;
    /**
     * returns a FileWriter that is rooted at the supplied subdirectory
     */
    writeForDir(subdir: string): FileWriter;
    /**
     * copies a file from a source directory to a destination name
     */
    copyFile(source: string, dest: string, header?: string): void;
    /**
     * returns a content writer for writing content to the supplied file.
     */
    writeFile(file: string | null): ContentWriter;
}

declare type FormattedError = {
    fullStack?: boolean;
    message: string;
    name?: string;
    stack?: string;
    diff?: string;
    expected?: string;
    actual?: string;
};

declare interface FunctionMapping {
    name: string;
    decl: Range_2;
    loc: Range_2;
    line: number;
}

declare type GeneratedColumn = number;

declare type GetSourcemap = (sourcePath: string) => Promise<SourceMapInput | null>;

declare type GithubActionsReporterOptions = {
    /**
     * Whether to output `::error` annotations for failed tests.
     * @default true
     */ annotations?: boolean;
    /**
     * Whether to append a Markdown summary to `GITHUB_STEP_SUMMARY`.
     * @default true
     */ summary?: boolean;
};

declare interface HtmlOptions {
    verbose: boolean;
    skipEmpty: boolean;
    subdir: string;
    linkMapper: LinkMapper;
}

declare interface HtmlSpaOptions extends HtmlOptions {
    metricsToShow: Array<"lines" | "branches" | "functions" | "statements">;
}

declare type Indent = (arg0: string) => string;

/**
 * A list of glob patterns or files that match your test projects.
 *
 * eg. ['packages/*', 'examples/node/rstest.config.ts']
 */ /**
 * Inline project config must include a name.
 */ declare type InlineProjectConfig = ProjectConfig & {
    name: string;
};

declare type JsonOptions = FileOptions;

declare type JsonReporterOptions = {
    /**
     * Write report JSON to a file instead of stdout.
     */ outputPath?: string;
};

declare type JsonSummaryOptions = FileOptions;

declare interface LcovOnlyOptions extends FileOptions, ProjectOptions {}

declare interface LcovOptions extends FileOptions, ProjectOptions {}

declare interface LinkMapper {
    getPath(node: string | Node_2): string;
    relativePath(source: string | Node_2, target: string | Node_2): string;
    assetPath(node: Node_2, name: string): string;
}

declare type Location_2 = {
    line: number;
    column: number;
};

declare interface Location_3 {
    line: number;
    column: number;
}

declare type LooseRstestConfig = Omit<RstestUserConfig, 'reporters'> & {
    reporters?: any;
};

declare type MaybePromise<T> = T | Promise<T>;

declare type MdReporterOptions = {
    /**
     * Output detail level preset.
     * - `'normal'`: balanced output with code frames, repro commands, and candidate files
     * - `'compact'`: minimal output without code frames, candidate files, or full stack traces
     * - `'full'`: verbose output including console logs and environment info
     * @default 'normal'
     */ preset?: 'normal' | 'compact' | 'full';
    /**
     * Header section controls.
     * - `false`: omit all header extras (runtime/env)
     * - `true`: include all default header extras
     * - object form: toggle individual parts
     * @default { env: true }
     */ header?: boolean | {
        env?: boolean;
    };
    /**
     * Reproduction command controls.
     * - `false`: omit reproduction commands
     * - `'file'`: only include the test file path
     * - `'file+name'`: include both file path and `--testNamePattern`
     * - `true`: same as `'file+name'`
     * @default 'file+name'
     */ reproduction?: boolean | 'file' | 'file+name';
    /**
     * Test lists (Passed / Skipped / Todo) display mode.
     * - `'auto'`: show only when all tests pass and the run is focused
     * - `'always'`: always show regardless of test status or focus
     * @default 'auto'
     */ testLists?: 'auto' | 'always';
    /**
     * Failure output controls.
     * @default { max: 50 }
     */ failures?: {
        max?: number;
    };
    /**
     * Code frame controls.
     * - `false`: disable code frames
     * - `true`: enable with default line window
     * - object form: customize line window
     * @default { linesAbove: 2, linesBelow: 2 }
     */ codeFrame?: boolean | {
        linesAbove?: number;
        linesBelow?: number;
    };
    /**
     * Stack output controls.
     * - `false`: omit stack info
     * - `'top'`: include only the top frame
     * - `number`: include up to N stack frames
     * - `'full'`: include a large default number of stack frames
     * @default 'top'
     */ stack?: number | false | 'full' | 'top';
    /**
     * Candidate files controls (best-effort files extracted from stack traces).
     * - `false`: omit candidate files
     * - `true`: enable with defaults
     * - object form: customize max items
     * @default { max: 5 }
     */ candidateFiles?: boolean | {
        max?: number;
    };
    /**
     * Console output controls.
     * - `false`: omit console logs
     * - `true`: include console logs with defaults
     * - object form: customize limits
     * @default { maxLogsPerTestPath: 10, maxCharsPerEntry: 500 }
     */ console?: boolean | {
        maxLogsPerTestPath?: number;
        maxCharsPerEntry?: number;
    };
    /**
     * Error section controls.
     * @default { unhandled: true }
     */ errors?: boolean | {
        unhandled?: boolean;
    };
};

declare type NamesIndex = number;

declare interface NewPlugin {
    	serialize: (val: any, config: Config, indentation: string, depth: number, refs: Refs, printer: Printer) => string;
    	test: Test;
}

declare interface Node_2 {
    isRoot(): boolean;
    visit(visitor: Visitor, state: any): void;
}

declare interface OldPlugin {
    	print: (val: unknown, print: Print, indent: Indent, options: PluginOptions, colors: Colors) => string;
    	test: Test;
}

declare interface Options {
    logger: {
        outputStream: Writable;
        errorStream: Writable;
        getColumns: () => number;
    };
    interval?: number;
    getWindow: () => string[];
}

declare type OptionsReceived = PrettyFormatOptions;

declare interface ParsedStack {
    	method: string;
    	file: string;
    	line: number;
    	column: number;
}

declare type Plugin_2 = NewPlugin | OldPlugin;

declare interface PluginOptions {
    	edgeSpacing: string;
    	min: boolean;
    	spacing: string;
}

declare type Plugins = Array<Plugin_2>;

declare interface PrettyFormatOptions {
    	callToJSON?: boolean;
    	escapeRegex?: boolean;
    	escapeString?: boolean;
    	highlight?: boolean;
    	indent?: number;
    	maxDepth?: number;
    	maxWidth?: number;
    	min?: boolean;
    	printBasicPrototype?: boolean;
    	printFunctionName?: boolean;
    	compareKeys?: CompareKeys;
    	plugins?: Plugins;
}

declare type Print = (arg0: unknown) => string;

declare type Printer = (val: unknown, config: Config, indentation: string, depth: number, refs: Refs, hasCalledToJSON?: boolean) => string;

declare type ProjectConfig = Omit<RstestUserConfig, 'projects' | 'reporters' | 'pool' | 'isolate' | 'coverage' | 'resolveSnapshotPath' | 'onConsoleLog' | 'silent' | 'bail' | 'shard' | 'output'> & {
    output?: Omit<RstestOutputConfig, 'distPath'>;
};

declare interface ProjectOptions {
    projectRoot: string;
}

declare interface Range_2 {
    start: Location_3;
    end: Location_3;
}

declare type Refs = Array<unknown>;

declare class ReportBase {
    constructor(options?: Partial<ReportBaseOptions>);
    execute(context: Context): void;
}

declare interface ReportBaseOptions {
    summarizer: Summarizers;
}

export declare interface Reporter {
    /**
     * Set to `false` when the reporter does not write to process stdout/stderr.
     * @default true
     */ flushOutputStreams?: boolean;
    /**
     * Called before test file run.
     */ onTestFileStart?: (test: TestFileInfo) => void;
    /**
     * Called after tests in file collected.
     */ onTestFileReady?: (test: TestFileInfo) => void;
    /**
     * Called when the test file has finished running.
     */ onTestFileResult?: (test: TestFileResult_2) => void;
    /**
     * Called before running the test suite.
     */ onTestSuiteStart?: (test: TestSuiteInfo) => void;
    /**
     * Called when the suite has finished running or was just skipped.
     *
     * `result.errors` contains only suite hooks errors
     */ onTestSuiteResult?: (result: TestResult_2) => void;
    /**
     * Called when the test has finished running or was just skipped.
     */ onTestCaseResult?: (result: TestResult_2) => void;
    /**
     * Called before running the test case.
     */ onTestCaseStart?: (test: TestCaseInfo) => void;
    /**
     * Called before all tests start
     */ onTestRunStart?: () => MaybePromise<void>;
    /**
     * Called after all tests have finished running.
     */ onTestRunEnd?: ({ results, coverage, testResults, duration, getSourcemap, snapshotSummary, unhandledErrors }: {
        results: TestFileResult_2[];
        coverage?: CoverageMapData;
        testResults: TestResult_2[];
        duration: Duration;
        getSourcemap: GetSourcemap;
        unhandledErrors?: Error[];
        snapshotSummary: SnapshotSummary;
        filterRerunTestPaths?: string[];
    }) => MaybePromise<void>;
    /**
     * Called when console log is calling.
     */ onUserConsoleLog?: (log: UserConsoleLog) => void;
    /**
     * Called when rstest exit abnormally
     */ onExit?: () => void;
}

declare type ReporterWithOptions<Name extends BuiltInReporterNames = BuiltInReporterNames> = Name extends keyof BuiltinReporterOptions ? [Name, Partial<BuiltinReporterOptions[Name]>] : [Name, Record<string, unknown>];

declare interface ReportOptions {
    clover: CloverOptions;
    cobertura: CoberturaOptions;
    "html-spa": HtmlSpaOptions;
    html: HtmlOptions;
    json: JsonOptions;
    "json-summary": JsonSummaryOptions;
    lcov: LcovOptions;
    lcovonly: LcovOnlyOptions;
    none: never;
    teamcity: TeamcityOptions;
    text: TextOptions;
    "text-lcov": TextLcovOptions;
    "text-summary": TextSummaryOptions;
}

declare type ReportWithOptions<Name extends keyof ReportOptions = keyof ReportOptions> = Name extends keyof ReportOptions ? [Name, Partial<ReportOptions[Name]>] : [Name, Record<string, unknown>];

declare type Ro<T> = T extends Array<infer V> ? V[] | Readonly<V[]> | RoArray<V> | Readonly<RoArray<V>> : T extends object ? T | Readonly<T> | RoObject<T> | Readonly<RoObject<T>> : T;

declare type RoArray<T> = Ro<T>[];

declare type RoObject<T> = {
    [K in keyof T]: T[K] | Ro<T[K]>;
};

declare type RstestBuildCacheConfig = {
    /**
     * Directory used to store Rsbuild persistent cache files.
     *
     * When omitted, rstest stores cache files under
     * `node_modules/.cache/rstest-<project-name>`.
     */ cacheDirectory?: string;
    /**
     * Additional values that should invalidate the persistent cache when changed.
     *
     * rstest appends its own runtime digest automatically.
     */ cacheDigest?: Array<string | undefined>;
    /**
     * Additional files that should invalidate the persistent cache when changed.
     *
     * rstest automatically adds the active rstest config file, project config
     * files, and discovered tsconfig paths when available.
     */ buildDependencies?: string[];
};

declare type RstestOutputConfig = Pick<NonNullable<RsbuildConfig['output']>, 'cssModules' | 'emitAssets' | 'externals' | 'cleanDistPath' | 'module'> & {
    distPath?: string | {
        root?: string;
    };
    /**
     * Whether to bundle third-party dependencies from node_modules.
     * - `true`: Always bundle all third-party dependencies.
     * - `false`: Always externalize third-party dependencies.
     * - `['pkg']`: Bundle the package and all of its subpaths.
     * - `['pkg/subpath']`: Bundle a specific package subpath.
     * - `['pkg/*']`: Bundle package subpaths that match the pattern.
     * - `[/^pkg\\/subpath/]`: Bundle package requests matched by a regular
     *   expression.
     *
     * When unset, rstest bundles dependencies in browser-like test
     * environments (jsdom, happy-dom, etc.) and externalizes them in the node
     * environment. This option is not supported in browser mode.
     */ bundleDependencies?: boolean | BundleDependencyPattern[];
};

declare type RstestPerformanceConfig = {
    /**
     * Enable Rsbuild persistent build cache for test builds.
     *
     * When set to `true`, rstest uses a cache directory outside the temporary
     * output folder and appends rstest-specific invalidation inputs.
     *
     * @default false
     */ buildCache?: boolean | RstestBuildCacheConfig;
};

declare type RstestPoolOptions = {
    /** Pool used to run tests in. */ type?: RstestPoolType;
    /** Maximum number or percentage of workers to run tests in. */ maxWorkers?: number | string;
    /** Minimum number or percentage of workers to run tests in. */ minWorkers?: number | string;
    /** Pass additional arguments to node process in the child processes. */ execArgv?: string[];
};

declare type RstestPoolType = 'forks' | 'threads';

export declare interface RstestUserConfig {
    /**
     * Extend configuration from adapters
     */ extends?: ExtendConfigFn | ExtendConfig | (ExtendConfigFn | ExtendConfig)[];
    /**
     * Project root
     *
     * @default process.cwd()
     */ root?: string;
    /**
     * Run tests from one or more projects.
     */ projects?: TestProject[];
    /**
     * Project name
     *
     * @default rstest
     */ name?: string;
    /**
     * A list of glob patterns that match your test files.
     *
     * @default ['**\/*.{test,spec}.?(c|m)[jt]s?(x)']
     */ include?: string[];
    /**
     * A list of glob patterns that should be excluded from your test files.
     *
     * @default ['**\/node_modules/**', '**\/dist/**']
     */ exclude?: string[] | {
        patterns: string[];
        /**
         * override default exclude patterns
         * @default false
         */ override?: boolean;
    };
    /**
     * A list of glob patterns that match your in-source test files
     *
     * @default []
     */ includeSource?: string[];
    /**
     * A list of glob patterns that trigger running the whole test suite when
     * matched by changed files collected from `--changed`.
     *
     * @default ['**\/package.json/**', '**\/rstest.config.*']
     */ forceRerunTriggers?: string[];
    /**
     * Path to setup files. They will be run before each test file.
     */ setupFiles?: string[] | string;
    /**
     * Path to global setup files, relative to project root.
     * A global setup file can either export named functions `setup` and `teardown`
     * or a `default` function that returns a teardown function.
     */ globalSetup?: string[] | string;
    /**
     * Retry the test specific number of times if it fails.
     * @default 0
     */ retry?: number;
    /**
     * Pass when no tests are found.
     *
     * @default false
     */ passWithNoTests?: boolean;
    /**
     * Pool used to run tests in.
     */ pool?: RstestPoolType | RstestPoolOptions;
    /**
     * Run tests in an isolated environment
     *
     * @default true
     */ isolate?: boolean;
    /**
     * Provide global APIs
     *
     * @default false
     */ globals?: boolean;
    /**
     * The environment that will be used for testing
     *
     * @default 'node'
     */ testEnvironment?: EnvironmentName | EnvironmentWithOptions;
    /**
     * Stop running tests after n failures.
     * Set to 0 to run all tests regardless of failures.
     *
     * @default 0
     */ bail?: number;
    /**
     * Split tests into several shards.
     * This is useful for running tests in parallel on multiple machines.
     */ shard?: {
        count: number;
        index: number;
    };
    /**
     * print console traces when calling any console method.
     *
     * @default false
     */ printConsoleTrace?: boolean;
    /**
     * Disable console intercept enhancements. `onConsoleLog` & `printConsoleTrace`
     * configuration will not take effect. When `silent` is enabled, Rstest still
     * uses an internal console interception path to control test log output.
     *
     * @default false
     */ disableConsoleIntercept?: boolean;
    /**
     * Silence intercepted console output from tests.
     * - `true`: hide all intercepted test console logs
     * - `'passed-only'`: show intercepted logs only for failed tasks
     *
     * @default false
     */ silent?: boolean | 'passed-only';
    /**
     * Update snapshot files. Will update all changed snapshots and delete obsolete ones.
     *
     * @default false
     */ update?: boolean;
    /**
     * Custom reporter for output.
     * @default ['default']
     */ reporters?: Reporter | BuiltInReporterNames | (Reporter | BuiltInReporterNames | [BuiltInReporterNames] | ReporterWithOptions)[];
    /**
     * Hide skipped tests logs.
     *
     * @default false
     */ hideSkippedTests?: boolean;
    /**
     * Hide skipped test files logs.
     *
     * @default false
     */ hideSkippedTestFiles?: boolean;
    /**
     * Run only tests with a name that matches the regex.
     */ testNamePattern?: string | RegExp;
    /**
     * Timeout of a test in milliseconds.
     * @default 5000
     */ testTimeout?: number;
    /**
     * Timeout of hook in milliseconds.
     * @default 10000
     */ hookTimeout?: number;
    /**
     * Automatically clear mock calls, instances, contexts and results before every test.
     * @default false
     */ clearMocks?: boolean;
    /**
     * Automatically reset mock state before every test.
     * @default false
     */ resetMocks?: boolean;
    /**
     * Automatically restore mock state and implementation before every test.
     * @default false
     */ restoreMocks?: boolean;
    /**
     * The number of milliseconds after which a test or suite is considered slow and reported as such in the results.
     * @default 300
     */ slowTestThreshold?: number;
    /**
     * Detect async resources that are still active after a test file finishes.
     * This may slow down tests and should be used for debugging leaks.
     * @default false
     */ detectAsyncLeaks?: boolean;
    /**
     * Restores all global variables that were changed with `rstest.stubGlobal` before every test.
     * @default false
     */ unstubGlobals?: boolean;
    /**
     * Restores all runtime env values that were changed with `rstest.stubEnv` before every test.
     * @default false
     */ unstubEnvs?: boolean;
    /**
     * Maximum number of concurrent tests
     * @default 5
     */ maxConcurrency?: number;
    /**
     * Log heap usage after each test
     * @default false
     */ logHeapUsage?: boolean;
    /**
     * Custom handler for console log in tests.
     *
     * Return `false` to silence the log.
     *
     * @param content - The console output text.
     * @param type - Which stream the output came from.
     */ onConsoleLog?: (content: string, type: ConsoleStreamType) => boolean | void;
    /** Format snapshot output */ snapshotFormat?: SnapshotFormat;
    /**
     * Resolve custom snapshot path
     */ resolveSnapshotPath?: (testPath: string, snapExtension: string) => string;
    /**
     * Custom environment variables available on `process.env` during tests.
     */ env?: Partial<NodeJS.ProcessEnv>;
    /**
     * Browser mode configuration.
     */ browser?: BrowserModeConfig;
    /**
     * Coverage options
     */ coverage?: CoverageOptions;
    /**
     * Performance-related Rsbuild options used by rstest.
     */ performance?: RstestPerformanceConfig;
    /**
     * chai configuration options
     */ chaiConfig?: ChaiConfig;
    /**
     * Include `location` property in `TestInfo` received by reporters
     */ includeTaskLocation?: boolean;
    // Rsbuild configs
    plugins?: RsbuildConfig['plugins'];
    source?: Pick<NonNullable<RsbuildConfig['source']>, 'assetsInclude' | 'define' | 'tsconfigPath' | 'decorators' | 'include' | 'exclude' | 'transformImport' | 'assetsInclude'>;
    dev?: Pick<NonNullable<RsbuildConfig['dev']>, 'writeToDisk'>;
    output?: RstestOutputConfig;
    resolve?: RsbuildConfig['resolve'];
    tools?: Pick<NonNullable<RsbuildConfig['tools']>, 'rspack' | 'swc' | 'bundlerChain'>;
}

/**
 * Run Rstest in-process and return structured results.
 *
 * Resolves on every termination path — including config errors and worker
 * crashes — with `ok` reflecting overall success. The returned promise only
 * rejects for programmer errors (e.g. invalid argument types).
 *
 * @experimental Subject to change until 1.0.0.
 */ export declare function runRstest(options?: RunRstestOptions): Promise<TestRunResult>;

/**
 * Options for {@link runRstest}.
 *
 * @experimental Subject to change until 1.0.0.
 */ export declare interface RunRstestOptions {
    /** Working directory. Defaults to `process.cwd()`. */ cwd?: string;
    /**
     * Path to a config file. Unlike the CLI, the programmatic API does NOT
     * auto-discover a config file from `cwd` — pass an explicit path or omit
     * to run with `inlineConfig` only.
     */ config?: string;
    /**
     * Inline configuration. Shallow-merged with disk config (inline wins for
     * scalars; arrays follow `mergeRstestConfig` semantics — see `src/config.ts`).
     */ inlineConfig?: RstestUserConfig;
    /**
     * Exact test file paths to run. When provided, only matching paths
     * execute; other discovered entries are ignored.
     */ files?: string[];
    /**
     * Regex (or string-coerced regex) matched against test names. Equivalent
     * to the CLI's `-t, --testNamePattern` flag.
     */ testNamePattern?: RegExp | string;
}

/**
 * Cross-IPC-safe error shape. Returned in `TestRunResult.unhandledErrors` and
 * in per-test `errors`/`retryErrors`. Assertion-specific fields (`diff`,
 * `actual`, `expected`) are only set for `@vitest/expect`-style errors.
 *
 * @experimental Subject to change until 1.0.0.
 */ export declare interface SerializedError {
    name: string;
    message: string;
    stack?: string;
    diff?: string;
    actual?: string;
    expected?: string;
    cause?: SerializedError;
}

declare interface SnapshotEnvironment {
    	getVersion: () => string;
    	getHeader: () => string;
    	resolvePath: (filepath: string) => Promise<string>;
    	resolveRawPath: (testPath: string, rawPath: string) => Promise<string>;
    	saveSnapshotFile: (filepath: string, snapshot: string) => Promise<void>;
    	readSnapshotFile: (filepath: string) => Promise<string | null>;
    	removeSnapshotFile: (filepath: string) => Promise<void>;
    	processStackTrace?: (stack: ParsedStack) => ParsedStack;
}

declare type SnapshotFormat = Omit<NonNullable<SnapshotStateOptions['snapshotFormat']>, 'plugins' | 'compareKeys'>;

declare interface SnapshotResult {
    	filepath: string;
    	added: number;
    	fileDeleted: boolean;
    	matched: number;
    	unchecked: number;
    	uncheckedKeys: Array<string>;
    	unmatched: number;
    	updated: number;
}

declare interface SnapshotStateOptions {
    	updateSnapshot: SnapshotUpdateState;
    	snapshotEnvironment: SnapshotEnvironment;
    	expand?: boolean;
    	snapshotFormat?: OptionsReceived;
    	resolveSnapshotPath?: (path: string, extension: string, context?: any) => string;
}

declare interface SnapshotSummary {
    	added: number;
    	didUpdate: boolean;
    	failure: boolean;
    	filesAdded: number;
    	filesRemoved: number;
    	filesRemovedList: Array<string>;
    	filesUnmatched: number;
    	filesUpdated: number;
    	matched: number;
    	total: number;
    	unchecked: number;
    	uncheckedKeysByFile: Array<UncheckedSnapshot>;
    	unmatched: number;
    	updated: number;
}

declare type SnapshotUpdateState = "all" | "new" | "none";

declare type SourceColumn = number;

declare type SourceLine = number;

declare abstract class SourceMap {
    version: SourceMapV3['version'];
    file: SourceMapV3['file'];
    names: SourceMapV3['names'];
    sourceRoot: SourceMapV3['sourceRoot'];
    sources: SourceMapV3['sources'];
    sourcesContent: SourceMapV3['sourcesContent'];
    resolvedSources: SourceMapV3['sources'];
    ignoreList: SourceMapV3['ignoreList'];
}

declare type SourceMapInput = string | EncodedSourceMapXInput | DecodedSourceMapXInput | TraceMap;

declare type SourceMapSegment = [GeneratedColumn] | [GeneratedColumn, SourcesIndex, SourceLine, SourceColumn] | [GeneratedColumn, SourcesIndex, SourceLine, SourceColumn, NamesIndex];

declare interface SourceMapV3 {
    file?: string | null;
    names: string[];
    sourceRoot?: string;
    sources: (string | null)[];
    sourcesContent?: (string | null)[];
    version: 3;
    ignoreList?: number[];
}

declare type SourcesIndex = number;

declare type Summarizers = "flat" | "nested" | "pkg" | "defaultSummarizer";

/** Union type for all supported reporter types */ declare type SupportedReporter = keyof ReportOptions | ReportWithOptions | ReportBase | CustomReporter;

declare interface TeamcityOptions extends FileOptions {
    blockName: string;
}

declare type Test = (arg0: any) => boolean;

declare type TestCaseInfo = {
    testId: string;
    testPath: TestPath;
    name: string;
    timeout?: number;
    parentNames?: string[];
    project: string;
    startTime?: number;
    /** Only included when `includeTaskLocation` config is enabled */ location?: Location_2;
    type: 'case';
    runMode: TestRunMode;
};

declare type TestFileInfo = {
    testId: string;
    testPath: TestPath;
    tests: TestInfo[];
};

/**
 * Public per-file result. Extends {@link TestResult} with the per-case
 * breakdown.
 *
 * @experimental Subject to change until 1.0.0.
 */ export declare interface TestFileResult extends TestResult {
    /** Flattened list of test cases discovered in this file. */ results: TestResult[];
}

declare type TestFileResult_2 = TestResult_2 & {
    results: TestResult_2[];
    snapshotResult?: SnapshotResult;
    coverage?: Record<string, FileCoverageData>;
    /**
     * Perfetto-compatible trace events. Stripped at the pool boundary.
     *
     * @internal
     */ traceEvents?: TraceEvent[];
};

declare type TestInfo = TestCaseInfo | (TestSuiteInfo & {
    tests: TestInfo[];
});

/** The test file original path */ declare type TestPath = string;

declare type TestProject = string | InlineProjectConfig;

/**
 * Public per-test result. Intentionally a curated subset of the internal
 * reporter type so refactors of internal reporter state do not break this
 * surface.
 *
 * @experimental Subject to change until 1.0.0.
 */ export declare interface TestResult {
    /** Final state of the test case. */ status: TestResultStatus;
    /** Test case name (no parent suite names included). */ name: string;
    /** Absolute path to the test file. */ testPath: string;
    /** Names of parent `describe` blocks, outermost first. */ parentNames?: string[];
    /** Wall-clock duration in ms; absent for skipped/todo tests. */ duration?: number;
    /** Errors from the final attempt. */ errors?: SerializedError[];
    /** Errors from previous failed attempts when `retry` is configured. */ retryErrors?: SerializedError[];
    /** Number of retries performed (0 when the first attempt passed). */ retryCount?: number;
    /** Project name from `projects` config; default project is `'default'`. */ project: string;
}

declare type TestResult_2 = {
    testId: string;
    status: TestResultStatus;
    name: string;
    testPath: TestPath;
    parentNames?: string[];
    duration?: number;
    errors?: FormattedError[];
    retryErrors?: FormattedError[];
    retryCount?: number;
    project: string;
    heap?: number;
};

export declare type TestResultStatus = 'skip' | 'pass' | 'fail' | 'todo';

declare type TestRunMode = 'run' | 'skip' | 'todo' | 'only';

/**
 * Result of a {@link runRstest} call.
 *
 * @experimental Subject to change until 1.0.0.
 */ export declare interface TestRunResult {
    /** `stats.tests.failed === 0 && stats.files.failed === 0 && unhandledErrors.length === 0`. */ ok: boolean;
    /** Per-file aggregate results. */ files: TestFileResult[];
    /** Pre-computed counts. Add optional fields under `stats.*` in minor releases. */ stats: {
        tests: {
            total: number;
            passed: number;
            failed: number;
            skipped: number;
            todo: number;
        };
        files: {
            total: number;
            failed: number;
        };
    };
    /** Errors not attributable to a single test (worker crash, config load). */ unhandledErrors: SerializedError[];
    /** Wall-clock duration in ms. Sub-phase fields may be added under `duration.*`. */ duration: {
        total: number;
    };
    /** Snapshot summary. Absent only when the run aborted before any test executed (e.g. config load error). */ snapshot?: SnapshotSummary;
    /** Coverage data. Only present when `coverage.enabled` in the resolved config. */ coverage?: CoverageMapData;
}

declare type TestSuiteInfo = {
    testId: string;
    name: string;
    parentNames?: string[];
    testPath: TestPath;
    project: string;
    type: 'suite';
    /** Only included when `includeTaskLocation` config is enabled */ location?: Location_2;
    runMode: TestRunMode;
};

declare type TextLcovOptions = ProjectOptions;

declare interface TextOptions extends FileOptions {
    maxCols: number;
    skipEmpty: boolean;
    skipFull: boolean;
}

declare type TextSummaryOptions = FileOptions;

/** check thresholds for matched files */ declare type ThresholdGlobRecord = Record<string, CoverageThreshold & {
    /**
     * check thresholds per file
     * @default false
     */ perFile?: boolean;
}>;

declare interface Totals {
    total: number;
    covered: number;
    skipped: number;
    pct: number;
}

/**
 * Perfetto/Chrome trace event (subset). Emitted by the worker-side
 * `PhaseTracker` and consumed by the controller below.
 *
 * `ph`:
 * - `'X'`: complete (sliced) event with `dur` — drawn as a slice
 * - `'M'`: metadata (process/thread name, sort index)
 * - `'C'`: counter — `args` numeric values are plotted as tracks
 */ declare type TraceEvent = {
    name: string;
    cat: string;
    ph: 'X' | 'M' | 'C';
    ts: number;
    dur?: number;
    pid: number;
    tid: number;
    args?: Record<string, string | number | boolean | undefined>;
};

declare class TraceMap implements SourceMap {
    version: SourceMapV3['version'];
    file: SourceMapV3['file'];
    names: SourceMapV3['names'];
    sourceRoot: SourceMapV3['sourceRoot'];
    sources: SourceMapV3['sources'];
    sourcesContent: SourceMapV3['sourcesContent'];
    ignoreList: SourceMapV3['ignoreList'];
    resolvedSources: string[];
    private _encoded;
    private _decoded;
    private _decodedMemo;
    private _bySources;
    private _bySourceMemos;
    constructor(map: Ro<SourceMapInput>, mapUrl?: string | null);
}

declare interface Tree<N extends Node_2 = Node_2> {
    getRoot(): N;
    visit(visitor: Partial<Visitor<N>>, state: any): void;
}

declare interface UncheckedSnapshot {
    	filePath: string;
    	keys: Array<string>;
}

declare interface UserConsoleLog {
    content: string;
    name: string;
    taskId?: string;
    taskName?: string;
    taskParentNames?: string[];
    taskType?: 'file' | 'suite' | 'case';
    trace?: string;
    testPath: TestPath;
    type: ConsoleStreamType;
}

declare type VerboseReporterOptions = Omit<DefaultReporterOptions, 'summary'>;

declare interface Visitor<N extends Node_2 = Node_2> {
    onStart(root: N, state: any): void;
    onSummary(root: N, state: any): void;
    onDetail(root: N, state: any): void;
    onSummaryEnd(root: N, state: any): void;
    onEnd(root: N, state: any): void;
}

declare type Watermark = [number, number];

declare interface Watermarks {
    statements: Watermark;
    functions: Watermark;
    branches: Watermark;
    lines: Watermark;
}

declare type XInput = {
    x_google_ignoreList?: SourceMapV3['ignoreList'];
};

declare interface XmlWriter {
    indent(str: string): string;
    /**
     * writes the opening XML tag with the supplied attributes
     */
    openTag(name: string, attrs?: any): void;
    /**
     * closes an open XML tag.
     */
    closeTag(name: string): void;
    /**
     * writes a tag and its value opening and closing it at the same time
     */
    inlineTag(name: string, attrs?: any, content?: string): void;
    /**
     * closes all open tags and ends the document
     */
    closeAll(): void;
}

export { }
