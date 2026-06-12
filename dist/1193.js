import "node:module";
import node_fs, { closeSync, existsSync, openSync, readSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import node_process, { cwd as external_node_process_cwd } from "node:process";
import { basename, delimiter, dirname, normalize, resolve } from "node:path";
import { spawn } from "node:child_process";
import { pipeline } from "node:stream/promises";
import { PassThrough } from "node:stream";
import node_readline from "node:readline";
import { detect } from "./506.js";
import { color as logger_color, logger as logger_logger, isTTY } from "./2366.js";
const h = /^path$/i;
const g = {
    key: "PATH",
    value: ""
};
function _(e) {
    for(const t in e){
        if (!Object.prototype.hasOwnProperty.call(e, t) || !h.test(t)) continue;
        const n = e[t];
        if (!n) break;
        return {
            key: t,
            value: n
        };
    }
    return g;
}
function v(e, t) {
    const n = t.value.split(delimiter);
    const r = [];
    let o = e;
    let c;
    do {
        r.push(resolve(o, "node_modules", ".bin"));
        c = o;
        o = dirname(o);
    }while (o !== c);
    r.push(dirname(process.execPath));
    const l = r.concat(n).join(delimiter);
    return {
        key: t.key,
        value: l
    };
}
function y(e, t, n = true) {
    const r = {
        ...process.env,
        ...t
    };
    if (!n) return r;
    const i = v(e, _(r));
    r[i.key] = i.value;
    return r;
}
const b = (e)=>{
    let t = e.length;
    const n = new PassThrough();
    const r = ()=>{
        if (0 === --t) n.end();
    };
    for (const t of e)pipeline(t, n, {
        end: false
    }).then(r).catch(r);
    return n;
};
const x = /([()\][%!^"`<>&|;, *?])/g;
const S = /^#!\s*(.+)/;
const C = /\.(?:com|exe)$/i;
const w = /node_modules[\\/]\.bin[\\/][^\\/]+\.cmd$/i;
const T = "win32" === process.platform;
const E = [
    ".EXE",
    ".CMD",
    ".BAT",
    ".COM"
];
function D(e, t = [], n = {}) {
    if (true === n.shell || !T) return {
        command: e,
        args: t,
        options: n
    };
    let i = O(e, n);
    let a = null;
    if (null !== i) {
        const e = 150;
        const t = Buffer.alloc(e);
        let n = null;
        try {
            n = openSync(i, "r");
            readSync(n, t, 0, e, 0);
        } catch  {} finally{
            if (null !== n) closeSync(n);
        }
        const o = t.toString().match(S);
        if (null !== o) {
            const e = o[1].trim();
            const t = e.indexOf(" ");
            const n = -1 !== t ? e.slice(0, t) : e;
            const i = -1 !== t ? e.slice(t + 1) : "";
            const s = basename(n);
            a = "env" === s ? i || null : s;
        }
    }
    if (null !== a && null !== i) {
        t = [
            i,
            ...t
        ];
        e = a;
        i = O(e, n);
    }
    if (null === i || !C.test(i)) {
        const r = null !== i && w.test(i);
        e = normalize(e);
        e = e.replace(x, "^$1");
        t = t.map((e)=>{
            e = e.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\"");
            e = e.replace(/(?=(\\+?)?)\1$/, "$1$1");
            e = `"${e}"`;
            e = e.replace(x, "^$1");
            if (r) e = e.replace(x, "^$1");
            return e;
        });
        t = [
            "/d",
            "/s",
            "/c",
            `"${[
                e,
                ...t
            ].join(" ")}"`
        ];
        e = n.env?.comspec ?? "cmd.exe";
        n = {
            ...n,
            windowsVerbatimArguments: true
        };
    }
    return {
        command: e,
        args: t,
        options: n
    };
}
function O(e, t) {
    const r = (t.cwd ?? external_node_process_cwd()).toString();
    const a = t.env ?? process.env;
    const o = _(a).value;
    const c = e.includes("/") || e.includes("\\") ? [
        ""
    ] : [
        r,
        ...o.split(delimiter)
    ];
    const l = a.PATHEXT ? a.PATHEXT.split(delimiter) : E;
    if (e.includes(".") && "" !== l[0]) l.unshift("");
    for (const t of c){
        const n = resolve(r, t.startsWith("\"") && t.endsWith("\"") && t.length > 1 ? t.slice(1, -1) : t, e);
        for (const e of l){
            const t = n + e;
            try {
                if (statSync(t).isFile()) return t;
            } catch  {}
        }
    }
    return null;
}
var k = class extends Error {
    result;
    output;
    get exitCode() {
        if (null !== this.result.exitCode) return this.result.exitCode;
    }
    constructor(e, t){
        super(`Process exited with non-zero status (${e.exitCode})`);
        this.result = e;
        this.output = t;
    }
};
const j = {
    timeout: void 0,
    persist: false
};
const N = {
    windowsHide: true
};
function P(e) {
    const t = new AbortController();
    for (const n of e){
        if (n.aborted) {
            t.abort();
            return n;
        }
        const e = ()=>{
            t.abort(n.reason);
        };
        n.addEventListener("abort", e, {
            signal: t.signal
        });
    }
    return t.signal;
}
async function F(e) {
    let t = "";
    try {
        for await (const n of e)t += n.toString();
    } catch  {}
    return t;
}
var I = class {
    _process;
    _aborted = false;
    _options;
    _command;
    _args;
    _resolveClose;
    _processClosed;
    _thrownError;
    get process() {
        return this._process;
    }
    get pid() {
        return this._process?.pid;
    }
    get exitCode() {
        if (this._process && null !== this._process.exitCode) return this._process.exitCode;
    }
    constructor(e, t, n){
        this._options = {
            ...j,
            ...n
        };
        this._command = e;
        this._args = t ?? [];
        this._processClosed = new Promise((e)=>{
            this._resolveClose = e;
        });
    }
    kill(e) {
        return this._process?.kill(e) === true;
    }
    get aborted() {
        return this._aborted;
    }
    get killed() {
        return this._process?.killed === true;
    }
    pipe(e, t, n) {
        return z(e, t, {
            ...n,
            stdin: this
        });
    }
    async *[Symbol.asyncIterator]() {
        const e = this._process;
        if (!e) return;
        const t = [];
        if (this._streamErr) t.push(this._streamErr);
        if (this._streamOut) t.push(this._streamOut);
        const n = b(t);
        const r = node_readline.createInterface({
            input: n
        });
        for await (const e of r)yield e.toString();
        await this._processClosed;
        e.removeAllListeners();
        if (this._thrownError) throw this._thrownError;
        if (this._options?.throwOnError && 0 !== this.exitCode && void 0 !== this.exitCode) throw new k(this);
    }
    async _waitForOutput() {
        const e = this._process;
        if (!e) throw new Error("No process was started");
        const [t, n] = await Promise.all([
            this._streamOut ? F(this._streamOut) : "",
            this._streamErr ? F(this._streamErr) : ""
        ]);
        await this._processClosed;
        const { stdin: r } = this._options;
        if (r && "string" != typeof r) await r;
        e.removeAllListeners();
        if (this._thrownError) throw this._thrownError;
        const i = {
            stderr: n,
            stdout: t,
            exitCode: this.exitCode
        };
        if (this._options.throwOnError && 0 !== this.exitCode && void 0 !== this.exitCode) throw new k(this, i);
        return i;
    }
    then(e, t) {
        return this._waitForOutput().then(e, t);
    }
    _streamOut;
    _streamErr;
    spawn() {
        const t = external_node_process_cwd();
        const r = this._options;
        const i = {
            ...N,
            ...r.nodeOptions
        };
        const a = [];
        this._resetState();
        if (void 0 !== r.timeout) a.push(AbortSignal.timeout(r.timeout));
        if (void 0 !== r.signal) a.push(r.signal);
        if (true === r.persist) i.detached = true;
        if (a.length > 0) i.signal = P(a);
        i.env = y(t, i.env, r.nodePath);
        const o = D(this._command, this._args, i);
        const s = spawn(o.command, o.args, o.options);
        if (s.stderr) this._streamErr = s.stderr;
        if (s.stdout) this._streamOut = s.stdout;
        this._process = s;
        s.once("error", this._onError);
        s.once("close", this._onClose);
        if (s.stdin) {
            const { stdin: e } = r;
            if ("string" == typeof e) s.stdin.end(e);
            else e?.process?.stdout?.pipe(s.stdin);
        }
    }
    _resetState() {
        this._aborted = false;
        this._processClosed = new Promise((e)=>{
            this._resolveClose = e;
        });
        this._thrownError = void 0;
    }
    _onError = (e)=>{
        if ("AbortError" === e.name && (!(e.cause instanceof Error) || "TimeoutError" !== e.cause.name)) {
            this._aborted = true;
            return;
        }
        this._thrownError = e;
    };
    _onClose = ()=>{
        if (this._resolveClose) this._resolveClose();
    };
};
const R = (e, t, n)=>{
    const r = new I(e, t, n);
    r.spawn();
    return r;
};
const z = R;
async function detectPackageManager(cwd = node_process.cwd()) {
    const result = await detect({
        cwd,
        onUnknown (packageManager) {
            console.warn("[@antfu/install-pkg] Unknown packageManager:", packageManager);
        }
    });
    return result?.agent || null;
}
async function installPackage(names, options = {}) {
    const detectedAgent = options.packageManager || await detectPackageManager(options.cwd) || "npm";
    const [agent] = detectedAgent.split("@");
    if (!Array.isArray(names)) names = [
        names
    ];
    const args = ("function" == typeof options.additionalArgs ? options.additionalArgs(agent, detectedAgent) : options.additionalArgs) || [];
    if (options.preferOffline) if ("yarn@berry" === detectedAgent) args.unshift("--cached");
    else args.unshift("--prefer-offline");
    if ("pnpm" === agent) {
        args.unshift("--prod=false");
        if (existsSync(resolve(options.cwd ?? node_process.cwd(), "pnpm-workspace.yaml"))) args.unshift("-w");
    }
    return R(agent, [
        "yarn" === agent ? "add" : "install",
        options.dev ? "-D" : "",
        ...args,
        ...names
    ].filter(Boolean), {
        nodeOptions: {
            stdio: options.silent ? "ignore" : "inherit",
            cwd: options.cwd
        },
        throwOnError: true
    });
}
function isPackageInstalled(packageName, root) {
    const require = createRequire(pathToFileURL(root).toString());
    try {
        require.resolve(packageName, {
            paths: [
                root
            ]
        });
        return true;
    } catch (error) {
        if ('object' == typeof error && null !== error && 'code' in error && 'MODULE_NOT_FOUND' === error.code) return false;
        throw error;
    }
}
const packageInstaller_installPackage = async (packageName, root, options = {})=>{
    if (!isTTY('stdin')) return false;
    const confirm = options.confirm ?? (await import("./0~@clack/prompts.js")).confirm;
    const shouldInstall = await confirm({
        message: options.message ?? `${packageName} is required. Install it now?`,
        initialValue: true
    });
    if (true !== shouldInstall) return false;
    logger_logger.log(logger_color.cyan(`Installing ${packageName}...`));
    const installer = options.installPackage ?? installPackage;
    await installer(packageName, {
        cwd: root,
        dev: true,
        silent: false
    });
    return true;
};
const ensurePackageInstalled = async (packageName, root, options = {})=>{
    if (isPackageInstalled(packageName, root)) return true;
    await packageInstaller_installPackage(packageName, root, options);
    return isPackageInstalled(packageName, root);
};
const CoverageProviderMap = {
    istanbul: '@rstest/coverage-istanbul',
    v8: '@rstest/coverage-v8'
};
const installCoverageProvider = async (moduleName, root, options = {})=>{
    const packageName = moduleName.startsWith('@rstest/') ? `${moduleName}@0.10.4` : moduleName;
    return packageInstaller_installPackage(packageName, root, {
        ...options,
        message: options.message ?? `${moduleName} is required for coverage. Install it now?`
    });
};
const getCoverageProviderModuleName = (options)=>{
    const moduleName = CoverageProviderMap[options.provider || 'istanbul'];
    if (!moduleName) throw new Error(`Unknown coverage provider: ${options.provider}`);
    return moduleName;
};
const createCoverageProviderLoadError = (moduleName, root)=>{
    const error = new Error(`Failed to load coverage provider module: ${logger_color.cyan(moduleName)} in ${logger_color.underline(root)}, please make sure it is installed.\n`);
    error.stack = '';
    return error;
};
const ensureCoverageProviderInstalled = async (options, root, installer = installCoverageProvider)=>{
    if (!options.enabled) return;
    const moduleName = getCoverageProviderModuleName(options);
    if (isPackageInstalled(moduleName, root)) return;
    await installer(moduleName, root);
    if (!isPackageInstalled(moduleName, root)) throw createCoverageProviderLoadError(moduleName, root);
};
const loadCoverageProvider = async (options, root)=>{
    const rootPath = pathToFileURL(root).toString();
    const moduleName = getCoverageProviderModuleName(options);
    const require = createRequire(rootPath);
    const loadProvider = async ()=>{
        const modulePath = require.resolve(moduleName, {
            paths: [
                root
            ]
        });
        const { pluginCoverage, CoverageProvider } = await import(pathToFileURL(modulePath).toString());
        return {
            pluginCoverage,
            CoverageProvider
        };
    };
    try {
        return await loadProvider();
    } catch  {
        throw createCoverageProviderLoadError(moduleName, root);
    }
};
function cleanCoverageReports(options) {
    if (!options.enabled || !options.clean) return;
    if (node_fs.existsSync(options.reportsDirectory)) node_fs.rmSync(options.reportsDirectory, {
        recursive: true
    });
}
async function createCoverageProvider(options, root) {
    if (!options.enabled) return null;
    if (!options.provider || CoverageProviderMap[options.provider]) {
        const { CoverageProvider } = await loadCoverageProvider(options, root);
        return new CoverageProvider(options, root);
    }
    throw new Error(`Unknown coverage provider: ${options.provider}`);
}
export { cleanCoverageReports, createCoverageProvider, ensureCoverageProviderInstalled, ensurePackageInstalled, isPackageInstalled, loadCoverageProvider };
