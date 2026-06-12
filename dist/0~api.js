/*! LICENSE: 0~api.js.LICENSE.txt */
import "node:module";
import { node_u } from "./0~@vitest/pretty-format.js";
import { printDiffOrStringify, diff_diff, isObject as helpers_isObject, getType, stringify, format, assertTypes, noop } from "./0~diff.js";
import { SYNTHETIC_STACK_ERROR_MESSAGE, isObject as helper_isObject, getFileTaskId, castArray, RSTEST_ENV_SYMBOL_KEY, getTaskNameWithPrefix, generateFilePathHash, ROOT_SUITE_NAME, normalize } from "./2366.js";
import { TestSkipError, parseTemplateTable, TestRegisterError, formatTestError, getRealTimers, formatName, normalizeTestOptions, isTemplateStringsArray } from "./977.js";
import { parse } from "./1672.js";
function S(e, t) {
    if (!e) throw new Error(t);
}
function f(e, t) {
    return typeof t === e;
}
function w(e) {
    return e instanceof Promise;
}
function u(e, t, r) {
    Object.defineProperty(e, t, r);
}
function l(e, t, r) {
    u(e, t, {
        value: r,
        configurable: !0,
        writable: !0
    });
}
var y = Symbol.for("tinyspy:spy");
var dist_x = /* @__PURE__ */ new Set(), h = (e)=>{
    e.called = !1, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, dist_k = (e)=>(u(e, y, {
        value: {
            reset: ()=>h(e[y])
        }
    }), e[y]), T = (e)=>e[y] || dist_k(e);
function R(e) {
    S(f("function", e) || f("undefined", e), "cannot spy on a non-function value");
    let t = function(...s) {
        let n = T(t);
        n.called = !0, n.callCount++, n.calls.push(s);
        let d = n.next.shift();
        if (d) {
            n.results.push(d);
            let [a, i] = d;
            if ("ok" === a) return i;
            throw i;
        }
        let o, c = "ok", p = n.results.length;
        if (n.impl) try {
            new.target ? o = Reflect.construct(n.impl, s, new.target) : o = n.impl.apply(this, s), c = "ok";
        } catch (a) {
            throw o = a, c = "error", n.results.push([
                c,
                a
            ]), a;
        }
        let g = [
            c,
            o
        ];
        return w(o) && o.then((a)=>n.resolves[p] = [
                "ok",
                a
            ], (a)=>n.resolves[p] = [
                "error",
                a
            ]), n.results.push(g), o;
    };
    l(t, "_isMockFunction", !0), l(t, "length", e ? e.length : 0), l(t, "name", e && e.name || "spy");
    let r = T(t);
    return r.reset(), r.impl = e, t;
}
function dist_v(e) {
    return !!e && !0 === e._isMockFunction;
}
var dist_b = (e, t)=>{
    let r = Object.getOwnPropertyDescriptor(e, t);
    if (r) return [
        e,
        r
    ];
    let s = Object.getPrototypeOf(e);
    for(; null !== s;){
        let n = Object.getOwnPropertyDescriptor(s, t);
        if (n) return [
            s,
            n
        ];
        s = Object.getPrototypeOf(s);
    }
}, P = (e, t)=>{
    null != t && "function" == typeof t && null != t.prototype && Object.setPrototypeOf(e.prototype, t.prototype);
};
function M(e, t, r) {
    S(!f("undefined", e), "spyOn could not find an object to spy upon"), S(f("object", e) || f("function", e), "cannot spyOn on a primitive value");
    let [s, n] = (()=>{
        if (!f("object", t)) return [
            t,
            "value"
        ];
        if ("getter" in t && "setter" in t) throw new Error("cannot spy on both getter and setter");
        if ("getter" in t) return [
            t.getter,
            "get"
        ];
        if ("setter" in t) return [
            t.setter,
            "set"
        ];
        throw new Error("specify getter or setter to spy on");
    })(), [d, o] = dist_b(e, s) || [];
    S(o || s in e, `${String(s)} does not exist`);
    let c = !1;
    "value" === n && o && !o.value && o.get && (n = "get", c = !0, r = o.get());
    let p;
    o ? p = o[n] : "value" !== n ? p = ()=>e[s] : p = e[s], p && dist_j(p) && (p = p[y].getOriginal());
    let g = (I)=>{
        let { value: F, ...O } = o || {
            configurable: !0,
            writable: !0
        };
        "value" !== n && delete O.writable, O[n] = I, u(e, s, O);
    }, a = ()=>{
        d !== e ? Reflect.deleteProperty(e, s) : o && !p ? u(e, s, o) : g(p);
    };
    r || (r = p);
    let i = E(R(r), r);
    "value" === n && P(i, p);
    let m = i[y];
    return l(m, "restore", a), l(m, "getOriginal", ()=>c ? p() : p), l(m, "willCall", (I)=>(m.impl = I, i)), g(c ? ()=>(P(i, r), i) : i), dist_x.add(i), i;
}
var K = /* @__PURE__ */ new Set([
    "length",
    "name",
    "prototype"
]);
function D(e) {
    let t = /* @__PURE__ */ new Set(), r = {};
    for(; e && e !== Object.prototype && e !== Function.prototype;){
        let s = [
            ...Object.getOwnPropertyNames(e),
            ...Object.getOwnPropertySymbols(e)
        ];
        for (let n of s)r[n] || K.has(n) || (t.add(n), r[n] = Object.getOwnPropertyDescriptor(e, n));
        e = Object.getPrototypeOf(e);
    }
    return {
        properties: t,
        descriptors: r
    };
}
function E(e, t) {
    if (!t || y in t) return e;
    let { properties: r, descriptors: s } = D(t);
    for (let n of r){
        let d = s[n];
        dist_b(e, n) || u(e, n, d);
    }
    return e;
}
function dist_j(e) {
    return dist_v(e) && "getOriginal" in e[y];
}
new Set();
function dist_isMockFunction(fn) {
    return "function" == typeof fn && "_isMockFunction" in fn && fn._isMockFunction;
}
const IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
const IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isImmutable(v) {
    return v && (v[IS_COLLECTION_SYMBOL] || v[IS_RECORD_SYMBOL]);
}
const OBJECT_PROTO = Object.getPrototypeOf({});
function getUnserializableMessage(err) {
    if (err instanceof Error) return `<unserializable>: ${err.message}`;
    if ("string" == typeof err) return `<unserializable>: ${err}`;
    return "<unserializable>";
}
function serializeValue(val, seen = new WeakMap()) {
    if (!val || "string" == typeof val) return val;
    if (val instanceof Error && "toJSON" in val && "function" == typeof val.toJSON) {
        const jsonValue = val.toJSON();
        if (jsonValue && jsonValue !== val && "object" == typeof jsonValue) {
            if ("string" == typeof val.message) safe(()=>jsonValue.message ?? (jsonValue.message = val.message));
            if ("string" == typeof val.stack) safe(()=>jsonValue.stack ?? (jsonValue.stack = val.stack));
            if ("string" == typeof val.name) safe(()=>jsonValue.name ?? (jsonValue.name = val.name));
            if (null != val.cause) safe(()=>jsonValue.cause ?? (jsonValue.cause = serializeValue(val.cause, seen)));
        }
        return serializeValue(jsonValue, seen);
    }
    if ("function" == typeof val) return `Function<${val.name || "anonymous"}>`;
    if ("symbol" == typeof val) return val.toString();
    if ("object" != typeof val) return val;
    if ("u" > typeof Buffer && val instanceof Buffer) return `<Buffer(${val.length}) ...>`;
    if ("u" > typeof Uint8Array && val instanceof Uint8Array) return `<Uint8Array(${val.length}) ...>`;
    if (isImmutable(val)) return serializeValue(val.toJSON(), seen);
    if (val instanceof Promise || val.constructor && "AsyncFunction" === val.constructor.prototype) return "Promise";
    if ("u" > typeof Element && val instanceof Element) return val.tagName;
    if ("function" == typeof val.asymmetricMatch) return `${val.toString()} ${format(val.sample)}`;
    if ("function" == typeof val.toJSON) return serializeValue(val.toJSON(), seen);
    if (seen.has(val)) return seen.get(val);
    if (Array.isArray(val)) {
        const clone = new Array(val.length);
        seen.set(val, clone);
        val.forEach((e, i)=>{
            try {
                clone[i] = serializeValue(e, seen);
            } catch (err) {
                clone[i] = getUnserializableMessage(err);
            }
        });
        return clone;
    }
    {
        const clone = Object.create(null);
        seen.set(val, clone);
        let obj = val;
        while(obj && obj !== OBJECT_PROTO){
            Object.getOwnPropertyNames(obj).forEach((key)=>{
                if (key in clone) return;
                try {
                    clone[key] = serializeValue(val[key], seen);
                } catch (err) {
                    delete clone[key];
                    clone[key] = getUnserializableMessage(err);
                }
            });
            obj = Object.getPrototypeOf(obj);
        }
        return clone;
    }
}
function safe(fn) {
    try {
        return fn();
    } catch  {}
}
function normalizeErrorMessage(message) {
    return message.replace(/__(vite_ssr_import|vi_import)_\d+__\./g, "");
}
function processError(_err, diffOptions, seen = new WeakSet()) {
    if (!_err || "object" != typeof _err) return {
        message: String(_err)
    };
    const err = _err;
    if (err.showDiff || void 0 === err.showDiff && void 0 !== err.expected && void 0 !== err.actual) err.diff = printDiffOrStringify(err.actual, err.expected, {
        ...diffOptions,
        ...err.diffOptions
    });
    if ("expected" in err && "string" != typeof err.expected) err.expected = stringify(err.expected, 10);
    if ("actual" in err && "string" != typeof err.actual) err.actual = stringify(err.actual, 10);
    try {
        if ("string" == typeof err.message) err.message = normalizeErrorMessage(err.message);
    } catch  {}
    try {
        if (!seen.has(err) && "object" == typeof err.cause) {
            seen.add(err);
            err.cause = processError(err.cause, diffOptions, seen);
        }
    } catch  {}
    try {
        return serializeValue(err);
    } catch (e) {
        return serializeValue(new Error(`Failed to fully serialize error: ${null == e ? void 0 : e.message}\nInner error message: ${null == err ? void 0 : err.message}`));
    }
}
var __defProp = Object.defineProperty;
var __name = (target, value)=>__defProp(target, "name", {
        value,
        configurable: true
    });
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var utils_exports = {};
__export(utils_exports, {
    addChainableMethod: ()=>addChainableMethod,
    addLengthGuard: ()=>addLengthGuard,
    addMethod: ()=>chai_addMethod,
    addProperty: ()=>addProperty,
    checkError: ()=>check_error_exports,
    compareByInspect: ()=>compareByInspect,
    eql: ()=>deep_eql_default,
    expectTypes: ()=>expectTypes,
    flag: ()=>flag,
    getActual: ()=>getActual,
    getMessage: ()=>getMessage2,
    getName: ()=>getName,
    getOperator: ()=>getOperator,
    getOwnEnumerableProperties: ()=>getOwnEnumerableProperties,
    getOwnEnumerablePropertySymbols: ()=>getOwnEnumerablePropertySymbols,
    getPathInfo: ()=>getPathInfo,
    hasProperty: ()=>hasProperty,
    inspect: ()=>inspect2,
    isNaN: ()=>isNaN2,
    isNumeric: ()=>isNumeric,
    isProxyEnabled: ()=>isProxyEnabled,
    isRegExp: ()=>isRegExp2,
    objDisplay: ()=>objDisplay,
    overwriteChainableMethod: ()=>overwriteChainableMethod,
    overwriteMethod: ()=>overwriteMethod,
    overwriteProperty: ()=>overwriteProperty,
    proxify: ()=>proxify,
    test: ()=>chai_test,
    transferFlags: ()=>transferFlags,
    type: ()=>chai_type
});
var check_error_exports = {};
__export(check_error_exports, {
    compatibleConstructor: ()=>compatibleConstructor,
    compatibleInstance: ()=>compatibleInstance,
    compatibleMessage: ()=>compatibleMessage,
    getConstructorName: ()=>getConstructorName,
    getMessage: ()=>getMessage
});
function isErrorInstance(obj) {
    return obj instanceof Error || "[object Error]" === Object.prototype.toString.call(obj);
}
__name(isErrorInstance, "isErrorInstance");
function isRegExp(obj) {
    return "[object RegExp]" === Object.prototype.toString.call(obj);
}
__name(isRegExp, "isRegExp");
function compatibleInstance(thrown, errorLike) {
    return isErrorInstance(errorLike) && thrown === errorLike;
}
__name(compatibleInstance, "compatibleInstance");
function compatibleConstructor(thrown, errorLike) {
    if (isErrorInstance(errorLike)) return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
    if (("object" == typeof errorLike || "function" == typeof errorLike) && errorLike.prototype) return thrown.constructor === errorLike || thrown instanceof errorLike;
    return false;
}
__name(compatibleConstructor, "compatibleConstructor");
function compatibleMessage(thrown, errMatcher) {
    const comparisonString = "string" == typeof thrown ? thrown : thrown.message;
    if (isRegExp(errMatcher)) return errMatcher.test(comparisonString);
    if ("string" == typeof errMatcher) return -1 !== comparisonString.indexOf(errMatcher);
    return false;
}
__name(compatibleMessage, "compatibleMessage");
function getConstructorName(errorLike) {
    let constructorName = errorLike;
    if (isErrorInstance(errorLike)) constructorName = errorLike.constructor.name;
    else if ("function" == typeof errorLike) {
        constructorName = errorLike.name;
        if ("" === constructorName) {
            const newConstructorName = new errorLike().name;
            constructorName = newConstructorName || constructorName;
        }
    }
    return constructorName;
}
__name(getConstructorName, "getConstructorName");
function getMessage(errorLike) {
    let msg = "";
    if (errorLike && errorLike.message) msg = errorLike.message;
    else if ("string" == typeof errorLike) msg = errorLike;
    return msg;
}
__name(getMessage, "getMessage");
function flag(obj, key, value) {
    let flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
    if (3 !== arguments.length) return flags[key];
    flags[key] = value;
}
__name(flag, "flag");
function chai_test(obj, args) {
    let negate = flag(obj, "negate"), expr = args[0];
    return negate ? !expr : expr;
}
__name(chai_test, "test");
function chai_type(obj) {
    if (void 0 === obj) return "undefined";
    if (null === obj) return "null";
    const stringTag = obj[Symbol.toStringTag];
    if ("string" == typeof stringTag) return stringTag;
    const type3 = Object.prototype.toString.call(obj).slice(8, -1);
    return type3;
}
__name(chai_type, "type");
var canElideFrames = "captureStackTrace" in Error;
var chai_AssertionError = class _AssertionError extends Error {
    static{
        __name(this, "AssertionError");
    }
    message;
    get name() {
        return "AssertionError";
    }
    get ok() {
        return false;
    }
    constructor(message = "Unspecified AssertionError", props, ssf){
        super(message);
        this.message = message;
        if (canElideFrames) Error.captureStackTrace(this, ssf || _AssertionError);
        for(const key in props)if (!(key in this)) this[key] = props[key];
    }
    toJSON(stack) {
        return {
            ...this,
            name: this.name,
            message: this.message,
            ok: false,
            stack: false !== stack ? this.stack : void 0
        };
    }
};
function expectTypes(obj, types) {
    let flagMsg = flag(obj, "message");
    let ssfi = flag(obj, "ssfi");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    obj = flag(obj, "object");
    types = types.map(function(t) {
        return t.toLowerCase();
    });
    types.sort();
    let str = types.map(function(t, index) {
        let art = ~[
            "a",
            "e",
            "i",
            "o",
            "u"
        ].indexOf(t.charAt(0)) ? "an" : "a";
        let or = types.length > 1 && index === types.length - 1 ? "or " : "";
        return or + art + " " + t;
    }).join(", ");
    let objType = chai_type(obj).toLowerCase();
    if (!types.some(function(expected) {
        return objType === expected;
    })) throw new chai_AssertionError(flagMsg + "object tested must be " + str + ", but " + objType + " given", void 0, ssfi);
}
__name(expectTypes, "expectTypes");
function getActual(obj, args) {
    return args.length > 4 ? args[4] : obj._obj;
}
__name(getActual, "getActual");
var ansiColors = {
    bold: [
        "1",
        "22"
    ],
    dim: [
        "2",
        "22"
    ],
    italic: [
        "3",
        "23"
    ],
    underline: [
        "4",
        "24"
    ],
    inverse: [
        "7",
        "27"
    ],
    hidden: [
        "8",
        "28"
    ],
    strike: [
        "9",
        "29"
    ],
    black: [
        "30",
        "39"
    ],
    red: [
        "31",
        "39"
    ],
    green: [
        "32",
        "39"
    ],
    yellow: [
        "33",
        "39"
    ],
    blue: [
        "34",
        "39"
    ],
    magenta: [
        "35",
        "39"
    ],
    cyan: [
        "36",
        "39"
    ],
    white: [
        "37",
        "39"
    ],
    brightblack: [
        "30;1",
        "39"
    ],
    brightred: [
        "31;1",
        "39"
    ],
    brightgreen: [
        "32;1",
        "39"
    ],
    brightyellow: [
        "33;1",
        "39"
    ],
    brightblue: [
        "34;1",
        "39"
    ],
    brightmagenta: [
        "35;1",
        "39"
    ],
    brightcyan: [
        "36;1",
        "39"
    ],
    brightwhite: [
        "37;1",
        "39"
    ],
    grey: [
        "90",
        "39"
    ]
};
var styles = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red"
};
var truncator = "\u2026";
function colorise(value, styleType) {
    const color = ansiColors[styles[styleType]] || ansiColors[styleType] || "";
    if (!color) return String(value);
    return `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m`;
}
__name(colorise, "colorise");
function normaliseOptions({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate: truncate2 = 1 / 0, stylize = String } = {}, inspect3) {
    const options = {
        showHidden: Boolean(showHidden),
        depth: Number(depth),
        colors: Boolean(colors),
        customInspect: Boolean(customInspect),
        showProxy: Boolean(showProxy),
        maxArrayLength: Number(maxArrayLength),
        breakLength: Number(breakLength),
        truncate: Number(truncate2),
        seen,
        inspect: inspect3,
        stylize
    };
    if (options.colors) options.stylize = colorise;
    return options;
}
__name(normaliseOptions, "normaliseOptions");
function isHighSurrogate(char) {
    return char >= "\uD800" && char <= "\uDBFF";
}
__name(isHighSurrogate, "isHighSurrogate");
function truncate(string, length, tail = truncator) {
    string = String(string);
    const tailLength = tail.length;
    const stringLength = string.length;
    if (tailLength > length && stringLength > tailLength) return tail;
    if (stringLength > length && stringLength > tailLength) {
        let end = length - tailLength;
        if (end > 0 && isHighSurrogate(string[end - 1])) end -= 1;
        return `${string.slice(0, end)}${tail}`;
    }
    return string;
}
__name(truncate, "truncate");
function inspectList(list, options, inspectItem, separator = ", ") {
    inspectItem = inspectItem || options.inspect;
    const size = list.length;
    if (0 === size) return "";
    const originalLength = options.truncate;
    let output = "";
    let peek = "";
    let truncated = "";
    for(let i = 0; i < size; i += 1){
        const last = i + 1 === list.length;
        const secondToLast = i + 2 === list.length;
        truncated = `${truncator}(${list.length - i})`;
        const value = list[i];
        options.truncate = originalLength - output.length - (last ? 0 : separator.length);
        const string = peek || inspectItem(value, options) + (last ? "" : separator);
        const nextLength = output.length + string.length;
        const truncatedLength = nextLength + truncated.length;
        if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) break;
        if (!last && !secondToLast && truncatedLength > originalLength) break;
        peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
        if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) break;
        output += string;
        if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
            truncated = `${truncator}(${list.length - i - 1})`;
            break;
        }
        truncated = "";
    }
    return `${output}${truncated}`;
}
__name(inspectList, "inspectList");
function quoteComplexKey(key) {
    if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) return key;
    return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
__name(quoteComplexKey, "quoteComplexKey");
function inspectProperty([key, value], options) {
    options.truncate -= 2;
    if ("string" == typeof key) key = quoteComplexKey(key);
    else if ("number" != typeof key) key = `[${options.inspect(key, options)}]`;
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key}: ${value}`;
}
__name(inspectProperty, "inspectProperty");
function inspectArray(array, options) {
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return "[]";
    options.truncate -= 4;
    const listContents = inspectList(array, options);
    options.truncate -= listContents.length;
    let propertyContents = "";
    if (nonIndexProperties.length) propertyContents = inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, inspectProperty);
    return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
__name(inspectArray, "inspectArray");
var getArrayName = /* @__PURE__ */ __name((array)=>{
    if ("function" == typeof Buffer && array instanceof Buffer) return "Buffer";
    if (array[Symbol.toStringTag]) return array[Symbol.toStringTag];
    return array.constructor.name;
}, "getArrayName");
function inspectTypedArray(array, options) {
    const name = getArrayName(array);
    options.truncate -= name.length + 4;
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return `${name}[]`;
    let output = "";
    for(let i = 0; i < array.length; i++){
        const string = `${options.stylize(truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
        options.truncate -= string.length;
        if (array[i] !== array.length && options.truncate <= 3) {
            output += `${truncator}(${array.length - array[i] + 1})`;
            break;
        }
        output += string;
    }
    let propertyContents = "";
    if (nonIndexProperties.length) propertyContents = inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, inspectProperty);
    return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
__name(inspectTypedArray, "inspectTypedArray");
function inspectDate(dateObject, options) {
    const stringRepresentation = dateObject.toJSON();
    if (null === stringRepresentation) return "Invalid Date";
    const split = stringRepresentation.split("T");
    const date = split[0];
    return options.stylize(`${date}T${truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
__name(inspectDate, "inspectDate");
function inspectFunction(func, options) {
    const functionType = func[Symbol.toStringTag] || "Function";
    const name = func.name;
    if (!name) return options.stylize(`[${functionType}]`, "special");
    return options.stylize(`[${functionType} ${truncate(name, options.truncate - 11)}]`, "special");
}
__name(inspectFunction, "inspectFunction");
function inspectMapEntry([key, value], options) {
    options.truncate -= 4;
    key = options.inspect(key, options);
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key} => ${value}`;
}
__name(inspectMapEntry, "inspectMapEntry");
function mapToEntries(map) {
    const entries = [];
    map.forEach((value, key)=>{
        entries.push([
            key,
            value
        ]);
    });
    return entries;
}
__name(mapToEntries, "mapToEntries");
function inspectMap(map, options) {
    if (0 === map.size) return "Map{}";
    options.truncate -= 7;
    return `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry)} }`;
}
__name(inspectMap, "inspectMap");
var chai_isNaN = Number.isNaN || ((i)=>i !== i);
function inspectNumber(number, options) {
    if (chai_isNaN(number)) return options.stylize("NaN", "number");
    if (number === 1 / 0) return options.stylize("Infinity", "number");
    if (number === -1 / 0) return options.stylize("-Infinity", "number");
    if (0 === number) return options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number");
    return options.stylize(truncate(String(number), options.truncate), "number");
}
__name(inspectNumber, "inspectNumber");
function inspectBigInt(number, options) {
    let nums = truncate(number.toString(), options.truncate - 1);
    if (nums !== truncator) nums += "n";
    return options.stylize(nums, "bigint");
}
__name(inspectBigInt, "inspectBigInt");
function inspectRegExp(value, options) {
    const flags = value.toString().split("/")[2];
    const sourceLength = options.truncate - (2 + flags.length);
    const source = value.source;
    return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, "regexp");
}
__name(inspectRegExp, "inspectRegExp");
function arrayFromSet(set2) {
    const values = [];
    set2.forEach((value)=>{
        values.push(value);
    });
    return values;
}
__name(arrayFromSet, "arrayFromSet");
function inspectSet(set2, options) {
    if (0 === set2.size) return "Set{}";
    options.truncate -= 7;
    return `Set{ ${inspectList(arrayFromSet(set2), options)} }`;
}
__name(inspectSet, "inspectSet");
var stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g");
var escapeCharacters = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\"
};
var hex = 16;
var unicodeLength = 4;
function chai_escape(char) {
    return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
}
__name(chai_escape, "escape");
function inspectString(string, options) {
    if (stringEscapeChars.test(string)) string = string.replace(stringEscapeChars, chai_escape);
    return options.stylize(`'${truncate(string, options.truncate - 2)}'`, "string");
}
__name(inspectString, "inspectString");
function inspectSymbol(value) {
    if ("description" in Symbol.prototype) return value.description ? `Symbol(${value.description})` : "Symbol()";
    return value.toString();
}
__name(inspectSymbol, "inspectSymbol");
var getPromiseValue = /* @__PURE__ */ __name(()=>"Promise{\u2026}", "getPromiseValue");
var promise_default = getPromiseValue;
function inspectObject(object, options) {
    const properties = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
    if (0 === properties.length && 0 === symbols.length) return "{}";
    options.truncate -= 4;
    options.seen = options.seen || [];
    if (options.seen.includes(object)) return "[Circular]";
    options.seen.push(object);
    const propertyContents = inspectList(properties.map((key)=>[
            key,
            object[key]
        ]), options, inspectProperty);
    const symbolContents = inspectList(symbols.map((key)=>[
            key,
            object[key]
        ]), options, inspectProperty);
    options.seen.pop();
    let sep = "";
    if (propertyContents && symbolContents) sep = ", ";
    return `{ ${propertyContents}${sep}${symbolContents} }`;
}
__name(inspectObject, "inspectObject");
var toStringTag = "u" > typeof Symbol && Symbol.toStringTag ? Symbol.toStringTag : false;
function inspectClass(value, options) {
    let name = "";
    if (toStringTag && toStringTag in value) name = value[toStringTag];
    name = name || value.constructor.name;
    if (!name || "_class" === name) name = "<Anonymous Class>";
    options.truncate -= name.length;
    return `${name}${inspectObject(value, options)}`;
}
__name(inspectClass, "inspectClass");
function inspectArguments(args, options) {
    if (0 === args.length) return "Arguments[]";
    options.truncate -= 13;
    return `Arguments[ ${inspectList(args, options)} ]`;
}
__name(inspectArguments, "inspectArguments");
var errorKeys = [
    "stack",
    "line",
    "column",
    "name",
    "message",
    "fileName",
    "lineNumber",
    "columnNumber",
    "number",
    "description",
    "cause"
];
function inspectObject2(error, options) {
    const properties = Object.getOwnPropertyNames(error).filter((key)=>-1 === errorKeys.indexOf(key));
    const name = error.name;
    options.truncate -= name.length;
    let message = "";
    if ("string" == typeof error.message) message = truncate(error.message, options.truncate);
    else properties.unshift("message");
    message = message ? `: ${message}` : "";
    options.truncate -= message.length + 5;
    options.seen = options.seen || [];
    if (options.seen.includes(error)) return "[Circular]";
    options.seen.push(error);
    const propertyContents = inspectList(properties.map((key)=>[
            key,
            error[key]
        ]), options, inspectProperty);
    return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
__name(inspectObject2, "inspectObject");
function inspectAttribute([key, value], options) {
    options.truncate -= 3;
    if (!value) return `${options.stylize(String(key), "yellow")}`;
    return `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}`;
}
__name(inspectAttribute, "inspectAttribute");
function inspectNodeCollection(collection, options) {
    return inspectList(collection, options, inspectNode, "\n");
}
__name(inspectNodeCollection, "inspectNodeCollection");
function inspectNode(node, options) {
    switch(node.nodeType){
        case 1:
            return inspectHTML(node, options);
        case 3:
            return options.inspect(node.data, options);
        default:
            return options.inspect(node, options);
    }
}
__name(inspectNode, "inspectNode");
function inspectHTML(element, options) {
    const properties = element.getAttributeNames();
    const name = element.tagName.toLowerCase();
    const head = options.stylize(`<${name}`, "special");
    const headClose = options.stylize(">", "special");
    const tail = options.stylize(`</${name}>`, "special");
    options.truncate -= 2 * name.length + 5;
    let propertyContents = "";
    if (properties.length > 0) {
        propertyContents += " ";
        propertyContents += inspectList(properties.map((key)=>[
                key,
                element.getAttribute(key)
            ]), options, inspectAttribute, " ");
    }
    options.truncate -= propertyContents.length;
    const truncate2 = options.truncate;
    let children = inspectNodeCollection(element.children, options);
    if (children && children.length > truncate2) children = `${truncator}(${element.children.length})`;
    return `${head}${propertyContents}${headClose}${children}${tail}`;
}
__name(inspectHTML, "inspectHTML");
var symbolsSupported = "function" == typeof Symbol && "function" == typeof Symbol.for;
var chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
var nodeInspect = Symbol.for("nodejs.util.inspect.custom");
var constructorMap = /* @__PURE__ */ new WeakMap();
var stringTagMap = {};
var baseTypesMap = {
    undefined: /* @__PURE__ */ __name((value, options)=>options.stylize("undefined", "undefined"), "undefined"),
    null: /* @__PURE__ */ __name((value, options)=>options.stylize("null", "null"), "null"),
    boolean: /* @__PURE__ */ __name((value, options)=>options.stylize(String(value), "boolean"), "boolean"),
    Boolean: /* @__PURE__ */ __name((value, options)=>options.stylize(String(value), "boolean"), "Boolean"),
    number: inspectNumber,
    Number: inspectNumber,
    bigint: inspectBigInt,
    BigInt: inspectBigInt,
    string: inspectString,
    String: inspectString,
    function: inspectFunction,
    Function: inspectFunction,
    symbol: inspectSymbol,
    Symbol: inspectSymbol,
    Array: inspectArray,
    Date: inspectDate,
    Map: inspectMap,
    Set: inspectSet,
    RegExp: inspectRegExp,
    Promise: promise_default,
    WeakSet: /* @__PURE__ */ __name((value, options)=>options.stylize("WeakSet{\u2026}", "special"), "WeakSet"),
    WeakMap: /* @__PURE__ */ __name((value, options)=>options.stylize("WeakMap{\u2026}", "special"), "WeakMap"),
    Arguments: inspectArguments,
    Int8Array: inspectTypedArray,
    Uint8Array: inspectTypedArray,
    Uint8ClampedArray: inspectTypedArray,
    Int16Array: inspectTypedArray,
    Uint16Array: inspectTypedArray,
    Int32Array: inspectTypedArray,
    Uint32Array: inspectTypedArray,
    Float32Array: inspectTypedArray,
    Float64Array: inspectTypedArray,
    Generator: /* @__PURE__ */ __name(()=>"", "Generator"),
    DataView: /* @__PURE__ */ __name(()=>"", "DataView"),
    ArrayBuffer: /* @__PURE__ */ __name(()=>"", "ArrayBuffer"),
    Error: inspectObject2,
    HTMLCollection: inspectNodeCollection,
    NodeList: inspectNodeCollection
};
var inspectCustom = /* @__PURE__ */ __name((value, options, type3)=>{
    if (chaiInspect in value && "function" == typeof value[chaiInspect]) return value[chaiInspect](options);
    if (nodeInspect in value && "function" == typeof value[nodeInspect]) return value[nodeInspect](options.depth, options);
    if ("inspect" in value && "function" == typeof value.inspect) return value.inspect(options.depth, options);
    if ("constructor" in value && constructorMap.has(value.constructor)) return constructorMap.get(value.constructor)(value, options);
    if (stringTagMap[type3]) return stringTagMap[type3](value, options);
    return "";
}, "inspectCustom");
var chai_toString = Object.prototype.toString;
function inspect(value, opts = {}) {
    const options = normaliseOptions(opts, inspect);
    const { customInspect } = options;
    let type3 = null === value ? "null" : typeof value;
    if ("object" === type3) type3 = chai_toString.call(value).slice(8, -1);
    if (type3 in baseTypesMap) return baseTypesMap[type3](value, options);
    if (customInspect && value) {
        const output = inspectCustom(value, options, type3);
        if (output) {
            if ("string" == typeof output) return output;
            return inspect(output, options);
        }
    }
    const proto = value ? Object.getPrototypeOf(value) : false;
    if (proto === Object.prototype || null === proto) return inspectObject(value, options);
    if (value && "function" == typeof HTMLElement && value instanceof HTMLElement) return inspectHTML(value, options);
    if ("constructor" in value) {
        if (value.constructor !== Object) return inspectClass(value, options);
        return inspectObject(value, options);
    }
    if (value === Object(value)) return inspectObject(value, options);
    return options.stylize(String(value), type3);
}
__name(inspect, "inspect");
var chai_config = {
    includeStack: false,
    showDiff: true,
    truncateThreshold: 40,
    useProxy: true,
    proxyExcludedKeys: [
        "then",
        "catch",
        "inspect",
        "toJSON"
    ],
    deepEqual: null
};
function inspect2(obj, showHidden, depth, colors) {
    let options = {
        colors,
        depth: void 0 === depth ? 2 : depth,
        showHidden,
        truncate: chai_config.truncateThreshold ? chai_config.truncateThreshold : 1 / 0
    };
    return inspect(obj, options);
}
__name(inspect2, "inspect");
function objDisplay(obj) {
    let str = inspect2(obj), type3 = Object.prototype.toString.call(obj);
    if (!chai_config.truncateThreshold || !(str.length >= chai_config.truncateThreshold)) return str;
    if ("[object Function]" === type3) return obj.name && "" !== obj.name ? "[Function: " + obj.name + "]" : "[Function]";
    if ("[object Array]" === type3) return "[ Array(" + obj.length + ") ]";
    {
        if ("[object Object]" !== type3) return str;
        let keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(", ") + ", ..." : keys.join(", ");
        return "{ Object (" + kstr + ") }";
    }
}
__name(objDisplay, "objDisplay");
function getMessage2(obj, args) {
    let negate = flag(obj, "negate");
    let val = flag(obj, "object");
    let expected = args[3];
    let actual = getActual(obj, args);
    let msg = negate ? args[2] : args[1];
    let flagMsg = flag(obj, "message");
    if ("function" == typeof msg) msg = msg();
    msg = msg || "";
    msg = msg.replace(/#\{this\}/g, function() {
        return objDisplay(val);
    }).replace(/#\{act\}/g, function() {
        return objDisplay(actual);
    }).replace(/#\{exp\}/g, function() {
        return objDisplay(expected);
    });
    return flagMsg ? flagMsg + ": " + msg : msg;
}
__name(getMessage2, "getMessage");
function transferFlags(assertion, object, includeAll) {
    let flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
    if (!object.__flags) object.__flags = /* @__PURE__ */ Object.create(null);
    includeAll = 3 === arguments.length ? includeAll : true;
    for(let flag3 in flags)if (includeAll || "object" !== flag3 && "ssfi" !== flag3 && "lockSsfi" !== flag3 && "message" != flag3) object.__flags[flag3] = flags[flag3];
}
__name(transferFlags, "transferFlags");
function type2(obj) {
    if (void 0 === obj) return "undefined";
    if (null === obj) return "null";
    const stringTag = obj[Symbol.toStringTag];
    if ("string" == typeof stringTag) return stringTag;
    const sliceStart = 8;
    const sliceEnd = -1;
    return Object.prototype.toString.call(obj).slice(sliceStart, sliceEnd);
}
__name(type2, "type");
function FakeMap() {
    this._key = "chai/deep-eql__" + Math.random() + Date.now();
}
__name(FakeMap, "FakeMap");
FakeMap.prototype = {
    get: /* @__PURE__ */ __name(function get(key) {
        return key[this._key];
    }, "get"),
    set: /* @__PURE__ */ __name(function set(key, value) {
        if (Object.isExtensible(key)) Object.defineProperty(key, this._key, {
            value,
            configurable: true
        });
    }, "set")
};
var MemoizeMap = "function" == typeof WeakMap ? WeakMap : FakeMap;
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) return null;
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
        var result = leftHandMap.get(rightHandOperand);
        if ("boolean" == typeof result) return result;
    }
    return null;
}
__name(memoizeCompare, "memoizeCompare");
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) return;
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) leftHandMap.set(rightHandOperand, result);
    else {
        leftHandMap = new MemoizeMap();
        leftHandMap.set(rightHandOperand, result);
        memoizeMap.set(leftHandOperand, leftHandMap);
    }
}
__name(memoizeSet, "memoizeSet");
var deep_eql_default = deepEqual;
function deepEqual(leftHandOperand, rightHandOperand, options) {
    if (options && options.comparator) return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (null !== simpleResult) return simpleResult;
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
__name(deepEqual, "deepEqual");
function simpleEqual(leftHandOperand, rightHandOperand) {
    if (leftHandOperand === rightHandOperand) return 0 !== leftHandOperand || 1 / leftHandOperand === 1 / rightHandOperand;
    if (leftHandOperand !== leftHandOperand && rightHandOperand !== rightHandOperand) return true;
    if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) return false;
    return null;
}
__name(simpleEqual, "simpleEqual");
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
    options = options || {};
    options.memoize = false === options.memoize ? false : options.memoize || new MemoizeMap();
    var comparator = options && options.comparator;
    var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
    if (null !== memoizeResultLeft) return memoizeResultLeft;
    var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
    if (null !== memoizeResultRight) return memoizeResultRight;
    if (comparator) {
        var comparatorResult = comparator(leftHandOperand, rightHandOperand);
        if (false === comparatorResult || true === comparatorResult) {
            memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
            return comparatorResult;
        }
        var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
        if (null !== simpleResult) return simpleResult;
    }
    var leftHandType = type2(leftHandOperand);
    if (leftHandType !== type2(rightHandOperand)) {
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
        return false;
    }
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
    var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
    return result;
}
__name(extensiveDeepEqual, "extensiveDeepEqual");
function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
    switch(leftHandType){
        case "String":
        case "Number":
        case "Boolean":
        case "Date":
            return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
        case "Promise":
        case "Symbol":
        case "function":
        case "WeakMap":
        case "WeakSet":
            return leftHandOperand === rightHandOperand;
        case "Error":
            return keysEqual(leftHandOperand, rightHandOperand, [
                "name",
                "message",
                "code"
            ], options);
        case "Arguments":
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "Array":
            return iterableEqual(leftHandOperand, rightHandOperand, options);
        case "RegExp":
            return regexpEqual(leftHandOperand, rightHandOperand);
        case "Generator":
            return generatorEqual(leftHandOperand, rightHandOperand, options);
        case "DataView":
            return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
        case "ArrayBuffer":
            return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
        case "Set":
            return entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Map":
            return entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.Instant":
        case "Temporal.ZonedDateTime":
        case "Temporal.PlainYearMonth":
        case "Temporal.PlainMonthDay":
            return leftHandOperand.equals(rightHandOperand);
        case "Temporal.Duration":
            return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
        case "Temporal.TimeZone":
        case "Temporal.Calendar":
            return leftHandOperand.toString() === rightHandOperand.toString();
        default:
            return objectEqual(leftHandOperand, rightHandOperand, options);
    }
}
__name(extensiveDeepEqualByType, "extensiveDeepEqualByType");
function regexpEqual(leftHandOperand, rightHandOperand) {
    return leftHandOperand.toString() === rightHandOperand.toString();
}
__name(regexpEqual, "regexpEqual");
function entriesEqual(leftHandOperand, rightHandOperand, options) {
    try {
        if (leftHandOperand.size !== rightHandOperand.size) return false;
        if (0 === leftHandOperand.size) return true;
    } catch (sizeError) {
        return false;
    }
    var leftHandItems = [];
    var rightHandItems = [];
    leftHandOperand.forEach(/* @__PURE__ */ __name(function gatherEntries(key, value) {
        leftHandItems.push([
            key,
            value
        ]);
    }, "gatherEntries"));
    rightHandOperand.forEach(/* @__PURE__ */ __name(function gatherEntries(key, value) {
        rightHandItems.push([
            key,
            value
        ]);
    }, "gatherEntries"));
    return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}
__name(entriesEqual, "entriesEqual");
function iterableEqual(leftHandOperand, rightHandOperand, options) {
    var length = leftHandOperand.length;
    if (length !== rightHandOperand.length) return false;
    if (0 === length) return true;
    var index = -1;
    while(++index < length)if (false === deepEqual(leftHandOperand[index], rightHandOperand[index], options)) return false;
    return true;
}
__name(iterableEqual, "iterableEqual");
function generatorEqual(leftHandOperand, rightHandOperand, options) {
    return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}
__name(generatorEqual, "generatorEqual");
function hasIteratorFunction(target) {
    return "u" > typeof Symbol && "object" == typeof target && void 0 !== Symbol.iterator && "function" == typeof target[Symbol.iterator];
}
__name(hasIteratorFunction, "hasIteratorFunction");
function getIteratorEntries(target) {
    if (hasIteratorFunction(target)) try {
        return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {}
    return [];
}
__name(getIteratorEntries, "getIteratorEntries");
function getGeneratorEntries(generator) {
    var generatorResult = generator.next();
    var accumulator = [
        generatorResult.value
    ];
    while(false === generatorResult.done){
        generatorResult = generator.next();
        accumulator.push(generatorResult.value);
    }
    return accumulator;
}
__name(getGeneratorEntries, "getGeneratorEntries");
function getEnumerableKeys(target) {
    var keys = [];
    for(var key in target)keys.push(key);
    return keys;
}
__name(getEnumerableKeys, "getEnumerableKeys");
function getEnumerableSymbols(target) {
    var keys = [];
    var allKeys = Object.getOwnPropertySymbols(target);
    for(var i = 0; i < allKeys.length; i += 1){
        var key = allKeys[i];
        if (Object.getOwnPropertyDescriptor(target, key).enumerable) keys.push(key);
    }
    return keys;
}
__name(getEnumerableSymbols, "getEnumerableSymbols");
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
    var length = keys.length;
    if (0 === length) return true;
    for(var i = 0; i < length; i += 1)if (false === deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options)) return false;
    return true;
}
__name(keysEqual, "keysEqual");
function objectEqual(leftHandOperand, rightHandOperand, options) {
    var leftHandKeys = getEnumerableKeys(leftHandOperand);
    var rightHandKeys = getEnumerableKeys(rightHandOperand);
    var leftHandSymbols = getEnumerableSymbols(leftHandOperand);
    var rightHandSymbols = getEnumerableSymbols(rightHandOperand);
    leftHandKeys = leftHandKeys.concat(leftHandSymbols);
    rightHandKeys = rightHandKeys.concat(rightHandSymbols);
    if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
        if (false === iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort())) return false;
        return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
    }
    var leftHandEntries = getIteratorEntries(leftHandOperand);
    var rightHandEntries = getIteratorEntries(rightHandOperand);
    if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
        leftHandEntries.sort();
        rightHandEntries.sort();
        return iterableEqual(leftHandEntries, rightHandEntries, options);
    }
    if (0 === leftHandKeys.length && 0 === leftHandEntries.length && 0 === rightHandKeys.length && 0 === rightHandEntries.length) return true;
    return false;
}
__name(objectEqual, "objectEqual");
function isPrimitive(value) {
    return null === value || "object" != typeof value;
}
__name(isPrimitive, "isPrimitive");
function mapSymbols(arr) {
    return arr.map(/* @__PURE__ */ __name(function mapSymbol(entry) {
        if ("symbol" == typeof entry) return entry.toString();
        return entry;
    }, "mapSymbol"));
}
__name(mapSymbols, "mapSymbols");
function hasProperty(obj, name) {
    if (null == obj) return false;
    return name in Object(obj);
}
__name(hasProperty, "hasProperty");
function parsePath(path) {
    const str = path.replace(/([^\\])\[/g, "$1.[");
    const parts = str.match(/(\\\.|[^.]+?)+/g);
    return parts.map((value)=>{
        if ("constructor" === value || "__proto__" === value || "prototype" === value) return {};
        const regexp = /^\[(\d+)\]$/;
        const mArr = regexp.exec(value);
        let parsed = null;
        parsed = mArr ? {
            i: parseFloat(mArr[1])
        } : {
            p: value.replace(/\\([.[\]])/g, "$1")
        };
        return parsed;
    });
}
__name(parsePath, "parsePath");
function internalGetPathValue(obj, parsed, pathDepth) {
    let temporaryValue = obj;
    let res = null;
    pathDepth = void 0 === pathDepth ? parsed.length : pathDepth;
    for(let i = 0; i < pathDepth; i++){
        const part = parsed[i];
        if (temporaryValue) {
            temporaryValue = void 0 === part.p ? temporaryValue[part.i] : temporaryValue[part.p];
            if (i === pathDepth - 1) res = temporaryValue;
        }
    }
    return res;
}
__name(internalGetPathValue, "internalGetPathValue");
function getPathInfo(obj, path) {
    const parsed = parsePath(path);
    const last = parsed[parsed.length - 1];
    const info = {
        parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
        name: last.p || last.i,
        value: internalGetPathValue(obj, parsed)
    };
    info.exists = hasProperty(info.parent, info.name);
    return info;
}
__name(getPathInfo, "getPathInfo");
var Assertion = class _Assertion {
    static{
        __name(this, "Assertion");
    }
    __flags = {};
    constructor(obj, msg, ssfi, lockSsfi){
        flag(this, "ssfi", ssfi || _Assertion);
        flag(this, "lockSsfi", lockSsfi);
        flag(this, "object", obj);
        flag(this, "message", msg);
        flag(this, "eql", chai_config.deepEqual || deep_eql_default);
        return proxify(this);
    }
    static get includeStack() {
        console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
        return chai_config.includeStack;
    }
    static set includeStack(value) {
        console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
        chai_config.includeStack = value;
    }
    static get showDiff() {
        console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
        return chai_config.showDiff;
    }
    static set showDiff(value) {
        console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
        chai_config.showDiff = value;
    }
    static addProperty(name, fn) {
        addProperty(this.prototype, name, fn);
    }
    static addMethod(name, fn) {
        chai_addMethod(this.prototype, name, fn);
    }
    static addChainableMethod(name, fn, chainingBehavior) {
        addChainableMethod(this.prototype, name, fn, chainingBehavior);
    }
    static overwriteProperty(name, fn) {
        overwriteProperty(this.prototype, name, fn);
    }
    static overwriteMethod(name, fn) {
        overwriteMethod(this.prototype, name, fn);
    }
    static overwriteChainableMethod(name, fn, chainingBehavior) {
        overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
    }
    assert(_expr, msg, _negateMsg, expected, _actual, showDiff) {
        const ok = chai_test(this, arguments);
        if (false !== showDiff) showDiff = true;
        if (void 0 === expected && void 0 === _actual) showDiff = false;
        if (true !== chai_config.showDiff) showDiff = false;
        if (!ok) {
            msg = getMessage2(this, arguments);
            const actual = getActual(this, arguments);
            const assertionErrorObjectProperties = {
                actual,
                expected,
                showDiff
            };
            const operator = getOperator(this, arguments);
            if (operator) assertionErrorObjectProperties.operator = operator;
            throw new chai_AssertionError(msg, assertionErrorObjectProperties, chai_config.includeStack ? this.assert : flag(this, "ssfi"));
        }
    }
    get _obj() {
        return flag(this, "object");
    }
    set _obj(val) {
        flag(this, "object", val);
    }
};
function isProxyEnabled() {
    return chai_config.useProxy && "u" > typeof Proxy && "u" > typeof Reflect;
}
__name(isProxyEnabled, "isProxyEnabled");
function addProperty(ctx, name, getter) {
    getter = void 0 === getter ? function() {} : getter;
    Object.defineProperty(ctx, name, {
        get: /* @__PURE__ */ __name(function propertyGetter() {
            if (!isProxyEnabled() && !flag(this, "lockSsfi")) flag(this, "ssfi", propertyGetter);
            let result = getter.call(this);
            if (void 0 !== result) return result;
            let newAssertion = new Assertion();
            transferFlags(this, newAssertion);
            return newAssertion;
        }, "propertyGetter"),
        configurable: true
    });
}
__name(addProperty, "addProperty");
var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {}, "length");
function addLengthGuard(fn, assertionName, isChainable) {
    if (!fnLengthDesc.configurable) return fn;
    Object.defineProperty(fn, "length", {
        get: /* @__PURE__ */ __name(function() {
            if (isChainable) throw Error("Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
            throw Error("Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
        }, "get")
    });
    return fn;
}
__name(addLengthGuard, "addLengthGuard");
function getProperties(object) {
    let result = Object.getOwnPropertyNames(object);
    function addProperty2(property) {
        if (-1 === result.indexOf(property)) result.push(property);
    }
    __name(addProperty2, "addProperty");
    let proto = Object.getPrototypeOf(object);
    while(null !== proto){
        Object.getOwnPropertyNames(proto).forEach(addProperty2);
        proto = Object.getPrototypeOf(proto);
    }
    return result;
}
__name(getProperties, "getProperties");
var builtins = [
    "__flags",
    "__methods",
    "_obj",
    "assert"
];
function proxify(obj, nonChainableMethodName) {
    if (!isProxyEnabled()) return obj;
    return new Proxy(obj, {
        get: /* @__PURE__ */ __name(function proxyGetter(target, property) {
            if ("string" == typeof property && -1 === chai_config.proxyExcludedKeys.indexOf(property) && !Reflect.has(target, property)) {
                if (nonChainableMethodName) throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
                let suggestion = null;
                let suggestionDistance = 4;
                getProperties(target).forEach(function(prop) {
                    if (!Object.prototype.hasOwnProperty(prop) && -1 === builtins.indexOf(prop)) {
                        let dist = stringDistanceCapped(property, prop, suggestionDistance);
                        if (dist < suggestionDistance) {
                            suggestion = prop;
                            suggestionDistance = dist;
                        }
                    }
                });
                if (null !== suggestion) throw Error("Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?');
                throw Error("Invalid Chai property: " + property);
            }
            if (-1 === builtins.indexOf(property) && !flag(target, "lockSsfi")) flag(target, "ssfi", proxyGetter);
            return Reflect.get(target, property);
        }, "proxyGetter")
    });
}
__name(proxify, "proxify");
function stringDistanceCapped(strA, strB, cap) {
    if (Math.abs(strA.length - strB.length) >= cap) return cap;
    let memo = [];
    for(let i = 0; i <= strA.length; i++){
        memo[i] = Array(strB.length + 1).fill(0);
        memo[i][0] = i;
    }
    for(let j = 0; j < strB.length; j++)memo[0][j] = j;
    for(let i = 1; i <= strA.length; i++){
        let ch = strA.charCodeAt(i - 1);
        for(let j = 1; j <= strB.length; j++){
            if (Math.abs(i - j) >= cap) {
                memo[i][j] = cap;
                continue;
            }
            memo[i][j] = Math.min(memo[i - 1][j] + 1, memo[i][j - 1] + 1, memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1));
        }
    }
    return memo[strA.length][strB.length];
}
__name(stringDistanceCapped, "stringDistanceCapped");
function chai_addMethod(ctx, name, method) {
    let methodWrapper = /* @__PURE__ */ __name(function() {
        if (!flag(this, "lockSsfi")) flag(this, "ssfi", methodWrapper);
        let result = method.apply(this, arguments);
        if (void 0 !== result) return result;
        let newAssertion = new Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
    }, "methodWrapper");
    addLengthGuard(methodWrapper, name, false);
    ctx[name] = proxify(methodWrapper, name);
}
__name(chai_addMethod, "addMethod");
function overwriteProperty(ctx, name, getter) {
    let _get = Object.getOwnPropertyDescriptor(ctx, name), _super = /* @__PURE__ */ __name(function() {}, "_super");
    if (_get && "function" == typeof _get.get) _super = _get.get;
    Object.defineProperty(ctx, name, {
        get: /* @__PURE__ */ __name(function overwritingPropertyGetter() {
            if (!isProxyEnabled() && !flag(this, "lockSsfi")) flag(this, "ssfi", overwritingPropertyGetter);
            let origLockSsfi = flag(this, "lockSsfi");
            flag(this, "lockSsfi", true);
            let result = getter(_super).call(this);
            flag(this, "lockSsfi", origLockSsfi);
            if (void 0 !== result) return result;
            let newAssertion = new Assertion();
            transferFlags(this, newAssertion);
            return newAssertion;
        }, "overwritingPropertyGetter"),
        configurable: true
    });
}
__name(overwriteProperty, "overwriteProperty");
function overwriteMethod(ctx, name, method) {
    let _method = ctx[name], _super = /* @__PURE__ */ __name(function() {
        throw new Error(name + " is not a function");
    }, "_super");
    if (_method && "function" == typeof _method) _super = _method;
    let overwritingMethodWrapper = /* @__PURE__ */ __name(function() {
        if (!flag(this, "lockSsfi")) flag(this, "ssfi", overwritingMethodWrapper);
        let origLockSsfi = flag(this, "lockSsfi");
        flag(this, "lockSsfi", true);
        let result = method(_super).apply(this, arguments);
        flag(this, "lockSsfi", origLockSsfi);
        if (void 0 !== result) return result;
        let newAssertion = new Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
    }, "overwritingMethodWrapper");
    addLengthGuard(overwritingMethodWrapper, name, false);
    ctx[name] = proxify(overwritingMethodWrapper, name);
}
__name(overwriteMethod, "overwriteMethod");
var canSetPrototype = "function" == typeof Object.setPrototypeOf;
var chai_testFn = /* @__PURE__ */ __name(function() {}, "testFn");
var excludeNames = Object.getOwnPropertyNames(chai_testFn).filter(function(name) {
    let propDesc = Object.getOwnPropertyDescriptor(chai_testFn, name);
    if ("object" != typeof propDesc) return true;
    return !propDesc.configurable;
});
var call = Function.prototype.call;
var apply = Function.prototype.apply;
function addChainableMethod(ctx, name, method, chainingBehavior) {
    if ("function" != typeof chainingBehavior) chainingBehavior = /* @__PURE__ */ __name(function() {}, "chainingBehavior");
    let chainableBehavior = {
        method,
        chainingBehavior
    };
    if (!ctx.__methods) ctx.__methods = {};
    ctx.__methods[name] = chainableBehavior;
    Object.defineProperty(ctx, name, {
        get: /* @__PURE__ */ __name(function chainableMethodGetter() {
            chainableBehavior.chainingBehavior.call(this);
            let chainableMethodWrapper = /* @__PURE__ */ __name(function() {
                if (!flag(this, "lockSsfi")) flag(this, "ssfi", chainableMethodWrapper);
                let result = chainableBehavior.method.apply(this, arguments);
                if (void 0 !== result) return result;
                let newAssertion = new Assertion();
                transferFlags(this, newAssertion);
                return newAssertion;
            }, "chainableMethodWrapper");
            addLengthGuard(chainableMethodWrapper, name, true);
            if (canSetPrototype) {
                let prototype = Object.create(this);
                prototype.call = call;
                prototype.apply = apply;
                Object.setPrototypeOf(chainableMethodWrapper, prototype);
            } else {
                let asserterNames = Object.getOwnPropertyNames(ctx);
                asserterNames.forEach(function(asserterName) {
                    if (-1 !== excludeNames.indexOf(asserterName)) return;
                    let pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                    Object.defineProperty(chainableMethodWrapper, asserterName, pd);
                });
            }
            transferFlags(this, chainableMethodWrapper);
            return proxify(chainableMethodWrapper);
        }, "chainableMethodGetter"),
        configurable: true
    });
}
__name(addChainableMethod, "addChainableMethod");
function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
    let chainableBehavior = ctx.__methods[name];
    let _chainingBehavior = chainableBehavior.chainingBehavior;
    chainableBehavior.chainingBehavior = /* @__PURE__ */ __name(function overwritingChainableMethodGetter() {
        let result = chainingBehavior(_chainingBehavior).call(this);
        if (void 0 !== result) return result;
        let newAssertion = new Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
    }, "overwritingChainableMethodGetter");
    let _method = chainableBehavior.method;
    chainableBehavior.method = /* @__PURE__ */ __name(function overwritingChainableMethodWrapper() {
        let result = method(_method).apply(this, arguments);
        if (void 0 !== result) return result;
        let newAssertion = new Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
    }, "overwritingChainableMethodWrapper");
}
__name(overwriteChainableMethod, "overwriteChainableMethod");
function compareByInspect(a, b) {
    return inspect2(a) < inspect2(b) ? -1 : 1;
}
__name(compareByInspect, "compareByInspect");
function getOwnEnumerablePropertySymbols(obj) {
    if ("function" != typeof Object.getOwnPropertySymbols) return [];
    return Object.getOwnPropertySymbols(obj).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
    });
}
__name(getOwnEnumerablePropertySymbols, "getOwnEnumerablePropertySymbols");
function getOwnEnumerableProperties(obj) {
    return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
}
__name(getOwnEnumerableProperties, "getOwnEnumerableProperties");
var isNaN2 = Number.isNaN;
function isObjectType(obj) {
    let objectType = chai_type(obj);
    let objectTypes = [
        "Array",
        "Object",
        "Function"
    ];
    return -1 !== objectTypes.indexOf(objectType);
}
__name(isObjectType, "isObjectType");
function getOperator(obj, args) {
    let operator = flag(obj, "operator");
    let negate = flag(obj, "negate");
    let expected = args[3];
    let msg = negate ? args[2] : args[1];
    if (operator) return operator;
    if ("function" == typeof msg) msg = msg();
    msg = msg || "";
    if (!msg) return;
    if (/\shave\s/.test(msg)) return;
    let isObject = isObjectType(expected);
    if (/\snot\s/.test(msg)) return isObject ? "notDeepStrictEqual" : "notStrictEqual";
    return isObject ? "deepStrictEqual" : "strictEqual";
}
__name(getOperator, "getOperator");
function getName(fn) {
    return fn.name;
}
__name(getName, "getName");
function isRegExp2(obj) {
    return "[object RegExp]" === Object.prototype.toString.call(obj);
}
__name(isRegExp2, "isRegExp");
function isNumeric(obj) {
    return [
        "Number",
        "BigInt"
    ].includes(chai_type(obj));
}
__name(isNumeric, "isNumeric");
var { flag: flag2 } = utils_exports;
[
    "to",
    "be",
    "been",
    "is",
    "and",
    "has",
    "have",
    "with",
    "that",
    "which",
    "at",
    "of",
    "same",
    "but",
    "does",
    "still",
    "also"
].forEach(function(chain) {
    Assertion.addProperty(chain);
});
Assertion.addProperty("not", function() {
    flag2(this, "negate", true);
});
Assertion.addProperty("deep", function() {
    flag2(this, "deep", true);
});
Assertion.addProperty("nested", function() {
    flag2(this, "nested", true);
});
Assertion.addProperty("own", function() {
    flag2(this, "own", true);
});
Assertion.addProperty("ordered", function() {
    flag2(this, "ordered", true);
});
Assertion.addProperty("any", function() {
    flag2(this, "any", true);
    flag2(this, "all", false);
});
Assertion.addProperty("all", function() {
    flag2(this, "all", true);
    flag2(this, "any", false);
});
var functionTypes = {
    function: [
        "function",
        "asyncfunction",
        "generatorfunction",
        "asyncgeneratorfunction"
    ],
    asyncfunction: [
        "asyncfunction",
        "asyncgeneratorfunction"
    ],
    generatorfunction: [
        "generatorfunction",
        "asyncgeneratorfunction"
    ],
    asyncgeneratorfunction: [
        "asyncgeneratorfunction"
    ]
};
function an(type3, msg) {
    if (msg) flag2(this, "message", msg);
    type3 = type3.toLowerCase();
    let obj = flag2(this, "object"), article = ~[
        "a",
        "e",
        "i",
        "o",
        "u"
    ].indexOf(type3.charAt(0)) ? "an " : "a ";
    const detectedType = chai_type(obj).toLowerCase();
    if (functionTypes["function"].includes(type3)) this.assert(functionTypes[type3].includes(detectedType), "expected #{this} to be " + article + type3, "expected #{this} not to be " + article + type3);
    else this.assert(type3 === detectedType, "expected #{this} to be " + article + type3, "expected #{this} not to be " + article + type3);
}
__name(an, "an");
Assertion.addChainableMethod("an", an);
Assertion.addChainableMethod("a", an);
function SameValueZero(a, b) {
    return isNaN2(a) && isNaN2(b) || a === b;
}
__name(SameValueZero, "SameValueZero");
function includeChainingBehavior() {
    flag2(this, "contains", true);
}
__name(includeChainingBehavior, "includeChainingBehavior");
function include(val, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), objType = chai_type(obj).toLowerCase(), flagMsg = flag2(this, "message"), negate = flag2(this, "negate"), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), descriptor = isDeep ? "deep " : "", isEql = isDeep ? flag2(this, "eql") : SameValueZero;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    let included = false;
    switch(objType){
        case "string":
            included = -1 !== obj.indexOf(val);
            break;
        case "weakset":
            if (isDeep) throw new chai_AssertionError(flagMsg + "unable to use .deep.include with WeakSet", void 0, ssfi);
            included = obj.has(val);
            break;
        case "map":
            obj.forEach(function(item) {
                included = included || isEql(item, val);
            });
            break;
        case "set":
            if (isDeep) obj.forEach(function(item) {
                included = included || isEql(item, val);
            });
            else included = obj.has(val);
            break;
        case "array":
            included = isDeep ? obj.some(function(item) {
                return isEql(item, val);
            }) : -1 !== obj.indexOf(val);
            break;
        default:
            {
                if (val !== Object(val)) throw new chai_AssertionError(flagMsg + "the given combination of arguments (" + objType + " and " + chai_type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + chai_type(val).toLowerCase(), void 0, ssfi);
                let props = Object.keys(val);
                let firstErr = null;
                let numErrs = 0;
                props.forEach(function(prop) {
                    let propAssertion = new Assertion(obj);
                    transferFlags(this, propAssertion, true);
                    flag2(propAssertion, "lockSsfi", true);
                    if (!negate || 1 === props.length) return void propAssertion.property(prop, val[prop]);
                    try {
                        propAssertion.property(prop, val[prop]);
                    } catch (err) {
                        if (!check_error_exports.compatibleConstructor(err, chai_AssertionError)) throw err;
                        if (null === firstErr) firstErr = err;
                        numErrs++;
                    }
                }, this);
                if (negate && props.length > 1 && numErrs === props.length) throw firstErr;
                return;
            }
    }
    this.assert(included, "expected #{this} to " + descriptor + "include " + inspect2(val), "expected #{this} to not " + descriptor + "include " + inspect2(val));
}
__name(include, "include");
Assertion.addChainableMethod("include", include, includeChainingBehavior);
Assertion.addChainableMethod("contain", include, includeChainingBehavior);
Assertion.addChainableMethod("contains", include, includeChainingBehavior);
Assertion.addChainableMethod("includes", include, includeChainingBehavior);
Assertion.addProperty("ok", function() {
    this.assert(flag2(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy");
});
Assertion.addProperty("true", function() {
    this.assert(true === flag2(this, "object"), "expected #{this} to be true", "expected #{this} to be false", !flag2(this, "negate"));
});
Assertion.addProperty("numeric", function() {
    const object = flag2(this, "object");
    this.assert([
        "Number",
        "BigInt"
    ].includes(chai_type(object)), "expected #{this} to be numeric", "expected #{this} to not be numeric", !flag2(this, "negate"));
});
Assertion.addProperty("callable", function() {
    const val = flag2(this, "object");
    const ssfi = flag2(this, "ssfi");
    const message = flag2(this, "message");
    const msg = message ? `${message}: ` : "";
    const negate = flag2(this, "negate");
    const assertionMessage = negate ? `${msg}expected ${inspect2(val)} not to be a callable function` : `${msg}expected ${inspect2(val)} to be a callable function`;
    const isCallable = [
        "Function",
        "AsyncFunction",
        "GeneratorFunction",
        "AsyncGeneratorFunction"
    ].includes(chai_type(val));
    if (isCallable && negate || !isCallable && !negate) throw new chai_AssertionError(assertionMessage, void 0, ssfi);
});
Assertion.addProperty("false", function() {
    this.assert(false === flag2(this, "object"), "expected #{this} to be false", "expected #{this} to be true", !!flag2(this, "negate"));
});
Assertion.addProperty("null", function() {
    this.assert(null === flag2(this, "object"), "expected #{this} to be null", "expected #{this} not to be null");
});
Assertion.addProperty("undefined", function() {
    this.assert(void 0 === flag2(this, "object"), "expected #{this} to be undefined", "expected #{this} not to be undefined");
});
Assertion.addProperty("NaN", function() {
    this.assert(isNaN2(flag2(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN");
});
function assertExist() {
    let val = flag2(this, "object");
    this.assert(null != val, "expected #{this} to exist", "expected #{this} to not exist");
}
__name(assertExist, "assertExist");
Assertion.addProperty("exist", assertExist);
Assertion.addProperty("exists", assertExist);
Assertion.addProperty("empty", function() {
    let val = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), itemsCount;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    switch(chai_type(val).toLowerCase()){
        case "array":
        case "string":
            itemsCount = val.length;
            break;
        case "map":
        case "set":
            itemsCount = val.size;
            break;
        case "weakmap":
        case "weakset":
            throw new chai_AssertionError(flagMsg + ".empty was passed a weak collection", void 0, ssfi);
        case "function":
            {
                const msg = flagMsg + ".empty was passed a function " + getName(val);
                throw new chai_AssertionError(msg.trim(), void 0, ssfi);
            }
        default:
            if (val !== Object(val)) throw new chai_AssertionError(flagMsg + ".empty was passed non-string primitive " + inspect2(val), void 0, ssfi);
            itemsCount = Object.keys(val).length;
    }
    this.assert(0 === itemsCount, "expected #{this} to be empty", "expected #{this} not to be empty");
});
function checkArguments() {
    let obj = flag2(this, "object"), type3 = chai_type(obj);
    this.assert("Arguments" === type3, "expected #{this} to be arguments but got " + type3, "expected #{this} to not be arguments");
}
__name(checkArguments, "checkArguments");
Assertion.addProperty("arguments", checkArguments);
Assertion.addProperty("Arguments", checkArguments);
function assertEqual(val, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    if (flag2(this, "deep")) {
        let prevLockSsfi = flag2(this, "lockSsfi");
        flag2(this, "lockSsfi", true);
        this.eql(val);
        flag2(this, "lockSsfi", prevLockSsfi);
    } else this.assert(val === obj, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", val, this._obj, true);
}
__name(assertEqual, "assertEqual");
Assertion.addMethod("equal", assertEqual);
Assertion.addMethod("equals", assertEqual);
Assertion.addMethod("eq", assertEqual);
function assertEql(obj, msg) {
    if (msg) flag2(this, "message", msg);
    let eql = flag2(this, "eql");
    this.assert(eql(obj, flag2(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", obj, this._obj, true);
}
__name(assertEql, "assertEql");
Assertion.addMethod("eql", assertEql);
Assertion.addMethod("eqls", assertEql);
function assertAbove(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = chai_type(obj).toLowerCase(), nType = chai_type(n).toLowerCase();
    if (doLength && "map" !== objType && "set" !== objType) new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) {
        if (!isNumeric(n) && (doLength || isNumeric(obj))) throw new chai_AssertionError(msgPrefix + "the argument to above must be a number", void 0, ssfi);
        else if (!doLength && "date" !== objType && !isNumeric(obj)) {
            let printObj = "string" === objType ? "'" + obj + "'" : obj;
            throw new chai_AssertionError(msgPrefix + "expected " + printObj + " to be a number or a date", void 0, ssfi);
        }
    } else throw new chai_AssertionError(msgPrefix + "the argument to above must be a date", void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount > n, "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " above #{exp}", n, itemsCount);
    } else this.assert(obj > n, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", n);
}
__name(assertAbove, "assertAbove");
Assertion.addMethod("above", assertAbove);
Assertion.addMethod("gt", assertAbove);
Assertion.addMethod("greaterThan", assertAbove);
function assertLeast(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = chai_type(obj).toLowerCase(), nType = chai_type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && "map" !== objType && "set" !== objType) new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) if (!isNumeric(n) && (doLength || isNumeric(obj))) errorMessage = msgPrefix + "the argument to least must be a number";
    else if (doLength || "date" === objType || isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the argument to least must be a date";
    if (shouldThrow) throw new chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount >= n, "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " below #{exp}", n, itemsCount);
    } else this.assert(obj >= n, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", n);
}
__name(assertLeast, "assertLeast");
Assertion.addMethod("least", assertLeast);
Assertion.addMethod("gte", assertLeast);
Assertion.addMethod("greaterThanOrEqual", assertLeast);
function assertBelow(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = chai_type(obj).toLowerCase(), nType = chai_type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && "map" !== objType && "set" !== objType) new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) if (!isNumeric(n) && (doLength || isNumeric(obj))) errorMessage = msgPrefix + "the argument to below must be a number";
    else if (doLength || "date" === objType || isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the argument to below must be a date";
    if (shouldThrow) throw new chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount < n, "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " below #{exp}", n, itemsCount);
    } else this.assert(obj < n, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", n);
}
__name(assertBelow, "assertBelow");
Assertion.addMethod("below", assertBelow);
Assertion.addMethod("lt", assertBelow);
Assertion.addMethod("lessThan", assertBelow);
function assertMost(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = chai_type(obj).toLowerCase(), nType = chai_type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && "map" !== objType && "set" !== objType) new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) if (!isNumeric(n) && (doLength || isNumeric(obj))) errorMessage = msgPrefix + "the argument to most must be a number";
    else if (doLength || "date" === objType || isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the argument to most must be a date";
    if (shouldThrow) throw new chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount <= n, "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " above #{exp}", n, itemsCount);
    } else this.assert(obj <= n, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", n);
}
__name(assertMost, "assertMost");
Assertion.addMethod("most", assertMost);
Assertion.addMethod("lte", assertMost);
Assertion.addMethod("lessThanOrEqual", assertMost);
Assertion.addMethod("within", function(start, finish, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = chai_type(obj).toLowerCase(), startType = chai_type(start).toLowerCase(), finishType = chai_type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = "date" === startType && "date" === finishType ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
    if (doLength && "map" !== objType && "set" !== objType) new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === startType && "date" === finishType) if ((!isNumeric(start) || !isNumeric(finish)) && (doLength || isNumeric(obj))) errorMessage = msgPrefix + "the arguments to within must be numbers";
    else if (doLength || "date" === objType || isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the arguments to within must be dates";
    if (shouldThrow) throw new chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount >= start && itemsCount <= finish, "expected #{this} to have a " + descriptor + " within " + range, "expected #{this} to not have a " + descriptor + " within " + range);
    } else this.assert(obj >= start && obj <= finish, "expected #{this} to be within " + range, "expected #{this} to not be within " + range);
});
function assertInstanceOf(constructor, msg) {
    if (msg) flag2(this, "message", msg);
    let target = flag2(this, "object");
    let ssfi = flag2(this, "ssfi");
    let flagMsg = flag2(this, "message");
    let isInstanceOf;
    try {
        isInstanceOf = target instanceof constructor;
    } catch (err) {
        if (err instanceof TypeError) {
            flagMsg = flagMsg ? flagMsg + ": " : "";
            throw new chai_AssertionError(flagMsg + "The instanceof assertion needs a constructor but " + chai_type(constructor) + " was given.", void 0, ssfi);
        }
        throw err;
    }
    let name = getName(constructor);
    if (null == name) name = "an unnamed constructor";
    this.assert(isInstanceOf, "expected #{this} to be an instance of " + name, "expected #{this} to not be an instance of " + name);
}
__name(assertInstanceOf, "assertInstanceOf");
Assertion.addMethod("instanceof", assertInstanceOf);
Assertion.addMethod("instanceOf", assertInstanceOf);
function assertProperty(name, val, msg) {
    if (msg) flag2(this, "message", msg);
    let isNested = flag2(this, "nested"), isOwn = flag2(this, "own"), flagMsg = flag2(this, "message"), obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), nameType = typeof name;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    if (isNested) {
        if ("string" !== nameType) throw new chai_AssertionError(flagMsg + "the argument to property must be a string when using nested syntax", void 0, ssfi);
    } else if ("string" !== nameType && "number" !== nameType && "symbol" !== nameType) throw new chai_AssertionError(flagMsg + "the argument to property must be a string, number, or symbol", void 0, ssfi);
    if (isNested && isOwn) throw new chai_AssertionError(flagMsg + 'The "nested" and "own" flags cannot be combined.', void 0, ssfi);
    if (null == obj) throw new chai_AssertionError(flagMsg + "Target cannot be null or undefined.", void 0, ssfi);
    let isDeep = flag2(this, "deep"), negate = flag2(this, "negate"), pathInfo = isNested ? getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name], isEql = isDeep ? flag2(this, "eql") : (val1, val2)=>val1 === val2;
    let descriptor = "";
    if (isDeep) descriptor += "deep ";
    if (isOwn) descriptor += "own ";
    if (isNested) descriptor += "nested ";
    descriptor += "property ";
    let hasProperty2;
    hasProperty2 = isOwn ? Object.prototype.hasOwnProperty.call(obj, name) : isNested ? pathInfo.exists : hasProperty(obj, name);
    if (!negate || 1 === arguments.length) this.assert(hasProperty2, "expected #{this} to have " + descriptor + inspect2(name), "expected #{this} to not have " + descriptor + inspect2(name));
    if (arguments.length > 1) this.assert(hasProperty2 && isEql(val, value), "expected #{this} to have " + descriptor + inspect2(name) + " of #{exp}, but got #{act}", "expected #{this} to not have " + descriptor + inspect2(name) + " of #{act}", val, value);
    flag2(this, "object", value);
}
__name(assertProperty, "assertProperty");
Assertion.addMethod("property", assertProperty);
function assertOwnProperty(_name, _value, _msg) {
    flag2(this, "own", true);
    assertProperty.apply(this, arguments);
}
__name(assertOwnProperty, "assertOwnProperty");
Assertion.addMethod("ownProperty", assertOwnProperty);
Assertion.addMethod("haveOwnProperty", assertOwnProperty);
function assertOwnPropertyDescriptor(name, descriptor, msg) {
    if ("string" == typeof descriptor) {
        msg = descriptor;
        descriptor = null;
    }
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    let actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    let eql = flag2(this, "eql");
    if (actualDescriptor && descriptor) this.assert(eql(descriptor, actualDescriptor), "expected the own property descriptor for " + inspect2(name) + " on #{this} to match " + inspect2(descriptor) + ", got " + inspect2(actualDescriptor), "expected the own property descriptor for " + inspect2(name) + " on #{this} to not match " + inspect2(descriptor), descriptor, actualDescriptor, true);
    else this.assert(actualDescriptor, "expected #{this} to have an own property descriptor for " + inspect2(name), "expected #{this} to not have an own property descriptor for " + inspect2(name));
    flag2(this, "object", actualDescriptor);
}
__name(assertOwnPropertyDescriptor, "assertOwnPropertyDescriptor");
Assertion.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
Assertion.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
function assertLengthChain() {
    flag2(this, "doLength", true);
}
__name(assertLengthChain, "assertLengthChain");
function assertLength(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), objType = chai_type(obj).toLowerCase(), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), descriptor = "length", itemsCount;
    switch(objType){
        case "map":
        case "set":
            descriptor = "size";
            itemsCount = obj.size;
            break;
        default:
            new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
            itemsCount = obj.length;
    }
    this.assert(itemsCount == n, "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " of #{act}", n, itemsCount);
}
__name(assertLength, "assertLength");
Assertion.addChainableMethod("length", assertLength, assertLengthChain);
Assertion.addChainableMethod("lengthOf", assertLength, assertLengthChain);
function assertMatch(re, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    this.assert(re.exec(obj), "expected #{this} to match " + re, "expected #{this} not to match " + re);
}
__name(assertMatch, "assertMatch");
Assertion.addMethod("match", assertMatch);
Assertion.addMethod("matches", assertMatch);
Assertion.addMethod("string", function(str, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(obj, flagMsg, ssfi, true).is.a("string");
    this.assert(~obj.indexOf(str), "expected #{this} to contain " + inspect2(str), "expected #{this} to not contain " + inspect2(str));
});
function assertKeys(keys) {
    let obj = flag2(this, "object"), objType = chai_type(obj), keysType = chai_type(keys), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag2(this, "message");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    let mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
    if ("Map" === objType || "Set" === objType) {
        deepStr = isDeep ? "deeply " : "";
        actual = [];
        obj.forEach(function(val, key) {
            actual.push(key);
        });
        if ("Array" !== keysType) keys = Array.prototype.slice.call(arguments);
    } else {
        actual = getOwnEnumerableProperties(obj);
        switch(keysType){
            case "Array":
                if (arguments.length > 1) throw new chai_AssertionError(mixedArgsMsg, void 0, ssfi);
                break;
            case "Object":
                if (arguments.length > 1) throw new chai_AssertionError(mixedArgsMsg, void 0, ssfi);
                keys = Object.keys(keys);
                break;
            default:
                keys = Array.prototype.slice.call(arguments);
        }
        keys = keys.map(function(val) {
            return "symbol" == typeof val ? val : String(val);
        });
    }
    if (!keys.length) throw new chai_AssertionError(flagMsg + "keys required", void 0, ssfi);
    let len = keys.length, any = flag2(this, "any"), all = flag2(this, "all"), expected = keys, isEql = isDeep ? flag2(this, "eql") : (val1, val2)=>val1 === val2;
    if (!any && !all) all = true;
    if (any) ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
            return isEql(expectedKey, actualKey);
        });
    });
    if (all) {
        ok = expected.every(function(expectedKey) {
            return actual.some(function(actualKey) {
                return isEql(expectedKey, actualKey);
            });
        });
        if (!flag2(this, "contains")) ok = ok && keys.length == actual.length;
    }
    if (len > 1) {
        keys = keys.map(function(key) {
            return inspect2(key);
        });
        let last = keys.pop();
        if (all) str = keys.join(", ") + ", and " + last;
        if (any) str = keys.join(", ") + ", or " + last;
    } else str = inspect2(keys[0]);
    str = (len > 1 ? "keys " : "key ") + str;
    str = (flag2(this, "contains") ? "contain " : "have ") + str;
    this.assert(ok, "expected #{this} to " + deepStr + str, "expected #{this} to not " + deepStr + str, expected.slice(0).sort(compareByInspect), actual.sort(compareByInspect), true);
}
__name(assertKeys, "assertKeys");
Assertion.addMethod("keys", assertKeys);
Assertion.addMethod("key", assertKeys);
function assertThrows(errorLike, errMsgMatcher, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), negate = flag2(this, "negate") || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a("function");
    if (isRegExp2(errorLike) || "string" == typeof errorLike) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }
    let caughtErr;
    let errorWasThrown = false;
    try {
        obj();
    } catch (err) {
        errorWasThrown = true;
        caughtErr = err;
    }
    let everyArgIsUndefined = void 0 === errorLike && void 0 === errMsgMatcher;
    let everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    let errorLikeFail = false;
    let errMsgMatcherFail = false;
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
        let errorLikeString = "an error";
        if (errorLike instanceof Error) errorLikeString = "#{exp}";
        else if (errorLike) errorLikeString = check_error_exports.getConstructorName(errorLike);
        let actual = caughtErr;
        if (caughtErr instanceof Error) actual = caughtErr.toString();
        else if ("string" == typeof caughtErr) actual = caughtErr;
        else if (caughtErr && ("object" == typeof caughtErr || "function" == typeof caughtErr)) try {
            actual = check_error_exports.getConstructorName(caughtErr);
        } catch (_err) {}
        this.assert(errorWasThrown, "expected #{this} to throw " + errorLikeString, "expected #{this} to not throw an error but #{act} was thrown", errorLike && errorLike.toString(), actual);
    }
    if (errorLike && caughtErr) {
        if (errorLike instanceof Error) {
            let isCompatibleInstance = check_error_exports.compatibleInstance(caughtErr, errorLike);
            if (isCompatibleInstance === negate) if (everyArgIsDefined && negate) errorLikeFail = true;
            else this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""), errorLike.toString(), caughtErr.toString());
        }
        let isCompatibleConstructor = check_error_exports.compatibleConstructor(caughtErr, errorLike);
        if (isCompatibleConstructor === negate) if (everyArgIsDefined && negate) errorLikeFail = true;
        else this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr));
    }
    if (caughtErr && null != errMsgMatcher) {
        let placeholder = "including";
        if (isRegExp2(errMsgMatcher)) placeholder = "matching";
        let isCompatibleMessage = check_error_exports.compatibleMessage(caughtErr, errMsgMatcher);
        if (isCompatibleMessage === negate) if (everyArgIsDefined && negate) errMsgMatcherFail = true;
        else this.assert(negate, "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}", "expected #{this} to throw error not " + placeholder + " #{exp}", errMsgMatcher, check_error_exports.getMessage(caughtErr));
    }
    if (errorLikeFail && errMsgMatcherFail) this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr));
    flag2(this, "object", caughtErr);
}
__name(assertThrows, "assertThrows");
Assertion.addMethod("throw", assertThrows);
Assertion.addMethod("throws", assertThrows);
Assertion.addMethod("Throw", assertThrows);
function respondTo(method, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), itself = flag2(this, "itself"), context = "function" != typeof obj || itself ? obj[method] : obj.prototype[method];
    this.assert("function" == typeof context, "expected #{this} to respond to " + inspect2(method), "expected #{this} to not respond to " + inspect2(method));
}
__name(respondTo, "respondTo");
Assertion.addMethod("respondTo", respondTo);
Assertion.addMethod("respondsTo", respondTo);
Assertion.addProperty("itself", function() {
    flag2(this, "itself", true);
});
function satisfy(matcher, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    let result = matcher(obj);
    this.assert(result, "expected #{this} to satisfy " + objDisplay(matcher), "expected #{this} to not satisfy" + objDisplay(matcher), !flag2(this, "negate"), result);
}
__name(satisfy, "satisfy");
Assertion.addMethod("satisfy", satisfy);
Assertion.addMethod("satisfies", satisfy);
function closeTo(expected, delta, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(obj, flagMsg, ssfi, true).is.numeric;
    let message = "A `delta` value is required for `closeTo`";
    if (void 0 == delta) throw new chai_AssertionError(flagMsg ? `${flagMsg}: ${message}` : message, void 0, ssfi);
    new Assertion(delta, flagMsg, ssfi, true).is.numeric;
    message = "A `expected` value is required for `closeTo`";
    if (void 0 == expected) throw new chai_AssertionError(flagMsg ? `${flagMsg}: ${message}` : message, void 0, ssfi);
    new Assertion(expected, flagMsg, ssfi, true).is.numeric;
    const abs = /* @__PURE__ */ __name((x)=>x < 0n ? -x : x, "abs");
    const strip = /* @__PURE__ */ __name((number)=>parseFloat(parseFloat(number).toPrecision(12)), "strip");
    this.assert(strip(abs(obj - expected)) <= delta, "expected #{this} to be close to " + expected + " +/- " + delta, "expected #{this} not to be close to " + expected + " +/- " + delta);
}
__name(closeTo, "closeTo");
Assertion.addMethod("closeTo", closeTo);
Assertion.addMethod("approximately", closeTo);
function isSubsetOf(_subset, _superset, cmp, contains, ordered) {
    let superset = Array.from(_superset);
    let subset = Array.from(_subset);
    if (!contains) {
        if (subset.length !== superset.length) return false;
        superset = superset.slice();
    }
    return subset.every(function(elem, idx) {
        if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
        if (!cmp) {
            let matchIdx = superset.indexOf(elem);
            if (-1 === matchIdx) return false;
            if (!contains) superset.splice(matchIdx, 1);
            return true;
        }
        return superset.some(function(elem2, matchIdx) {
            if (!cmp(elem, elem2)) return false;
            if (!contains) superset.splice(matchIdx, 1);
            return true;
        });
    });
}
__name(isSubsetOf, "isSubsetOf");
Assertion.addMethod("members", function(subset, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(obj, flagMsg, ssfi, true).to.be.iterable;
    new Assertion(subset, flagMsg, ssfi, true).to.be.iterable;
    let contains = flag2(this, "contains");
    let ordered = flag2(this, "ordered");
    let subject, failMsg, failNegateMsg;
    if (contains) {
        subject = ordered ? "an ordered superset" : "a superset";
        failMsg = "expected #{this} to be " + subject + " of #{exp}";
        failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
    } else {
        subject = ordered ? "ordered members" : "members";
        failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
        failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
    }
    let cmp = flag2(this, "deep") ? flag2(this, "eql") : void 0;
    this.assert(isSubsetOf(subset, obj, cmp, contains, ordered), failMsg, failNegateMsg, subset, obj, true);
});
Assertion.addProperty("iterable", function(msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    this.assert(void 0 != obj && obj[Symbol.iterator], "expected #{this} to be an iterable", "expected #{this} to not be an iterable", obj);
});
function oneOf(list, msg) {
    if (msg) flag2(this, "message", msg);
    let expected = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), contains = flag2(this, "contains"), isDeep = flag2(this, "deep"), eql = flag2(this, "eql");
    new Assertion(list, flagMsg, ssfi, true).to.be.an("array");
    if (contains) this.assert(list.some(function(possibility) {
        return expected.indexOf(possibility) > -1;
    }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", list, expected);
    else if (isDeep) this.assert(list.some(function(possibility) {
        return eql(expected, possibility);
    }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", list, expected);
    else this.assert(list.indexOf(expected) > -1, "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", list, expected);
}
__name(oneOf, "oneOf");
Assertion.addMethod("oneOf", oneOf);
function assertChanges(subject, prop, msg) {
    if (msg) flag2(this, "message", msg);
    let fn = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (prop) {
        new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
    } else {
        new Assertion(subject, flagMsg, ssfi, true).is.a("function");
        initial = subject();
    }
    fn();
    let final = null == prop ? subject() : subject[prop];
    let msgObj = null == prop ? initial : "." + prop;
    flag2(this, "deltaMsgObj", msgObj);
    flag2(this, "initialDeltaValue", initial);
    flag2(this, "finalDeltaValue", final);
    flag2(this, "deltaBehavior", "change");
    flag2(this, "realDelta", final !== initial);
    this.assert(initial !== final, "expected " + msgObj + " to change", "expected " + msgObj + " to not change");
}
__name(assertChanges, "assertChanges");
Assertion.addMethod("change", assertChanges);
Assertion.addMethod("changes", assertChanges);
function assertIncreases(subject, prop, msg) {
    if (msg) flag2(this, "message", msg);
    let fn = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (prop) {
        new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
    } else {
        new Assertion(subject, flagMsg, ssfi, true).is.a("function");
        initial = subject();
    }
    new Assertion(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    let final = null == prop ? subject() : subject[prop];
    let msgObj = null == prop ? initial : "." + prop;
    flag2(this, "deltaMsgObj", msgObj);
    flag2(this, "initialDeltaValue", initial);
    flag2(this, "finalDeltaValue", final);
    flag2(this, "deltaBehavior", "increase");
    flag2(this, "realDelta", final - initial);
    this.assert(final - initial > 0, "expected " + msgObj + " to increase", "expected " + msgObj + " to not increase");
}
__name(assertIncreases, "assertIncreases");
Assertion.addMethod("increase", assertIncreases);
Assertion.addMethod("increases", assertIncreases);
function assertDecreases(subject, prop, msg) {
    if (msg) flag2(this, "message", msg);
    let fn = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (prop) {
        new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
    } else {
        new Assertion(subject, flagMsg, ssfi, true).is.a("function");
        initial = subject();
    }
    new Assertion(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    let final = null == prop ? subject() : subject[prop];
    let msgObj = null == prop ? initial : "." + prop;
    flag2(this, "deltaMsgObj", msgObj);
    flag2(this, "initialDeltaValue", initial);
    flag2(this, "finalDeltaValue", final);
    flag2(this, "deltaBehavior", "decrease");
    flag2(this, "realDelta", initial - final);
    this.assert(final - initial < 0, "expected " + msgObj + " to decrease", "expected " + msgObj + " to not decrease");
}
__name(assertDecreases, "assertDecreases");
Assertion.addMethod("decrease", assertDecreases);
Assertion.addMethod("decreases", assertDecreases);
function assertDelta(delta, msg) {
    if (msg) flag2(this, "message", msg);
    let msgObj = flag2(this, "deltaMsgObj");
    let initial = flag2(this, "initialDeltaValue");
    let final = flag2(this, "finalDeltaValue");
    let behavior = flag2(this, "deltaBehavior");
    let realDelta = flag2(this, "realDelta");
    let expression;
    expression = "change" === behavior ? Math.abs(final - initial) === Math.abs(delta) : realDelta === Math.abs(delta);
    this.assert(expression, "expected " + msgObj + " to " + behavior + " by " + delta, "expected " + msgObj + " to not " + behavior + " by " + delta);
}
__name(assertDelta, "assertDelta");
Assertion.addMethod("by", assertDelta);
Assertion.addProperty("extensible", function() {
    let obj = flag2(this, "object");
    let isExtensible = obj === Object(obj) && Object.isExtensible(obj);
    this.assert(isExtensible, "expected #{this} to be extensible", "expected #{this} to not be extensible");
});
Assertion.addProperty("sealed", function() {
    let obj = flag2(this, "object");
    let isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
    this.assert(isSealed, "expected #{this} to be sealed", "expected #{this} to not be sealed");
});
Assertion.addProperty("frozen", function() {
    let obj = flag2(this, "object");
    let isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
    this.assert(isFrozen, "expected #{this} to be frozen", "expected #{this} to not be frozen");
});
Assertion.addProperty("finite", function(_msg) {
    let obj = flag2(this, "object");
    this.assert("number" == typeof obj && isFinite(obj), "expected #{this} to be a finite number", "expected #{this} to not be a finite number");
});
function compareSubset(expected, actual) {
    if (expected === actual) return true;
    if (typeof actual !== typeof expected) return false;
    if ("object" != typeof expected || null === expected) return expected === actual;
    if (!actual) return false;
    if (Array.isArray(expected)) {
        if (!Array.isArray(actual)) return false;
        return expected.every(function(exp) {
            return actual.some(function(act) {
                return compareSubset(exp, act);
            });
        });
    }
    if (expected instanceof Date) if (actual instanceof Date) return expected.getTime() === actual.getTime();
    else return false;
    return Object.keys(expected).every(function(key) {
        let expectedValue = expected[key];
        let actualValue = actual[key];
        if ("object" == typeof expectedValue && null !== expectedValue && null !== actualValue) return compareSubset(expectedValue, actualValue);
        if ("function" == typeof expectedValue) return expectedValue(actualValue);
        return actualValue === expectedValue;
    });
}
__name(compareSubset, "compareSubset");
Assertion.addMethod("containSubset", function(expected) {
    const actual = flag(this, "object");
    const showDiff = chai_config.showDiff;
    this.assert(compareSubset(expected, actual), "expected #{act} to contain subset #{exp}", "expected #{act} to not contain subset #{exp}", expected, actual, showDiff);
});
function chai_expect(val, message) {
    return new Assertion(val, message);
}
__name(chai_expect, "expect");
chai_expect.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = void 0;
    }
    message = message || "expect.fail()";
    throw new chai_AssertionError(message, {
        actual,
        expected,
        operator
    }, chai_expect.fail);
};
var should_exports = {};
__export(should_exports, {
    Should: ()=>Should,
    should: ()=>should
});
function loadShould() {
    function shouldGetter() {
        if (this instanceof String || this instanceof Number || this instanceof Boolean || "function" == typeof Symbol && this instanceof Symbol || "function" == typeof BigInt && this instanceof BigInt) return new Assertion(this.valueOf(), null, shouldGetter);
        return new Assertion(this, null, shouldGetter);
    }
    __name(shouldGetter, "shouldGetter");
    function shouldSetter(value) {
        Object.defineProperty(this, "should", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    }
    __name(shouldSetter, "shouldSetter");
    Object.defineProperty(Object.prototype, "should", {
        set: shouldSetter,
        get: shouldGetter,
        configurable: true
    });
    let should2 = {};
    should2.fail = function(actual, expected, message, operator) {
        if (arguments.length < 2) {
            message = actual;
            actual = void 0;
        }
        message = message || "should.fail()";
        throw new chai_AssertionError(message, {
            actual,
            expected,
            operator
        }, should2.fail);
    };
    should2.equal = function(actual, expected, message) {
        new Assertion(actual, message).to.equal(expected);
    };
    should2.Throw = function(fn, errt, errs, msg) {
        new Assertion(fn, msg).to.Throw(errt, errs);
    };
    should2.exist = function(val, msg) {
        new Assertion(val, msg).to.exist;
    };
    should2.not = {};
    should2.not.equal = function(actual, expected, msg) {
        new Assertion(actual, msg).to.not.equal(expected);
    };
    should2.not.Throw = function(fn, errt, errs, msg) {
        new Assertion(fn, msg).to.not.Throw(errt, errs);
    };
    should2.not.exist = function(val, msg) {
        new Assertion(val, msg).to.not.exist;
    };
    should2["throw"] = should2["Throw"];
    should2.not["throw"] = should2.not["Throw"];
    return should2;
}
__name(loadShould, "loadShould");
var should = loadShould;
var Should = loadShould;
function chai_assert(express, errmsg) {
    let test2 = new Assertion(null, null, chai_assert, true);
    test2.assert(express, errmsg, "[ negation message unavailable ]");
}
__name(chai_assert, "assert");
chai_assert.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = void 0;
    }
    message = message || "assert.fail()";
    throw new chai_AssertionError(message, {
        actual,
        expected,
        operator
    }, chai_assert.fail);
};
chai_assert.isOk = function(val, msg) {
    new Assertion(val, msg, chai_assert.isOk, true).is.ok;
};
chai_assert.isNotOk = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotOk, true).is.not.ok;
};
chai_assert.equal = function(act, exp, msg) {
    let test2 = new Assertion(act, msg, chai_assert.equal, true);
    test2.assert(exp == flag(test2, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", exp, act, true);
};
chai_assert.notEqual = function(act, exp, msg) {
    let test2 = new Assertion(act, msg, chai_assert.notEqual, true);
    test2.assert(exp != flag(test2, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", exp, act, true);
};
chai_assert.strictEqual = function(act, exp, msg) {
    new Assertion(act, msg, chai_assert.strictEqual, true).to.equal(exp);
};
chai_assert.notStrictEqual = function(act, exp, msg) {
    new Assertion(act, msg, chai_assert.notStrictEqual, true).to.not.equal(exp);
};
chai_assert.deepEqual = chai_assert.deepStrictEqual = function(act, exp, msg) {
    new Assertion(act, msg, chai_assert.deepEqual, true).to.eql(exp);
};
chai_assert.notDeepEqual = function(act, exp, msg) {
    new Assertion(act, msg, chai_assert.notDeepEqual, true).to.not.eql(exp);
};
chai_assert.isAbove = function(val, abv, msg) {
    new Assertion(val, msg, chai_assert.isAbove, true).to.be.above(abv);
};
chai_assert.isAtLeast = function(val, atlst, msg) {
    new Assertion(val, msg, chai_assert.isAtLeast, true).to.be.least(atlst);
};
chai_assert.isBelow = function(val, blw, msg) {
    new Assertion(val, msg, chai_assert.isBelow, true).to.be.below(blw);
};
chai_assert.isAtMost = function(val, atmst, msg) {
    new Assertion(val, msg, chai_assert.isAtMost, true).to.be.most(atmst);
};
chai_assert.isTrue = function(val, msg) {
    new Assertion(val, msg, chai_assert.isTrue, true).is["true"];
};
chai_assert.isNotTrue = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotTrue, true).to.not.equal(true);
};
chai_assert.isFalse = function(val, msg) {
    new Assertion(val, msg, chai_assert.isFalse, true).is["false"];
};
chai_assert.isNotFalse = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotFalse, true).to.not.equal(false);
};
chai_assert.isNull = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNull, true).to.equal(null);
};
chai_assert.isNotNull = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotNull, true).to.not.equal(null);
};
chai_assert.isNaN = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNaN, true).to.be.NaN;
};
chai_assert.isNotNaN = function(value, message) {
    new Assertion(value, message, chai_assert.isNotNaN, true).not.to.be.NaN;
};
chai_assert.exists = function(val, msg) {
    new Assertion(val, msg, chai_assert.exists, true).to.exist;
};
chai_assert.notExists = function(val, msg) {
    new Assertion(val, msg, chai_assert.notExists, true).to.not.exist;
};
chai_assert.isUndefined = function(val, msg) {
    new Assertion(val, msg, chai_assert.isUndefined, true).to.equal(void 0);
};
chai_assert.isDefined = function(val, msg) {
    new Assertion(val, msg, chai_assert.isDefined, true).to.not.equal(void 0);
};
chai_assert.isCallable = function(value, message) {
    new Assertion(value, message, chai_assert.isCallable, true).is.callable;
};
chai_assert.isNotCallable = function(value, message) {
    new Assertion(value, message, chai_assert.isNotCallable, true).is.not.callable;
};
chai_assert.isObject = function(val, msg) {
    new Assertion(val, msg, chai_assert.isObject, true).to.be.a("object");
};
chai_assert.isNotObject = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotObject, true).to.not.be.a("object");
};
chai_assert.isArray = function(val, msg) {
    new Assertion(val, msg, chai_assert.isArray, true).to.be.an("array");
};
chai_assert.isNotArray = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotArray, true).to.not.be.an("array");
};
chai_assert.isString = function(val, msg) {
    new Assertion(val, msg, chai_assert.isString, true).to.be.a("string");
};
chai_assert.isNotString = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotString, true).to.not.be.a("string");
};
chai_assert.isNumber = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNumber, true).to.be.a("number");
};
chai_assert.isNotNumber = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotNumber, true).to.not.be.a("number");
};
chai_assert.isNumeric = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNumeric, true).is.numeric;
};
chai_assert.isNotNumeric = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotNumeric, true).is.not.numeric;
};
chai_assert.isFinite = function(val, msg) {
    new Assertion(val, msg, chai_assert.isFinite, true).to.be.finite;
};
chai_assert.isBoolean = function(val, msg) {
    new Assertion(val, msg, chai_assert.isBoolean, true).to.be.a("boolean");
};
chai_assert.isNotBoolean = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotBoolean, true).to.not.be.a("boolean");
};
chai_assert.typeOf = function(val, type3, msg) {
    new Assertion(val, msg, chai_assert.typeOf, true).to.be.a(type3);
};
chai_assert.notTypeOf = function(value, type3, message) {
    new Assertion(value, message, chai_assert.notTypeOf, true).to.not.be.a(type3);
};
chai_assert.instanceOf = function(val, type3, msg) {
    new Assertion(val, msg, chai_assert.instanceOf, true).to.be.instanceOf(type3);
};
chai_assert.notInstanceOf = function(val, type3, msg) {
    new Assertion(val, msg, chai_assert.notInstanceOf, true).to.not.be.instanceOf(type3);
};
chai_assert.include = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.include, true).include(inc);
};
chai_assert.notInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.notInclude, true).not.include(inc);
};
chai_assert.deepInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.deepInclude, true).deep.include(inc);
};
chai_assert.notDeepInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.notDeepInclude, true).not.deep.include(inc);
};
chai_assert.nestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.nestedInclude, true).nested.include(inc);
};
chai_assert.notNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.notNestedInclude, true).not.nested.include(inc);
};
chai_assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.deepNestedInclude, true).deep.nested.include(inc);
};
chai_assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.notDeepNestedInclude, true).not.deep.nested.include(inc);
};
chai_assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.ownInclude, true).own.include(inc);
};
chai_assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.notOwnInclude, true).not.own.include(inc);
};
chai_assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.deepOwnInclude, true).deep.own.include(inc);
};
chai_assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, chai_assert.notDeepOwnInclude, true).not.deep.own.include(inc);
};
chai_assert.match = function(exp, re, msg) {
    new Assertion(exp, msg, chai_assert.match, true).to.match(re);
};
chai_assert.notMatch = function(exp, re, msg) {
    new Assertion(exp, msg, chai_assert.notMatch, true).to.not.match(re);
};
chai_assert.property = function(obj, prop, msg) {
    new Assertion(obj, msg, chai_assert.property, true).to.have.property(prop);
};
chai_assert.notProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, chai_assert.notProperty, true).to.not.have.property(prop);
};
chai_assert.propertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.propertyVal, true).to.have.property(prop, val);
};
chai_assert.notPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.notPropertyVal, true).to.not.have.property(prop, val);
};
chai_assert.deepPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.deepPropertyVal, true).to.have.deep.property(prop, val);
};
chai_assert.notDeepPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
};
chai_assert.ownProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, chai_assert.ownProperty, true).to.have.own.property(prop);
};
chai_assert.notOwnProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, chai_assert.notOwnProperty, true).to.not.have.own.property(prop);
};
chai_assert.ownPropertyVal = function(obj, prop, value, msg) {
    new Assertion(obj, msg, chai_assert.ownPropertyVal, true).to.have.own.property(prop, value);
};
chai_assert.notOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion(obj, msg, chai_assert.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
};
chai_assert.deepOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion(obj, msg, chai_assert.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
};
chai_assert.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion(obj, msg, chai_assert.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
};
chai_assert.nestedProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, chai_assert.nestedProperty, true).to.have.nested.property(prop);
};
chai_assert.notNestedProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, chai_assert.notNestedProperty, true).to.not.have.nested.property(prop);
};
chai_assert.nestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.nestedPropertyVal, true).to.have.nested.property(prop, val);
};
chai_assert.notNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
};
chai_assert.deepNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
};
chai_assert.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, chai_assert.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
};
chai_assert.lengthOf = function(exp, len, msg) {
    new Assertion(exp, msg, chai_assert.lengthOf, true).to.have.lengthOf(len);
};
chai_assert.hasAnyKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.hasAnyKeys, true).to.have.any.keys(keys);
};
chai_assert.hasAllKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.hasAllKeys, true).to.have.all.keys(keys);
};
chai_assert.containsAllKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.containsAllKeys, true).to.contain.all.keys(keys);
};
chai_assert.doesNotHaveAnyKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys);
};
chai_assert.doesNotHaveAllKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.doesNotHaveAllKeys, true).to.not.have.all.keys(keys);
};
chai_assert.hasAnyDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.hasAnyDeepKeys, true).to.have.any.deep.keys(keys);
};
chai_assert.hasAllDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.hasAllDeepKeys, true).to.have.all.deep.keys(keys);
};
chai_assert.containsAllDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.containsAllDeepKeys, true).to.contain.all.deep.keys(keys);
};
chai_assert.doesNotHaveAnyDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys);
};
chai_assert.doesNotHaveAllDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, chai_assert.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys);
};
chai_assert.throws = function(fn, errorLike, errMsgMatcher, msg) {
    if ("string" == typeof errorLike || errorLike instanceof RegExp) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }
    let assertErr = new Assertion(fn, msg, chai_assert.throws, true).to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, "object");
};
chai_assert.doesNotThrow = function(fn, errorLike, errMsgMatcher, message) {
    if ("string" == typeof errorLike || errorLike instanceof RegExp) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }
    new Assertion(fn, message, chai_assert.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
};
chai_assert.operator = function(val, operator, val2, msg) {
    let ok;
    switch(operator){
        case "==":
            ok = val == val2;
            break;
        case "===":
            ok = val === val2;
            break;
        case ">":
            ok = val > val2;
            break;
        case ">=":
            ok = val >= val2;
            break;
        case "<":
            ok = val < val2;
            break;
        case "<=":
            ok = val <= val2;
            break;
        case "!=":
            ok = val != val2;
            break;
        case "!==":
            ok = val !== val2;
            break;
        default:
            msg = msg ? msg + ": " : msg;
            throw new chai_AssertionError(msg + 'Invalid operator "' + operator + '"', void 0, chai_assert.operator);
    }
    let test2 = new Assertion(ok, msg, chai_assert.operator, true);
    test2.assert(true === flag(test2, "object"), "expected " + inspect2(val) + " to be " + operator + " " + inspect2(val2), "expected " + inspect2(val) + " to not be " + operator + " " + inspect2(val2));
};
chai_assert.closeTo = function(act, exp, delta, msg) {
    new Assertion(act, msg, chai_assert.closeTo, true).to.be.closeTo(exp, delta);
};
chai_assert.approximately = function(act, exp, delta, msg) {
    new Assertion(act, msg, chai_assert.approximately, true).to.be.approximately(exp, delta);
};
chai_assert.sameMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.sameMembers, true).to.have.same.members(set2);
};
chai_assert.notSameMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.notSameMembers, true).to.not.have.same.members(set2);
};
chai_assert.sameDeepMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.sameDeepMembers, true).to.have.same.deep.members(set2);
};
chai_assert.notSameDeepMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
};
chai_assert.sameOrderedMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.sameOrderedMembers, true).to.have.same.ordered.members(set2);
};
chai_assert.notSameOrderedMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
};
chai_assert.sameDeepOrderedMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
};
chai_assert.notSameDeepOrderedMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, chai_assert.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
};
chai_assert.includeMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.includeMembers, true).to.include.members(subset);
};
chai_assert.notIncludeMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.notIncludeMembers, true).to.not.include.members(subset);
};
chai_assert.includeDeepMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.includeDeepMembers, true).to.include.deep.members(subset);
};
chai_assert.notIncludeDeepMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
};
chai_assert.includeOrderedMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.includeOrderedMembers, true).to.include.ordered.members(subset);
};
chai_assert.notIncludeOrderedMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
};
chai_assert.includeDeepOrderedMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
};
chai_assert.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, chai_assert.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
};
chai_assert.oneOf = function(inList, list, msg) {
    new Assertion(inList, msg, chai_assert.oneOf, true).to.be.oneOf(list);
};
chai_assert.isIterable = function(obj, msg) {
    if (void 0 == obj || !obj[Symbol.iterator]) {
        msg = msg ? `${msg} expected ${inspect2(obj)} to be an iterable` : `expected ${inspect2(obj)} to be an iterable`;
        throw new chai_AssertionError(msg, void 0, chai_assert.isIterable);
    }
};
chai_assert.changes = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.changes, true).to.change(obj, prop);
};
chai_assert.changesBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.changesBy, true).to.change(obj, prop).by(delta);
};
chai_assert.doesNotChange = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new Assertion(fn, msg, chai_assert.doesNotChange, true).to.not.change(obj, prop);
};
chai_assert.changesButNotBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
};
chai_assert.increases = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new Assertion(fn, msg, chai_assert.increases, true).to.increase(obj, prop);
};
chai_assert.increasesBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.increasesBy, true).to.increase(obj, prop).by(delta);
};
chai_assert.doesNotIncrease = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new Assertion(fn, msg, chai_assert.doesNotIncrease, true).to.not.increase(obj, prop);
};
chai_assert.increasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
};
chai_assert.decreases = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new Assertion(fn, msg, chai_assert.decreases, true).to.decrease(obj, prop);
};
chai_assert.decreasesBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.decreasesBy, true).to.decrease(obj, prop).by(delta);
};
chai_assert.doesNotDecrease = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new Assertion(fn, msg, chai_assert.doesNotDecrease, true).to.not.decrease(obj, prop);
};
chai_assert.doesNotDecreaseBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    return new Assertion(fn, msg, chai_assert.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
};
chai_assert.decreasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new Assertion(fn, msg, chai_assert.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
};
chai_assert.ifError = function(val) {
    if (val) throw val;
};
chai_assert.isExtensible = function(obj, msg) {
    new Assertion(obj, msg, chai_assert.isExtensible, true).to.be.extensible;
};
chai_assert.isNotExtensible = function(obj, msg) {
    new Assertion(obj, msg, chai_assert.isNotExtensible, true).to.not.be.extensible;
};
chai_assert.isSealed = function(obj, msg) {
    new Assertion(obj, msg, chai_assert.isSealed, true).to.be.sealed;
};
chai_assert.isNotSealed = function(obj, msg) {
    new Assertion(obj, msg, chai_assert.isNotSealed, true).to.not.be.sealed;
};
chai_assert.isFrozen = function(obj, msg) {
    new Assertion(obj, msg, chai_assert.isFrozen, true).to.be.frozen;
};
chai_assert.isNotFrozen = function(obj, msg) {
    new Assertion(obj, msg, chai_assert.isNotFrozen, true).to.not.be.frozen;
};
chai_assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, chai_assert.isEmpty, true).to.be.empty;
};
chai_assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, chai_assert.isNotEmpty, true).to.not.be.empty;
};
chai_assert.containsSubset = function(val, exp, msg) {
    new Assertion(val, msg).to.containSubset(exp);
};
chai_assert.doesNotContainSubset = function(val, exp, msg) {
    new Assertion(val, msg).to.not.containSubset(exp);
};
var aliases = [
    [
        "isOk",
        "ok"
    ],
    [
        "isNotOk",
        "notOk"
    ],
    [
        "throws",
        "throw"
    ],
    [
        "throws",
        "Throw"
    ],
    [
        "isExtensible",
        "extensible"
    ],
    [
        "isNotExtensible",
        "notExtensible"
    ],
    [
        "isSealed",
        "sealed"
    ],
    [
        "isNotSealed",
        "notSealed"
    ],
    [
        "isFrozen",
        "frozen"
    ],
    [
        "isNotFrozen",
        "notFrozen"
    ],
    [
        "isEmpty",
        "empty"
    ],
    [
        "isNotEmpty",
        "notEmpty"
    ],
    [
        "isCallable",
        "isFunction"
    ],
    [
        "isNotCallable",
        "isNotFunction"
    ],
    [
        "containsSubset",
        "containSubset"
    ]
];
for (const [name, as] of aliases)chai_assert[as] = chai_assert[name];
var used = [];
function use(fn) {
    const exports = {
        use: use,
        AssertionError: chai_AssertionError,
        util: utils_exports,
        config: chai_config,
        expect: chai_expect,
        assert: chai_assert,
        Assertion: Assertion,
        ...should_exports
    };
    if (!~used.indexOf(fn)) {
        fn(exports, utils_exports);
        used.push(fn);
    }
    return exports;
}
__name(use, "use");
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */ /*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */ /*! Bundled license information:

deep-eql/index.js:
  (*!
   * deep-eql
   * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Check to see if the MemoizeMap has recorded a result of the two operands
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @returns {Boolean|null} result
  *)
  (*!
   * Set the result of the equality into the MemoizeMap
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {MemoizeMap} memoizeMap
   * @param {Boolean} result
  *)
  (*!
   * Primary Export
   *)
  (*!
   * The main logic of the `deepEqual` function.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (optional) Additional options
   * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
   * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
      complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
      references to blow the stack.
   * @return {Boolean} equal match
  *)
  (*!
   * Compare two Regular Expressions for equality.
   *
   * @param {RegExp} leftHandOperand
   * @param {RegExp} rightHandOperand
   * @return {Boolean} result
   *)
  (*!
   * Compare two Sets/Maps for equality. Faster than other equality functions.
   *
   * @param {Set} leftHandOperand
   * @param {Set} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Simple equality for generator objects such as those returned by generator functions.
   *
   * @param {Iterable} leftHandOperand
   * @param {Iterable} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Determine if the given object has an @@iterator function.
   *
   * @param {Object} target
   * @return {Boolean} `true` if the object has an @@iterator function.
   *)
  (*!
   * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
   * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
   *
   * @param {Object} target
   * @returns {Array} an array of entries from the @@iterator function
   *)
  (*!
   * Gets all entries from a Generator. This will consume the generator - which could have side effects.
   *
   * @param {Generator} target
   * @returns {Array} an array of entries from the Generator.
   *)
  (*!
   * Gets all own and inherited enumerable keys from a target.
   *
   * @param {Object} target
   * @returns {Array} an array of own and inherited enumerable keys from the target.
   *)
  (*!
   * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
   * each key. If any value of the given key is not equal, the function will return false (early).
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
   * for each enumerable key in the object.
   *
   * @param {Mixed} leftHandOperand
   * @param {Mixed} rightHandOperand
   * @param {Object} [options] (Optional)
   * @return {Boolean} result
   *)
  (*!
   * Returns true if the argument is a primitive.
   *
   * This intentionally returns true for all objects that can be compared by reference,
   * including functions and symbols.
   *
   * @param {Mixed} value
   * @return {Boolean} result
   *)
*/ const MATCHERS_OBJECT = Symbol.for("matchers-object");
const JEST_MATCHERS_OBJECT = Symbol.for("$$jest-matchers-object");
const GLOBAL_EXPECT = Symbol.for("expect-global");
const ASYMMETRIC_MATCHERS_OBJECT = Symbol.for("asymmetric-matchers-object");
const customMatchers = {
    toSatisfy (actual, expected, message) {
        const { printReceived, printExpected, matcherHint } = this.utils;
        const pass = expected(actual);
        return {
            pass,
            message: ()=>pass ? `\
${matcherHint(".not.toSatisfy", "received", "")}

Expected value to not satisfy:
${message || printExpected(expected)}
Received:
${printReceived(actual)}` : `\
${matcherHint(".toSatisfy", "received", "")}

Expected value to satisfy:
${message || printExpected(expected)}

Received:
${printReceived(actual)}`
        };
    },
    toBeOneOf (actual, expected) {
        const { equals, customTesters } = this;
        const { printReceived, printExpected, matcherHint } = this.utils;
        if (!Array.isArray(expected)) throw new TypeError(`You must provide an array to ${matcherHint(".toBeOneOf")}, not '${typeof expected}'.`);
        const pass = 0 === expected.length || expected.some((item)=>equals(item, actual, customTesters));
        return {
            pass,
            message: ()=>pass ? `\
${matcherHint(".not.toBeOneOf", "received", "")}

Expected value to not be one of:
${printExpected(expected)}
Received:
${printReceived(actual)}` : `\
${matcherHint(".toBeOneOf", "received", "")}

Expected value to be one of:
${printExpected(expected)}

Received:
${printReceived(actual)}`
        };
    }
};
const EXPECTED_COLOR = node_u.green;
const RECEIVED_COLOR = node_u.red;
const INVERTED_COLOR = node_u.inverse;
const BOLD_WEIGHT = node_u.bold;
const DIM_COLOR = node_u.dim;
function dist_matcherHint(matcherName, received = "received", expected = "expected", options = {}) {
    const { comment = "", isDirectExpectCall = false, isNot = false, promise = "", secondArgument = "", expectedColor = EXPECTED_COLOR, receivedColor = RECEIVED_COLOR, secondArgumentColor = EXPECTED_COLOR } = options;
    let hint = "";
    let dimString = "expect";
    if (!isDirectExpectCall && "" !== received) {
        hint += DIM_COLOR(`${dimString}(`) + receivedColor(received);
        dimString = ")";
    }
    if ("" !== promise) {
        hint += DIM_COLOR(`${dimString}.`) + promise;
        dimString = "";
    }
    if (isNot) {
        hint += `${DIM_COLOR(`${dimString}.`)}not`;
        dimString = "";
    }
    if (matcherName.includes(".")) dimString += matcherName;
    else {
        hint += DIM_COLOR(`${dimString}.`) + matcherName;
        dimString = "";
    }
    if ("" === expected) dimString += "()";
    else {
        hint += DIM_COLOR(`${dimString}(`) + expectedColor(expected);
        if (secondArgument) hint += DIM_COLOR(", ") + secondArgumentColor(secondArgument);
        dimString = ")";
    }
    if ("" !== comment) dimString += ` // ${comment}`;
    if ("" !== dimString) hint += DIM_COLOR(dimString);
    return hint;
}
const SPACE_SYMBOL = "·";
function replaceTrailingSpaces(text) {
    return text.replace(/\s+$/gm, (spaces)=>SPACE_SYMBOL.repeat(spaces.length));
}
function dist_printReceived(object) {
    return RECEIVED_COLOR(replaceTrailingSpaces(stringify(object)));
}
function dist_printExpected(value) {
    return EXPECTED_COLOR(replaceTrailingSpaces(stringify(value)));
}
function getMatcherUtils() {
    return {
        EXPECTED_COLOR: EXPECTED_COLOR,
        RECEIVED_COLOR: RECEIVED_COLOR,
        INVERTED_COLOR: INVERTED_COLOR,
        BOLD_WEIGHT: BOLD_WEIGHT,
        DIM_COLOR: DIM_COLOR,
        diff: diff_diff,
        matcherHint: dist_matcherHint,
        printReceived: dist_printReceived,
        printExpected: dist_printExpected,
        printDiffOrStringify: printDiffOrStringify,
        printWithType: printWithType
    };
}
function printWithType(name, value, print) {
    const type = getType(value);
    const hasType = "null" !== type && "undefined" !== type ? `${name} has type:  ${type}\n` : "";
    const hasValue = `${name} has value: ${print(value)}`;
    return hasType + hasValue;
}
function addCustomEqualityTesters(newTesters) {
    if (!Array.isArray(newTesters)) throw new TypeError(`expect.customEqualityTesters: Must be set to an array of Testers. Was given "${getType(newTesters)}"`);
    globalThis[JEST_MATCHERS_OBJECT].customEqualityTesters.push(...newTesters);
}
function getCustomEqualityTesters() {
    return globalThis[JEST_MATCHERS_OBJECT].customEqualityTesters;
}
function dist_equals(a, b, customTesters, strictCheck) {
    customTesters = customTesters || [];
    return eq(a, b, [], [], customTesters, strictCheck ? dist_hasKey : hasDefinedKey);
}
Function.prototype.toString;
function isAsymmetric(obj) {
    return !!obj && "object" == typeof obj && "asymmetricMatch" in obj && isA("Function", obj.asymmetricMatch);
}
function asymmetricMatch(a, b) {
    const asymmetricA = isAsymmetric(a);
    const asymmetricB = isAsymmetric(b);
    if (asymmetricA && asymmetricB) return;
    if (asymmetricA) return a.asymmetricMatch(b);
    if (asymmetricB) return b.asymmetricMatch(a);
}
function eq(a, b, aStack, bStack, customTesters, hasKey) {
    let result = true;
    const asymmetricResult = asymmetricMatch(a, b);
    if (void 0 !== asymmetricResult) return asymmetricResult;
    const testerContext = {
        equals: dist_equals
    };
    for(let i = 0; i < customTesters.length; i++){
        const customTesterResult = customTesters[i].call(testerContext, a, b, customTesters);
        if (void 0 !== customTesterResult) return customTesterResult;
    }
    if ("function" == typeof URL && a instanceof URL && b instanceof URL) return a.href === b.href;
    if (Object.is(a, b)) return true;
    if (null === a || null === b) return a === b;
    const className = Object.prototype.toString.call(a);
    if (className !== Object.prototype.toString.call(b)) return false;
    switch(className){
        case "[object Boolean]":
        case "[object String]":
        case "[object Number]":
            if (typeof a !== typeof b) return false;
            if ("object" != typeof a && "object" != typeof b) return Object.is(a, b);
            return Object.is(a.valueOf(), b.valueOf());
        case "[object Date]":
            {
                const numA = +a;
                const numB = +b;
                return numA === numB || Number.isNaN(numA) && Number.isNaN(numB);
            }
        case "[object RegExp]":
            return a.source === b.source && a.flags === b.flags;
        case "[object Temporal.Instant]":
        case "[object Temporal.ZonedDateTime]":
        case "[object Temporal.PlainDateTime]":
        case "[object Temporal.PlainDate]":
        case "[object Temporal.PlainTime]":
        case "[object Temporal.PlainYearMonth]":
        case "[object Temporal.PlainMonthDay]":
            return a.equals(b);
        case "[object Temporal.Duration]":
            return a.toString() === b.toString();
    }
    if ("object" != typeof a || "object" != typeof b) return false;
    if (isDomNode(a) && isDomNode(b)) return a.isEqualNode(b);
    let length = aStack.length;
    while(length--)if (aStack[length] === a) return bStack[length] === b;
    else if (bStack[length] === b) return false;
    aStack.push(a);
    bStack.push(b);
    if ("[object Array]" === className && a.length !== b.length) return false;
    if (a instanceof Error && b instanceof Error) try {
        return isErrorEqual(a, b, aStack, bStack, customTesters, hasKey);
    } finally{
        aStack.pop();
        bStack.pop();
    }
    const aKeys = dist_keys(a, hasKey);
    let key;
    let size = aKeys.length;
    if (dist_keys(b, hasKey).length !== size) return false;
    while(size--){
        key = aKeys[size];
        result = hasKey(b, key) && eq(a[key], b[key], aStack, bStack, customTesters, hasKey);
        if (!result) return false;
    }
    aStack.pop();
    bStack.pop();
    return result;
}
function isErrorEqual(a, b, aStack, bStack, customTesters, hasKey) {
    let result = Object.getPrototypeOf(a) === Object.getPrototypeOf(b) && a.name === b.name && a.message === b.message;
    if (void 0 !== b.cause) result && (result = eq(a.cause, b.cause, aStack, bStack, customTesters, hasKey));
    if (a instanceof AggregateError && b instanceof AggregateError) result && (result = eq(a.errors, b.errors, aStack, bStack, customTesters, hasKey));
    result && (result = eq({
        ...a
    }, {
        ...b
    }, aStack, bStack, customTesters, hasKey));
    return result;
}
function dist_keys(obj, hasKey) {
    const keys = [];
    for(const key in obj)if (hasKey(obj, key)) keys.push(key);
    return keys.concat(Object.getOwnPropertySymbols(obj).filter((symbol)=>Object.getOwnPropertyDescriptor(obj, symbol).enumerable));
}
function hasDefinedKey(obj, key) {
    return dist_hasKey(obj, key) && void 0 !== obj[key];
}
function dist_hasKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function isA(typeName, value) {
    return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}
function isDomNode(obj) {
    return null !== obj && "object" == typeof obj && "nodeType" in obj && "number" == typeof obj.nodeType && "nodeName" in obj && "string" == typeof obj.nodeName && "isEqualNode" in obj && "function" == typeof obj.isEqualNode;
}
const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
const dist_IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL] && !maybeKeyed[IS_ORDERED_SENTINEL]);
}
function isImmutableUnorderedSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL] && !maybeSet[IS_ORDERED_SENTINEL]);
}
function isObjectLiteral(source) {
    return null != source && "object" == typeof source && !Array.isArray(source);
}
function isImmutableList(source) {
    return Boolean(source && isObjectLiteral(source) && source[IS_LIST_SENTINEL]);
}
function isImmutableOrderedKeyed(source) {
    return Boolean(source && isObjectLiteral(source) && source[IS_KEYED_SENTINEL] && source[IS_ORDERED_SENTINEL]);
}
function isImmutableOrderedSet(source) {
    return Boolean(source && isObjectLiteral(source) && source[IS_SET_SENTINEL] && source[IS_ORDERED_SENTINEL]);
}
function isImmutableRecord(source) {
    return Boolean(source && isObjectLiteral(source) && source[dist_IS_RECORD_SYMBOL]);
}
const IteratorSymbol = Symbol.iterator;
function hasIterator(object) {
    return !!(null != object && object[IteratorSymbol]);
}
function iterableEquality(a, b, customTesters = [], aStack = [], bStack = []) {
    if ("object" != typeof a || "object" != typeof b || Array.isArray(a) || Array.isArray(b) || !hasIterator(a) || !hasIterator(b)) return;
    if (a.constructor !== b.constructor) return false;
    let length = aStack.length;
    while(length--)if (aStack[length] === a) return bStack[length] === b;
    aStack.push(a);
    bStack.push(b);
    const filteredCustomTesters = [
        ...customTesters.filter((t)=>t !== iterableEquality),
        iterableEqualityWithStack
    ];
    function iterableEqualityWithStack(a, b) {
        return iterableEquality(a, b, [
            ...customTesters
        ], [
            ...aStack
        ], [
            ...bStack
        ]);
    }
    if (void 0 !== a.size) {
        if (a.size !== b.size) return false;
        else if (isA("Set", a) || isImmutableUnorderedSet(a)) {
            let allFound = true;
            for (const aValue of a)if (!b.has(aValue)) {
                let has = false;
                for (const bValue of b){
                    const isEqual = dist_equals(aValue, bValue, filteredCustomTesters);
                    if (true === isEqual) has = true;
                }
                if (false === has) {
                    allFound = false;
                    break;
                }
            }
            aStack.pop();
            bStack.pop();
            return allFound;
        } else if (isA("Map", a) || isImmutableUnorderedKeyed(a)) {
            let allFound = true;
            for (const aEntry of a)if (!b.has(aEntry[0]) || !dist_equals(aEntry[1], b.get(aEntry[0]), filteredCustomTesters)) {
                let has = false;
                for (const bEntry of b){
                    const matchedKey = dist_equals(aEntry[0], bEntry[0], filteredCustomTesters);
                    let matchedValue = false;
                    if (true === matchedKey) matchedValue = dist_equals(aEntry[1], bEntry[1], filteredCustomTesters);
                    if (true === matchedValue) has = true;
                }
                if (false === has) {
                    allFound = false;
                    break;
                }
            }
            aStack.pop();
            bStack.pop();
            return allFound;
        }
    }
    const bIterator = b[IteratorSymbol]();
    for (const aValue of a){
        const nextB = bIterator.next();
        if (nextB.done || !dist_equals(aValue, nextB.value, filteredCustomTesters)) return false;
    }
    if (!bIterator.next().done) return false;
    if (!isImmutableList(a) && !isImmutableOrderedKeyed(a) && !isImmutableOrderedSet(a) && !isImmutableRecord(a)) {
        const aEntries = Object.entries(a);
        const bEntries = Object.entries(b);
        if (!dist_equals(aEntries, bEntries, filteredCustomTesters)) return false;
    }
    aStack.pop();
    bStack.pop();
    return true;
}
function hasPropertyInObject(object, key) {
    const shouldTerminate = !object || "object" != typeof object || object === Object.prototype;
    if (shouldTerminate) return false;
    return Object.prototype.hasOwnProperty.call(object, key) || hasPropertyInObject(Object.getPrototypeOf(object), key);
}
function isObjectWithKeys(a) {
    return helpers_isObject(a) && !(a instanceof Error) && !Array.isArray(a) && !(a instanceof Date);
}
function subsetEquality(object, subset, customTesters = []) {
    const filteredCustomTesters = customTesters.filter((t)=>t !== subsetEquality);
    const subsetEqualityWithContext = (seenReferences = new WeakMap())=>(object, subset)=>{
            if (!isObjectWithKeys(subset)) return;
            return Object.keys(subset).every((key)=>{
                if (null != subset[key] && "object" == typeof subset[key]) {
                    if (seenReferences.has(subset[key])) return dist_equals(object[key], subset[key], filteredCustomTesters);
                    seenReferences.set(subset[key], true);
                }
                const result = null != object && hasPropertyInObject(object, key) && dist_equals(object[key], subset[key], [
                    ...filteredCustomTesters,
                    subsetEqualityWithContext(seenReferences)
                ]);
                seenReferences.delete(subset[key]);
                return result;
            });
        };
    return subsetEqualityWithContext()(object, subset);
}
function typeEquality(a, b) {
    if (null == a || null == b || a.constructor === b.constructor) return;
    return false;
}
function arrayBufferEquality(a, b) {
    let dataViewA = a;
    let dataViewB = b;
    if (!(a instanceof DataView && b instanceof DataView)) {
        if (!(a instanceof ArrayBuffer) || !(b instanceof ArrayBuffer)) return;
        try {
            dataViewA = new DataView(a);
            dataViewB = new DataView(b);
        } catch  {
            return;
        }
    }
    if (dataViewA.byteLength !== dataViewB.byteLength) return false;
    for(let i = 0; i < dataViewA.byteLength; i++)if (dataViewA.getUint8(i) !== dataViewB.getUint8(i)) return false;
    return true;
}
function sparseArrayEquality(a, b, customTesters = []) {
    if (!Array.isArray(a) || !Array.isArray(b)) return;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const filteredCustomTesters = customTesters.filter((t)=>t !== sparseArrayEquality);
    return dist_equals(a, b, filteredCustomTesters, true) && dist_equals(aKeys, bKeys);
}
function generateToBeMessage(deepEqualityName, expected = "#{this}", actual = "#{exp}") {
    const toBeMessage = `expected ${expected} to be ${actual} // Object.is equality`;
    if ([
        "toStrictEqual",
        "toEqual"
    ].includes(deepEqualityName)) return `${toBeMessage}\n\nIf it should pass with deep equality, replace "toBe" with "${deepEqualityName}"\n\nExpected: ${expected}\nReceived: serializes to the same string\n`;
    return toBeMessage;
}
function pluralize(word, count) {
    return `${count} ${word}${1 === count ? "" : "s"}`;
}
function getObjectKeys(object) {
    return [
        ...Object.keys(object),
        ...Object.getOwnPropertySymbols(object).filter((s)=>{
            var _Object$getOwnPropert;
            return null == (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(object, s)) ? void 0 : _Object$getOwnPropert.enumerable;
        })
    ];
}
function getObjectSubset(object, subset, customTesters) {
    let stripped = 0;
    const getObjectSubsetWithContext = (seenReferences = new WeakMap())=>(object, subset)=>{
            if (Array.isArray(object)) {
                if (Array.isArray(subset) && subset.length === object.length) return subset.map((sub, i)=>getObjectSubsetWithContext(seenReferences)(object[i], sub));
            } else if (object instanceof Date) ;
            else if (helpers_isObject(object) && helpers_isObject(subset)) {
                if (dist_equals(object, subset, [
                    ...customTesters,
                    iterableEquality,
                    subsetEquality
                ])) return subset;
                const trimmed = {};
                seenReferences.set(object, trimmed);
                if ("function" == typeof object.constructor && "string" == typeof object.constructor.name) Object.defineProperty(trimmed, "constructor", {
                    enumerable: false,
                    value: object.constructor
                });
                for (const key of getObjectKeys(object))if (hasPropertyInObject(subset, key)) trimmed[key] = seenReferences.has(object[key]) ? seenReferences.get(object[key]) : getObjectSubsetWithContext(seenReferences)(object[key], subset[key]);
                else if (!seenReferences.has(object[key])) {
                    stripped += 1;
                    if (helpers_isObject(object[key])) stripped += getObjectKeys(object[key]).length;
                    getObjectSubsetWithContext(seenReferences)(object[key], subset[key]);
                }
                if (getObjectKeys(trimmed).length > 0) return trimmed;
            }
            return object;
        };
    return {
        subset: getObjectSubsetWithContext()(object, subset),
        stripped
    };
}
if (!Object.prototype.hasOwnProperty.call(globalThis, MATCHERS_OBJECT)) {
    const globalState = new WeakMap();
    const matchers = Object.create(null);
    const customEqualityTesters = [];
    const asymmetricMatchers = Object.create(null);
    Object.defineProperty(globalThis, MATCHERS_OBJECT, {
        get: ()=>globalState
    });
    Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT, {
        configurable: true,
        get: ()=>({
                state: globalState.get(globalThis[GLOBAL_EXPECT]),
                matchers,
                customEqualityTesters
            })
    });
    Object.defineProperty(globalThis, ASYMMETRIC_MATCHERS_OBJECT, {
        get: ()=>asymmetricMatchers
    });
}
function getState(expect) {
    return globalThis[MATCHERS_OBJECT].get(expect);
}
function setState(state, expect) {
    const map = globalThis[MATCHERS_OBJECT];
    const current = map.get(expect) || {};
    const results = Object.defineProperties(current, {
        ...Object.getOwnPropertyDescriptors(current),
        ...Object.getOwnPropertyDescriptors(state)
    });
    map.set(expect, results);
}
class AsymmetricMatcher {
    $$typeof = Symbol.for("jest.asymmetricMatcher");
    constructor(sample, inverse = false){
        this.sample = sample;
        this.inverse = inverse;
    }
    getMatcherContext(expect) {
        return {
            ...getState(expect || globalThis[GLOBAL_EXPECT]),
            equals: dist_equals,
            isNot: this.inverse,
            customTesters: getCustomEqualityTesters(),
            utils: {
                ...getMatcherUtils(),
                diff: diff_diff,
                stringify: stringify,
                iterableEquality: iterableEquality,
                subsetEquality: subsetEquality
            }
        };
    }
}
AsymmetricMatcher.prototype[Symbol.for("chai/inspect")] = function(options) {
    const result = stringify(this, options.depth, {
        min: true
    });
    if (result.length <= options.truncate) return result;
    return `${this.toString()}{…}`;
};
class StringContaining extends AsymmetricMatcher {
    constructor(sample, inverse = false){
        if (!isA("String", sample)) throw new Error("Expected is not a string");
        super(sample, inverse);
    }
    asymmetricMatch(other) {
        const result = isA("String", other) && other.includes(this.sample);
        return this.inverse ? !result : result;
    }
    toString() {
        return `String${this.inverse ? "Not" : ""}Containing`;
    }
    getExpectedType() {
        return "string";
    }
}
class Anything extends AsymmetricMatcher {
    asymmetricMatch(other) {
        return null != other;
    }
    toString() {
        return "Anything";
    }
    toAsymmetricMatcher() {
        return "Anything";
    }
}
class ObjectContaining extends AsymmetricMatcher {
    constructor(sample, inverse = false){
        super(sample, inverse);
    }
    getPrototype(obj) {
        if (Object.getPrototypeOf) return Object.getPrototypeOf(obj);
        if (obj.constructor.prototype === obj) return null;
        return obj.constructor.prototype;
    }
    hasProperty(obj, property) {
        if (!obj) return false;
        if (Object.prototype.hasOwnProperty.call(obj, property)) return true;
        return this.hasProperty(this.getPrototype(obj), property);
    }
    asymmetricMatch(other) {
        if ("object" != typeof this.sample) throw new TypeError(`You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`);
        let result = true;
        const matcherContext = this.getMatcherContext();
        for(const property in this.sample)if (!this.hasProperty(other, property) || !dist_equals(this.sample[property], other[property], matcherContext.customTesters)) {
            result = false;
            break;
        }
        return this.inverse ? !result : result;
    }
    toString() {
        return `Object${this.inverse ? "Not" : ""}Containing`;
    }
    getExpectedType() {
        return "object";
    }
}
class ArrayContaining extends AsymmetricMatcher {
    constructor(sample, inverse = false){
        super(sample, inverse);
    }
    asymmetricMatch(other) {
        if (!Array.isArray(this.sample)) throw new TypeError(`You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`);
        const matcherContext = this.getMatcherContext();
        const result = 0 === this.sample.length || Array.isArray(other) && this.sample.every((item)=>other.some((another)=>dist_equals(item, another, matcherContext.customTesters)));
        return this.inverse ? !result : result;
    }
    toString() {
        return `Array${this.inverse ? "Not" : ""}Containing`;
    }
    getExpectedType() {
        return "array";
    }
}
class Any extends AsymmetricMatcher {
    constructor(sample){
        if (void 0 === sample) throw new TypeError("any() expects to be passed a constructor function. Please pass one or use anything() to match any object.");
        super(sample);
    }
    fnNameFor(func) {
        if (func.name) return func.name;
        const functionToString = Function.prototype.toString;
        const matches = functionToString.call(func).match(/^(?:async)?\s*function\s*(?:\*\s*)?([\w$]+)\s*\(/);
        return matches ? matches[1] : "<anonymous>";
    }
    asymmetricMatch(other) {
        if (this.sample === String) return "string" == typeof other || other instanceof String;
        if (this.sample === Number) return "number" == typeof other || other instanceof Number;
        if (this.sample === Function) return "function" == typeof other || "function" == typeof other;
        if (this.sample === Boolean) return "boolean" == typeof other || other instanceof Boolean;
        if (this.sample === BigInt) return "bigint" == typeof other || other instanceof BigInt;
        if (this.sample === Symbol) return "symbol" == typeof other || other instanceof Symbol;
        if (this.sample === Object) return "object" == typeof other;
        return other instanceof this.sample;
    }
    toString() {
        return "Any";
    }
    getExpectedType() {
        if (this.sample === String) return "string";
        if (this.sample === Number) return "number";
        if (this.sample === Function) return "function";
        if (this.sample === Object) return "object";
        if (this.sample === Boolean) return "boolean";
        return this.fnNameFor(this.sample);
    }
    toAsymmetricMatcher() {
        return `Any<${this.fnNameFor(this.sample)}>`;
    }
}
class StringMatching extends AsymmetricMatcher {
    constructor(sample, inverse = false){
        if (!isA("String", sample) && !isA("RegExp", sample)) throw new Error("Expected is not a String or a RegExp");
        super(new RegExp(sample), inverse);
    }
    asymmetricMatch(other) {
        const result = isA("String", other) && this.sample.test(other);
        return this.inverse ? !result : result;
    }
    toString() {
        return `String${this.inverse ? "Not" : ""}Matching`;
    }
    getExpectedType() {
        return "string";
    }
}
class CloseTo extends AsymmetricMatcher {
    precision;
    constructor(sample, precision = 2, inverse = false){
        if (!isA("Number", sample)) throw new Error("Expected is not a Number");
        if (!isA("Number", precision)) throw new Error("Precision is not a Number");
        super(sample);
        this.inverse = inverse;
        this.precision = precision;
    }
    asymmetricMatch(other) {
        if (!isA("Number", other)) return false;
        let result = false;
        result = other === 1 / 0 && this.sample === 1 / 0 ? true : other === -1 / 0 && this.sample === -1 / 0 ? true : Math.abs(this.sample - other) < 10 ** -this.precision / 2;
        return this.inverse ? !result : result;
    }
    toString() {
        return `Number${this.inverse ? "Not" : ""}CloseTo`;
    }
    getExpectedType() {
        return "number";
    }
    toAsymmetricMatcher() {
        return [
            this.toString(),
            this.sample,
            `(${pluralize("digit", this.precision)})`
        ].join(" ");
    }
}
const JestAsymmetricMatchers = (chai, utils)=>{
    utils.addMethod(chai.expect, "anything", ()=>new Anything());
    utils.addMethod(chai.expect, "any", (expected)=>new Any(expected));
    utils.addMethod(chai.expect, "stringContaining", (expected)=>new StringContaining(expected));
    utils.addMethod(chai.expect, "objectContaining", (expected)=>new ObjectContaining(expected));
    utils.addMethod(chai.expect, "arrayContaining", (expected)=>new ArrayContaining(expected));
    utils.addMethod(chai.expect, "stringMatching", (expected)=>new StringMatching(expected));
    utils.addMethod(chai.expect, "closeTo", (expected, precision)=>new CloseTo(expected, precision));
    chai.expect.not = {
        stringContaining: (expected)=>new StringContaining(expected, true),
        objectContaining: (expected)=>new ObjectContaining(expected, true),
        arrayContaining: (expected)=>new ArrayContaining(expected, true),
        stringMatching: (expected)=>new StringMatching(expected, true),
        closeTo: (expected, precision)=>new CloseTo(expected, precision, true)
    };
};
function createAssertionMessage(util, assertion, hasArgs) {
    const not = util.flag(assertion, "negate") ? "not." : "";
    const name = `${util.flag(assertion, "_name")}(${hasArgs ? "expected" : ""})`;
    const promiseName = util.flag(assertion, "promise");
    const promise = promiseName ? `.${promiseName}` : "";
    return `expect(actual)${promise}.${not}${name}`;
}
function recordAsyncExpect(_test, promise, assertion, error) {
    const test = _test;
    if (test && promise instanceof Promise) {
        promise = promise.finally(()=>{
            if (!test.promises) return;
            const index = test.promises.indexOf(promise);
            if (-1 !== index) test.promises.splice(index, 1);
        });
        if (!test.promises) test.promises = [];
        test.promises.push(promise);
        let resolved = false;
        test.onFinished ?? (test.onFinished = []);
        test.onFinished.push(()=>{
            if (!resolved) {
                var _vitest_worker__;
                const processor = (null == (_vitest_worker__ = globalThis.__vitest_worker__) ? void 0 : _vitest_worker__.onFilterStackTrace) || ((s)=>s || "");
                const stack = processor(error.stack);
                console.warn([
                    `Promise returned by \`${assertion}\` was not awaited. `,
                    "Vitest currently auto-awaits hanging assertions at the end of the test, but this will cause the test to fail in Vitest 3. ",
                    "Please remember to await the assertion.\n",
                    stack
                ].join(""));
            }
        });
        return {
            then (onFulfilled, onRejected) {
                resolved = true;
                return promise.then(onFulfilled, onRejected);
            },
            catch (onRejected) {
                return promise.catch(onRejected);
            },
            finally (onFinally) {
                return promise.finally(onFinally);
            },
            [Symbol.toStringTag]: "Promise"
        };
    }
    return promise;
}
function handleTestError(test, err) {
    var _test$result;
    test.result || (test.result = {
        state: "fail"
    });
    test.result.state = "fail";
    (_test$result = test.result).errors || (_test$result.errors = []);
    test.result.errors.push(processError(err));
}
function wrapAssertion(utils, name, fn) {
    return function(...args) {
        if ("withTest" !== name) utils.flag(this, "_name", name);
        if (!utils.flag(this, "soft")) return fn.apply(this, args);
        const test = utils.flag(this, "vitest-test");
        if (!test) throw new Error("expect.soft() can only be used inside a test");
        try {
            const result = fn.apply(this, args);
            if (result && "object" == typeof result && "function" == typeof result.then) return result.then(noop, (err)=>{
                handleTestError(test, err);
            });
            return result;
        } catch (err) {
            handleTestError(test, err);
        }
    };
}
const JestChaiExpect = (chai, utils)=>{
    const { AssertionError } = chai;
    const customTesters = getCustomEqualityTesters();
    function def(name, fn) {
        const addMethod = (n)=>{
            const softWrapper = wrapAssertion(utils, n, fn);
            utils.addMethod(chai.Assertion.prototype, n, softWrapper);
            utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, n, softWrapper);
        };
        if (Array.isArray(name)) name.forEach((n)=>addMethod(n));
        else addMethod(name);
    }
    [
        "throw",
        "throws",
        "Throw"
    ].forEach((m)=>{
        utils.overwriteMethod(chai.Assertion.prototype, m, (_super)=>function(...args) {
                const promise = utils.flag(this, "promise");
                const object = utils.flag(this, "object");
                const isNot = utils.flag(this, "negate");
                if ("rejects" === promise) utils.flag(this, "object", ()=>{
                    throw object;
                });
                else if ("resolves" === promise && "function" != typeof object) if (isNot) return;
                else {
                    const message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't";
                    const error = {
                        showDiff: false
                    };
                    throw new AssertionError(message, error, utils.flag(this, "ssfi"));
                }
                _super.apply(this, args);
            });
    });
    def("withTest", function(test) {
        utils.flag(this, "vitest-test", test);
        return this;
    });
    def("toEqual", function(expected) {
        const actual = utils.flag(this, "object");
        const equal = dist_equals(actual, expected, [
            ...customTesters,
            iterableEquality
        ]);
        return this.assert(equal, "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", expected, actual);
    });
    def("toStrictEqual", function(expected) {
        const obj = utils.flag(this, "object");
        const equal = dist_equals(obj, expected, [
            ...customTesters,
            iterableEquality,
            typeEquality,
            sparseArrayEquality,
            arrayBufferEquality
        ], true);
        return this.assert(equal, "expected #{this} to strictly equal #{exp}", "expected #{this} to not strictly equal #{exp}", expected, obj);
    });
    def("toBe", function(expected) {
        const actual = this._obj;
        const pass = Object.is(actual, expected);
        let deepEqualityName = "";
        if (!pass) {
            const toStrictEqualPass = dist_equals(actual, expected, [
                ...customTesters,
                iterableEquality,
                typeEquality,
                sparseArrayEquality,
                arrayBufferEquality
            ], true);
            if (toStrictEqualPass) deepEqualityName = "toStrictEqual";
            else {
                const toEqualPass = dist_equals(actual, expected, [
                    ...customTesters,
                    iterableEquality
                ]);
                if (toEqualPass) deepEqualityName = "toEqual";
            }
        }
        return this.assert(pass, generateToBeMessage(deepEqualityName), "expected #{this} not to be #{exp} // Object.is equality", expected, actual);
    });
    def("toMatchObject", function(expected) {
        const actual = this._obj;
        const pass = dist_equals(actual, expected, [
            ...customTesters,
            iterableEquality,
            subsetEquality
        ]);
        const isNot = utils.flag(this, "negate");
        const { subset: actualSubset, stripped } = getObjectSubset(actual, expected, customTesters);
        if (pass && isNot || !pass && !isNot) {
            const msg = utils.getMessage(this, [
                pass,
                "expected #{this} to match object #{exp}",
                "expected #{this} to not match object #{exp}",
                expected,
                actualSubset,
                false
            ]);
            const message = 0 === stripped ? msg : `${msg}\n(${stripped} matching ${1 === stripped ? "property" : "properties"} omitted from actual)`;
            throw new AssertionError(message, {
                showDiff: true,
                expected,
                actual: actualSubset
            });
        }
    });
    def("toMatch", function(expected) {
        const actual = this._obj;
        if ("string" != typeof actual) throw new TypeError(`.toMatch() expects to receive a string, but got ${typeof actual}`);
        return this.assert("string" == typeof expected ? actual.includes(expected) : actual.match(expected), "expected #{this} to match #{exp}", "expected #{this} not to match #{exp}", expected, actual);
    });
    def("toContain", function(item) {
        const actual = this._obj;
        if ("u" > typeof Node && actual instanceof Node) {
            if (!(item instanceof Node)) throw new TypeError(`toContain() expected a DOM node as the argument, but got ${typeof item}`);
            return this.assert(actual.contains(item), "expected #{this} to contain element #{exp}", "expected #{this} not to contain element #{exp}", item, actual);
        }
        if ("u" > typeof DOMTokenList && actual instanceof DOMTokenList) {
            assertTypes(item, "class name", [
                "string"
            ]);
            const isNot = utils.flag(this, "negate");
            const expectedClassList = isNot ? actual.value.replace(item, "").trim() : `${actual.value} ${item}`;
            return this.assert(actual.contains(item), `expected "${actual.value}" to contain "${item}"`, `expected "${actual.value}" not to contain "${item}"`, expectedClassList, actual.value);
        }
        if ("string" == typeof actual && "string" == typeof item) return this.assert(actual.includes(item), "expected #{this} to contain #{exp}", "expected #{this} not to contain #{exp}", item, actual);
        if (null != actual && "string" != typeof actual) utils.flag(this, "object", Array.from(actual));
        return this.contain(item);
    });
    def("toContainEqual", function(expected) {
        const obj = utils.flag(this, "object");
        const index = Array.from(obj).findIndex((item)=>dist_equals(item, expected, customTesters));
        this.assert(-1 !== index, "expected #{this} to deep equally contain #{exp}", "expected #{this} to not deep equally contain #{exp}", expected);
    });
    def("toBeTruthy", function() {
        const obj = utils.flag(this, "object");
        this.assert(Boolean(obj), "expected #{this} to be truthy", "expected #{this} to not be truthy", true, obj);
    });
    def("toBeFalsy", function() {
        const obj = utils.flag(this, "object");
        this.assert(!obj, "expected #{this} to be falsy", "expected #{this} to not be falsy", false, obj);
    });
    def("toBeGreaterThan", function(expected) {
        const actual = this._obj;
        assertTypes(actual, "actual", [
            "number",
            "bigint"
        ]);
        assertTypes(expected, "expected", [
            "number",
            "bigint"
        ]);
        return this.assert(actual > expected, `expected ${actual} to be greater than ${expected}`, `expected ${actual} to be not greater than ${expected}`, expected, actual, false);
    });
    def("toBeGreaterThanOrEqual", function(expected) {
        const actual = this._obj;
        assertTypes(actual, "actual", [
            "number",
            "bigint"
        ]);
        assertTypes(expected, "expected", [
            "number",
            "bigint"
        ]);
        return this.assert(actual >= expected, `expected ${actual} to be greater than or equal to ${expected}`, `expected ${actual} to be not greater than or equal to ${expected}`, expected, actual, false);
    });
    def("toBeLessThan", function(expected) {
        const actual = this._obj;
        assertTypes(actual, "actual", [
            "number",
            "bigint"
        ]);
        assertTypes(expected, "expected", [
            "number",
            "bigint"
        ]);
        return this.assert(actual < expected, `expected ${actual} to be less than ${expected}`, `expected ${actual} to be not less than ${expected}`, expected, actual, false);
    });
    def("toBeLessThanOrEqual", function(expected) {
        const actual = this._obj;
        assertTypes(actual, "actual", [
            "number",
            "bigint"
        ]);
        assertTypes(expected, "expected", [
            "number",
            "bigint"
        ]);
        return this.assert(actual <= expected, `expected ${actual} to be less than or equal to ${expected}`, `expected ${actual} to be not less than or equal to ${expected}`, expected, actual, false);
    });
    def("toBeNaN", function() {
        const obj = utils.flag(this, "object");
        this.assert(Number.isNaN(obj), "expected #{this} to be NaN", "expected #{this} not to be NaN", NaN, obj);
    });
    def("toBeUndefined", function() {
        const obj = utils.flag(this, "object");
        this.assert(void 0 === obj, "expected #{this} to be undefined", "expected #{this} not to be undefined", void 0, obj);
    });
    def("toBeNull", function() {
        const obj = utils.flag(this, "object");
        this.assert(null === obj, "expected #{this} to be null", "expected #{this} not to be null", null, obj);
    });
    def("toBeDefined", function() {
        const obj = utils.flag(this, "object");
        this.assert(void 0 !== obj, "expected #{this} to be defined", "expected #{this} to be undefined", obj);
    });
    def("toBeTypeOf", function(expected) {
        const actual = typeof this._obj;
        const equal = expected === actual;
        return this.assert(equal, "expected #{this} to be type of #{exp}", "expected #{this} not to be type of #{exp}", expected, actual);
    });
    def("toBeInstanceOf", function(obj) {
        return this.instanceOf(obj);
    });
    def("toHaveLength", function(length) {
        return this.have.length(length);
    });
    def("toHaveProperty", function(...args) {
        if (Array.isArray(args[0])) args[0] = args[0].map((key)=>String(key).replace(/([.[\]])/g, "\\$1")).join(".");
        const actual = this._obj;
        const [propertyName, expected] = args;
        const getValue = ()=>{
            const hasOwn = Object.prototype.hasOwnProperty.call(actual, propertyName);
            if (hasOwn) return {
                value: actual[propertyName],
                exists: true
            };
            return utils.getPathInfo(actual, propertyName);
        };
        const { value, exists } = getValue();
        const pass = exists && (1 === args.length || dist_equals(expected, value, customTesters));
        const valueString = 1 === args.length ? "" : ` with value ${utils.objDisplay(expected)}`;
        return this.assert(pass, `expected #{this} to have property "${propertyName}"${valueString}`, `expected #{this} to not have property "${propertyName}"${valueString}`, expected, exists ? value : void 0);
    });
    def("toBeCloseTo", function(received, precision = 2) {
        const expected = this._obj;
        let pass = false;
        let expectedDiff = 0;
        let receivedDiff = 0;
        if (received === 1 / 0 && expected === 1 / 0) pass = true;
        else if (received === -1 / 0 && expected === -1 / 0) pass = true;
        else {
            expectedDiff = 10 ** -precision / 2;
            receivedDiff = Math.abs(expected - received);
            pass = receivedDiff < expectedDiff;
        }
        return this.assert(pass, `expected #{this} to be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`, `expected #{this} to not be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff}`, received, expected, false);
    });
    function assertIsMock(assertion) {
        if (!dist_isMockFunction(assertion._obj)) throw new TypeError(`${utils.inspect(assertion._obj)} is not a spy or a call to a spy!`);
    }
    function getSpy(assertion) {
        assertIsMock(assertion);
        return assertion._obj;
    }
    def([
        "toHaveBeenCalledTimes",
        "toBeCalledTimes"
    ], function(number) {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const callCount = spy.mock.calls.length;
        return this.assert(callCount === number, `expected "${spyName}" to be called #{exp} times, but got ${callCount} times`, `expected "${spyName}" to not be called #{exp} times`, number, callCount, false);
    });
    def("toHaveBeenCalledOnce", function() {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const callCount = spy.mock.calls.length;
        return this.assert(1 === callCount, `expected "${spyName}" to be called once, but got ${callCount} times`, `expected "${spyName}" to not be called once`, 1, callCount, false);
    });
    def([
        "toHaveBeenCalled",
        "toBeCalled"
    ], function() {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const callCount = spy.mock.calls.length;
        const called = callCount > 0;
        const isNot = utils.flag(this, "negate");
        let msg = utils.getMessage(this, [
            called,
            `expected "${spyName}" to be called at least once`,
            `expected "${spyName}" to not be called at all, but actually been called ${callCount} times`,
            true,
            called
        ]);
        if (called && isNot) msg = formatCalls(spy, msg);
        if (called && isNot || !called && !isNot) throw new AssertionError(msg);
    });
    function equalsArgumentArray(a, b) {
        return a.length === b.length && a.every((aItem, i)=>dist_equals(aItem, b[i], [
                ...customTesters,
                iterableEquality
            ]));
    }
    def([
        "toHaveBeenCalledWith",
        "toBeCalledWith"
    ], function(...args) {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const pass = spy.mock.calls.some((callArg)=>equalsArgumentArray(callArg, args));
        const isNot = utils.flag(this, "negate");
        const msg = utils.getMessage(this, [
            pass,
            `expected "${spyName}" to be called with arguments: #{exp}`,
            `expected "${spyName}" to not be called with arguments: #{exp}`,
            args
        ]);
        if (pass && isNot || !pass && !isNot) throw new AssertionError(formatCalls(spy, msg, args));
    });
    def("toHaveBeenCalledExactlyOnceWith", function(...args) {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const callCount = spy.mock.calls.length;
        const hasCallWithArgs = spy.mock.calls.some((callArg)=>equalsArgumentArray(callArg, args));
        const pass = hasCallWithArgs && 1 === callCount;
        const isNot = utils.flag(this, "negate");
        const msg = utils.getMessage(this, [
            pass,
            `expected "${spyName}" to be called once with arguments: #{exp}`,
            `expected "${spyName}" to not be called once with arguments: #{exp}`,
            args
        ]);
        if (pass && isNot || !pass && !isNot) throw new AssertionError(formatCalls(spy, msg, args));
    });
    def([
        "toHaveBeenNthCalledWith",
        "nthCalledWith"
    ], function(times, ...args) {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const nthCall = spy.mock.calls[times - 1];
        const callCount = spy.mock.calls.length;
        const isCalled = times <= callCount;
        this.assert(nthCall && equalsArgumentArray(nthCall, args), `expected ${ordinalOf(times)} "${spyName}" call to have been called with #{exp}${isCalled ? "" : `, but called only ${callCount} times`}`, `expected ${ordinalOf(times)} "${spyName}" call to not have been called with #{exp}`, args, nthCall, isCalled);
    });
    def([
        "toHaveBeenLastCalledWith",
        "lastCalledWith"
    ], function(...args) {
        const spy = getSpy(this);
        const spyName = spy.getMockName();
        const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
        this.assert(lastCall && equalsArgumentArray(lastCall, args), `expected last "${spyName}" call to have been called with #{exp}`, `expected last "${spyName}" call to not have been called with #{exp}`, args, lastCall);
    });
    function isSpyCalledBeforeAnotherSpy(beforeSpy, afterSpy, failIfNoFirstInvocation) {
        const beforeInvocationCallOrder = beforeSpy.mock.invocationCallOrder;
        const afterInvocationCallOrder = afterSpy.mock.invocationCallOrder;
        if (0 === beforeInvocationCallOrder.length) return !failIfNoFirstInvocation;
        if (0 === afterInvocationCallOrder.length) return false;
        return beforeInvocationCallOrder[0] < afterInvocationCallOrder[0];
    }
    def([
        "toHaveBeenCalledBefore"
    ], function(resultSpy, failIfNoFirstInvocation = true) {
        const expectSpy = getSpy(this);
        if (!dist_isMockFunction(resultSpy)) throw new TypeError(`${utils.inspect(resultSpy)} is not a spy or a call to a spy`);
        this.assert(isSpyCalledBeforeAnotherSpy(expectSpy, resultSpy, failIfNoFirstInvocation), `expected "${expectSpy.getMockName()}" to have been called before "${resultSpy.getMockName()}"`, `expected "${expectSpy.getMockName()}" to not have been called before "${resultSpy.getMockName()}"`, resultSpy, expectSpy);
    });
    def([
        "toHaveBeenCalledAfter"
    ], function(resultSpy, failIfNoFirstInvocation = true) {
        const expectSpy = getSpy(this);
        if (!dist_isMockFunction(resultSpy)) throw new TypeError(`${utils.inspect(resultSpy)} is not a spy or a call to a spy`);
        this.assert(isSpyCalledBeforeAnotherSpy(resultSpy, expectSpy, failIfNoFirstInvocation), `expected "${expectSpy.getMockName()}" to have been called after "${resultSpy.getMockName()}"`, `expected "${expectSpy.getMockName()}" to not have been called after "${resultSpy.getMockName()}"`, resultSpy, expectSpy);
    });
    def([
        "toThrow",
        "toThrowError"
    ], function(expected) {
        if ("string" == typeof expected || void 0 === expected || expected instanceof RegExp) return this.throws("" === expected ? /^$/ : expected);
        const obj = this._obj;
        const promise = utils.flag(this, "promise");
        const isNot = utils.flag(this, "negate");
        let thrown = null;
        if ("rejects" === promise) thrown = obj;
        else if ("resolves" === promise && "function" != typeof obj) if (isNot) return;
        else {
            const message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't";
            const error = {
                showDiff: false
            };
            throw new AssertionError(message, error, utils.flag(this, "ssfi"));
        }
        else {
            let isThrow = false;
            try {
                obj();
            } catch (err) {
                isThrow = true;
                thrown = err;
            }
            if (!isThrow && !isNot) {
                const message = utils.flag(this, "message") || "expected function to throw an error, but it didn't";
                const error = {
                    showDiff: false
                };
                throw new AssertionError(message, error, utils.flag(this, "ssfi"));
            }
        }
        if ("function" == typeof expected) {
            const name = expected.name || expected.prototype.constructor.name;
            return this.assert(thrown && thrown instanceof expected, `expected error to be instance of ${name}`, `expected error not to be instance of ${name}`, expected, thrown);
        }
        if (expected instanceof Error) {
            const equal = dist_equals(thrown, expected, [
                ...customTesters,
                iterableEquality
            ]);
            return this.assert(equal, "expected a thrown error to be #{exp}", "expected a thrown error not to be #{exp}", expected, thrown);
        }
        if ("object" == typeof expected && "asymmetricMatch" in expected && "function" == typeof expected.asymmetricMatch) {
            const matcher = expected;
            return this.assert(thrown && matcher.asymmetricMatch(thrown), "expected error to match asymmetric matcher", "expected error not to match asymmetric matcher", matcher, thrown);
        }
        throw new Error(`"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof expected}"`);
    });
    [
        {
            name: "toHaveResolved",
            condition: (spy)=>spy.mock.settledResults.length > 0 && spy.mock.settledResults.some(({ type })=>"fulfilled" === type),
            action: "resolved"
        },
        {
            name: [
                "toHaveReturned",
                "toReturn"
            ],
            condition: (spy)=>spy.mock.calls.length > 0 && spy.mock.results.some(({ type })=>"throw" !== type),
            action: "called"
        }
    ].forEach(({ name, condition, action })=>{
        def(name, function() {
            const spy = getSpy(this);
            const spyName = spy.getMockName();
            const pass = condition(spy);
            this.assert(pass, `expected "${spyName}" to be successfully ${action} at least once`, `expected "${spyName}" to not be successfully ${action}`, pass, !pass, false);
        });
    });
    [
        {
            name: "toHaveResolvedTimes",
            condition: (spy, times)=>spy.mock.settledResults.reduce((s, { type })=>"fulfilled" === type ? ++s : s, 0) === times,
            action: "resolved"
        },
        {
            name: [
                "toHaveReturnedTimes",
                "toReturnTimes"
            ],
            condition: (spy, times)=>spy.mock.results.reduce((s, { type })=>"throw" === type ? s : ++s, 0) === times,
            action: "called"
        }
    ].forEach(({ name, condition, action })=>{
        def(name, function(times) {
            const spy = getSpy(this);
            const spyName = spy.getMockName();
            const pass = condition(spy, times);
            this.assert(pass, `expected "${spyName}" to be successfully ${action} ${times} times`, `expected "${spyName}" to not be successfully ${action} ${times} times`, `expected resolved times: ${times}`, `received resolved times: ${pass}`, false);
        });
    });
    [
        {
            name: "toHaveResolvedWith",
            condition: (spy, value)=>spy.mock.settledResults.some(({ type, value: result })=>"fulfilled" === type && dist_equals(value, result)),
            action: "resolve"
        },
        {
            name: [
                "toHaveReturnedWith",
                "toReturnWith"
            ],
            condition: (spy, value)=>spy.mock.results.some(({ type, value: result })=>"return" === type && dist_equals(value, result)),
            action: "return"
        }
    ].forEach(({ name, condition, action })=>{
        def(name, function(value) {
            const spy = getSpy(this);
            const pass = condition(spy, value);
            const isNot = utils.flag(this, "negate");
            if (pass && isNot || !pass && !isNot) {
                const spyName = spy.getMockName();
                const msg = utils.getMessage(this, [
                    pass,
                    `expected "${spyName}" to ${action} with: #{exp} at least once`,
                    `expected "${spyName}" to not ${action} with: #{exp}`,
                    value
                ]);
                const results = "return" === action ? spy.mock.results : spy.mock.settledResults;
                throw new AssertionError(formatReturns(spy, results, msg, value));
            }
        });
    });
    [
        {
            name: "toHaveLastResolvedWith",
            condition: (spy, value)=>{
                const result = spy.mock.settledResults[spy.mock.settledResults.length - 1];
                return result && "fulfilled" === result.type && dist_equals(result.value, value);
            },
            action: "resolve"
        },
        {
            name: [
                "toHaveLastReturnedWith",
                "lastReturnedWith"
            ],
            condition: (spy, value)=>{
                const result = spy.mock.results[spy.mock.results.length - 1];
                return result && "return" === result.type && dist_equals(result.value, value);
            },
            action: "return"
        }
    ].forEach(({ name, condition, action })=>{
        def(name, function(value) {
            const spy = getSpy(this);
            const results = "return" === action ? spy.mock.results : spy.mock.settledResults;
            const result = results[results.length - 1];
            const spyName = spy.getMockName();
            this.assert(condition(spy, value), `expected last "${spyName}" call to ${action} #{exp}`, `expected last "${spyName}" call to not ${action} #{exp}`, value, null == result ? void 0 : result.value);
        });
    });
    [
        {
            name: "toHaveNthResolvedWith",
            condition: (spy, index, value)=>{
                const result = spy.mock.settledResults[index - 1];
                return result && "fulfilled" === result.type && dist_equals(result.value, value);
            },
            action: "resolve"
        },
        {
            name: [
                "toHaveNthReturnedWith",
                "nthReturnedWith"
            ],
            condition: (spy, index, value)=>{
                const result = spy.mock.results[index - 1];
                return result && "return" === result.type && dist_equals(result.value, value);
            },
            action: "return"
        }
    ].forEach(({ name, condition, action })=>{
        def(name, function(nthCall, value) {
            const spy = getSpy(this);
            const spyName = spy.getMockName();
            const results = "return" === action ? spy.mock.results : spy.mock.settledResults;
            const result = results[nthCall - 1];
            const ordinalCall = `${ordinalOf(nthCall)} call`;
            this.assert(condition(spy, nthCall, value), `expected ${ordinalCall} "${spyName}" call to ${action} #{exp}`, `expected ${ordinalCall} "${spyName}" call to not ${action} #{exp}`, value, null == result ? void 0 : result.value);
        });
    });
    def("withContext", function(context) {
        for(const key in context)utils.flag(this, key, context[key]);
        return this;
    });
    utils.addProperty(chai.Assertion.prototype, "resolves", function __VITEST_RESOLVES__() {
        const error = new Error("resolves");
        utils.flag(this, "promise", "resolves");
        utils.flag(this, "error", error);
        const test = utils.flag(this, "vitest-test");
        const obj = utils.flag(this, "object");
        if (utils.flag(this, "poll")) throw new SyntaxError("expect.poll() is not supported in combination with .resolves");
        if ("function" != typeof (null == obj ? void 0 : obj.then)) throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof obj}'.`);
        const proxy = new Proxy(this, {
            get: (target, key, receiver)=>{
                const result = Reflect.get(target, key, receiver);
                if ("function" != typeof result) return result instanceof chai.Assertion ? proxy : result;
                return (...args)=>{
                    utils.flag(this, "_name", key);
                    const promise = obj.then((value)=>{
                        utils.flag(this, "object", value);
                        return result.call(this, ...args);
                    }, (err)=>{
                        const _error = new AssertionError(`promise rejected "${utils.inspect(err)}" instead of resolving`, {
                            showDiff: false
                        });
                        _error.cause = err;
                        _error.stack = error.stack.replace(error.message, _error.message);
                        throw _error;
                    });
                    return recordAsyncExpect(test, promise, createAssertionMessage(utils, this, !!args.length), error);
                };
            }
        });
        return proxy;
    });
    utils.addProperty(chai.Assertion.prototype, "rejects", function __VITEST_REJECTS__() {
        const error = new Error("rejects");
        utils.flag(this, "promise", "rejects");
        utils.flag(this, "error", error);
        const test = utils.flag(this, "vitest-test");
        const obj = utils.flag(this, "object");
        const wrapper = "function" == typeof obj ? obj() : obj;
        if (utils.flag(this, "poll")) throw new SyntaxError("expect.poll() is not supported in combination with .rejects");
        if ("function" != typeof (null == wrapper ? void 0 : wrapper.then)) throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof wrapper}'.`);
        const proxy = new Proxy(this, {
            get: (target, key, receiver)=>{
                const result = Reflect.get(target, key, receiver);
                if ("function" != typeof result) return result instanceof chai.Assertion ? proxy : result;
                return (...args)=>{
                    utils.flag(this, "_name", key);
                    const promise = wrapper.then((value)=>{
                        const _error = new AssertionError(`promise resolved "${utils.inspect(value)}" instead of rejecting`, {
                            showDiff: true,
                            expected: new Error("rejected promise"),
                            actual: value
                        });
                        _error.stack = error.stack.replace(error.message, _error.message);
                        throw _error;
                    }, (err)=>{
                        utils.flag(this, "object", err);
                        return result.call(this, ...args);
                    });
                    return recordAsyncExpect(test, promise, createAssertionMessage(utils, this, !!args.length), error);
                };
            }
        });
        return proxy;
    });
};
function ordinalOf(i) {
    const j = i % 10;
    const k = i % 100;
    if (1 === j && 11 !== k) return `${i}st`;
    if (2 === j && 12 !== k) return `${i}nd`;
    if (3 === j && 13 !== k) return `${i}rd`;
    return `${i}th`;
}
function formatCalls(spy, msg, showActualCall) {
    if (spy.mock.calls.length) msg += node_u.gray(`\n\nReceived: \n\n${spy.mock.calls.map((callArg, i)=>{
        let methodCall = node_u.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call:\n\n`);
        if (showActualCall) methodCall += diff_diff(showActualCall, callArg, {
            omitAnnotationLines: true
        });
        else methodCall += stringify(callArg).split("\n").map((line)=>`    ${line}`).join("\n");
        methodCall += "\n";
        return methodCall;
    }).join("\n")}`);
    msg += node_u.gray(`\n\nNumber of calls: ${node_u.bold(spy.mock.calls.length)}\n`);
    return msg;
}
function formatReturns(spy, results, msg, showActualReturn) {
    if (results.length) msg += node_u.gray(`\n\nReceived: \n\n${results.map((callReturn, i)=>{
        let methodCall = node_u.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call return:\n\n`);
        if (showActualReturn) methodCall += diff_diff(showActualReturn, callReturn.value, {
            omitAnnotationLines: true
        });
        else methodCall += stringify(callReturn).split("\n").map((line)=>`    ${line}`).join("\n");
        methodCall += "\n";
        return methodCall;
    }).join("\n")}`);
    msg += node_u.gray(`\n\nNumber of calls: ${node_u.bold(spy.mock.calls.length)}\n`);
    return msg;
}
function getMatcherState(assertion, expect) {
    const obj = assertion._obj;
    const isNot = utils_exports.flag(assertion, "negate");
    const promise = utils_exports.flag(assertion, "promise") || "";
    const jestUtils = {
        ...getMatcherUtils(),
        diff: diff_diff,
        stringify: stringify,
        iterableEquality: iterableEquality,
        subsetEquality: subsetEquality
    };
    const matcherState = {
        ...getState(expect),
        customTesters: getCustomEqualityTesters(),
        isNot,
        utils: jestUtils,
        promise,
        equals: dist_equals,
        suppressedErrors: [],
        soft: utils_exports.flag(assertion, "soft"),
        poll: utils_exports.flag(assertion, "poll")
    };
    return {
        state: matcherState,
        isNot,
        obj
    };
}
class JestExtendError extends Error {
    constructor(message, actual, expected){
        super(message);
        this.actual = actual;
        this.expected = expected;
    }
}
function JestExtendPlugin(c, expect, matchers) {
    return (_, utils)=>{
        Object.entries(matchers).forEach(([expectAssertionName, expectAssertion])=>{
            function expectWrapper(...args) {
                const { state, isNot, obj } = getMatcherState(this, expect);
                const result = expectAssertion.call(state, obj, ...args);
                if (result && "object" == typeof result && "function" == typeof result.then) {
                    const thenable = result;
                    return thenable.then(({ pass, message, actual, expected })=>{
                        if (pass && isNot || !pass && !isNot) throw new JestExtendError(message(), actual, expected);
                    });
                }
                const { pass, message, actual, expected } = result;
                if (pass && isNot || !pass && !isNot) throw new JestExtendError(message(), actual, expected);
            }
            const softWrapper = wrapAssertion(utils, expectAssertionName, expectWrapper);
            utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, expectAssertionName, softWrapper);
            utils.addMethod(c.Assertion.prototype, expectAssertionName, softWrapper);
            class CustomMatcher extends AsymmetricMatcher {
                constructor(inverse = false, ...sample){
                    super(sample, inverse);
                }
                asymmetricMatch(other) {
                    const { pass } = expectAssertion.call(this.getMatcherContext(expect), other, ...this.sample);
                    return this.inverse ? !pass : pass;
                }
                toString() {
                    return `${this.inverse ? "not." : ""}${expectAssertionName}`;
                }
                getExpectedType() {
                    return "any";
                }
                toAsymmetricMatcher() {
                    return `${this.toString()}<${this.sample.map((item)=>stringify(item)).join(", ")}>`;
                }
            }
            const customMatcher = (...sample)=>new CustomMatcher(false, ...sample);
            Object.defineProperty(expect, expectAssertionName, {
                configurable: true,
                enumerable: true,
                value: customMatcher,
                writable: true
            });
            Object.defineProperty(expect.not, expectAssertionName, {
                configurable: true,
                enumerable: true,
                value: (...sample)=>new CustomMatcher(true, ...sample),
                writable: true
            });
            Object.defineProperty(globalThis[ASYMMETRIC_MATCHERS_OBJECT], expectAssertionName, {
                configurable: true,
                enumerable: true,
                value: customMatcher,
                writable: true
            });
        });
    };
}
const JestExtend = (chai, utils)=>{
    utils.addMethod(chai.expect, "extend", (expect, expects)=>{
        use(JestExtendPlugin(chai, expect, expects));
    });
};
var chai_defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? chai_defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var chai_name = (target, value)=>chai_defProp(target, "name", {
        value,
        configurable: true
    });
var chai_export = (target, all)=>{
    for(var name in all)chai_defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __publicField = (obj, key, value)=>__defNormalProp(obj, "symbol" != typeof key ? key + "" : key, value);
var chai_utils_exports = {};
chai_export(chai_utils_exports, {
    addChainableMethod: ()=>chai_addChainableMethod,
    addLengthGuard: ()=>chai_addLengthGuard,
    addMethod: ()=>node_modules_chai_addMethod,
    addProperty: ()=>chai_addProperty,
    checkError: ()=>chai_check_error_exports,
    compareByInspect: ()=>chai_compareByInspect,
    eql: ()=>chai_deep_eql_default,
    events: ()=>events,
    expectTypes: ()=>chai_expectTypes,
    flag: ()=>chai_flag,
    getActual: ()=>chai_getActual,
    getMessage: ()=>chai_getMessage2,
    getName: ()=>chai_getName,
    getOperator: ()=>chai_getOperator,
    getOwnEnumerableProperties: ()=>chai_getOwnEnumerableProperties,
    getOwnEnumerablePropertySymbols: ()=>chai_getOwnEnumerablePropertySymbols,
    getPathInfo: ()=>chai_getPathInfo,
    hasProperty: ()=>chai_hasProperty,
    inspect: ()=>chai_inspect2,
    isNaN: ()=>chai_isNaN2,
    isNumeric: ()=>chai_isNumeric,
    isProxyEnabled: ()=>chai_isProxyEnabled,
    isRegExp: ()=>chai_isRegExp2,
    objDisplay: ()=>chai_objDisplay,
    overwriteChainableMethod: ()=>chai_overwriteChainableMethod,
    overwriteMethod: ()=>chai_overwriteMethod,
    overwriteProperty: ()=>chai_overwriteProperty,
    proxify: ()=>chai_proxify,
    test: ()=>node_modules_chai_test,
    transferFlags: ()=>chai_transferFlags,
    type: ()=>node_modules_chai_type
});
var chai_check_error_exports = {};
chai_export(chai_check_error_exports, {
    compatibleConstructor: ()=>chai_compatibleConstructor,
    compatibleInstance: ()=>chai_compatibleInstance,
    compatibleMessage: ()=>chai_compatibleMessage,
    getConstructorName: ()=>chai_getConstructorName,
    getMessage: ()=>chai_getMessage
});
function chai_isErrorInstance(obj) {
    return obj instanceof Error || "[object Error]" === Object.prototype.toString.call(obj);
}
chai_name(chai_isErrorInstance, "isErrorInstance");
function chai_isRegExp(obj) {
    return "[object RegExp]" === Object.prototype.toString.call(obj);
}
chai_name(chai_isRegExp, "isRegExp");
function chai_compatibleInstance(thrown, errorLike) {
    return chai_isErrorInstance(errorLike) && thrown === errorLike;
}
chai_name(chai_compatibleInstance, "compatibleInstance");
function chai_compatibleConstructor(thrown, errorLike) {
    if (chai_isErrorInstance(errorLike)) return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
    if (("object" == typeof errorLike || "function" == typeof errorLike) && errorLike.prototype) return thrown.constructor === errorLike || thrown instanceof errorLike;
    return false;
}
chai_name(chai_compatibleConstructor, "compatibleConstructor");
function chai_compatibleMessage(thrown, errMatcher) {
    const comparisonString = "string" == typeof thrown ? thrown : thrown.message;
    if (chai_isRegExp(errMatcher)) return errMatcher.test(comparisonString);
    if ("string" == typeof errMatcher) return -1 !== comparisonString.indexOf(errMatcher);
    return false;
}
chai_name(chai_compatibleMessage, "compatibleMessage");
function chai_getConstructorName(errorLike) {
    let constructorName = errorLike;
    if (chai_isErrorInstance(errorLike)) constructorName = errorLike.constructor.name;
    else if ("function" == typeof errorLike) {
        constructorName = errorLike.name;
        if ("" === constructorName) {
            const newConstructorName = new errorLike().name;
            constructorName = newConstructorName || constructorName;
        }
    }
    return constructorName;
}
chai_name(chai_getConstructorName, "getConstructorName");
function chai_getMessage(errorLike) {
    let msg = "";
    if (errorLike && errorLike.message) msg = errorLike.message;
    else if ("string" == typeof errorLike) msg = errorLike;
    return msg;
}
chai_name(chai_getMessage, "getMessage");
function chai_flag(obj, key, value) {
    let flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
    if (3 !== arguments.length) return flags[key];
    flags[key] = value;
}
chai_name(chai_flag, "flag");
function node_modules_chai_test(obj, args) {
    let negate = chai_flag(obj, "negate"), expr = args[0];
    return negate ? !expr : expr;
}
chai_name(node_modules_chai_test, "test");
function node_modules_chai_type(obj) {
    if (void 0 === obj) return "undefined";
    if (null === obj) return "null";
    const stringTag = obj[Symbol.toStringTag];
    if ("string" == typeof stringTag) return stringTag;
    const type3 = Object.prototype.toString.call(obj).slice(8, -1);
    return type3;
}
chai_name(node_modules_chai_type, "type");
var chai_canElideFrames = "captureStackTrace" in Error;
var node_modules_chai_AssertionError = class _AssertionError extends Error {
    constructor(message = "Unspecified AssertionError", props, ssf){
        super(message);
        __publicField(this, "message");
        this.message = message;
        if (chai_canElideFrames) Error.captureStackTrace(this, ssf || _AssertionError);
        for(const key in props)if (!(key in this)) this[key] = props[key];
    }
    get name() {
        return "AssertionError";
    }
    get ok() {
        return false;
    }
    toJSON(stack) {
        return {
            ...this,
            name: this.name,
            message: this.message,
            ok: false,
            stack: false !== stack ? this.stack : void 0
        };
    }
};
chai_name(node_modules_chai_AssertionError, "AssertionError");
var chai_6_2_2_node_modules_chai_AssertionError = node_modules_chai_AssertionError;
function chai_expectTypes(obj, types) {
    let flagMsg = chai_flag(obj, "message");
    let ssfi = chai_flag(obj, "ssfi");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    obj = chai_flag(obj, "object");
    types = types.map(function(t) {
        return t.toLowerCase();
    });
    types.sort();
    let str = types.map(function(t, index) {
        let art = ~[
            "a",
            "e",
            "i",
            "o",
            "u"
        ].indexOf(t.charAt(0)) ? "an" : "a";
        let or = types.length > 1 && index === types.length - 1 ? "or " : "";
        return or + art + " " + t;
    }).join(", ");
    let objType = node_modules_chai_type(obj).toLowerCase();
    if (!types.some(function(expected) {
        return objType === expected;
    })) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "object tested must be " + str + ", but " + objType + " given", void 0, ssfi);
}
chai_name(chai_expectTypes, "expectTypes");
function chai_getActual(obj, args) {
    return args.length > 4 ? args[4] : obj._obj;
}
chai_name(chai_getActual, "getActual");
var chai_ansiColors = {
    bold: [
        "1",
        "22"
    ],
    dim: [
        "2",
        "22"
    ],
    italic: [
        "3",
        "23"
    ],
    underline: [
        "4",
        "24"
    ],
    inverse: [
        "7",
        "27"
    ],
    hidden: [
        "8",
        "28"
    ],
    strike: [
        "9",
        "29"
    ],
    black: [
        "30",
        "39"
    ],
    red: [
        "31",
        "39"
    ],
    green: [
        "32",
        "39"
    ],
    yellow: [
        "33",
        "39"
    ],
    blue: [
        "34",
        "39"
    ],
    magenta: [
        "35",
        "39"
    ],
    cyan: [
        "36",
        "39"
    ],
    white: [
        "37",
        "39"
    ],
    brightblack: [
        "30;1",
        "39"
    ],
    brightred: [
        "31;1",
        "39"
    ],
    brightgreen: [
        "32;1",
        "39"
    ],
    brightyellow: [
        "33;1",
        "39"
    ],
    brightblue: [
        "34;1",
        "39"
    ],
    brightmagenta: [
        "35;1",
        "39"
    ],
    brightcyan: [
        "36;1",
        "39"
    ],
    brightwhite: [
        "37;1",
        "39"
    ],
    grey: [
        "90",
        "39"
    ]
};
var chai_styles = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red"
};
var chai_truncator = "\u2026";
function chai_colorise(value, styleType) {
    const color = chai_ansiColors[chai_styles[styleType]] || chai_ansiColors[styleType] || "";
    if (!color) return String(value);
    return `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m`;
}
chai_name(chai_colorise, "colorise");
function chai_normaliseOptions({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate: truncate2 = 1 / 0, stylize = String } = {}, inspect3) {
    const options = {
        showHidden: Boolean(showHidden),
        depth: Number(depth),
        colors: Boolean(colors),
        customInspect: Boolean(customInspect),
        showProxy: Boolean(showProxy),
        maxArrayLength: Number(maxArrayLength),
        breakLength: Number(breakLength),
        truncate: Number(truncate2),
        seen,
        inspect: inspect3,
        stylize
    };
    if (options.colors) options.stylize = chai_colorise;
    return options;
}
chai_name(chai_normaliseOptions, "normaliseOptions");
function chai_isHighSurrogate(char) {
    return char >= "\uD800" && char <= "\uDBFF";
}
chai_name(chai_isHighSurrogate, "isHighSurrogate");
function chai_truncate(string, length, tail = chai_truncator) {
    string = String(string);
    const tailLength = tail.length;
    const stringLength = string.length;
    if (tailLength > length && stringLength > tailLength) return tail;
    if (stringLength > length && stringLength > tailLength) {
        let end = length - tailLength;
        if (end > 0 && chai_isHighSurrogate(string[end - 1])) end -= 1;
        return `${string.slice(0, end)}${tail}`;
    }
    return string;
}
chai_name(chai_truncate, "truncate");
function chai_inspectList(list, options, inspectItem, separator = ", ") {
    inspectItem = inspectItem || options.inspect;
    const size = list.length;
    if (0 === size) return "";
    const originalLength = options.truncate;
    let output = "";
    let peek = "";
    let truncated = "";
    for(let i = 0; i < size; i += 1){
        const last = i + 1 === list.length;
        const secondToLast = i + 2 === list.length;
        truncated = `${chai_truncator}(${list.length - i})`;
        const value = list[i];
        options.truncate = originalLength - output.length - (last ? 0 : separator.length);
        const string = peek || inspectItem(value, options) + (last ? "" : separator);
        const nextLength = output.length + string.length;
        const truncatedLength = nextLength + truncated.length;
        if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) break;
        if (!last && !secondToLast && truncatedLength > originalLength) break;
        peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
        if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) break;
        output += string;
        if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
            truncated = `${chai_truncator}(${list.length - i - 1})`;
            break;
        }
        truncated = "";
    }
    return `${output}${truncated}`;
}
chai_name(chai_inspectList, "inspectList");
function chai_quoteComplexKey(key) {
    if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) return key;
    return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
chai_name(chai_quoteComplexKey, "quoteComplexKey");
function chai_inspectProperty([key, value], options) {
    options.truncate -= 2;
    if ("string" == typeof key) key = chai_quoteComplexKey(key);
    else if ("number" != typeof key) key = `[${options.inspect(key, options)}]`;
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key}: ${value}`;
}
chai_name(chai_inspectProperty, "inspectProperty");
function chai_inspectArray(array, options) {
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return "[]";
    options.truncate -= 4;
    const listContents = chai_inspectList(array, options);
    options.truncate -= listContents.length;
    let propertyContents = "";
    if (nonIndexProperties.length) propertyContents = chai_inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, chai_inspectProperty);
    return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
chai_name(chai_inspectArray, "inspectArray");
var chai_getArrayName = /* @__PURE__ */ chai_name((array)=>{
    if ("function" == typeof Buffer && array instanceof Buffer) return "Buffer";
    if (array[Symbol.toStringTag]) return array[Symbol.toStringTag];
    return array.constructor.name;
}, "getArrayName");
function chai_inspectTypedArray(array, options) {
    const name = chai_getArrayName(array);
    options.truncate -= name.length + 4;
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return `${name}[]`;
    let output = "";
    for(let i = 0; i < array.length; i++){
        const string = `${options.stylize(chai_truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
        options.truncate -= string.length;
        if (array[i] !== array.length && options.truncate <= 3) {
            output += `${chai_truncator}(${array.length - array[i] + 1})`;
            break;
        }
        output += string;
    }
    let propertyContents = "";
    if (nonIndexProperties.length) propertyContents = chai_inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, chai_inspectProperty);
    return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
chai_name(chai_inspectTypedArray, "inspectTypedArray");
function chai_inspectDate(dateObject, options) {
    const stringRepresentation = dateObject.toJSON();
    if (null === stringRepresentation) return "Invalid Date";
    const split = stringRepresentation.split("T");
    const date = split[0];
    return options.stylize(`${date}T${chai_truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
chai_name(chai_inspectDate, "inspectDate");
function chai_inspectFunction(func, options) {
    const functionType = func[Symbol.toStringTag] || "Function";
    const name = func.name;
    if (!name) return options.stylize(`[${functionType}]`, "special");
    return options.stylize(`[${functionType} ${chai_truncate(name, options.truncate - 11)}]`, "special");
}
chai_name(chai_inspectFunction, "inspectFunction");
function chai_inspectMapEntry([key, value], options) {
    options.truncate -= 4;
    key = options.inspect(key, options);
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key} => ${value}`;
}
chai_name(chai_inspectMapEntry, "inspectMapEntry");
function chai_mapToEntries(map) {
    const entries = [];
    map.forEach((value, key)=>{
        entries.push([
            key,
            value
        ]);
    });
    return entries;
}
chai_name(chai_mapToEntries, "mapToEntries");
function chai_inspectMap(map, options) {
    if (0 === map.size) return "Map{}";
    options.truncate -= 7;
    return `Map{ ${chai_inspectList(chai_mapToEntries(map), options, chai_inspectMapEntry)} }`;
}
chai_name(chai_inspectMap, "inspectMap");
var node_modules_chai_isNaN = Number.isNaN || ((i)=>i !== i);
function chai_inspectNumber(number, options) {
    if (node_modules_chai_isNaN(number)) return options.stylize("NaN", "number");
    if (number === 1 / 0) return options.stylize("Infinity", "number");
    if (number === -1 / 0) return options.stylize("-Infinity", "number");
    if (0 === number) return options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number");
    return options.stylize(chai_truncate(String(number), options.truncate), "number");
}
chai_name(chai_inspectNumber, "inspectNumber");
function chai_inspectBigInt(number, options) {
    let nums = chai_truncate(number.toString(), options.truncate - 1);
    if (nums !== chai_truncator) nums += "n";
    return options.stylize(nums, "bigint");
}
chai_name(chai_inspectBigInt, "inspectBigInt");
function chai_inspectRegExp(value, options) {
    const flags = value.toString().split("/")[2];
    const sourceLength = options.truncate - (2 + flags.length);
    const source = value.source;
    return options.stylize(`/${chai_truncate(source, sourceLength)}/${flags}`, "regexp");
}
chai_name(chai_inspectRegExp, "inspectRegExp");
function chai_arrayFromSet(set2) {
    const values = [];
    set2.forEach((value)=>{
        values.push(value);
    });
    return values;
}
chai_name(chai_arrayFromSet, "arrayFromSet");
function chai_inspectSet(set2, options) {
    if (0 === set2.size) return "Set{}";
    options.truncate -= 7;
    return `Set{ ${chai_inspectList(chai_arrayFromSet(set2), options)} }`;
}
chai_name(chai_inspectSet, "inspectSet");
var chai_stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g");
var chai_escapeCharacters = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\"
};
var chai_hex = 16;
var chai_unicodeLength = 4;
function node_modules_chai_escape(char) {
    return chai_escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(chai_hex)}`.slice(-chai_unicodeLength)}`;
}
chai_name(node_modules_chai_escape, "escape");
function chai_inspectString(string, options) {
    if (chai_stringEscapeChars.test(string)) string = string.replace(chai_stringEscapeChars, node_modules_chai_escape);
    return options.stylize(`'${chai_truncate(string, options.truncate - 2)}'`, "string");
}
chai_name(chai_inspectString, "inspectString");
function chai_inspectSymbol(value) {
    if ("description" in Symbol.prototype) return value.description ? `Symbol(${value.description})` : "Symbol()";
    return value.toString();
}
chai_name(chai_inspectSymbol, "inspectSymbol");
var chai_getPromiseValue = /* @__PURE__ */ chai_name(()=>"Promise{\u2026}", "getPromiseValue");
var chai_promise_default = chai_getPromiseValue;
function chai_inspectObject(object, options) {
    const properties = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
    if (0 === properties.length && 0 === symbols.length) return "{}";
    options.truncate -= 4;
    options.seen = options.seen || [];
    if (options.seen.includes(object)) return "[Circular]";
    options.seen.push(object);
    const propertyContents = chai_inspectList(properties.map((key)=>[
            key,
            object[key]
        ]), options, chai_inspectProperty);
    const symbolContents = chai_inspectList(symbols.map((key)=>[
            key,
            object[key]
        ]), options, chai_inspectProperty);
    options.seen.pop();
    let sep = "";
    if (propertyContents && symbolContents) sep = ", ";
    return `{ ${propertyContents}${sep}${symbolContents} }`;
}
chai_name(chai_inspectObject, "inspectObject");
var chai_toStringTag = "u" > typeof Symbol && Symbol.toStringTag ? Symbol.toStringTag : false;
function chai_inspectClass(value, options) {
    let name = "";
    if (chai_toStringTag && chai_toStringTag in value) name = value[chai_toStringTag];
    name = name || value.constructor.name;
    if (!name || "_class" === name) name = "<Anonymous Class>";
    options.truncate -= name.length;
    return `${name}${chai_inspectObject(value, options)}`;
}
chai_name(chai_inspectClass, "inspectClass");
function chai_inspectArguments(args, options) {
    if (0 === args.length) return "Arguments[]";
    options.truncate -= 13;
    return `Arguments[ ${chai_inspectList(args, options)} ]`;
}
chai_name(chai_inspectArguments, "inspectArguments");
var chai_errorKeys = [
    "stack",
    "line",
    "column",
    "name",
    "message",
    "fileName",
    "lineNumber",
    "columnNumber",
    "number",
    "description",
    "cause"
];
function chai_inspectObject2(error, options) {
    const properties = Object.getOwnPropertyNames(error).filter((key)=>-1 === chai_errorKeys.indexOf(key));
    const name = error.name;
    options.truncate -= name.length;
    let message = "";
    if ("string" == typeof error.message) message = chai_truncate(error.message, options.truncate);
    else properties.unshift("message");
    message = message ? `: ${message}` : "";
    options.truncate -= message.length + 5;
    options.seen = options.seen || [];
    if (options.seen.includes(error)) return "[Circular]";
    options.seen.push(error);
    const propertyContents = chai_inspectList(properties.map((key)=>[
            key,
            error[key]
        ]), options, chai_inspectProperty);
    return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
chai_name(chai_inspectObject2, "inspectObject");
function chai_inspectAttribute([key, value], options) {
    options.truncate -= 3;
    if (!value) return `${options.stylize(String(key), "yellow")}`;
    return `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}`;
}
chai_name(chai_inspectAttribute, "inspectAttribute");
function chai_inspectNodeCollection(collection, options) {
    return chai_inspectList(collection, options, chai_inspectNode, "\n");
}
chai_name(chai_inspectNodeCollection, "inspectNodeCollection");
function chai_inspectNode(node, options) {
    switch(node.nodeType){
        case 1:
            return chai_inspectHTML(node, options);
        case 3:
            return options.inspect(node.data, options);
        default:
            return options.inspect(node, options);
    }
}
chai_name(chai_inspectNode, "inspectNode");
function chai_inspectHTML(element, options) {
    const properties = element.getAttributeNames();
    const name = element.tagName.toLowerCase();
    const head = options.stylize(`<${name}`, "special");
    const headClose = options.stylize(">", "special");
    const tail = options.stylize(`</${name}>`, "special");
    options.truncate -= 2 * name.length + 5;
    let propertyContents = "";
    if (properties.length > 0) {
        propertyContents += " ";
        propertyContents += chai_inspectList(properties.map((key)=>[
                key,
                element.getAttribute(key)
            ]), options, chai_inspectAttribute, " ");
    }
    options.truncate -= propertyContents.length;
    const truncate2 = options.truncate;
    let children = chai_inspectNodeCollection(element.children, options);
    if (children && children.length > truncate2) children = `${chai_truncator}(${element.children.length})`;
    return `${head}${propertyContents}${headClose}${children}${tail}`;
}
chai_name(chai_inspectHTML, "inspectHTML");
var chai_symbolsSupported = "function" == typeof Symbol && "function" == typeof Symbol.for;
var chai_chaiInspect = chai_symbolsSupported ? /* @__PURE__ */ Symbol.for("chai/inspect") : "@@chai/inspect";
var chai_nodeInspect = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var chai_constructorMap = /* @__PURE__ */ new WeakMap();
var chai_stringTagMap = {};
var chai_baseTypesMap = {
    undefined: /* @__PURE__ */ chai_name((value, options)=>options.stylize("undefined", "undefined"), "undefined"),
    null: /* @__PURE__ */ chai_name((value, options)=>options.stylize("null", "null"), "null"),
    boolean: /* @__PURE__ */ chai_name((value, options)=>options.stylize(String(value), "boolean"), "boolean"),
    Boolean: /* @__PURE__ */ chai_name((value, options)=>options.stylize(String(value), "boolean"), "Boolean"),
    number: chai_inspectNumber,
    Number: chai_inspectNumber,
    bigint: chai_inspectBigInt,
    BigInt: chai_inspectBigInt,
    string: chai_inspectString,
    String: chai_inspectString,
    function: chai_inspectFunction,
    Function: chai_inspectFunction,
    symbol: chai_inspectSymbol,
    Symbol: chai_inspectSymbol,
    Array: chai_inspectArray,
    Date: chai_inspectDate,
    Map: chai_inspectMap,
    Set: chai_inspectSet,
    RegExp: chai_inspectRegExp,
    Promise: chai_promise_default,
    WeakSet: /* @__PURE__ */ chai_name((value, options)=>options.stylize("WeakSet{\u2026}", "special"), "WeakSet"),
    WeakMap: /* @__PURE__ */ chai_name((value, options)=>options.stylize("WeakMap{\u2026}", "special"), "WeakMap"),
    Arguments: chai_inspectArguments,
    Int8Array: chai_inspectTypedArray,
    Uint8Array: chai_inspectTypedArray,
    Uint8ClampedArray: chai_inspectTypedArray,
    Int16Array: chai_inspectTypedArray,
    Uint16Array: chai_inspectTypedArray,
    Int32Array: chai_inspectTypedArray,
    Uint32Array: chai_inspectTypedArray,
    Float32Array: chai_inspectTypedArray,
    Float64Array: chai_inspectTypedArray,
    Generator: /* @__PURE__ */ chai_name(()=>"", "Generator"),
    DataView: /* @__PURE__ */ chai_name(()=>"", "DataView"),
    ArrayBuffer: /* @__PURE__ */ chai_name(()=>"", "ArrayBuffer"),
    Error: chai_inspectObject2,
    HTMLCollection: chai_inspectNodeCollection,
    NodeList: chai_inspectNodeCollection
};
var chai_inspectCustom = /* @__PURE__ */ chai_name((value, options, type3, inspectFn)=>{
    if (chai_chaiInspect in value && "function" == typeof value[chai_chaiInspect]) return value[chai_chaiInspect](options);
    if (chai_nodeInspect in value && "function" == typeof value[chai_nodeInspect]) return value[chai_nodeInspect](options.depth, options, inspectFn);
    if ("inspect" in value && "function" == typeof value.inspect) return value.inspect(options.depth, options);
    if ("constructor" in value && chai_constructorMap.has(value.constructor)) return chai_constructorMap.get(value.constructor)(value, options);
    if (chai_stringTagMap[type3]) return chai_stringTagMap[type3](value, options);
    return "";
}, "inspectCustom");
var node_modules_chai_toString = Object.prototype.toString;
function chai_inspect(value, opts = {}) {
    const options = chai_normaliseOptions(opts, chai_inspect);
    const { customInspect } = options;
    let type3 = null === value ? "null" : typeof value;
    if ("object" === type3) type3 = node_modules_chai_toString.call(value).slice(8, -1);
    if (type3 in chai_baseTypesMap) return chai_baseTypesMap[type3](value, options);
    if (customInspect && value) {
        const output = chai_inspectCustom(value, options, type3, chai_inspect);
        if (output) {
            if ("string" == typeof output) return output;
            return chai_inspect(output, options);
        }
    }
    const proto = value ? Object.getPrototypeOf(value) : false;
    if (proto === Object.prototype || null === proto) return chai_inspectObject(value, options);
    if (value && "function" == typeof HTMLElement && value instanceof HTMLElement) return chai_inspectHTML(value, options);
    if ("constructor" in value) {
        if (value.constructor !== Object) return chai_inspectClass(value, options);
        return chai_inspectObject(value, options);
    }
    if (value === Object(value)) return chai_inspectObject(value, options);
    return options.stylize(String(value), type3);
}
chai_name(chai_inspect, "inspect");
var node_modules_chai_config = {
    includeStack: false,
    showDiff: true,
    truncateThreshold: 40,
    useProxy: true,
    proxyExcludedKeys: [
        "then",
        "catch",
        "inspect",
        "toJSON"
    ],
    deepEqual: null
};
function chai_inspect2(obj, showHidden, depth, colors) {
    let options = {
        colors,
        depth: void 0 === depth ? 2 : depth,
        showHidden,
        truncate: node_modules_chai_config.truncateThreshold ? node_modules_chai_config.truncateThreshold : 1 / 0
    };
    return chai_inspect(obj, options);
}
chai_name(chai_inspect2, "inspect");
function chai_objDisplay(obj) {
    let str = chai_inspect2(obj), type3 = Object.prototype.toString.call(obj);
    if (!node_modules_chai_config.truncateThreshold || !(str.length >= node_modules_chai_config.truncateThreshold)) return str;
    if ("[object Function]" === type3) return obj.name && "" !== obj.name ? "[Function: " + obj.name + "]" : "[Function]";
    if ("[object Array]" === type3) return "[ Array(" + obj.length + ") ]";
    {
        if ("[object Object]" !== type3) return str;
        let keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(", ") + ", ..." : keys.join(", ");
        return "{ Object (" + kstr + ") }";
    }
}
chai_name(chai_objDisplay, "objDisplay");
function chai_getMessage2(obj, args) {
    let negate = chai_flag(obj, "negate");
    let val = chai_flag(obj, "object");
    let expected = args[3];
    let actual = chai_getActual(obj, args);
    let msg = negate ? args[2] : args[1];
    let flagMsg = chai_flag(obj, "message");
    if ("function" == typeof msg) msg = msg();
    msg = msg || "";
    msg = msg.replace(/#\{this\}/g, function() {
        return chai_objDisplay(val);
    }).replace(/#\{act\}/g, function() {
        return chai_objDisplay(actual);
    }).replace(/#\{exp\}/g, function() {
        return chai_objDisplay(expected);
    });
    return flagMsg ? flagMsg + ": " + msg : msg;
}
chai_name(chai_getMessage2, "getMessage");
function chai_transferFlags(assertion, object, includeAll) {
    let flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
    if (!object.__flags) object.__flags = /* @__PURE__ */ Object.create(null);
    includeAll = 3 === arguments.length ? includeAll : true;
    for(let flag3 in flags)if (includeAll || "object" !== flag3 && "ssfi" !== flag3 && "lockSsfi" !== flag3 && "message" != flag3) object.__flags[flag3] = flags[flag3];
}
chai_name(chai_transferFlags, "transferFlags");
function chai_type2(obj) {
    if (void 0 === obj) return "undefined";
    if (null === obj) return "null";
    const stringTag = obj[Symbol.toStringTag];
    if ("string" == typeof stringTag) return stringTag;
    const sliceStart = 8;
    const sliceEnd = -1;
    return Object.prototype.toString.call(obj).slice(sliceStart, sliceEnd);
}
chai_name(chai_type2, "type");
function chai_FakeMap() {
    this._key = "chai/deep-eql__" + Math.random() + Date.now();
}
chai_name(chai_FakeMap, "FakeMap");
chai_FakeMap.prototype = {
    get: /* @__PURE__ */ chai_name(function get(key) {
        return key[this._key];
    }, "get"),
    set: /* @__PURE__ */ chai_name(function set(key, value) {
        if (Object.isExtensible(key)) Object.defineProperty(key, this._key, {
            value,
            configurable: true
        });
    }, "set")
};
var chai_MemoizeMap = "function" == typeof WeakMap ? WeakMap : chai_FakeMap;
function chai_memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
    if (!memoizeMap || chai_isPrimitive(leftHandOperand) || chai_isPrimitive(rightHandOperand)) return null;
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
        var result = leftHandMap.get(rightHandOperand);
        if ("boolean" == typeof result) return result;
    }
    return null;
}
chai_name(chai_memoizeCompare, "memoizeCompare");
function chai_memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
    if (!memoizeMap || chai_isPrimitive(leftHandOperand) || chai_isPrimitive(rightHandOperand)) return;
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) leftHandMap.set(rightHandOperand, result);
    else {
        leftHandMap = new chai_MemoizeMap();
        leftHandMap.set(rightHandOperand, result);
        memoizeMap.set(leftHandOperand, leftHandMap);
    }
}
chai_name(chai_memoizeSet, "memoizeSet");
var chai_deep_eql_default = chai_deepEqual;
function chai_deepEqual(leftHandOperand, rightHandOperand, options) {
    if (options && options.comparator) return chai_extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    var simpleResult = chai_simpleEqual(leftHandOperand, rightHandOperand);
    if (null !== simpleResult) return simpleResult;
    return chai_extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
chai_name(chai_deepEqual, "deepEqual");
function chai_simpleEqual(leftHandOperand, rightHandOperand) {
    if (leftHandOperand === rightHandOperand) return 0 !== leftHandOperand || 1 / leftHandOperand === 1 / rightHandOperand;
    if (leftHandOperand !== leftHandOperand && rightHandOperand !== rightHandOperand) return true;
    if (chai_isPrimitive(leftHandOperand) || chai_isPrimitive(rightHandOperand)) return false;
    return null;
}
chai_name(chai_simpleEqual, "simpleEqual");
function chai_extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
    options = options || {};
    options.memoize = false === options.memoize ? false : options.memoize || new chai_MemoizeMap();
    var comparator = options && options.comparator;
    var memoizeResultLeft = chai_memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
    if (null !== memoizeResultLeft) return memoizeResultLeft;
    var memoizeResultRight = chai_memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
    if (null !== memoizeResultRight) return memoizeResultRight;
    if (comparator) {
        var comparatorResult = comparator(leftHandOperand, rightHandOperand);
        if (false === comparatorResult || true === comparatorResult) {
            chai_memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
            return comparatorResult;
        }
        var simpleResult = chai_simpleEqual(leftHandOperand, rightHandOperand);
        if (null !== simpleResult) return simpleResult;
    }
    var leftHandType = chai_type2(leftHandOperand);
    if (leftHandType !== chai_type2(rightHandOperand)) {
        chai_memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
        return false;
    }
    chai_memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
    var result = chai_extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
    chai_memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
    return result;
}
chai_name(chai_extensiveDeepEqual, "extensiveDeepEqual");
function chai_extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
    switch(leftHandType){
        case "String":
        case "Number":
        case "Boolean":
        case "Date":
            return chai_deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
        case "Promise":
        case "Symbol":
        case "function":
        case "WeakMap":
        case "WeakSet":
            return leftHandOperand === rightHandOperand;
        case "Error":
            return chai_keysEqual(leftHandOperand, rightHandOperand, [
                "name",
                "message",
                "code"
            ], options);
        case "Arguments":
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "Array":
            return chai_iterableEqual(leftHandOperand, rightHandOperand, options);
        case "RegExp":
            return chai_regexpEqual(leftHandOperand, rightHandOperand);
        case "Generator":
            return chai_generatorEqual(leftHandOperand, rightHandOperand, options);
        case "DataView":
            return chai_iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
        case "ArrayBuffer":
            return chai_iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
        case "Set":
            return chai_entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Map":
            return chai_entriesEqual(leftHandOperand, rightHandOperand, options);
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.Instant":
        case "Temporal.ZonedDateTime":
        case "Temporal.PlainYearMonth":
        case "Temporal.PlainMonthDay":
            return leftHandOperand.equals(rightHandOperand);
        case "Temporal.Duration":
            return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
        case "Temporal.TimeZone":
        case "Temporal.Calendar":
            return leftHandOperand.toString() === rightHandOperand.toString();
        default:
            return chai_objectEqual(leftHandOperand, rightHandOperand, options);
    }
}
chai_name(chai_extensiveDeepEqualByType, "extensiveDeepEqualByType");
function chai_regexpEqual(leftHandOperand, rightHandOperand) {
    return leftHandOperand.toString() === rightHandOperand.toString();
}
chai_name(chai_regexpEqual, "regexpEqual");
function chai_entriesEqual(leftHandOperand, rightHandOperand, options) {
    try {
        if (leftHandOperand.size !== rightHandOperand.size) return false;
        if (0 === leftHandOperand.size) return true;
    } catch (sizeError) {
        return false;
    }
    var leftHandItems = [];
    var rightHandItems = [];
    leftHandOperand.forEach(/* @__PURE__ */ chai_name(function gatherEntries(key, value) {
        leftHandItems.push([
            key,
            value
        ]);
    }, "gatherEntries"));
    rightHandOperand.forEach(/* @__PURE__ */ chai_name(function gatherEntries(key, value) {
        rightHandItems.push([
            key,
            value
        ]);
    }, "gatherEntries"));
    return chai_iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}
chai_name(chai_entriesEqual, "entriesEqual");
function chai_iterableEqual(leftHandOperand, rightHandOperand, options) {
    var length = leftHandOperand.length;
    if (length !== rightHandOperand.length) return false;
    if (0 === length) return true;
    var index = -1;
    while(++index < length)if (false === chai_deepEqual(leftHandOperand[index], rightHandOperand[index], options)) return false;
    return true;
}
chai_name(chai_iterableEqual, "iterableEqual");
function chai_generatorEqual(leftHandOperand, rightHandOperand, options) {
    return chai_iterableEqual(chai_getGeneratorEntries(leftHandOperand), chai_getGeneratorEntries(rightHandOperand), options);
}
chai_name(chai_generatorEqual, "generatorEqual");
function chai_hasIteratorFunction(target) {
    return "u" > typeof Symbol && "object" == typeof target && void 0 !== Symbol.iterator && "function" == typeof target[Symbol.iterator];
}
chai_name(chai_hasIteratorFunction, "hasIteratorFunction");
function chai_getIteratorEntries(target) {
    if (chai_hasIteratorFunction(target)) try {
        return chai_getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {}
    return [];
}
chai_name(chai_getIteratorEntries, "getIteratorEntries");
function chai_getGeneratorEntries(generator) {
    var generatorResult = generator.next();
    var accumulator = [
        generatorResult.value
    ];
    while(false === generatorResult.done){
        generatorResult = generator.next();
        accumulator.push(generatorResult.value);
    }
    return accumulator;
}
chai_name(chai_getGeneratorEntries, "getGeneratorEntries");
function chai_getEnumerableKeys(target) {
    var keys = [];
    for(var key in target)keys.push(key);
    return keys;
}
chai_name(chai_getEnumerableKeys, "getEnumerableKeys");
function chai_getEnumerableSymbols(target) {
    var keys = [];
    var allKeys = Object.getOwnPropertySymbols(target);
    for(var i = 0; i < allKeys.length; i += 1){
        var key = allKeys[i];
        if (Object.getOwnPropertyDescriptor(target, key).enumerable) keys.push(key);
    }
    return keys;
}
chai_name(chai_getEnumerableSymbols, "getEnumerableSymbols");
function chai_keysEqual(leftHandOperand, rightHandOperand, keys, options) {
    var length = keys.length;
    if (0 === length) return true;
    for(var i = 0; i < length; i += 1)if (false === chai_deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options)) return false;
    return true;
}
chai_name(chai_keysEqual, "keysEqual");
function chai_objectEqual(leftHandOperand, rightHandOperand, options) {
    var leftHandKeys = chai_getEnumerableKeys(leftHandOperand);
    var rightHandKeys = chai_getEnumerableKeys(rightHandOperand);
    var leftHandSymbols = chai_getEnumerableSymbols(leftHandOperand);
    var rightHandSymbols = chai_getEnumerableSymbols(rightHandOperand);
    leftHandKeys = leftHandKeys.concat(leftHandSymbols);
    rightHandKeys = rightHandKeys.concat(rightHandSymbols);
    if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
        if (false === chai_iterableEqual(chai_mapSymbols(leftHandKeys).sort(), chai_mapSymbols(rightHandKeys).sort())) return false;
        return chai_keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
    }
    var leftHandEntries = chai_getIteratorEntries(leftHandOperand);
    var rightHandEntries = chai_getIteratorEntries(rightHandOperand);
    if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
        leftHandEntries.sort();
        rightHandEntries.sort();
        return chai_iterableEqual(leftHandEntries, rightHandEntries, options);
    }
    if (0 === leftHandKeys.length && 0 === leftHandEntries.length && 0 === rightHandKeys.length && 0 === rightHandEntries.length) return true;
    return false;
}
chai_name(chai_objectEqual, "objectEqual");
function chai_isPrimitive(value) {
    return null === value || "object" != typeof value;
}
chai_name(chai_isPrimitive, "isPrimitive");
function chai_mapSymbols(arr) {
    return arr.map(/* @__PURE__ */ chai_name(function mapSymbol(entry) {
        if ("symbol" == typeof entry) return entry.toString();
        return entry;
    }, "mapSymbol"));
}
chai_name(chai_mapSymbols, "mapSymbols");
function chai_hasProperty(obj, name) {
    if (null == obj) return false;
    return name in Object(obj);
}
chai_name(chai_hasProperty, "hasProperty");
function chai_parsePath(path) {
    const str = path.replace(/([^\\])\[/g, "$1.[");
    const parts = str.match(/(\\\.|[^.]+?)+/g);
    return parts.map((value)=>{
        if ("constructor" === value || "__proto__" === value || "prototype" === value) return {};
        const regexp = /^\[(\d+)\]$/;
        const mArr = regexp.exec(value);
        let parsed = null;
        parsed = mArr ? {
            i: parseFloat(mArr[1])
        } : {
            p: value.replace(/\\([.[\]])/g, "$1")
        };
        return parsed;
    });
}
chai_name(chai_parsePath, "parsePath");
function chai_internalGetPathValue(obj, parsed, pathDepth) {
    let temporaryValue = obj;
    let res = null;
    pathDepth = void 0 === pathDepth ? parsed.length : pathDepth;
    for(let i = 0; i < pathDepth; i++){
        const part = parsed[i];
        if (temporaryValue) {
            temporaryValue = void 0 === part.p ? temporaryValue[part.i] : temporaryValue[part.p];
            if (i === pathDepth - 1) res = temporaryValue;
        }
    }
    return res;
}
chai_name(chai_internalGetPathValue, "internalGetPathValue");
function chai_getPathInfo(obj, path) {
    const parsed = chai_parsePath(path);
    const last = parsed[parsed.length - 1];
    const info = {
        parent: parsed.length > 1 ? chai_internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
        name: last.p || last.i,
        value: chai_internalGetPathValue(obj, parsed)
    };
    info.exists = chai_hasProperty(info.parent, info.name);
    return info;
}
chai_name(chai_getPathInfo, "getPathInfo");
var chai_Assertion = class _Assertion {
    constructor(obj, msg, ssfi, lockSsfi){
        __publicField(this, "__flags", {});
        chai_flag(this, "ssfi", ssfi || _Assertion);
        chai_flag(this, "lockSsfi", lockSsfi);
        chai_flag(this, "object", obj);
        chai_flag(this, "message", msg);
        chai_flag(this, "eql", node_modules_chai_config.deepEqual || chai_deep_eql_default);
        return chai_proxify(this);
    }
    static get includeStack() {
        console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
        return node_modules_chai_config.includeStack;
    }
    static set includeStack(value) {
        console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead.");
        node_modules_chai_config.includeStack = value;
    }
    static get showDiff() {
        console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
        return node_modules_chai_config.showDiff;
    }
    static set showDiff(value) {
        console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead.");
        node_modules_chai_config.showDiff = value;
    }
    static addProperty(name, fn) {
        chai_addProperty(this.prototype, name, fn);
    }
    static addMethod(name, fn) {
        node_modules_chai_addMethod(this.prototype, name, fn);
    }
    static addChainableMethod(name, fn, chainingBehavior) {
        chai_addChainableMethod(this.prototype, name, fn, chainingBehavior);
    }
    static overwriteProperty(name, fn) {
        chai_overwriteProperty(this.prototype, name, fn);
    }
    static overwriteMethod(name, fn) {
        chai_overwriteMethod(this.prototype, name, fn);
    }
    static overwriteChainableMethod(name, fn, chainingBehavior) {
        chai_overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
    }
    assert(_expr, msg, _negateMsg, expected, _actual, showDiff) {
        const ok = node_modules_chai_test(this, arguments);
        if (false !== showDiff) showDiff = true;
        if (void 0 === expected && void 0 === _actual) showDiff = false;
        if (true !== node_modules_chai_config.showDiff) showDiff = false;
        if (!ok) {
            msg = chai_getMessage2(this, arguments);
            const actual = chai_getActual(this, arguments);
            const assertionErrorObjectProperties = {
                actual,
                expected,
                showDiff
            };
            const operator = chai_getOperator(this, arguments);
            if (operator) assertionErrorObjectProperties.operator = operator;
            throw new chai_6_2_2_node_modules_chai_AssertionError(msg, assertionErrorObjectProperties, node_modules_chai_config.includeStack ? this.assert : chai_flag(this, "ssfi"));
        }
    }
    get _obj() {
        return chai_flag(this, "object");
    }
    set _obj(val) {
        chai_flag(this, "object", val);
    }
};
chai_name(chai_Assertion, "Assertion");
var node_modules_chai_Assertion = chai_Assertion;
var events = new EventTarget();
var chai_PluginEvent = class extends Event {
    constructor(type3, name, fn){
        super(type3);
        this.name = String(name);
        this.fn = fn;
    }
};
chai_name(chai_PluginEvent, "PluginEvent");
var PluginEvent = chai_PluginEvent;
function chai_isProxyEnabled() {
    return node_modules_chai_config.useProxy && "u" > typeof Proxy && "u" > typeof Reflect;
}
chai_name(chai_isProxyEnabled, "isProxyEnabled");
function chai_addProperty(ctx, name, getter) {
    getter = void 0 === getter ? function() {} : getter;
    Object.defineProperty(ctx, name, {
        get: /* @__PURE__ */ chai_name(function propertyGetter() {
            if (!chai_isProxyEnabled() && !chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", propertyGetter);
            let result = getter.call(this);
            if (void 0 !== result) return result;
            let newAssertion = new node_modules_chai_Assertion();
            chai_transferFlags(this, newAssertion);
            return newAssertion;
        }, "propertyGetter"),
        configurable: true
    });
    events.dispatchEvent(new PluginEvent("addProperty", name, getter));
}
chai_name(chai_addProperty, "addProperty");
var chai_fnLengthDesc = Object.getOwnPropertyDescriptor(function() {}, "length");
function chai_addLengthGuard(fn, assertionName, isChainable) {
    if (!chai_fnLengthDesc.configurable) return fn;
    Object.defineProperty(fn, "length", {
        get: /* @__PURE__ */ chai_name(function() {
            if (isChainable) throw Error("Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
            throw Error("Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".');
        }, "get")
    });
    return fn;
}
chai_name(chai_addLengthGuard, "addLengthGuard");
function chai_getProperties(object) {
    let result = Object.getOwnPropertyNames(object);
    function addProperty2(property) {
        if (-1 === result.indexOf(property)) result.push(property);
    }
    chai_name(addProperty2, "addProperty");
    let proto = Object.getPrototypeOf(object);
    while(null !== proto){
        Object.getOwnPropertyNames(proto).forEach(addProperty2);
        proto = Object.getPrototypeOf(proto);
    }
    return result;
}
chai_name(chai_getProperties, "getProperties");
var chai_builtins = [
    "__flags",
    "__methods",
    "_obj",
    "assert"
];
function chai_proxify(obj, nonChainableMethodName) {
    if (!chai_isProxyEnabled()) return obj;
    return new Proxy(obj, {
        get: /* @__PURE__ */ chai_name(function proxyGetter(target, property) {
            if ("string" == typeof property && -1 === node_modules_chai_config.proxyExcludedKeys.indexOf(property) && !Reflect.has(target, property)) {
                if (nonChainableMethodName) throw Error("Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".');
                let suggestion = null;
                let suggestionDistance = 4;
                chai_getProperties(target).forEach(function(prop) {
                    if (!Object.prototype.hasOwnProperty(prop) && -1 === chai_builtins.indexOf(prop)) {
                        let dist = chai_stringDistanceCapped(property, prop, suggestionDistance);
                        if (dist < suggestionDistance) {
                            suggestion = prop;
                            suggestionDistance = dist;
                        }
                    }
                });
                if (null !== suggestion) throw Error("Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?');
                throw Error("Invalid Chai property: " + property);
            }
            if (-1 === chai_builtins.indexOf(property) && !chai_flag(target, "lockSsfi")) chai_flag(target, "ssfi", proxyGetter);
            return Reflect.get(target, property);
        }, "proxyGetter")
    });
}
chai_name(chai_proxify, "proxify");
function chai_stringDistanceCapped(strA, strB, cap) {
    if (Math.abs(strA.length - strB.length) >= cap) return cap;
    let memo = [];
    for(let i = 0; i <= strA.length; i++){
        memo[i] = Array(strB.length + 1).fill(0);
        memo[i][0] = i;
    }
    for(let j = 0; j < strB.length; j++)memo[0][j] = j;
    for(let i = 1; i <= strA.length; i++){
        let ch = strA.charCodeAt(i - 1);
        for(let j = 1; j <= strB.length; j++){
            if (Math.abs(i - j) >= cap) {
                memo[i][j] = cap;
                continue;
            }
            memo[i][j] = Math.min(memo[i - 1][j] + 1, memo[i][j - 1] + 1, memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1));
        }
    }
    return memo[strA.length][strB.length];
}
chai_name(chai_stringDistanceCapped, "stringDistanceCapped");
function node_modules_chai_addMethod(ctx, name, method) {
    let methodWrapper = /* @__PURE__ */ chai_name(function() {
        if (!chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", methodWrapper);
        let result = method.apply(this, arguments);
        if (void 0 !== result) return result;
        let newAssertion = new node_modules_chai_Assertion();
        chai_transferFlags(this, newAssertion);
        return newAssertion;
    }, "methodWrapper");
    chai_addLengthGuard(methodWrapper, name, false);
    ctx[name] = chai_proxify(methodWrapper, name);
    events.dispatchEvent(new PluginEvent("addMethod", name, method));
}
chai_name(node_modules_chai_addMethod, "addMethod");
function chai_overwriteProperty(ctx, name, getter) {
    let _get = Object.getOwnPropertyDescriptor(ctx, name), _super = /* @__PURE__ */ chai_name(function() {}, "_super");
    if (_get && "function" == typeof _get.get) _super = _get.get;
    Object.defineProperty(ctx, name, {
        get: /* @__PURE__ */ chai_name(function overwritingPropertyGetter() {
            if (!chai_isProxyEnabled() && !chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", overwritingPropertyGetter);
            let origLockSsfi = chai_flag(this, "lockSsfi");
            chai_flag(this, "lockSsfi", true);
            let result = getter(_super).call(this);
            chai_flag(this, "lockSsfi", origLockSsfi);
            if (void 0 !== result) return result;
            let newAssertion = new node_modules_chai_Assertion();
            chai_transferFlags(this, newAssertion);
            return newAssertion;
        }, "overwritingPropertyGetter"),
        configurable: true
    });
}
chai_name(chai_overwriteProperty, "overwriteProperty");
function chai_overwriteMethod(ctx, name, method) {
    let _method = ctx[name], _super = /* @__PURE__ */ chai_name(function() {
        throw new Error(name + " is not a function");
    }, "_super");
    if (_method && "function" == typeof _method) _super = _method;
    let overwritingMethodWrapper = /* @__PURE__ */ chai_name(function() {
        if (!chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", overwritingMethodWrapper);
        let origLockSsfi = chai_flag(this, "lockSsfi");
        chai_flag(this, "lockSsfi", true);
        let result = method(_super).apply(this, arguments);
        chai_flag(this, "lockSsfi", origLockSsfi);
        if (void 0 !== result) return result;
        let newAssertion = new node_modules_chai_Assertion();
        chai_transferFlags(this, newAssertion);
        return newAssertion;
    }, "overwritingMethodWrapper");
    chai_addLengthGuard(overwritingMethodWrapper, name, false);
    ctx[name] = chai_proxify(overwritingMethodWrapper, name);
}
chai_name(chai_overwriteMethod, "overwriteMethod");
var chai_canSetPrototype = "function" == typeof Object.setPrototypeOf;
var node_modules_chai_testFn = /* @__PURE__ */ chai_name(function() {}, "testFn");
var chai_excludeNames = Object.getOwnPropertyNames(node_modules_chai_testFn).filter(function(name) {
    let propDesc = Object.getOwnPropertyDescriptor(node_modules_chai_testFn, name);
    if ("object" != typeof propDesc) return true;
    return !propDesc.configurable;
});
var chai_call = Function.prototype.call;
var chai_apply = Function.prototype.apply;
var chai_PluginAddChainableMethodEvent = class extends PluginEvent {
    constructor(type3, name, fn, chainingBehavior){
        super(type3, name, fn);
        this.chainingBehavior = chainingBehavior;
    }
};
chai_name(chai_PluginAddChainableMethodEvent, "PluginAddChainableMethodEvent");
var PluginAddChainableMethodEvent = chai_PluginAddChainableMethodEvent;
function chai_addChainableMethod(ctx, name, method, chainingBehavior) {
    if ("function" != typeof chainingBehavior) chainingBehavior = /* @__PURE__ */ chai_name(function() {}, "chainingBehavior");
    let chainableBehavior = {
        method,
        chainingBehavior
    };
    if (!ctx.__methods) ctx.__methods = {};
    ctx.__methods[name] = chainableBehavior;
    Object.defineProperty(ctx, name, {
        get: /* @__PURE__ */ chai_name(function chainableMethodGetter() {
            chainableBehavior.chainingBehavior.call(this);
            let chainableMethodWrapper = /* @__PURE__ */ chai_name(function() {
                if (!chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", chainableMethodWrapper);
                let result = chainableBehavior.method.apply(this, arguments);
                if (void 0 !== result) return result;
                let newAssertion = new node_modules_chai_Assertion();
                chai_transferFlags(this, newAssertion);
                return newAssertion;
            }, "chainableMethodWrapper");
            chai_addLengthGuard(chainableMethodWrapper, name, true);
            if (chai_canSetPrototype) {
                let prototype = Object.create(this);
                prototype.call = chai_call;
                prototype.apply = chai_apply;
                Object.setPrototypeOf(chainableMethodWrapper, prototype);
            } else {
                let asserterNames = Object.getOwnPropertyNames(ctx);
                asserterNames.forEach(function(asserterName) {
                    if (-1 !== chai_excludeNames.indexOf(asserterName)) return;
                    let pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                    Object.defineProperty(chainableMethodWrapper, asserterName, pd);
                });
            }
            chai_transferFlags(this, chainableMethodWrapper);
            return chai_proxify(chainableMethodWrapper);
        }, "chainableMethodGetter"),
        configurable: true
    });
    events.dispatchEvent(new PluginAddChainableMethodEvent("addChainableMethod", name, method, chainingBehavior));
}
chai_name(chai_addChainableMethod, "addChainableMethod");
function chai_overwriteChainableMethod(ctx, name, method, chainingBehavior) {
    let chainableBehavior = ctx.__methods[name];
    let _chainingBehavior = chainableBehavior.chainingBehavior;
    chainableBehavior.chainingBehavior = /* @__PURE__ */ chai_name(function overwritingChainableMethodGetter() {
        let result = chainingBehavior(_chainingBehavior).call(this);
        if (void 0 !== result) return result;
        let newAssertion = new node_modules_chai_Assertion();
        chai_transferFlags(this, newAssertion);
        return newAssertion;
    }, "overwritingChainableMethodGetter");
    let _method = chainableBehavior.method;
    chainableBehavior.method = /* @__PURE__ */ chai_name(function overwritingChainableMethodWrapper() {
        let result = method(_method).apply(this, arguments);
        if (void 0 !== result) return result;
        let newAssertion = new node_modules_chai_Assertion();
        chai_transferFlags(this, newAssertion);
        return newAssertion;
    }, "overwritingChainableMethodWrapper");
}
chai_name(chai_overwriteChainableMethod, "overwriteChainableMethod");
function chai_compareByInspect(a, b) {
    return chai_inspect2(a) < chai_inspect2(b) ? -1 : 1;
}
chai_name(chai_compareByInspect, "compareByInspect");
function chai_getOwnEnumerablePropertySymbols(obj) {
    if ("function" != typeof Object.getOwnPropertySymbols) return [];
    return Object.getOwnPropertySymbols(obj).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
    });
}
chai_name(chai_getOwnEnumerablePropertySymbols, "getOwnEnumerablePropertySymbols");
function chai_getOwnEnumerableProperties(obj) {
    return Object.keys(obj).concat(chai_getOwnEnumerablePropertySymbols(obj));
}
chai_name(chai_getOwnEnumerableProperties, "getOwnEnumerableProperties");
var chai_isNaN2 = Number.isNaN;
function chai_isObjectType(obj) {
    let objectType = node_modules_chai_type(obj);
    let objectTypes = [
        "Array",
        "Object",
        "Function"
    ];
    return -1 !== objectTypes.indexOf(objectType);
}
chai_name(chai_isObjectType, "isObjectType");
function chai_getOperator(obj, args) {
    let operator = chai_flag(obj, "operator");
    let negate = chai_flag(obj, "negate");
    let expected = args[3];
    let msg = negate ? args[2] : args[1];
    if (operator) return operator;
    if ("function" == typeof msg) msg = msg();
    msg = msg || "";
    if (!msg) return;
    if (/\shave\s/.test(msg)) return;
    let isObject = chai_isObjectType(expected);
    if (/\snot\s/.test(msg)) return isObject ? "notDeepStrictEqual" : "notStrictEqual";
    return isObject ? "deepStrictEqual" : "strictEqual";
}
chai_name(chai_getOperator, "getOperator");
function chai_getName(fn) {
    return fn.name;
}
chai_name(chai_getName, "getName");
function chai_isRegExp2(obj) {
    return "[object RegExp]" === Object.prototype.toString.call(obj);
}
chai_name(chai_isRegExp2, "isRegExp");
function chai_isNumeric(obj) {
    return [
        "Number",
        "BigInt"
    ].includes(node_modules_chai_type(obj));
}
chai_name(chai_isNumeric, "isNumeric");
var { flag: chai_flag2 } = chai_utils_exports;
[
    "to",
    "be",
    "been",
    "is",
    "and",
    "has",
    "have",
    "with",
    "that",
    "which",
    "at",
    "of",
    "same",
    "but",
    "does",
    "still",
    "also"
].forEach(function(chain) {
    node_modules_chai_Assertion.addProperty(chain);
});
node_modules_chai_Assertion.addProperty("not", function() {
    chai_flag2(this, "negate", true);
});
node_modules_chai_Assertion.addProperty("deep", function() {
    chai_flag2(this, "deep", true);
});
node_modules_chai_Assertion.addProperty("nested", function() {
    chai_flag2(this, "nested", true);
});
node_modules_chai_Assertion.addProperty("own", function() {
    chai_flag2(this, "own", true);
});
node_modules_chai_Assertion.addProperty("ordered", function() {
    chai_flag2(this, "ordered", true);
});
node_modules_chai_Assertion.addProperty("any", function() {
    chai_flag2(this, "any", true);
    chai_flag2(this, "all", false);
});
node_modules_chai_Assertion.addProperty("all", function() {
    chai_flag2(this, "all", true);
    chai_flag2(this, "any", false);
});
var chai_functionTypes = {
    function: [
        "function",
        "asyncfunction",
        "generatorfunction",
        "asyncgeneratorfunction"
    ],
    asyncfunction: [
        "asyncfunction",
        "asyncgeneratorfunction"
    ],
    generatorfunction: [
        "generatorfunction",
        "asyncgeneratorfunction"
    ],
    asyncgeneratorfunction: [
        "asyncgeneratorfunction"
    ]
};
function chai_an(type3, msg) {
    if (msg) chai_flag2(this, "message", msg);
    type3 = type3.toLowerCase();
    let obj = chai_flag2(this, "object"), article = ~[
        "a",
        "e",
        "i",
        "o",
        "u"
    ].indexOf(type3.charAt(0)) ? "an " : "a ";
    const detectedType = node_modules_chai_type(obj).toLowerCase();
    if (chai_functionTypes["function"].includes(type3)) this.assert(chai_functionTypes[type3].includes(detectedType), "expected #{this} to be " + article + type3, "expected #{this} not to be " + article + type3);
    else this.assert(type3 === detectedType, "expected #{this} to be " + article + type3, "expected #{this} not to be " + article + type3);
}
chai_name(chai_an, "an");
node_modules_chai_Assertion.addChainableMethod("an", chai_an);
node_modules_chai_Assertion.addChainableMethod("a", chai_an);
function chai_SameValueZero(a, b) {
    return chai_isNaN2(a) && chai_isNaN2(b) || a === b;
}
chai_name(chai_SameValueZero, "SameValueZero");
function chai_includeChainingBehavior() {
    chai_flag2(this, "contains", true);
}
chai_name(chai_includeChainingBehavior, "includeChainingBehavior");
function chai_include(val, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), objType = node_modules_chai_type(obj).toLowerCase(), flagMsg = chai_flag2(this, "message"), negate = chai_flag2(this, "negate"), ssfi = chai_flag2(this, "ssfi"), isDeep = chai_flag2(this, "deep"), descriptor = isDeep ? "deep " : "", isEql = isDeep ? chai_flag2(this, "eql") : chai_SameValueZero;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    let included = false;
    switch(objType){
        case "string":
            included = -1 !== obj.indexOf(val);
            break;
        case "weakset":
            if (isDeep) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "unable to use .deep.include with WeakSet", void 0, ssfi);
            included = obj.has(val);
            break;
        case "map":
            obj.forEach(function(item) {
                included = included || isEql(item, val);
            });
            break;
        case "set":
            if (isDeep) obj.forEach(function(item) {
                included = included || isEql(item, val);
            });
            else included = obj.has(val);
            break;
        case "array":
            included = isDeep ? obj.some(function(item) {
                return isEql(item, val);
            }) : -1 !== obj.indexOf(val);
            break;
        default:
            {
                if (val !== Object(val)) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "the given combination of arguments (" + objType + " and " + node_modules_chai_type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + node_modules_chai_type(val).toLowerCase(), void 0, ssfi);
                let props = Object.keys(val);
                let firstErr = null;
                let numErrs = 0;
                props.forEach(function(prop) {
                    let propAssertion = new node_modules_chai_Assertion(obj);
                    chai_transferFlags(this, propAssertion, true);
                    chai_flag2(propAssertion, "lockSsfi", true);
                    if (!negate || 1 === props.length) return void propAssertion.property(prop, val[prop]);
                    try {
                        propAssertion.property(prop, val[prop]);
                    } catch (err) {
                        if (!chai_check_error_exports.compatibleConstructor(err, chai_6_2_2_node_modules_chai_AssertionError)) throw err;
                        if (null === firstErr) firstErr = err;
                        numErrs++;
                    }
                }, this);
                if (negate && props.length > 1 && numErrs === props.length) throw firstErr;
                return;
            }
    }
    this.assert(included, "expected #{this} to " + descriptor + "include " + chai_inspect2(val), "expected #{this} to not " + descriptor + "include " + chai_inspect2(val));
}
chai_name(chai_include, "include");
node_modules_chai_Assertion.addChainableMethod("include", chai_include, chai_includeChainingBehavior);
node_modules_chai_Assertion.addChainableMethod("contain", chai_include, chai_includeChainingBehavior);
node_modules_chai_Assertion.addChainableMethod("contains", chai_include, chai_includeChainingBehavior);
node_modules_chai_Assertion.addChainableMethod("includes", chai_include, chai_includeChainingBehavior);
node_modules_chai_Assertion.addProperty("ok", function() {
    this.assert(chai_flag2(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy");
});
node_modules_chai_Assertion.addProperty("true", function() {
    this.assert(true === chai_flag2(this, "object"), "expected #{this} to be true", "expected #{this} to be false", !chai_flag2(this, "negate"));
});
node_modules_chai_Assertion.addProperty("numeric", function() {
    const object = chai_flag2(this, "object");
    this.assert([
        "Number",
        "BigInt"
    ].includes(node_modules_chai_type(object)), "expected #{this} to be numeric", "expected #{this} to not be numeric", !chai_flag2(this, "negate"));
});
node_modules_chai_Assertion.addProperty("callable", function() {
    const val = chai_flag2(this, "object");
    const ssfi = chai_flag2(this, "ssfi");
    const message = chai_flag2(this, "message");
    const msg = message ? `${message}: ` : "";
    const negate = chai_flag2(this, "negate");
    const assertionMessage = negate ? `${msg}expected ${chai_inspect2(val)} not to be a callable function` : `${msg}expected ${chai_inspect2(val)} to be a callable function`;
    const isCallable = [
        "Function",
        "AsyncFunction",
        "GeneratorFunction",
        "AsyncGeneratorFunction"
    ].includes(node_modules_chai_type(val));
    if (isCallable && negate || !isCallable && !negate) throw new chai_6_2_2_node_modules_chai_AssertionError(assertionMessage, void 0, ssfi);
});
node_modules_chai_Assertion.addProperty("false", function() {
    this.assert(false === chai_flag2(this, "object"), "expected #{this} to be false", "expected #{this} to be true", !!chai_flag2(this, "negate"));
});
node_modules_chai_Assertion.addProperty("null", function() {
    this.assert(null === chai_flag2(this, "object"), "expected #{this} to be null", "expected #{this} not to be null");
});
node_modules_chai_Assertion.addProperty("undefined", function() {
    this.assert(void 0 === chai_flag2(this, "object"), "expected #{this} to be undefined", "expected #{this} not to be undefined");
});
node_modules_chai_Assertion.addProperty("NaN", function() {
    this.assert(chai_isNaN2(chai_flag2(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN");
});
function chai_assertExist() {
    let val = chai_flag2(this, "object");
    this.assert(null != val, "expected #{this} to exist", "expected #{this} to not exist");
}
chai_name(chai_assertExist, "assertExist");
node_modules_chai_Assertion.addProperty("exist", chai_assertExist);
node_modules_chai_Assertion.addProperty("exists", chai_assertExist);
node_modules_chai_Assertion.addProperty("empty", function() {
    let val = chai_flag2(this, "object"), ssfi = chai_flag2(this, "ssfi"), flagMsg = chai_flag2(this, "message"), itemsCount;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    switch(node_modules_chai_type(val).toLowerCase()){
        case "array":
        case "string":
            itemsCount = val.length;
            break;
        case "map":
        case "set":
            itemsCount = val.size;
            break;
        case "weakmap":
        case "weakset":
            throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + ".empty was passed a weak collection", void 0, ssfi);
        case "function":
            {
                const msg = flagMsg + ".empty was passed a function " + chai_getName(val);
                throw new chai_6_2_2_node_modules_chai_AssertionError(msg.trim(), void 0, ssfi);
            }
        default:
            if (val !== Object(val)) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + ".empty was passed non-string primitive " + chai_inspect2(val), void 0, ssfi);
            itemsCount = Object.keys(val).length;
    }
    this.assert(0 === itemsCount, "expected #{this} to be empty", "expected #{this} not to be empty");
});
function chai_checkArguments() {
    let obj = chai_flag2(this, "object"), type3 = node_modules_chai_type(obj);
    this.assert("Arguments" === type3, "expected #{this} to be arguments but got " + type3, "expected #{this} to not be arguments");
}
chai_name(chai_checkArguments, "checkArguments");
node_modules_chai_Assertion.addProperty("arguments", chai_checkArguments);
node_modules_chai_Assertion.addProperty("Arguments", chai_checkArguments);
function chai_assertEqual(val, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object");
    if (chai_flag2(this, "deep")) {
        let prevLockSsfi = chai_flag2(this, "lockSsfi");
        chai_flag2(this, "lockSsfi", true);
        this.eql(val);
        chai_flag2(this, "lockSsfi", prevLockSsfi);
    } else this.assert(val === obj, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", val, this._obj, true);
}
chai_name(chai_assertEqual, "assertEqual");
node_modules_chai_Assertion.addMethod("equal", chai_assertEqual);
node_modules_chai_Assertion.addMethod("equals", chai_assertEqual);
node_modules_chai_Assertion.addMethod("eq", chai_assertEqual);
function chai_assertEql(obj, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let eql = chai_flag2(this, "eql");
    this.assert(eql(obj, chai_flag2(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", obj, this._obj, true);
}
chai_name(chai_assertEql, "assertEql");
node_modules_chai_Assertion.addMethod("eql", chai_assertEql);
node_modules_chai_Assertion.addMethod("eqls", chai_assertEql);
function chai_assertAbove(n, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), doLength = chai_flag2(this, "doLength"), flagMsg = chai_flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = chai_flag2(this, "ssfi"), objType = node_modules_chai_type(obj).toLowerCase(), nType = node_modules_chai_type(n).toLowerCase();
    if (doLength && "map" !== objType && "set" !== objType) new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) {
        if (!chai_isNumeric(n) && (doLength || chai_isNumeric(obj))) throw new chai_6_2_2_node_modules_chai_AssertionError(msgPrefix + "the argument to above must be a number", void 0, ssfi);
        else if (!doLength && "date" !== objType && !chai_isNumeric(obj)) {
            let printObj = "string" === objType ? "'" + obj + "'" : obj;
            throw new chai_6_2_2_node_modules_chai_AssertionError(msgPrefix + "expected " + printObj + " to be a number or a date", void 0, ssfi);
        }
    } else throw new chai_6_2_2_node_modules_chai_AssertionError(msgPrefix + "the argument to above must be a date", void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount > n, "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " above #{exp}", n, itemsCount);
    } else this.assert(obj > n, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", n);
}
chai_name(chai_assertAbove, "assertAbove");
node_modules_chai_Assertion.addMethod("above", chai_assertAbove);
node_modules_chai_Assertion.addMethod("gt", chai_assertAbove);
node_modules_chai_Assertion.addMethod("greaterThan", chai_assertAbove);
function chai_assertLeast(n, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), doLength = chai_flag2(this, "doLength"), flagMsg = chai_flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = chai_flag2(this, "ssfi"), objType = node_modules_chai_type(obj).toLowerCase(), nType = node_modules_chai_type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && "map" !== objType && "set" !== objType) new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) if (!chai_isNumeric(n) && (doLength || chai_isNumeric(obj))) errorMessage = msgPrefix + "the argument to least must be a number";
    else if (doLength || "date" === objType || chai_isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the argument to least must be a date";
    if (shouldThrow) throw new chai_6_2_2_node_modules_chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount >= n, "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " below #{exp}", n, itemsCount);
    } else this.assert(obj >= n, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", n);
}
chai_name(chai_assertLeast, "assertLeast");
node_modules_chai_Assertion.addMethod("least", chai_assertLeast);
node_modules_chai_Assertion.addMethod("gte", chai_assertLeast);
node_modules_chai_Assertion.addMethod("greaterThanOrEqual", chai_assertLeast);
function chai_assertBelow(n, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), doLength = chai_flag2(this, "doLength"), flagMsg = chai_flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = chai_flag2(this, "ssfi"), objType = node_modules_chai_type(obj).toLowerCase(), nType = node_modules_chai_type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && "map" !== objType && "set" !== objType) new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) if (!chai_isNumeric(n) && (doLength || chai_isNumeric(obj))) errorMessage = msgPrefix + "the argument to below must be a number";
    else if (doLength || "date" === objType || chai_isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the argument to below must be a date";
    if (shouldThrow) throw new chai_6_2_2_node_modules_chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount < n, "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " below #{exp}", n, itemsCount);
    } else this.assert(obj < n, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", n);
}
chai_name(chai_assertBelow, "assertBelow");
node_modules_chai_Assertion.addMethod("below", chai_assertBelow);
node_modules_chai_Assertion.addMethod("lt", chai_assertBelow);
node_modules_chai_Assertion.addMethod("lessThan", chai_assertBelow);
function chai_assertMost(n, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), doLength = chai_flag2(this, "doLength"), flagMsg = chai_flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = chai_flag2(this, "ssfi"), objType = node_modules_chai_type(obj).toLowerCase(), nType = node_modules_chai_type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && "map" !== objType && "set" !== objType) new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === nType) if (!chai_isNumeric(n) && (doLength || chai_isNumeric(obj))) errorMessage = msgPrefix + "the argument to most must be a number";
    else if (doLength || "date" === objType || chai_isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the argument to most must be a date";
    if (shouldThrow) throw new chai_6_2_2_node_modules_chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount <= n, "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}", "expected #{this} to have a " + descriptor + " above #{exp}", n, itemsCount);
    } else this.assert(obj <= n, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", n);
}
chai_name(chai_assertMost, "assertMost");
node_modules_chai_Assertion.addMethod("most", chai_assertMost);
node_modules_chai_Assertion.addMethod("lte", chai_assertMost);
node_modules_chai_Assertion.addMethod("lessThanOrEqual", chai_assertMost);
node_modules_chai_Assertion.addMethod("within", function(start, finish, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), doLength = chai_flag2(this, "doLength"), flagMsg = chai_flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = chai_flag2(this, "ssfi"), objType = node_modules_chai_type(obj).toLowerCase(), startType = node_modules_chai_type(start).toLowerCase(), finishType = node_modules_chai_type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = "date" === startType && "date" === finishType ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
    if (doLength && "map" !== objType && "set" !== objType) new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    if (doLength || "date" !== objType || "date" === startType && "date" === finishType) if ((!chai_isNumeric(start) || !chai_isNumeric(finish)) && (doLength || chai_isNumeric(obj))) errorMessage = msgPrefix + "the arguments to within must be numbers";
    else if (doLength || "date" === objType || chai_isNumeric(obj)) shouldThrow = false;
    else {
        let printObj = "string" === objType ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    }
    else errorMessage = msgPrefix + "the arguments to within must be dates";
    if (shouldThrow) throw new chai_6_2_2_node_modules_chai_AssertionError(errorMessage, void 0, ssfi);
    if (doLength) {
        let descriptor = "length", itemsCount;
        if ("map" === objType || "set" === objType) {
            descriptor = "size";
            itemsCount = obj.size;
        } else itemsCount = obj.length;
        this.assert(itemsCount >= start && itemsCount <= finish, "expected #{this} to have a " + descriptor + " within " + range, "expected #{this} to not have a " + descriptor + " within " + range);
    } else this.assert(obj >= start && obj <= finish, "expected #{this} to be within " + range, "expected #{this} to not be within " + range);
});
function chai_assertInstanceOf(constructor, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let target = chai_flag2(this, "object");
    let ssfi = chai_flag2(this, "ssfi");
    let flagMsg = chai_flag2(this, "message");
    let isInstanceOf;
    try {
        isInstanceOf = target instanceof constructor;
    } catch (err) {
        if (err instanceof TypeError) {
            flagMsg = flagMsg ? flagMsg + ": " : "";
            throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "The instanceof assertion needs a constructor but " + node_modules_chai_type(constructor) + " was given.", void 0, ssfi);
        }
        throw err;
    }
    let name = chai_getName(constructor);
    if (null == name) name = "an unnamed constructor";
    this.assert(isInstanceOf, "expected #{this} to be an instance of " + name, "expected #{this} to not be an instance of " + name);
}
chai_name(chai_assertInstanceOf, "assertInstanceOf");
node_modules_chai_Assertion.addMethod("instanceof", chai_assertInstanceOf);
node_modules_chai_Assertion.addMethod("instanceOf", chai_assertInstanceOf);
function chai_assertProperty(name, val, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let isNested = chai_flag2(this, "nested"), isOwn = chai_flag2(this, "own"), flagMsg = chai_flag2(this, "message"), obj = chai_flag2(this, "object"), ssfi = chai_flag2(this, "ssfi"), nameType = typeof name;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    if (isNested) {
        if ("string" !== nameType) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "the argument to property must be a string when using nested syntax", void 0, ssfi);
    } else if ("string" !== nameType && "number" !== nameType && "symbol" !== nameType) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "the argument to property must be a string, number, or symbol", void 0, ssfi);
    if (isNested && isOwn) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + 'The "nested" and "own" flags cannot be combined.', void 0, ssfi);
    if (null == obj) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "Target cannot be null or undefined.", void 0, ssfi);
    let isDeep = chai_flag2(this, "deep"), negate = chai_flag2(this, "negate"), pathInfo = isNested ? chai_getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name], isEql = isDeep ? chai_flag2(this, "eql") : (val1, val2)=>val1 === val2;
    let descriptor = "";
    if (isDeep) descriptor += "deep ";
    if (isOwn) descriptor += "own ";
    if (isNested) descriptor += "nested ";
    descriptor += "property ";
    let hasProperty2;
    hasProperty2 = isOwn ? Object.prototype.hasOwnProperty.call(obj, name) : isNested ? pathInfo.exists : chai_hasProperty(obj, name);
    if (!negate || 1 === arguments.length) this.assert(hasProperty2, "expected #{this} to have " + descriptor + chai_inspect2(name), "expected #{this} to not have " + descriptor + chai_inspect2(name));
    if (arguments.length > 1) this.assert(hasProperty2 && isEql(val, value), "expected #{this} to have " + descriptor + chai_inspect2(name) + " of #{exp}, but got #{act}", "expected #{this} to not have " + descriptor + chai_inspect2(name) + " of #{act}", val, value);
    chai_flag2(this, "object", value);
}
chai_name(chai_assertProperty, "assertProperty");
node_modules_chai_Assertion.addMethod("property", chai_assertProperty);
function chai_assertOwnProperty(_name, _value, _msg) {
    chai_flag2(this, "own", true);
    chai_assertProperty.apply(this, arguments);
}
chai_name(chai_assertOwnProperty, "assertOwnProperty");
node_modules_chai_Assertion.addMethod("ownProperty", chai_assertOwnProperty);
node_modules_chai_Assertion.addMethod("haveOwnProperty", chai_assertOwnProperty);
function chai_assertOwnPropertyDescriptor(name, descriptor, msg) {
    if ("string" == typeof descriptor) {
        msg = descriptor;
        descriptor = null;
    }
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object");
    let actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    let eql = chai_flag2(this, "eql");
    if (actualDescriptor && descriptor) this.assert(eql(descriptor, actualDescriptor), "expected the own property descriptor for " + chai_inspect2(name) + " on #{this} to match " + chai_inspect2(descriptor) + ", got " + chai_inspect2(actualDescriptor), "expected the own property descriptor for " + chai_inspect2(name) + " on #{this} to not match " + chai_inspect2(descriptor), descriptor, actualDescriptor, true);
    else this.assert(actualDescriptor, "expected #{this} to have an own property descriptor for " + chai_inspect2(name), "expected #{this} to not have an own property descriptor for " + chai_inspect2(name));
    chai_flag2(this, "object", actualDescriptor);
}
chai_name(chai_assertOwnPropertyDescriptor, "assertOwnPropertyDescriptor");
node_modules_chai_Assertion.addMethod("ownPropertyDescriptor", chai_assertOwnPropertyDescriptor);
node_modules_chai_Assertion.addMethod("haveOwnPropertyDescriptor", chai_assertOwnPropertyDescriptor);
function chai_assertLengthChain() {
    chai_flag2(this, "doLength", true);
}
chai_name(chai_assertLengthChain, "assertLengthChain");
function chai_assertLength(n, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), objType = node_modules_chai_type(obj).toLowerCase(), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi"), descriptor = "length", itemsCount;
    switch(objType){
        case "map":
        case "set":
            descriptor = "size";
            itemsCount = obj.size;
            break;
        default:
            new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
            itemsCount = obj.length;
    }
    this.assert(itemsCount == n, "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}", "expected #{this} to not have a " + descriptor + " of #{act}", n, itemsCount);
}
chai_name(chai_assertLength, "assertLength");
node_modules_chai_Assertion.addChainableMethod("length", chai_assertLength, chai_assertLengthChain);
node_modules_chai_Assertion.addChainableMethod("lengthOf", chai_assertLength, chai_assertLengthChain);
function chai_assertMatch(re, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object");
    this.assert(re.exec(obj), "expected #{this} to match " + re, "expected #{this} not to match " + re);
}
chai_name(chai_assertMatch, "assertMatch");
node_modules_chai_Assertion.addMethod("match", chai_assertMatch);
node_modules_chai_Assertion.addMethod("matches", chai_assertMatch);
node_modules_chai_Assertion.addMethod("string", function(str, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi");
    new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).is.a("string");
    this.assert(~obj.indexOf(str), "expected #{this} to contain " + chai_inspect2(str), "expected #{this} to not contain " + chai_inspect2(str));
});
function chai_assertKeys(keys) {
    let obj = chai_flag2(this, "object"), objType = node_modules_chai_type(obj), keysType = node_modules_chai_type(keys), ssfi = chai_flag2(this, "ssfi"), isDeep = chai_flag2(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = chai_flag2(this, "message");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    let mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
    if ("Map" === objType || "Set" === objType) {
        deepStr = isDeep ? "deeply " : "";
        actual = [];
        obj.forEach(function(val, key) {
            actual.push(key);
        });
        if ("Array" !== keysType) keys = Array.prototype.slice.call(arguments);
    } else {
        actual = chai_getOwnEnumerableProperties(obj);
        switch(keysType){
            case "Array":
                if (arguments.length > 1) throw new chai_6_2_2_node_modules_chai_AssertionError(mixedArgsMsg, void 0, ssfi);
                break;
            case "Object":
                if (arguments.length > 1) throw new chai_6_2_2_node_modules_chai_AssertionError(mixedArgsMsg, void 0, ssfi);
                keys = Object.keys(keys);
                break;
            default:
                keys = Array.prototype.slice.call(arguments);
        }
        keys = keys.map(function(val) {
            return "symbol" == typeof val ? val : String(val);
        });
    }
    if (!keys.length) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg + "keys required", void 0, ssfi);
    let len = keys.length, any = chai_flag2(this, "any"), all = chai_flag2(this, "all"), expected = keys, isEql = isDeep ? chai_flag2(this, "eql") : (val1, val2)=>val1 === val2;
    if (!any && !all) all = true;
    if (any) ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
            return isEql(expectedKey, actualKey);
        });
    });
    if (all) {
        ok = expected.every(function(expectedKey) {
            return actual.some(function(actualKey) {
                return isEql(expectedKey, actualKey);
            });
        });
        if (!chai_flag2(this, "contains")) ok = ok && keys.length == actual.length;
    }
    if (len > 1) {
        keys = keys.map(function(key) {
            return chai_inspect2(key);
        });
        let last = keys.pop();
        if (all) str = keys.join(", ") + ", and " + last;
        if (any) str = keys.join(", ") + ", or " + last;
    } else str = chai_inspect2(keys[0]);
    str = (len > 1 ? "keys " : "key ") + str;
    str = (chai_flag2(this, "contains") ? "contain " : "have ") + str;
    this.assert(ok, "expected #{this} to " + deepStr + str, "expected #{this} to not " + deepStr + str, expected.slice(0).sort(chai_compareByInspect), actual.sort(chai_compareByInspect), true);
}
chai_name(chai_assertKeys, "assertKeys");
node_modules_chai_Assertion.addMethod("keys", chai_assertKeys);
node_modules_chai_Assertion.addMethod("key", chai_assertKeys);
function chai_assertThrows(errorLike, errMsgMatcher, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), ssfi = chai_flag2(this, "ssfi"), flagMsg = chai_flag2(this, "message"), negate = chai_flag2(this, "negate") || false;
    new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).is.a("function");
    if (chai_isRegExp2(errorLike) || "string" == typeof errorLike) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }
    let caughtErr;
    let errorWasThrown = false;
    try {
        obj();
    } catch (err) {
        errorWasThrown = true;
        caughtErr = err;
    }
    let everyArgIsUndefined = void 0 === errorLike && void 0 === errMsgMatcher;
    let everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    let errorLikeFail = false;
    let errMsgMatcherFail = false;
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
        let errorLikeString = "an error";
        if (errorLike instanceof Error) errorLikeString = "#{exp}";
        else if (errorLike) errorLikeString = chai_check_error_exports.getConstructorName(errorLike);
        let actual = caughtErr;
        if (caughtErr instanceof Error) actual = caughtErr.toString();
        else if ("string" == typeof caughtErr) actual = caughtErr;
        else if (caughtErr && ("object" == typeof caughtErr || "function" == typeof caughtErr)) try {
            actual = chai_check_error_exports.getConstructorName(caughtErr);
        } catch (_err) {}
        this.assert(errorWasThrown, "expected #{this} to throw " + errorLikeString, "expected #{this} to not throw an error but #{act} was thrown", errorLike && errorLike.toString(), actual);
    }
    if (errorLike && caughtErr) {
        if (errorLike instanceof Error) {
            let isCompatibleInstance = chai_check_error_exports.compatibleInstance(caughtErr, errorLike);
            if (isCompatibleInstance === negate) if (everyArgIsDefined && negate) errorLikeFail = true;
            else this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""), errorLike.toString(), caughtErr.toString());
        }
        let isCompatibleConstructor = chai_check_error_exports.compatibleConstructor(caughtErr, errorLike);
        if (isCompatibleConstructor === negate) if (everyArgIsDefined && negate) errorLikeFail = true;
        else this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && chai_check_error_exports.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && chai_check_error_exports.getConstructorName(caughtErr));
    }
    if (caughtErr && null != errMsgMatcher) {
        let placeholder = "including";
        if (chai_isRegExp2(errMsgMatcher)) placeholder = "matching";
        let isCompatibleMessage = chai_check_error_exports.compatibleMessage(caughtErr, errMsgMatcher);
        if (isCompatibleMessage === negate) if (everyArgIsDefined && negate) errMsgMatcherFail = true;
        else this.assert(negate, "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}", "expected #{this} to throw error not " + placeholder + " #{exp}", errMsgMatcher, chai_check_error_exports.getMessage(caughtErr));
    }
    if (errorLikeFail && errMsgMatcherFail) this.assert(negate, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""), errorLike instanceof Error ? errorLike.toString() : errorLike && chai_check_error_exports.getConstructorName(errorLike), caughtErr instanceof Error ? caughtErr.toString() : caughtErr && chai_check_error_exports.getConstructorName(caughtErr));
    chai_flag2(this, "object", caughtErr);
}
chai_name(chai_assertThrows, "assertThrows");
node_modules_chai_Assertion.addMethod("throw", chai_assertThrows);
node_modules_chai_Assertion.addMethod("throws", chai_assertThrows);
node_modules_chai_Assertion.addMethod("Throw", chai_assertThrows);
function chai_respondTo(method, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), itself = chai_flag2(this, "itself"), context = "function" != typeof obj || itself ? obj[method] : obj.prototype[method];
    this.assert("function" == typeof context, "expected #{this} to respond to " + chai_inspect2(method), "expected #{this} to not respond to " + chai_inspect2(method));
}
chai_name(chai_respondTo, "respondTo");
node_modules_chai_Assertion.addMethod("respondTo", chai_respondTo);
node_modules_chai_Assertion.addMethod("respondsTo", chai_respondTo);
node_modules_chai_Assertion.addProperty("itself", function() {
    chai_flag2(this, "itself", true);
});
function chai_satisfy(matcher, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object");
    let result = matcher(obj);
    this.assert(result, "expected #{this} to satisfy " + chai_objDisplay(matcher), "expected #{this} to not satisfy" + chai_objDisplay(matcher), !chai_flag2(this, "negate"), result);
}
chai_name(chai_satisfy, "satisfy");
node_modules_chai_Assertion.addMethod("satisfy", chai_satisfy);
node_modules_chai_Assertion.addMethod("satisfies", chai_satisfy);
function chai_closeTo(expected, delta, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi");
    new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).is.numeric;
    let message = "A `delta` value is required for `closeTo`";
    if (void 0 == delta) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg ? `${flagMsg}: ${message}` : message, void 0, ssfi);
    new node_modules_chai_Assertion(delta, flagMsg, ssfi, true).is.numeric;
    message = "A `expected` value is required for `closeTo`";
    if (void 0 == expected) throw new chai_6_2_2_node_modules_chai_AssertionError(flagMsg ? `${flagMsg}: ${message}` : message, void 0, ssfi);
    new node_modules_chai_Assertion(expected, flagMsg, ssfi, true).is.numeric;
    const abs = /* @__PURE__ */ chai_name((x)=>x < 0 ? -x : x, "abs");
    const strip = /* @__PURE__ */ chai_name((number)=>parseFloat(parseFloat(number).toPrecision(12)), "strip");
    this.assert(strip(abs(obj - expected)) <= delta, "expected #{this} to be close to " + expected + " +/- " + delta, "expected #{this} not to be close to " + expected + " +/- " + delta);
}
chai_name(chai_closeTo, "closeTo");
node_modules_chai_Assertion.addMethod("closeTo", chai_closeTo);
node_modules_chai_Assertion.addMethod("approximately", chai_closeTo);
function chai_isSubsetOf(_subset, _superset, cmp, contains, ordered) {
    let superset = Array.from(_superset);
    let subset = Array.from(_subset);
    if (!contains) {
        if (subset.length !== superset.length) return false;
        superset = superset.slice();
    }
    return subset.every(function(elem, idx) {
        if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
        if (!cmp) {
            let matchIdx = superset.indexOf(elem);
            if (-1 === matchIdx) return false;
            if (!contains) superset.splice(matchIdx, 1);
            return true;
        }
        return superset.some(function(elem2, matchIdx) {
            if (!cmp(elem, elem2)) return false;
            if (!contains) superset.splice(matchIdx, 1);
            return true;
        });
    });
}
chai_name(chai_isSubsetOf, "isSubsetOf");
node_modules_chai_Assertion.addMethod("members", function(subset, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi");
    new node_modules_chai_Assertion(obj, flagMsg, ssfi, true).to.be.iterable;
    new node_modules_chai_Assertion(subset, flagMsg, ssfi, true).to.be.iterable;
    let contains = chai_flag2(this, "contains");
    let ordered = chai_flag2(this, "ordered");
    let subject, failMsg, failNegateMsg;
    if (contains) {
        subject = ordered ? "an ordered superset" : "a superset";
        failMsg = "expected #{this} to be " + subject + " of #{exp}";
        failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
    } else {
        subject = ordered ? "ordered members" : "members";
        failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
        failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
    }
    let cmp = chai_flag2(this, "deep") ? chai_flag2(this, "eql") : void 0;
    this.assert(chai_isSubsetOf(subset, obj, cmp, contains, ordered), failMsg, failNegateMsg, subset, obj, true);
});
node_modules_chai_Assertion.addProperty("iterable", function(msg) {
    if (msg) chai_flag2(this, "message", msg);
    let obj = chai_flag2(this, "object");
    this.assert(void 0 != obj && obj[Symbol.iterator], "expected #{this} to be an iterable", "expected #{this} to not be an iterable", obj);
});
function chai_oneOf(list, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let expected = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi"), contains = chai_flag2(this, "contains"), isDeep = chai_flag2(this, "deep"), eql = chai_flag2(this, "eql");
    new node_modules_chai_Assertion(list, flagMsg, ssfi, true).to.be.an("array");
    if (contains) this.assert(list.some(function(possibility) {
        return expected.indexOf(possibility) > -1;
    }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", list, expected);
    else if (isDeep) this.assert(list.some(function(possibility) {
        return eql(expected, possibility);
    }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", list, expected);
    else this.assert(list.indexOf(expected) > -1, "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", list, expected);
}
chai_name(chai_oneOf, "oneOf");
node_modules_chai_Assertion.addMethod("oneOf", chai_oneOf);
function chai_assertChanges(subject, prop, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let fn = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi");
    new node_modules_chai_Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (prop) {
        new node_modules_chai_Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
    } else {
        new node_modules_chai_Assertion(subject, flagMsg, ssfi, true).is.a("function");
        initial = subject();
    }
    fn();
    let final = null == prop ? subject() : subject[prop];
    let msgObj = null == prop ? initial : "." + prop;
    chai_flag2(this, "deltaMsgObj", msgObj);
    chai_flag2(this, "initialDeltaValue", initial);
    chai_flag2(this, "finalDeltaValue", final);
    chai_flag2(this, "deltaBehavior", "change");
    chai_flag2(this, "realDelta", final !== initial);
    this.assert(initial !== final, "expected " + msgObj + " to change", "expected " + msgObj + " to not change");
}
chai_name(chai_assertChanges, "assertChanges");
node_modules_chai_Assertion.addMethod("change", chai_assertChanges);
node_modules_chai_Assertion.addMethod("changes", chai_assertChanges);
function chai_assertIncreases(subject, prop, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let fn = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi");
    new node_modules_chai_Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (prop) {
        new node_modules_chai_Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
    } else {
        new node_modules_chai_Assertion(subject, flagMsg, ssfi, true).is.a("function");
        initial = subject();
    }
    new node_modules_chai_Assertion(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    let final = null == prop ? subject() : subject[prop];
    let msgObj = null == prop ? initial : "." + prop;
    chai_flag2(this, "deltaMsgObj", msgObj);
    chai_flag2(this, "initialDeltaValue", initial);
    chai_flag2(this, "finalDeltaValue", final);
    chai_flag2(this, "deltaBehavior", "increase");
    chai_flag2(this, "realDelta", final - initial);
    this.assert(final - initial > 0, "expected " + msgObj + " to increase", "expected " + msgObj + " to not increase");
}
chai_name(chai_assertIncreases, "assertIncreases");
node_modules_chai_Assertion.addMethod("increase", chai_assertIncreases);
node_modules_chai_Assertion.addMethod("increases", chai_assertIncreases);
function chai_assertDecreases(subject, prop, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let fn = chai_flag2(this, "object"), flagMsg = chai_flag2(this, "message"), ssfi = chai_flag2(this, "ssfi");
    new node_modules_chai_Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (prop) {
        new node_modules_chai_Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
    } else {
        new node_modules_chai_Assertion(subject, flagMsg, ssfi, true).is.a("function");
        initial = subject();
    }
    new node_modules_chai_Assertion(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    let final = null == prop ? subject() : subject[prop];
    let msgObj = null == prop ? initial : "." + prop;
    chai_flag2(this, "deltaMsgObj", msgObj);
    chai_flag2(this, "initialDeltaValue", initial);
    chai_flag2(this, "finalDeltaValue", final);
    chai_flag2(this, "deltaBehavior", "decrease");
    chai_flag2(this, "realDelta", initial - final);
    this.assert(final - initial < 0, "expected " + msgObj + " to decrease", "expected " + msgObj + " to not decrease");
}
chai_name(chai_assertDecreases, "assertDecreases");
node_modules_chai_Assertion.addMethod("decrease", chai_assertDecreases);
node_modules_chai_Assertion.addMethod("decreases", chai_assertDecreases);
function chai_assertDelta(delta, msg) {
    if (msg) chai_flag2(this, "message", msg);
    let msgObj = chai_flag2(this, "deltaMsgObj");
    let initial = chai_flag2(this, "initialDeltaValue");
    let final = chai_flag2(this, "finalDeltaValue");
    let behavior = chai_flag2(this, "deltaBehavior");
    let realDelta = chai_flag2(this, "realDelta");
    let expression;
    expression = "change" === behavior ? Math.abs(final - initial) === Math.abs(delta) : realDelta === Math.abs(delta);
    this.assert(expression, "expected " + msgObj + " to " + behavior + " by " + delta, "expected " + msgObj + " to not " + behavior + " by " + delta);
}
chai_name(chai_assertDelta, "assertDelta");
node_modules_chai_Assertion.addMethod("by", chai_assertDelta);
node_modules_chai_Assertion.addProperty("extensible", function() {
    let obj = chai_flag2(this, "object");
    let isExtensible = obj === Object(obj) && Object.isExtensible(obj);
    this.assert(isExtensible, "expected #{this} to be extensible", "expected #{this} to not be extensible");
});
node_modules_chai_Assertion.addProperty("sealed", function() {
    let obj = chai_flag2(this, "object");
    let isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
    this.assert(isSealed, "expected #{this} to be sealed", "expected #{this} to not be sealed");
});
node_modules_chai_Assertion.addProperty("frozen", function() {
    let obj = chai_flag2(this, "object");
    let isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
    this.assert(isFrozen, "expected #{this} to be frozen", "expected #{this} to not be frozen");
});
node_modules_chai_Assertion.addProperty("finite", function(_msg) {
    let obj = chai_flag2(this, "object");
    this.assert("number" == typeof obj && isFinite(obj), "expected #{this} to be a finite number", "expected #{this} to not be a finite number");
});
function chai_compareSubset(expected, actual) {
    if (expected === actual) return true;
    if (typeof actual !== typeof expected) return false;
    if ("object" != typeof expected || null === expected) return expected === actual;
    if (!actual) return false;
    if (Array.isArray(expected)) {
        if (!Array.isArray(actual)) return false;
        return expected.every(function(exp) {
            return actual.some(function(act) {
                return chai_compareSubset(exp, act);
            });
        });
    }
    if (expected instanceof Date) if (actual instanceof Date) return expected.getTime() === actual.getTime();
    else return false;
    return Object.keys(expected).every(function(key) {
        let expectedValue = expected[key];
        let actualValue = actual[key];
        if ("object" == typeof expectedValue && null !== expectedValue && null !== actualValue) return chai_compareSubset(expectedValue, actualValue);
        if ("function" == typeof expectedValue) return expectedValue(actualValue);
        return actualValue === expectedValue;
    });
}
chai_name(chai_compareSubset, "compareSubset");
node_modules_chai_Assertion.addMethod("containSubset", function(expected) {
    const actual = chai_flag(this, "object");
    const showDiff = node_modules_chai_config.showDiff;
    this.assert(chai_compareSubset(expected, actual), "expected #{act} to contain subset #{exp}", "expected #{act} to not contain subset #{exp}", expected, actual, showDiff);
});
function node_modules_chai_expect(val, message) {
    return new node_modules_chai_Assertion(val, message);
}
chai_name(node_modules_chai_expect, "expect");
node_modules_chai_expect.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = void 0;
    }
    message = message || "expect.fail()";
    throw new chai_6_2_2_node_modules_chai_AssertionError(message, {
        actual,
        expected,
        operator
    }, node_modules_chai_expect.fail);
};
var chai_should_exports = {};
chai_export(chai_should_exports, {
    Should: ()=>chai_Should,
    should: ()=>chai_should
});
function chai_loadShould() {
    function shouldGetter() {
        if (this instanceof String || this instanceof Number || this instanceof Boolean || "function" == typeof Symbol && this instanceof Symbol || "function" == typeof BigInt && this instanceof BigInt) return new node_modules_chai_Assertion(this.valueOf(), null, shouldGetter);
        return new node_modules_chai_Assertion(this, null, shouldGetter);
    }
    chai_name(shouldGetter, "shouldGetter");
    function shouldSetter(value) {
        Object.defineProperty(this, "should", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    }
    chai_name(shouldSetter, "shouldSetter");
    Object.defineProperty(Object.prototype, "should", {
        set: shouldSetter,
        get: shouldGetter,
        configurable: true
    });
    let should2 = {};
    should2.fail = function(actual, expected, message, operator) {
        if (arguments.length < 2) {
            message = actual;
            actual = void 0;
        }
        message = message || "should.fail()";
        throw new chai_6_2_2_node_modules_chai_AssertionError(message, {
            actual,
            expected,
            operator
        }, should2.fail);
    };
    should2.equal = function(actual, expected, message) {
        new node_modules_chai_Assertion(actual, message).to.equal(expected);
    };
    should2.Throw = function(fn, errt, errs, msg) {
        new node_modules_chai_Assertion(fn, msg).to.Throw(errt, errs);
    };
    should2.exist = function(val, msg) {
        new node_modules_chai_Assertion(val, msg).to.exist;
    };
    should2.not = {};
    should2.not.equal = function(actual, expected, msg) {
        new node_modules_chai_Assertion(actual, msg).to.not.equal(expected);
    };
    should2.not.Throw = function(fn, errt, errs, msg) {
        new node_modules_chai_Assertion(fn, msg).to.not.Throw(errt, errs);
    };
    should2.not.exist = function(val, msg) {
        new node_modules_chai_Assertion(val, msg).to.not.exist;
    };
    should2["throw"] = should2["Throw"];
    should2.not["throw"] = should2.not["Throw"];
    return should2;
}
chai_name(chai_loadShould, "loadShould");
var chai_should = chai_loadShould;
var chai_Should = chai_loadShould;
function node_modules_chai_assert(express, errmsg) {
    let test2 = new node_modules_chai_Assertion(null, null, node_modules_chai_assert, true);
    test2.assert(express, errmsg, "[ negation message unavailable ]");
}
chai_name(node_modules_chai_assert, "assert");
node_modules_chai_assert.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = void 0;
    }
    message = message || "assert.fail()";
    throw new chai_6_2_2_node_modules_chai_AssertionError(message, {
        actual,
        expected,
        operator
    }, node_modules_chai_assert.fail);
};
node_modules_chai_assert.isOk = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isOk, true).is.ok;
};
node_modules_chai_assert.isNotOk = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotOk, true).is.not.ok;
};
node_modules_chai_assert.equal = function(act, exp, msg) {
    let test2 = new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.equal, true);
    test2.assert(exp == chai_flag(test2, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", exp, act, true);
};
node_modules_chai_assert.notEqual = function(act, exp, msg) {
    let test2 = new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.notEqual, true);
    test2.assert(exp != chai_flag(test2, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", exp, act, true);
};
node_modules_chai_assert.strictEqual = function(act, exp, msg) {
    new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.strictEqual, true).to.equal(exp);
};
node_modules_chai_assert.notStrictEqual = function(act, exp, msg) {
    new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.notStrictEqual, true).to.not.equal(exp);
};
node_modules_chai_assert.deepEqual = node_modules_chai_assert.deepStrictEqual = function(act, exp, msg) {
    new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.deepEqual, true).to.eql(exp);
};
node_modules_chai_assert.notDeepEqual = function(act, exp, msg) {
    new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.notDeepEqual, true).to.not.eql(exp);
};
node_modules_chai_assert.isAbove = function(val, abv, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isAbove, true).to.be.above(abv);
};
node_modules_chai_assert.isAtLeast = function(val, atlst, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isAtLeast, true).to.be.least(atlst);
};
node_modules_chai_assert.isBelow = function(val, blw, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isBelow, true).to.be.below(blw);
};
node_modules_chai_assert.isAtMost = function(val, atmst, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isAtMost, true).to.be.most(atmst);
};
node_modules_chai_assert.isTrue = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isTrue, true).is["true"];
};
node_modules_chai_assert.isNotTrue = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotTrue, true).to.not.equal(true);
};
node_modules_chai_assert.isFalse = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isFalse, true).is["false"];
};
node_modules_chai_assert.isNotFalse = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotFalse, true).to.not.equal(false);
};
node_modules_chai_assert.isNull = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNull, true).to.equal(null);
};
node_modules_chai_assert.isNotNull = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotNull, true).to.not.equal(null);
};
node_modules_chai_assert.isNaN = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNaN, true).to.be.NaN;
};
node_modules_chai_assert.isNotNaN = function(value, message) {
    new node_modules_chai_Assertion(value, message, node_modules_chai_assert.isNotNaN, true).not.to.be.NaN;
};
node_modules_chai_assert.exists = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.exists, true).to.exist;
};
node_modules_chai_assert.notExists = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.notExists, true).to.not.exist;
};
node_modules_chai_assert.isUndefined = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isUndefined, true).to.equal(void 0);
};
node_modules_chai_assert.isDefined = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isDefined, true).to.not.equal(void 0);
};
node_modules_chai_assert.isCallable = function(value, message) {
    new node_modules_chai_Assertion(value, message, node_modules_chai_assert.isCallable, true).is.callable;
};
node_modules_chai_assert.isNotCallable = function(value, message) {
    new node_modules_chai_Assertion(value, message, node_modules_chai_assert.isNotCallable, true).is.not.callable;
};
node_modules_chai_assert.isObject = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isObject, true).to.be.a("object");
};
node_modules_chai_assert.isNotObject = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotObject, true).to.not.be.a("object");
};
node_modules_chai_assert.isArray = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isArray, true).to.be.an("array");
};
node_modules_chai_assert.isNotArray = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotArray, true).to.not.be.an("array");
};
node_modules_chai_assert.isString = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isString, true).to.be.a("string");
};
node_modules_chai_assert.isNotString = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotString, true).to.not.be.a("string");
};
node_modules_chai_assert.isNumber = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNumber, true).to.be.a("number");
};
node_modules_chai_assert.isNotNumber = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotNumber, true).to.not.be.a("number");
};
node_modules_chai_assert.isNumeric = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNumeric, true).is.numeric;
};
node_modules_chai_assert.isNotNumeric = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotNumeric, true).is.not.numeric;
};
node_modules_chai_assert.isFinite = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isFinite, true).to.be.finite;
};
node_modules_chai_assert.isBoolean = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isBoolean, true).to.be.a("boolean");
};
node_modules_chai_assert.isNotBoolean = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotBoolean, true).to.not.be.a("boolean");
};
node_modules_chai_assert.typeOf = function(val, type3, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.typeOf, true).to.be.a(type3);
};
node_modules_chai_assert.notTypeOf = function(value, type3, message) {
    new node_modules_chai_Assertion(value, message, node_modules_chai_assert.notTypeOf, true).to.not.be.a(type3);
};
node_modules_chai_assert.instanceOf = function(val, type3, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.instanceOf, true).to.be.instanceOf(type3);
};
node_modules_chai_assert.notInstanceOf = function(val, type3, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.notInstanceOf, true).to.not.be.instanceOf(type3);
};
node_modules_chai_assert.include = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.include, true).include(inc);
};
node_modules_chai_assert.notInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notInclude, true).not.include(inc);
};
node_modules_chai_assert.deepInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.deepInclude, true).deep.include(inc);
};
node_modules_chai_assert.notDeepInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notDeepInclude, true).not.deep.include(inc);
};
node_modules_chai_assert.nestedInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.nestedInclude, true).nested.include(inc);
};
node_modules_chai_assert.notNestedInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notNestedInclude, true).not.nested.include(inc);
};
node_modules_chai_assert.deepNestedInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.deepNestedInclude, true).deep.nested.include(inc);
};
node_modules_chai_assert.notDeepNestedInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notDeepNestedInclude, true).not.deep.nested.include(inc);
};
node_modules_chai_assert.ownInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.ownInclude, true).own.include(inc);
};
node_modules_chai_assert.notOwnInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notOwnInclude, true).not.own.include(inc);
};
node_modules_chai_assert.deepOwnInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.deepOwnInclude, true).deep.own.include(inc);
};
node_modules_chai_assert.notDeepOwnInclude = function(exp, inc, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notDeepOwnInclude, true).not.deep.own.include(inc);
};
node_modules_chai_assert.match = function(exp, re, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.match, true).to.match(re);
};
node_modules_chai_assert.notMatch = function(exp, re, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.notMatch, true).to.not.match(re);
};
node_modules_chai_assert.property = function(obj, prop, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.property, true).to.have.property(prop);
};
node_modules_chai_assert.notProperty = function(obj, prop, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notProperty, true).to.not.have.property(prop);
};
node_modules_chai_assert.propertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.propertyVal, true).to.have.property(prop, val);
};
node_modules_chai_assert.notPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notPropertyVal, true).to.not.have.property(prop, val);
};
node_modules_chai_assert.deepPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.deepPropertyVal, true).to.have.deep.property(prop, val);
};
node_modules_chai_assert.notDeepPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notDeepPropertyVal, true).to.not.have.deep.property(prop, val);
};
node_modules_chai_assert.ownProperty = function(obj, prop, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.ownProperty, true).to.have.own.property(prop);
};
node_modules_chai_assert.notOwnProperty = function(obj, prop, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notOwnProperty, true).to.not.have.own.property(prop);
};
node_modules_chai_assert.ownPropertyVal = function(obj, prop, value, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.ownPropertyVal, true).to.have.own.property(prop, value);
};
node_modules_chai_assert.notOwnPropertyVal = function(obj, prop, value, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notOwnPropertyVal, true).to.not.have.own.property(prop, value);
};
node_modules_chai_assert.deepOwnPropertyVal = function(obj, prop, value, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.deepOwnPropertyVal, true).to.have.deep.own.property(prop, value);
};
node_modules_chai_assert.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notDeepOwnPropertyVal, true).to.not.have.deep.own.property(prop, value);
};
node_modules_chai_assert.nestedProperty = function(obj, prop, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.nestedProperty, true).to.have.nested.property(prop);
};
node_modules_chai_assert.notNestedProperty = function(obj, prop, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notNestedProperty, true).to.not.have.nested.property(prop);
};
node_modules_chai_assert.nestedPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.nestedPropertyVal, true).to.have.nested.property(prop, val);
};
node_modules_chai_assert.notNestedPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notNestedPropertyVal, true).to.not.have.nested.property(prop, val);
};
node_modules_chai_assert.deepNestedPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.deepNestedPropertyVal, true).to.have.deep.nested.property(prop, val);
};
node_modules_chai_assert.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.notDeepNestedPropertyVal, true).to.not.have.deep.nested.property(prop, val);
};
node_modules_chai_assert.lengthOf = function(exp, len, msg) {
    new node_modules_chai_Assertion(exp, msg, node_modules_chai_assert.lengthOf, true).to.have.lengthOf(len);
};
node_modules_chai_assert.hasAnyKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.hasAnyKeys, true).to.have.any.keys(keys);
};
node_modules_chai_assert.hasAllKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.hasAllKeys, true).to.have.all.keys(keys);
};
node_modules_chai_assert.containsAllKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.containsAllKeys, true).to.contain.all.keys(keys);
};
node_modules_chai_assert.doesNotHaveAnyKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.doesNotHaveAnyKeys, true).to.not.have.any.keys(keys);
};
node_modules_chai_assert.doesNotHaveAllKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.doesNotHaveAllKeys, true).to.not.have.all.keys(keys);
};
node_modules_chai_assert.hasAnyDeepKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.hasAnyDeepKeys, true).to.have.any.deep.keys(keys);
};
node_modules_chai_assert.hasAllDeepKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.hasAllDeepKeys, true).to.have.all.deep.keys(keys);
};
node_modules_chai_assert.containsAllDeepKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.containsAllDeepKeys, true).to.contain.all.deep.keys(keys);
};
node_modules_chai_assert.doesNotHaveAnyDeepKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.doesNotHaveAnyDeepKeys, true).to.not.have.any.deep.keys(keys);
};
node_modules_chai_assert.doesNotHaveAllDeepKeys = function(obj, keys, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.doesNotHaveAllDeepKeys, true).to.not.have.all.deep.keys(keys);
};
node_modules_chai_assert.throws = function(fn, errorLike, errMsgMatcher, msg) {
    if ("string" == typeof errorLike || errorLike instanceof RegExp) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }
    let assertErr = new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.throws, true).to.throw(errorLike, errMsgMatcher);
    return chai_flag(assertErr, "object");
};
node_modules_chai_assert.doesNotThrow = function(fn, errorLike, errMsgMatcher, message) {
    if ("string" == typeof errorLike || errorLike instanceof RegExp) {
        errMsgMatcher = errorLike;
        errorLike = null;
    }
    new node_modules_chai_Assertion(fn, message, node_modules_chai_assert.doesNotThrow, true).to.not.throw(errorLike, errMsgMatcher);
};
node_modules_chai_assert.operator = function(val, operator, val2, msg) {
    let ok;
    switch(operator){
        case "==":
            ok = val == val2;
            break;
        case "===":
            ok = val === val2;
            break;
        case ">":
            ok = val > val2;
            break;
        case ">=":
            ok = val >= val2;
            break;
        case "<":
            ok = val < val2;
            break;
        case "<=":
            ok = val <= val2;
            break;
        case "!=":
            ok = val != val2;
            break;
        case "!==":
            ok = val !== val2;
            break;
        default:
            msg = msg ? msg + ": " : msg;
            throw new chai_6_2_2_node_modules_chai_AssertionError(msg + 'Invalid operator "' + operator + '"', void 0, node_modules_chai_assert.operator);
    }
    let test2 = new node_modules_chai_Assertion(ok, msg, node_modules_chai_assert.operator, true);
    test2.assert(true === chai_flag(test2, "object"), "expected " + chai_inspect2(val) + " to be " + operator + " " + chai_inspect2(val2), "expected " + chai_inspect2(val) + " to not be " + operator + " " + chai_inspect2(val2));
};
node_modules_chai_assert.closeTo = function(act, exp, delta, msg) {
    new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.closeTo, true).to.be.closeTo(exp, delta);
};
node_modules_chai_assert.approximately = function(act, exp, delta, msg) {
    new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.approximately, true).to.be.approximately(exp, delta);
};
node_modules_chai_assert.sameMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.sameMembers, true).to.have.same.members(set2);
};
node_modules_chai_assert.notSameMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.notSameMembers, true).to.not.have.same.members(set2);
};
node_modules_chai_assert.sameDeepMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.sameDeepMembers, true).to.have.same.deep.members(set2);
};
node_modules_chai_assert.notSameDeepMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.notSameDeepMembers, true).to.not.have.same.deep.members(set2);
};
node_modules_chai_assert.sameOrderedMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.sameOrderedMembers, true).to.have.same.ordered.members(set2);
};
node_modules_chai_assert.notSameOrderedMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.notSameOrderedMembers, true).to.not.have.same.ordered.members(set2);
};
node_modules_chai_assert.sameDeepOrderedMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.sameDeepOrderedMembers, true).to.have.same.deep.ordered.members(set2);
};
node_modules_chai_assert.notSameDeepOrderedMembers = function(set1, set2, msg) {
    new node_modules_chai_Assertion(set1, msg, node_modules_chai_assert.notSameDeepOrderedMembers, true).to.not.have.same.deep.ordered.members(set2);
};
node_modules_chai_assert.includeMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.includeMembers, true).to.include.members(subset);
};
node_modules_chai_assert.notIncludeMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.notIncludeMembers, true).to.not.include.members(subset);
};
node_modules_chai_assert.includeDeepMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.includeDeepMembers, true).to.include.deep.members(subset);
};
node_modules_chai_assert.notIncludeDeepMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.notIncludeDeepMembers, true).to.not.include.deep.members(subset);
};
node_modules_chai_assert.includeOrderedMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.includeOrderedMembers, true).to.include.ordered.members(subset);
};
node_modules_chai_assert.notIncludeOrderedMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.notIncludeOrderedMembers, true).to.not.include.ordered.members(subset);
};
node_modules_chai_assert.includeDeepOrderedMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.includeDeepOrderedMembers, true).to.include.deep.ordered.members(subset);
};
node_modules_chai_assert.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
    new node_modules_chai_Assertion(superset, msg, node_modules_chai_assert.notIncludeDeepOrderedMembers, true).to.not.include.deep.ordered.members(subset);
};
node_modules_chai_assert.oneOf = function(inList, list, msg) {
    new node_modules_chai_Assertion(inList, msg, node_modules_chai_assert.oneOf, true).to.be.oneOf(list);
};
node_modules_chai_assert.isIterable = function(obj, msg) {
    if (void 0 == obj || !obj[Symbol.iterator]) {
        msg = msg ? `${msg} expected ${chai_inspect2(obj)} to be an iterable` : `expected ${chai_inspect2(obj)} to be an iterable`;
        throw new chai_6_2_2_node_modules_chai_AssertionError(msg, void 0, node_modules_chai_assert.isIterable);
    }
};
node_modules_chai_assert.changes = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.changes, true).to.change(obj, prop);
};
node_modules_chai_assert.changesBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.changesBy, true).to.change(obj, prop).by(delta);
};
node_modules_chai_assert.doesNotChange = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.doesNotChange, true).to.not.change(obj, prop);
};
node_modules_chai_assert.changesButNotBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
};
node_modules_chai_assert.increases = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.increases, true).to.increase(obj, prop);
};
node_modules_chai_assert.increasesBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.increasesBy, true).to.increase(obj, prop).by(delta);
};
node_modules_chai_assert.doesNotIncrease = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.doesNotIncrease, true).to.not.increase(obj, prop);
};
node_modules_chai_assert.increasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
};
node_modules_chai_assert.decreases = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.decreases, true).to.decrease(obj, prop);
};
node_modules_chai_assert.decreasesBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.decreasesBy, true).to.decrease(obj, prop).by(delta);
};
node_modules_chai_assert.doesNotDecrease = function(fn, obj, prop, msg) {
    if (3 === arguments.length && "function" == typeof obj) {
        msg = prop;
        prop = null;
    }
    return new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.doesNotDecrease, true).to.not.decrease(obj, prop);
};
node_modules_chai_assert.doesNotDecreaseBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    return new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
};
node_modules_chai_assert.decreasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (4 === arguments.length && "function" == typeof obj) {
        let tmpMsg = delta;
        delta = prop;
        msg = tmpMsg;
    } else if (3 === arguments.length) {
        delta = prop;
        prop = null;
    }
    new node_modules_chai_Assertion(fn, msg, node_modules_chai_assert.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
};
node_modules_chai_assert.ifError = function(val) {
    if (val) throw val;
};
node_modules_chai_assert.isExtensible = function(obj, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.isExtensible, true).to.be.extensible;
};
node_modules_chai_assert.isNotExtensible = function(obj, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.isNotExtensible, true).to.not.be.extensible;
};
node_modules_chai_assert.isSealed = function(obj, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.isSealed, true).to.be.sealed;
};
node_modules_chai_assert.isNotSealed = function(obj, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.isNotSealed, true).to.not.be.sealed;
};
node_modules_chai_assert.isFrozen = function(obj, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.isFrozen, true).to.be.frozen;
};
node_modules_chai_assert.isNotFrozen = function(obj, msg) {
    new node_modules_chai_Assertion(obj, msg, node_modules_chai_assert.isNotFrozen, true).to.not.be.frozen;
};
node_modules_chai_assert.isEmpty = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isEmpty, true).to.be.empty;
};
node_modules_chai_assert.isNotEmpty = function(val, msg) {
    new node_modules_chai_Assertion(val, msg, node_modules_chai_assert.isNotEmpty, true).to.not.be.empty;
};
node_modules_chai_assert.containsSubset = function(val, exp, msg) {
    new node_modules_chai_Assertion(val, msg).to.containSubset(exp);
};
node_modules_chai_assert.doesNotContainSubset = function(val, exp, msg) {
    new node_modules_chai_Assertion(val, msg).to.not.containSubset(exp);
};
var chai_aliases = [
    [
        "isOk",
        "ok"
    ],
    [
        "isNotOk",
        "notOk"
    ],
    [
        "throws",
        "throw"
    ],
    [
        "throws",
        "Throw"
    ],
    [
        "isExtensible",
        "extensible"
    ],
    [
        "isNotExtensible",
        "notExtensible"
    ],
    [
        "isSealed",
        "sealed"
    ],
    [
        "isNotSealed",
        "notSealed"
    ],
    [
        "isFrozen",
        "frozen"
    ],
    [
        "isNotFrozen",
        "notFrozen"
    ],
    [
        "isEmpty",
        "empty"
    ],
    [
        "isNotEmpty",
        "notEmpty"
    ],
    [
        "isCallable",
        "isFunction"
    ],
    [
        "isNotCallable",
        "isNotFunction"
    ],
    [
        "containsSubset",
        "containSubset"
    ]
];
for (const [name, as] of chai_aliases)node_modules_chai_assert[as] = node_modules_chai_assert[name];
var chai_used = [];
function chai_use(fn) {
    const exports = {
        use: chai_use,
        AssertionError: chai_6_2_2_node_modules_chai_AssertionError,
        util: chai_utils_exports,
        config: node_modules_chai_config,
        expect: node_modules_chai_expect,
        assert: node_modules_chai_assert,
        Assertion: node_modules_chai_Assertion,
        ...chai_should_exports
    };
    if (!~chai_used.indexOf(fn)) {
        fn(exports, chai_utils_exports);
        chai_used.push(fn);
    }
    return exports;
}
chai_name(chai_use, "use");
const unsupported = [
    'matchSnapshot',
    'toMatchSnapshot',
    'toMatchInlineSnapshot',
    'toThrowErrorMatchingSnapshot',
    'toThrowErrorMatchingInlineSnapshot',
    'throws',
    'Throw',
    'throw',
    'toThrow',
    'toThrowError'
];
function createExpectPoll(expect) {
    return function poll(fn, options = {}) {
        const { interval = 50, timeout = 1000, message } = options;
        const assertion = expect(null, message).withContext({
            poll: true
        });
        fn = fn.bind(assertion);
        const test = chai_utils_exports.flag(assertion, 'vitest-test');
        if (!test) throw new Error('expect.poll() must be called inside a test');
        const proxy = new Proxy(assertion, {
            get (target, key, receiver) {
                const assertionFunction = Reflect.get(target, key, receiver);
                if ('function' != typeof assertionFunction) return assertionFunction instanceof node_modules_chai_Assertion ? proxy : assertionFunction;
                if ('assert' === key) return assertionFunction;
                if ('string' == typeof key && unsupported.includes(key)) throw new SyntaxError(`expect.poll() is not supported in combination with .${key}(). Use rstest.waitFor() if your assertion condition is unstable.`);
                return function(...args) {
                    const STACK_TRACE_ERROR = new Error(SYNTHETIC_STACK_ERROR_MESSAGE);
                    const promise = ()=>new Promise((resolve, reject)=>{
                            let intervalId;
                            let lastError;
                            const check = async ()=>{
                                try {
                                    chai_utils_exports.flag(assertion, '_name', key);
                                    const obj = await fn();
                                    chai_utils_exports.flag(assertion, 'object', obj);
                                    resolve(await assertionFunction.call(assertion, ...args));
                                    clearTimeout(intervalId);
                                    clearTimeout(timeoutId);
                                } catch (err) {
                                    lastError = err;
                                    if (!chai_utils_exports.flag(assertion, '_isLastPollAttempt')) intervalId = getRealTimers().setTimeout(check, interval);
                                }
                            };
                            const timeoutId = getRealTimers().setTimeout(()=>{
                                clearTimeout(intervalId);
                                chai_utils_exports.flag(assertion, '_isLastPollAttempt', true);
                                const rejectWithCause = (cause)=>{
                                    reject(copyStackTrace(new Error(`Matcher did not succeed in ${timeout}ms`, {
                                        cause
                                    }), STACK_TRACE_ERROR));
                                };
                                check().then(()=>rejectWithCause(lastError)).catch((e)=>rejectWithCause(e));
                            }, timeout);
                            check();
                        });
                    let awaited = false;
                    test.onFinished ??= [];
                    test.onFinished.push(()=>{
                        if (!awaited) {
                            const negated = chai_utils_exports.flag(assertion, 'negate') ? 'not.' : '';
                            const name = chai_utils_exports.flag(assertion, '_poll.element') ? 'element(locator)' : 'poll(assertion)';
                            const assertionString = `expect.${name}.${negated}${String(key)}()`;
                            const error = new Error(`${assertionString} was not awaited. This assertion is asynchronous and must be awaited; otherwise, it is not executed to avoid unhandled rejections:\n\nawait ${assertionString}\n`);
                            throw copyStackTrace(error, STACK_TRACE_ERROR);
                        }
                    });
                    let resultPromise;
                    return {
                        then (onFulfilled, onRejected) {
                            awaited = true;
                            resultPromise ||= promise();
                            return resultPromise.then(onFulfilled, onRejected);
                        },
                        catch (onRejected) {
                            resultPromise ||= promise();
                            return resultPromise.catch(onRejected);
                        },
                        finally (onFinally) {
                            resultPromise ||= promise();
                            return resultPromise.finally(onFinally);
                        },
                        [Symbol.toStringTag]: 'Promise'
                    };
                };
            }
        });
        return proxy;
    };
}
function copyStackTrace(target, source) {
    if (void 0 !== source.stack) target.stack = source.stack.replace(source.message, target.message);
    return target;
}
function setupChaiConfig(config) {
    Object.assign(node_modules_chai_config, config);
}
function createExpect({ getCurrentTest, workerState, snapshotPlugin }) {
    chai_use(JestExtend);
    chai_use(JestChaiExpect);
    if (snapshotPlugin) chai_use(snapshotPlugin);
    chai_use(JestAsymmetricMatchers);
    const expect = (value, message)=>{
        const { assertionCalls } = getState(expect);
        setState({
            assertionCalls: assertionCalls + 1
        }, expect);
        const assert = node_modules_chai_expect(value, message);
        const _test = getCurrentTest();
        if (_test) return assert.withTest(_test);
        return assert;
    };
    Object.assign(expect, node_modules_chai_expect);
    Object.assign(expect, globalThis[ASYMMETRIC_MATCHERS_OBJECT]);
    expect.getState = ()=>getState(expect);
    expect.setState = (state)=>setState(state, expect);
    const globalState = getState(globalThis[GLOBAL_EXPECT]) || {};
    setState({
        ...globalState,
        assertionCalls: 0,
        isExpectingAssertions: false,
        isExpectingAssertionsError: null,
        expectedAssertionsNumber: null,
        expectedAssertionsNumberErrorGen: null,
        get testPath () {
            return workerState.testPath;
        }
    }, expect);
    expect.extend = (matchers)=>node_modules_chai_expect.extend(expect, matchers);
    expect.addEqualityTesters = (customTesters)=>addCustomEqualityTesters(customTesters);
    expect.soft = (...args)=>expect(...args).withContext({
            soft: true
        });
    expect.poll = createExpectPoll(expect);
    expect.element = ()=>{
        throw new Error("expect.element() is only available in browser mode. Enable browser mode in config and import @rstest/browser to install the browser expect adapter.");
    };
    expect.unreachable = (message)=>{
        node_modules_chai_assert.fail(`expected ${message ? `"${message}" ` : ''}not to be reached`);
    };
    function assertions(expected) {
        const errorGen = ()=>new Error(`expected number of assertions to be ${expected}, but got ${expect.getState().assertionCalls}`);
        if (Error.captureStackTrace) Error.captureStackTrace(errorGen(), assertions);
        expect.setState({
            expectedAssertionsNumber: expected,
            expectedAssertionsNumberErrorGen: errorGen
        });
    }
    function hasAssertions() {
        const error = new Error('expected any number of assertion, but got none');
        if (Error.captureStackTrace) Error.captureStackTrace(error, hasAssertions);
        expect.setState({
            isExpectingAssertions: true,
            isExpectingAssertionsError: error
        });
    }
    chai_utils_exports.addMethod(expect, 'assertions', assertions);
    chai_utils_exports.addMethod(expect, 'hasAssertions', hasAssertions);
    expect.extend(customMatchers);
    return expect;
}
const normalizeFixtures = (fixtures = {}, extendFixtures = {})=>{
    const result = {};
    for(const key in fixtures){
        const fixtureOptionKeys = [
            'auto'
        ];
        const value = fixtures[key];
        if (Array.isArray(value)) {
            if (1 === value.length && 'function' == typeof value[0]) {
                result[key] = {
                    isFn: true,
                    value: value[0]
                };
                continue;
            }
            if (helper_isObject(value[1]) && Object.keys(value[1]).some((key)=>fixtureOptionKeys.includes(key))) {
                result[key] = {
                    isFn: 'function' == typeof value[0],
                    value: value[0],
                    options: value[1]
                };
                continue;
            }
        }
        result[key] = {
            isFn: 'function' == typeof value,
            value
        };
    }
    const formattedResult = Object.fromEntries(Object.entries(result).map(([key, value])=>{
        if (value.isFn) {
            const usedProps = getFixtureUsedProps(value.value);
            value.deps = usedProps.filter((p)=>p in result || p in extendFixtures);
        }
        return [
            key,
            value
        ];
    }));
    return {
        ...extendFixtures,
        ...formattedResult
    };
};
const handleFixtures = async (test, context, cleanups = [])=>{
    if (!test.fixtures) return {
        cleanups
    };
    const doneMap = new Set();
    const pendingMap = new Set();
    const usedKeys = test.originalFn ? getFixtureUsedProps(test.originalFn) : [];
    const useFixture = async (name, NormalizedFixture)=>{
        if (doneMap.has(name)) return;
        if (pendingMap.has(name)) throw new Error(`Circular fixture dependency: ${name}`);
        const { isFn, deps, value: fixtureValue } = NormalizedFixture;
        if (!isFn) {
            context[name] = fixtureValue;
            doneMap.add(name);
            return;
        }
        pendingMap.add(name);
        if (deps?.length) for (const dep of deps)await useFixture(dep, test.fixtures[dep]);
        await new Promise((fixtureResolve, fixtureReject)=>{
            let useDone;
            const block = Promise.resolve().then(()=>fixtureValue(context, async (value)=>{
                    context[name] = value;
                    cleanups.unshift(()=>{
                        useDone?.();
                        return block;
                    });
                    fixtureResolve();
                    return new Promise((useFnResolve)=>{
                        useDone = useFnResolve;
                    });
                }));
            block.catch(fixtureReject);
        });
        doneMap.add(name);
        pendingMap.delete(name);
    };
    for (const [name, params] of Object.entries(test.fixtures)){
        const shouldAdd = params.options?.auto || usedKeys.includes(name);
        if (shouldAdd) await useFixture(name, params);
    }
    return {
        cleanups
    };
};
function splitByComma(s) {
    const result = [];
    const stack = [];
    let start = 0;
    for(let i = 0; i < s.length; i++)if ('{' === s[i] || '[' === s[i]) stack.push('{' === s[i] ? '}' : ']');
    else if (s[i] === stack[stack.length - 1]) stack.pop();
    else if (!stack.length && ',' === s[i]) {
        const token = s.substring(start, i).trim();
        if (token) result.push(token);
        start = i + 1;
    }
    const lastToken = s.substring(start).trim();
    if (lastToken) result.push(lastToken);
    return result;
}
function filterOutComments(s) {
    const result = [];
    let commentState = 'none';
    for(let i = 0; i < s.length; ++i)if ('singleline' === commentState) {
        if ('\n' === s[i]) commentState = 'none';
    } else if ('multiline' === commentState) {
        if ('*' === s[i - 1] && '/' === s[i]) commentState = 'none';
    } else if ('none' === commentState) if ('/' === s[i] && '/' === s[i + 1]) commentState = 'singleline';
    else if ('/' === s[i] && '*' === s[i + 1]) {
        commentState = 'multiline';
        i += 2;
    } else result.push(s[i]);
    return result.join('');
}
function getFixtureUsedProps(fn) {
    const text = filterOutComments(fn.toString());
    const match = /(?:async)?(?:\s+function)?[^(]*\(([^)]*)/.exec(text);
    if (!match) return [];
    const trimmedParams = match[1].trim();
    if (!trimmedParams) return [];
    const [firstParam] = splitByComma(trimmedParams);
    if (firstParam?.[0] !== '{' || !firstParam.endsWith('}')) {
        if (firstParam?.startsWith('_')) return [];
        throw new Error(`First argument must use the object destructuring pattern: ${firstParam}`);
    }
    const props = splitByComma(firstParam.substring(1, firstParam.length - 1)).map((prop)=>{
        const colon = prop.indexOf(':');
        return -1 === colon ? prop.trim() : prop.substring(0, colon).trim();
    });
    const restProperty = props.find((prop)=>prop.startsWith('...'));
    if (restProperty) throw new Error(`Rest property "${restProperty}" is not supported. List all used fixtures explicitly, separated by comma.`);
    return props;
}
const sanitizeAttemptCount = (value)=>{
    if ('number' != typeof value || !Number.isFinite(value) || value <= 0) return 0;
    return Math.floor(value);
};
const getTestStatus = (results, defaultStatus)=>{
    if (0 === results.length) return defaultStatus;
    return results.some((result)=>'fail' === result.status) ? 'fail' : results.every((result)=>'todo' === result.status) ? 'todo' : results.every((result)=>'skip' === result.status) ? 'skip' : 'pass';
};
const collectOnlyTests = (tests, suiteHasOnlyDescendants)=>{
    let hasOnly = false;
    for (const test of tests){
        const childrenHaveOnly = 'suite' === test.type ? collectOnlyTests(test.tests, suiteHasOnlyDescendants) : false;
        if ('suite' === test.type) suiteHasOnlyDescendants.set(test, childrenHaveOnly);
        if ('only' === test.runMode || childrenHaveOnly) hasOnly = true;
    }
    return hasOnly;
};
const createShouldSkipByName = (testNamePattern)=>{
    if (!testNamePattern) return;
    const regex = 'string' == typeof testNamePattern ? new RegExp(testNamePattern) : testNamePattern;
    const delimiter = regex.toString().includes(">") ? ">" : '';
    return (test)=>{
        if (regex.global || regex.sticky) regex.lastIndex = 0;
        return !regex.test(getTaskNameWithPrefix(test, delimiter));
    };
};
const shouldTestSkip = (test, runOnly, shouldSkipByName)=>{
    if (runOnly && 'only' !== test.runMode) return true;
    if (shouldSkipByName?.(test)) return true;
    return false;
};
const traverseUpdateTestRunModeWithContext = (testSuite, parentRunMode, runOnly, context)=>{
    if (0 === testSuite.tests.length) return;
    const childrenHaveOnly = context.suiteHasOnlyDescendants.get(testSuite) ?? false;
    if (runOnly && 'only' !== testSuite.runMode && !childrenHaveOnly) testSuite.runMode = 'skip';
    else if ([
        'skip',
        'todo'
    ].includes(parentRunMode)) testSuite.runMode = parentRunMode;
    const runSubOnly = runOnly && 'only' !== testSuite.runMode ? runOnly : childrenHaveOnly;
    let hasRunTest = false;
    let allTodoTest = true;
    for (const test of testSuite.tests){
        if ('case' === test.type) {
            if ([
                'skip',
                'todo'
            ].includes(testSuite.runMode)) test.runMode = testSuite.runMode;
            if (shouldTestSkip(test, runSubOnly, context.shouldSkipByName)) test.runMode = 'skip';
        } else traverseUpdateTestRunModeWithContext(test, testSuite.runMode, runSubOnly, context);
        if ('run' === test.runMode || 'only' === test.runMode) hasRunTest = true;
        if ('todo' !== test.runMode) allTodoTest = false;
    }
    if ('run' !== testSuite.runMode) return;
    if (hasRunTest) {
        testSuite.runMode = 'run';
        return;
    }
    testSuite.runMode = allTodoTest ? 'todo' : 'skip';
};
const updateTestModes = (tests, testNamePattern)=>{
    const suiteHasOnlyDescendants = new WeakMap();
    const hasOnly = collectOnlyTests(tests, suiteHasOnlyDescendants);
    const shouldSkipByName = createShouldSkipByName(testNamePattern);
    for (const test of tests)if ('suite' === test.type) traverseUpdateTestRunModeWithContext(test, 'run', hasOnly, {
        shouldSkipByName,
        suiteHasOnlyDescendants
    });
    else if (shouldTestSkip(test, hasOnly, shouldSkipByName)) test.runMode = 'skip';
};
const updateTestParents = (tests, parentNames = [])=>{
    for (const test of tests){
        test.parentNames = parentNames;
        if ('suite' === test.type) {
            const names = test.name === ROOT_SUITE_NAME ? parentNames : parentNames.concat(test.name);
            updateTestParents(test.tests, names);
        }
    }
};
const traverseUpdateTest = (tests, testNamePattern)=>{
    updateTestParents(tests);
    updateTestModes(tests, testNamePattern);
};
const markAllTestAsSkipped = (test)=>{
    for (const t of test){
        t.runMode = 'skip';
        if ('suite' === t.type) markAllTestAsSkipped(t.tests);
    }
};
function registerTestSuiteListener(suite, key, fn) {
    const listenersKey = `${key}Listeners`;
    suite[listenersKey] ??= [];
    suite[listenersKey].push(fn);
}
function makeError(message, stackTraceError) {
    const error = new Error(message);
    if (stackTraceError?.stack) error.stack = stackTraceError.stack.replace(error.message, stackTraceError.message);
    return error;
}
function wrapTimeout({ name, fn, timeout, getAssertionCalls, stackTraceError }) {
    if (!timeout) return fn;
    return async (...args)=>{
        let timeoutId;
        const timeoutPromise = new Promise((_, reject)=>{
            timeoutId = getRealTimers().setTimeout(()=>{
                const assertionCalls = getAssertionCalls?.() || 0;
                const assertionInfo = assertionCalls > 0 ? ` (completed ${assertionCalls} expect assertion${1 === assertionCalls ? '' : 's'})` : ' (no expect assertions completed)';
                const message = `${name} timed out in ${timeout}ms${getAssertionCalls ? assertionInfo : ''}`;
                reject(makeError(message, stackTraceError));
            }, timeout);
        });
        try {
            const result = await Promise.race([
                fn(...args),
                timeoutPromise
            ]);
            if (timeoutId) clearTimeout(timeoutId);
            return result;
        } catch (error) {
            if (timeoutId) clearTimeout(timeoutId);
            throw error;
        }
    };
}
function limitConcurrency(concurrency = 1 / 0) {
    let running = 0;
    const queue = [];
    const runNext = ()=>{
        if (queue.length > 0 && running < concurrency) {
            running++;
            const next = queue.shift();
            next();
        }
    };
    return (func, ...args)=>new Promise((resolve, reject)=>{
            const task = ()=>{
                Promise.resolve(func(...args)).then(resolve).catch(reject).finally(()=>{
                    running--;
                    runNext();
                });
            };
            if (running < concurrency) {
                running++;
                task();
            } else queue.push(task);
        });
}
const RealDate = Date;
class TestRunner {
    taskContext;
    _test;
    workerState;
    constructor(taskContext){
        this.taskContext = taskContext;
    }
    async runTests({ tests, testPath, state, hooks, api, snapshotClient }) {
        this.workerState = state;
        const { runtimeConfig: { passWithNoTests, retry, maxConcurrency, bail }, project } = state;
        const results = [];
        const errors = [];
        let defaultStatus = 'pass';
        const runTestsCase = async (test, parentHooks)=>{
            if ('skip' === test.runMode) {
                snapshotClient.skipTest(testPath, getTaskNameWithPrefix(test));
                const result = {
                    testId: test.testId,
                    status: 'skip',
                    parentNames: test.parentNames,
                    name: test.name,
                    testPath,
                    project
                };
                return result;
            }
            if ('todo' === test.runMode) {
                const result = {
                    testId: test.testId,
                    status: 'todo',
                    parentNames: test.parentNames,
                    name: test.name,
                    testPath,
                    project
                };
                return result;
            }
            let result;
            const onFinishedSnapshot = test.onFinished.length;
            const onFailedSnapshot = test.onFailed.length;
            this.beforeEach(test, state, api);
            const cleanups = [];
            const fixtureCleanups = [];
            let skipped = false;
            const skipResult = ()=>({
                    testId: test.testId,
                    status: 'skip',
                    parentNames: test.parentNames,
                    name: test.name,
                    testPath,
                    project
                });
            try {
                await this.beforeRunTest(test, snapshotClient.getSnapshotState(testPath), fixtureCleanups);
            } catch (error) {
                if (error instanceof TestSkipError) {
                    skipped = true;
                    result = skipResult();
                } else result = {
                    testId: test.testId,
                    status: 'fail',
                    parentNames: test.parentNames,
                    name: test.name,
                    errors: await formatTestError(error, test),
                    testPath,
                    project
                };
            }
            if (!result) try {
                for (const fn of parentHooks.beforeEachListeners){
                    const cleanupFn = await fn(test.context);
                    if (cleanupFn) cleanups.push(cleanupFn);
                }
            } catch (error) {
                if (error instanceof TestSkipError) {
                    skipped = true;
                    result = skipResult();
                } else result = {
                    testId: test.testId,
                    status: 'fail',
                    parentNames: test.parentNames,
                    name: test.name,
                    errors: await formatTestError(error, test),
                    testPath,
                    project
                };
            }
            if (!result) if (test.fails) try {
                await test.fn?.(test.context);
                this.afterRunTest(test);
                result = {
                    testId: test.testId,
                    status: 'fail',
                    parentNames: test.parentNames,
                    name: test.name,
                    testPath,
                    project,
                    errors: [
                        {
                            message: 'Expect test to fail'
                        }
                    ]
                };
            } catch (error) {
                if (error instanceof TestSkipError) {
                    skipped = true;
                    result = skipResult();
                } else result = {
                    testId: test.testId,
                    project,
                    status: 'pass',
                    parentNames: test.parentNames,
                    name: test.name,
                    testPath
                };
            }
            else try {
                if (test.fn) {
                    const fn = wrapTimeout({
                        name: 'test',
                        fn: test.fn,
                        timeout: test.timeout,
                        stackTraceError: test.stackTraceError,
                        getAssertionCalls: ()=>{
                            const expect = test.context._useLocalExpect ? test.context.expect : globalThis[GLOBAL_EXPECT];
                            const { assertionCalls } = getState(expect);
                            return assertionCalls;
                        }
                    });
                    await fn(test.context);
                }
                this.afterRunTest(test);
                result = {
                    testId: test.testId,
                    project,
                    parentNames: test.parentNames,
                    name: test.name,
                    status: 'pass',
                    testPath
                };
            } catch (error) {
                if (error instanceof TestSkipError) {
                    skipped = true;
                    result = skipResult();
                } else result = {
                    testId: test.testId,
                    project,
                    status: 'fail',
                    parentNames: test.parentNames,
                    name: test.name,
                    errors: await formatTestError(error, test),
                    testPath
                };
            }
            const afterEachFns = [
                ...parentHooks.afterEachListeners || []
            ].reverse().concat(cleanups).concat(fixtureCleanups).concat(test.onFinished);
            test.context.task.result = result;
            try {
                for (const fn of afterEachFns)await fn(test.context);
            } catch (error) {
                result.status = 'fail';
                result.errors ??= [];
                result.errors.push(...await formatTestError(error));
            }
            if (skipped) snapshotClient.skipTest(testPath, getTaskNameWithPrefix(test));
            if ('fail' === result.status) {
                for (const fn of [
                    ...test.onFailed
                ].reverse())try {
                    await fn(test.context);
                } catch (error) {
                    result.errors ??= [];
                    result.errors.push(...await formatTestError(error));
                }
                snapshotClient.skipTest(testPath, getTaskNameWithPrefix(test));
            }
            test.onFinished.length = onFinishedSnapshot;
            test.onFailed.length = onFailedSnapshot;
            this.resetCurrentTest();
            return result;
        };
        const limitMaxConcurrency = limitConcurrency(maxConcurrency);
        const runTests = async (allTest, parentHooks)=>{
            const tests = [
                ...allTest
            ];
            const results = [];
            while(tests.length){
                const suite = tests.shift();
                if (suite.concurrent) {
                    const cases = [
                        suite
                    ];
                    while(tests[0]?.concurrent)cases.push(tests.shift());
                    const result = await Promise.all(cases.map((test)=>{
                        if ('suite' === test.type) return runTest(test, parentHooks);
                        return limitMaxConcurrency(()=>runTest(test, parentHooks));
                    }));
                    results.push(...result);
                    continue;
                }
                const result = await runTest(suite, parentHooks);
                results.push(result);
            }
            return results;
        };
        const runTest = async (test, parentHooks)=>{
            let result = {
                testId: test.testId,
                status: 'skip',
                parentNames: test.parentNames,
                name: test.name,
                testPath,
                project,
                duration: 0,
                errors: []
            };
            if (bail && await hooks.getCountOfFailedTests() >= bail) {
                defaultStatus = 'skip';
                return result;
            }
            if ('suite' === test.type) {
                result = await this.taskContext.run({
                    taskId: test.testId,
                    taskName: test.name,
                    taskParentNames: test.parentNames,
                    taskType: 'suite',
                    testPath
                }, async ()=>{
                    const start = RealDate.now();
                    hooks.onTestSuiteStart?.({
                        parentNames: test.parentNames,
                        name: test.name,
                        testPath,
                        project: test.project,
                        testId: test.testId,
                        type: 'suite',
                        location: test.location,
                        runMode: test.runMode
                    });
                    if (0 === test.tests.length) {
                        if ([
                            'todo',
                            'skip'
                        ].includes(test.runMode)) {
                            defaultStatus = 'skip';
                            hooks.onTestSuiteResult?.(result);
                            return result;
                        }
                        if (passWithNoTests) {
                            result.status = 'pass';
                            hooks.onTestSuiteResult?.(result);
                            return result;
                        }
                        const noTestError = {
                            message: `No test found in suite: ${test.name}`,
                            name: 'No tests'
                        };
                        result.errors?.push(noTestError);
                    }
                    const cleanups = [];
                    let hasBeforeAllError = false;
                    if ([
                        'run',
                        'only'
                    ].includes(test.runMode) && test.beforeAllListeners) try {
                        for (const fn of test.beforeAllListeners){
                            const cleanupFn = await fn({
                                filepath: testPath
                            });
                            if (cleanupFn) cleanups.push(cleanupFn);
                        }
                    } catch (error) {
                        hasBeforeAllError = true;
                        result.errors?.push(...await formatTestError(error));
                    }
                    if (hasBeforeAllError) markAllTestAsSkipped(test.tests);
                    const results = await runTests(test.tests, {
                        beforeEachListeners: parentHooks.beforeEachListeners.concat(test.beforeEachListeners || []),
                        afterEachListeners: parentHooks.afterEachListeners.concat(test.afterEachListeners || [])
                    });
                    const afterAllFns = [
                        ...test.afterAllListeners || []
                    ].reverse().concat(cleanups);
                    if ([
                        'run',
                        'only'
                    ].includes(test.runMode) && afterAllFns.length) try {
                        for (const fn of afterAllFns)await fn({
                            filepath: testPath
                        });
                    } catch (error) {
                        result.errors?.push(...await formatTestError(error));
                    }
                    result.duration = RealDate.now() - start;
                    result.status = result.errors?.length ? 'fail' : getTestStatus(results, defaultStatus);
                    hooks.onTestSuiteResult?.(result);
                    return result;
                });
                errors.push(...result.errors || []);
            } else result = await this.taskContext.run({
                taskId: test.testId,
                taskName: test.name,
                taskParentNames: test.parentNames,
                taskType: 'case',
                testPath
            }, async ()=>{
                const start = RealDate.now();
                const retryBudget = sanitizeAttemptCount(test.retry ?? retry);
                const repeats = sanitizeAttemptCount(test.repeats ?? 0);
                let totalRetryCount = 0;
                const retryErrors = [];
                hooks.onTestCaseStart?.({
                    testId: test.testId,
                    startTime: start,
                    testPath: test.testPath,
                    name: test.name,
                    timeout: test.timeout,
                    parentNames: test.parentNames,
                    project: test.project,
                    type: 'case',
                    location: test.location,
                    runMode: test.runMode
                });
                for(let repeat = 0; repeat <= repeats; repeat++){
                    let retryCount = 0;
                    const repeatRetryErrors = [];
                    do {
                        const currentResult = await runTestsCase(test, parentHooks);
                        if ('fail' === currentResult.status) repeatRetryErrors.push(...currentResult.errors || []);
                        result = {
                            ...currentResult,
                            errors: 'fail' === currentResult.status ? [
                                ...repeatRetryErrors
                            ] : currentResult.errors
                        };
                        retryCount++;
                    }while (retryCount <= retryBudget && 'fail' === result.status);
                    totalRetryCount += retryCount - 1;
                    retryErrors.push(...repeatRetryErrors);
                    if ('fail' === result.status) break;
                }
                result.duration = RealDate.now() - start;
                result.retryCount = totalRetryCount;
                if ('pass' === result.status && retryErrors.length > 0) result.retryErrors = retryErrors;
                result.heap = state.runtimeConfig.logHeapUsage ? process.memoryUsage().heapUsed : void 0;
                hooks.onTestCaseResult?.(result);
                results.push(result);
                return result;
            });
            return result;
        };
        const start = RealDate.now();
        if (0 === tests.length) {
            if (passWithNoTests) return {
                testId: getFileTaskId(testPath),
                project,
                testPath,
                name: '',
                status: 'pass',
                results
            };
            return {
                testId: getFileTaskId(testPath),
                project,
                testPath,
                name: '',
                status: 'fail',
                results,
                heap: state.runtimeConfig.logHeapUsage ? process.memoryUsage().heapUsed : void 0,
                errors: [
                    {
                        message: `No test suites found in file: ${testPath}`,
                        name: 'No tests'
                    }
                ]
            };
        }
        await runTests(tests, {
            beforeEachListeners: [],
            afterEachListeners: []
        });
        const snapshotResult = await snapshotClient.finish(testPath);
        this.taskContext.setFallback({
            taskId: getFileTaskId(testPath),
            taskType: 'file',
            testPath
        });
        try {
            return {
                testId: getFileTaskId(testPath),
                project,
                testPath,
                name: '',
                heap: state.runtimeConfig.logHeapUsage ? process.memoryUsage().heapUsed : void 0,
                status: errors.length ? 'fail' : getTestStatus(results, defaultStatus),
                results,
                snapshotResult,
                errors,
                duration: RealDate.now() - start
            };
        } finally{
            this.taskContext.setFallback(void 0);
        }
    }
    resetCurrentTest() {
        this._test = void 0;
    }
    setCurrentTest(test) {
        this._test = test;
    }
    getCurrentTest() {
        return this._test;
    }
    beforeEach(test, state, api) {
        const { runtimeConfig: { clearMocks, resetMocks, restoreMocks, unstubEnvs, unstubGlobals } } = state;
        this.setCurrentTest(test);
        if (restoreMocks) api.rstest.restoreAllMocks();
        else if (resetMocks) api.rstest.resetAllMocks();
        else if (clearMocks) api.rstest.clearAllMocks();
        if (unstubEnvs) api.rstest.unstubAllEnvs();
        if (unstubGlobals) api.rstest.unstubAllGlobals();
    }
    createTestContext(test) {
        const context = ()=>{
            throw new Error('done() callback is deprecated, use promise instead');
        };
        let _expect;
        const current = this._test;
        context.task = {
            id: test.testId,
            name: test.name
        };
        Object.defineProperty(context, 'expect', {
            get: ()=>{
                if (!_expect) _expect = createExpect({
                    workerState: this.workerState,
                    getCurrentTest: ()=>current
                });
                return _expect;
            }
        });
        Object.defineProperty(context, 'skip', {
            value: ()=>{
                throw new TestSkipError('Test skipped');
            }
        });
        Object.defineProperty(context, '_useLocalExpect', {
            get () {
                return null != _expect;
            }
        });
        Object.defineProperty(context, 'onTestFinished', {
            get: ()=>(fn, timeout)=>{
                    this.onTestFinished(current, fn, timeout);
                }
        });
        Object.defineProperty(context, 'onTestFailed', {
            get: ()=>(fn, timeout)=>{
                    this.onTestFailed(current, fn, timeout);
                }
        });
        return context;
    }
    onTestFinished(test, fn, timeout) {
        if (!test) throw new Error('onTestFinished() can only be called inside a test');
        test.onFinished.push(wrapTimeout({
            name: 'onTestFinished hook',
            fn,
            timeout: timeout || this.workerState.runtimeConfig.hookTimeout,
            stackTraceError: new Error(SYNTHETIC_STACK_ERROR_MESSAGE)
        }));
    }
    onTestFailed(test, fn, timeout) {
        if (!test) throw new Error('onTestFailed() can only be called inside a test');
        test.onFailed.push(wrapTimeout({
            name: 'onTestFailed hook',
            fn,
            timeout: timeout || this.workerState.runtimeConfig.hookTimeout,
            stackTraceError: new Error(SYNTHETIC_STACK_ERROR_MESSAGE)
        }));
    }
    async beforeRunTest(test, snapshotState, fixtureCleanups) {
        setState({
            assertionCalls: 0,
            isExpectingAssertions: false,
            isExpectingAssertionsError: null,
            expectedAssertionsNumber: null,
            expectedAssertionsNumberErrorGen: null,
            testPath: test.testPath,
            snapshotState,
            currentTestName: getTaskNameWithPrefix(test)
        }, globalThis[GLOBAL_EXPECT]);
        const context = this.createTestContext(test);
        Object.defineProperty(test, 'context', {
            value: context,
            enumerable: false
        });
        await handleFixtures(test, context, fixtureCleanups);
    }
    afterRunTest(test) {
        const expect = test.context._useLocalExpect ? test.context.expect : globalThis[GLOBAL_EXPECT];
        const { assertionCalls, expectedAssertionsNumber, expectedAssertionsNumberErrorGen, isExpectingAssertions, isExpectingAssertionsError } = getState(expect);
        if (test.result?.state === 'fail') throw test.result.errors;
        if (null !== expectedAssertionsNumber && assertionCalls !== expectedAssertionsNumber) throw expectedAssertionsNumberErrorGen();
        if (true === isExpectingAssertions && 0 === assertionCalls) throw isExpectingAssertionsError;
    }
}
const isWindows = globalThis.process?.platform === 'win32';
function fileURLToPath(url, options) {
    if ('string' != typeof url && !(url instanceof URL)) throw new TypeError(`Expected \`string\` or \`URL\`, got \`${typeof url}\``);
    const useWindowsRules = options?.windows ?? isWindows;
    const urlObject = new URL(url);
    if ('file:' !== urlObject.protocol) throw new TypeError('The URL must be a file URL');
    const { hostname, pathname } = urlObject;
    if (/%2[Ff]/.test(pathname)) throw new TypeError('File URL path must not include encoded / characters');
    const path = decodeURIComponent(pathname);
    if (useWindowsRules && /^\/[A-Za-z]:/.test(path)) return path.slice(1).replaceAll('/', '\\');
    if (hostname && 'localhost' !== hostname) {
        if (!useWindowsRules) throw new TypeError('File URL host must be "localhost" or empty');
        return `\\\\${hostname}${path.replaceAll('/', '\\')}`;
    }
    return path;
}
const SHARED_RUN_MODIFIERS = [
    {
        name: 'only',
        overrides: {
            runMode: 'only'
        }
    },
    {
        name: 'todo',
        overrides: {
            runMode: 'todo'
        }
    },
    {
        name: 'skip',
        overrides: {
            runMode: 'skip'
        }
    },
    {
        name: 'concurrent',
        overrides: {
            concurrent: true
        }
    },
    {
        name: 'sequential',
        overrides: {
            sequential: true
        }
    }
];
class RunnerRuntime {
    tests = [];
    _currentTest = [];
    testPath;
    status = 'collect';
    collectStatus = 'lazy';
    currentCollectList = [];
    runtimeConfig;
    project;
    fileHash;
    constructor({ testPath, runtimeConfig, project }){
        this.project = project;
        this.testPath = testPath;
        this.fileHash = generateFilePathHash(project, testPath);
        this.runtimeConfig = runtimeConfig;
    }
    updateStatus(status) {
        this.status = status;
    }
    checkStatus(name, type) {
        if ('running' === this.status) {
            const error = new TestRegisterError(`${'case' === type ? 'Test' : 'Describe'} '${name}' cannot run`);
            throw error;
        }
    }
    registerHook(key, fn, timeout) {
        registerTestSuiteListener(this.getCurrentSuite(), key, wrapTimeout({
            name: `${key} hook`,
            fn,
            timeout,
            stackTraceError: new Error(SYNTHETIC_STACK_ERROR_MESSAGE)
        }));
    }
    afterAll = (fn, timeout = this.runtimeConfig.hookTimeout)=>this.registerHook('afterAll', fn, timeout);
    beforeAll = (fn, timeout = this.runtimeConfig.hookTimeout)=>this.registerHook('beforeAll', fn, timeout);
    afterEach = (fn, timeout = this.runtimeConfig.hookTimeout)=>this.registerHook('afterEach', fn, timeout);
    beforeEach = (fn, timeout = this.runtimeConfig.hookTimeout)=>this.registerHook('beforeEach', fn, timeout);
    getDefaultRootSuite() {
        return {
            project: this.project,
            runMode: 'run',
            testPath: this.testPath,
            name: ROOT_SUITE_NAME,
            tests: [],
            type: 'suite'
        };
    }
    describe({ name, fn, runMode = 'run', each = false, concurrent, sequential, location }) {
        this.checkStatus(name, 'suite');
        const currentSuite = {
            project: this.project,
            name,
            runMode,
            tests: [],
            type: 'suite',
            each,
            testPath: this.testPath,
            concurrent,
            sequential,
            location
        };
        if (!fn) {
            this.addTest(currentSuite);
            this.resetCurrentTest();
            return;
        }
        this.collectStatus = 'lazy';
        this.currentCollectList.push(async ()=>{
            this.addTest(currentSuite);
            const result = fn();
            if (result instanceof Promise) await result;
            await this.collectCurrentTest();
            this.resetCurrentTest();
        });
    }
    resetCurrentTest() {
        this._currentTest.pop();
    }
    addTest(testInfo) {
        const parent = this._currentTest.length > 0 ? this._currentTest[this._currentTest.length - 1] : void 0;
        let testId;
        if (testInfo.name === ROOT_SUITE_NAME) testId = this.fileHash;
        else {
            const childIndex = parent && 'suite' === parent.type ? parent.tests.length : this.tests.length;
            const parentId = parent?.testId ?? this.fileHash;
            testId = `${parentId}_${childIndex}`;
        }
        const test = {
            ...testInfo,
            testId
        };
        if (0 === this._currentTest.length) this.tests.push(test);
        else {
            const current = this._currentTest[this._currentTest.length - 1];
            if (current.each || current.inTestEach) test.inTestEach = true;
            if (current.concurrent && true !== test.sequential) test.concurrent = true;
            if (current.sequential && true !== test.concurrent) test.sequential = true;
            if ('case' === current.type) throw new Error('Calling the test function inside another test function is not allowed. Please put it inside "describe" so it can be properly collected.');
            current.tests.push(test);
        }
        this._currentTest.push(test);
    }
    async collectCurrentTest() {
        const currentCollectList = this.currentCollectList;
        this.currentCollectList = [];
        while(currentCollectList.length > 0){
            this.collectStatus = 'running';
            const fn = currentCollectList.shift();
            await fn();
        }
    }
    async getTests() {
        while(this.currentCollectList.length > 0)await this.collectCurrentTest();
        return this.tests;
    }
    addTestCase(test) {
        if ('lazy' === this.collectStatus) this.currentCollectList.push(()=>{
            this.addTest({
                ...test,
                testPath: this.testPath,
                context: void 0
            });
            this.resetCurrentTest();
        });
        else {
            this.addTest({
                ...test,
                testPath: this.testPath,
                context: void 0
            });
            this.resetCurrentTest();
        }
    }
    ensureRootSuite() {
        if (0 === this._currentTest.length) this.addTest(this.getDefaultRootSuite());
    }
    it({ name, fn, originalFn = fn, fixtures, timeout = this.runtimeConfig.testTimeout, retry, repeats, runMode = 'run', fails = false, each = false, concurrent, sequential, location }) {
        this.checkStatus(name, 'case');
        this.addTestCase({
            project: this.project,
            name,
            originalFn,
            fn,
            stackTraceError: new Error(SYNTHETIC_STACK_ERROR_MESSAGE),
            runMode,
            type: 'case',
            timeout,
            retry,
            repeats,
            fixtures,
            concurrent,
            sequential,
            each,
            fails,
            onFinished: [],
            onFailed: [],
            location
        });
    }
    describeEach({ cases, ...options }) {
        return (name, fn)=>{
            for(let i = 0; i < cases.length; i++){
                const param = cases[i];
                const params = castArray(param);
                this.describe({
                    name: formatName(name, param, i),
                    fn: ()=>fn?.(...params),
                    ...options,
                    each: true
                });
            }
        };
    }
    describeFor({ cases, ...options }) {
        return (name, fn)=>{
            for(let i = 0; i < cases.length; i++){
                const param = cases[i];
                this.describe({
                    name: formatName(name, param, i),
                    fn: ()=>fn?.(param),
                    ...options,
                    each: true
                });
            }
        };
    }
    each({ cases, ...options }) {
        return (name, fn, testOptions)=>{
            const { timeout, retry, repeats } = normalizeTestOptions(testOptions);
            for(let i = 0; i < cases.length; i++){
                const param = cases[i];
                const params = castArray(param);
                this.it({
                    name: formatName(name, param, i),
                    originalFn: fn,
                    fn: ()=>fn?.(...params),
                    timeout: timeout ?? this.runtimeConfig.testTimeout,
                    retry,
                    repeats,
                    ...options,
                    each: true
                });
            }
        };
    }
    for({ cases, ...options }) {
        return (name, fn, testOptions)=>{
            const { timeout, retry, repeats } = normalizeTestOptions(testOptions);
            for(let i = 0; i < cases.length; i++){
                const param = cases[i];
                this.it({
                    name: formatName(name, param, i),
                    originalFn: fn,
                    fn: (context)=>fn?.(param, context),
                    timeout: timeout ?? this.runtimeConfig.testTimeout,
                    retry,
                    repeats,
                    ...options,
                    each: true
                });
            }
        };
    }
    getCurrentSuite() {
        this.ensureRootSuite();
        for(let i = this._currentTest.length - 1; i >= 0; i--){
            const test = this._currentTest[i];
            if ('suite' === test.type) return test;
        }
        throw new Error('Expect to find a suite, but got undefined');
    }
}
const createRuntimeAPI = ({ testPath, runtimeConfig, project })=>{
    const runtimeInstance = new RunnerRuntime({
        project,
        testPath,
        runtimeConfig
    });
    const getLocation = ()=>{
        if (!runtimeConfig.includeTaskLocation) return;
        const stack = new Error().stack;
        if (stack) {
            const frames = parse(stack);
            for (const frame of frames){
                let filename = frame.file ?? '';
                if (filename.startsWith('file://')) filename = fileURLToPath(filename);
                filename = normalize(filename);
                if (filename === testPath) {
                    const line = frame.lineNumber;
                    const column = frame.column;
                    if (null != line && null != column) return {
                        line,
                        column
                    };
                }
            }
        }
    };
    const createTestAPI = (options = {})=>{
        const testFn = (name, fn, testOptions)=>{
            const { timeout, retry, repeats } = normalizeTestOptions(testOptions);
            runtimeInstance.it({
                name,
                fn,
                timeout,
                retry,
                repeats,
                ...options,
                location: options.location ?? getLocation()
            });
        };
        for (const { name, overrides } of [
            {
                name: 'fails',
                overrides: {
                    fails: true
                }
            },
            ...SHARED_RUN_MODIFIERS
        ])Object.defineProperty(testFn, name, {
            get: ()=>createTestAPI({
                    ...options,
                    ...overrides
                }),
            enumerable: true
        });
        testFn.runIf = (condition)=>createTestAPI({
                ...options,
                location: getLocation(),
                runMode: condition ? options.runMode : 'skip'
            });
        testFn.skipIf = (condition)=>createTestAPI({
                ...options,
                location: getLocation(),
                runMode: condition ? 'skip' : options.runMode
            });
        testFn.each = (...args)=>{
            const location = getLocation();
            const cases = isTemplateStringsArray(args[0]) ? parseTemplateTable(args[0], ...args.slice(1)) : args[0];
            return runtimeInstance.each({
                cases,
                ...options,
                location
            });
        };
        testFn.for = (...args)=>{
            const location = getLocation();
            const cases = isTemplateStringsArray(args[0]) ? parseTemplateTable(args[0], ...args.slice(1)) : args[0];
            return runtimeInstance.for({
                cases,
                ...options,
                location
            });
        };
        return testFn;
    };
    const it = createTestAPI();
    it.extend = (fixtures)=>{
        const extend = (fixtures, extendFixtures)=>{
            const normalizedFixtures = normalizeFixtures(fixtures, extendFixtures);
            const api = createTestAPI({
                fixtures: normalizedFixtures
            });
            api.extend = (subFixtures)=>extend(subFixtures, normalizedFixtures);
            return api;
        };
        return extend(fixtures);
    };
    const createDescribeAPI = (options = {})=>{
        const describeFn = (name, fn)=>runtimeInstance.describe({
                name,
                fn,
                ...options,
                location: options.location ?? getLocation()
            });
        for (const { name, overrides } of SHARED_RUN_MODIFIERS)Object.defineProperty(describeFn, name, {
            get: ()=>createDescribeAPI({
                    ...options,
                    ...overrides
                }),
            enumerable: true
        });
        describeFn.skipIf = (condition)=>createDescribeAPI({
                ...options,
                location: getLocation(),
                runMode: condition ? 'skip' : options.runMode
            });
        describeFn.runIf = (condition)=>createDescribeAPI({
                ...options,
                location: getLocation(),
                runMode: condition ? options.runMode : 'skip'
            });
        describeFn.each = (...args)=>{
            const location = getLocation();
            const cases = isTemplateStringsArray(args[0]) ? parseTemplateTable(args[0], ...args.slice(1)) : args[0];
            return runtimeInstance.describeEach({
                cases,
                ...options,
                location
            });
        };
        describeFn.for = (...args)=>{
            const location = getLocation();
            const cases = isTemplateStringsArray(args[0]) ? parseTemplateTable(args[0], ...args.slice(1)) : args[0];
            return runtimeInstance.describeFor({
                cases,
                ...options,
                location
            });
        };
        return describeFn;
    };
    const describe = createDescribeAPI();
    return {
        api: {
            describe,
            it,
            test: it,
            afterAll: runtimeInstance.afterAll,
            beforeAll: runtimeInstance.beforeAll,
            afterEach: runtimeInstance.afterEach,
            beforeEach: runtimeInstance.beforeEach
        },
        instance: runtimeInstance
    };
};
function createRunner({ workerState, taskContext }) {
    const { testPath, project, runtimeConfig: { testNamePattern } } = workerState;
    const runtime = createRuntimeAPI({
        project,
        testPath,
        runtimeConfig: workerState.runtimeConfig
    });
    const testRunner = new TestRunner(taskContext);
    return {
        api: {
            ...runtime.api,
            onTestFinished: (fn, timeout)=>{
                testRunner.onTestFinished(testRunner.getCurrentTest(), fn, timeout);
            },
            onTestFailed: (fn, timeout)=>{
                testRunner.onTestFailed(testRunner.getCurrentTest(), fn, timeout);
            }
        },
        runner: {
            runTests: async (testPath, hooks, api)=>{
                const snapshotClient = workerState.snapshotClient;
                await snapshotClient.setup(testPath, workerState.snapshotOptions);
                const tests = await runtime.instance.getTests();
                traverseUpdateTest(tests, testNamePattern);
                hooks.onTestFileReady?.({
                    testId: getFileTaskId(testPath),
                    testPath,
                    tests: tests.map(toTestInfo)
                });
                runtime.instance.updateStatus('running');
                const results = await testRunner.runTests({
                    tests,
                    testPath,
                    state: workerState,
                    hooks,
                    api,
                    snapshotClient
                });
                return results;
            },
            collectTests: async ()=>{
                const tests = await runtime.instance.getTests();
                traverseUpdateTest(tests, testNamePattern);
                return tests.map(toTestInfo);
            },
            getCurrentTest: ()=>testRunner.getCurrentTest()
        }
    };
}
function toTestInfo(test) {
    return {
        testId: test.testId,
        name: test.name,
        parentNames: test.parentNames,
        testPath: test.testPath,
        project: test.project,
        type: test.type,
        location: test.location,
        tests: 'suite' === test.type ? test.tests.map(toTestInfo) : [],
        runMode: test.runMode
    };
}
function getTypeName(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
function isPlainObject(value) {
    if (!value || 'object' != typeof value) return false;
    const type = getTypeName(value);
    return 'Object' === type || 'Module' === type;
}
function isFunction(value) {
    return 'function' == typeof value;
}
function isBuiltinReadonly(target, prop) {
    const builtinFunctionProps = [
        'arguments',
        'callee',
        'caller',
        'length',
        'name'
    ];
    const builtinRegExpProps = [
        'source',
        'global',
        'flags'
    ];
    const type = getTypeName(target);
    if (builtinFunctionProps.includes(prop)) return 'Function' === type || 'AsyncFunction' === type;
    if (builtinRegExpProps.includes(prop)) return 'RegExp' === type;
    return false;
}
function collectPrototypeMethods(proto) {
    const methods = [];
    let current = proto;
    while(current && current !== Object.prototype){
        for (const key of [
            ...Object.getOwnPropertyNames(current),
            ...Object.getOwnPropertySymbols(current)
        ]){
            if ('constructor' === key) continue;
            const descriptor = Object.getOwnPropertyDescriptor(current, key);
            if (descriptor?.value && 'function' == typeof descriptor.value) methods.push(key);
        }
        current = Object.getPrototypeOf(current);
    }
    return methods;
}
function getEnumerableProperties(obj, constructors) {
    const props = new Set();
    const isModule = 'Module' === getTypeName(obj) || obj.__esModule;
    if (isModule) {
        for (const k of Object.getOwnPropertyNames(obj))props.add(k);
        for (const k of Object.getOwnPropertySymbols(obj))props.add(k);
        return [
            ...props
        ];
    }
    const builtinPrototypes = [
        constructors.Object.prototype,
        constructors.Function.prototype,
        constructors.Array.prototype,
        constructors.Map.prototype,
        constructors.RegExp.prototype
    ];
    let current = obj;
    while(current && !builtinPrototypes.includes(current)){
        for (const key of [
            ...Object.getOwnPropertyNames(current),
            ...Object.getOwnPropertySymbols(current)
        ])if ('constructor' !== key) props.add(key);
        current = Object.getPrototypeOf(current);
    }
    return [
        ...props
    ];
}
function mockObject(options, object, mockExports = {}) {
    const { createMockInstance, globalConstructors, type } = options;
    const isSpyMode = 'autospy' === type;
    const processedRefs = new WeakMap();
    const deferredAssignments = [];
    const createFunctionMock = (fn)=>{
        const prototypeMembers = fn.prototype ? collectPrototypeMethods(fn.prototype) : [];
        return createMockInstance({
            name: fn.name,
            prototypeMembers,
            originalImplementation: isSpyMode ? fn : void 0,
            keepMembersImplementation: isSpyMode
        });
    };
    const processValue = (value)=>{
        if (null == value) return value;
        if ('object' != typeof value && 'function' != typeof value) return value;
        if (value._isMockFunction) return value;
        if ('object' == typeof value && processedRefs.has(value)) return processedRefs.get(value);
        if (isFunction(value)) {
            const mock = createFunctionMock(value);
            processProperties(value, mock);
            return mock;
        }
        if (Array.isArray(value)) {
            if (!isSpyMode) return [];
            return value.map(processValue);
        }
        if (isPlainObject(value)) {
            const result = {};
            processedRefs.set(value, result);
            processProperties(value, result);
            return result;
        }
        return value;
    };
    const processProperties = (source, target)=>{
        const props = getEnumerableProperties(source, globalConstructors);
        const isModule = 'Module' === getTypeName(source) || source.__esModule;
        for (const prop of props){
            if (isBuiltinReadonly(source, prop)) continue;
            const descriptor = Object.getOwnPropertyDescriptor(source, prop);
            if (!descriptor) continue;
            if (!isModule && descriptor.get) {
                try {
                    if (isSpyMode) Object.defineProperty(target, prop, descriptor);
                    else Object.defineProperty(target, prop, {
                        configurable: descriptor.configurable,
                        enumerable: descriptor.enumerable,
                        get: ()=>void 0,
                        set: descriptor.set ? ()=>void 0 : void 0
                    });
                } catch  {}
                continue;
            }
            const hasValue = 'value' in descriptor;
            const value = hasValue ? descriptor.value : void 0;
            const canInstallLazyProperty = !(isFunction(target) && 'prototype' === prop && value && 'object' == typeof value);
            if (!canInstallLazyProperty) {
                try {
                    target[prop] = processValue(value);
                } catch  {}
                continue;
            }
            try {
                let initialized = false;
                let mockedValue;
                const getSourceValue = ()=>hasValue ? value : source[prop];
                Object.defineProperty(target, prop, {
                    configurable: true,
                    enumerable: true,
                    get: ()=>{
                        if (!initialized) {
                            initialized = true;
                            try {
                                mockedValue = processValue(getSourceValue());
                            } catch  {
                                mockedValue = void 0;
                            }
                        }
                        return mockedValue;
                    },
                    set: (newValue)=>{
                        initialized = true;
                        mockedValue = newValue;
                    }
                });
            } catch  {}
        }
    };
    processedRefs.set(object, mockExports);
    processProperties(object, mockExports);
    for (const assign of deferredAssignments)assign();
    return mockExports;
}
const spy_isMockFunction = (fn)=>'function' == typeof fn && '_isMockFunction' in fn && fn._isMockFunction;
const initSpy = ()=>{
    let callOrder = 0;
    const mocks = new Set();
    const wrapSpy = (obj, methodName, mockFn)=>{
        const spyImpl = M(obj, methodName, mockFn);
        const spyFn = spyImpl;
        let mockImplementationOnce = [];
        let implementation = mockFn;
        let mockName = mockFn?.name;
        const initMockState = ()=>({
                instances: [],
                contexts: [],
                invocationCallOrder: []
            });
        let mockState = initMockState();
        const spyState = T(spyImpl);
        spyFn.getMockName = ()=>mockName || methodName;
        spyFn.mockName = (name)=>{
            mockName = name;
            return spyFn;
        };
        spyFn.getMockImplementation = ()=>mockImplementationOnce.length ? mockImplementationOnce[mockImplementationOnce.length - 1] : implementation;
        function withImplementation(fn, cb) {
            const originalImplementation = implementation;
            const originalMockImplementationOnce = mockImplementationOnce;
            implementation = fn;
            mockImplementationOnce = [];
            spyState.willCall(willCall);
            const reset = ()=>{
                implementation = originalImplementation;
                mockImplementationOnce = originalMockImplementationOnce;
            };
            const result = cb();
            if (result instanceof Promise) return result.then(()=>{
                reset();
            });
            reset();
        }
        spyFn.withImplementation = withImplementation;
        spyFn.mockImplementation = (fn)=>{
            implementation = fn;
            return spyFn;
        };
        spyFn.mockImplementationOnce = (fn)=>{
            mockImplementationOnce.push(fn);
            return spyFn;
        };
        spyFn.mockReturnValue = (value)=>spyFn.mockImplementation(()=>value);
        spyFn.mockReturnValueOnce = (value)=>spyFn.mockImplementationOnce(()=>value);
        spyFn.mockResolvedValue = (value)=>spyFn.mockImplementation(()=>Promise.resolve(value));
        spyFn.mockResolvedValueOnce = (value)=>spyFn.mockImplementationOnce(()=>Promise.resolve(value));
        spyFn.mockRejectedValue = (value)=>spyFn.mockImplementation(()=>Promise.reject(value));
        spyFn.mockRejectedValueOnce = (value)=>spyFn.mockImplementationOnce(()=>Promise.reject(value));
        spyFn.mockReturnThis = ()=>spyFn.mockImplementation(function() {
                return this;
            });
        function willCall(...args) {
            let impl = implementation || spyState.getOriginal();
            mockState.instances.push(this);
            mockState.contexts.push(this);
            mockState.invocationCallOrder.push(++callOrder);
            if (mockImplementationOnce.length) impl = mockImplementationOnce.shift();
            return impl?.apply(this, args);
        }
        spyState.willCall(willCall);
        Object.defineProperty(spyFn, 'mock', {
            get: ()=>({
                    get calls () {
                        return spyState.calls;
                    },
                    get lastCall () {
                        return spyState.calls[spyState.callCount - 1];
                    },
                    get instances () {
                        return mockState.instances;
                    },
                    get contexts () {
                        return mockState.contexts;
                    },
                    get invocationCallOrder () {
                        return mockState.invocationCallOrder;
                    },
                    get results () {
                        return spyState.results.map(([resultType, value])=>{
                            const type = 'error' === resultType ? 'throw' : 'return';
                            return {
                                type: type,
                                value
                            };
                        });
                    },
                    get settledResults () {
                        return spyState.resolves.map(([resultType, value])=>{
                            const type = 'error' === resultType ? 'rejected' : 'fulfilled';
                            return {
                                type,
                                value
                            };
                        });
                    }
                })
        });
        spyFn.mockClear = ()=>{
            mockState = initMockState();
            spyState.reset();
            return spyFn;
        };
        spyFn.mockReset = ()=>{
            spyFn.mockClear();
            implementation = mockFn;
            mockImplementationOnce = [];
            return spyFn;
        };
        spyFn.mockRestore = ()=>{
            spyFn.mockReset();
            spyState.restore();
            mockName = mockFn?.name;
        };
        if (Symbol.dispose) Object.defineProperty(spyFn, Symbol.dispose, {
            value: ()=>{
                spyFn.mockRestore();
            },
            configurable: true
        });
        mocks.add(spyFn);
        return spyFn;
    };
    const fn = (mockFn)=>{
        const defaultName = 'rstest.fn()';
        return wrapSpy({
            [defaultName]: mockFn
        }, defaultName, mockFn);
    };
    const spyOn = (obj, methodName, accessType)=>{
        if (accessType) {
            const descriptor = Object.getOwnPropertyDescriptor(obj, methodName);
            const accessor = 'get' === accessType ? Reflect.get(descriptor ?? {}, 'get') : Reflect.get(descriptor ?? {}, 'set');
            if ('function' == typeof accessor && spy_isMockFunction(accessor)) return accessor;
        } else {
            const method = obj[methodName];
            if (spy_isMockFunction(method)) return method;
        }
        const accessTypeMap = {
            get: 'getter',
            set: 'setter'
        };
        const method = accessType ? {
            [accessTypeMap[accessType]]: methodName
        } : methodName;
        return wrapSpy(obj, method);
    };
    const createMockInstance = (options)=>{
        const { name, originalImplementation, prototypeMembers = [], keepMembersImplementation = false } = options || {};
        const mockName = name ? String(name) : 'rstest.fn()';
        const isClass = originalImplementation && /^class\s/.test(Function.prototype.toString.call(originalImplementation));
        if (isClass && originalImplementation) {
            const classWrapper = function(...args) {
                const instance = Reflect.construct(originalImplementation, args, new.target || originalImplementation);
                if (keepMembersImplementation && prototypeMembers.length > 0) for (const memberName of prototypeMembers){
                    const originalMethod = instance[memberName];
                    if ('function' == typeof originalMethod) {
                        const methodSpy = wrapSpy(instance, memberName, originalMethod.bind(instance));
                        instance[memberName] = methodSpy;
                    }
                }
                return instance;
            };
            Object.defineProperty(classWrapper, 'name', {
                value: mockName,
                configurable: true
            });
            classWrapper.prototype = originalImplementation.prototype;
            const mock = wrapSpy({
                [mockName]: classWrapper
            }, mockName, classWrapper);
            Object.setPrototypeOf(mock, Function.prototype);
            mock.prototype = originalImplementation.prototype;
            return mock;
        }
        const mock = wrapSpy({
            [mockName]: originalImplementation
        }, mockName, originalImplementation);
        if (prototypeMembers.length > 0 && originalImplementation?.prototype) Object.setPrototypeOf(mock.prototype, originalImplementation.prototype);
        return mock;
    };
    return {
        isMockFunction: spy_isMockFunction,
        spyOn,
        fn,
        mocks,
        createMockInstance
    };
};
const DEFAULT_WAIT_TIMEOUT = 1000;
const DEFAULT_WAIT_INTERVAL = 50;
const getRealSetTimeout = ()=>getRealTimers().setTimeout ?? globalThis.setTimeout.bind(globalThis);
const getRealClearTimeout = ()=>getRealTimers().clearTimeout ?? globalThis.clearTimeout.bind(globalThis);
const sleep = (ms)=>new Promise((resolve)=>getRealSetTimeout()(resolve, ms));
const createWaitForTimeoutError = (timeout, cause)=>new Error(`waitFor timed out in ${timeout}ms`, {
        cause
    });
const createWaitUntilTimeoutError = (timeout)=>new Error(`waitUntil timed out in ${timeout}ms`);
const normalizeWaitOptions = (options)=>({
        timeout: Math.max(0, 'number' == typeof options ? options : options?.timeout ?? DEFAULT_WAIT_TIMEOUT),
        interval: Math.max(0, 'number' == typeof options ? DEFAULT_WAIT_INTERVAL : options?.interval ?? DEFAULT_WAIT_INTERVAL)
    });
const createUntransformedRuntimeApiError = (apiName)=>new Error(`[Rstest] rs.${apiName}() must be called as rstest.${apiName}() or rs.${apiName}() so Rstest can transform it. Import aliases are not supported for module mock APIs.`);
const createPluginManagedApi = (apiName)=>()=>{
        throw createUntransformedRuntimeApiError(apiName);
    };
const restoreScopedEntry = (stack, entry, handlers)=>{
    if (!stack) return;
    const index = stack.lastIndexOf(entry);
    if (-1 === index) return;
    if (index !== stack.length - 1) {
        handlers.onSupersede(stack[index + 1]);
        stack.splice(index, 1);
        return;
    }
    stack.pop();
    handlers.onTail();
    if (0 === stack.length) handlers.onEmpty?.();
};
const createRstestUtilities = async (workerState)=>{
    const RSTEST_ENV_SYMBOL = Symbol.for(RSTEST_ENV_SYMBOL_KEY);
    const originalEnvValues = new Map();
    const originalGlobalValues = new Map();
    const timerStack = [];
    const { FakeTimers } = await import("./0~fake-timers.js");
    let _timers;
    let currentFakeTimersConfig;
    let originalConfig;
    const resolveRuntimeEnv = ()=>{
        const globalRef = globalThis;
        const runtimeEnv = globalRef[RSTEST_ENV_SYMBOL];
        if (runtimeEnv && 'object' == typeof runtimeEnv) return runtimeEnv;
        if ("u" > typeof process && process.env) return process.env;
        const createdEnv = {};
        globalRef[RSTEST_ENV_SYMBOL] = createdEnv;
        return createdEnv;
    };
    const timers = ()=>{
        if (!_timers) _timers = new FakeTimers({
            global: globalThis
        });
        return _timers;
    };
    const createDisposableRstestUtilities = (dispose)=>{
        let disposed = false;
        const disposers = [
            dispose
        ];
        const disposableRstest = Object.create(rstest);
        const addDisposable = (next)=>{
            if (Symbol.dispose) disposers.push(()=>next[Symbol.dispose]());
            return disposableRstest;
        };
        disposableRstest.stubEnv = (name, value)=>addDisposable(rstest.stubEnv(name, value));
        disposableRstest.stubGlobal = (name, value)=>addDisposable(rstest.stubGlobal(name, value));
        disposableRstest.useFakeTimers = (opts)=>addDisposable(rstest.useFakeTimers(opts));
        if (Symbol.dispose) Object.defineProperty(disposableRstest, Symbol.dispose, {
            configurable: true,
            value: ()=>{
                if (!disposed) {
                    disposed = true;
                    for(let index = disposers.length - 1; index >= 0; index--)disposers[index]?.();
                }
            }
        });
        return disposableRstest;
    };
    const restoreEnvValue = (name, entry)=>{
        const runtimeEnv = resolveRuntimeEnv();
        restoreScopedEntry(originalEnvValues.get(name), entry, {
            onSupersede: (laterEntry)=>{
                laterEntry.value = entry.value;
            },
            onTail: ()=>{
                if (void 0 === entry.value) Reflect.deleteProperty(runtimeEnv, name);
                else runtimeEnv[name] = entry.value;
            },
            onEmpty: ()=>originalEnvValues.delete(name)
        });
    };
    const restoreGlobalValue = (name, entry)=>{
        restoreScopedEntry(originalGlobalValues.get(name), entry, {
            onSupersede: (laterEntry)=>{
                laterEntry.descriptor = entry.descriptor;
            },
            onTail: ()=>{
                if (entry.descriptor) Object.defineProperty(globalThis, name, entry.descriptor);
                else Reflect.deleteProperty(globalThis, name);
            },
            onEmpty: ()=>originalGlobalValues.delete(name)
        });
    };
    const restoreFakeTimers = (entry)=>{
        restoreScopedEntry(timerStack, entry, {
            onSupersede: (laterEntry)=>{
                laterEntry.config = entry.config;
                laterEntry.snapshot = entry.snapshot;
                laterEntry.wasFakeTimers = entry.wasFakeTimers;
            },
            onTail: ()=>{
                if (entry.wasFakeTimers) {
                    timers().useFakeTimers(entry.config);
                    if (entry.snapshot) timers().restore(entry.snapshot);
                    currentFakeTimersConfig = entry.config;
                } else {
                    timers().useRealTimers();
                    currentFakeTimersConfig = void 0;
                }
            }
        });
    };
    const { fn, spyOn, isMockFunction, mocks, createMockInstance } = initSpy();
    const rstest = {
        fn,
        spyOn,
        isMockFunction,
        mockObject: (value, options)=>mockObject({
                globalConstructors: {
                    Object,
                    Function,
                    Array,
                    Map,
                    RegExp
                },
                createMockInstance,
                type: options?.spy ? 'autospy' : 'automock'
            }, {
                value
            }, {}).value,
        mocked: (item)=>item,
        clearAllMocks: ()=>{
            for (const mock of mocks)mock.mockClear();
            return rstest;
        },
        resetAllMocks: ()=>{
            for (const mock of mocks)mock.mockReset();
            return rstest;
        },
        restoreAllMocks: ()=>{
            for (const mock of mocks)mock.mockRestore();
            return rstest;
        },
        mock: createPluginManagedApi('mock'),
        mockRequire: createPluginManagedApi('mockRequire'),
        doMock: createPluginManagedApi('doMock'),
        doMockRequire: createPluginManagedApi('doMockRequire'),
        unmock: createPluginManagedApi('unmock'),
        doUnmock: createPluginManagedApi('doUnmock'),
        unmockRequire: createPluginManagedApi('unmockRequire'),
        doUnmockRequire: createPluginManagedApi('doUnmockRequire'),
        importMock: createPluginManagedApi('importMock'),
        requireMock: createPluginManagedApi('requireMock'),
        importActual: createPluginManagedApi('importActual'),
        requireActual: createPluginManagedApi('requireActual'),
        resetModules: createPluginManagedApi('resetModules'),
        hoisted: createPluginManagedApi('hoisted'),
        setConfig: (config)=>{
            if (!originalConfig) originalConfig = {
                ...workerState.runtimeConfig
            };
            Object.assign(workerState.runtimeConfig, config);
        },
        getConfig: ()=>{
            const { testTimeout, hookTimeout, clearMocks, resetMocks, restoreMocks, maxConcurrency, retry } = workerState.runtimeConfig;
            return {
                testTimeout,
                hookTimeout,
                clearMocks,
                resetMocks,
                restoreMocks,
                maxConcurrency,
                retry
            };
        },
        resetConfig: ()=>{
            if (originalConfig) Object.assign(workerState.runtimeConfig, originalConfig);
        },
        stubEnv: (name, value)=>{
            const runtimeEnv = resolveRuntimeEnv();
            const envStack = originalEnvValues.get(name) ?? [];
            const entry = {
                value: runtimeEnv[name]
            };
            envStack.push(entry);
            originalEnvValues.set(name, envStack);
            if (void 0 === value) Reflect.deleteProperty(runtimeEnv, name);
            else runtimeEnv[name] = value;
            return createDisposableRstestUtilities(()=>restoreEnvValue(name, entry));
        },
        unstubAllEnvs: ()=>{
            const runtimeEnv = resolveRuntimeEnv();
            for (const [name, envStack] of originalEnvValues){
                const entry = envStack[0];
                if (entry) if (void 0 === entry.value) Reflect.deleteProperty(runtimeEnv, name);
                else runtimeEnv[name] = entry.value;
            }
            originalEnvValues.clear();
            return rstest;
        },
        stubGlobal: (name, value)=>{
            const descriptorStack = originalGlobalValues.get(name) ?? [];
            const entry = {
                descriptor: Object.getOwnPropertyDescriptor(globalThis, name)
            };
            descriptorStack.push(entry);
            originalGlobalValues.set(name, descriptorStack);
            Object.defineProperty(globalThis, name, {
                value,
                writable: true,
                configurable: true,
                enumerable: true
            });
            return createDisposableRstestUtilities(()=>restoreGlobalValue(name, entry));
        },
        unstubAllGlobals: ()=>{
            originalGlobalValues.forEach((descriptorStack, name)=>{
                const original = descriptorStack[0];
                if (!original) return;
                if (original.descriptor) Object.defineProperty(globalThis, name, original.descriptor);
                else Reflect.deleteProperty(globalThis, name);
            });
            originalGlobalValues.clear();
            return rstest;
        },
        useFakeTimers: (opts)=>{
            const timerApi = timers();
            const wasFakeTimers = timerApi.isFakeTimers();
            const entry = {
                config: currentFakeTimersConfig,
                snapshot: wasFakeTimers ? timerApi.snapshot() : void 0,
                wasFakeTimers
            };
            timerStack.push(entry);
            timerApi.useFakeTimers(opts);
            currentFakeTimersConfig = opts;
            return createDisposableRstestUtilities(()=>restoreFakeTimers(entry));
        },
        useRealTimers: ()=>{
            timers().useRealTimers();
            currentFakeTimersConfig = void 0;
            timerStack.length = 0;
            return rstest;
        },
        setSystemTime: (now)=>{
            timers().setSystemTime(now);
            return rstest;
        },
        getRealSystemTime: ()=>_timers ? timers().getRealSystemTime() : Date.now(),
        isFakeTimers: ()=>_timers ? timers().isFakeTimers() : false,
        runAllTimers: ()=>{
            timers().runAllTimers();
            return rstest;
        },
        runAllTimersAsync: async ()=>{
            await timers().runAllTimersAsync();
            return rstest;
        },
        runAllTicks: ()=>{
            timers().runAllTicks();
            return rstest;
        },
        runOnlyPendingTimers: ()=>{
            timers().runOnlyPendingTimers();
            return rstest;
        },
        runOnlyPendingTimersAsync: async ()=>{
            await timers().runOnlyPendingTimersAsync();
            return rstest;
        },
        advanceTimersByTime: (ms)=>{
            timers().advanceTimersByTime(ms);
            return rstest;
        },
        advanceTimersByTimeAsync: async (ms)=>{
            await timers().advanceTimersByTimeAsync(ms);
            return rstest;
        },
        advanceTimersToNextTimer: (steps)=>{
            timers().advanceTimersToNextTimer(steps);
            return rstest;
        },
        advanceTimersToNextTimerAsync: async (steps)=>{
            await timers().advanceTimersToNextTimerAsync(steps);
            return rstest;
        },
        advanceTimersToNextFrame: ()=>{
            timers().advanceTimersToNextFrame();
            return rstest;
        },
        getTimerCount: ()=>timers().getTimerCount(),
        clearAllTimers: ()=>{
            timers().clearAllTimers();
            return rstest;
        },
        waitFor: async (callback, options)=>{
            const { timeout, interval } = normalizeWaitOptions(options);
            const clearTimeoutFn = getRealClearTimeout();
            let timedOut = false;
            let lastError;
            const timeoutId = getRealSetTimeout()(()=>{
                timedOut = true;
            }, timeout);
            try {
                while(true){
                    if (timedOut) throw lastError ?? createWaitForTimeoutError(timeout);
                    try {
                        const value = await callback();
                        if (timedOut) throw lastError ?? createWaitForTimeoutError(timeout);
                        return value;
                    } catch (error) {
                        lastError = error;
                    }
                    if (timedOut) throw lastError ?? createWaitForTimeoutError(timeout);
                    await sleep(interval);
                }
            } finally{
                clearTimeoutFn(timeoutId);
            }
        },
        waitUntil: async (callback, options)=>{
            const { timeout, interval } = normalizeWaitOptions(options);
            const clearTimeoutFn = getRealClearTimeout();
            let timedOut = false;
            const timeoutId = getRealSetTimeout()(()=>{
                timedOut = true;
            }, timeout);
            try {
                while(true){
                    if (timedOut) throw createWaitUntilTimeoutError(timeout);
                    const value = await callback();
                    if (timedOut) throw createWaitUntilTimeoutError(timeout);
                    if (value) return value;
                    if (timedOut) throw createWaitUntilTimeoutError(timeout);
                    await sleep(interval);
                }
            } finally{
                clearTimeoutFn(timeoutId);
            }
        }
    };
    return rstest;
};
const createRstestRuntime = async (workerState, { taskContext })=>{
    const [{ runner, api: runnerAPI }, { SnapshotPlugin }] = await Promise.all([
        Promise.resolve(createRunner({
            workerState,
            taskContext
        })),
        import("./0~snapshot.js").then((m)=>m.snapshot_namespaceObject)
    ]);
    if (workerState.runtimeConfig.chaiConfig) setupChaiConfig(workerState.runtimeConfig.chaiConfig);
    const expect = createExpect({
        workerState,
        getCurrentTest: ()=>runner.getCurrentTest(),
        snapshotPlugin: SnapshotPlugin(workerState)
    });
    Object.defineProperty(globalThis, GLOBAL_EXPECT, {
        value: expect,
        writable: true,
        configurable: true
    });
    const rstest = await createRstestUtilities(workerState);
    const runtime = {
        runner,
        api: {
            ...runnerAPI,
            expect,
            assert: node_modules_chai_assert,
            rstest,
            rs: rstest
        }
    };
    globalThis.RSTEST_API = runtime.api;
    return runtime;
};
export { createRstestRuntime, dist_equals, iterableEquality, subsetEquality };
