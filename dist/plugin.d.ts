import type { NormalizedCoverageOptions, RsbuildPlugin } from '@rstest/core';
type TransformCoverageFn = (code: string, filename: string) => Promise<{
    code: string;
    map?: any;
}>;
declare const transformCoverage: (environmentName: string, code: string, filename: string) => ReturnType<TransformCoverageFn>;
export { transformCoverage };
export declare const pluginCoverage: (options: NormalizedCoverageOptions) => RsbuildPlugin;
