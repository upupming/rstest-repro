import "node:module";
import { existsSync } from "node:fs";
import { getTestEntries } from "./506.js";
import { getSetupFiles } from "./744.js";
import { prepareRsbuild } from "./0~rsbuild.js";
import { isAbsolute, relative, pathe_M_eThtNZ_resolve, normalize } from "./2366.js";
const stripSourceProtocol = (source)=>{
    if (source.startsWith('file://')) {
        const path = source.slice(7);
        return /^\/[a-zA-Z]:/.test(path) ? path.slice(1) : path;
    }
    return source.replace(/^[a-zA-Z]+:\/\//, '');
};
const resolveStatsPathCandidate = ({ candidate, projectRoot })=>{
    let normalizedCandidate = stripSourceProtocol(candidate.trim());
    if (!normalizedCandidate) return null;
    const bangIndex = normalizedCandidate.lastIndexOf('!');
    if (-1 !== bangIndex) normalizedCandidate = normalizedCandidate.slice(bangIndex + 1);
    if (normalizedCandidate.startsWith('builtin:') || normalizedCandidate.startsWith('data:') || normalizedCandidate.startsWith('webpack/') || normalizedCandidate.startsWith('rspack/')) return null;
    const queryIndex = normalizedCandidate.search(/[?#]/);
    if (-1 !== queryIndex) normalizedCandidate = normalizedCandidate.slice(0, queryIndex);
    if (!normalizedCandidate) return null;
    const absolutePath = isAbsolute(normalizedCandidate) ? normalize(normalizedCandidate) : normalize(pathe_M_eThtNZ_resolve(projectRoot, normalizedCandidate));
    return absolutePath;
};
const normalizeStatsPathCandidate = ({ candidate, projectRoot })=>{
    const absolutePath = resolveStatsPathCandidate({
        candidate,
        projectRoot
    });
    return absolutePath && existsSync(absolutePath) ? absolutePath : null;
};
const normalizeStatsModulePath = ({ module, projectRoot })=>{
    const candidate = 'string' == typeof module.nameForCondition && module.nameForCondition ? module.nameForCondition : module.identifier || '';
    return normalizeStatsPathCandidate({
        candidate,
        projectRoot
    });
};
const normalizeStatsReasonPath = ({ reason, projectRoot })=>{
    const candidate = reason.moduleIdentifier || reason.moduleName || reason.module || '';
    return normalizeStatsPathCandidate({
        candidate,
        projectRoot
    });
};
const collectModuleGraph = ({ modules, projectRoot })=>{
    const allSources = new Set();
    const dependentsBySource = new Map();
    const visitModules = (statsModules)=>{
        for (const module of statsModules || []){
            const sourcePath = normalizeStatsModulePath({
                module,
                projectRoot
            });
            if (sourcePath) {
                allSources.add(sourcePath);
                for (const reason of module.reasons || []){
                    const dependentPath = normalizeStatsReasonPath({
                        reason,
                        projectRoot
                    });
                    if (!dependentPath) continue;
                    allSources.add(dependentPath);
                    const dependents = dependentsBySource.get(sourcePath) || new Set();
                    dependents.add(dependentPath);
                    dependentsBySource.set(sourcePath, dependents);
                }
            }
            if (module.modules?.length) visitModules(module.modules);
        }
    };
    visitModules(modules);
    return {
        allSources,
        dependentsBySource
    };
};
const collectReachableDependents = ({ dependentsBySource, initialSources })=>{
    const visited = new Set();
    const queue = Array.from(initialSources);
    for (const source of queue)visited.add(source);
    while(queue.length > 0){
        const currentSource = queue.shift();
        for (const dependent of dependentsBySource.get(currentSource) || [])if (!visited.has(dependent)) {
            visited.add(dependent);
            queue.push(dependent);
        }
    }
    return visited;
};
const collectProjectEntries = async (context)=>{
    const entries = new Map();
    await Promise.all(context.projects.map(async (project)=>{
        const { include, exclude, includeSource, root } = project.normalizedConfig;
        entries.set(project.environmentName, await getTestEntries({
            include,
            exclude: exclude.patterns,
            includeSource,
            rootPath: context.rootPath,
            projectRoot: root,
            fileFilters: []
        }));
    }));
    return entries;
};
const buildSetupFiles = (projects, key)=>Object.fromEntries(projects.map((project)=>[
            project.environmentName,
            getSetupFiles(project.normalizedConfig[key], project.rootPath)
        ]));
const createRelatedBuildSafeguardsPlugin = ()=>({
        name: 'rstest:related-build-safeguards',
        setup (api) {
            api.modifyRsbuildConfig((config)=>({
                    ...config,
                    dev: {
                        ...config.dev || {},
                        lazyCompilation: false
                    },
                    performance: {
                        ...config.performance || {},
                        buildCache: false
                    }
                }));
            api.modifyRspackConfig((rspackConfig)=>{
                rspackConfig.lazyCompilation = false;
                rspackConfig.cache = false;
            });
        }
    });
const normalizeExactPathMatch = (filePath)=>{
    const normalizedPath = normalize(filePath);
    return 'win32' === process.platform ? normalizedPath.toLocaleLowerCase() : normalizedPath;
};
const collectDirectlyMatchedFiles = ({ files, sourceFilters, rootPath })=>{
    const exactSourcePaths = new Set();
    for (const sourceFilter of sourceFilters){
        exactSourcePaths.add(normalizeExactPathMatch(sourceFilter));
        exactSourcePaths.add(normalizeExactPathMatch(pathe_M_eThtNZ_resolve(rootPath, sourceFilter)));
    }
    return files.filter((filePath)=>{
        const normalizedFilePath = normalizeExactPathMatch(filePath);
        const normalizedRelativeFilePath = normalizeExactPathMatch(relative(rootPath, filePath));
        return exactSourcePaths.has(normalizedFilePath) || exactSourcePaths.has(normalizedRelativeFilePath);
    });
};
async function resolveRelatedTestFiles(context, options) {
    const { sourceFilters, filterLabel = '--related', allowEmpty = false } = options;
    if (0 === sourceFilters.length) {
        if (allowEmpty) return [];
        throw new Error(`The \`${filterLabel}\` option requires at least one source file path.`);
    }
    const projectEntries = await collectProjectEntries(context);
    const matchedTestFiles = new Set(collectDirectlyMatchedFiles({
        files: Array.from(projectEntries.values()).flatMap((entries)=>Object.values(entries)),
        sourceFilters,
        rootPath: context.rootPath
    }));
    const globTestSourceEntries = async (environmentName)=>projectEntries.get(environmentName) ?? {};
    const setupFiles = buildSetupFiles(context.projects, 'setupFiles');
    const globalSetupFiles = buildSetupFiles(context.projects, 'globalSetup');
    const rsbuildInstance = await prepareRsbuild(context, globTestSourceEntries, setupFiles, globalSetupFiles, context.projects, [
        createRelatedBuildSafeguardsPlugin()
    ]);
    const devServer = await rsbuildInstance.createDevServer({
        getPortSilently: true
    });
    try {
        for (const project of context.projects){
            const environment = devServer.environments[project.environmentName];
            const stats = await environment.getStats();
            const { modules } = stats.toJson({
                all: false,
                modules: true,
                nestedModules: true,
                reasons: true
            });
            const moduleGraph = collectModuleGraph({
                modules,
                projectRoot: project.rootPath
            });
            const testPaths = Object.values(projectEntries.get(project.environmentName) || {});
            const setupPaths = Object.values(setupFiles[project.environmentName] || {});
            const globalSetupPaths = Object.values(globalSetupFiles[project.environmentName] || {});
            const matchedSources = collectDirectlyMatchedFiles({
                files: Array.from(moduleGraph.allSources),
                sourceFilters,
                rootPath: context.rootPath
            });
            if (0 === matchedSources.length) continue;
            const reachableDependents = collectReachableDependents({
                dependentsBySource: moduleGraph.dependentsBySource,
                initialSources: matchedSources
            });
            const shouldRerunWholeProject = setupPaths.some((setupPath)=>reachableDependents.has(setupPath)) || globalSetupPaths.some((setupPath)=>reachableDependents.has(setupPath));
            if (shouldRerunWholeProject) {
                for (const testPath of testPaths)matchedTestFiles.add(testPath);
                continue;
            }
            for (const testPath of testPaths)if (reachableDependents.has(testPath)) matchedTestFiles.add(testPath);
        }
    } finally{
        await devServer.close();
    }
    return Array.from(matchedTestFiles).sort();
}
export { resolveRelatedTestFiles };
