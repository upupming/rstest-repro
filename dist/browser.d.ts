import type { config } from 'chai';
import { createColors } from 'picocolors';
import { Logger } from 'rslog';
import * as rsbuild from '@rsbuild/core';
import type { RsbuildConfig } from '@rsbuild/core';
import type { RsbuildPlugin } from '@rsbuild/core';
import type { Writable } from 'node:stream';

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare function addSerializer(plugin: Plugin_2): void;

declare type AfterAllListener = (ctx: SuiteContext) => MaybePromise<void>;

declare type AfterEachListener = (ctx: TestContext) => MaybePromise<void>;

declare interface Assertion<T = any> extends VitestAssertion<Chai.Assertion, T>, JestAssertion<T>, Matchers<T> {
    	/**
     	* Ensures a value is of a specific type.
     	*
     	* @example
     	* expect(value).toBeTypeOf('string');
     	* expect(number).toBeTypeOf('number');
     	*/
    	toBeTypeOf: (expected: "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined") => void;
    	/**
     	* Asserts that a mock function was called exactly once.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenCalledOnce();
     	*/
    	toHaveBeenCalledOnce: () => void;
    	/**
     	* Ensure that a mock function is called with specific arguments and called
     	* exactly once.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenCalledExactlyOnceWith('arg1', 42);
     	*/
    	toHaveBeenCalledExactlyOnceWith: <E extends any[]>(...args: E) => void;
    	/**
     	* This assertion checks if a `Mock` was called before another `Mock`.
     	* @param mock - A mock function created by `vi.spyOn` or `vi.fn`
     	* @param failIfNoFirstInvocation - Fail if the first mock was never called
     	* @example
     	* const mock1 = vi.fn()
     	* const mock2 = vi.fn()
     	*
     	* mock1()
     	* mock2()
     	* mock1()
     	*
     	* expect(mock1).toHaveBeenCalledBefore(mock2)
     	*/
    	toHaveBeenCalledBefore: (mock: MockInstance, failIfNoFirstInvocation?: boolean) => void;
    	/**
     	* This assertion checks if a `Mock` was called after another `Mock`.
     	* @param mock - A mock function created by `vi.spyOn` or `vi.fn`
     	* @param failIfNoFirstInvocation - Fail if the first mock was never called
     	* @example
     	* const mock1 = vi.fn()
     	* const mock2 = vi.fn()
     	*
     	* mock2()
     	* mock1()
     	* mock2()
     	*
     	* expect(mock1).toHaveBeenCalledAfter(mock2)
     	*/
    	toHaveBeenCalledAfter: (mock: MockInstance, failIfNoFirstInvocation?: boolean) => void;
    	/**
     	* Checks that a promise resolves successfully at least once.
     	*
     	* @example
     	* await expect(promise).toHaveResolved();
     	*/
    	toHaveResolved: () => void;
    	/**
     	* Checks that a promise resolves to a specific value.
     	*
     	* @example
     	* await expect(promise).toHaveResolvedWith('success');
     	*/
    	toHaveResolvedWith: <E>(value: E) => void;
    	/**
     	* Ensures a promise resolves a specific number of times.
     	*
     	* @example
     	* expect(mockAsyncFunc).toHaveResolvedTimes(3);
     	*/
    	toHaveResolvedTimes: (times: number) => void;
    	/**
     	* Asserts that the last resolved value of a promise matches an expected value.
     	*
     	* @example
     	* await expect(mockAsyncFunc).toHaveLastResolvedWith('finalResult');
     	*/
    	toHaveLastResolvedWith: <E>(value: E) => void;
    	/**
     	* Ensures a specific value was returned by a promise on the nth resolution.
     	*
     	* @example
     	* await expect(mockAsyncFunc).toHaveNthResolvedWith(2, 'secondResult');
     	*/
    	toHaveNthResolvedWith: <E>(nthCall: number, value: E) => void;
    	/**
     	* Verifies that a promise resolves.
     	*
     	* @example
     	* await expect(someAsyncFunc).resolves.toBe(42);
     	*/
    	resolves: PromisifyAssertion<T>;
    	/**
     	* Verifies that a promise rejects.
     	*
     	* @example
     	* await expect(someAsyncFunc).rejects.toThrow('error');
     	*/
    	rejects: PromisifyAssertion<T>;
}

declare interface Assertion_2<T = any> extends Assertion<T> {
    // Snapshots are extended in @vitest/snapshot and are not part of @vitest/expect
    matchSnapshot: SnapshotMatcher<T>;
    toMatchSnapshot: SnapshotMatcher<T>;
    toMatchInlineSnapshot: InlineSnapshotMatcher<T>;
    /**
     * Checks that an error thrown by a function matches a previously recorded snapshot.
     *
     * @param message - Optional custom error message.
     *
     * @example
     * expect(functionWithError).toThrowErrorMatchingSnapshot();
     */ toThrowErrorMatchingSnapshot: (message?: string) => void;
    /**
     * Checks that an error thrown by a function matches an inline snapshot within the test file.
     * Useful for keeping snapshots close to the test code.
     *
     * @param snapshot - Optional inline snapshot string to match.
     * @param message - Optional custom error message.
     *
     * @example
     * const throwError = () => { throw new Error('Error occurred') };
     * expect(throwError).toThrowErrorMatchingInlineSnapshot(`"Error occurred"`);
     */ toThrowErrorMatchingInlineSnapshot: (snapshot?: string, message?: string) => void;
    /**
     * Compares the received value to a snapshot saved in a specified file.
     * Useful for cases where snapshot content is large or needs to be shared across tests.
     *
     * @param filepath - Path to the snapshot file.
     * @param message - Optional custom error message.
     *
     * @example
     * await expect(largeData).toMatchFileSnapshot('path/to/snapshot.json');
     */ toMatchFileSnapshot: (filepath: string, message?: string) => Promise<void>;
    /**
     * Verifies that a promise resolves.
     *
     * @example
     * await expect(someAsyncFunc).resolves.toBe(42);
     */ resolves: PromisifyAssertion_2<T>;
    /**
     * Verifies that a promise rejects.
     *
     * @example
     * await expect(someAsyncFunc).rejects.toThrow('error');
     */ rejects: PromisifyAssertion_2<T>;
}

declare interface AssertOptions {
    	received: unknown;
    	filepath: string;
    	name: string;
    	/**
     	* Not required but needed for `SnapshotClient.clearTest` to implement test-retry behavior.
     	* @default name
     	*/
    	testId?: string;
    	message?: string;
    	isInline?: boolean;
    	properties?: object;
    	inlineSnapshot?: string;
    	error?: Error;
    	errorMessage?: string;
    	rawSnapshot?: RawSnapshotInfo;
}

declare abstract class AsymmetricMatcher<
	T,
	State extends MatcherState = MatcherState
> implements AsymmetricMatcherInterface {
    	protected sample: T;
    	protected inverse: boolean;
    	// should have "jest" to be compatible with its ecosystem
    	$$typeof: symbol;
    	constructor(sample: T, inverse?: boolean);
    	protected getMatcherContext(expect?: Chai.ExpectStatic): State;
    	abstract asymmetricMatch(other: unknown): boolean;
    	abstract toString(): string;
    	getExpectedType?(): string;
    	toAsymmetricMatcher?(): string;
}

declare interface AsymmetricMatcherInterface {
    	asymmetricMatch: (other: unknown) => boolean;
    	toString: () => string;
    	getExpectedType?: () => string;
    	toAsymmetricMatcher?: () => string;
}

declare interface AsymmetricMatchersContaining extends CustomMatcher {
    	/**
     	* Matches if the received string contains the expected substring.
     	*
     	* @example
     	* expect('I have an apple').toEqual(expect.stringContaining('apple'));
     	* expect({ a: 'test string' }).toEqual({ a: expect.stringContaining('test') });
     	*/
    	stringContaining: (expected: string) => any;
    	/**
     	* Matches if the received object contains all properties of the expected object.
     	*
     	* @example
     	* expect({ a: '1', b: 2 }).toEqual(expect.objectContaining({ a: '1' }))
     	*/
    	objectContaining: <T = any>(expected: DeeplyAllowMatchers<T>) => any;
    	/**
     	* Matches if the received array contains all elements in the expected array.
     	*
     	* @example
     	* expect(['a', 'b', 'c']).toEqual(expect.arrayContaining(['b', 'a']));
     	*/
    	arrayContaining: <T = unknown>(expected: Array<DeeplyAllowMatchers<T>>) => any;
    	/**
     	* Matches if the received string or regex matches the expected pattern.
     	*
     	* @example
     	* expect('hello world').toEqual(expect.stringMatching(/^hello/));
     	* expect('hello world').toEqual(expect.stringMatching('hello'));
     	*/
    	stringMatching: (expected: string | RegExp) => any;
    	/**
     	* Matches if the received number is within a certain precision of the expected number.
     	*
     	* @param precision - Optional decimal precision for comparison. Default is 2.
     	*
     	* @example
     	* expect(10.45).toEqual(expect.closeTo(10.5, 1));
     	* expect(5.11).toEqual(expect.closeTo(5.12)); // with default precision
     	*/
    	closeTo: (expected: number, precision?: number) => any;
}

declare type AsyncExpectationResult = Promise<SyncExpectationResult>;

declare type BeforeAllListener = (ctx: SuiteContext) => MaybePromise<void | AfterAllListener>;

declare type BeforeEachListener = (ctx: TestContext) => MaybePromise<void | AfterEachListener>;

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
export declare const BROWSER_PROVIDERS: readonly ['playwright'];

/**
 * Core-owned contract for the `@rstest/browser/internal` host module.
 *
 * This is the single source of truth for the core↔browser load boundary:
 * `loadBrowserModule` returns it, and `@rstest/browser`'s public entry
 * constrains its exports against it via `satisfies`. The `context` is typed
 * as {@link RstestContext} (not `unknown`) so drift between the two sides —
 * such as a dropped `options` argument — surfaces as a type error.
 */ export declare interface BrowserHostModule {
    validateBrowserConfig: (context: RstestContext) => void;
    runBrowserTests: (context: RstestContext, options?: BrowserTestRunOptions) => Promise<BrowserTestRunResult | void>;
    listBrowserTests: (context: RstestContext, options?: Pick<BrowserTestRunOptions, 'shardedEntries'>) => Promise<{
        list: ListCommandResult[];
        close: () => Promise<void>;
    }>;
}

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

export declare type BrowserProvider = (typeof BROWSER_PROVIDERS)[number];

declare interface BrowserSourcemapResolutionResult {
    handled: boolean;
    sourcemap: SourceMapInput | null;
}

/**
 * Options for running browser tests.
 */ export declare interface BrowserTestRunOptions {
    /**
     * If true, browser mode will not call onTestRunEnd reporter hook.
     * This allows the caller to unify reporter output with node mode tests.
     */ skipOnTestRunEnd?: boolean;
    /**
     * Pre-calculated sharded entries for browser projects.
     * If provided, the browser controller will use these instead of collecting its own.
     * Key is project environmentName.
     */ shardedEntries?: Map<string, {
        entries: Record<string, string>;
    }>;
    /**
     * Keep watch infrastructure alive even when the initial browser test set is empty.
     */ allowEmptyWatchRun?: boolean;
    /**
     * When set, the browser host emits Perfetto trace events to this callback
     * (per-file `tests` slices + suite/case slices). Only invoked when the
     * caller has `--trace` enabled.
     */ onTraceEvents?: (events: TraceEvent[]) => void;
}

/**
 * Result from running browser tests.
 */ export declare interface BrowserTestRunResult {
    /** Test file results */ results: TestFileResult[];
    /** Individual test case results */ testResults: TestResult[];
    /** Duration information */ duration: {
        totalTime: number;
        buildTime: number;
        testTime: number;
    };
    /** Whether the test run had failures */ hasFailure: boolean;
    /** Errors that occurred before/outside test execution (e.g., browser launch failure) */ unhandledErrors?: Error[];
    /** Source map resolver used when reporter output is unified in core */ getSourcemap?: GetSourcemap;
    /** Route-aware source map resolver used by core unified reporter flow */ resolveSourcemap?: ResolveBrowserSourcemap;
    /** Deferred cleanup hook for unified reporter mode */ close?: () => Promise<void>;
}

export declare type BrowserViewport = {
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
 * Create a picocolors instance using default runtime detection.
 */
export declare const color: ReturnType<typeof createColors>;

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

declare interface Constructable {
    	new (...args: any[]): any;
}

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

declare class CounterMap<K> extends DefaultMap<K, number> {
    	constructor();
    	// compat for jest-image-snapshot https://github.com/vitest-dev/vitest/issues/7322
    	// `valueOf` and `Snapshot.added` setter allows
    	//   snapshotState.added = snapshotState.added + 1
    	// to function as
    	//   snapshotState.added.total_ = snapshotState.added.total() + 1
    	_total: number | undefined;
    	valueOf(): number;
    	increment(key: K): void;
    	total(): number;
}

declare interface Coverage {
    covered: number;
    total: number;
    coverage: number;
}

declare class CoverageMap {
    constructor(data: CoverageMapData | CoverageMap);
    addFileCoverage(pathOrObject: string | FileCoverage | FileCoverageData): void;
    files(): string[];
    fileCoverageFor(filename: string): FileCoverage;
    filter(callback: (key: string) => boolean): void;
    getCoverageSummary(): CoverageSummary;
    merge(data: CoverageMapData | CoverageMap): void;
    toJSON(): CoverageMapData;
    data: CoverageMapData;
}

export declare interface CoverageMapData {
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

declare class CoverageProvider {
    constructor(options: NormalizedCoverageOptions, root?: string);
    /**
     * Initialize coverage collection
     */ init(): void | Promise<void>;
    /**
     * Collect coverage data from global coverage object
     */ collect(options?: {
        assetFiles?: Record<string, string>;
        sourceMaps?: Record<string, string>;
        outputModule?: boolean;
    }): CoverageMap | null | Promise<CoverageMap | null>;
    /**
     * Create a new coverage map
     */ createCoverageMap(): CoverageMap;
    /**
     * Generate coverage for untested files
     */ generateCoverageForUntestedFiles(params: {
        environmentName: string;
        files: string[];
    }): Promise<FileCoverageData[]>;
    /**
     * Generate coverage reports.
     *
     * Reporters and output directory come from the normalized options the
     * provider received at construction — there is no per-call override, so a
     * provider cannot silently ignore a second argument that drifts away from the
     * constructor config.
     */ generateReports(coverageMap: CoverageMap): Promise<void>;
    /**
     * Clean up coverage data
     */ cleanup(): void;
}

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

export declare function createCoverageProvider(options: NormalizedCoverageOptions, root: string): Promise<CoverageProvider | null>;

declare type CurrentTaskInfo = Pick<UserConsoleLog, 'taskId' | 'taskName' | 'taskParentNames' | 'taskType' | 'testPath'>;

declare interface CustomMatcher {
    	/**
     	* Checks that a value satisfies a custom matcher function.
     	*
     	* @param matcher - A function returning a boolean based on the custom condition
     	* @param message - Optional custom error message on failure
     	*
     	* @example
     	* expect(age).toSatisfy(val => val >= 18, 'Age must be at least 18');
     	* expect(age).toEqual(expect.toSatisfy(val => val >= 18, 'Age must be at least 18'));
     	*/
    	toSatisfy: (matcher: (value: any) => boolean, message?: string) => any;
    	/**
     	* Matches if the received value is one of the values in the expected array.
     	*
     	* @example
     	* expect(1).toBeOneOf([1, 2, 3])
     	* expect('foo').toBeOneOf([expect.any(String)])
     	* expect({ a: 1 }).toEqual({ a: expect.toBeOneOf(['1', '2', '3']) })
     	*/
    	toBeOneOf: <T>(sample: Array<T>) => any;
}

/** Custom reporter configuration for non-istanbul reporters */ declare type CustomReporter = string | [string, Record<string, unknown>];

declare interface DecodedSourceMap extends SourceMapV3 {
    mappings: SourceMapSegment[][];
}

declare type DecodedSourceMapXInput = DecodedSourceMap & XInput;

declare type DeeplyAllowMatchers<T> = T extends Array<infer Element> ? WithAsymmetricMatcher<T> | DeeplyAllowMatchers<Element>[] : T extends object ? WithAsymmetricMatcher<T> | { [K in keyof T] : DeeplyAllowMatchers<T[K]> } : WithAsymmetricMatcher<T>;

/** Default per-test timeout (ms). Single source for the config default and any
 * downstream fallback. */
export declare const DEFAULT_TEST_TIMEOUT = 5_000;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare class DefaultMap<
	K,
	V
> extends Map<K, V> {
    	private defaultFn;
    	constructor(defaultFn: (key: K) => V, entries?: Iterable<readonly [K, V]>);
    	get(key: K): V;
}

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

declare type DescribeAPI = DescribeFn & {
    each: DescribeEachFn;
    for: DescribeForFn;
    only: DescribeAPI;
    skip: DescribeAPI;
    runIf: (condition: boolean) => DescribeAPI;
    skipIf: (condition: boolean) => DescribeAPI;
    todo: DescribeAPI;
    concurrent: DescribeAPI;
    sequential: DescribeAPI;
};

declare interface DescribeEachFn {
    <T extends Record<string, unknown>>(cases: readonly T[]) : (description: string, fn?: (param: T) => MaybePromise<void>) => void;
    <T extends readonly [unknown, ...unknown[]]>(cases: readonly T[]) : (description: string, fn: (...args: [...T]) => MaybePromise<void>) => void;
    <T>(cases: readonly T[]) : (description: string, fn: (param: T) => MaybePromise<void>) => void;
    <T extends Record<string, unknown>>(strings: TemplateStringsArray, ...expressions: unknown[]) : (description: string, fn?: (param: T) => MaybePromise<void>) => void;
}

declare type DescribeFn = (description: string, fn?: () => void) => void;

declare interface DescribeForFn {
    <T>(cases: readonly T[]) : (description: string, fn?: (param: T) => MaybePromise<void>) => void;
    <T extends Record<string, unknown>>(strings: TemplateStringsArray, ...expressions: unknown[]) : (description: string, fn?: (param: T) => MaybePromise<void>) => void;
}

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
 */ export declare type DevicePreset = 'iPhoneSE' | 'iPhoneXR' | 'iPhone12Pro' | 'iPhone14ProMax' | 'Pixel7' | 'SamsungGalaxyS8Plus' | 'SamsungGalaxyS20Ultra' | 'iPadMini' | 'iPadAir' | 'iPadPro' | 'SurfacePro7' | 'SurfaceDuo' | 'GalaxyZFold5' | 'AsusZenbookFold' | 'SamsungGalaxyA51A71' | 'NestHub' | 'NestHubMax';

/**
 * @param a Expected value
 * @param b Received value
 * @param options Diff options
 * @returns {string | null} a string diff
 */
declare function diff(a: any, b: any, options?: DiffOptions): string | undefined;

declare interface DiffOptions {
    	aAnnotation?: string;
    	aColor?: DiffOptionsColor;
    	aIndicator?: string;
    	bAnnotation?: string;
    	bColor?: DiffOptionsColor;
    	bIndicator?: string;
    	changeColor?: DiffOptionsColor;
    	changeLineTrailingSpaceColor?: DiffOptionsColor;
    	commonColor?: DiffOptionsColor;
    	commonIndicator?: string;
    	commonLineTrailingSpaceColor?: DiffOptionsColor;
    	contextLines?: number;
    	emptyFirstOrLastLinePlaceholder?: string;
    	expand?: boolean;
    	includeChangeCounts?: boolean;
    	omitAnnotationLines?: boolean;
    	patchColor?: DiffOptionsColor;
    	printBasicPrototype?: boolean;
    	maxDepth?: number;
    	compareKeys?: CompareKeys;
    	truncateThreshold?: number;
    	truncateAnnotation?: string;
    	truncateAnnotationColor?: DiffOptionsColor;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare type DiffOptionsColor = (arg: string) => string;

/** The test file output path */ declare type DistPath = string;

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

declare type ExpectationResult = SyncExpectationResult | AsyncExpectationResult;

declare interface ExpectPollOptions {
    /**
     * @default 50
     */ interval?: number;
    /**
     * @default 1000
     */ timeout?: number;
    message?: string;
}

declare interface ExpectStatic extends ExpectStatic_2 {
    <T>(actual: T, message?: string) : Assertion_2<T>;
    unreachable: (message?: string) => never;
    soft: <T>(actual: T, message?: string) => Assertion_2<T>;
    poll: <T>(actual: () => T, options?: ExpectPollOptions) => Omit<PromisifyAssertion_2<Awaited<T>>, 'rejects' | 'resolves' | 'toThrow' | 'toThrowError' | 'throw' | 'throws' | 'matchSnapshot' | 'toMatchSnapshot' | 'toMatchInlineSnapshot' | 'toThrowErrorMatchingSnapshot' | 'toThrowErrorMatchingInlineSnapshot'>;
    addEqualityTesters: (testers: Tester[]) => void;
    assertions: (expected: number) => void;
    hasAssertions: () => void;
    addSnapshotSerializer: typeof addSerializer;
    getState: () => MatcherState_2;
    setState: (state: Partial<MatcherState_2>) => void;
}

declare interface ExpectStatic_2 extends Chai.ExpectStatic, Matchers, AsymmetricMatchersContaining {
    	<T>(actual: T, message?: string): Assertion<T>;
    	extend: (expects: MatchersObject) => void;
    	anything: () => any;
    	any: (constructor: unknown) => any;
    	getState: () => MatcherState;
    	setState: (state: Partial<MatcherState>) => void;
    	not: AsymmetricMatchersContaining;
}

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

declare type FileFilterMode = 'fuzzy' | 'exact';

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

declare type Fixture<T, K extends keyof T, ExtraContext = object> = ((...args: any) => any) extends T[K] ? T[K] extends any ? FixtureFn<T, K, Omit<ExtraContext, Exclude<keyof T, K>>> : never : T[K] | (T[K] extends any ? FixtureFn<T, K, Omit<ExtraContext, Exclude<keyof T, K>>> : never);

declare type FixtureFn<T, K extends keyof T, ExtraContext> = (context: Omit<T, K> & ExtraContext, use: Use<T[K]>) => Promise<void>;

declare interface FixtureOptions {
    /**
     * Whether to automatically set up current fixture, even though it's not being used in tests.
     */ auto?: boolean;
}

declare type Fixtures<T extends Record<string, any> = object, ExtraContext = object> = {
    [K in keyof T]: Fixture<T, K, ExtraContext & TestContext> | [Fixture<T, K, ExtraContext & TestContext>, FixtureOptions?];
};

export declare type FormattedError = {
    fullStack?: boolean;
    message: string;
    name?: string;
    stack?: string;
    diff?: string;
    expected?: string;
    actual?: string;
};

declare interface Formatter {
    (input?: unknown): string;
    open: string;
    close: string;
}

declare interface FunctionMapping {
    name: string;
    decl: Range_2;
    loc: Range_2;
    line: number;
}

declare type GeneratedColumn = number;

declare function getMatcherUtils(): {
    	EXPECTED_COLOR: Formatter
    	RECEIVED_COLOR: Formatter
    	INVERTED_COLOR: Formatter
    	BOLD_WEIGHT: Formatter
    	DIM_COLOR: Formatter
    	diff: typeof diff
    	matcherHint: typeof matcherHint
    	printReceived: typeof printReceived
    	printExpected: typeof printExpected
    	printDiffOrStringify: typeof printDiffOrStringify
    	printWithType: typeof printWithType
};

export declare const getNoTestFilesMessage: ({ context, code, defaultMessage }: {
    context: RelatedRunContext;
    code: number;
    defaultMessage: string;
}) => string;

export declare const getNumCpus: () => number;

export declare const getSetupFiles: (setups: string[], rootPath: string) => Record<string, string>;

declare type GetSourcemap = (sourcePath: string) => Promise<SourceMapInput | null>;

export declare const getTestEntries: ({ include, exclude, rootPath, projectRoot, fileFilters, fileFilterMode, includeSource }: {
    rootPath: string;
    include: string[];
    exclude: string[];
    includeSource: string[];
    fileFilters: string[];
    fileFilterMode?: FileFilterMode;
    projectRoot: string;
}) => Promise<Record<string, string>>;

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

declare interface InlineSnapshotMatcher<T> {
    <U extends {
        [P in keyof T]: any;
    }>(properties: Partial<U>, snapshot?: string, message?: string) : void;
    (message?: string) : void;
}

export declare const isDebug: () => boolean;

/**
 * Check if running in a TTY context
 */
export declare const isTTY: (type?: 'stdin' | 'stdout') => boolean;

declare interface JestAssertion<T = any> extends jest.Matchers<void, T>, CustomMatcher {
    	/**
     	* Used when you want to check that two objects have the same value.
     	* This matcher recursively checks the equality of all fields, rather than checking for object identity.
     	*
     	* @example
     	* expect(user).toEqual({ name: 'Alice', age: 30 });
     	*/
    	toEqual: <E>(expected: E) => void;
    	/**
     	* Use to test that objects have the same types as well as structure.
     	*
     	* @example
     	* expect(user).toStrictEqual({ name: 'Alice', age: 30 });
     	*/
    	toStrictEqual: <E>(expected: E) => void;
    	/**
     	* Checks that a value is what you expect. It calls `Object.is` to compare values.
     	* Don't use `toBe` with floating-point numbers.
     	*
     	* @example
     	* expect(result).toBe(42);
     	* expect(status).toBe(true);
     	*/
    	toBe: <E>(expected: E) => void;
    	/**
     	* Check that a string matches a regular expression.
     	*
     	* @example
     	* expect(message).toMatch(/hello/);
     	* expect(greeting).toMatch('world');
     	*/
    	toMatch: (expected: string | RegExp) => void;
    	/**
     	* Used to check that a JavaScript object matches a subset of the properties of an object
     	*
     	* @example
     	* expect(user).toMatchObject({
     	*   name: 'Alice',
     	*   address: { city: 'Wonderland' }
     	* });
     	*/
    	toMatchObject: <E extends object | any[]>(expected: E) => void;
    	/**
     	* Used when you want to check that an item is in a list.
     	* For testing the items in the list, this uses `===`, a strict equality check.
     	*
     	* @example
     	* expect(items).toContain('apple');
     	* expect(numbers).toContain(5);
     	*/
    	toContain: <E>(item: E) => void;
    	/**
     	* Used when you want to check that an item is in a list.
     	* For testing the items in the list, this matcher recursively checks the
     	* equality of all fields, rather than checking for object identity.
     	*
     	* @example
     	* expect(items).toContainEqual({ name: 'apple', quantity: 1 });
     	*/
    	toContainEqual: <E>(item: E) => void;
    	/**
     	* Use when you don't care what a value is, you just want to ensure a value
     	* is true in a boolean context. In JavaScript, there are six falsy values:
     	* `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.
     	*
     	* @example
     	* expect(user.isActive).toBeTruthy();
     	*/
    	toBeTruthy: () => void;
    	/**
     	* When you don't care what a value is, you just want to
     	* ensure a value is false in a boolean context.
     	*
     	* @example
     	* expect(user.isActive).toBeFalsy();
     	*/
    	toBeFalsy: () => void;
    	/**
     	* For comparing floating point numbers.
     	*
     	* @example
     	* expect(score).toBeGreaterThan(10);
     	*/
    	toBeGreaterThan: (num: number | bigint) => void;
    	/**
     	* For comparing floating point numbers.
     	*
     	* @example
     	* expect(score).toBeGreaterThanOrEqual(10);
     	*/
    	toBeGreaterThanOrEqual: (num: number | bigint) => void;
    	/**
     	* For comparing floating point numbers.
     	*
     	* @example
     	* expect(score).toBeLessThan(10);
     	*/
    	toBeLessThan: (num: number | bigint) => void;
    	/**
     	* For comparing floating point numbers.
     	*
     	* @example
     	* expect(score).toBeLessThanOrEqual(10);
     	*/
    	toBeLessThanOrEqual: (num: number | bigint) => void;
    	/**
     	* Used to check that a variable is NaN.
     	*
     	* @example
     	* expect(value).toBeNaN();
     	*/
    	toBeNaN: () => void;
    	/**
     	* Used to check that a variable is undefined.
     	*
     	* @example
     	* expect(value).toBeUndefined();
     	*/
    	toBeUndefined: () => void;
    	/**
     	* This is the same as `.toBe(null)` but the error messages are a bit nicer.
     	* So use `.toBeNull()` when you want to check that something is null.
     	*
     	* @example
     	* expect(value).toBeNull();
     	*/
    	toBeNull: () => void;
    	/**
     	* Ensure that a variable is not undefined.
     	*
     	* @example
     	* expect(value).toBeDefined();
     	*/
    	toBeDefined: () => void;
    	/**
     	* Ensure that an object is an instance of a class.
     	* This matcher uses `instanceof` underneath.
     	*
     	* @example
     	* expect(new Date()).toBeInstanceOf(Date);
     	*/
    	toBeInstanceOf: <E>(expected: E) => void;
    	/**
     	* Used to check that an object has a `.length` property
     	* and it is set to a certain numeric value.
     	*
     	* @example
     	* expect([1, 2, 3]).toHaveLength(3);
     	* expect('hello').toHaveLength(5);
     	*/
    	toHaveLength: (length: number) => void;
    	/**
     	* Use to check if a property at the specified path exists on an object.
     	* For checking deeply nested properties, you may use dot notation or an array containing
     	* the path segments for deep references.
     	*
     	* Optionally, you can provide a value to check if it matches the value present at the path
     	* on the target object. This matcher uses 'deep equality' (like `toEqual()`) and recursively checks
     	* the equality of all fields.
     	*
     	* @example
     	* expect(user).toHaveProperty('address.city', 'New York');
     	* expect(config).toHaveProperty(['settings', 'theme'], 'dark');
     	*/
    	toHaveProperty: <E>(property: string | (string | number)[], value?: E) => void;
    	/**
     	* Using exact equality with floating point numbers is a bad idea.
     	* Rounding means that intuitive things fail.
     	* The default for `precision` is 2.
     	*
     	* @example
     	* expect(price).toBeCloseTo(9.99, 2);
     	*/
    	toBeCloseTo: (number: number, numDigits?: number) => void;
    	/**
     	* Ensures that a mock function is called an exact number of times.
     	*
     	* Also under the alias `expect.toBeCalledTimes`.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenCalledTimes(2);
     	*/
    	toHaveBeenCalledTimes: (times: number) => void;
    	/**
     	* Ensures that a mock function is called an exact number of times.
     	*
     	* Alias for `expect.toHaveBeenCalledTimes`.
     	*
     	* @example
     	* expect(mockFunc).toBeCalledTimes(2);
     	*/
    	toBeCalledTimes: (times: number) => void;
    	/**
     	* Ensures that a mock function is called.
     	*
     	* Also under the alias `expect.toBeCalled`.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenCalled();
     	*/
    	toHaveBeenCalled: () => void;
    	/**
     	* Ensures that a mock function is called.
     	*
     	* Alias for `expect.toHaveBeenCalled`.
     	*
     	* @example
     	* expect(mockFunc).toBeCalled();
     	*/
    	toBeCalled: () => void;
    	/**
     	* Ensure that a mock function is called with specific arguments.
     	*
     	* Also under the alias `expect.toBeCalledWith`.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenCalledWith('arg1', 42);
     	*/
    	toHaveBeenCalledWith: <E extends any[]>(...args: E) => void;
    	/**
     	* Ensure that a mock function is called with specific arguments.
     	*
     	* Alias for `expect.toHaveBeenCalledWith`.
     	*
     	* @example
     	* expect(mockFunc).toBeCalledWith('arg1', 42);
     	*/
    	toBeCalledWith: <E extends any[]>(...args: E) => void;
    	/**
     	* Ensure that a mock function is called with specific arguments on an Nth call.
     	*
     	* Also under the alias `expect.nthCalledWith`.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenNthCalledWith(2, 'secondArg');
     	*/
    	toHaveBeenNthCalledWith: <E extends any[]>(n: number, ...args: E) => void;
    	/**
     	* Ensure that a mock function is called with specific arguments on an Nth call.
     	*
     	* Alias for `expect.toHaveBeenNthCalledWith`.
     	*
     	* @example
     	* expect(mockFunc).nthCalledWith(2, 'secondArg');
     	*/
    	nthCalledWith: <E extends any[]>(nthCall: number, ...args: E) => void;
    	/**
     	* If you have a mock function, you can use `.toHaveBeenLastCalledWith`
     	* to test what arguments it was last called with.
     	*
     	* Also under the alias `expect.lastCalledWith`.
     	*
     	* @example
     	* expect(mockFunc).toHaveBeenLastCalledWith('lastArg');
     	*/
    	toHaveBeenLastCalledWith: <E extends any[]>(...args: E) => void;
    	/**
     	* If you have a mock function, you can use `.lastCalledWith`
     	* to test what arguments it was last called with.
     	*
     	* Alias for `expect.toHaveBeenLastCalledWith`.
     	*
     	* @example
     	* expect(mockFunc).lastCalledWith('lastArg');
     	*/
    	lastCalledWith: <E extends any[]>(...args: E) => void;
    	/**
     	* Used to test that a function throws when it is called.
     	*
     	* Also under the alias `expect.toThrowError`.
     	*
     	* @example
     	* expect(() => functionWithError()).toThrow('Error message');
     	* expect(() => parseJSON('invalid')).toThrow(SyntaxError);
     	*/
    	toThrow: (expected?: string | Constructable | RegExp | Error) => void;
    	/**
     	* Used to test that a function throws when it is called.
     	*
     	* Alias for `expect.toThrow`.
     	*
     	* @example
     	* expect(() => functionWithError()).toThrowError('Error message');
     	* expect(() => parseJSON('invalid')).toThrowError(SyntaxError);
     	*/
    	toThrowError: (expected?: string | Constructable | RegExp | Error) => void;
    	/**
     	* Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
     	*
     	* Alias for `expect.toHaveReturned`.
     	*
     	* @example
     	* expect(mockFunc).toReturn();
     	*/
    	toReturn: () => void;
    	/**
     	* Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
     	*
     	* Also under the alias `expect.toReturn`.
     	*
     	* @example
     	* expect(mockFunc).toHaveReturned();
     	*/
    	toHaveReturned: () => void;
    	/**
     	* Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
     	* Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
     	*
     	* Alias for `expect.toHaveReturnedTimes`.
     	*
     	* @example
     	* expect(mockFunc).toReturnTimes(3);
     	*/
    	toReturnTimes: (times: number) => void;
    	/**
     	* Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
     	* Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
     	*
     	* Also under the alias `expect.toReturnTimes`.
     	*
     	* @example
     	* expect(mockFunc).toHaveReturnedTimes(3);
     	*/
    	toHaveReturnedTimes: (times: number) => void;
    	/**
     	* Use to ensure that a mock function returned a specific value.
     	*
     	* Alias for `expect.toHaveReturnedWith`.
     	*
     	* @example
     	* expect(mockFunc).toReturnWith('returnValue');
     	*/
    	toReturnWith: <E>(value: E) => void;
    	/**
     	* Use to ensure that a mock function returned a specific value.
     	*
     	* Also under the alias `expect.toReturnWith`.
     	*
     	* @example
     	* expect(mockFunc).toHaveReturnedWith('returnValue');
     	*/
    	toHaveReturnedWith: <E>(value: E) => void;
    	/**
     	* Use to test the specific value that a mock function last returned.
     	* If the last call to the mock function threw an error, then this matcher will fail
     	* no matter what value you provided as the expected return value.
     	*
     	* Also under the alias `expect.lastReturnedWith`.
     	*
     	* @example
     	* expect(mockFunc).toHaveLastReturnedWith('lastValue');
     	*/
    	toHaveLastReturnedWith: <E>(value: E) => void;
    	/**
     	* Use to test the specific value that a mock function last returned.
     	* If the last call to the mock function threw an error, then this matcher will fail
     	* no matter what value you provided as the expected return value.
     	*
     	* Alias for `expect.toHaveLastReturnedWith`.
     	*
     	* @example
     	* expect(mockFunc).lastReturnedWith('lastValue');
     	*/
    	lastReturnedWith: <E>(value: E) => void;
    	/**
     	* Use to test the specific value that a mock function returned for the nth call.
     	* If the nth call to the mock function threw an error, then this matcher will fail
     	* no matter what value you provided as the expected return value.
     	*
     	* Also under the alias `expect.nthReturnedWith`.
     	*
     	* @example
     	* expect(mockFunc).toHaveNthReturnedWith(2, 'nthValue');
     	*/
    	toHaveNthReturnedWith: <E>(nthCall: number, value: E) => void;
    	/**
     	* Use to test the specific value that a mock function returned for the nth call.
     	* If the nth call to the mock function threw an error, then this matcher will fail
     	* no matter what value you provided as the expected return value.
     	*
     	* Alias for `expect.toHaveNthReturnedWith`.
     	*
     	* @example
     	* expect(mockFunc).nthReturnedWith(2, 'nthValue');
     	*/
    	nthReturnedWith: <E>(nthCall: number, value: E) => void;
}

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

export declare type ListCommandResult = {
    tests: TestInfo[];
    testPath: string;
    project: string;
    errors?: FormattedError[];
};

export declare const loadCoverageProvider: (options: CoverageOptions, root: string) => Promise<{
    CoverageProvider: typeof CoverageProvider;
    pluginCoverage: (options: CoverageOptions) => RsbuildPlugin;
}>;

declare type Location_2 = {
    line: number;
    column: number;
};

declare interface Location_3 {
    line: number;
    column: number;
}

export declare const logger: Logger & {
    stderr: (message: string, ...args: any[]) => void;
};

declare type LooseRstestConfig = Omit<RstestConfig, 'reporters'> & {
    reporters?: any;
};

declare function matcherHint(matcherName: string, received?: string, expected?: string, options?: MatcherHintOptions): string;

declare interface MatcherHintOptions {
    	comment?: string;
    	expectedColor?: Formatter;
    	isDirectExpectCall?: boolean;
    	isNot?: boolean;
    	promise?: string;
    	receivedColor?: Formatter;
    	secondArgument?: string;
    	secondArgumentColor?: Formatter;
}

declare interface Matchers<T = any> {}

declare type MatchersObject<T extends MatcherState = MatcherState> = Record<string, RawMatcherFn<T>> & ThisType<T> & { [K in keyof Matchers<T>]? : RawMatcherFn<T, Parameters<Matchers<T>[K]>> };

declare interface MatcherState {
    	customTesters: Array<Tester>;
    	assertionCalls: number;
    	currentTestName?: string;
    	dontThrow?: () => void;
    	error?: Error;
    	equals: (a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean) => boolean;
    	expand?: boolean;
    	expectedAssertionsNumber?: number | null;
    	expectedAssertionsNumberErrorGen?: (() => Error) | null;
    	isExpectingAssertions?: boolean;
    	isExpectingAssertionsError?: Error | null;
    	isNot: boolean;
    	// environment: VitestEnvironment
    	promise: string;
    	// snapshotState: SnapshotState
    	suppressedErrors: Array<Error>;
    	testPath?: string;
    	utils: ReturnType<typeof getMatcherUtils> & {
        		diff: typeof diff
        		stringify: typeof stringify
        		iterableEquality: Tester
        		subsetEquality: Tester
        	};
    	soft?: boolean;
    	poll?: boolean;
}

declare interface MatcherState_2 extends MatcherState {
    environment: string;
    snapshotState: SnapshotState;
}

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

declare interface MockContext<T extends Procedure> {
    	/**
     	* This is an array containing all arguments for each call. One item of the array is the arguments of that call.
     	*
     	* @see https://vitest.dev/api/mock#mock-calls
     	* @example
     	* const fn = vi.fn()
     	*
     	* fn('arg1', 'arg2')
     	* fn('arg3')
     	*
     	* fn.mock.calls === [
     	*   ['arg1', 'arg2'], // first call
     	*   ['arg3'], // second call
     	* ]
     	*/
    	calls: Parameters<T>[];
    	/**
     	* This is an array containing all instances that were instantiated when mock was called with a `new` keyword. Note that this is an actual context (`this`) of the function, not a return value.
     	* @see https://vitest.dev/api/mock#mock-instances
     	*/
    	instances: ReturnType<T>[];
    	/**
     	* An array of `this` values that were used during each call to the mock function.
     	* @see https://vitest.dev/api/mock#mock-contexts
     	*/
    	contexts: ThisParameterType<T>[];
    	/**
     	* The order of mock's execution. This returns an array of numbers which are shared between all defined mocks.
     	*
     	* @see https://vitest.dev/api/mock#mock-invocationcallorder
     	* @example
     	* const fn1 = vi.fn()
     	* const fn2 = vi.fn()
     	*
     	* fn1()
     	* fn2()
     	* fn1()
     	*
     	* fn1.mock.invocationCallOrder === [1, 3]
     	* fn2.mock.invocationCallOrder === [2]
     	*/
    	invocationCallOrder: number[];
    	/**
     	* This is an array containing all values that were `returned` from the function.
     	*
     	* The `value` property contains the returned value or thrown error. If the function returned a `Promise`, then `result` will always be `'return'` even if the promise was rejected.
     	*
     	* @see https://vitest.dev/api/mock#mock-results
     	* @example
     	* const fn = vi.fn()
     	*   .mockReturnValueOnce('result')
     	*   .mockImplementationOnce(() => { throw new Error('thrown error') })
     	*
     	* const result = fn()
     	*
     	* try {
     	*   fn()
     	* }
     	* catch {}
     	*
     	* fn.mock.results === [
     	*   {
     	*     type: 'return',
     	*     value: 'result',
     	*   },
     	*   {
     	*     type: 'throw',
     	*     value: Error,
     	*   },
     	* ]
     	*/
    	results: MockResult<ReturnType<T>>[];
    	/**
     	* An array containing all values that were `resolved` or `rejected` from the function.
     	*
     	* This array will be empty if the function was never resolved or rejected.
     	*
     	* @see https://vitest.dev/api/mock#mock-settledresults
     	* @example
     	* const fn = vi.fn().mockResolvedValueOnce('result')
     	*
     	* const result = fn()
     	*
     	* fn.mock.settledResults === []
     	* fn.mock.results === [
     	*   {
     	*     type: 'return',
     	*     value: Promise<'result'>,
     	*   },
     	* ]
     	*
     	* await result
     	*
     	* fn.mock.settledResults === [
     	*   {
     	*     type: 'fulfilled',
     	*     value: 'result',
     	*   },
     	* ]
     	*/
    	settledResults: MockSettledResult<Awaited<ReturnType<T>>>[];
    	/**
     	* This contains the arguments of the last call. If spy wasn't called, will return `undefined`.
     	* @see https://vitest.dev/api/mock#mock-lastcall
     	*/
    	lastCall: Parameters<T> | undefined;
}

declare interface MockInstance<T extends Procedure = Procedure> extends Disposable {
    	/**
     	* Use it to return the name assigned to the mock with the `.mockName(name)` method. By default, it will return `vi.fn()`.
     	* @see https://vitest.dev/api/mock#getmockname
     	*/
    	getMockName(): string;
    	/**
     	* Sets the internal mock name. This is useful for identifying the mock when an assertion fails.
     	* @see https://vitest.dev/api/mock#mockname
     	*/
    	mockName(name: string): this;
    	/**
     	* Current context of the mock. It stores information about all invocation calls, instances, and results.
     	*/
    	mock: MockContext<T>;
    	/**
     	* Clears all information about every call. After calling it, all properties on `.mock` will return to their initial state. This method does not reset implementations. It is useful for cleaning up mocks between different assertions.
     	*
     	* To automatically call this method before each test, enable the [`clearMocks`](https://vitest.dev/config/#clearmocks) setting in the configuration.
     	* @see https://vitest.dev/api/mock#mockclear
     	*/
    	mockClear(): this;
    	/**
     	* Does what `mockClear` does and resets inner implementation to the original function. This also resets all "once" implementations.
     	*
     	* Note that resetting a mock from `vi.fn()` will set implementation to an empty function that returns `undefined`.
     	* Resetting a mock from `vi.fn(impl)` will set implementation to `impl`. It is useful for completely resetting a mock to its default state.
     	*
     	* To automatically call this method before each test, enable the [`mockReset`](https://vitest.dev/config/#mockreset) setting in the configuration.
     	* @see https://vitest.dev/api/mock#mockreset
     	*/
    	mockReset(): this;
    	/**
     	* Does what `mockReset` does and restores original descriptors of spied-on objects.
     	*
     	* Note that restoring mock from `vi.fn()` will set implementation to an empty function that returns `undefined`. Restoring a `vi.fn(impl)` will restore implementation to `impl`.
     	* @see https://vitest.dev/api/mock#mockrestore
     	*/
    	mockRestore(): void;
    	/**
     	* Returns current permanent mock implementation if there is one.
     	*
     	* If mock was created with `vi.fn`, it will consider passed down method as a mock implementation.
     	*
     	* If mock was created with `vi.spyOn`, it will return `undefined` unless a custom implementation was provided.
     	*/
    	getMockImplementation(): NormalizedProcedure<T> | undefined;
    	/**
     	* Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function.
     	* @see https://vitest.dev/api/mock#mockimplementation
     	* @example
     	* const increment = vi.fn().mockImplementation(count => count + 1);
     	* expect(increment(3)).toBe(4);
     	*/
    	mockImplementation(fn: NormalizedProcedure<T>): this;
    	/**
     	* Accepts a function to be used as the mock implementation. TypeScript expects the arguments and return type to match those of the original function. This method can be chained to produce different results for multiple function calls.
     	*
     	* When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called.
     	* @see https://vitest.dev/api/mock#mockimplementationonce
     	* @example
     	* const fn = vi.fn(count => count).mockImplementationOnce(count => count + 1);
     	* expect(fn(3)).toBe(4);
     	* expect(fn(3)).toBe(3);
     	*/
    	mockImplementationOnce(fn: NormalizedProcedure<T>): this;
    	/**
     	* Overrides the original mock implementation temporarily while the callback is being executed.
     	*
     	* Note that this method takes precedence over the [`mockImplementationOnce`](https://vitest.dev/api/mock#mockimplementationonce).
     	* @see https://vitest.dev/api/mock#withimplementation
     	* @example
     	* const myMockFn = vi.fn(() => 'original')
     	*
     	* myMockFn.withImplementation(() => 'temp', () => {
     	*   myMockFn() // 'temp'
     	* })
     	*
     	* myMockFn() // 'original'
     	*/
    	withImplementation<T2>(fn: NormalizedProcedure<T>, cb: () => T2): T2 extends Promise<unknown> ? Promise<this> : this;
    	/**
     	* Use this if you need to return the `this` context from the method without invoking the actual implementation.
     	* @see https://vitest.dev/api/mock#mockreturnthis
     	*/
    	mockReturnThis(): this;
    	/**
     	* Accepts a value that will be returned whenever the mock function is called. TypeScript will only accept values that match the return type of the original function.
     	* @see https://vitest.dev/api/mock#mockreturnvalue
     	* @example
     	* const mock = vi.fn()
     	* mock.mockReturnValue(42)
     	* mock() // 42
     	* mock.mockReturnValue(43)
     	* mock() // 43
     	*/
    	mockReturnValue(value: ReturnType<T>): this;
    	/**
     	* Accepts a value that will be returned whenever the mock function is called. TypeScript will only accept values that match the return type of the original function.
     	*
     	* When the mocked function runs out of implementations, it will invoke the default implementation set with `vi.fn(() => defaultValue)` or `.mockImplementation(() => defaultValue)` if they were called.
     	* @example
     	* const myMockFn = vi
     	*   .fn()
     	*   .mockReturnValue('default')
     	*   .mockReturnValueOnce('first call')
     	*   .mockReturnValueOnce('second call')
     	*
     	* // 'first call', 'second call', 'default'
     	* console.log(myMockFn(), myMockFn(), myMockFn())
     	*/
    	mockReturnValueOnce(value: ReturnType<T>): this;
    	/**
     	* Accepts a value that will be resolved when the async function is called. TypeScript will only accept values that match the return type of the original function.
     	* @example
     	* const asyncMock = vi.fn().mockResolvedValue(42)
     	* asyncMock() // Promise<42>
     	*/
    	mockResolvedValue(value: Awaited<ReturnType<T>>): this;
    	/**
     	* Accepts a value that will be resolved during the next function call. TypeScript will only accept values that match the return type of the original function. If chained, each consecutive call will resolve the specified value.
     	* @example
     	* const myMockFn = vi
     	*   .fn()
     	*   .mockResolvedValue('default')
     	*   .mockResolvedValueOnce('first call')
     	*   .mockResolvedValueOnce('second call')
     	*
     	* // Promise<'first call'>, Promise<'second call'>, Promise<'default'>
     	* console.log(myMockFn(), myMockFn(), myMockFn())
     	*/
    	mockResolvedValueOnce(value: Awaited<ReturnType<T>>): this;
    	/**
     	* Accepts an error that will be rejected when async function is called.
     	* @example
     	* const asyncMock = vi.fn().mockRejectedValue(new Error('Async error'))
     	* await asyncMock() // throws Error<'Async error'>
     	*/
    	mockRejectedValue(error: unknown): this;
    	/**
     	* Accepts a value that will be rejected during the next function call. If chained, each consecutive call will reject the specified value.
     	* @example
     	* const asyncMock = vi
     	*   .fn()
     	*   .mockResolvedValueOnce('first call')
     	*   .mockRejectedValueOnce(new Error('Async error'))
     	*
     	* await asyncMock() // first call
     	* await asyncMock() // throws Error<'Async error'>
     	*/
    	mockRejectedValueOnce(error: unknown): this;
}

declare type MockResult<T> = MockResultReturn<T> | MockResultThrow | MockResultIncomplete;

declare interface MockResultIncomplete {
    	type: "incomplete";
    	value: undefined;
}

declare interface MockResultReturn<T> {
    	type: "return";
    	/**
     	* The value that was returned from the function. If function returned a Promise, then this will be a resolved value.
     	*/
    	value: T;
}

declare interface MockResultThrow {
    	type: "throw";
    	/**
     	* An error that was thrown during function execution.
     	*/
    	value: any;
}

declare type MockSettledResult<T> = MockSettledResultFulfilled<T> | MockSettledResultRejected;

declare interface MockSettledResultFulfilled<T> {
    	type: "fulfilled";
    	value: T;
}

declare interface MockSettledResultRejected {
    	type: "rejected";
    	value: any;
}

declare type NamesIndex = number;

declare interface NewPlugin {
    	serialize: (val: any, config: Config, indentation: string, depth: number, refs: Refs, printer: Printer) => string;
    	test: Test_2;
}

declare interface Node_2 {
    isRoot(): boolean;
    visit(visitor: Visitor, state: any): void;
}

declare type NormalizedBrowserModeConfig = {
    enabled: boolean;
    provider: BrowserProvider;
    browser: BrowserName;
    headless: boolean;
    port?: number;
    strictPort: boolean;
    viewport?: BrowserViewport;
    providerOptions: Record<string, unknown>;
};

declare type NormalizedConfig = Required<Omit<RstestConfig, OptionalKeys | 'pool' | 'projects' | 'coverage' | 'setupFiles' | 'globalSetup' | 'exclude' | 'testEnvironment' | 'browser' | 'output'>> & Partial<Pick<RstestConfig, OptionalKeys>> & {
    pool: RstestPoolOptions;
    testEnvironment: EnvironmentWithOptions;
    coverage: NormalizedCoverageOptions;
    browser: NormalizedBrowserModeConfig;
    setupFiles: string[];
    globalSetup: string[];
    exclude: {
        patterns: string[];
        override?: boolean;
    };
    output: NormalizedOutputConfig;
};

declare type NormalizedCoverageOptions = Required<Omit<CoverageOptions, 'thresholds' | 'include' | 'changed'>> & {
    thresholds?: CoverageThresholds;
    include?: string[];
    changed?: boolean | string;
};

declare type NormalizedFixture = {
    isFn: boolean;
    deps?: string[];
    value: FixtureFn<any, any, any> | any;
    options?: FixtureOptions;
};

declare type NormalizedFixtures = Record<string, NormalizedFixture>;

declare type NormalizedOutputConfig = Partial<Omit<RstestOutputConfig, 'distPath'>> & {
    distPath: {
        root: string;
    };
};

declare type NormalizedProcedure<T extends Procedure> = (...args: Parameters<T>) => ReturnType<T>;

declare type NormalizedProjectConfig = Required<Omit<NormalizedConfig, OptionalKeys | 'projects' | 'reporters' | 'pool' | 'setupFiles' | 'globalSetup' | 'output'>> & Pick<NormalizedConfig, OptionalKeys> & {
    setupFiles: string[];
    globalSetup: string[];
    output?: Omit<NormalizedOutputConfig, 'distPath'>;
};

declare interface OldPlugin {
    	print: (val: unknown, print: Print, indent: Indent, options: PluginOptions, colors: Colors) => string;
    	test: Test_2;
}

declare type OnTestFailedHandler = (ctx: TestContext) => MaybePromise<void>;

declare type OnTestFinishedHandler = (ctx: TestContext) => MaybePromise<void>;

declare type OptionalKeys = 'testNamePattern' | 'plugins' | 'performance' | 'source' | 'resolve' | 'tools' | 'dev' | 'onConsoleLog' | 'silent' | 'chaiConfig' | 'hideSkippedTestFiles' | 'resolveSnapshotPath' | 'extends' | 'shard';

declare interface Options {
    logger: {
        outputStream: Writable;
        errorStream: Writable;
        getColumns: () => number;
    };
    interval?: number;
    getWindow: () => string[];
}

declare type Options_2 = {
    cwd: string;
    command: RstestCommand;
    fileFilters?: string[];
    fileFilterMode?: FileFilterMode;
    configFilePath?: string;
    projects: Project[];
    trace?: boolean;
    /** See the `embedded` option on `createRstest`. */ embedded?: boolean;
};

declare type OptionsReceived = PrettyFormatOptions;

declare interface ParsedStack {
    	method: string;
    	file: string;
    	line: number;
    	column: number;
}

export declare const parseWorkers: (maxWorkers: string | number, numCpus?: number) => number;

declare type PhaseName = 'prepare' | 'envSetup' | 'load' | 'setupFiles' | 'collect' | 'tests' | 'coverage' | 'teardown';

/**
 * Records phase transitions for a single test file as Perfetto-compatible
 * trace events. Used only when the `--trace` CLI flag is enabled; with trace
 * disabled the tracker is a no-op.
 *
 * Emitted events:
 * - per-phase `ph: 'X'` spans (`cat: 'phase'`)
 * - per-suite / per-case `ph: 'X'` spans (`cat: 'suite' | 'case'`), recorded
 *   via the runner's existing lifecycle hooks (zero intrusion into runner.ts)
 * - heap-usage counter samples (`ph: 'C'`, `cat: 'memory'`) at each phase
 *   boundary, so memory pressure shows up as a track in Perfetto UI
 *
 * Events default to `pid = process.pid` (callers may override via
 * `options.pid` — browser host uses a synthetic per-file pid). Each tracker
 * (i.e. each test file) gets its own `tid`, so when a worker is reused
 * across multiple files (`isolate: false`) each file shows up as its own
 * thread track in Perfetto instead of collapsing to the first file's label.
 * The host later merges every worker's events into a single trace JSON file.
 */ export declare class PhaseTracker {
    private currentPhase;
    private currentStart;
    private readonly trace;
    private readonly pid;
    private readonly tid;
    constructor(options?: PhaseTrackerOptions);
    transition(phase: PhaseName): void;
    end(): void;
    recordSuiteStart(info: TestSuiteInfo): void;
    recordSuiteResult(result: TestResult): void;
    recordCaseStart(info: TestCaseInfo): void;
    recordCaseResult(result: TestResult): void;
    getTraceEvents(): TraceEvent[] | undefined;
    private pushSlice;
    private sampleHeap;
}

declare type PhaseTrackerOptions = {
    /** When set, the tracker also records a Perfetto trace event per phase span. */ trace?: {
        testPath: string;
        project: string;
    };
    /**
     * Override the Perfetto `pid` recorded on emitted events. Defaults to
     * `process.pid`. Browser mode uses this to give each test file its own
     * synthetic process, so Perfetto labels every track with the file path
     * (mirroring node mode's per-file isolation) instead of collapsing every
     * file under the shared host pid.
     */ pid?: number;
};

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

declare function printDiffOrStringify(received: unknown, expected: unknown, options?: DiffOptions): string | undefined;

declare type Printer = (val: unknown, config: Config, indentation: string, depth: number, refs: Refs, hasCalledToJSON?: boolean) => string;

declare function printExpected(value: unknown): string;

declare function printReceived(object: unknown): string;

declare function printWithType<T>(name: string, value: T, print: (value: T) => string): string;

declare type Procedure = (...args: any[]) => any;

declare type Project = {
    config: RstestConfig;
    configFilePath?: string;
};

declare type ProjectConfig = Omit<RstestConfig, 'projects' | 'reporters' | 'pool' | 'isolate' | 'coverage' | 'resolveSnapshotPath' | 'onConsoleLog' | 'silent' | 'bail' | 'shard' | 'output'> & {
    output?: Omit<RstestOutputConfig, 'distPath'>;
};

export declare type ProjectContext = {
    name: string;
    environmentName: string;
    /** The root path of current project. */ rootPath: string;
    /** Whether to output es module. */ outputModule: boolean;
    configFilePath?: string;
    normalizedConfig: NormalizedProjectConfig;
    _globalSetups: boolean;
};

declare interface ProjectOptions {
    projectRoot: string;
}

declare type Promisify<O> = { [K in keyof O] : O[K] extends (...args: infer A) => infer R ? Promisify<O[K]> & ((...args: A) => Promise<R>) : O[K] };

declare type Promisify_2<O> = {
    [K in keyof O]: O[K] extends (...args: infer A) => infer R ? Promisify_2<O[K]> & ((...args: A) => Promise<R>) : O[K];
};

declare type PromisifyAssertion<T> = Promisify<Assertion<T>>;

declare type PromisifyAssertion_2<T> = Promisify_2<Assertion_2<T>>;

declare interface Range_2 {
    start: Location_3;
    end: Location_3;
}

declare interface RawMatcherFn<
	T extends MatcherState = MatcherState,
	E extends Array<any> = Array<any>
> {
    	(this: T, received: any, ...expected: E): ExpectationResult;
}

declare interface RawSnapshotInfo {
    	file: string;
    	readonly?: boolean;
    	content?: string;
}

declare type Refs = Array<unknown>;

declare type RelatedRunContext = Pick<RstestContext, 'relatedFilters' | 'relatedMode' | 'relatedResolutionEmpty' | 'relatedRerunFiles'>;

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
     */ onTestFileResult?: (test: TestFileResult) => void;
    /**
     * Called before running the test suite.
     */ onTestSuiteStart?: (test: TestSuiteInfo) => void;
    /**
     * Called when the suite has finished running or was just skipped.
     *
     * `result.errors` contains only suite hooks errors
     */ onTestSuiteResult?: (result: TestResult) => void;
    /**
     * Called when the test has finished running or was just skipped.
     */ onTestCaseResult?: (result: TestResult) => void;
    /**
     * Called before running the test case.
     */ onTestCaseStart?: (test: TestCaseInfo) => void;
    /**
     * Called before all tests start
     */ onTestRunStart?: () => MaybePromise<void>;
    /**
     * Called after all tests have finished running.
     */ onTestRunEnd?: ({ results, coverage, testResults, duration, getSourcemap, snapshotSummary, unhandledErrors }: {
        results: TestFileResult[];
        coverage?: CoverageMapData;
        testResults: TestResult[];
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

declare type ResolveBrowserSourcemap = (sourcePath: string) => Promise<BrowserSourcemapResolutionResult>;

export declare const resolveProjectBuildCache: ({ context, project }: {
    context: Pick<RstestContext, 'rootPath' | 'configFilePath' | 'command' | 'normalizedConfig' | 'projects'>;
    project: Pick<ProjectContext, 'environmentName' | 'configFilePath' | 'normalizedConfig'>;
}) => false | RstestBuildCacheConfig;

declare type Ro<T> = T extends Array<infer V> ? V[] | Readonly<V[]> | RoArray<V> | Readonly<RoArray<V>> : T extends object ? T | Readonly<T> | RoObject<T> | Readonly<RoObject<T>> : T;

declare type RoArray<T> = Ro<T>[];

declare type RoObject<T> = {
    [K in keyof T]: T[K] | Ro<T[K]>;
};

export { rsbuild }

export declare class Rstest implements RstestContext {
    cwd: string;
    command: RstestCommand;
    fileFilters?: string[];
    fileFilterMode?: FileFilterMode;
    relatedFilters?: string[];
    relatedMode?: 'related' | 'changed';
    relatedResolutionEmpty?: boolean;
    changedCoverageFilters?: string[];
    relatedRerunReason?: 'forceRerunTrigger';
    relatedRerunFiles?: string[];
    configFilePath?: string;
    embedded: boolean;
    reporters: Reporter[];
    snapshotManager: SnapshotManager;
    trace: boolean;
    version: string;
    rootPath: string;
    originalConfig: RstestConfig;
    normalizedConfig: NormalizedConfig;
    reporterResults: {
        results: TestFileResult[];
        testResults: TestResult[];
    };
    stateManager: TestStateManager;
    testState: RstestTestState;
    projects: ProjectContext[];
    constructor({ cwd, command, fileFilters, fileFilterMode, configFilePath, projects, trace, embedded }: Options_2, userConfig: RstestConfig);
    updateReporterResultState(results: TestFileResult[], testResults: TestResult[], deletedEntries?: string[]): void;
}

/**
 * Description key of the well-known `Symbol.for(...)` under which Rstest stores
 * the runtime env store on `globalThis`. Single owner of the string, shared by
 * three contexts that must resolve the SAME registry symbol: the core worker
 * runtime and the browser client both call `Symbol.for(RSTEST_ENV_SYMBOL_KEY)`,
 * while the host bakes it into the rspack `define` text via
 * `JSON.stringify(RSTEST_ENV_SYMBOL_KEY)`. Kept a plain string (not a Symbol) so
 * it serves both the runtime and the build-define codegen path. Re-exported from
 * both `./internal/browser-runtime` and `./internal/browser` barrels.
 */
export declare const RSTEST_ENV_SYMBOL_KEY = 'rstest.env';

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

declare type RstestCommand = 'watch' | 'run' | 'list' | 'merge-reports';

declare interface RstestConfig {
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

export declare type RstestContext = {
    /** The Rstest core version. */ version: string;
    /** The root path of rstest. */ rootPath: string;
    /** The original Rstest config passed from the createRstest method. */ originalConfig: Readonly<RstestConfig>;
    /** The normalized Rstest config. */ normalizedConfig: NormalizedConfig;
    /** filter by a filename regex pattern */ fileFilters?: string[];
    /** How file filters should match discovered test files. */ fileFilterMode?: FileFilterMode;
    /** Original source filters passed to `--related`, `--findRelatedTests`, or resolved from `--changed`. */ relatedFilters?: string[];
    /** CLI option that produced related source filters. */ relatedMode?: 'related' | 'changed';
    /** Related test resolution completed successfully but matched no test files. */ relatedResolutionEmpty?: boolean;
    /** Changed source files used to limit coverage reports for `--changed`. */ changedCoverageFilters?: string[];
    /** Why a related run was expanded back to the full test suite. */ relatedRerunReason?: 'forceRerunTrigger';
    /** Changed files that caused a related run to expand back to the full test suite. */ relatedRerunFiles?: string[];
    /** The config file path. */ configFilePath?: string;
    /**
     * Run tests from one or more projects.
     */ projects: ProjectContext[];
    /**
     * The test state
     */ testState: RstestTestState;
    /**
     * The command type.
     *
     * - run: `rstest`
     * - dev: `rstest dev` or watch mode
     * - list: `rstest list`
     */ command: RstestCommand;
    /**
     * Dump a Perfetto-compatible performance trace JSON file. CLI-only switch;
     * not exposed via user config.
     *
     * @internal
     */ trace: boolean;
    /** See the `embedded` option on `createRstest`. */ embedded: boolean;
    reporters: Reporter[];
    snapshotManager: SnapshotManager;
    stateManager: TestStateManager;
    reporterResults: {
        results: TestFileResult[];
        testResults: TestResult[];
    };
    /** Merge a batch of file/test results into `reporterResults`. */ updateReporterResultState: (results: TestFileResult[], testResults: TestResult[], deletedEntries?: string[]) => void;
};

declare type RstestExpect = ExpectStatic;

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

declare type RstestTestState = {
    getRunningModules: () => RunningModules;
    getTestModules: () => TestFileResult[];
    /** Get the test files paths. return `undefined` in watch mode. */ getTestFiles: () => string[] | undefined;
};

declare type RunnerAPI = {
    describe: DescribeAPI;
    it: TestAPIs;
    test: TestAPIs;
    beforeAll: (fn: BeforeAllListener, timeout?: number) => void;
    afterAll: (fn: AfterAllListener, timeout?: number) => void;
    beforeEach: (fn: BeforeEachListener, timeout?: number) => void;
    afterEach: (fn: AfterEachListener, timeout?: number) => void;
    onTestFinished: (fn: OnTestFinishedHandler, timeout?: number) => void;
    onTestFailed: (fn: OnTestFailedHandler, timeout?: number) => void;
};

export declare type RunnerHooks = {
    onTestSuiteStart?: (test: TestSuiteInfo) => Promise<void>;
    onTestSuiteResult?: (result: TestResult) => Promise<void>;
    /**
     * Called after tests in file collected.
     */ onTestFileReady?: (test: TestFileInfo) => Promise<void>;
    /**
     * Called before running the test case.
     */ onTestCaseStart?: (test: TestCaseInfo) => Promise<void>;
    /**
     * Called after the test is finished running.
     */ onTestCaseResult?: (result: TestResult) => Promise<void>;
    /**
     * The number of failed tests.
     */ getCountOfFailedTests: () => Promise<number>;
};

declare type RunningModules = Map<string, {
    runningTests: TestCaseInfo[];
    results: TestResult[];
}>;

export declare type RuntimeConfig = Pick<RstestContext['normalizedConfig'], 'testTimeout' | 'testNamePattern' | 'globals' | 'passWithNoTests' | 'retry' | 'clearMocks' | 'resetMocks' | 'restoreMocks' | 'unstubEnvs' | 'unstubGlobals' | 'maxConcurrency' | 'printConsoleTrace' | 'disableConsoleIntercept' | 'testEnvironment' | 'isolate' | 'hookTimeout' | 'coverage' | 'snapshotFormat' | 'env' | 'logHeapUsage' | 'detectAsyncLeaks' | 'bail' | 'chaiConfig' | 'includeTaskLocation' | 'silent'>;

declare interface SaveStatus {
    	deleted: boolean;
    	saved: boolean;
}

/**
 * Makes some special types that are not supported for passing into the pool serializable.
 * eg. RegExp
 */
export declare const serializableConfig: (normalizedConfig: RuntimeConfig) => RuntimeConfig;

declare class SnapshotClient {
    	private options;
    	snapshotStateMap: Map<string, SnapshotState>;
    	constructor(options?: SnapshotClientOptions);
    	setup(filepath: string, options: SnapshotStateOptions): Promise<void>;
    	finish(filepath: string): Promise<SnapshotResult>;
    	skipTest(filepath: string, testName: string): void;
    	clearTest(filepath: string, testId: string): void;
    	getSnapshotState(filepath: string): SnapshotState;
    	assert(options: AssertOptions): void;
    	assertRaw(options: AssertOptions): Promise<void>;
    	clear(): void;
}

declare interface SnapshotClientOptions {
    	isEqual?: (received: unknown, expected: unknown) => boolean;
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

declare class SnapshotManager {
    	options: Omit<SnapshotStateOptions, "snapshotEnvironment">;
    	summary: SnapshotSummary;
    	extension: string;
    	constructor(options: Omit<SnapshotStateOptions, "snapshotEnvironment">);
    	clear(): void;
    	add(result: SnapshotResult): void;
    	resolvePath<T = any>(testPath: string, context?: T): string;
    	resolveRawPath(testPath: string, rawPath: string): string;
}

declare interface SnapshotMatcher<T> {
    <U extends {
        [P in keyof T]: any;
    }>(snapshot: Partial<U>, message?: string) : void;
    (message?: string) : void;
}

declare interface SnapshotMatchOptions {
    	testId: string;
    	testName: string;
    	received: unknown;
    	key?: string;
    	inlineSnapshot?: string;
    	isInline: boolean;
    	error?: Error;
    	rawSnapshot?: RawSnapshotInfo;
}

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

declare interface SnapshotReturnOptions {
    	actual: string;
    	count: number;
    	expected?: string;
    	key: string;
    	pass: boolean;
}

declare class SnapshotState {
    	testFilePath: string;
    	snapshotPath: string;
    	private _counters;
    	private _dirty;
    	private _updateSnapshot;
    	private _snapshotData;
    	private _initialData;
    	private _inlineSnapshots;
    	private _inlineSnapshotStacks;
    	private _testIdToKeys;
    	private _rawSnapshots;
    	private _uncheckedKeys;
    	private _snapshotFormat;
    	private _environment;
    	private _fileExists;
    	expand: boolean;
    	// getter/setter for jest-image-snapshot compat
    	// https://github.com/vitest-dev/vitest/issues/7322
    	private _added;
    	private _matched;
    	private _unmatched;
    	private _updated;
    	get added(): CounterMap<string>;
    	set added(value: CounterMap<string>);
    	get matched(): CounterMap<string>;
    	set matched(value: CounterMap<string>);
    	get unmatched(): CounterMap<string>;
    	set unmatched(value: CounterMap<string>);
    	get updated(): CounterMap<string>;
    	set updated(value: CounterMap<string>);
    	private constructor();
    	static create(testFilePath: string, options: SnapshotStateOptions): Promise<SnapshotState>;
    	get environment(): SnapshotEnvironment;
    	markSnapshotsAsCheckedForTest(testName: string): void;
    	clearTest(testId: string): void;
    	protected _inferInlineSnapshotStack(stacks: ParsedStack[]): ParsedStack | null;
    	private _addSnapshot;
    	save(): Promise<SaveStatus>;
    	getUncheckedCount(): number;
    	getUncheckedKeys(): Array<string>;
    	removeUncheckedKeys(): void;
    	match({ testId, testName, received, key, inlineSnapshot, isInline, error, rawSnapshot }: SnapshotMatchOptions): SnapshotReturnOptions;
    	pack(): Promise<SnapshotResult>;
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

declare function stringify(object: unknown, maxDepth?: number, { maxLength,...options }?: StringifyOptions): string;

declare interface StringifyOptions extends PrettyFormatOptions {
    	maxLength?: number;
}

declare interface SuiteContext {
    filepath: TestPath;
}

declare type Summarizers = "flat" | "nested" | "pkg" | "defaultSummarizer";

/** Union type for all supported reporter types */ declare type SupportedReporter = keyof ReportOptions | ReportWithOptions | ReportBase | CustomReporter;

declare interface SyncExpectationResult {
    	pass: boolean;
    	message: () => string;
    	actual?: any;
    	expected?: any;
}

declare interface TaskResult {
    /**
     * State of the task. Inherits the `task.mode` during collection.
     * When the task has finished, it will be changed to `pass` or `fail`.
     * - **pass**: task ran successfully
     * - **fail**: task failed
     */ state: TaskState;
    /**
     * Errors that occurred during the task execution. It is possible to have several errors
     * if `expect.soft()` failed multiple times or `retry` was triggered.
     */ errors?: FormattedError[];
}

declare type TaskState = 'pass' | 'fail';

declare interface TeamcityOptions extends FileOptions {
    blockName: string;
}

export declare type Test = TestSuite | TestCase;

declare type Test_2 = (arg0: any) => boolean;

declare type TestAPI<ExtraContext = object> = TestFn<ExtraContext> & {
    each: TestEachFn;
    for: TestForFn<ExtraContext>;
    fails: TestAPI<ExtraContext>;
    concurrent: TestAPI<ExtraContext>;
    sequential: TestAPI<ExtraContext>;
    only: TestAPI<ExtraContext>;
    skip: TestAPI<ExtraContext>;
    todo: TestAPI<ExtraContext>;
    runIf: (condition: boolean) => TestAPI<ExtraContext>;
    skipIf: (condition: boolean) => TestAPI<ExtraContext>;
};

declare type TestAPIs<ExtraContext = object> = TestAPI<ExtraContext> & {
    extend: <T extends Record<string, any> = object>(fixtures: Fixtures<T, ExtraContext>) => TestAPIs<{
        [K in keyof T | keyof ExtraContext]: K extends keyof T ? T[K] : K extends keyof ExtraContext ? ExtraContext[K] : never;
    }>;
};

declare type TestCallbackFn<ExtraContext = object> = (context: TestContext & ExtraContext) => MaybePromise<void>;

declare type TestCase = TestCaseInfo & {
    originalFn?: (context: TestContext) => void | Promise<void>;
    fn?: (context: TestContext) => void | Promise<void>;
    fails?: boolean;
    each?: boolean;
    fixtures?: NormalizedFixtures;
    concurrent?: boolean;
    sequential?: boolean;
    inTestEach?: boolean;
    context: TestContext;
    only?: boolean;
    /**
     * Per-test override for the number of retries on failure. When undefined,
     * the runner falls back to `runtimeConfig.retry`.
     */ retry?: number;
    /**
     * Number of additional runs to perform on top of the first run; any failure
     * short-circuits remaining repeats. Currently per-test only.
     */ repeats?: number;
    onFinished: OnTestFinishedHandler[];
    onFailed: OnTestFailedHandler[];
    /**
     * Store promises (from async expects) to wait for them before finishing the test
     */ promises?: Promise<any>[];
    /**
     * Store stack trace error created when test is registered, used for trace original position
     */ stackTraceError: Error;
    /**
     * Result of the task. if `expect.soft()` failed multiple times or `retry` was triggered.
     */ result?: TaskResult;
};

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

declare interface TestContext {
    /**
     * Metadata of the current test
     */ task: {
        /** A stable, unique identifier for the test */ id: string;
        /** Test name provided by user */ name: string;
        /** Result of the current test, undefined if the test is not run yet */ result?: TestResult;
    };
    expect: RstestExpect;
    /** Skip the current test during execution. */ skip: () => never;
    onTestFinished: RunnerAPI['onTestFinished'];
    onTestFailed: RunnerAPI['onTestFailed'];
}

declare interface TestEachFn {
    <T extends Record<string, unknown>>(cases: readonly T[]) : (description: string, fn?: (param: T) => MaybePromise<void>, options?: number | TestOptions) => void;
    <T extends readonly [unknown, ...unknown[]]>(cases: readonly T[]) : (description: string, fn: (...args: [...T]) => MaybePromise<void>, options?: number | TestOptions) => void;
    <T>(cases: readonly T[]) : (description: string, fn: (...args: T[]) => MaybePromise<void>, options?: number | TestOptions) => void;
    <T extends Record<string, unknown>>(strings: TemplateStringsArray, ...expressions: unknown[]) : (description: string, fn?: (param: T) => MaybePromise<void>, options?: number | TestOptions) => void;
}

declare type Tester = (this: TesterContext, a: any, b: any, customTesters: Array<Tester>) => boolean | undefined;

declare interface TesterContext {
    	equals: (a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean) => boolean;
}

declare type TestFileInfo = {
    testId: string;
    testPath: TestPath;
    tests: TestInfo[];
};

export declare type TestFileResult = TestResult & {
    results: TestResult[];
    snapshotResult?: SnapshotResult;
    coverage?: Record<string, FileCoverageData>;
    /**
     * Perfetto-compatible trace events. Stripped at the pool boundary.
     *
     * @internal
     */ traceEvents?: TraceEvent[];
};

declare type TestFn<ExtraContext = object> = (description: string, fn?: TestCallbackFn<ExtraContext>, options?: number | TestOptions) => void;

declare interface TestForFn<ExtraContext = object> {
    <T>(cases: readonly T[]) : (description: string, fn?: (param: T, context: TestContext & ExtraContext) => MaybePromise<void>, options?: number | TestOptions) => void;
    <T extends Record<string, unknown>>(strings: TemplateStringsArray, ...expressions: unknown[]) : (description: string, fn?: (param: T, context: TestContext & ExtraContext) => MaybePromise<void>, options?: number | TestOptions) => void;
}

declare type TestInfo = TestCaseInfo | (TestSuiteInfo & {
    tests: TestInfo[];
});

/**
 * Per-test options accepted as the third argument of `test` / `it` / `test.each` /
 * `test.for`. Passing a plain `number` is equivalent to `{ timeout: n }`.
 *
 * Declared as an `interface` so consumers can use module augmentation to add
 * fields in the future without breaking source compatibility.
 */ declare interface TestOptions {
    /**
     * Per-test timeout in milliseconds. Overrides `test.testTimeout`.
     */ timeout?: number;
    /**
     * Number of times to retry the test if it fails. Overrides `test.retry`.
     *
     * @default 0
     */ retry?: number;
    /**
     * Number of times to re-run the test after it has already passed. The test is
     * considered failed as soon as any run fails. Total executions per case is
     * `repeats + 1`. Orthogonal to `retry`: each repeat independently honors the
     * configured retry budget.
     *
     * @default 0
     */ repeats?: number;
}

/** The test file original path */ declare type TestPath = string;

declare type TestProject = string | InlineProjectConfig;

export declare type TestResult = {
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

declare type TestResultStatus = 'skip' | 'pass' | 'fail' | 'todo';

declare type TestRunMode = 'run' | 'skip' | 'todo' | 'only';

declare class TestStateManager {
    runningModules: Map<string, {
        runningTests: TestCaseInfo[];
        results: TestResult[];
    }>;
    testModules: TestFileResult[];
    testFiles: string[] | undefined;
    onTestFileStart(testPath: string): void;
    onTestCaseResult(result: TestResult): void;
    onTestCaseStart(test: TestCaseInfo): void;
    getCountOfFailedTests(): number;
    onTestFileResult(test: TestFileResult): void;
    reset(): void;
}

declare type TestSuite = TestSuiteInfo & {
    each?: boolean;
    inTestEach?: boolean;
    concurrent?: boolean;
    sequential?: boolean;
    /** nested cases and suite could in a suite */ tests: Test[];
    afterAllListeners?: AfterAllListener[];
    beforeAllListeners?: BeforeAllListener[];
    afterEachListeners?: AfterEachListener[];
    beforeEachListeners?: BeforeEachListener[];
};

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

declare type Use<T> = (value: T) => Promise<void>;

export declare interface UserConsoleLog {
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

declare type VitestAssertion<
	A,
	T
> = { [K in keyof A] : A[K] extends Chai.Assertion ? Assertion<T> : A[K] extends (...args: any[]) => any ? A[K] : VitestAssertion<A[K], T> } & ((type: string, message?: string) => Assertion);

declare type Watermark = [number, number];

declare interface Watermarks {
    statements: Watermark;
    functions: Watermark;
    branches: Watermark;
    lines: Watermark;
}

declare type WithAsymmetricMatcher<T> = T | AsymmetricMatcher<unknown>;

declare type WorkerContext = {
    rootPath: RstestContext['rootPath'];
    projectRoot: ProjectContext['rootPath'];
    project: string;
    runtimeConfig: RuntimeConfig;
    taskId: number;
    outputModule: boolean;
    /** When true, the worker emits Perfetto trace events alongside phase totals. */ trace?: boolean;
};

export declare type WorkerState = WorkerContext & {
    environment: string;
    testPath: TestPath;
    distPath: DistPath;
    currentTask?: CurrentTaskInfo;
    snapshotClient?: SnapshotClient;
    snapshotOptions: {
        updateSnapshot: SnapshotUpdateState;
        snapshotEnvironment: SnapshotEnvironment;
        snapshotFormat: RuntimeConfig['snapshotFormat'];
    };
};

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
