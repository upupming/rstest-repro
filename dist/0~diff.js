import "node:module";
import { __webpack_require__ } from "./0~rslib-runtime.js";
import { format as dist_format, dist_plugins, node_u } from "./0~@vitest/pretty-format.js";
var diff_namespaceObject = {};
__webpack_require__.r(diff_namespaceObject);
__webpack_require__.d(diff_namespaceObject, {
    DIFF_DELETE: ()=>DIFF_DELETE,
    DIFF_EQUAL: ()=>DIFF_EQUAL,
    DIFF_INSERT: ()=>DIFF_INSERT,
    Diff: ()=>Diff,
    diff: ()=>diff_diff,
    diffLinesRaw: ()=>diffLinesRaw,
    diffLinesUnified: ()=>diffLinesUnified,
    diffLinesUnified2: ()=>diffLinesUnified2,
    diffStringsRaw: ()=>diffStringsRaw,
    diffStringsUnified: ()=>diffStringsUnified,
    getLabelPrinter: ()=>getLabelPrinter,
    printDiffOrStringify: ()=>printDiffOrStringify,
    replaceAsymmetricMatcher: ()=>replaceAsymmetricMatcher
});
const ansiColors = {
    bold: [
        '1',
        '22'
    ],
    dim: [
        '2',
        '22'
    ],
    italic: [
        '3',
        '23'
    ],
    underline: [
        '4',
        '24'
    ],
    inverse: [
        '7',
        '27'
    ],
    hidden: [
        '8',
        '28'
    ],
    strike: [
        '9',
        '29'
    ],
    black: [
        '30',
        '39'
    ],
    red: [
        '31',
        '39'
    ],
    green: [
        '32',
        '39'
    ],
    yellow: [
        '33',
        '39'
    ],
    blue: [
        '34',
        '39'
    ],
    magenta: [
        '35',
        '39'
    ],
    cyan: [
        '36',
        '39'
    ],
    white: [
        '37',
        '39'
    ],
    brightblack: [
        '30;1',
        '39'
    ],
    brightred: [
        '31;1',
        '39'
    ],
    brightgreen: [
        '32;1',
        '39'
    ],
    brightyellow: [
        '33;1',
        '39'
    ],
    brightblue: [
        '34;1',
        '39'
    ],
    brightmagenta: [
        '35;1',
        '39'
    ],
    brightcyan: [
        '36;1',
        '39'
    ],
    brightwhite: [
        '37;1',
        '39'
    ],
    grey: [
        '90',
        '39'
    ]
};
const styles = {
    special: 'cyan',
    number: 'yellow',
    bigint: 'yellow',
    boolean: 'yellow',
    undefined: 'grey',
    null: 'bold',
    string: 'green',
    symbol: 'green',
    date: 'magenta',
    regexp: 'red'
};
const truncator = '…';
function colorise(value, styleType) {
    const color = ansiColors[styles[styleType]] || ansiColors[styleType] || '';
    if (!color) return String(value);
    return `\u001b[${color[0]}m${String(value)}\u001b[${color[1]}m`;
}
function normaliseOptions({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate = 1 / 0, stylize = String } = {}, inspect) {
    const options = {
        showHidden: Boolean(showHidden),
        depth: Number(depth),
        colors: Boolean(colors),
        customInspect: Boolean(customInspect),
        showProxy: Boolean(showProxy),
        maxArrayLength: Number(maxArrayLength),
        breakLength: Number(breakLength),
        truncate: Number(truncate),
        seen,
        inspect,
        stylize
    };
    if (options.colors) options.stylize = colorise;
    return options;
}
function isHighSurrogate(char) {
    return char >= '\ud800' && char <= '\udbff';
}
function helpers_truncate(string, length, tail = truncator) {
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
function inspectList(list, options, inspectItem, separator = ', ') {
    inspectItem = inspectItem || options.inspect;
    const size = list.length;
    if (0 === size) return '';
    const originalLength = options.truncate;
    let output = '';
    let peek = '';
    let truncated = '';
    for(let i = 0; i < size; i += 1){
        const last = i + 1 === list.length;
        const secondToLast = i + 2 === list.length;
        truncated = `${truncator}(${list.length - i})`;
        const value = list[i];
        options.truncate = originalLength - output.length - (last ? 0 : separator.length);
        const string = peek || inspectItem(value, options) + (last ? '' : separator);
        const nextLength = output.length + string.length;
        const truncatedLength = nextLength + truncated.length;
        if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) break;
        if (!last && !secondToLast && truncatedLength > originalLength) break;
        peek = last ? '' : inspectItem(list[i + 1], options) + (secondToLast ? '' : separator);
        if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) break;
        output += string;
        if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
            truncated = `${truncator}(${list.length - i - 1})`;
            break;
        }
        truncated = '';
    }
    return `${output}${truncated}`;
}
function quoteComplexKey(key) {
    if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) return key;
    return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
function inspectProperty([key, value], options) {
    options.truncate -= 2;
    if ('string' == typeof key) key = quoteComplexKey(key);
    else if ('number' != typeof key) key = `[${options.inspect(key, options)}]`;
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key}: ${value}`;
}
function inspectArray(array, options) {
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return '[]';
    options.truncate -= 4;
    const listContents = inspectList(array, options);
    options.truncate -= listContents.length;
    let propertyContents = '';
    if (nonIndexProperties.length) propertyContents = inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, inspectProperty);
    return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ''} ]`;
}
const getArrayName = (array)=>{
    if ('function' == typeof Buffer && array instanceof Buffer) return 'Buffer';
    if (array[Symbol.toStringTag]) return array[Symbol.toStringTag];
    return array.constructor.name;
};
function inspectTypedArray(array, options) {
    const name = getArrayName(array);
    options.truncate -= name.length + 4;
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return `${name}[]`;
    let output = '';
    for(let i = 0; i < array.length; i++){
        const string = `${options.stylize(helpers_truncate(array[i], options.truncate), 'number')}${i === array.length - 1 ? '' : ', '}`;
        options.truncate -= string.length;
        if (array[i] !== array.length && options.truncate <= 3) {
            output += `…(${array.length - array[i] + 1})`;
            break;
        }
        output += string;
    }
    let propertyContents = '';
    if (nonIndexProperties.length) propertyContents = inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, inspectProperty);
    return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ''} ]`;
}
function inspectDate(dateObject, options) {
    const stringRepresentation = dateObject.toJSON();
    if (null === stringRepresentation) return 'Invalid Date';
    const split = stringRepresentation.split('T');
    const date = split[0];
    return options.stylize(`${date}T${helpers_truncate(split[1], options.truncate - date.length - 1)}`, 'date');
}
function inspectFunction(func, options) {
    const functionType = func[Symbol.toStringTag] || 'Function';
    const name = func.name;
    if (!name) return options.stylize(`[${functionType}]`, 'special');
    return options.stylize(`[${functionType} ${helpers_truncate(name, options.truncate - 11)}]`, 'special');
}
function inspectMapEntry([key, value], options) {
    options.truncate -= 4;
    key = options.inspect(key, options);
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key} => ${value}`;
}
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
function inspectMap(map, options) {
    if (0 === map.size) return 'Map{}';
    options.truncate -= 7;
    return `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry)} }`;
}
const number_isNaN = Number.isNaN || ((i)=>i !== i);
function inspectNumber(number, options) {
    if (number_isNaN(number)) return options.stylize('NaN', 'number');
    if (number === 1 / 0) return options.stylize('Infinity', 'number');
    if (number === -1 / 0) return options.stylize('-Infinity', 'number');
    if (0 === number) return options.stylize(1 / number === 1 / 0 ? '+0' : '-0', 'number');
    return options.stylize(helpers_truncate(String(number), options.truncate), 'number');
}
function inspectBigInt(number, options) {
    let nums = helpers_truncate(number.toString(), options.truncate - 1);
    if ("…" !== nums) nums += 'n';
    return options.stylize(nums, 'bigint');
}
function inspectRegExp(value, options) {
    const flags = value.toString().split('/')[2];
    const sourceLength = options.truncate - (2 + flags.length);
    const source = value.source;
    return options.stylize(`/${helpers_truncate(source, sourceLength)}/${flags}`, 'regexp');
}
function arrayFromSet(set) {
    const values = [];
    set.forEach((value)=>{
        values.push(value);
    });
    return values;
}
function inspectSet(set, options) {
    if (0 === set.size) return 'Set{}';
    options.truncate -= 7;
    return `Set{ ${inspectList(arrayFromSet(set), options)} }`;
}
const stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", 'g');
const escapeCharacters = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    "'": "\\'",
    '\\': '\\\\'
};
const hex = 16;
const unicodeLength = 4;
function string_escape(char) {
    return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
}
function inspectString(string, options) {
    if (stringEscapeChars.test(string)) string = string.replace(stringEscapeChars, string_escape);
    return options.stylize(`'${helpers_truncate(string, options.truncate - 2)}'`, 'string');
}
function inspectSymbol(value) {
    if ("description" in Symbol.prototype) return value.description ? `Symbol(${value.description})` : 'Symbol()';
    return value.toString();
}
let getPromiseValue = ()=>'Promise{…}';
try {
    const { getPromiseDetails, kPending, kRejected } = process.binding('util');
    if (Array.isArray(getPromiseDetails(Promise.resolve()))) getPromiseValue = (value, options)=>{
        const [state, innerValue] = getPromiseDetails(value);
        if (state === kPending) return 'Promise{<pending>}';
        return `Promise${state === kRejected ? '!' : ''}{${options.inspect(innerValue, options)}}`;
    };
} catch (notNode) {}
const promise = getPromiseValue;
function inspectObject(object, options) {
    const properties = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
    if (0 === properties.length && 0 === symbols.length) return '{}';
    options.truncate -= 4;
    options.seen = options.seen || [];
    if (options.seen.includes(object)) return '[Circular]';
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
    let sep = '';
    if (propertyContents && symbolContents) sep = ', ';
    return `{ ${propertyContents}${sep}${symbolContents} }`;
}
const toStringTag = "u" > typeof Symbol && Symbol.toStringTag ? Symbol.toStringTag : false;
function inspectClass(value, options) {
    let name = '';
    if (toStringTag && toStringTag in value) name = value[toStringTag];
    name = name || value.constructor.name;
    if (!name || '_class' === name) name = '<Anonymous Class>';
    options.truncate -= name.length;
    return `${name}${inspectObject(value, options)}`;
}
function inspectArguments(args, options) {
    if (0 === args.length) return 'Arguments[]';
    options.truncate -= 13;
    return `Arguments[ ${inspectList(args, options)} ]`;
}
const errorKeys = [
    'stack',
    'line',
    'column',
    'name',
    'message',
    'fileName',
    'lineNumber',
    'columnNumber',
    'number',
    "description",
    'cause'
];
function error_inspectObject(error, options) {
    const properties = Object.getOwnPropertyNames(error).filter((key)=>-1 === errorKeys.indexOf(key));
    const name = error.name;
    options.truncate -= name.length;
    let message = '';
    if ('string' == typeof error.message) message = helpers_truncate(error.message, options.truncate);
    else properties.unshift('message');
    message = message ? `: ${message}` : '';
    options.truncate -= message.length + 5;
    options.seen = options.seen || [];
    if (options.seen.includes(error)) return '[Circular]';
    options.seen.push(error);
    const propertyContents = inspectList(properties.map((key)=>[
            key,
            error[key]
        ]), options, inspectProperty);
    return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ''}`;
}
function inspectAttribute([key, value], options) {
    options.truncate -= 3;
    if (!value) return `${options.stylize(String(key), 'yellow')}`;
    return `${options.stylize(String(key), 'yellow')}=${options.stylize(`"${value}"`, 'string')}`;
}
function inspectNodeCollection(collection, options) {
    return inspectList(collection, options, inspectNode, '\n');
}
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
function inspectHTML(element, options) {
    const properties = element.getAttributeNames();
    const name = element.tagName.toLowerCase();
    const head = options.stylize(`<${name}`, 'special');
    const headClose = options.stylize(">", 'special');
    const tail = options.stylize(`</${name}>`, 'special');
    options.truncate -= 2 * name.length + 5;
    let propertyContents = '';
    if (properties.length > 0) {
        propertyContents += ' ';
        propertyContents += inspectList(properties.map((key)=>[
                key,
                element.getAttribute(key)
            ]), options, inspectAttribute, ' ');
    }
    options.truncate -= propertyContents.length;
    const truncate = options.truncate;
    let children = inspectNodeCollection(element.children, options);
    if (children && children.length > truncate) children = `…(${element.children.length})`;
    return `${head}${propertyContents}${headClose}${children}${tail}`;
}
const symbolsSupported = 'function' == typeof Symbol && 'function' == typeof Symbol.for;
const chaiInspect = symbolsSupported ? Symbol.for('chai/inspect') : '@@chai/inspect';
const nodeInspect = Symbol.for('nodejs.util.inspect.custom');
const constructorMap = new WeakMap();
const stringTagMap = {};
const baseTypesMap = {
    undefined: (value, options)=>options.stylize('undefined', 'undefined'),
    null: (value, options)=>options.stylize('null', 'null'),
    boolean: (value, options)=>options.stylize(String(value), 'boolean'),
    Boolean: (value, options)=>options.stylize(String(value), 'boolean'),
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
    Promise: promise,
    WeakSet: (value, options)=>options.stylize('WeakSet{…}', 'special'),
    WeakMap: (value, options)=>options.stylize('WeakMap{…}', 'special'),
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
    Generator: ()=>'',
    DataView: ()=>'',
    ArrayBuffer: ()=>'',
    Error: error_inspectObject,
    HTMLCollection: inspectNodeCollection,
    NodeList: inspectNodeCollection
};
const inspectCustom = (value, options, type)=>{
    if (chaiInspect in value && 'function' == typeof value[chaiInspect]) return value[chaiInspect](options);
    if (nodeInspect in value && 'function' == typeof value[nodeInspect]) return value[nodeInspect](options.depth, options);
    if ('inspect' in value && 'function' == typeof value.inspect) return value.inspect(options.depth, options);
    if ('constructor' in value && constructorMap.has(value.constructor)) return constructorMap.get(value.constructor)(value, options);
    if (stringTagMap[type]) return stringTagMap[type](value, options);
    return '';
};
const lib_toString = Object.prototype.toString;
function lib_inspect(value, opts = {}) {
    const options = normaliseOptions(opts, lib_inspect);
    const { customInspect } = options;
    let type = null === value ? 'null' : typeof value;
    if ('object' === type) type = lib_toString.call(value).slice(8, -1);
    if (type in baseTypesMap) return baseTypesMap[type](value, options);
    if (customInspect && value) {
        const output = inspectCustom(value, options, type);
        if (output) {
            if ('string' == typeof output) return output;
            return lib_inspect(output, options);
        }
    }
    const proto = value ? Object.getPrototypeOf(value) : false;
    if (proto === Object.prototype || null === proto) return inspectObject(value, options);
    if (value && 'function' == typeof HTMLElement && value instanceof HTMLElement) return inspectHTML(value, options);
    if ('constructor' in value) {
        if (value.constructor !== Object) return inspectClass(value, options);
        return inspectObject(value, options);
    }
    if (value === Object(value)) return inspectObject(value, options);
    return options.stylize(String(value), type);
}
const { AsymmetricMatcher: AsymmetricMatcher, DOMCollection: DOMCollection, DOMElement: DOMElement, Immutable: Immutable, ReactElement: ReactElement, ReactTestComponent: ReactTestComponent } = dist_plugins;
const PLUGINS = [
    ReactTestComponent,
    ReactElement,
    DOMElement,
    DOMCollection,
    Immutable,
    AsymmetricMatcher
];
function stringify(object, maxDepth = 10, { maxLength, ...options } = {}) {
    const MAX_LENGTH = maxLength ?? 1e4;
    let result;
    try {
        result = dist_format(object, {
            maxDepth,
            escapeString: false,
            plugins: PLUGINS,
            ...options
        });
    } catch  {
        result = dist_format(object, {
            callToJSON: false,
            maxDepth,
            escapeString: false,
            plugins: PLUGINS,
            ...options
        });
    }
    return result.length >= MAX_LENGTH && maxDepth > 1 ? stringify(object, Math.floor(Math.min(maxDepth, Number.MAX_SAFE_INTEGER) / 2), {
        maxLength,
        ...options
    }) : result;
}
const formatRegExp = /%[sdjifoOc%]/g;
function format(...args) {
    if ("string" != typeof args[0]) {
        const objects = [];
        for(let i = 0; i < args.length; i++)objects.push(chunk_commonjsHelpers_inspect(args[i], {
            depth: 0,
            colors: false
        }));
        return objects.join(" ");
    }
    const len = args.length;
    let i = 1;
    const template = args[0];
    let str = String(template).replace(formatRegExp, (x)=>{
        if ("%%" === x) return "%";
        if (i >= len) return x;
        switch(x){
            case "%s":
                {
                    const value = args[i++];
                    if ("bigint" == typeof value) return `${value.toString()}n`;
                    if ("number" == typeof value && 0 === value && 1 / value < 0) return "-0";
                    if ("object" == typeof value && null !== value) {
                        if ("function" == typeof value.toString && value.toString !== Object.prototype.toString) return value.toString();
                        return chunk_commonjsHelpers_inspect(value, {
                            depth: 0,
                            colors: false
                        });
                    }
                    return String(value);
                }
            case "%d":
                {
                    const value = args[i++];
                    if ("bigint" == typeof value) return `${value.toString()}n`;
                    return Number(value).toString();
                }
            case "%i":
                {
                    const value = args[i++];
                    if ("bigint" == typeof value) return `${value.toString()}n`;
                    return Number.parseInt(String(value)).toString();
                }
            case "%f":
                return Number.parseFloat(String(args[i++])).toString();
            case "%o":
                return chunk_commonjsHelpers_inspect(args[i++], {
                    showHidden: true,
                    showProxy: true
                });
            case "%O":
                return chunk_commonjsHelpers_inspect(args[i++]);
            case "%c":
                i++;
                return "";
            case "%j":
                try {
                    return JSON.stringify(args[i++]);
                } catch (err) {
                    const m = err.message;
                    if (m.includes("circular structure") || m.includes("cyclic structures") || m.includes("cyclic object")) return "[Circular]";
                    throw err;
                }
            default:
                return x;
        }
    });
    for(let x = args[i]; i < len; x = args[++i])if (null === x || "object" != typeof x) str += ` ${x}`;
    else str += ` ${chunk_commonjsHelpers_inspect(x)}`;
    return str;
}
function chunk_commonjsHelpers_inspect(obj, options = {}) {
    if (0 === options.truncate) options.truncate = 1 / 0;
    return lib_inspect(obj, options);
}
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
function assertTypes(value, name, types) {
    const receivedType = typeof value;
    const pass = types.includes(receivedType);
    if (!pass) throw new TypeError(`${name} value must be ${types.join(" or ")}, received "${receivedType}"`);
}
function isObject(item) {
    return null != item && "object" == typeof item && !Array.isArray(item);
}
function isFinalObj(obj) {
    return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function getType(value) {
    return Object.prototype.toString.apply(value).slice(8, -1);
}
function collectOwnProperties(obj, collector) {
    const collect = "function" == typeof collector ? collector : (key)=>collector.add(key);
    Object.getOwnPropertyNames(obj).forEach(collect);
    Object.getOwnPropertySymbols(obj).forEach(collect);
}
function getOwnProperties(obj) {
    const ownProps = new Set();
    if (isFinalObj(obj)) return [];
    collectOwnProperties(obj, ownProps);
    return Array.from(ownProps);
}
const defaultCloneOptions = {
    forceWritable: false
};
function deepClone(val, options = defaultCloneOptions) {
    const seen = new WeakMap();
    return clone(val, seen, options);
}
function clone(val, seen, options = defaultCloneOptions) {
    let k, out;
    if (seen.has(val)) return seen.get(val);
    if (Array.isArray(val)) {
        out = Array.from({
            length: k = val.length
        });
        seen.set(val, out);
        while(k--)out[k] = clone(val[k], seen, options);
        return out;
    }
    if ("[object Object]" === Object.prototype.toString.call(val)) {
        out = Object.create(Object.getPrototypeOf(val));
        seen.set(val, out);
        const props = getOwnProperties(val);
        for (const k of props){
            const descriptor = Object.getOwnPropertyDescriptor(val, k);
            if (!descriptor) continue;
            const cloned = clone(val[k], seen, options);
            if (options.forceWritable) Object.defineProperty(out, k, {
                enumerable: descriptor.enumerable,
                configurable: true,
                writable: true,
                value: cloned
            });
            else if ("get" in descriptor) Object.defineProperty(out, k, {
                ...descriptor,
                get () {
                    return cloned;
                }
            });
            else Object.defineProperty(out, k, {
                ...descriptor,
                value: cloned
            });
        }
        return out;
    }
    return val;
}
function noop() {}
const DIFF_DELETE = -1;
const DIFF_INSERT = 1;
const DIFF_EQUAL = 0;
class Diff {
    0;
    1;
    constructor(op, text){
        this[0] = op;
        this[1] = text;
    }
}
function diff_commonPrefix(text1, text2) {
    if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) return 0;
    let pointermin = 0;
    let pointermax = Math.min(text1.length, text2.length);
    let pointermid = pointermax;
    let pointerstart = 0;
    while(pointermin < pointermid){
        if (text1.substring(pointerstart, pointermid) === text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
        } else pointermax = pointermid;
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
}
function diff_commonSuffix(text1, text2) {
    if (!text1 || !text2 || text1.charAt(text1.length - 1) !== text2.charAt(text2.length - 1)) return 0;
    let pointermin = 0;
    let pointermax = Math.min(text1.length, text2.length);
    let pointermid = pointermax;
    let pointerend = 0;
    while(pointermin < pointermid){
        if (text1.substring(text1.length - pointermid, text1.length - pointerend) === text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
        } else pointermax = pointermid;
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
}
function diff_commonOverlap_(text1, text2) {
    const text1_length = text1.length;
    const text2_length = text2.length;
    if (0 === text1_length || 0 === text2_length) return 0;
    if (text1_length > text2_length) text1 = text1.substring(text1_length - text2_length);
    else if (text1_length < text2_length) text2 = text2.substring(0, text1_length);
    const text_length = Math.min(text1_length, text2_length);
    if (text1 === text2) return text_length;
    let best = 0;
    let length = 1;
    while(true){
        const pattern = text1.substring(text_length - length);
        const found = text2.indexOf(pattern);
        if (-1 === found) return best;
        length += found;
        if (0 === found || text1.substring(text_length - length) === text2.substring(0, length)) {
            best = length;
            length++;
        }
    }
}
function diff_cleanupSemantic(diffs) {
    let changes = false;
    const equalities = [];
    let equalitiesLength = 0;
    let lastEquality = null;
    let pointer = 0;
    let length_insertions1 = 0;
    let length_deletions1 = 0;
    let length_insertions2 = 0;
    let length_deletions2 = 0;
    while(pointer < diffs.length){
        if (diffs[pointer][0] === DIFF_EQUAL) {
            equalities[equalitiesLength++] = pointer;
            length_insertions1 = length_insertions2;
            length_deletions1 = length_deletions2;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = diffs[pointer][1];
        } else {
            if (diffs[pointer][0] === DIFF_INSERT) length_insertions2 += diffs[pointer][1].length;
            else length_deletions2 += diffs[pointer][1].length;
            if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2)) {
                diffs.splice(equalities[equalitiesLength - 1], 0, new Diff(DIFF_DELETE, lastEquality));
                diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
                equalitiesLength--;
                equalitiesLength--;
                pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                length_insertions1 = 0;
                length_deletions1 = 0;
                length_insertions2 = 0;
                length_deletions2 = 0;
                lastEquality = null;
                changes = true;
            }
        }
        pointer++;
    }
    if (changes) diff_cleanupMerge(diffs);
    diff_cleanupSemanticLossless(diffs);
    pointer = 1;
    while(pointer < diffs.length){
        if (diffs[pointer - 1][0] === DIFF_DELETE && diffs[pointer][0] === DIFF_INSERT) {
            const deletion = diffs[pointer - 1][1];
            const insertion = diffs[pointer][1];
            const overlap_length1 = diff_commonOverlap_(deletion, insertion);
            const overlap_length2 = diff_commonOverlap_(insertion, deletion);
            if (overlap_length1 >= overlap_length2) {
                if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                    diffs.splice(pointer, 0, new Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1)));
                    diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
                    diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                    pointer++;
                }
            } else if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                diffs.splice(pointer, 0, new Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2)));
                diffs[pointer - 1][0] = DIFF_INSERT;
                diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
                diffs[pointer + 1][0] = DIFF_DELETE;
                diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                pointer++;
            }
            pointer++;
        }
        pointer++;
    }
}
const nonAlphaNumericRegex_ = /[^a-z0-9]/i;
const whitespaceRegex_ = /\s/;
const linebreakRegex_ = /[\r\n]/;
const blanklineEndRegex_ = /\n\r?\n$/;
const blanklineStartRegex_ = /^\r?\n\r?\n/;
function diff_cleanupSemanticLossless(diffs) {
    let pointer = 1;
    while(pointer < diffs.length - 1){
        if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
            let equality1 = diffs[pointer - 1][1];
            let edit = diffs[pointer][1];
            let equality2 = diffs[pointer + 1][1];
            const commonOffset = diff_commonSuffix(equality1, edit);
            if (commonOffset) {
                const commonString = edit.substring(edit.length - commonOffset);
                equality1 = equality1.substring(0, equality1.length - commonOffset);
                edit = commonString + edit.substring(0, edit.length - commonOffset);
                equality2 = commonString + equality2;
            }
            let bestEquality1 = equality1;
            let bestEdit = edit;
            let bestEquality2 = equality2;
            let bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            while(edit.charAt(0) === equality2.charAt(0)){
                equality1 += edit.charAt(0);
                edit = edit.substring(1) + equality2.charAt(0);
                equality2 = equality2.substring(1);
                const score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
                if (score >= bestScore) {
                    bestScore = score;
                    bestEquality1 = equality1;
                    bestEdit = edit;
                    bestEquality2 = equality2;
                }
            }
            if (diffs[pointer - 1][1] !== bestEquality1) {
                if (bestEquality1) diffs[pointer - 1][1] = bestEquality1;
                else {
                    diffs.splice(pointer - 1, 1);
                    pointer--;
                }
                diffs[pointer][1] = bestEdit;
                if (bestEquality2) diffs[pointer + 1][1] = bestEquality2;
                else {
                    diffs.splice(pointer + 1, 1);
                    pointer--;
                }
            }
        }
        pointer++;
    }
}
function diff_cleanupMerge(diffs) {
    diffs.push(new Diff(DIFF_EQUAL, ""));
    let pointer = 0;
    let count_delete = 0;
    let count_insert = 0;
    let text_delete = "";
    let text_insert = "";
    let commonlength;
    while(pointer < diffs.length)switch(diffs[pointer][0]){
        case DIFF_INSERT:
            count_insert++;
            text_insert += diffs[pointer][1];
            pointer++;
            break;
        case DIFF_DELETE:
            count_delete++;
            text_delete += diffs[pointer][1];
            pointer++;
            break;
        case DIFF_EQUAL:
            if (count_delete + count_insert > 1) {
                if (0 !== count_delete && 0 !== count_insert) {
                    commonlength = diff_commonPrefix(text_insert, text_delete);
                    if (0 !== commonlength) {
                        if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] === DIFF_EQUAL) diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                        else {
                            diffs.splice(0, 0, new Diff(DIFF_EQUAL, text_insert.substring(0, commonlength)));
                            pointer++;
                        }
                        text_insert = text_insert.substring(commonlength);
                        text_delete = text_delete.substring(commonlength);
                    }
                    commonlength = diff_commonSuffix(text_insert, text_delete);
                    if (0 !== commonlength) {
                        diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                        text_insert = text_insert.substring(0, text_insert.length - commonlength);
                        text_delete = text_delete.substring(0, text_delete.length - commonlength);
                    }
                }
                pointer -= count_delete + count_insert;
                diffs.splice(pointer, count_delete + count_insert);
                if (text_delete.length) {
                    diffs.splice(pointer, 0, new Diff(DIFF_DELETE, text_delete));
                    pointer++;
                }
                if (text_insert.length) {
                    diffs.splice(pointer, 0, new Diff(DIFF_INSERT, text_insert));
                    pointer++;
                }
                pointer++;
            } else if (0 !== pointer && diffs[pointer - 1][0] === DIFF_EQUAL) {
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
            } else pointer++;
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
    }
    if ("" === diffs[diffs.length - 1][1]) diffs.pop();
    let changes = false;
    pointer = 1;
    while(pointer < diffs.length - 1){
        if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
            if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
                diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
                diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
                diffs.splice(pointer - 1, 1);
                changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) === diffs[pointer + 1][1]) {
                diffs[pointer - 1][1] += diffs[pointer + 1][1];
                diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
                diffs.splice(pointer + 1, 1);
                changes = true;
            }
        }
        pointer++;
    }
    if (changes) diff_cleanupMerge(diffs);
}
function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) return 6;
    const char1 = one.charAt(one.length - 1);
    const char2 = two.charAt(0);
    const nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
    const nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
    const whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
    const whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
    const lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
    const lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
    const blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
    const blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);
    if (blankLine1 || blankLine2) return 5;
    if (lineBreak1 || lineBreak2) return 4;
    if (nonAlphaNumeric1 && !whitespace1 && whitespace2) return 3;
    if (whitespace1 || whitespace2) return 2;
    if (nonAlphaNumeric1 || nonAlphaNumeric2) return 1;
    return 0;
}
const NO_DIFF_MESSAGE = "Compared values have no visual difference.";
const SIMILAR_MESSAGE = "Compared values serialize to the same structure.\nPrinting internal object structure without calling `toJSON` instead.";
var build = {};
var hasRequiredBuild;
function requireBuild() {
    if (hasRequiredBuild) return build;
    hasRequiredBuild = 1;
    Object.defineProperty(build, '__esModule', {
        value: true
    });
    build.default = diffSequence;
    const pkg = 'diff-sequences';
    const NOT_YET_SET = 0;
    const countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon)=>{
        let nCommon = 0;
        while(aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex)){
            aIndex += 1;
            bIndex += 1;
            nCommon += 1;
        }
        return nCommon;
    };
    const countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon)=>{
        let nCommon = 0;
        while(aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex)){
            aIndex -= 1;
            bIndex -= 1;
            nCommon += 1;
        }
        return nCommon;
    };
    const extendPathsF = (d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF)=>{
        let iF = 0;
        let kF = -d;
        let aFirst = aIndexesF[iF];
        let aIndexPrev1 = aFirst;
        aIndexesF[iF] += countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
        const nF = d < iMaxF ? d : iMaxF;
        for(iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2){
            if (iF !== d && aIndexPrev1 < aIndexesF[iF]) aFirst = aIndexesF[iF];
            else {
                aFirst = aIndexPrev1 + 1;
                if (aEnd <= aFirst) return iF - 1;
            }
            aIndexPrev1 = aIndexesF[iF];
            aIndexesF[iF] = aFirst + countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
        }
        return iMaxF;
    };
    const extendPathsR = (d, aStart, bStart, bR, isCommon, aIndexesR, iMaxR)=>{
        let iR = 0;
        let kR = d;
        let aFirst = aIndexesR[iR];
        let aIndexPrev1 = aFirst;
        aIndexesR[iR] -= countCommonItemsR(aStart, aFirst - 1, bStart, bR + aFirst - kR - 1, isCommon);
        const nR = d < iMaxR ? d : iMaxR;
        for(iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2){
            if (iR !== d && aIndexesR[iR] < aIndexPrev1) aFirst = aIndexesR[iR];
            else {
                aFirst = aIndexPrev1 - 1;
                if (aFirst < aStart) return iR - 1;
            }
            aIndexPrev1 = aIndexesR[iR];
            aIndexesR[iR] = aFirst - countCommonItemsR(aStart, aFirst - 1, bStart, bR + aFirst - kR - 1, isCommon);
        }
        return iMaxR;
    };
    const extendOverlappablePathsF = (d, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)=>{
        const bF = bStart - aStart;
        const aLength = aEnd - aStart;
        const bLength = bEnd - bStart;
        const baDeltaLength = bLength - aLength;
        const kMinOverlapF = -baDeltaLength - (d - 1);
        const kMaxOverlapF = -baDeltaLength + (d - 1);
        let aIndexPrev1 = NOT_YET_SET;
        const nF = d < iMaxF ? d : iMaxF;
        for(let iF = 0, kF = -d; iF <= nF; iF += 1, kF += 2){
            const insert = 0 === iF || iF !== d && aIndexPrev1 < aIndexesF[iF];
            const aLastPrev = insert ? aIndexesF[iF] : aIndexPrev1;
            const aFirst = insert ? aLastPrev : aLastPrev + 1;
            const bFirst = bF + aFirst - kF;
            const nCommonF = countCommonItemsF(aFirst + 1, aEnd, bFirst + 1, bEnd, isCommon);
            const aLast = aFirst + nCommonF;
            aIndexPrev1 = aIndexesF[iF];
            aIndexesF[iF] = aLast;
            if (kMinOverlapF <= kF && kF <= kMaxOverlapF) {
                const iR = (d - 1 - (kF + baDeltaLength)) / 2;
                if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
                    const bLastPrev = bF + aLastPrev - (insert ? kF + 1 : kF - 1);
                    const nCommonR = countCommonItemsR(aStart, aLastPrev, bStart, bLastPrev, isCommon);
                    const aIndexPrevFirst = aLastPrev - nCommonR;
                    const bIndexPrevFirst = bLastPrev - nCommonR;
                    const aEndPreceding = aIndexPrevFirst + 1;
                    const bEndPreceding = bIndexPrevFirst + 1;
                    division.nChangePreceding = d - 1;
                    if (d - 1 === aEndPreceding + bEndPreceding - aStart - bStart) {
                        division.aEndPreceding = aStart;
                        division.bEndPreceding = bStart;
                    } else {
                        division.aEndPreceding = aEndPreceding;
                        division.bEndPreceding = bEndPreceding;
                    }
                    division.nCommonPreceding = nCommonR;
                    if (0 !== nCommonR) {
                        division.aCommonPreceding = aEndPreceding;
                        division.bCommonPreceding = bEndPreceding;
                    }
                    division.nCommonFollowing = nCommonF;
                    if (0 !== nCommonF) {
                        division.aCommonFollowing = aFirst + 1;
                        division.bCommonFollowing = bFirst + 1;
                    }
                    const aStartFollowing = aLast + 1;
                    const bStartFollowing = bFirst + nCommonF + 1;
                    division.nChangeFollowing = d - 1;
                    if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
                        division.aStartFollowing = aEnd;
                        division.bStartFollowing = bEnd;
                    } else {
                        division.aStartFollowing = aStartFollowing;
                        division.bStartFollowing = bStartFollowing;
                    }
                    return true;
                }
            }
        }
        return false;
    };
    const extendOverlappablePathsR = (d, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)=>{
        const bR = bEnd - aEnd;
        const aLength = aEnd - aStart;
        const bLength = bEnd - bStart;
        const baDeltaLength = bLength - aLength;
        const kMinOverlapR = baDeltaLength - d;
        const kMaxOverlapR = baDeltaLength + d;
        let aIndexPrev1 = NOT_YET_SET;
        const nR = d < iMaxR ? d : iMaxR;
        for(let iR = 0, kR = d; iR <= nR; iR += 1, kR -= 2){
            const insert = 0 === iR || iR !== d && aIndexesR[iR] < aIndexPrev1;
            const aLastPrev = insert ? aIndexesR[iR] : aIndexPrev1;
            const aFirst = insert ? aLastPrev : aLastPrev - 1;
            const bFirst = bR + aFirst - kR;
            const nCommonR = countCommonItemsR(aStart, aFirst - 1, bStart, bFirst - 1, isCommon);
            const aLast = aFirst - nCommonR;
            aIndexPrev1 = aIndexesR[iR];
            aIndexesR[iR] = aLast;
            if (kMinOverlapR <= kR && kR <= kMaxOverlapR) {
                const iF = (d + (kR - baDeltaLength)) / 2;
                if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
                    const bLast = bFirst - nCommonR;
                    division.nChangePreceding = d;
                    if (d === aLast + bLast - aStart - bStart) {
                        division.aEndPreceding = aStart;
                        division.bEndPreceding = bStart;
                    } else {
                        division.aEndPreceding = aLast;
                        division.bEndPreceding = bLast;
                    }
                    division.nCommonPreceding = nCommonR;
                    if (0 !== nCommonR) {
                        division.aCommonPreceding = aLast;
                        division.bCommonPreceding = bLast;
                    }
                    division.nChangeFollowing = d - 1;
                    if (1 === d) {
                        division.nCommonFollowing = 0;
                        division.aStartFollowing = aEnd;
                        division.bStartFollowing = bEnd;
                    } else {
                        const bLastPrev = bR + aLastPrev - (insert ? kR - 1 : kR + 1);
                        const nCommonF = countCommonItemsF(aLastPrev, aEnd, bLastPrev, bEnd, isCommon);
                        division.nCommonFollowing = nCommonF;
                        if (0 !== nCommonF) {
                            division.aCommonFollowing = aLastPrev;
                            division.bCommonFollowing = bLastPrev;
                        }
                        const aStartFollowing = aLastPrev + nCommonF;
                        const bStartFollowing = bLastPrev + nCommonF;
                        if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
                            division.aStartFollowing = aEnd;
                            division.bStartFollowing = bEnd;
                        } else {
                            division.aStartFollowing = aStartFollowing;
                            division.bStartFollowing = bStartFollowing;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    };
    const divide = (nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division)=>{
        const bF = bStart - aStart;
        const bR = bEnd - aEnd;
        const aLength = aEnd - aStart;
        const bLength = bEnd - bStart;
        const baDeltaLength = bLength - aLength;
        let iMaxF = aLength;
        let iMaxR = aLength;
        aIndexesF[0] = aStart - 1;
        aIndexesR[0] = aEnd;
        if (baDeltaLength % 2 === 0) {
            const dMin = (nChange || baDeltaLength) / 2;
            const dMax = (aLength + bLength) / 2;
            for(let d = 1; d <= dMax; d += 1){
                iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
                if (d < dMin) iMaxR = extendPathsR(d, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
                else if (extendOverlappablePathsR(d, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)) return;
            }
        } else {
            const dMin = ((nChange || baDeltaLength) + 1) / 2;
            const dMax = (aLength + bLength + 1) / 2;
            let d = 1;
            iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
            for(d += 1; d <= dMax; d += 1){
                iMaxR = extendPathsR(d - 1, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
                if (d < dMin) iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
                else if (extendOverlappablePathsF(d, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, iMaxF, aIndexesR, iMaxR, division)) return;
            }
        }
        throw new Error(`${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`);
    };
    const findSubsequences = (nChange, aStart, aEnd, bStart, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division)=>{
        if (bEnd - bStart < aEnd - aStart) {
            transposed = !transposed;
            if (transposed && 1 === callbacks.length) {
                const { foundSubsequence, isCommon } = callbacks[0];
                callbacks[1] = {
                    foundSubsequence: (nCommon, bCommon, aCommon)=>{
                        foundSubsequence(nCommon, aCommon, bCommon);
                    },
                    isCommon: (bIndex, aIndex)=>isCommon(aIndex, bIndex)
                };
            }
            const tStart = aStart;
            const tEnd = aEnd;
            aStart = bStart;
            aEnd = bEnd;
            bStart = tStart;
            bEnd = tEnd;
        }
        const { foundSubsequence, isCommon } = callbacks[transposed ? 1 : 0];
        divide(nChange, aStart, aEnd, bStart, bEnd, isCommon, aIndexesF, aIndexesR, division);
        const { nChangePreceding, aEndPreceding, bEndPreceding, nCommonPreceding, aCommonPreceding, bCommonPreceding, nCommonFollowing, aCommonFollowing, bCommonFollowing, nChangeFollowing, aStartFollowing, bStartFollowing } = division;
        if (aStart < aEndPreceding && bStart < bEndPreceding) findSubsequences(nChangePreceding, aStart, aEndPreceding, bStart, bEndPreceding, transposed, callbacks, aIndexesF, aIndexesR, division);
        if (0 !== nCommonPreceding) foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding);
        if (0 !== nCommonFollowing) foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing);
        if (aStartFollowing < aEnd && bStartFollowing < bEnd) findSubsequences(nChangeFollowing, aStartFollowing, aEnd, bStartFollowing, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division);
    };
    const validateLength = (name, arg)=>{
        if ('number' != typeof arg) throw new TypeError(`${pkg}: ${name} typeof ${typeof arg} is not a number`);
        if (!Number.isSafeInteger(arg)) throw new RangeError(`${pkg}: ${name} value ${arg} is not a safe integer`);
        if (arg < 0) throw new RangeError(`${pkg}: ${name} value ${arg} is a negative integer`);
    };
    const validateCallback = (name, arg)=>{
        const type = typeof arg;
        if ('function' !== type) throw new TypeError(`${pkg}: ${name} typeof ${type} is not a function`);
    };
    function diffSequence(aLength, bLength, isCommon, foundSubsequence) {
        validateLength('aLength', aLength);
        validateLength('bLength', bLength);
        validateCallback('isCommon', isCommon);
        validateCallback('foundSubsequence', foundSubsequence);
        const nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);
        if (0 !== nCommonF) foundSubsequence(nCommonF, 0, 0);
        if (aLength !== nCommonF || bLength !== nCommonF) {
            const aStart = nCommonF;
            const bStart = nCommonF;
            const nCommonR = countCommonItemsR(aStart, aLength - 1, bStart, bLength - 1, isCommon);
            const aEnd = aLength - nCommonR;
            const bEnd = bLength - nCommonR;
            const nCommonFR = nCommonF + nCommonR;
            if (aLength !== nCommonFR && bLength !== nCommonFR) {
                const nChange = 0;
                const transposed = false;
                const callbacks = [
                    {
                        foundSubsequence,
                        isCommon
                    }
                ];
                const aIndexesF = [
                    NOT_YET_SET
                ];
                const aIndexesR = [
                    NOT_YET_SET
                ];
                const division = {
                    aCommonFollowing: NOT_YET_SET,
                    aCommonPreceding: NOT_YET_SET,
                    aEndPreceding: NOT_YET_SET,
                    aStartFollowing: NOT_YET_SET,
                    bCommonFollowing: NOT_YET_SET,
                    bCommonPreceding: NOT_YET_SET,
                    bEndPreceding: NOT_YET_SET,
                    bStartFollowing: NOT_YET_SET,
                    nChangeFollowing: NOT_YET_SET,
                    nChangePreceding: NOT_YET_SET,
                    nCommonFollowing: NOT_YET_SET,
                    nCommonPreceding: NOT_YET_SET
                };
                findSubsequences(nChange, aStart, aEnd, bStart, bEnd, transposed, callbacks, aIndexesF, aIndexesR, division);
            }
            if (0 !== nCommonR) foundSubsequence(nCommonR, aEnd, bEnd);
        }
    }
    return build;
}
var buildExports = requireBuild();
var diffSequences = /*@__PURE__*/ getDefaultExportFromCjs(buildExports);
function formatTrailingSpaces(line, trailingSpaceFormatter) {
    return line.replace(/\s+$/, (match)=>trailingSpaceFormatter(match));
}
function printDiffLine(line, isFirstOrLast, color, indicator, trailingSpaceFormatter, emptyFirstOrLastLinePlaceholder) {
    return 0 !== line.length ? color(`${indicator} ${formatTrailingSpaces(line, trailingSpaceFormatter)}`) : " " !== indicator ? color(indicator) : isFirstOrLast && 0 !== emptyFirstOrLastLinePlaceholder.length ? color(`${indicator} ${emptyFirstOrLastLinePlaceholder}`) : "";
}
function printDeleteLine(line, isFirstOrLast, { aColor, aIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
    return printDiffLine(line, isFirstOrLast, aColor, aIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function printInsertLine(line, isFirstOrLast, { bColor, bIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
    return printDiffLine(line, isFirstOrLast, bColor, bIndicator, changeLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function printCommonLine(line, isFirstOrLast, { commonColor, commonIndicator, commonLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder }) {
    return printDiffLine(line, isFirstOrLast, commonColor, commonIndicator, commonLineTrailingSpaceColor, emptyFirstOrLastLinePlaceholder);
}
function createPatchMark(aStart, aEnd, bStart, bEnd, { patchColor }) {
    return patchColor(`@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`);
}
function joinAlignedDiffsNoExpand(diffs, options) {
    const iLength = diffs.length;
    const nContextLines = options.contextLines;
    const nContextLines2 = nContextLines + nContextLines;
    let jLength = iLength;
    let hasExcessAtStartOrEnd = false;
    let nExcessesBetweenChanges = 0;
    let i = 0;
    while(i !== iLength){
        const iStart = i;
        while(i !== iLength && diffs[i][0] === DIFF_EQUAL)i += 1;
        if (iStart !== i) if (0 === iStart) {
            if (i > nContextLines) {
                jLength -= i - nContextLines;
                hasExcessAtStartOrEnd = true;
            }
        } else if (i === iLength) {
            const n = i - iStart;
            if (n > nContextLines) {
                jLength -= n - nContextLines;
                hasExcessAtStartOrEnd = true;
            }
        } else {
            const n = i - iStart;
            if (n > nContextLines2) {
                jLength -= n - nContextLines2;
                nExcessesBetweenChanges += 1;
            }
        }
        while(i !== iLength && diffs[i][0] !== DIFF_EQUAL)i += 1;
    }
    const hasPatch = 0 !== nExcessesBetweenChanges || hasExcessAtStartOrEnd;
    if (0 !== nExcessesBetweenChanges) jLength += nExcessesBetweenChanges + 1;
    else if (hasExcessAtStartOrEnd) jLength += 1;
    const jLast = jLength - 1;
    const lines = [];
    let jPatchMark = 0;
    if (hasPatch) lines.push("");
    let aStart = 0;
    let bStart = 0;
    let aEnd = 0;
    let bEnd = 0;
    const pushCommonLine = (line)=>{
        const j = lines.length;
        lines.push(printCommonLine(line, 0 === j || j === jLast, options));
        aEnd += 1;
        bEnd += 1;
    };
    const pushDeleteLine = (line)=>{
        const j = lines.length;
        lines.push(printDeleteLine(line, 0 === j || j === jLast, options));
        aEnd += 1;
    };
    const pushInsertLine = (line)=>{
        const j = lines.length;
        lines.push(printInsertLine(line, 0 === j || j === jLast, options));
        bEnd += 1;
    };
    i = 0;
    while(i !== iLength){
        let iStart = i;
        while(i !== iLength && diffs[i][0] === DIFF_EQUAL)i += 1;
        if (iStart !== i) if (0 === iStart) {
            if (i > nContextLines) {
                iStart = i - nContextLines;
                aStart = iStart;
                bStart = iStart;
                aEnd = aStart;
                bEnd = bStart;
            }
            for(let iCommon = iStart; iCommon !== i; iCommon += 1)pushCommonLine(diffs[iCommon][1]);
        } else if (i === iLength) {
            const iEnd = i - iStart > nContextLines ? iStart + nContextLines : i;
            for(let iCommon = iStart; iCommon !== iEnd; iCommon += 1)pushCommonLine(diffs[iCommon][1]);
        } else {
            const nCommon = i - iStart;
            if (nCommon > nContextLines2) {
                const iEnd = iStart + nContextLines;
                for(let iCommon = iStart; iCommon !== iEnd; iCommon += 1)pushCommonLine(diffs[iCommon][1]);
                lines[jPatchMark] = createPatchMark(aStart, aEnd, bStart, bEnd, options);
                jPatchMark = lines.length;
                lines.push("");
                const nOmit = nCommon - nContextLines2;
                aStart = aEnd + nOmit;
                bStart = bEnd + nOmit;
                aEnd = aStart;
                bEnd = bStart;
                for(let iCommon = i - nContextLines; iCommon !== i; iCommon += 1)pushCommonLine(diffs[iCommon][1]);
            } else for(let iCommon = iStart; iCommon !== i; iCommon += 1)pushCommonLine(diffs[iCommon][1]);
        }
        while(i !== iLength && diffs[i][0] === DIFF_DELETE){
            pushDeleteLine(diffs[i][1]);
            i += 1;
        }
        while(i !== iLength && diffs[i][0] === DIFF_INSERT){
            pushInsertLine(diffs[i][1]);
            i += 1;
        }
    }
    if (hasPatch) lines[jPatchMark] = createPatchMark(aStart, aEnd, bStart, bEnd, options);
    return lines.join("\n");
}
function joinAlignedDiffsExpand(diffs, options) {
    return diffs.map((diff, i, diffs)=>{
        const line = diff[1];
        const isFirstOrLast = 0 === i || i === diffs.length - 1;
        switch(diff[0]){
            case DIFF_DELETE:
                return printDeleteLine(line, isFirstOrLast, options);
            case DIFF_INSERT:
                return printInsertLine(line, isFirstOrLast, options);
            default:
                return printCommonLine(line, isFirstOrLast, options);
        }
    }).join("\n");
}
const noColor = (string)=>string;
const DIFF_CONTEXT_DEFAULT = 5;
const DIFF_TRUNCATE_THRESHOLD_DEFAULT = 0;
function getDefaultOptions() {
    return {
        aAnnotation: "Expected",
        aColor: node_u.green,
        aIndicator: "-",
        bAnnotation: "Received",
        bColor: node_u.red,
        bIndicator: "+",
        changeColor: node_u.inverse,
        changeLineTrailingSpaceColor: noColor,
        commonColor: node_u.dim,
        commonIndicator: " ",
        commonLineTrailingSpaceColor: noColor,
        compareKeys: void 0,
        contextLines: DIFF_CONTEXT_DEFAULT,
        emptyFirstOrLastLinePlaceholder: "",
        expand: false,
        includeChangeCounts: false,
        omitAnnotationLines: false,
        patchColor: node_u.yellow,
        printBasicPrototype: false,
        truncateThreshold: DIFF_TRUNCATE_THRESHOLD_DEFAULT,
        truncateAnnotation: "... Diff result is truncated",
        truncateAnnotationColor: noColor
    };
}
function getCompareKeys(compareKeys) {
    return compareKeys && "function" == typeof compareKeys ? compareKeys : void 0;
}
function getContextLines(contextLines) {
    return "number" == typeof contextLines && Number.isSafeInteger(contextLines) && contextLines >= 0 ? contextLines : DIFF_CONTEXT_DEFAULT;
}
function normalizeDiffOptions(options = {}) {
    return {
        ...getDefaultOptions(),
        ...options,
        compareKeys: getCompareKeys(options.compareKeys),
        contextLines: getContextLines(options.contextLines)
    };
}
function isEmptyString(lines) {
    return 1 === lines.length && 0 === lines[0].length;
}
function countChanges(diffs) {
    let a = 0;
    let b = 0;
    diffs.forEach((diff)=>{
        switch(diff[0]){
            case DIFF_DELETE:
                a += 1;
                break;
            case DIFF_INSERT:
                b += 1;
                break;
        }
    });
    return {
        a,
        b
    };
}
function printAnnotation({ aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator, includeChangeCounts, omitAnnotationLines }, changeCounts) {
    if (omitAnnotationLines) return "";
    let aRest = "";
    let bRest = "";
    if (includeChangeCounts) {
        const aCount = String(changeCounts.a);
        const bCount = String(changeCounts.b);
        const baAnnotationLengthDiff = bAnnotation.length - aAnnotation.length;
        const aAnnotationPadding = " ".repeat(Math.max(0, baAnnotationLengthDiff));
        const bAnnotationPadding = " ".repeat(Math.max(0, -baAnnotationLengthDiff));
        const baCountLengthDiff = bCount.length - aCount.length;
        const aCountPadding = " ".repeat(Math.max(0, baCountLengthDiff));
        const bCountPadding = " ".repeat(Math.max(0, -baCountLengthDiff));
        aRest = `${aAnnotationPadding}  ${aIndicator} ${aCountPadding}${aCount}`;
        bRest = `${bAnnotationPadding}  ${bIndicator} ${bCountPadding}${bCount}`;
    }
    const a = `${aIndicator} ${aAnnotation}${aRest}`;
    const b = `${bIndicator} ${bAnnotation}${bRest}`;
    return `${aColor(a)}\n${bColor(b)}\n\n`;
}
function printDiffLines(diffs, truncated, options) {
    return printAnnotation(options, countChanges(diffs)) + (options.expand ? joinAlignedDiffsExpand(diffs, options) : joinAlignedDiffsNoExpand(diffs, options)) + (truncated ? options.truncateAnnotationColor(`\n${options.truncateAnnotation}`) : "");
}
function diffLinesUnified(aLines, bLines, options) {
    const normalizedOptions = normalizeDiffOptions(options);
    const [diffs, truncated] = diffLinesRaw(isEmptyString(aLines) ? [] : aLines, isEmptyString(bLines) ? [] : bLines, normalizedOptions);
    return printDiffLines(diffs, truncated, normalizedOptions);
}
function diffLinesUnified2(aLinesDisplay, bLinesDisplay, aLinesCompare, bLinesCompare, options) {
    if (isEmptyString(aLinesDisplay) && isEmptyString(aLinesCompare)) {
        aLinesDisplay = [];
        aLinesCompare = [];
    }
    if (isEmptyString(bLinesDisplay) && isEmptyString(bLinesCompare)) {
        bLinesDisplay = [];
        bLinesCompare = [];
    }
    if (aLinesDisplay.length !== aLinesCompare.length || bLinesDisplay.length !== bLinesCompare.length) return diffLinesUnified(aLinesDisplay, bLinesDisplay, options);
    const [diffs, truncated] = diffLinesRaw(aLinesCompare, bLinesCompare, options);
    let aIndex = 0;
    let bIndex = 0;
    diffs.forEach((diff)=>{
        switch(diff[0]){
            case DIFF_DELETE:
                diff[1] = aLinesDisplay[aIndex];
                aIndex += 1;
                break;
            case DIFF_INSERT:
                diff[1] = bLinesDisplay[bIndex];
                bIndex += 1;
                break;
            default:
                diff[1] = bLinesDisplay[bIndex];
                aIndex += 1;
                bIndex += 1;
        }
    });
    return printDiffLines(diffs, truncated, normalizeDiffOptions(options));
}
function diffLinesRaw(aLines, bLines, options) {
    const truncate = (null == options ? void 0 : options.truncateThreshold) ?? false;
    const truncateThreshold = Math.max(Math.floor((null == options ? void 0 : options.truncateThreshold) ?? 0), 0);
    const aLength = truncate ? Math.min(aLines.length, truncateThreshold) : aLines.length;
    const bLength = truncate ? Math.min(bLines.length, truncateThreshold) : bLines.length;
    const truncated = aLength !== aLines.length || bLength !== bLines.length;
    const isCommon = (aIndex, bIndex)=>aLines[aIndex] === bLines[bIndex];
    const diffs = [];
    let aIndex = 0;
    let bIndex = 0;
    const foundSubsequence = (nCommon, aCommon, bCommon)=>{
        for(; aIndex !== aCommon; aIndex += 1)diffs.push(new Diff(DIFF_DELETE, aLines[aIndex]));
        for(; bIndex !== bCommon; bIndex += 1)diffs.push(new Diff(DIFF_INSERT, bLines[bIndex]));
        for(; 0 !== nCommon; nCommon -= 1, aIndex += 1, bIndex += 1)diffs.push(new Diff(DIFF_EQUAL, bLines[bIndex]));
    };
    diffSequences(aLength, bLength, isCommon, foundSubsequence);
    for(; aIndex !== aLength; aIndex += 1)diffs.push(new Diff(DIFF_DELETE, aLines[aIndex]));
    for(; bIndex !== bLength; bIndex += 1)diffs.push(new Diff(DIFF_INSERT, bLines[bIndex]));
    return [
        diffs,
        truncated
    ];
}
function diff_getType(value) {
    if (void 0 === value) return "undefined";
    if (null === value) return "null";
    if (Array.isArray(value)) return "array";
    if ("boolean" == typeof value) return "boolean";
    if ("function" == typeof value) return "function";
    else if ("number" == typeof value) return "number";
    else if ("string" == typeof value) return "string";
    else if ("bigint" == typeof value) return "bigint";
    else if ("object" == typeof value) {
        if (null != value) {
            if (value.constructor === RegExp) return "regexp";
            else if (value.constructor === Map) return "map";
            else if (value.constructor === Set) return "set";
            else if (value.constructor === Date) return "date";
        }
        return "object";
    } else if ("symbol" == typeof value) return "symbol";
    throw new Error(`value of unknown type: ${value}`);
}
function getNewLineSymbol(string) {
    return string.includes("\r\n") ? "\r\n" : "\n";
}
function diffStrings(a, b, options) {
    const truncate = (null == options ? void 0 : options.truncateThreshold) ?? false;
    const truncateThreshold = Math.max(Math.floor((null == options ? void 0 : options.truncateThreshold) ?? 0), 0);
    let aLength = a.length;
    let bLength = b.length;
    if (truncate) {
        const aMultipleLines = a.includes("\n");
        const bMultipleLines = b.includes("\n");
        const aNewLineSymbol = getNewLineSymbol(a);
        const bNewLineSymbol = getNewLineSymbol(b);
        const _a = aMultipleLines ? `${a.split(aNewLineSymbol, truncateThreshold).join(aNewLineSymbol)}\n` : a;
        const _b = bMultipleLines ? `${b.split(bNewLineSymbol, truncateThreshold).join(bNewLineSymbol)}\n` : b;
        aLength = _a.length;
        bLength = _b.length;
    }
    const truncated = aLength !== a.length || bLength !== b.length;
    const isCommon = (aIndex, bIndex)=>a[aIndex] === b[bIndex];
    let aIndex = 0;
    let bIndex = 0;
    const diffs = [];
    const foundSubsequence = (nCommon, aCommon, bCommon)=>{
        if (aIndex !== aCommon) diffs.push(new Diff(DIFF_DELETE, a.slice(aIndex, aCommon)));
        if (bIndex !== bCommon) diffs.push(new Diff(DIFF_INSERT, b.slice(bIndex, bCommon)));
        aIndex = aCommon + nCommon;
        bIndex = bCommon + nCommon;
        diffs.push(new Diff(DIFF_EQUAL, b.slice(bCommon, bIndex)));
    };
    diffSequences(aLength, bLength, isCommon, foundSubsequence);
    if (aIndex !== aLength) diffs.push(new Diff(DIFF_DELETE, a.slice(aIndex)));
    if (bIndex !== bLength) diffs.push(new Diff(DIFF_INSERT, b.slice(bIndex)));
    return [
        diffs,
        truncated
    ];
}
function concatenateRelevantDiffs(op, diffs, changeColor) {
    return diffs.reduce((reduced, diff)=>reduced + (diff[0] === DIFF_EQUAL ? diff[1] : diff[0] === op && 0 !== diff[1].length ? changeColor(diff[1]) : ""), "");
}
class ChangeBuffer {
    op;
    line;
    lines;
    changeColor;
    constructor(op, changeColor){
        this.op = op;
        this.line = [];
        this.lines = [];
        this.changeColor = changeColor;
    }
    pushSubstring(substring) {
        this.pushDiff(new Diff(this.op, substring));
    }
    pushLine() {
        this.lines.push(1 !== this.line.length ? new Diff(this.op, concatenateRelevantDiffs(this.op, this.line, this.changeColor)) : this.line[0][0] === this.op ? this.line[0] : new Diff(this.op, this.line[0][1]));
        this.line.length = 0;
    }
    isLineEmpty() {
        return 0 === this.line.length;
    }
    pushDiff(diff) {
        this.line.push(diff);
    }
    align(diff) {
        const string = diff[1];
        if (string.includes("\n")) {
            const substrings = string.split("\n");
            const iLast = substrings.length - 1;
            substrings.forEach((substring, i)=>{
                if (i < iLast) {
                    this.pushSubstring(substring);
                    this.pushLine();
                } else if (0 !== substring.length) this.pushSubstring(substring);
            });
        } else this.pushDiff(diff);
    }
    moveLinesTo(lines) {
        if (!this.isLineEmpty()) this.pushLine();
        lines.push(...this.lines);
        this.lines.length = 0;
    }
}
class CommonBuffer {
    deleteBuffer;
    insertBuffer;
    lines;
    constructor(deleteBuffer, insertBuffer){
        this.deleteBuffer = deleteBuffer;
        this.insertBuffer = insertBuffer;
        this.lines = [];
    }
    pushDiffCommonLine(diff) {
        this.lines.push(diff);
    }
    pushDiffChangeLines(diff) {
        const isDiffEmpty = 0 === diff[1].length;
        if (!isDiffEmpty || this.deleteBuffer.isLineEmpty()) this.deleteBuffer.pushDiff(diff);
        if (!isDiffEmpty || this.insertBuffer.isLineEmpty()) this.insertBuffer.pushDiff(diff);
    }
    flushChangeLines() {
        this.deleteBuffer.moveLinesTo(this.lines);
        this.insertBuffer.moveLinesTo(this.lines);
    }
    align(diff) {
        const op = diff[0];
        const string = diff[1];
        if (string.includes("\n")) {
            const substrings = string.split("\n");
            const iLast = substrings.length - 1;
            substrings.forEach((substring, i)=>{
                if (0 === i) {
                    const subdiff = new Diff(op, substring);
                    if (this.deleteBuffer.isLineEmpty() && this.insertBuffer.isLineEmpty()) {
                        this.flushChangeLines();
                        this.pushDiffCommonLine(subdiff);
                    } else {
                        this.pushDiffChangeLines(subdiff);
                        this.flushChangeLines();
                    }
                } else if (i < iLast) this.pushDiffCommonLine(new Diff(op, substring));
                else if (0 !== substring.length) this.pushDiffChangeLines(new Diff(op, substring));
            });
        } else this.pushDiffChangeLines(diff);
    }
    getLines() {
        this.flushChangeLines();
        return this.lines;
    }
}
function getAlignedDiffs(diffs, changeColor) {
    const deleteBuffer = new ChangeBuffer(DIFF_DELETE, changeColor);
    const insertBuffer = new ChangeBuffer(DIFF_INSERT, changeColor);
    const commonBuffer = new CommonBuffer(deleteBuffer, insertBuffer);
    diffs.forEach((diff)=>{
        switch(diff[0]){
            case DIFF_DELETE:
                deleteBuffer.align(diff);
                break;
            case DIFF_INSERT:
                insertBuffer.align(diff);
                break;
            default:
                commonBuffer.align(diff);
        }
    });
    return commonBuffer.getLines();
}
function diff_hasCommonDiff(diffs, isMultiline) {
    if (isMultiline) {
        const iLast = diffs.length - 1;
        return diffs.some((diff, i)=>diff[0] === DIFF_EQUAL && (i !== iLast || "\n" !== diff[1]));
    }
    return diffs.some((diff)=>diff[0] === DIFF_EQUAL);
}
function diffStringsUnified(a, b, options) {
    if (a !== b && 0 !== a.length && 0 !== b.length) {
        const isMultiline = a.includes("\n") || b.includes("\n");
        const [diffs, truncated] = diffStringsRaw(isMultiline ? `${a}\n` : a, isMultiline ? `${b}\n` : b, true, options);
        if (diff_hasCommonDiff(diffs, isMultiline)) {
            const optionsNormalized = normalizeDiffOptions(options);
            const lines = getAlignedDiffs(diffs, optionsNormalized.changeColor);
            return printDiffLines(lines, truncated, optionsNormalized);
        }
    }
    return diffLinesUnified(a.split("\n"), b.split("\n"), options);
}
function diffStringsRaw(a, b, cleanup, options) {
    const [diffs, truncated] = diffStrings(a, b, options);
    if (cleanup) diff_cleanupSemantic(diffs);
    return [
        diffs,
        truncated
    ];
}
function getCommonMessage(message, options) {
    const { commonColor } = normalizeDiffOptions(options);
    return commonColor(message);
}
const { AsymmetricMatcher: diff_AsymmetricMatcher, DOMCollection: diff_DOMCollection, DOMElement: diff_DOMElement, Immutable: diff_Immutable, ReactElement: diff_ReactElement, ReactTestComponent: diff_ReactTestComponent } = dist_plugins;
const diff_PLUGINS = [
    diff_ReactTestComponent,
    diff_ReactElement,
    diff_DOMElement,
    diff_DOMCollection,
    diff_Immutable,
    diff_AsymmetricMatcher,
    dist_plugins.Error
];
const FORMAT_OPTIONS = {
    maxDepth: 20,
    plugins: diff_PLUGINS
};
const FALLBACK_FORMAT_OPTIONS = {
    callToJSON: false,
    maxDepth: 8,
    plugins: diff_PLUGINS
};
function diff_diff(a, b, options) {
    if (Object.is(a, b)) return "";
    const aType = diff_getType(a);
    let expectedType = aType;
    let omitDifference = false;
    if ("object" === aType && "function" == typeof a.asymmetricMatch) {
        if (a.$$typeof !== Symbol.for("jest.asymmetricMatcher")) return;
        if ("function" != typeof a.getExpectedType) return;
        expectedType = a.getExpectedType();
        omitDifference = "string" === expectedType;
    }
    if (expectedType !== diff_getType(b)) {
        const { aAnnotation, aColor, aIndicator, bAnnotation, bColor, bIndicator } = normalizeDiffOptions(options);
        const formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
        let aDisplay = dist_format(a, formatOptions);
        let bDisplay = dist_format(b, formatOptions);
        const MAX_LENGTH = 1e5;
        function truncate(s) {
            return s.length <= MAX_LENGTH ? s : `${s.slice(0, MAX_LENGTH)}...`;
        }
        aDisplay = truncate(aDisplay);
        bDisplay = truncate(bDisplay);
        const aDiff = `${aColor(`${aIndicator} ${aAnnotation}:`)} \n${aDisplay}`;
        const bDiff = `${bColor(`${bIndicator} ${bAnnotation}:`)} \n${bDisplay}`;
        return `${aDiff}\n\n${bDiff}`;
    }
    if (omitDifference) return;
    switch(aType){
        case "string":
            return diffLinesUnified(a.split("\n"), b.split("\n"), options);
        case "boolean":
        case "number":
            return comparePrimitive(a, b, options);
        case "map":
            return compareObjects(sortMap(a), sortMap(b), options);
        case "set":
            return compareObjects(sortSet(a), sortSet(b), options);
        default:
            return compareObjects(a, b, options);
    }
}
function comparePrimitive(a, b, options) {
    const aFormat = dist_format(a, FORMAT_OPTIONS);
    const bFormat = dist_format(b, FORMAT_OPTIONS);
    return aFormat === bFormat ? "" : diffLinesUnified(aFormat.split("\n"), bFormat.split("\n"), options);
}
function sortMap(map) {
    return new Map(Array.from(map.entries()).sort());
}
function sortSet(set) {
    return new Set(Array.from(set.values()).sort());
}
function compareObjects(a, b, options) {
    let difference;
    let hasThrown = false;
    try {
        const formatOptions = getFormatOptions(FORMAT_OPTIONS, options);
        difference = getObjectsDifference(a, b, formatOptions, options);
    } catch  {
        hasThrown = true;
    }
    const noDiffMessage = getCommonMessage(NO_DIFF_MESSAGE, options);
    if (void 0 === difference || difference === noDiffMessage) {
        const formatOptions = getFormatOptions(FALLBACK_FORMAT_OPTIONS, options);
        difference = getObjectsDifference(a, b, formatOptions, options);
        if (difference !== noDiffMessage && !hasThrown) difference = `${getCommonMessage(SIMILAR_MESSAGE, options)}\n\n${difference}`;
    }
    return difference;
}
function getFormatOptions(formatOptions, options) {
    const { compareKeys, printBasicPrototype, maxDepth } = normalizeDiffOptions(options);
    return {
        ...formatOptions,
        compareKeys,
        printBasicPrototype,
        maxDepth: maxDepth ?? formatOptions.maxDepth
    };
}
function getObjectsDifference(a, b, formatOptions, options) {
    const formatOptionsZeroIndent = {
        ...formatOptions,
        indent: 0
    };
    const aCompare = dist_format(a, formatOptionsZeroIndent);
    const bCompare = dist_format(b, formatOptionsZeroIndent);
    if (aCompare === bCompare) return getCommonMessage(NO_DIFF_MESSAGE, options);
    {
        const aDisplay = dist_format(a, formatOptions);
        const bDisplay = dist_format(b, formatOptions);
        return diffLinesUnified2(aDisplay.split("\n"), bDisplay.split("\n"), aCompare.split("\n"), bCompare.split("\n"), options);
    }
}
const MAX_DIFF_STRING_LENGTH = 2e4;
function isAsymmetricMatcher(data) {
    const type = getType(data);
    return "Object" === type && "function" == typeof data.asymmetricMatch;
}
function isReplaceable(obj1, obj2) {
    const obj1Type = getType(obj1);
    const obj2Type = getType(obj2);
    return obj1Type === obj2Type && ("Object" === obj1Type || "Array" === obj1Type);
}
function printDiffOrStringify(received, expected, options) {
    const { aAnnotation, bAnnotation } = normalizeDiffOptions(options);
    if ("string" == typeof expected && "string" == typeof received && expected.length > 0 && received.length > 0 && expected.length <= MAX_DIFF_STRING_LENGTH && received.length <= MAX_DIFF_STRING_LENGTH && expected !== received) {
        if (expected.includes("\n") || received.includes("\n")) return diffStringsUnified(expected, received, options);
        const [diffs] = diffStringsRaw(expected, received, true);
        const hasCommonDiff = diffs.some((diff)=>diff[0] === DIFF_EQUAL);
        const printLabel = getLabelPrinter(aAnnotation, bAnnotation);
        const expectedLine = printLabel(aAnnotation) + printExpected(getCommonAndChangedSubstrings(diffs, DIFF_DELETE, hasCommonDiff));
        const receivedLine = printLabel(bAnnotation) + printReceived(getCommonAndChangedSubstrings(diffs, DIFF_INSERT, hasCommonDiff));
        return `${expectedLine}\n${receivedLine}`;
    }
    const clonedExpected = deepClone(expected, {
        forceWritable: true
    });
    const clonedReceived = deepClone(received, {
        forceWritable: true
    });
    const { replacedExpected, replacedActual } = replaceAsymmetricMatcher(clonedReceived, clonedExpected);
    const difference = diff_diff(replacedExpected, replacedActual, options);
    return difference;
}
function replaceAsymmetricMatcher(actual, expected, actualReplaced = new WeakSet(), expectedReplaced = new WeakSet()) {
    if (actual instanceof Error && expected instanceof Error && void 0 !== actual.cause && void 0 === expected.cause) {
        delete actual.cause;
        return {
            replacedActual: actual,
            replacedExpected: expected
        };
    }
    if (!isReplaceable(actual, expected)) return {
        replacedActual: actual,
        replacedExpected: expected
    };
    if (actualReplaced.has(actual) || expectedReplaced.has(expected)) return {
        replacedActual: actual,
        replacedExpected: expected
    };
    actualReplaced.add(actual);
    expectedReplaced.add(expected);
    getOwnProperties(expected).forEach((key)=>{
        const expectedValue = expected[key];
        const actualValue = actual[key];
        if (isAsymmetricMatcher(expectedValue)) {
            if (expectedValue.asymmetricMatch(actualValue)) actual[key] = expectedValue;
        } else if (isAsymmetricMatcher(actualValue)) {
            if (actualValue.asymmetricMatch(expectedValue)) expected[key] = actualValue;
        } else if (isReplaceable(actualValue, expectedValue)) {
            const replaced = replaceAsymmetricMatcher(actualValue, expectedValue, actualReplaced, expectedReplaced);
            actual[key] = replaced.replacedActual;
            expected[key] = replaced.replacedExpected;
        }
    });
    return {
        replacedActual: actual,
        replacedExpected: expected
    };
}
function getLabelPrinter(...strings) {
    const maxLength = strings.reduce((max, string)=>string.length > max ? string.length : max, 0);
    return (string)=>`${string}: ${" ".repeat(maxLength - string.length)}`;
}
const SPACE_SYMBOL = "·";
function replaceTrailingSpaces(text) {
    return text.replace(/\s+$/gm, (spaces)=>SPACE_SYMBOL.repeat(spaces.length));
}
function printReceived(object) {
    return node_u.red(replaceTrailingSpaces(stringify(object)));
}
function printExpected(value) {
    return node_u.green(replaceTrailingSpaces(stringify(value)));
}
function getCommonAndChangedSubstrings(diffs, op, hasCommonDiff) {
    return diffs.reduce((reduced, diff)=>reduced + (diff[0] === DIFF_EQUAL ? diff[1] : diff[0] === op ? hasCommonDiff ? node_u.inverse(diff[1]) : diff[1] : ""), "");
}
export { assertTypes, diff_diff, diff_namespaceObject, format, getType, isObject, noop, printDiffOrStringify, stringify };
