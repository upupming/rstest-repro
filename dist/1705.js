import "node:module";
import { __webpack_require__ } from "./0~rslib-runtime.js";
import "./506.js";
import { showRstest } from "./7661.js";
import { determineAgent, relative, logger as logger_logger, color as logger_color, pathe_M_eThtNZ_resolve, normalize, formatError } from "./2366.js";
function toArr(any) {
    return null == any ? [] : Array.isArray(any) ? any : [
        any
    ];
}
function toVal(out, key, val, opts) {
    var x, old = out[key], nxt = ~opts.string.indexOf(key) ? null == val || true === val ? "" : String(val) : "boolean" == typeof val ? val : ~opts.boolean.indexOf(key) ? "false" === val ? false : "true" === val || (out._.push((x = +val, 0 * x === 0) ? x : val), !!val) : (x = +val, 0 * x === 0) ? x : val;
    out[key] = null == old ? nxt : Array.isArray(old) ? old.concat(nxt) : [
        old,
        nxt
    ];
}
function lib_default(args, opts) {
    args = args || [];
    opts = opts || {};
    var k, arr, arg, name, val, out = {
        _: []
    };
    var i = 0, j = 0, idx = 0, len = args.length;
    const alibi = void 0 !== opts.alias;
    const strict = void 0 !== opts.unknown;
    const defaults = void 0 !== opts.default;
    opts.alias = opts.alias || {};
    opts.string = toArr(opts.string);
    opts.boolean = toArr(opts.boolean);
    if (alibi) for(k in opts.alias){
        arr = opts.alias[k] = toArr(opts.alias[k]);
        for(i = 0; i < arr.length; i++)(opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);
    }
    for(i = opts.boolean.length; i-- > 0;){
        arr = opts.alias[opts.boolean[i]] || [];
        for(j = arr.length; j-- > 0;)opts.boolean.push(arr[j]);
    }
    for(i = opts.string.length; i-- > 0;){
        arr = opts.alias[opts.string[i]] || [];
        for(j = arr.length; j-- > 0;)opts.string.push(arr[j]);
    }
    if (defaults) for(k in opts.default){
        name = typeof opts.default[k];
        arr = opts.alias[k] = opts.alias[k] || [];
        if (void 0 !== opts[name]) {
            opts[name].push(k);
            for(i = 0; i < arr.length; i++)opts[name].push(arr[i]);
        }
    }
    const keys = strict ? Object.keys(opts.alias) : [];
    for(i = 0; i < len; i++){
        arg = args[i];
        if ("--" === arg) {
            out._ = out._.concat(args.slice(++i));
            break;
        }
        for(j = 0; j < arg.length && 45 === arg.charCodeAt(j); j++);
        if (0 === j) out._.push(arg);
        else if ("no-" === arg.substring(j, j + 3)) {
            name = arg.substring(j + 3);
            if (strict && !~keys.indexOf(name)) return opts.unknown(arg);
            out[name] = false;
        } else {
            for(idx = j + 1; idx < arg.length && 61 !== arg.charCodeAt(idx); idx++);
            name = arg.substring(j, idx);
            val = arg.substring(++idx) || i + 1 === len || 45 === ("" + args[i + 1]).charCodeAt(0) || args[++i];
            arr = 2 === j ? [
                name
            ] : name;
            for(idx = 0; idx < arr.length; idx++){
                name = arr[idx];
                if (strict && !~keys.indexOf(name)) return opts.unknown("-".repeat(j) + name);
                toVal(out, name, idx + 1 < arr.length || val, opts);
            }
        }
    }
    if (defaults) {
        for(k in opts.default)if (void 0 === out[k]) out[k] = opts.default[k];
    }
    if (alibi) for(k in out){
        arr = opts.alias[k] || [];
        while(arr.length > 0)out[arr.shift()] = out[k];
    }
    return out;
}
function removeBrackets(v) {
    return v.replace(/[<[].+/, "").trim();
}
function findAllBrackets(v) {
    const ANGLED_BRACKET_RE_GLOBAL = /<([^>]+)>/g;
    const SQUARE_BRACKET_RE_GLOBAL = /\[([^\]]+)\]/g;
    const res = [];
    const parse = (match)=>{
        let variadic = false;
        let value = match[1];
        if (value.startsWith("...")) {
            value = value.slice(3);
            variadic = true;
        }
        return {
            required: match[0].startsWith("<"),
            value,
            variadic
        };
    };
    let angledMatch;
    while(angledMatch = ANGLED_BRACKET_RE_GLOBAL.exec(v))res.push(parse(angledMatch));
    let squareMatch;
    while(squareMatch = SQUARE_BRACKET_RE_GLOBAL.exec(v))res.push(parse(squareMatch));
    return res;
}
function getMriOptions(options) {
    const result = {
        alias: {},
        boolean: []
    };
    for (const [index, option] of options.entries()){
        if (option.names.length > 1) result.alias[option.names[0]] = option.names.slice(1);
        if (option.isBoolean) if (option.negated) {
            if (!options.some((o, i)=>i !== index && o.names.some((name)=>option.names.includes(name)) && "boolean" == typeof o.required)) result.boolean.push(option.names[0]);
        } else result.boolean.push(option.names[0]);
    }
    return result;
}
function findLongest(arr) {
    return arr.sort((a, b)=>a.length > b.length ? -1 : 1)[0];
}
function padRight(str, length) {
    return str.length >= length ? str : `${str}${" ".repeat(length - str.length)}`;
}
function camelcase(input) {
    return input.replaceAll(/([a-z])-([a-z])/g, (_, p1, p2)=>p1 + p2.toUpperCase());
}
function setDotProp(obj, keys, val) {
    let current = obj;
    for(let i = 0; i < keys.length; i++){
        const key = keys[i];
        if (i === keys.length - 1) {
            current[key] = val;
            return;
        }
        if (null == current[key]) {
            const nextKeyIsArrayIndex = +keys[i + 1] > -1;
            current[key] = nextKeyIsArrayIndex ? [] : {};
        }
        current = current[key];
    }
}
function setByType(obj, transforms) {
    for (const key of Object.keys(transforms)){
        const transform = transforms[key];
        if (transform.shouldTransform) {
            obj[key] = [
                obj[key]
            ].flat();
            if ("function" == typeof transform.transformFunction) obj[key] = obj[key].map(transform.transformFunction);
        }
    }
}
function getFileName(input) {
    const m = /([^\\/]+)$/.exec(input);
    return m ? m[1] : "";
}
function camelcaseOptionName(name) {
    return name.split(".").map((v, i)=>0 === i ? camelcase(v) : v).join(".");
}
var CACError = class extends Error {
    constructor(message){
        super(message);
        this.name = "CACError";
        if ("function" != typeof Error.captureStackTrace) this.stack = new Error(message).stack;
    }
};
var Option = class {
    rawName;
    description;
    name;
    names;
    isBoolean;
    required;
    config;
    negated;
    constructor(rawName, description, config){
        this.rawName = rawName;
        this.description = description;
        this.config = Object.assign({}, config);
        rawName = rawName.replaceAll(".*", "");
        this.negated = false;
        this.names = removeBrackets(rawName).split(",").map((v)=>{
            let name = v.trim().replace(/^-{1,2}/, "");
            if (name.startsWith("no-")) {
                this.negated = true;
                name = name.replace(/^no-/, "");
            }
            return camelcaseOptionName(name);
        }).sort((a, b)=>a.length > b.length ? 1 : -1);
        this.name = this.names.at(-1);
        if (this.negated && null == this.config.default) this.config.default = true;
        if (rawName.includes("<")) this.required = true;
        else if (rawName.includes("[")) this.required = false;
        else this.isBoolean = true;
    }
};
let runtimeProcessArgs;
let runtimeInfo;
if ("u" > typeof process) {
    let runtimeName;
    runtimeName = "u" > typeof Deno && "string" == typeof Deno.version?.deno ? "deno" : "u" > typeof Bun && "string" == typeof Bun.version ? "bun" : "node";
    runtimeInfo = `${process.platform}-${process.arch} ${runtimeName}-${process.version}`;
    runtimeProcessArgs = process.argv;
} else runtimeInfo = "u" < typeof navigator ? "unknown" : `${navigator.platform} ${navigator.userAgent}`;
var Command = class {
    rawName;
    description;
    config;
    cli;
    options;
    aliasNames;
    name;
    args;
    commandAction;
    usageText;
    versionNumber;
    examples;
    helpCallback;
    globalCommand;
    constructor(rawName, description, config = {}, cli){
        this.rawName = rawName;
        this.description = description;
        this.config = config;
        this.cli = cli;
        this.options = [];
        this.aliasNames = [];
        this.name = removeBrackets(rawName);
        this.args = findAllBrackets(rawName);
        this.examples = [];
    }
    usage(text) {
        this.usageText = text;
        return this;
    }
    allowUnknownOptions() {
        this.config.allowUnknownOptions = true;
        return this;
    }
    ignoreOptionDefaultValue() {
        this.config.ignoreOptionDefaultValue = true;
        return this;
    }
    version(version, customFlags = "-v, --version") {
        this.versionNumber = version;
        this.option(customFlags, "Display version number");
        return this;
    }
    example(example) {
        this.examples.push(example);
        return this;
    }
    option(rawName, description, config) {
        const option = new Option(rawName, description, config);
        this.options.push(option);
        return this;
    }
    alias(name) {
        this.aliasNames.push(name);
        return this;
    }
    action(callback) {
        this.commandAction = callback;
        return this;
    }
    isMatched(name) {
        return this.name === name || this.aliasNames.includes(name);
    }
    get isDefaultCommand() {
        return "" === this.name || this.aliasNames.includes("!");
    }
    get isGlobalCommand() {
        return this instanceof GlobalCommand;
    }
    hasOption(name) {
        name = name.split(".")[0];
        return this.options.find((option)=>option.names.includes(name));
    }
    outputHelp() {
        const { name, commands } = this.cli;
        const { versionNumber, options: globalOptions, helpCallback } = this.cli.globalCommand;
        let sections = [
            {
                body: `${name}${versionNumber ? `/${versionNumber}` : ""}`
            }
        ];
        sections.push({
            title: "Usage",
            body: `  $ ${name} ${this.usageText || this.rawName}`
        });
        if ((this.isGlobalCommand || this.isDefaultCommand) && commands.length > 0) {
            const longestCommandName = findLongest(commands.map((command)=>command.rawName));
            sections.push({
                title: "Commands",
                body: commands.map((command)=>`  ${padRight(command.rawName, longestCommandName.length)}  ${command.description}`).join("\n")
            }, {
                title: "For more info, run any command with the `--help` flag",
                body: commands.map((command)=>`  $ ${name}${"" === command.name ? "" : ` ${command.name}`} --help`).join("\n")
            });
        }
        let options = this.isGlobalCommand ? globalOptions : [
            ...this.options,
            ...globalOptions || []
        ];
        if (!this.isGlobalCommand && !this.isDefaultCommand) options = options.filter((option)=>"version" !== option.name);
        if (options.length > 0) {
            const longestOptionName = findLongest(options.map((option)=>option.rawName));
            sections.push({
                title: "Options",
                body: options.map((option)=>`  ${padRight(option.rawName, longestOptionName.length)}  ${option.description} ${void 0 === option.config.default ? "" : `(default: ${option.config.default})`}`).join("\n")
            });
        }
        if (this.examples.length > 0) sections.push({
            title: "Examples",
            body: this.examples.map((example)=>{
                if ("function" == typeof example) return example(name);
                return example;
            }).join("\n")
        });
        if (helpCallback) sections = helpCallback(sections) || sections;
        console.info(sections.map((section)=>section.title ? `${section.title}:\n${section.body}` : section.body).join("\n\n"));
    }
    outputVersion() {
        const { name } = this.cli;
        const { versionNumber } = this.cli.globalCommand;
        if (versionNumber) console.info(`${name}/${versionNumber} ${runtimeInfo}`);
    }
    checkRequiredArgs() {
        const minimalArgsCount = this.args.filter((arg)=>arg.required).length;
        if (this.cli.args.length < minimalArgsCount) throw new CACError(`missing required args for command \`${this.rawName}\``);
    }
    checkUnknownOptions() {
        const { options, globalCommand } = this.cli;
        if (!this.config.allowUnknownOptions) {
            for (const name of Object.keys(options))if ("--" !== name && !this.hasOption(name) && !globalCommand.hasOption(name)) throw new CACError(`Unknown option \`${name.length > 1 ? `--${name}` : `-${name}`}\``);
        }
    }
    checkOptionValue() {
        const { options: parsedOptions, globalCommand } = this.cli;
        const options = [
            ...globalCommand.options,
            ...this.options
        ];
        for (const option of options){
            const value = parsedOptions[option.name.split(".")[0]];
            if (option.required) {
                const hasNegated = options.some((o)=>o.negated && o.names.includes(option.name));
                if (true === value || false === value && !hasNegated) throw new CACError(`option \`${option.rawName}\` value is missing`);
            }
        }
    }
    checkUnusedArgs() {
        const maximumArgsCount = this.args.some((arg)=>arg.variadic) ? 1 / 0 : this.args.length;
        if (maximumArgsCount < this.cli.args.length) throw new CACError(`Unused args: ${this.cli.args.slice(maximumArgsCount).map((arg)=>`\`${arg}\``).join(", ")}`);
    }
};
var GlobalCommand = class extends Command {
    constructor(cli){
        super("@@global@@", "", {}, cli);
    }
};
var CAC = class extends EventTarget {
    name;
    commands;
    globalCommand;
    matchedCommand;
    matchedCommandName;
    rawArgs;
    args;
    options;
    showHelpOnExit;
    showVersionOnExit;
    constructor(name = ""){
        super();
        this.name = name;
        this.commands = [];
        this.rawArgs = [];
        this.args = [];
        this.options = {};
        this.globalCommand = new GlobalCommand(this);
        this.globalCommand.usage("<command> [options]");
    }
    usage(text) {
        this.globalCommand.usage(text);
        return this;
    }
    command(rawName, description, config) {
        const command = new Command(rawName, description || "", config, this);
        command.globalCommand = this.globalCommand;
        this.commands.push(command);
        return command;
    }
    option(rawName, description, config) {
        this.globalCommand.option(rawName, description, config);
        return this;
    }
    help(callback) {
        this.globalCommand.option("-h, --help", "Display this message");
        this.globalCommand.helpCallback = callback;
        this.showHelpOnExit = true;
        return this;
    }
    version(version, customFlags = "-v, --version") {
        this.globalCommand.version(version, customFlags);
        this.showVersionOnExit = true;
        return this;
    }
    example(example) {
        this.globalCommand.example(example);
        return this;
    }
    outputHelp() {
        if (this.matchedCommand) this.matchedCommand.outputHelp();
        else this.globalCommand.outputHelp();
    }
    outputVersion() {
        this.globalCommand.outputVersion();
    }
    setParsedInfo({ args, options }, matchedCommand, matchedCommandName) {
        this.args = args;
        this.options = options;
        if (matchedCommand) this.matchedCommand = matchedCommand;
        if (matchedCommandName) this.matchedCommandName = matchedCommandName;
        return this;
    }
    unsetMatchedCommand() {
        this.matchedCommand = void 0;
        this.matchedCommandName = void 0;
    }
    parse(argv, { run = true } = {}) {
        if (!argv) {
            if (!runtimeProcessArgs) throw new Error("No argv provided and runtime process argv is not available.");
            argv = runtimeProcessArgs;
        }
        this.rawArgs = argv;
        if (!this.name) this.name = argv[1] ? getFileName(argv[1]) : "cli";
        let shouldParse = true;
        for (const command of this.commands){
            const parsed = this.mri(argv.slice(2), command);
            const commandName = parsed.args[0];
            if (command.isMatched(commandName)) {
                shouldParse = false;
                const parsedInfo = {
                    ...parsed,
                    args: parsed.args.slice(1)
                };
                this.setParsedInfo(parsedInfo, command, commandName);
                this.dispatchEvent(new CustomEvent(`command:${commandName}`, {
                    detail: command
                }));
            }
        }
        if (shouldParse) {
            for (const command of this.commands)if (command.isDefaultCommand) {
                shouldParse = false;
                const parsed = this.mri(argv.slice(2), command);
                this.setParsedInfo(parsed, command);
                this.dispatchEvent(new CustomEvent("command:!", {
                    detail: command
                }));
            }
        }
        if (shouldParse) {
            const parsed = this.mri(argv.slice(2));
            this.setParsedInfo(parsed);
        }
        if (this.options.help && this.showHelpOnExit) {
            this.outputHelp();
            run = false;
            this.unsetMatchedCommand();
        }
        if (this.options.version && this.showVersionOnExit && null == this.matchedCommandName) {
            this.outputVersion();
            run = false;
            this.unsetMatchedCommand();
        }
        const parsedArgv = {
            args: this.args,
            options: this.options
        };
        if (run) this.runMatchedCommand();
        if (!this.matchedCommand && this.args[0]) this.dispatchEvent(new CustomEvent("command:*", {
            detail: this.args[0]
        }));
        return parsedArgv;
    }
    mri(argv, command) {
        const cliOptions = [
            ...this.globalCommand.options,
            ...command ? command.options : []
        ];
        const mriOptions = getMriOptions(cliOptions);
        let argsAfterDoubleDashes = [];
        const doubleDashesIndex = argv.indexOf("--");
        if (-1 !== doubleDashesIndex) {
            argsAfterDoubleDashes = argv.slice(doubleDashesIndex + 1);
            argv = argv.slice(0, doubleDashesIndex);
        }
        let parsed = lib_default(argv, mriOptions);
        parsed = Object.keys(parsed).reduce((res, name)=>({
                ...res,
                [camelcaseOptionName(name)]: parsed[name]
            }), {
            _: []
        });
        const args = parsed._;
        const options = {
            "--": argsAfterDoubleDashes
        };
        const ignoreDefault = command && command.config.ignoreOptionDefaultValue ? command.config.ignoreOptionDefaultValue : this.globalCommand.config.ignoreOptionDefaultValue;
        const transforms = Object.create(null);
        for (const cliOption of cliOptions){
            if (!ignoreDefault && void 0 !== cliOption.config.default) for (const name of cliOption.names)options[name] = cliOption.config.default;
            if (Array.isArray(cliOption.config.type) && void 0 === transforms[cliOption.name]) {
                transforms[cliOption.name] = Object.create(null);
                transforms[cliOption.name].shouldTransform = true;
                transforms[cliOption.name].transformFunction = cliOption.config.type[0];
            }
        }
        for (const key of Object.keys(parsed))if ("_" !== key) {
            setDotProp(options, key.split("."), parsed[key]);
            setByType(options, transforms);
        }
        return {
            args,
            options
        };
    }
    runMatchedCommand() {
        const { args, options, matchedCommand: command } = this;
        if (!command || !command.commandAction) return;
        command.checkUnknownOptions();
        command.checkOptionValue();
        command.checkRequiredArgs();
        command.checkUnusedArgs();
        const actionArgs = [];
        command.args.forEach((arg, index)=>{
            if (arg.variadic) actionArgs.push(args.slice(index));
            else actionArgs.push(args[index]);
        });
        actionArgs.push(options);
        return command.commandAction.apply(this, actionArgs);
    }
};
const cac = (name = "")=>new CAC(name);
const picomatch = __webpack_require__("../../node_modules/.pnpm/picomatch@4.0.4/node_modules/picomatch/index.js");
var picomatch_default = /*#__PURE__*/ __webpack_require__.n(picomatch);
const runtimeOptionDefinitions = [
    [
        '-c, --config <config>',
        'Specify the configuration file, can be a relative or absolute path'
    ],
    [
        '--config-loader <loader>',
        'Specify the loader to load the config file (auto | jiti | native)',
        {
            default: 'auto'
        }
    ],
    [
        '-r, --root <root>',
        'Specify the project root directory, can be an absolute path or a path relative to cwd'
    ],
    [
        '--related',
        'Treat positional arguments as source file paths and run only related tests'
    ],
    [
        '--findRelatedTests',
        'Alias for --related for Jest compatibility'
    ],
    [
        '--changed [commit]',
        'Run tests related to changed files in the current Git repository, optionally since a commit'
    ],
    [
        '--globals',
        'Provide global APIs'
    ],
    [
        '--isolate',
        'Run tests in an isolated environment'
    ],
    [
        '--include <include>',
        'Match test files'
    ],
    [
        '--exclude <exclude>',
        'Exclude files from test'
    ],
    [
        '-u, --update',
        'Update snapshot files'
    ],
    [
        '--coverage',
        'Enable code coverage collection'
    ],
    [
        '--coverage.enabled',
        'Enable code coverage collection'
    ],
    [
        '--coverage.provider <provider>',
        'Coverage provider to use (istanbul | v8)'
    ],
    [
        '--coverage.reporters <reporter>',
        'Coverage reporter to use (repeat the flag for multiple reporters)'
    ],
    [
        '--coverage.changed [commit]',
        'Collect coverage only for changed files, optionally since a commit'
    ],
    [
        '--coverage.include <pattern>',
        'Include files for coverage collection'
    ],
    [
        '--coverage.exclude <pattern>',
        'Exclude files from coverage collection'
    ],
    [
        '--coverage.reportsDirectory <dir>',
        'Directory to store coverage reports'
    ],
    [
        '--coverage.reportOnFailure',
        'Generate coverage reports even when tests fail'
    ],
    [
        '--coverage.clean',
        'Clean the coverage directory before running tests'
    ],
    [
        '--coverage.allowExternal',
        'Collect coverage for files outside the project root directory'
    ],
    [
        '--project <name>',
        'Run only projects that match the name, can be a full name or wildcards pattern'
    ],
    [
        '--passWithNoTests',
        'Allows the test suite to pass when no files are found'
    ],
    [
        '--silent [value]',
        'Silence intercepted test console output (true | false | passed-only)'
    ],
    [
        '--printConsoleTrace',
        'Print console traces when calling any console method'
    ],
    [
        '--disableConsoleIntercept',
        'Disable console intercept'
    ],
    [
        '--logHeapUsage',
        'Log heap usage after each test'
    ],
    [
        '--detectAsyncLeaks',
        'Detect async resources that leak after tests finish'
    ],
    [
        '--trace',
        'Dump a Perfetto-compatible performance trace JSON file, plus a ranked markdown timing summary printed to the terminal and written next to it'
    ],
    [
        '--slowTestThreshold <value>',
        'The number of milliseconds after which a test or suite is considered slow'
    ],
    [
        '--reporters, --reporter <name>',
        'Specify the reporter(s) to use'
    ],
    [
        '-t, --testNamePattern <value>',
        'Run only tests with a name that matches the regex'
    ],
    [
        '--testEnvironment <name>',
        'The environment that will be used for testing'
    ],
    [
        '--testTimeout <value>',
        'Timeout of a test in milliseconds'
    ],
    [
        '--hookTimeout <value>',
        'Timeout of hook in milliseconds'
    ],
    [
        '--hideSkippedTests',
        'Hide skipped tests from the output'
    ],
    [
        '--hideSkippedTestFiles',
        'Hide skipped test files from the output'
    ],
    [
        '--retry <retry>',
        'Number of times to retry a test if it fails'
    ],
    [
        '--bail [number]',
        'Stop running tests after n failures. Set to 0 to run all tests regardless of failures'
    ],
    [
        '--shard <index/count>',
        'Split tests into several shards. This is useful for running tests in parallel on multiple machines.'
    ],
    [
        '--maxConcurrency <value>',
        'Maximum number of concurrent tests'
    ],
    [
        '--clearMocks',
        'Automatically clear mock calls, instances, contexts and results before every test'
    ],
    [
        '--resetMocks',
        'Automatically reset mock state before every test'
    ],
    [
        '--restoreMocks',
        'Automatically restore mock state and implementation before every test'
    ],
    [
        '--browser',
        'Run tests in browser mode'
    ],
    [
        '--browser.enabled',
        'Run tests in browser mode'
    ],
    [
        '--browser.name <name>',
        'Browser to use: chromium, firefox, webkit (default: chromium)'
    ],
    [
        '--browser.headless',
        'Run browser in headless mode (default: true in CI)'
    ],
    [
        '--browser.port <port>',
        'Port for the browser mode dev server'
    ],
    [
        '--browser.strictPort',
        'Exit if the specified port is already in use'
    ],
    [
        '--unstubGlobals',
        'Restores all global variables that were changed with `rstest.stubGlobal` before every test'
    ],
    [
        '--unstubEnvs',
        'Restores all runtime env values that were changed with `rstest.stubEnv` before every test'
    ],
    [
        '--includeTaskLocation',
        'Collect test and suite locations. This might increase the running time.'
    ],
    [
        '--source.*',
        'Internal parser helper for source.* options'
    ],
    [
        '--source.tsconfigPath <path>',
        'Path to the tsconfig.json file'
    ],
    [
        '--dev.*',
        'Internal parser helper for dev.* options'
    ],
    [
        '--dev.writeToDisk',
        'Write test temporary files to disk'
    ],
    [
        '--output.*',
        'Internal parser helper for output.* options'
    ],
    [
        '--output.emitAssets',
        'Emit imported static assets'
    ],
    [
        '--output.cleanDistPath',
        'Clean test temporary files before the test starts'
    ],
    [
        '--output.module',
        'Output JavaScript files in ES module format'
    ]
];
const poolOptionDefinitions = [
    [
        '--pool <type>',
        'Shorthand for --pool.type'
    ],
    [
        '--pool.type <type>',
        'Specify the test pool type (forks | threads)'
    ],
    [
        '--pool.maxWorkers <value>',
        'Maximum number or percentage of workers (e.g. 4 or 50%)'
    ],
    [
        '--pool.minWorkers <value>',
        'Minimum number or percentage of workers (e.g. 1 or 25%)'
    ],
    [
        '--pool.execArgv <arg>',
        'Additional Node.js execArgv passed to worker processes (can be specified multiple times)'
    ]
];
const mergeReportsOptionDefinitions = [
    [
        '-c, --config <config>',
        'Specify the configuration file, can be a relative or absolute path'
    ],
    [
        '--config-loader <loader>',
        'Specify the loader to load the config file (auto | jiti | native)',
        {
            default: 'auto'
        }
    ],
    [
        '-r, --root <root>',
        'Specify the project root directory, can be an absolute path or a path relative to cwd'
    ],
    [
        '--coverage',
        'Enable code coverage collection'
    ],
    [
        '--reporters, --reporter <name>',
        'Specify the reporter(s) to use'
    ],
    [
        '--cleanup',
        'Remove blob reports directory after merging'
    ]
];
const hiddenPassthroughOptionDefinitions = [
    [
        '--isolate',
        'Run tests in an isolated environment'
    ]
];
const listCommandOptionDefinitions = [
    [
        '--filesOnly',
        'only list the test files'
    ],
    [
        '--json [boolean/path]',
        'print tests as JSON or write to a file'
    ],
    [
        '--includeSuites',
        'include suites in output'
    ],
    [
        '--printLocation',
        'print test case location'
    ],
    [
        '--summary',
        'print a summary after the list'
    ]
];
const applyOptions = (command, definitions)=>{
    for (const [rawName, description, config] of definitions)command.option(rawName, description, config);
};
const applyRuntimeCommandOptions = (command)=>{
    applyOptions(command, runtimeOptionDefinitions);
    applyOptions(command, poolOptionDefinitions);
};
const valueTakingOptionNames = (definitions)=>{
    const names = new Set();
    for (const group of definitions)for (const [rawName] of group){
        const lt = rawName.indexOf('<');
        const sq = rawName.indexOf('[');
        if (lt < 0 && sq < 0) continue;
        const tokenAt = lt < 0 ? sq : sq < 0 ? lt : Math.min(lt, sq);
        for (const alias of rawName.slice(0, tokenAt).split(',')){
            const trimmed = alias.trim();
            if (trimmed) names.add(trimmed);
        }
    }
    return names;
};
const requiredDotOptionNames = (definitions)=>{
    const names = new Set();
    for (const group of definitions)for (const [rawName] of group){
        const tokenAt = rawName.indexOf('<');
        if (!(tokenAt < 0)) for (const alias of rawName.slice(0, tokenAt).split(',')){
            const trimmed = alias.trim();
            if (trimmed.includes('.')) names.add(trimmed);
        }
    }
    return names;
};
const commands_commands = new Set([
    'init',
    'list',
    'merge-reports',
    'run',
    'watch'
]);
const valueTakingOptions = valueTakingOptionNames([
    runtimeOptionDefinitions,
    poolOptionDefinitions,
    mergeReportsOptionDefinitions,
    hiddenPassthroughOptionDefinitions,
    listCommandOptionDefinitions
]);
const requiredDotOptions = requiredDotOptionNames([
    runtimeOptionDefinitions,
    poolOptionDefinitions,
    mergeReportsOptionDefinitions,
    hiddenPassthroughOptionDefinitions,
    listCommandOptionDefinitions
]);
const hasMissingRequiredOptionValue = (value)=>true === value || false === value || Array.isArray(value) && value.some(hasMissingRequiredOptionValue);
const validateRequiredDotOptionValues = (cli)=>{
    for (const option of [
        ...cli.globalCommand.options,
        ...cli.matchedCommand?.options ?? []
    ]){
        if (!option.required || !requiredDotOptions.has(`--${option.name}`)) continue;
        const [root, ...path] = option.name.split('.');
        if (!root) continue;
        const value = path.reduce((target, key)=>{
            if ('object' != typeof target || null === target) return;
            return target[key];
        }, cli.options[root]);
        if (hasMissingRequiredOptionValue(value)) throw new Error(`option \`${option.rawName}\` value is missing`);
    }
};
const getCliCommand = (argv)=>{
    for(let index = 2; index < argv.length; index++){
        const arg = argv[index];
        if ('--' === arg) break;
        if (!arg) continue;
        if (commands_commands.has(arg)) return arg;
        if (!arg.startsWith('-')) break;
        const optionName = arg.split('=', 1)[0];
        if (optionName && arg === optionName && valueTakingOptions.has(optionName) && argv[index + 1] && !argv[index + 1].startsWith('-')) index++;
    }
};
const normalizeCoverageCliArgs = (argv)=>{
    const command = getCliCommand(argv);
    if ('init' === command || 'merge-reports' === command) return argv;
    return argv.map((arg)=>{
        if ('--coverage' === arg) return '--coverage.enabled';
        if (arg.startsWith('--coverage=')) return `--coverage.enabled=${arg.slice(11)}`;
        if ('--no-coverage' === arg) return '--coverage.enabled=false';
        return arg;
    });
};
const normalizePoolCliArgs = (argv)=>{
    const hasPoolNestedOption = argv.some((arg)=>arg.startsWith('--pool.'));
    if (!hasPoolNestedOption) return argv;
    return argv.map((arg)=>{
        if ('--pool' === arg) return '--pool.type';
        if (arg.startsWith('--pool=')) return `--pool.type=${arg.slice(7)}`;
        return arg;
    });
};
const normalizeBrowserCliArgs = (argv)=>{
    const hasBrowserNestedOption = argv.some((arg)=>arg.startsWith('--browser.'));
    if (!hasBrowserNestedOption) return argv;
    return argv.map((arg)=>{
        if ('--browser' === arg) return '--browser.enabled';
        if (arg.startsWith('--browser=')) return `--browser.enabled=${arg.slice(10)}`;
        if ('--no-browser' === arg) return '--browser.enabled=false';
        return arg;
    });
};
const normalizeCliArgs = (argv)=>normalizePoolCliArgs(normalizeBrowserCliArgs(normalizeCoverageCliArgs(argv)));
const allowedWildcardOptions = {
    source: new Set([
        'tsconfigPath'
    ]),
    dev: new Set([
        'writeToDisk'
    ]),
    output: new Set([
        'emitAssets',
        'cleanDistPath',
        'module'
    ])
};
const validateWildcardOptions = (options)=>{
    for (const [name, allowedOptions] of Object.entries(allowedWildcardOptions)){
        const value = options[name];
        if (void 0 !== value) {
            if ('object' != typeof value || null === value || Array.isArray(value)) throw new Error(`Unknown option \`--${name}\``);
            for (const [key, optionValue] of Object.entries(value)){
                if (!allowedOptions.has(key)) throw new Error(`Unknown option \`--${name}.${key}\``);
                if ('object' == typeof optionValue && null !== optionValue && !Array.isArray(optionValue)) {
                    const nestedKey = Object.keys(optionValue)[0];
                    throw new Error(`Unknown option \`--${name}.${key}${nestedKey ? `.${nestedKey}` : ''}\``);
                }
            }
        }
    }
};
const normalizeMixedCliOptions = (cli)=>{
    const originalParse = cli.parse.bind(cli);
    cli.parse = (argv, options)=>{
        const run = options?.run !== false;
        const parsed = originalParse(normalizeCliArgs(argv ?? process.argv), {
            ...options,
            run: false
        });
        validateWildcardOptions(parsed.options);
        validateRequiredDotOptionValues(cli);
        if (run) cli.runMatchedCommand();
        return parsed;
    };
};
const filterHelpOptions = (sections, hiddenOptionPrefixes)=>sections.map((section)=>{
        if ('Options' !== section.title) return section;
        return {
            ...section,
            body: section.body.split('\n').filter((line)=>!hiddenOptionPrefixes.some((prefix)=>line.trimStart().startsWith(prefix))).join('\n')
        };
    });
const handleUnexpectedExit = (rstest, err)=>{
    for (const reporter of rstest?.context.reporters || [])reporter.onExit?.();
    logger_logger.error('Failed to run Rstest.');
    logger_logger.error(formatError(err));
    process.exit(1);
};
const resolveCliRuntime = async (options)=>{
    const [{ initCli }, { createRstest }] = await Promise.all([
        import("./7661.js").then((m)=>m.init_namespaceObject),
        import("./7661.js").then((m)=>m.core_namespaceObject)
    ]);
    const { config, configFilePath, projects } = await initCli(options);
    return {
        config,
        configFilePath,
        projects,
        createRstest
    };
};
const normalizeCliFilters = (filters)=>filters.map((filter)=>normalize(String(filter)));
const isRelatedRun = (options)=>true === options.related || true === options.findRelatedTests || void 0 !== options.changed;
const validateRelatedCliOptions = (options)=>{
    const relatedOptionCount = [
        true === options.related,
        true === options.findRelatedTests,
        void 0 !== options.changed
    ].filter(Boolean).length;
    if (relatedOptionCount > 1) throw new Error('Options `--related`, `--findRelatedTests`, and `--changed` cannot be used together.');
};
const formatGitError = (error)=>{
    if (error instanceof Error) {
        if ('code' in error && 'ENOENT' === error.code) return 'Git is not installed or not available on PATH.';
        const stderr = 'stderr' in error ? error.stderr : void 0;
        if ('string' == typeof stderr && stderr.trim()) return stderr.trim().split('\n')[0];
        if (error.message) return error.message;
    }
};
const getForceRerunTriggers = ({ rootTriggers, projects })=>Array.from(new Set([
        ...rootTriggers,
        ...projects.flatMap((project)=>project.normalizedConfig.forceRerunTriggers)
    ]));
const getForceRerunTriggerFiles = ({ changedFiles, triggers, rootPath })=>{
    if (!triggers.length || !changedFiles.length) return [];
    const matcher = picomatch_default()(triggers.map((trigger)=>normalize(trigger)), {
        windows: true
    });
    return changedFiles.filter((file)=>matcher(normalize(relative(rootPath, file))) || matcher(normalize(file)));
};
const resolveChangedFiles = async (cwd, since)=>{
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execFileAsync = promisify(execFile);
    const normalizedCwd = normalize(cwd);
    const runGit = async (args, gitCwd = cwd)=>{
        const { stdout } = await execFileAsync('git', args, {
            cwd: gitCwd,
            encoding: 'utf8',
            maxBuffer: 10485760
        });
        return stdout;
    };
    const resolveGitRoot = async ()=>{
        const cdup = await runGit([
            'rev-parse',
            '--show-cdup'
        ]);
        return normalize(pathe_M_eThtNZ_resolve(cwd, cdup.trim()));
    };
    const git = async (args, gitRoot)=>{
        const stdout = await runGit(args, gitRoot);
        return stdout.split('\0').filter(Boolean).map((file)=>normalize(pathe_M_eThtNZ_resolve(gitRoot, file)));
    };
    try {
        const gitRoot = await resolveGitRoot();
        const [committedFiles, stagedFiles, unstagedFiles] = await Promise.all([
            since ? git([
                'diff',
                '--name-only',
                '-z',
                '--diff-filter=ACMRTUXB',
                `${since}...HEAD`
            ], gitRoot) : [],
            git([
                'diff',
                '--name-only',
                '-z',
                '--cached',
                '--diff-filter=ACMRTUXB'
            ], gitRoot),
            git([
                'ls-files',
                '-z',
                '--others',
                '--modified',
                '--exclude-standard'
            ], gitRoot)
        ]);
        return Array.from(new Set([
            ...committedFiles,
            ...stagedFiles,
            ...unstagedFiles
        ])).sort();
    } catch (error) {
        const reason = formatGitError(error);
        throw new Error(`Failed to resolve changed files for \`--changed\` from ${normalizedCwd}. Make sure the current root is inside a Git repository.${reason ? ` Git error: ${reason}` : ''}`, {
            cause: error
        });
    }
};
const getCoverageChangedOption = (options)=>{
    if (void 0 === options.coverage || 'boolean' == typeof options.coverage) return;
    return options.coverage.changed;
};
const resolveEffectiveCliFilters = async ({ options, filters, createRstest, config, configFilePath, projects })=>{
    const normalizedFilters = normalizeCliFilters(filters);
    if (!isRelatedRun(options)) return {
        effectiveFilters: normalizedFilters,
        fileFilterMode: 'fuzzy'
    };
    validateRelatedCliOptions(options);
    if (void 0 !== options.changed && normalizedFilters.length > 0) throw new Error('The `--changed` option cannot be used with positional filters.');
    const { resolveRelatedTestFiles } = await import("./0~related.js");
    const rstest = createRstest({
        config,
        configFilePath,
        projects
    }, 'list', []);
    const sourceFilters = void 0 !== options.changed ? await resolveChangedFiles(rstest.context.rootPath, 'string' == typeof options.changed ? options.changed : void 0) : normalizedFilters;
    const forceRerunTriggerFiles = void 0 !== options.changed ? getForceRerunTriggerFiles({
        changedFiles: sourceFilters,
        triggers: getForceRerunTriggers({
            rootTriggers: rstest.context.normalizedConfig.forceRerunTriggers,
            projects: rstest.context.projects
        }),
        rootPath: rstest.context.rootPath
    }) : [];
    if (forceRerunTriggerFiles.length) return {
        effectiveFilters: [],
        fileFilterMode: 'fuzzy',
        relatedFilters: sourceFilters,
        relatedMode: 'changed',
        relatedResolutionEmpty: false,
        relatedRerunReason: 'forceRerunTrigger',
        relatedRerunFiles: forceRerunTriggerFiles.map((file)=>normalize(relative(rstest.context.rootPath, file)))
    };
    const relatedFiles = await resolveRelatedTestFiles(rstest.context, {
        sourceFilters,
        filterLabel: void 0 !== options.changed ? '--changed' : '--related',
        allowEmpty: void 0 !== options.changed
    });
    const coverageChanged = getCoverageChangedOption(options);
    return {
        effectiveFilters: relatedFiles,
        fileFilterMode: 'exact',
        relatedFilters: sourceFilters,
        relatedMode: void 0 !== options.changed ? 'changed' : 'related',
        relatedResolutionEmpty: 0 === relatedFiles.length,
        changedCoverageFilters: void 0 !== options.changed && void 0 === coverageChanged ? sourceFilters : void 0
    };
};
const resolveCoverageChangedFilters = async (rstest)=>{
    const { changed } = rstest.context.normalizedConfig.coverage;
    if (void 0 === changed) return rstest.context.changedCoverageFilters;
    if (false === changed) return;
    try {
        return await resolveChangedFiles(rstest.context.rootPath, 'string' == typeof changed ? changed : void 0);
    } catch (error) {
        const reason = formatGitError(error);
        logger_logger.warn(`Failed to resolve changed files for \`coverage.changed\`, falling back to full coverage.${reason ? ` Git error: ${reason}` : ''}`);
        return;
    }
};
const runRest = async ({ options, filters, command })=>{
    let rstest;
    const unexpectedlyExitHandler = (err)=>{
        handleUnexpectedExit(rstest, err);
    };
    try {
        const { config, configFilePath, projects, createRstest } = await resolveCliRuntime(options);
        const { effectiveFilters, fileFilterMode, relatedFilters, relatedMode, relatedResolutionEmpty, changedCoverageFilters, relatedRerunReason, relatedRerunFiles } = await resolveEffectiveCliFilters({
            options,
            filters,
            createRstest,
            config,
            configFilePath,
            projects
        });
        rstest = createRstest({
            config,
            configFilePath,
            projects,
            trace: options.trace
        }, command, effectiveFilters, fileFilterMode);
        rstest.context.relatedFilters = relatedFilters;
        rstest.context.relatedMode = relatedMode;
        rstest.context.relatedResolutionEmpty = relatedResolutionEmpty;
        rstest.context.changedCoverageFilters = changedCoverageFilters;
        rstest.context.changedCoverageFilters = await resolveCoverageChangedFilters(rstest);
        rstest.context.relatedRerunReason = relatedRerunReason;
        rstest.context.relatedRerunFiles = relatedRerunFiles;
        rstest.context.relatedRerunReason = relatedRerunReason;
        rstest.context.relatedRerunFiles = relatedRerunFiles;
        process.on('uncaughtException', unexpectedlyExitHandler);
        process.on('unhandledRejection', unexpectedlyExitHandler);
        if ('watch' === command) {
            const { watchFilesForRestart, onBeforeRestart } = await import("./0~restart.js");
            onBeforeRestart(()=>{
                process.off('uncaughtException', unexpectedlyExitHandler);
                process.off('unhandledRejection', unexpectedlyExitHandler);
            });
            watchFilesForRestart({
                rstest,
                options,
                filters
            });
        }
        await rstest.runTests();
    } catch (err) {
        handleUnexpectedExit(rstest, err);
    }
};
function createCli() {
    const cli = cac('rstest');
    cli.help((sections)=>{
        switch(cli.matchedCommand?.name){
            case 'init':
            case 'merge-reports':
                return filterHelpOptions(sections, [
                    '--isolate'
                ]);
            default:
                return filterHelpOptions(sections, [
                    '--source.*',
                    '--dev.*',
                    '--output.*'
                ]);
        }
    });
    cli.version("0.10.4");
    const defaultCommand = cli.command('[...filters]', 'run tests').option('-w, --watch', 'Run tests in watch mode');
    applyRuntimeCommandOptions(defaultCommand);
    defaultCommand.action(async (filters, options)=>{
        if (!determineAgent().isAgent) showRstest();
        if (options.watch) await runRest({
            options,
            filters,
            command: 'watch'
        });
        else await runRest({
            options,
            filters,
            command: 'run'
        });
    });
    const runCommand = cli.command('run [...filters]', 'run tests without watch mode');
    applyRuntimeCommandOptions(runCommand);
    runCommand.action(async (filters, options)=>{
        if (!determineAgent().isAgent) showRstest();
        await runRest({
            options,
            filters,
            command: 'run'
        });
    });
    const watchCommand = cli.command('watch [...filters]', 'run tests in watch mode');
    applyRuntimeCommandOptions(watchCommand);
    watchCommand.action(async (filters, options)=>{
        if (!determineAgent().isAgent) showRstest();
        await runRest({
            options,
            filters,
            command: 'watch'
        });
    });
    const listCommand = cli.command('list [...filters]', 'lists all test files that Rstest will run');
    applyRuntimeCommandOptions(listCommand);
    applyOptions(listCommand, listCommandOptionDefinitions);
    listCommand.action(async (filters, options)=>{
        try {
            const { config, configFilePath, projects, createRstest } = await resolveCliRuntime(options);
            if (options.printLocation) config.includeTaskLocation = true;
            const { effectiveFilters, fileFilterMode, relatedFilters, relatedMode, relatedResolutionEmpty, changedCoverageFilters, relatedRerunReason, relatedRerunFiles } = await resolveEffectiveCliFilters({
                options,
                filters,
                createRstest,
                config,
                configFilePath,
                projects
            });
            const rstest = createRstest({
                config,
                configFilePath,
                projects
            }, 'list', effectiveFilters, fileFilterMode);
            rstest.context.relatedFilters = relatedFilters;
            rstest.context.relatedMode = relatedMode;
            rstest.context.relatedResolutionEmpty = relatedResolutionEmpty;
            rstest.context.changedCoverageFilters = changedCoverageFilters;
            rstest.context.changedCoverageFilters = await resolveCoverageChangedFilters(rstest);
            rstest.context.relatedRerunReason = relatedRerunReason;
            rstest.context.relatedRerunFiles = relatedRerunFiles;
            rstest.context.relatedRerunReason = relatedRerunReason;
            rstest.context.relatedRerunFiles = relatedRerunFiles;
            await rstest.listTests({
                filesOnly: options.filesOnly,
                json: options.json,
                includeSuites: options.includeSuites,
                printLocation: options.printLocation,
                summary: options.summary
            });
        } catch (err) {
            logger_logger.error('Failed to run Rstest list.');
            logger_logger.error(formatError(err));
            process.exit(1);
        }
    });
    const mergeReportsCommand = cli.command('merge-reports [path]', 'Merge blob reports from multiple shards into a unified report');
    applyOptions(mergeReportsCommand, mergeReportsOptionDefinitions);
    applyOptions(mergeReportsCommand, hiddenPassthroughOptionDefinitions);
    mergeReportsCommand.action(async (path, options)=>{
        if (!determineAgent().isAgent) showRstest();
        try {
            const { config, configFilePath, projects, createRstest } = await resolveCliRuntime(options);
            const rstest = createRstest({
                config,
                configFilePath,
                projects
            }, 'merge-reports', []);
            await rstest.mergeReports({
                path,
                cleanup: options.cleanup
            });
        } catch (err) {
            logger_logger.error('Failed to merge reports.');
            logger_logger.error(formatError(err));
            process.exit(1);
        }
    });
    cli.command('init [project]', 'Initialize rstest configuration').option('--yes', 'Use default options (non-interactive)').option('--isolate', 'Run tests in an isolated environment').action(async (project, options)=>{
        try {
            let selectedProject = project;
            if (!selectedProject) {
                const { select, isCancel } = await import("./0~@clack/prompts.js");
                console.log();
                const selected = await select({
                    message: 'What would you like to initialize?',
                    options: [
                        {
                            value: 'browser',
                            label: 'browser',
                            hint: 'Browser mode for component testing'
                        }
                    ]
                });
                if (isCancel(selected)) {
                    console.log(logger_color.yellow('Operation cancelled.'));
                    process.exit(0);
                }
                selectedProject = selected;
            }
            if ('browser' === selectedProject) {
                const { create } = await import("./0~browser~1.js");
                await create({
                    yes: options.yes
                });
            } else {
                logger_logger.error(`Unknown project type: "${selectedProject}". Available: browser`);
                process.exit(1);
            }
        } catch (err) {
            logger_logger.error('Failed to initialize rstest.');
            logger_logger.error(formatError(err));
            process.exit(1);
        }
    });
    normalizeMixedCliOptions(cli);
    return cli;
}
function setupCommands() {
    const cli = createCli();
    cli.parse(process.argv);
}
export { runRest, setupCommands };
