import "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { createPool, applyEnvironmentGroupsToListEntries, runGlobalTeardown, claimGlobalSetupOnce, runGlobalSetup } from "./0~8244.js";
import { resolveShardedEntries, getTestEntries, prettyTestPath } from "./506.js";
import { prepareRsbuild, createRsbuildServer } from "./0~rsbuild.js";
import { relative, color as logger_color, logger as logger_logger, ROOT_SUITE_NAME, getTaskNameWithPrefix, bgColor } from "./2366.js";
const SummaryProjectLabel = logger_color.gray('Projects'.padStart(11));
const SummaryTestFileLabel = logger_color.gray('Test Files'.padStart(11));
const SummarySuiteLabel = logger_color.gray('Suites'.padStart(11));
const SummaryTestLabel = logger_color.gray('Tests'.padStart(11));
const getListSummaryCounts = (tests)=>{
    const projects = new Set();
    const files = new Set();
    let suites = 0;
    let testCases = 0;
    for (const test of tests){
        if (test.project) projects.add(test.project);
        files.add(`${test.project ?? ''}\0${test.file}`);
        if ('suite' === test.type) suites += 1;
        if ('case' === test.type) testCases += 1;
    }
    return {
        projects: projects.size,
        files: files.size,
        suites,
        testCases
    };
};
const printListSummary = ({ tests, filesOnly, includeSuites, showProject, write })=>{
    const counts = getListSummaryCounts(tests);
    write('');
    if (showProject) write(`${SummaryProjectLabel} ${logger_color.bold(`${counts.projects} matched`)}`);
    write(`${SummaryTestFileLabel} ${logger_color.bold(`${counts.files} matched`)}`);
    if (filesOnly) return;
    if (includeSuites) write(`${SummarySuiteLabel} ${logger_color.bold(`${counts.suites} matched`)}`);
    write(`${SummaryTestLabel} ${logger_color.bold(`${counts.testCases} matched`)}`);
};
const createListSummaryPayload = ({ tests, filesOnly, includeSuites, showProject })=>{
    const counts = getListSummaryCounts(tests);
    const summary = {
        files: counts.files
    };
    if (showProject) summary.projects = counts.projects;
    if (!filesOnly) {
        if (includeSuites) summary.suites = counts.suites;
        summary.tests = counts.testCases;
    }
    return summary;
};
const collectNodeTests = async ({ context, nodeProjects, globTestSourceEntries })=>{
    const { getSetupFiles } = await import("./744.js");
    if (0 === nodeProjects.length) return {
        list: [],
        getSourceMap: async ()=>null,
        close: async ()=>void 0
    };
    const setupFiles = Object.fromEntries(nodeProjects.map((project)=>{
        const { environmentName, rootPath, normalizedConfig: { setupFiles } } = project;
        return [
            environmentName,
            getSetupFiles(setupFiles, rootPath)
        ];
    }));
    const globalSetupFiles = Object.fromEntries(context.projects.map((project)=>{
        const { environmentName, rootPath, normalizedConfig: { globalSetup } } = project;
        return [
            environmentName,
            getSetupFiles(globalSetup, rootPath)
        ];
    }));
    const rsbuildInstance = await prepareRsbuild(context, globTestSourceEntries, setupFiles, globalSetupFiles, nodeProjects);
    const { getRsbuildStats, closeServer } = await createRsbuildServer({
        globTestSourceEntries,
        globalSetupFiles,
        isWatchMode: false,
        inspectedConfig: {
            ...context.normalizedConfig,
            projects: nodeProjects.map((p)=>p.normalizedConfig)
        },
        setupFiles,
        rsbuildInstance,
        rootPath: context.rootPath
    });
    const pool = await createPool({
        context
    });
    const updateSnapshot = context.snapshotManager.options.updateSnapshot;
    const returns = await Promise.all(nodeProjects.map(async (project)=>{
        const { entries, setupEntries, globalSetupEntries, getSourceMaps, getAssetFiles, assetNames } = await getRsbuildStats({
            environmentName: project.environmentName
        });
        if (claimGlobalSetupOnce(project, entries.length, globalSetupEntries.length)) {
            const files = globalSetupEntries.flatMap((e)=>e.files);
            const assetFilesPromise = getAssetFiles(files);
            const sourceMapsPromise = getSourceMaps(files);
            const [assetFiles, sourceMaps] = await Promise.all([
                assetFilesPromise,
                sourceMapsPromise
            ]);
            const { success, errors } = await runGlobalSetup({
                globalSetupEntries,
                assetFiles,
                sourceMaps,
                interopDefault: true,
                outputModule: project.outputModule
            });
            if (!success) return {
                list: [],
                errors,
                assetNames,
                getSourceMaps: ()=>null
            };
        }
        const list = await pool.collectTests({
            entries,
            setupEntries,
            getAssetFiles,
            getSourceMaps,
            project,
            updateSnapshot
        });
        return {
            list,
            getSourceMaps,
            assetNames
        };
    }));
    return {
        list: returns.flatMap((r)=>r.list),
        errors: returns.flatMap((r)=>r.errors || []),
        getSourceMap: async (name)=>{
            const resource = returns.find((r)=>r.assetNames.includes(name));
            return (await resource?.getSourceMaps([
                name
            ]))?.[name];
        },
        close: async ()=>{
            await runGlobalTeardown();
            await closeServer();
            await pool.close();
        }
    };
};
const collectBrowserTests = async ({ context, browserProjects, shardedEntries })=>{
    if (0 === browserProjects.length) return {
        list: [],
        close: async ()=>void 0
    };
    const { loadBrowserModule } = await import("./0~browserLoader.js");
    const projectRoots = browserProjects.map((p)=>p.rootPath);
    const { validateBrowserConfig, listBrowserTests } = await loadBrowserModule({
        projectRoots,
        embedded: context.embedded
    });
    validateBrowserConfig(context);
    return listBrowserTests(context, {
        shardedEntries
    });
};
const collectTestFiles = async ({ context, globTestSourceEntries })=>{
    const projectLists = await Promise.all(context.projects.map(async (project)=>{
        const files = await globTestSourceEntries(project.environmentName);
        return Object.values(files).map((testPath)=>({
                testPath,
                project: project.name,
                tests: []
            }));
    }));
    const list = projectLists.flat();
    return {
        close: async ()=>void 0,
        errors: [],
        list,
        getSourceMap: async ()=>null
    };
};
const collectAllTests = async ({ context, globTestSourceEntries, shardedEntries })=>{
    const browserProjects = context.projects.filter((p)=>p.normalizedConfig.browser.enabled);
    const nodeProjects = context.projects.filter((p)=>!p.normalizedConfig.browser.enabled);
    const [nodeResult, browserResult] = await Promise.all([
        collectNodeTests({
            context,
            nodeProjects,
            globTestSourceEntries
        }),
        collectBrowserTests({
            context,
            browserProjects,
            shardedEntries
        })
    ]);
    return {
        errors: nodeResult.errors,
        list: [
            ...nodeResult.list,
            ...browserResult.list
        ],
        getSourceMap: nodeResult.getSourceMap,
        close: async ()=>{
            await Promise.all([
                nodeResult.close(),
                browserResult.close()
            ]);
        }
    };
};
async function listTests(context, { filesOnly, json, printLocation, includeSuites, summary }) {
    const { rootPath } = context;
    const { shard } = context.normalizedConfig;
    const showProject = context.projects.length > 1;
    if (context.relatedResolutionEmpty) {
        const tests = [];
        if (json && 'false' !== json) {
            const content = JSON.stringify(summary ? {
                items: tests,
                summary: createListSummaryPayload({
                    tests,
                    filesOnly,
                    includeSuites,
                    showProject
                })
            } : tests, null, 2);
            if (true !== json && 'true' !== json) {
                const jsonPath = isAbsolute(json) ? json : join(rootPath, json);
                mkdirSync(dirname(jsonPath), {
                    recursive: true
                });
                writeFileSync(jsonPath, content);
            } else logger_logger.log(content);
        } else if (summary) printListSummary({
            tests,
            filesOnly,
            includeSuites,
            showProject,
            write: logger_logger.log
        });
        return [];
    }
    const shardedEntries = await resolveShardedEntries(context);
    const testEntries = {};
    let shardedBrowserEntries;
    if (shard && shardedEntries) {
        for (const [key, value] of shardedEntries.entries())testEntries[key] = value.entries;
        shardedBrowserEntries = new Map();
        for (const p of context.projects.filter((p)=>p.normalizedConfig.browser.enabled))shardedBrowserEntries.set(p.environmentName, {
            entries: testEntries[p.environmentName] || {}
        });
    }
    const globTestSourceEntries = async (name)=>{
        if (testEntries[name]) return testEntries[name];
        const { include, exclude, includeSource, root } = context.projects.find((p)=>p.environmentName === name).normalizedConfig;
        const entries = await getTestEntries({
            include,
            exclude: exclude.patterns,
            rootPath,
            projectRoot: root,
            fileFilters: context.fileFilters || [],
            fileFilterMode: context.fileFilterMode,
            includeSource
        });
        testEntries[name] = entries;
        return entries;
    };
    await applyEnvironmentGroupsToListEntries({
        context,
        testEntries,
        globTestSourceEntries
    });
    const { list, close, getSourceMap, errors = [] } = filesOnly ? await collectTestFiles({
        context,
        globTestSourceEntries
    }) : await collectAllTests({
        context,
        globTestSourceEntries,
        shardedEntries: shardedBrowserEntries
    });
    const tests = [];
    const traverseTests = (test)=>{
        if ([
            'skip',
            'todo'
        ].includes(test.runMode)) return;
        if ('case' === test.type || includeSuites && 'suite' === test.type && test.name !== ROOT_SUITE_NAME) tests.push({
            file: test.testPath,
            name: getTaskNameWithPrefix(test),
            location: test.location,
            type: test.type,
            project: showProject ? test.project : void 0
        });
        if ('suite' === test.type) for (const child of test.tests)traverseTests(child);
    };
    const hasError = list.some((file)=>file.errors?.length) || errors.length;
    if (hasError) {
        const { printError } = await import("./7661.js");
        process.exitCode = 1;
        for (const file of list){
            const relativePath = relative(rootPath, file.testPath);
            if (file.errors?.length) {
                logger_logger.log(`${bgColor('bgRed', ' FAIL ')} ${relativePath}`);
                for (const error of file.errors)await printError(error, async (name)=>{
                    const sourceMap = await getSourceMap(name);
                    return sourceMap ? JSON.parse(sourceMap) : null;
                }, rootPath);
            }
        }
        if (errors.length) {
            const { printError } = await import("./7661.js");
            for (const error of errors || []){
                logger_logger.stderr(bgColor('bgRed', ' Unhandled Error '));
                await printError(error, async (name)=>{
                    const sourceMap = await getSourceMap(name);
                    return sourceMap ? JSON.parse(sourceMap) : null;
                }, rootPath);
            }
        }
        await close();
        return list;
    }
    for (const file of list){
        if (filesOnly) {
            if (showProject) tests.push({
                file: file.testPath,
                project: file.project,
                type: 'file'
            });
            else tests.push({
                file: file.testPath,
                type: 'file'
            });
            continue;
        }
        for (const test of file.tests)traverseTests(test);
    }
    if (json && 'false' !== json) {
        const content = JSON.stringify(summary ? {
            items: tests,
            summary: createListSummaryPayload({
                tests,
                filesOnly,
                includeSuites,
                showProject
            })
        } : tests, null, 2);
        if (true !== json && 'true' !== json) {
            const jsonPath = isAbsolute(json) ? json : join(rootPath, json);
            mkdirSync(dirname(jsonPath), {
                recursive: true
            });
            writeFileSync(jsonPath, content);
        } else logger_logger.log(content);
    } else {
        for (const test of tests){
            let shortPath = relative(rootPath, test.file);
            if (test.location && printLocation) shortPath = `${shortPath}:${test.location.line}:${test.location.column}`;
            logger_logger.log(test.name ? `${logger_color.dim(`${shortPath} > `)}${test.name}` : prettyTestPath(shortPath));
        }
        if (summary) printListSummary({
            tests,
            filesOnly,
            includeSuites,
            showProject,
            write: logger_logger.log
        });
    }
    await close();
    return list;
}
export { listTests };
