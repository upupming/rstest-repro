import "node:module";
const normalizeTestOptions = (input)=>{
    if ('number' == typeof input) return {
        timeout: input
    };
    return input ?? {};
};
const loadDiffModules = async ()=>{
    const [{ diff }, { format, plugins }] = await Promise.all([
        import("./0~diff.js").then((m)=>m.diff_namespaceObject),
        import("./0~@vitest/pretty-format.js").then((m)=>m.dist_namespaceObject)
    ]);
    return {
        diff,
        format,
        formatPlugins: Object.values(plugins)
    };
};
const REAL_TIMERS = {};
const setRealTimers = ()=>{
    REAL_TIMERS.setTimeout ??= globalThis.setTimeout.bind(globalThis);
    REAL_TIMERS.clearTimeout ??= globalThis.clearTimeout.bind(globalThis);
    if ('function' == typeof globalThis.setImmediate) REAL_TIMERS.setImmediate ??= globalThis.setImmediate.bind(globalThis);
};
const getRealTimers = ()=>REAL_TIMERS;
const realNow = Date.now.bind(Date);
const getRealNow = ()=>realNow();
const formatTestError = async (err, test)=>{
    const errors = Array.isArray(err) ? err : [
        err
    ];
    return Promise.all(errors.map(async (rawError)=>{
        const error = 'string' == typeof rawError ? {
            message: rawError
        } : rawError;
        const errObj = {
            fullStack: error.fullStack,
            message: error.message,
            name: error.name,
            stack: error.stack
        };
        if (error instanceof TestRegisterError && test?.type === 'case') errObj.message = `Can't nest describe or test inside a test. ${error.message} because it is nested within test '${test.name}'`;
        if (error.showDiff || void 0 === error.showDiff && void 0 !== error.expected && void 0 !== error.actual) {
            const expected = error.expected;
            const actual = error.actual;
            const { diff, format, formatPlugins } = await loadDiffModules();
            errObj.diff = diff(expected, actual, {
                expand: false
            });
            errObj.expected = 'string' == typeof expected ? expected : format(expected, {
                plugins: formatPlugins
            });
            errObj.actual = 'string' == typeof actual ? actual : format(actual, {
                plugins: formatPlugins
            });
        }
        return errObj;
    }));
};
const formatRegExp = /%[sdjifoOc%]/;
const formatTemplate = (template, values)=>{
    if (!formatRegExp.test(template)) return template;
    let valueIndex = 0;
    return template.replace(/%[sdjifoOc%]/g, (specifier)=>{
        if ('%%' === specifier) return '%';
        const value = values[valueIndex++];
        switch(specifier){
            case '%s':
            case '%O':
            case '%o':
            case '%c':
                return String(value);
            case '%d':
            case '%i':
                return Number.parseInt(String(value), 10).toString();
            case '%f':
                return Number(value).toString();
            case '%j':
                try {
                    return JSON.stringify(value);
                } catch  {
                    return '[Circular]';
                }
            default:
                return String(value ?? '');
        }
    });
};
const formatName = (template, param, index)=>{
    let templateStr = template;
    if ([
        '%%',
        '%#',
        '%$'
    ].some((flag)=>templateStr.includes(flag))) templateStr = templateStr.replace(/%%/g, '__rstest_escaped_%__').replace(/%#/g, `${index}`).replace(/%\$/g, `${index + 1}`).replace(/__rstest_escaped_%__/g, '%%');
    if (Array.isArray(param)) {
        if (formatRegExp.test(templateStr)) return formatTemplate(templateStr, param);
        return templateStr;
    }
    if (formatRegExp.test(templateStr)) templateStr = formatTemplate(templateStr, [
        param
    ]);
    return templateStr.replace(/\$([$\w.]+)/g, (_, key)=>{
        const value = getValue(param, key);
        return value?.toString();
    });
};
function getValue(source, path, defaultValue) {
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let result = source;
    for (const p of paths){
        result = result[p];
        if (void 0 === result) return defaultValue;
    }
    return result;
}
function isTemplateStringsArray(value) {
    return Array.isArray(value) && 'raw' in value && Array.isArray(value.raw);
}
function parseTemplateTable(strings, ...expressions) {
    const raw = strings.join('\0');
    const lines = raw.split('\n').filter((line)=>line.trim());
    if (0 === lines.length) return [];
    const headers = lines[0].split('|').map((h)=>h.trim()).filter(Boolean);
    if (0 === headers.length) return [];
    const result = [];
    for(let i = 0; i < expressions.length; i += headers.length){
        const row = {};
        for(let j = 0; j < headers.length; j++)row[headers[j]] = expressions[i + j];
        result.push(row);
    }
    return result;
}
class TestRegisterError extends Error {
}
class TestSkipError extends Error {
}
class RstestError extends Error {
    fullStack;
}
function checkPkgInstalled(name) {
    if ("u" < typeof process || !process.versions?.node) return;
    let resolveFn;
    try {
        const req = Function('return require')();
        resolveFn = req?.resolve?.bind(req);
    } catch  {
        resolveFn = void 0;
    }
    if (!resolveFn) return;
    try {
        resolveFn(name);
    } catch (error) {
        if (error?.code === 'MODULE_NOT_FOUND') {
            const missingError = new RstestError(`Missing dependency "${name}". Please install it first.`);
            missingError.fullStack = true;
            throw missingError;
        }
        throw error;
    }
}
export { TestRegisterError, TestSkipError, checkPkgInstalled, formatName, formatTestError, getRealNow, getRealTimers, isTemplateStringsArray, normalizeTestOptions, parseTemplateTable, setRealTimers };
