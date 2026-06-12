import type { NormalizedCoverageOptions, CoverageProvider as RstestCoverageProvider } from '@rstest/core';
import type { CoverageMap, FileCoverageData } from 'istanbul-lib-coverage';
// Global type declaration for coverage
declare global {
    var __coverage__: any;
}
export declare class CoverageProvider implements RstestCoverageProvider {
    private options;
    private root?;
    private coverageMap;
    // Cache to avoid redundant readFile calls in generateCoverageForUntestedFiles and generateReports.
    private sourcemapUrlCache;
    constructor(options: NormalizedCoverageOptions, root?: string | undefined);
    init(): void;
    generateCoverageForUntestedFiles({ environmentName, files }: {
        environmentName: string;
        files: string[];
    }): Promise<FileCoverageData[]>;
    createCoverageMap(): CoverageMap;
    collect(_options?: {
        assetFiles?: Record<string, string>;
        sourceMaps?: Record<string, string>;
    }): CoverageMap | null;
    generateReports(coverageMap: CoverageMap): Promise<void>;
    private createReport;
    private resolveReporterName;
    private toImportSpecifier;
    private isRequireEsmError;
    cleanup(): void;
}
