import type { CoverageMap, FileCoverageData } from 'istanbul-lib-coverage';
// generated code looks like this:
// var coverageData = { <--- find until open brace
//   all: false,
//   path: '',
//   statementMap: {},
//   fnMap: {},
//   branchMap: {},
//   s: {},
//   f: {},
//   b: {},
//   _coverageSchema: '11020577277169172593', <--- from here
//   hash: '',
// }; <--- and until close brace
export declare function readInitialCoverage(code: string): FileCoverageData | undefined;
/**
 * Extract source mapping URL from code comments
 * @param {string} code source code content
 * @returns {string | undefined} source mapping information
 */ export declare function getSourceMappingURL(code: string): string | undefined;
export declare function registerSourceMapURL(filename: string, code: string, sourcemapUrlCache: Map<string, string | undefined>): void;
export declare function createFastCoverageMap(): CoverageMap;
export declare function mapWithConcurrency<T, R>(items: T[], concurrency: number, mapper: (item: T, index: number) => Promise<R>): Promise<R[]>;
export declare function transformCoverage(coverageMap: CoverageMap, sourcemapUrlCache: Map<string, string | undefined>): Promise<CoverageMap>;
