/*! LICENSE: 314.js.LICENSE.txt */
var __webpack_modules__ = {};
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
        exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
}
__webpack_require__.m = __webpack_modules__;
(()=>{
    __webpack_require__.d = (exports, getters, values)=>{
        var define = (defs, kind)=>{
            for(var key in defs)if (__webpack_require__.o(defs, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                [kind]: defs[key]
            });
        };
        define(getters, "get");
        define(values, "value");
    };
})();
(()=>{
    __webpack_require__.add = function registerModules(modules) {
        Object.assign(__webpack_require__.m, modules);
    };
})();
var __webpack_require__temp = __webpack_require__;
(()=>{
    __webpack_require__.g = (()=>{
        if ('object' == typeof globalThis) return globalThis;
        try {
            return this || new Function('return this')();
        } catch (e) {
            if ('object' == typeof window) return window;
        }
    })();
})();
(()=>{
    __webpack_require__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
})();
(()=>{
    __webpack_require__.r = (exports)=>{
        if ("u" > typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
        });
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
    };
})();
(()=>{
    var installedChunks = {
        314: 0,
        410: 0
    };
    var installChunk = (data)=>{
        var __rspack_esm_ids = data.__rspack_esm_ids;
        var __webpack_modules__ = data.__webpack_modules__;
        var __rspack_esm_runtime = data.__rspack_esm_runtime;
        var moduleId, chunkId, i = 0;
        for(moduleId in __webpack_modules__)if (__webpack_require__.o(__webpack_modules__, moduleId)) __webpack_require__.m[moduleId] = __webpack_modules__[moduleId];
        if (__rspack_esm_runtime) __rspack_esm_runtime(__webpack_require__);
        for(; i < __rspack_esm_ids.length; i++){
            chunkId = __rspack_esm_ids[i];
            if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) installedChunks[chunkId][0]();
            installedChunks[__rspack_esm_ids[i]] = 0;
        }
    };
    __webpack_require__.C = installChunk;
})();
__webpack_require__.add({
    "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js" (__unused_rspack_module, exports) {
        exports.byteLength = byteLength;
        exports.toByteArray = toByteArray;
        exports.fromByteArray = fromByteArray;
        var lookup = [];
        var revLookup = [];
        var Arr = "u" > typeof Uint8Array ? Uint8Array : Array;
        var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        for(var i = 0, len = code.length; i < len; ++i){
            lookup[i] = code[i];
            revLookup[code.charCodeAt(i)] = i;
        }
        revLookup['-'.charCodeAt(0)] = 62;
        revLookup['_'.charCodeAt(0)] = 63;
        function getLens(b64) {
            var len = b64.length;
            if (len % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
            var validLen = b64.indexOf('=');
            if (-1 === validLen) validLen = len;
            var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
            return [
                validLen,
                placeHoldersLen
            ];
        }
        function byteLength(b64) {
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function _byteLength(b64, validLen, placeHoldersLen) {
            return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
        }
        function toByteArray(b64) {
            var tmp;
            var lens = getLens(b64);
            var validLen = lens[0];
            var placeHoldersLen = lens[1];
            var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
            var curByte = 0;
            var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
            var i;
            for(i = 0; i < len; i += 4){
                tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
                arr[curByte++] = tmp >> 16 & 0xFF;
                arr[curByte++] = tmp >> 8 & 0xFF;
                arr[curByte++] = 0xFF & tmp;
            }
            if (2 === placeHoldersLen) {
                tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
                arr[curByte++] = 0xFF & tmp;
            }
            if (1 === placeHoldersLen) {
                tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
                arr[curByte++] = tmp >> 8 & 0xFF;
                arr[curByte++] = 0xFF & tmp;
            }
            return arr;
        }
        function tripletToBase64(num) {
            return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[0x3F & num];
        }
        function encodeChunk(uint8, start, end) {
            var tmp;
            var output = [];
            for(var i = start; i < end; i += 3){
                tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (0xFF & uint8[i + 2]);
                output.push(tripletToBase64(tmp));
            }
            return output.join('');
        }
        function fromByteArray(uint8) {
            var tmp;
            var len = uint8.length;
            var extraBytes = len % 3;
            var parts = [];
            var maxChunkLength = 16383;
            for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
            if (1 === extraBytes) {
                tmp = uint8[len - 1];
                parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
            } else if (2 === extraBytes) {
                tmp = (uint8[len - 2] << 8) + uint8[len - 1];
                parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
            }
            return parts.join('');
        }
    },
    "../../node_modules/.pnpm/buffer@5.7.1/node_modules/buffer/index.js" (__unused_rspack_module, exports, __webpack_require__) {
        /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ var base64 = __webpack_require__("../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js");
        var ieee754 = __webpack_require__("../../node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js");
        var customInspectSymbol = 'function' == typeof Symbol && 'function' == typeof Symbol['for'] ? Symbol['for']('nodejs.util.inspect.custom') : null;
        exports.hp = Buffer;
        exports.IS = 50;
        var K_MAX_LENGTH = 0x7fffffff;
        Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
        if (!Buffer.TYPED_ARRAY_SUPPORT && "u" > typeof console && 'function' == typeof console.error) console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
        function typedArraySupport() {
            try {
                var arr = new Uint8Array(1);
                var proto = {
                    foo: function() {
                        return 42;
                    }
                };
                Object.setPrototypeOf(proto, Uint8Array.prototype);
                Object.setPrototypeOf(arr, proto);
                return 42 === arr.foo();
            } catch (e) {
                return false;
            }
        }
        Object.defineProperty(Buffer.prototype, 'parent', {
            enumerable: true,
            get: function() {
                if (!Buffer.isBuffer(this)) return;
                return this.buffer;
            }
        });
        Object.defineProperty(Buffer.prototype, 'offset', {
            enumerable: true,
            get: function() {
                if (!Buffer.isBuffer(this)) return;
                return this.byteOffset;
            }
        });
        function createBuffer(length) {
            if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
            var buf = new Uint8Array(length);
            Object.setPrototypeOf(buf, Buffer.prototype);
            return buf;
        }
        function Buffer(arg, encodingOrOffset, length) {
            if ('number' == typeof arg) {
                if ('string' == typeof encodingOrOffset) throw new TypeError('The "string" argument must be of type string. Received type number');
                return allocUnsafe(arg);
            }
            return from(arg, encodingOrOffset, length);
        }
        Buffer.poolSize = 8192;
        function from(value, encodingOrOffset, length) {
            if ('string' == typeof value) return fromString(value, encodingOrOffset);
            if (ArrayBuffer.isView(value)) return fromArrayView(value);
            if (null == value) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
            if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
            if ("u" > typeof SharedArrayBuffer && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
            if ('number' == typeof value) throw new TypeError('The "value" argument must not be of type number. Received type number');
            var valueOf = value.valueOf && value.valueOf();
            if (null != valueOf && valueOf !== value) return Buffer.from(valueOf, encodingOrOffset, length);
            var b = fromObject(value);
            if (b) return b;
            if ("u" > typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof value[Symbol.toPrimitive]) return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
        }
        Buffer.from = function(value, encodingOrOffset, length) {
            return from(value, encodingOrOffset, length);
        };
        Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(Buffer, Uint8Array);
        function assertSize(size) {
            if ('number' != typeof size) throw new TypeError('"size" argument must be of type number');
            if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
        function alloc(size, fill, encoding) {
            assertSize(size);
            if (size <= 0) return createBuffer(size);
            if (void 0 !== fill) return 'string' == typeof encoding ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
            return createBuffer(size);
        }
        Buffer.alloc = function(size, fill, encoding) {
            return alloc(size, fill, encoding);
        };
        function allocUnsafe(size) {
            assertSize(size);
            return createBuffer(size < 0 ? 0 : 0 | checked(size));
        }
        Buffer.allocUnsafe = function(size) {
            return allocUnsafe(size);
        };
        Buffer.allocUnsafeSlow = function(size) {
            return allocUnsafe(size);
        };
        function fromString(string, encoding) {
            if ('string' != typeof encoding || '' === encoding) encoding = 'utf8';
            if (!Buffer.isEncoding(encoding)) throw new TypeError('Unknown encoding: ' + encoding);
            var length = 0 | byteLength(string, encoding);
            var buf = createBuffer(length);
            var actual = buf.write(string, encoding);
            if (actual !== length) buf = buf.slice(0, actual);
            return buf;
        }
        function fromArrayLike(array) {
            var length = array.length < 0 ? 0 : 0 | checked(array.length);
            var buf = createBuffer(length);
            for(var i = 0; i < length; i += 1)buf[i] = 255 & array[i];
            return buf;
        }
        function fromArrayView(arrayView) {
            if (isInstance(arrayView, Uint8Array)) {
                var copy = new Uint8Array(arrayView);
                return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
            }
            return fromArrayLike(arrayView);
        }
        function fromArrayBuffer(array, byteOffset, length) {
            if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
            if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
            var buf;
            buf = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
            Object.setPrototypeOf(buf, Buffer.prototype);
            return buf;
        }
        function fromObject(obj) {
            if (Buffer.isBuffer(obj)) {
                var len = 0 | checked(obj.length);
                var buf = createBuffer(len);
                if (0 === buf.length) return buf;
                obj.copy(buf, 0, 0, len);
                return buf;
            }
            if (void 0 !== obj.length) {
                if ('number' != typeof obj.length || numberIsNaN(obj.length)) return createBuffer(0);
                return fromArrayLike(obj);
            }
            if ('Buffer' === obj.type && Array.isArray(obj.data)) return fromArrayLike(obj.data);
        }
        function checked(length) {
            if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + ' bytes');
            return 0 | length;
        }
        Buffer.isBuffer = function isBuffer(b) {
            return null != b && true === b._isBuffer && b !== Buffer.prototype;
        };
        Buffer.compare = function compare(a, b) {
            if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
            if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (a === b) return 0;
            var x = a.length;
            var y = b.length;
            for(var i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
            }
            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
        };
        Buffer.isEncoding = function isEncoding(encoding) {
            switch(String(encoding).toLowerCase()){
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'latin1':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return true;
                default:
                    return false;
            }
        };
        Buffer.concat = function concat(list, length) {
            if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === list.length) return Buffer.alloc(0);
            var i;
            if (void 0 === length) {
                length = 0;
                for(i = 0; i < list.length; ++i)length += list[i].length;
            }
            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;
            for(i = 0; i < list.length; ++i){
                var buf = list[i];
                if (isInstance(buf, Uint8Array)) if (pos + buf.length > buffer.length) Buffer.from(buf).copy(buffer, pos);
                else Uint8Array.prototype.set.call(buffer, buf, pos);
                else if (Buffer.isBuffer(buf)) buf.copy(buffer, pos);
                else throw new TypeError('"list" argument must be an Array of Buffers');
                pos += buf.length;
            }
            return buffer;
        };
        function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) return string.length;
            if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
            if ('string' != typeof string) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
            var len = string.length;
            var mustMatch = arguments.length > 2 && true === arguments[2];
            if (!mustMatch && 0 === len) return 0;
            var loweredCase = false;
            for(;;)switch(encoding){
                case 'ascii':
                case 'latin1':
                case 'binary':
                    return len;
                case 'utf8':
                case 'utf-8':
                    return utf8ToBytes(string).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return 2 * len;
                case 'hex':
                    return len >>> 1;
                case 'base64':
                    return base64ToBytes(string).length;
                default:
                    if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length;
                    encoding = ('' + encoding).toLowerCase();
                    loweredCase = true;
            }
        }
        Buffer.byteLength = byteLength;
        function slowToString(encoding, start, end) {
            var loweredCase = false;
            if (void 0 === start || start < 0) start = 0;
            if (start > this.length) return '';
            if (void 0 === end || end > this.length) end = this.length;
            if (end <= 0) return '';
            end >>>= 0;
            start >>>= 0;
            if (end <= start) return '';
            if (!encoding) encoding = 'utf8';
            while(true)switch(encoding){
                case 'hex':
                    return hexSlice(this, start, end);
                case 'utf8':
                case 'utf-8':
                    return utf8Slice(this, start, end);
                case 'ascii':
                    return asciiSlice(this, start, end);
                case 'latin1':
                case 'binary':
                    return latin1Slice(this, start, end);
                case 'base64':
                    return base64Slice(this, start, end);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return utf16leSlice(this, start, end);
                default:
                    if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                    encoding = (encoding + '').toLowerCase();
                    loweredCase = true;
            }
        }
        Buffer.prototype._isBuffer = true;
        function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
        }
        Buffer.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
            for(var i = 0; i < len; i += 2)swap(this, i, i + 1);
            return this;
        };
        Buffer.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
            for(var i = 0; i < len; i += 4){
                swap(this, i, i + 3);
                swap(this, i + 1, i + 2);
            }
            return this;
        };
        Buffer.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
            for(var i = 0; i < len; i += 8){
                swap(this, i, i + 7);
                swap(this, i + 1, i + 6);
                swap(this, i + 2, i + 5);
                swap(this, i + 3, i + 4);
            }
            return this;
        };
        Buffer.prototype.toString = function toString() {
            var length = this.length;
            if (0 === length) return '';
            if (0 === arguments.length) return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
        };
        Buffer.prototype.toLocaleString = Buffer.prototype.toString;
        Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
            if (this === b) return true;
            return 0 === Buffer.compare(this, b);
        };
        Buffer.prototype.inspect = function inspect() {
            var str = '';
            var max = exports.IS;
            str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
            if (this.length > max) str += ' ... ';
            return '<Buffer ' + str + '>';
        };
        if (customInspectSymbol) Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
        Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
            if (isInstance(target, Uint8Array)) target = Buffer.from(target, target.offset, target.byteLength);
            if (!Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
            if (void 0 === start) start = 0;
            if (void 0 === end) end = target ? target.length : 0;
            if (void 0 === thisStart) thisStart = 0;
            if (void 0 === thisEnd) thisEnd = this.length;
            if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError('out of range index');
            if (thisStart >= thisEnd && start >= end) return 0;
            if (thisStart >= thisEnd) return -1;
            if (start >= end) return 1;
            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;
            if (this === target) return 0;
            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);
            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);
            for(var i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
            }
            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
        };
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
            if (0 === buffer.length) return -1;
            if ('string' == typeof byteOffset) {
                encoding = byteOffset;
                byteOffset = 0;
            } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
            else if (byteOffset < -2147483648) byteOffset = -2147483648;
            byteOffset *= 1;
            if (numberIsNaN(byteOffset)) byteOffset = dir ? 0 : buffer.length - 1;
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) if (dir) return -1;
            else byteOffset = buffer.length - 1;
            else if (byteOffset < 0) if (!dir) return -1;
            else byteOffset = 0;
            if ('string' == typeof val) val = Buffer.from(val, encoding);
            if (Buffer.isBuffer(val)) {
                if (0 === val.length) return -1;
                return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            }
            if ('number' == typeof val) {
                val &= 0xFF;
                if ('function' == typeof Uint8Array.prototype.indexOf) if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                return arrayIndexOf(buffer, [
                    val
                ], byteOffset, encoding, dir);
            }
            throw new TypeError('val must be string, number or Buffer');
        }
        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;
            if (void 0 !== encoding) {
                encoding = String(encoding).toLowerCase();
                if ('ucs2' === encoding || 'ucs-2' === encoding || 'utf16le' === encoding || 'utf-16le' === encoding) {
                    if (arr.length < 2 || val.length < 2) return -1;
                    indexSize = 2;
                    arrLength /= 2;
                    valLength /= 2;
                    byteOffset /= 2;
                }
            }
            function read(buf, i) {
                if (1 === indexSize) return buf[i];
                return buf.readUInt16BE(i * indexSize);
            }
            var i;
            if (dir) {
                var foundIndex = -1;
                for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
                    if (-1 === foundIndex) foundIndex = i;
                    if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                } else {
                    if (-1 !== foundIndex) i -= i - foundIndex;
                    foundIndex = -1;
                }
            } else {
                if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
                for(i = byteOffset; i >= 0; i--){
                    var found = true;
                    for(var j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                        found = false;
                        break;
                    }
                    if (found) return i;
                }
            }
            return -1;
        }
        Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
            return -1 !== this.indexOf(val, byteOffset, encoding);
        };
        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };
        Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };
        function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (length) {
                length = Number(length);
                if (length > remaining) length = remaining;
            } else length = remaining;
            var strLen = string.length;
            if (length > strLen / 2) length = strLen / 2;
            for(var i = 0; i < length; ++i){
                var parsed = parseInt(string.substr(2 * i, 2), 16);
                if (numberIsNaN(parsed)) break;
                buf[offset + i] = parsed;
            }
            return i;
        }
        function utf8Write(buf, string, offset, length) {
            return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
        }
        function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length);
        }
        function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length);
        }
        function ucs2Write(buf, string, offset, length) {
            return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
        }
        Buffer.prototype.write = function write(string, offset, length, encoding) {
            if (void 0 === offset) {
                encoding = 'utf8';
                length = this.length;
                offset = 0;
            } else if (void 0 === length && 'string' == typeof offset) {
                encoding = offset;
                length = this.length;
                offset = 0;
            } else if (isFinite(offset)) {
                offset >>>= 0;
                if (isFinite(length)) {
                    length >>>= 0;
                    if (void 0 === encoding) encoding = 'utf8';
                } else {
                    encoding = length;
                    length = void 0;
                }
            } else throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
            var remaining = this.length - offset;
            if (void 0 === length || length > remaining) length = remaining;
            if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError('Attempt to write outside buffer bounds');
            if (!encoding) encoding = 'utf8';
            var loweredCase = false;
            for(;;)switch(encoding){
                case 'hex':
                    return hexWrite(this, string, offset, length);
                case 'utf8':
                case 'utf-8':
                    return utf8Write(this, string, offset, length);
                case 'ascii':
                case 'latin1':
                case 'binary':
                    return asciiWrite(this, string, offset, length);
                case 'base64':
                    return base64Write(this, string, offset, length);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                    return ucs2Write(this, string, offset, length);
                default:
                    if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                    encoding = ('' + encoding).toLowerCase();
                    loweredCase = true;
            }
        };
        Buffer.prototype.toJSON = function toJSON() {
            return {
                type: 'Buffer',
                data: Array.prototype.slice.call(this._arr || this, 0)
            };
        };
        function base64Slice(buf, start, end) {
            if (0 === start && end === buf.length) return base64.fromByteArray(buf);
            return base64.fromByteArray(buf.slice(start, end));
        }
        function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];
            var i = start;
            while(i < end){
                var firstByte = buf[i];
                var codePoint = null;
                var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
                if (i + bytesPerSequence <= end) {
                    var secondByte, thirdByte, fourthByte, tempCodePoint;
                    switch(bytesPerSequence){
                        case 1:
                            if (firstByte < 0x80) codePoint = firstByte;
                            break;
                        case 2:
                            secondByte = buf[i + 1];
                            if ((0xC0 & secondByte) === 0x80) {
                                tempCodePoint = (0x1F & firstByte) << 0x6 | 0x3F & secondByte;
                                if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                            }
                            break;
                        case 3:
                            secondByte = buf[i + 1];
                            thirdByte = buf[i + 2];
                            if ((0xC0 & secondByte) === 0x80 && (0xC0 & thirdByte) === 0x80) {
                                tempCodePoint = (0xF & firstByte) << 0xC | (0x3F & secondByte) << 0x6 | 0x3F & thirdByte;
                                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                            }
                            break;
                        case 4:
                            secondByte = buf[i + 1];
                            thirdByte = buf[i + 2];
                            fourthByte = buf[i + 3];
                            if ((0xC0 & secondByte) === 0x80 && (0xC0 & thirdByte) === 0x80 && (0xC0 & fourthByte) === 0x80) {
                                tempCodePoint = (0xF & firstByte) << 0x12 | (0x3F & secondByte) << 0xC | (0x3F & thirdByte) << 0x6 | 0x3F & fourthByte;
                                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                            }
                    }
                }
                if (null === codePoint) {
                    codePoint = 0xFFFD;
                    bytesPerSequence = 1;
                } else if (codePoint > 0xFFFF) {
                    codePoint -= 0x10000;
                    res.push(codePoint >>> 10 & 0x3FF | 0xD800);
                    codePoint = 0xDC00 | 0x3FF & codePoint;
                }
                res.push(codePoint);
                i += bytesPerSequence;
            }
            return decodeCodePointsArray(res);
        }
        var MAX_ARGUMENTS_LENGTH = 0x1000;
        function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
            var res = '';
            var i = 0;
            while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
            return res;
        }
        function asciiSlice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);
            for(var i = start; i < end; ++i)ret += String.fromCharCode(0x7F & buf[i]);
            return ret;
        }
        function latin1Slice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);
            for(var i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
            return ret;
        }
        function hexSlice(buf, start, end) {
            var len = buf.length;
            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;
            var out = '';
            for(var i = start; i < end; ++i)out += hexSliceLookupTable[buf[i]];
            return out;
        }
        function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = '';
            for(var i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
            return res;
        }
        Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = void 0 === end ? len : ~~end;
            if (start < 0) {
                start += len;
                if (start < 0) start = 0;
            } else if (start > len) start = len;
            if (end < 0) {
                end += len;
                if (end < 0) end = 0;
            } else if (end > len) end = len;
            if (end < start) end = start;
            var newBuf = this.subarray(start, end);
            Object.setPrototypeOf(newBuf, Buffer.prototype);
            return newBuf;
        };
        function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
            if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
        }
        Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
            offset >>>= 0;
            byteLength >>>= 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;
            while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
            return val;
        };
        Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
            offset >>>= 0;
            byteLength >>>= 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset + --byteLength];
            var mul = 1;
            while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
            return val;
        };
        Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
        };
        Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | this[offset + 1] << 8;
        };
        Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] << 8 | this[offset + 1];
        };
        Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 0x1000000 * this[offset + 3];
        };
        Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return 0x1000000 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
        };
        Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
            offset >>>= 0;
            byteLength >>>= 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;
            while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
            mul *= 0x80;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength);
            return val;
        };
        Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
            offset >>>= 0;
            byteLength >>>= 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var i = byteLength;
            var mul = 1;
            var val = this[offset + --i];
            while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
            mul *= 0x80;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength);
            return val;
        };
        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(0x80 & this[offset])) return this[offset];
            return (0xff - this[offset] + 1) * -1;
        };
        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | this[offset + 1] << 8;
            return 0x8000 & val ? 0xFFFF0000 | val : val;
        };
        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | this[offset] << 8;
            return 0x8000 & val ? 0xFFFF0000 | val : val;
        };
        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
        };
        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
        };
        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
            offset >>>= 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
        }
        Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
            value *= 1;
            offset >>>= 0;
            byteLength >>>= 0;
            if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                checkInt(this, value, offset, byteLength, maxBytes, 0);
            }
            var mul = 1;
            var i = 0;
            this[offset] = 0xFF & value;
            while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
            return offset + byteLength;
        };
        Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
            value *= 1;
            offset >>>= 0;
            byteLength >>>= 0;
            if (!noAssert) {
                var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                checkInt(this, value, offset, byteLength, maxBytes, 0);
            }
            var i = byteLength - 1;
            var mul = 1;
            this[offset + i] = 0xFF & value;
            while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
            return offset + byteLength;
        };
        Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            this[offset] = 0xff & value;
            return offset + 1;
        };
        Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = 0xff & value;
            this[offset + 1] = value >>> 8;
            return offset + 2;
        };
        Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = 0xff & value;
            return offset + 2;
        };
        Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = 0xff & value;
            return offset + 4;
        };
        Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = 0xff & value;
            return offset + 4;
        };
        Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength - 1);
                checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }
            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = 0xFF & value;
            while(++i < byteLength && (mul *= 0x100)){
                if (value < 0 && 0 === sub && 0 !== this[offset + i - 1]) sub = 1;
                this[offset + i] = (value / mul | 0) - sub & 0xFF;
            }
            return offset + byteLength;
        };
        Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) {
                var limit = Math.pow(2, 8 * byteLength - 1);
                checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }
            var i = byteLength - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = 0xFF & value;
            while(--i >= 0 && (mul *= 0x100)){
                if (value < 0 && 0 === sub && 0 !== this[offset + i + 1]) sub = 1;
                this[offset + i] = (value / mul | 0) - sub & 0xFF;
            }
            return offset + byteLength;
        };
        Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
            if (value < 0) value = 0xff + value + 1;
            this[offset] = 0xff & value;
            return offset + 1;
        };
        Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
            this[offset] = 0xff & value;
            this[offset + 1] = value >>> 8;
            return offset + 2;
        };
        Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
            this[offset] = value >>> 8;
            this[offset + 1] = 0xff & value;
            return offset + 2;
        };
        Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
            this[offset] = 0xff & value;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
            return offset + 4;
        };
        Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
            if (value < 0) value = 0xffffffff + value + 1;
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = 0xff & value;
            return offset + 4;
        };
        function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
            if (offset < 0) throw new RangeError('Index out of range');
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
        }
        Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
            return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
            return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value *= 1;
            offset >>>= 0;
            if (!noAssert) checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157e+308);
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
        }
        Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
            return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
            return writeDouble(this, value, offset, false, noAssert);
        };
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
            if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
            if (!start) start = 0;
            if (!end && 0 !== end) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;
            if (end === start) return 0;
            if (0 === target.length || 0 === this.length) return 0;
            if (targetStart < 0) throw new RangeError('targetStart out of bounds');
            if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) end = target.length - targetStart + start;
            var len = end - start;
            if (this === target && 'function' == typeof Uint8Array.prototype.copyWithin) this.copyWithin(targetStart, start, end);
            else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
            return len;
        };
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
            if ('string' == typeof val) {
                if ('string' == typeof start) {
                    encoding = start;
                    start = 0;
                    end = this.length;
                } else if ('string' == typeof end) {
                    encoding = end;
                    end = this.length;
                }
                if (void 0 !== encoding && 'string' != typeof encoding) throw new TypeError('encoding must be a string');
                if ('string' == typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError('Unknown encoding: ' + encoding);
                if (1 === val.length) {
                    var code = val.charCodeAt(0);
                    if ('utf8' === encoding && code < 128 || 'latin1' === encoding) val = code;
                }
            } else if ('number' == typeof val) val &= 255;
            else if ('boolean' == typeof val) val = Number(val);
            if (start < 0 || this.length < start || this.length < end) throw new RangeError('Out of range index');
            if (end <= start) return this;
            start >>>= 0;
            end = void 0 === end ? this.length : end >>> 0;
            if (!val) val = 0;
            var i;
            if ('number' == typeof val) for(i = start; i < end; ++i)this[i] = val;
            else {
                var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
                var len = bytes.length;
                if (0 === len) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
                for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
            }
            return this;
        };
        var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
        function base64clean(str) {
            str = str.split('=')[0];
            str = str.trim().replace(INVALID_BASE64_RE, '');
            if (str.length < 2) return '';
            while(str.length % 4 !== 0)str += '=';
            return str;
        }
        function utf8ToBytes(string, units) {
            units = units || 1 / 0;
            var codePoint;
            var length = string.length;
            var leadSurrogate = null;
            var bytes = [];
            for(var i = 0; i < length; ++i){
                codePoint = string.charCodeAt(i);
                if (codePoint > 0xD7FF && codePoint < 0xE000) {
                    if (!leadSurrogate) {
                        if (codePoint > 0xDBFF) {
                            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                            continue;
                        }
                        if (i + 1 === length) {
                            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                            continue;
                        }
                        leadSurrogate = codePoint;
                        continue;
                    }
                    if (codePoint < 0xDC00) {
                        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                        leadSurrogate = codePoint;
                        continue;
                    }
                    codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
                } else if (leadSurrogate) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                }
                leadSurrogate = null;
                if (codePoint < 0x80) {
                    if ((units -= 1) < 0) break;
                    bytes.push(codePoint);
                } else if (codePoint < 0x800) {
                    if ((units -= 2) < 0) break;
                    bytes.push(codePoint >> 0x6 | 0xC0, 0x3F & codePoint | 0x80);
                } else if (codePoint < 0x10000) {
                    if ((units -= 3) < 0) break;
                    bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, 0x3F & codePoint | 0x80);
                } else if (codePoint < 0x110000) {
                    if ((units -= 4) < 0) break;
                    bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, 0x3F & codePoint | 0x80);
                } else throw new Error('Invalid code point');
            }
            return bytes;
        }
        function asciiToBytes(str) {
            var byteArray = [];
            for(var i = 0; i < str.length; ++i)byteArray.push(0xFF & str.charCodeAt(i));
            return byteArray;
        }
        function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];
            for(var i = 0; i < str.length; ++i){
                if ((units -= 2) < 0) break;
                c = str.charCodeAt(i);
                hi = c >> 8;
                lo = c % 256;
                byteArray.push(lo);
                byteArray.push(hi);
            }
            return byteArray;
        }
        function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
        }
        function blitBuffer(src, dst, offset, length) {
            for(var i = 0; i < length; ++i){
                if (i + offset >= dst.length || i >= src.length) break;
                dst[i + offset] = src[i];
            }
            return i;
        }
        function isInstance(obj, type) {
            return obj instanceof type || null != obj && null != obj.constructor && null != obj.constructor.name && obj.constructor.name === type.name;
        }
        function numberIsNaN(obj) {
            return obj !== obj;
        }
        var hexSliceLookupTable = function() {
            var alphabet = '0123456789abcdef';
            var table = new Array(256);
            for(var i = 0; i < 16; ++i){
                var i16 = 16 * i;
                for(var j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
            }
            return table;
        }();
    },
    "../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js" (module, __unused_rspack_exports, __webpack_require__) {
        var bind = __webpack_require__("../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
        var $apply = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js");
        var $call = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js");
        var $reflectApply = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js");
        module.exports = $reflectApply || bind.call($call, $apply);
    },
    "../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/applyBind.js" (module, __unused_rspack_exports, __webpack_require__) {
        var bind = __webpack_require__("../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
        var $apply = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js");
        var actualApply = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js");
        module.exports = function applyBind() {
            return actualApply(bind, $apply, arguments);
        };
    },
    "../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js" (module) {
        module.exports = Function.prototype.apply;
    },
    "../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js" (module) {
        module.exports = Function.prototype.call;
    },
    "../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var bind = __webpack_require__("../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
        var $TypeError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
        var $call = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js");
        var $actualApply = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js");
        module.exports = function callBindBasic(args) {
            if (args.length < 1 || 'function' != typeof args[0]) throw new $TypeError('a function is required');
            return $actualApply(bind, $call, args);
        };
    },
    "../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js" (module) {
        module.exports = "u" > typeof Reflect && Reflect && Reflect.apply;
    },
    "../../node_modules/.pnpm/call-bind@1.0.9/node_modules/call-bind/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var setFunctionLength = __webpack_require__("../../node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js");
        var $defineProperty = __webpack_require__("../../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");
        var callBindBasic = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js");
        var applyBind = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/applyBind.js");
        module.exports = function callBind(originalFunction) {
            var func = callBindBasic(arguments);
            var adjustedLength = 1 + originalFunction.length - (arguments.length - 1);
            return setFunctionLength(func, adjustedLength > 0 ? adjustedLength : 0, true);
        };
        if ($defineProperty) $defineProperty(module.exports, 'apply', {
            value: applyBind
        });
        else module.exports.apply = applyBind;
    },
    "../../node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var GetIntrinsic = __webpack_require__("../../node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js");
        var callBindBasic = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js");
        var $indexOf = callBindBasic([
            GetIntrinsic('%String.prototype.indexOf%')
        ]);
        module.exports = function callBoundIntrinsic(name, allowMissing) {
            var intrinsic = GetIntrinsic(name, !!allowMissing);
            if ('function' == typeof intrinsic && $indexOf(name, '.prototype.') > -1) return callBindBasic([
                intrinsic
            ]);
            return intrinsic;
        };
    },
    "../../node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var $defineProperty = __webpack_require__("../../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");
        var $SyntaxError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js");
        var $TypeError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
        var gopd = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
        module.exports = function defineDataProperty(obj, property, value) {
            if (!obj || 'object' != typeof obj && 'function' != typeof obj) throw new $TypeError('`obj` must be an object or a function`');
            if ('string' != typeof property && 'symbol' != typeof property) throw new $TypeError('`property` must be a string or a symbol`');
            if (arguments.length > 3 && 'boolean' != typeof arguments[3] && null !== arguments[3]) throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
            if (arguments.length > 4 && 'boolean' != typeof arguments[4] && null !== arguments[4]) throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
            if (arguments.length > 5 && 'boolean' != typeof arguments[5] && null !== arguments[5]) throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
            if (arguments.length > 6 && 'boolean' != typeof arguments[6]) throw new $TypeError('`loose`, if provided, must be a boolean');
            var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
            var nonWritable = arguments.length > 4 ? arguments[4] : null;
            var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
            var loose = arguments.length > 6 ? arguments[6] : false;
            var desc = !!gopd && gopd(obj, property);
            if ($defineProperty) $defineProperty(obj, property, {
                configurable: null === nonConfigurable && desc ? desc.configurable : !nonConfigurable,
                enumerable: null === nonEnumerable && desc ? desc.enumerable : !nonEnumerable,
                value: value,
                writable: null === nonWritable && desc ? desc.writable : !nonWritable
            });
            else if (!loose && (nonEnumerable || nonWritable || nonConfigurable)) throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
            else obj[property] = value;
        };
    },
    "../../node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js" (module, __unused_rspack_exports, __webpack_require__) {
        var callBind = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js");
        var gOPD = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
        var hasProtoAccessor;
        try {
            hasProtoAccessor = [].__proto__ === Array.prototype;
        } catch (e) {
            if (!e || 'object' != typeof e || !('code' in e) || 'ERR_PROTO_ACCESS' !== e.code) throw e;
        }
        var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, '__proto__');
        var $Object = Object;
        var $getPrototypeOf = $Object.getPrototypeOf;
        module.exports = desc && 'function' == typeof desc.get ? callBind([
            desc.get
        ]) : 'function' == typeof $getPrototypeOf ? function getDunder(value) {
            return $getPrototypeOf(null == value ? value : $Object(value));
        } : false;
    },
    "../../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js" (module) {
        var $defineProperty = Object.defineProperty || false;
        if ($defineProperty) try {
            $defineProperty({}, 'a', {
                value: 1
            });
        } catch (e) {
            $defineProperty = false;
        }
        module.exports = $defineProperty;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js" (module) {
        module.exports = EvalError;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js" (module) {
        module.exports = Error;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js" (module) {
        module.exports = RangeError;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js" (module) {
        module.exports = ReferenceError;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js" (module) {
        module.exports = SyntaxError;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js" (module) {
        module.exports = TypeError;
    },
    "../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js" (module) {
        module.exports = URIError;
    },
    "../../node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js" (module) {
        module.exports = Object;
    },
    "../../node_modules/.pnpm/for-each@0.3.5/node_modules/for-each/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var isCallable = __webpack_require__("../../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js");
        var toStr = Object.prototype.toString;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var forEachArray = function(array, iterator, receiver) {
            for(var i = 0, len = array.length; i < len; i++)if (hasOwnProperty.call(array, i)) if (null == receiver) iterator(array[i], i, array);
            else iterator.call(receiver, array[i], i, array);
        };
        var forEachString = function(string, iterator, receiver) {
            for(var i = 0, len = string.length; i < len; i++)if (null == receiver) iterator(string.charAt(i), i, string);
            else iterator.call(receiver, string.charAt(i), i, string);
        };
        var forEachObject = function(object, iterator, receiver) {
            for(var k in object)if (hasOwnProperty.call(object, k)) if (null == receiver) iterator(object[k], k, object);
            else iterator.call(receiver, object[k], k, object);
        };
        function isArray(x) {
            return '[object Array]' === toStr.call(x);
        }
        module.exports = function forEach(list, iterator, thisArg) {
            if (!isCallable(iterator)) throw new TypeError('iterator must be a function');
            var receiver;
            if (arguments.length >= 3) receiver = thisArg;
            if (isArray(list)) forEachArray(list, iterator, receiver);
            else if ('string' == typeof list) forEachString(list, iterator, receiver);
            else forEachObject(list, iterator, receiver);
        };
    },
    "../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js" (module) {
        var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
        var toStr = Object.prototype.toString;
        var max = Math.max;
        var funcType = '[object Function]';
        var concatty = function(a, b) {
            var arr = [];
            for(var i = 0; i < a.length; i += 1)arr[i] = a[i];
            for(var j = 0; j < b.length; j += 1)arr[j + a.length] = b[j];
            return arr;
        };
        var slicy = function(arrLike, offset) {
            var arr = [];
            for(var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1)arr[j] = arrLike[i];
            return arr;
        };
        var joiny = function(arr, joiner) {
            var str = '';
            for(var i = 0; i < arr.length; i += 1){
                str += arr[i];
                if (i + 1 < arr.length) str += joiner;
            }
            return str;
        };
        module.exports = function bind(that) {
            var target = this;
            if ('function' != typeof target || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
            var args = slicy(arguments, 1);
            var bound;
            var binder = function() {
                if (this instanceof bound) {
                    var result = target.apply(this, concatty(args, arguments));
                    if (Object(result) === result) return result;
                    return this;
                }
                return target.apply(that, concatty(args, arguments));
            };
            var boundLength = max(0, target.length - args.length);
            var boundArgs = [];
            for(var i = 0; i < boundLength; i++)boundArgs[i] = '$' + i;
            bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
            if (target.prototype) {
                var Empty = function() {};
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                Empty.prototype = null;
            }
            return bound;
        };
    },
    "../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var implementation = __webpack_require__("../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js");
        module.exports = Function.prototype.bind || implementation;
    },
    "../../node_modules/.pnpm/generator-function@2.0.1/node_modules/generator-function/index.js" (module) {
        const cached = (function*() {}).constructor;
        module.exports = ()=>cached;
    },
    "../../node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var undefined;
        var $Object = __webpack_require__("../../node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js");
        var $Error = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js");
        var $EvalError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js");
        var $RangeError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js");
        var $ReferenceError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js");
        var $SyntaxError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js");
        var $TypeError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
        var $URIError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js");
        var abs = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js");
        var floor = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js");
        var max = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js");
        var min = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js");
        var pow = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js");
        var round = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js");
        var sign = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js");
        var $Function = Function;
        var getEvalledConstructor = function(expressionSyntax) {
            try {
                return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
            } catch (e) {}
        };
        var $gOPD = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
        var $defineProperty = __webpack_require__("../../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");
        var throwTypeError = function() {
            throw new $TypeError();
        };
        var ThrowTypeError = $gOPD ? function() {
            try {
                arguments.callee;
                return throwTypeError;
            } catch (calleeThrows) {
                try {
                    return $gOPD(arguments, 'callee').get;
                } catch (gOPDthrows) {
                    return throwTypeError;
                }
            }
        }() : throwTypeError;
        var hasSymbols = __webpack_require__("../../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js")();
        var getProto = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js");
        var $ObjectGPO = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js");
        var $ReflectGPO = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js");
        var $apply = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js");
        var $call = __webpack_require__("../../node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js");
        var needsEval = {};
        var TypedArray = "u" > typeof Uint8Array && getProto ? getProto(Uint8Array) : undefined;
        var INTRINSICS = {
            __proto__: null,
            '%AggregateError%': "u" < typeof AggregateError ? undefined : AggregateError,
            '%Array%': Array,
            '%ArrayBuffer%': "u" < typeof ArrayBuffer ? undefined : ArrayBuffer,
            '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
            '%AsyncFromSyncIteratorPrototype%': undefined,
            '%AsyncFunction%': needsEval,
            '%AsyncGenerator%': needsEval,
            '%AsyncGeneratorFunction%': needsEval,
            '%AsyncIteratorPrototype%': needsEval,
            '%Atomics%': "u" < typeof Atomics ? undefined : Atomics,
            '%BigInt%': "u" < typeof BigInt ? undefined : BigInt,
            '%BigInt64Array%': "u" < typeof BigInt64Array ? undefined : BigInt64Array,
            '%BigUint64Array%': "u" < typeof BigUint64Array ? undefined : BigUint64Array,
            '%Boolean%': Boolean,
            '%DataView%': "u" < typeof DataView ? undefined : DataView,
            '%Date%': Date,
            '%decodeURI%': decodeURI,
            '%decodeURIComponent%': decodeURIComponent,
            '%encodeURI%': encodeURI,
            '%encodeURIComponent%': encodeURIComponent,
            '%Error%': $Error,
            '%eval%': eval,
            '%EvalError%': $EvalError,
            '%Float16Array%': "u" < typeof Float16Array ? undefined : Float16Array,
            '%Float32Array%': "u" < typeof Float32Array ? undefined : Float32Array,
            '%Float64Array%': "u" < typeof Float64Array ? undefined : Float64Array,
            '%FinalizationRegistry%': "u" < typeof FinalizationRegistry ? undefined : FinalizationRegistry,
            '%Function%': $Function,
            '%GeneratorFunction%': needsEval,
            '%Int8Array%': "u" < typeof Int8Array ? undefined : Int8Array,
            '%Int16Array%': "u" < typeof Int16Array ? undefined : Int16Array,
            '%Int32Array%': "u" < typeof Int32Array ? undefined : Int32Array,
            '%isFinite%': isFinite,
            '%isNaN%': isNaN,
            '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
            '%JSON%': 'object' == typeof JSON ? JSON : undefined,
            '%Map%': "u" < typeof Map ? undefined : Map,
            '%MapIteratorPrototype%': "u" > typeof Map && hasSymbols && getProto ? getProto(new Map()[Symbol.iterator]()) : undefined,
            '%Math%': Math,
            '%Number%': Number,
            '%Object%': $Object,
            "%Object.getOwnPropertyDescriptor%": $gOPD,
            '%parseFloat%': parseFloat,
            '%parseInt%': parseInt,
            '%Promise%': "u" < typeof Promise ? undefined : Promise,
            '%Proxy%': "u" < typeof Proxy ? undefined : Proxy,
            '%RangeError%': $RangeError,
            '%ReferenceError%': $ReferenceError,
            '%Reflect%': "u" < typeof Reflect ? undefined : Reflect,
            '%RegExp%': RegExp,
            '%Set%': "u" < typeof Set ? undefined : Set,
            '%SetIteratorPrototype%': "u" > typeof Set && hasSymbols && getProto ? getProto(new Set()[Symbol.iterator]()) : undefined,
            '%SharedArrayBuffer%': "u" < typeof SharedArrayBuffer ? undefined : SharedArrayBuffer,
            '%String%': String,
            '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
            '%Symbol%': hasSymbols ? Symbol : undefined,
            '%SyntaxError%': $SyntaxError,
            '%ThrowTypeError%': ThrowTypeError,
            '%TypedArray%': TypedArray,
            '%TypeError%': $TypeError,
            '%Uint8Array%': "u" < typeof Uint8Array ? undefined : Uint8Array,
            '%Uint8ClampedArray%': "u" < typeof Uint8ClampedArray ? undefined : Uint8ClampedArray,
            '%Uint16Array%': "u" < typeof Uint16Array ? undefined : Uint16Array,
            '%Uint32Array%': "u" < typeof Uint32Array ? undefined : Uint32Array,
            '%URIError%': $URIError,
            '%WeakMap%': "u" < typeof WeakMap ? undefined : WeakMap,
            '%WeakRef%': "u" < typeof WeakRef ? undefined : WeakRef,
            '%WeakSet%': "u" < typeof WeakSet ? undefined : WeakSet,
            '%Function.prototype.call%': $call,
            '%Function.prototype.apply%': $apply,
            '%Object.defineProperty%': $defineProperty,
            '%Object.getPrototypeOf%': $ObjectGPO,
            '%Math.abs%': abs,
            '%Math.floor%': floor,
            '%Math.max%': max,
            '%Math.min%': min,
            '%Math.pow%': pow,
            '%Math.round%': round,
            '%Math.sign%': sign,
            '%Reflect.getPrototypeOf%': $ReflectGPO
        };
        if (getProto) try {
            null.error;
        } catch (e) {
            var errorProto = getProto(getProto(e));
            INTRINSICS['%Error.prototype%'] = errorProto;
        }
        var doEval = function doEval(name) {
            var value;
            if ('%AsyncFunction%' === name) value = getEvalledConstructor('async function () {}');
            else if ('%GeneratorFunction%' === name) value = getEvalledConstructor('function* () {}');
            else if ('%AsyncGeneratorFunction%' === name) value = getEvalledConstructor('async function* () {}');
            else if ('%AsyncGenerator%' === name) {
                var fn = doEval('%AsyncGeneratorFunction%');
                if (fn) value = fn.prototype;
            } else if ('%AsyncIteratorPrototype%' === name) {
                var gen = doEval('%AsyncGenerator%');
                if (gen && getProto) value = getProto(gen.prototype);
            }
            INTRINSICS[name] = value;
            return value;
        };
        var LEGACY_ALIASES = {
            __proto__: null,
            '%ArrayBufferPrototype%': [
                'ArrayBuffer',
                'prototype'
            ],
            '%ArrayPrototype%': [
                'Array',
                'prototype'
            ],
            '%ArrayProto_entries%': [
                'Array',
                'prototype',
                'entries'
            ],
            '%ArrayProto_forEach%': [
                'Array',
                'prototype',
                'forEach'
            ],
            '%ArrayProto_keys%': [
                'Array',
                'prototype',
                'keys'
            ],
            '%ArrayProto_values%': [
                'Array',
                'prototype',
                'values'
            ],
            '%AsyncFunctionPrototype%': [
                'AsyncFunction',
                'prototype'
            ],
            '%AsyncGenerator%': [
                'AsyncGeneratorFunction',
                'prototype'
            ],
            '%AsyncGeneratorPrototype%': [
                'AsyncGeneratorFunction',
                'prototype',
                'prototype'
            ],
            '%BooleanPrototype%': [
                'Boolean',
                'prototype'
            ],
            '%DataViewPrototype%': [
                'DataView',
                'prototype'
            ],
            '%DatePrototype%': [
                'Date',
                'prototype'
            ],
            '%ErrorPrototype%': [
                'Error',
                'prototype'
            ],
            '%EvalErrorPrototype%': [
                'EvalError',
                'prototype'
            ],
            '%Float32ArrayPrototype%': [
                'Float32Array',
                'prototype'
            ],
            '%Float64ArrayPrototype%': [
                'Float64Array',
                'prototype'
            ],
            '%FunctionPrototype%': [
                'Function',
                'prototype'
            ],
            '%Generator%': [
                'GeneratorFunction',
                'prototype'
            ],
            '%GeneratorPrototype%': [
                'GeneratorFunction',
                'prototype',
                'prototype'
            ],
            '%Int8ArrayPrototype%': [
                'Int8Array',
                'prototype'
            ],
            '%Int16ArrayPrototype%': [
                'Int16Array',
                'prototype'
            ],
            '%Int32ArrayPrototype%': [
                'Int32Array',
                'prototype'
            ],
            '%JSONParse%': [
                'JSON',
                'parse'
            ],
            '%JSONStringify%': [
                'JSON',
                'stringify'
            ],
            '%MapPrototype%': [
                'Map',
                'prototype'
            ],
            '%NumberPrototype%': [
                'Number',
                'prototype'
            ],
            '%ObjectPrototype%': [
                'Object',
                'prototype'
            ],
            '%ObjProto_toString%': [
                'Object',
                'prototype',
                'toString'
            ],
            '%ObjProto_valueOf%': [
                'Object',
                'prototype',
                'valueOf'
            ],
            '%PromisePrototype%': [
                'Promise',
                'prototype'
            ],
            '%PromiseProto_then%': [
                'Promise',
                'prototype',
                'then'
            ],
            '%Promise_all%': [
                'Promise',
                'all'
            ],
            '%Promise_reject%': [
                'Promise',
                'reject'
            ],
            '%Promise_resolve%': [
                'Promise',
                'resolve'
            ],
            '%RangeErrorPrototype%': [
                'RangeError',
                'prototype'
            ],
            '%ReferenceErrorPrototype%': [
                'ReferenceError',
                'prototype'
            ],
            '%RegExpPrototype%': [
                'RegExp',
                'prototype'
            ],
            '%SetPrototype%': [
                'Set',
                'prototype'
            ],
            '%SharedArrayBufferPrototype%': [
                'SharedArrayBuffer',
                'prototype'
            ],
            '%StringPrototype%': [
                'String',
                'prototype'
            ],
            '%SymbolPrototype%': [
                'Symbol',
                'prototype'
            ],
            '%SyntaxErrorPrototype%': [
                'SyntaxError',
                'prototype'
            ],
            '%TypedArrayPrototype%': [
                'TypedArray',
                'prototype'
            ],
            '%TypeErrorPrototype%': [
                'TypeError',
                'prototype'
            ],
            '%Uint8ArrayPrototype%': [
                'Uint8Array',
                'prototype'
            ],
            '%Uint8ClampedArrayPrototype%': [
                'Uint8ClampedArray',
                'prototype'
            ],
            '%Uint16ArrayPrototype%': [
                'Uint16Array',
                'prototype'
            ],
            '%Uint32ArrayPrototype%': [
                'Uint32Array',
                'prototype'
            ],
            '%URIErrorPrototype%': [
                'URIError',
                'prototype'
            ],
            '%WeakMapPrototype%': [
                'WeakMap',
                'prototype'
            ],
            '%WeakSetPrototype%': [
                'WeakSet',
                'prototype'
            ]
        };
        var bind = __webpack_require__("../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
        var hasOwn = __webpack_require__("../../node_modules/.pnpm/hasown@2.0.3/node_modules/hasown/index.js");
        var $concat = bind.call($call, Array.prototype.concat);
        var $spliceApply = bind.call($apply, Array.prototype.splice);
        var $replace = bind.call($call, String.prototype.replace);
        var $strSlice = bind.call($call, String.prototype.slice);
        var $exec = bind.call($call, RegExp.prototype.exec);
        var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
        var reEscapeChar = /\\(\\)?/g;
        var stringToPath = function(string) {
            var first = $strSlice(string, 0, 1);
            var last = $strSlice(string, -1);
            if ('%' === first && '%' !== last) throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
            if ('%' === last && '%' !== first) throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
            var result = [];
            $replace(string, rePropName, function(match, number, quote, subString) {
                result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
            });
            return result;
        };
        var getBaseIntrinsic = function(name, allowMissing) {
            var intrinsicName = name;
            var alias;
            if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
                alias = LEGACY_ALIASES[intrinsicName];
                intrinsicName = '%' + alias[0] + '%';
            }
            if (hasOwn(INTRINSICS, intrinsicName)) {
                var value = INTRINSICS[intrinsicName];
                if (value === needsEval) value = doEval(intrinsicName);
                if (void 0 === value && !allowMissing) throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
                return {
                    alias: alias,
                    name: intrinsicName,
                    value: value
                };
            }
            throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
        };
        module.exports = function GetIntrinsic(name, allowMissing) {
            if ('string' != typeof name || 0 === name.length) throw new $TypeError('intrinsic name must be a non-empty string');
            if (arguments.length > 1 && 'boolean' != typeof allowMissing) throw new $TypeError('"allowMissing" argument must be a boolean');
            if (null === $exec(/^%?[^%]*%?$/, name)) throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
            var parts = stringToPath(name);
            var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
            var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
            var intrinsicRealName = intrinsic.name;
            var value = intrinsic.value;
            var skipFurtherCaching = false;
            var alias = intrinsic.alias;
            if (alias) {
                intrinsicBaseName = alias[0];
                $spliceApply(parts, $concat([
                    0,
                    1
                ], alias));
            }
            for(var i = 1, isOwn = true; i < parts.length; i += 1){
                var part = parts[i];
                var first = $strSlice(part, 0, 1);
                var last = $strSlice(part, -1);
                if (('"' === first || "'" === first || '`' === first || '"' === last || "'" === last || '`' === last) && first !== last) throw new $SyntaxError('property names with quotes must have matching quotes');
                if ('constructor' === part || !isOwn) skipFurtherCaching = true;
                intrinsicBaseName += '.' + part;
                intrinsicRealName = '%' + intrinsicBaseName + '%';
                if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
                else if (null != value) {
                    if (!(part in value)) {
                        if (!allowMissing) throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                        return;
                    }
                    if ($gOPD && i + 1 >= parts.length) {
                        var desc = $gOPD(value, part);
                        isOwn = !!desc;
                        value = isOwn && 'get' in desc && !('originalValue' in desc.get) ? desc.get : value[part];
                    } else {
                        isOwn = hasOwn(value, part);
                        value = value[part];
                    }
                    if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
                }
            }
            return value;
        };
    },
    "../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js" (module, __unused_rspack_exports, __webpack_require__) {
        var $Object = __webpack_require__("../../node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js");
        module.exports = $Object.getPrototypeOf || null;
    },
    "../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js" (module) {
        module.exports = "u" > typeof Reflect && Reflect.getPrototypeOf || null;
    },
    "../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var reflectGetProto = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js");
        var originalGetProto = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js");
        var getDunderProto = __webpack_require__("../../node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js");
        module.exports = reflectGetProto ? function getProto(O) {
            return reflectGetProto(O);
        } : originalGetProto ? function getProto(O) {
            if (!O || 'object' != typeof O && 'function' != typeof O) throw new TypeError('getProto: not an object');
            return originalGetProto(O);
        } : getDunderProto ? function getProto(O) {
            return getDunderProto(O);
        } : null;
    },
    "../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js" (module) {
        module.exports = Object.getOwnPropertyDescriptor;
    },
    "../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var $gOPD = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js");
        if ($gOPD) try {
            $gOPD([], 'length');
        } catch (e) {
            $gOPD = null;
        }
        module.exports = $gOPD;
    },
    "../../node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var $defineProperty = __webpack_require__("../../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");
        var hasPropertyDescriptors = function() {
            return !!$defineProperty;
        };
        hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
            if (!$defineProperty) return null;
            try {
                return 1 !== $defineProperty([], 'length', {
                    value: 1
                }).length;
            } catch (e) {
                return true;
            }
        };
        module.exports = hasPropertyDescriptors;
    },
    "../../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var origSymbol = "u" > typeof Symbol && Symbol;
        var hasSymbolSham = __webpack_require__("../../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js");
        module.exports = function hasNativeSymbols() {
            if ('function' != typeof origSymbol) return false;
            if ('function' != typeof Symbol) return false;
            if ('symbol' != typeof origSymbol('foo')) return false;
            if ('symbol' != typeof Symbol('bar')) return false;
            return hasSymbolSham();
        };
    },
    "../../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js" (module) {
        module.exports = function hasSymbols() {
            if ('function' != typeof Symbol || 'function' != typeof Object.getOwnPropertySymbols) return false;
            if ('symbol' == typeof Symbol.iterator) return true;
            var obj = {};
            var sym = Symbol('test');
            var symObj = Object(sym);
            if ('string' == typeof sym) return false;
            if ('[object Symbol]' !== Object.prototype.toString.call(sym)) return false;
            if ('[object Symbol]' !== Object.prototype.toString.call(symObj)) return false;
            var symVal = 42;
            obj[sym] = symVal;
            for(var _ in obj)return false;
            if ('function' == typeof Object.keys && 0 !== Object.keys(obj).length) return false;
            if ('function' == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(obj).length) return false;
            var syms = Object.getOwnPropertySymbols(obj);
            if (1 !== syms.length || syms[0] !== sym) return false;
            if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
            if ('function' == typeof Object.getOwnPropertyDescriptor) {
                var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
                if (descriptor.value !== symVal || true !== descriptor.enumerable) return false;
            }
            return true;
        };
    },
    "../../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js" (module, __unused_rspack_exports, __webpack_require__) {
        var hasSymbols = __webpack_require__("../../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js");
        module.exports = function hasToStringTagShams() {
            return hasSymbols() && !!Symbol.toStringTag;
        };
    },
    "../../node_modules/.pnpm/hasown@2.0.3/node_modules/hasown/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var call = Function.prototype.call;
        var $hasOwn = Object.prototype.hasOwnProperty;
        var bind = __webpack_require__("../../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
        module.exports = bind.call(call, $hasOwn);
    },
    "../../node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js" (__unused_rspack_module, exports) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m;
            var eLen = 8 * nBytes - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var nBits = -7;
            var i = isLE ? nBytes - 1 : 0;
            var d = isLE ? -1 : 1;
            var s = buffer[offset + i];
            i += d;
            e = s & (1 << -nBits) - 1;
            s >>= -nBits;
            nBits += eLen;
            for(; nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8);
            m = e & (1 << -nBits) - 1;
            e >>= -nBits;
            nBits += mLen;
            for(; nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8);
            if (0 === e) e = 1 - eBias;
            else {
                if (e === eMax) return m ? NaN : 1 / 0 * (s ? -1 : 1);
                m += Math.pow(2, mLen);
                e -= eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };
        exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c;
            var eLen = 8 * nBytes - mLen - 1;
            var eMax = (1 << eLen) - 1;
            var eBias = eMax >> 1;
            var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
            var i = isLE ? 0 : nBytes - 1;
            var d = isLE ? 1 : -1;
            var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
            value = Math.abs(value);
            if (isNaN(value) || value === 1 / 0) {
                m = isNaN(value) ? 1 : 0;
                e = eMax;
            } else {
                e = Math.floor(Math.log(value) / Math.LN2);
                if (value * (c = Math.pow(2, -e)) < 1) {
                    e--;
                    c *= 2;
                }
                if (e + eBias >= 1) value += rt / c;
                else value += rt * Math.pow(2, 1 - eBias);
                if (value * c >= 2) {
                    e++;
                    c /= 2;
                }
                if (e + eBias >= eMax) {
                    m = 0;
                    e = eMax;
                } else if (e + eBias >= 1) {
                    m = (value * c - 1) * Math.pow(2, mLen);
                    e += eBias;
                } else {
                    m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                    e = 0;
                }
            }
            for(; mLen >= 8; buffer[offset + i] = 0xff & m, i += d, m /= 256, mLen -= 8);
            e = e << mLen | m;
            eLen += mLen;
            for(; eLen > 0; buffer[offset + i] = 0xff & e, i += d, e /= 256, eLen -= 8);
            buffer[offset + i - d] |= 128 * s;
        };
    },
    "../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js" (module) {
        if ('function' == typeof Object.create) module.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            }
        };
        else module.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
                ctor.super_ = superCtor;
                var TempCtor = function() {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
            }
        };
    },
    "../../node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var hasToStringTag = __webpack_require__("../../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
        var callBound = __webpack_require__("../../node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js");
        var $toString = callBound('Object.prototype.toString');
        var isStandardArguments = function(value) {
            if (hasToStringTag && value && 'object' == typeof value && Symbol.toStringTag in value) return false;
            return '[object Arguments]' === $toString(value);
        };
        var isLegacyArguments = function(value) {
            if (isStandardArguments(value)) return true;
            return null !== value && 'object' == typeof value && 'length' in value && 'number' == typeof value.length && value.length >= 0 && '[object Array]' !== $toString(value) && 'callee' in value && '[object Function]' === $toString(value.callee);
        };
        var supportsStandardArguments = function() {
            return isStandardArguments(arguments);
        }();
        isStandardArguments.isLegacyArguments = isLegacyArguments;
        module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    },
    "../../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js" (module) {
        var fnToStr = Function.prototype.toString;
        var reflectApply = 'object' == typeof Reflect && null !== Reflect && Reflect.apply;
        var badArrayLike;
        var isCallableMarker;
        if ('function' == typeof reflectApply && 'function' == typeof Object.defineProperty) try {
            badArrayLike = Object.defineProperty({}, 'length', {
                get: function() {
                    throw isCallableMarker;
                }
            });
            isCallableMarker = {};
            reflectApply(function() {
                throw 42;
            }, null, badArrayLike);
        } catch (_) {
            if (_ !== isCallableMarker) reflectApply = null;
        }
        else reflectApply = null;
        var constructorRegex = /^\s*class\b/;
        var isES6ClassFn = function(value) {
            try {
                var fnStr = fnToStr.call(value);
                return constructorRegex.test(fnStr);
            } catch (e) {
                return false;
            }
        };
        var tryFunctionObject = function(value) {
            try {
                if (isES6ClassFn(value)) return false;
                fnToStr.call(value);
                return true;
            } catch (e) {
                return false;
            }
        };
        var toStr = Object.prototype.toString;
        var objectClass = '[object Object]';
        var fnClass = '[object Function]';
        var genClass = '[object GeneratorFunction]';
        var ddaClass = '[object HTMLAllCollection]';
        var ddaClass2 = '[object HTML document.all class]';
        var ddaClass3 = '[object HTMLCollection]';
        var hasToStringTag = 'function' == typeof Symbol && !!Symbol.toStringTag;
        var isIE68 = !(0 in [
            , 
        ]);
        var isDDA = function() {
            return false;
        };
        if ('object' == typeof document) {
            var all = document.all;
            if (toStr.call(all) === toStr.call(document.all)) isDDA = function isDocumentDotAll(value) {
                if ((isIE68 || !value) && (void 0 === value || 'object' == typeof value)) try {
                    var str = toStr.call(value);
                    return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && null == value('');
                } catch (e) {}
                return false;
            };
        }
        module.exports = reflectApply ? function isCallable(value) {
            if (isDDA(value)) return true;
            if (!value) return false;
            if ('function' != typeof value && 'object' != typeof value) return false;
            try {
                reflectApply(value, null, badArrayLike);
            } catch (e) {
                if (e !== isCallableMarker) return false;
            }
            return !isES6ClassFn(value) && tryFunctionObject(value);
        } : function isCallable(value) {
            if (isDDA(value)) return true;
            if (!value) return false;
            if ('function' != typeof value && 'object' != typeof value) return false;
            if (hasToStringTag) return tryFunctionObject(value);
            if (isES6ClassFn(value)) return false;
            var strClass = toStr.call(value);
            if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) return false;
            return tryFunctionObject(value);
        };
    },
    "../../node_modules/.pnpm/is-generator-function@1.1.2/node_modules/is-generator-function/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var callBound = __webpack_require__("../../node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js");
        var safeRegexTest = __webpack_require__("../../node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js");
        var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
        var hasToStringTag = __webpack_require__("../../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
        var getProto = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js");
        var toStr = callBound('Object.prototype.toString');
        var fnToStr = callBound('Function.prototype.toString');
        var getGeneratorFunction = __webpack_require__("../../node_modules/.pnpm/generator-function@2.0.1/node_modules/generator-function/index.js");
        module.exports = function isGeneratorFunction(fn) {
            if ('function' != typeof fn) return false;
            if (isFnRegex(fnToStr(fn))) return true;
            if (!hasToStringTag) {
                var str = toStr(fn);
                return '[object GeneratorFunction]' === str;
            }
            if (!getProto) return false;
            var GeneratorFunction = getGeneratorFunction();
            return GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;
        };
    },
    "../../node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var callBound = __webpack_require__("../../node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js");
        var hasToStringTag = __webpack_require__("../../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
        var hasOwn = __webpack_require__("../../node_modules/.pnpm/hasown@2.0.3/node_modules/hasown/index.js");
        var gOPD = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
        var fn;
        if (hasToStringTag) {
            var $exec = callBound('RegExp.prototype.exec');
            var isRegexMarker = {};
            var throwRegexMarker = function() {
                throw isRegexMarker;
            };
            var badStringifier = {
                toString: throwRegexMarker,
                valueOf: throwRegexMarker
            };
            if ('symbol' == typeof Symbol.toPrimitive) badStringifier[Symbol.toPrimitive] = throwRegexMarker;
            fn = function isRegex(value) {
                if (!value || 'object' != typeof value) return false;
                var descriptor = gOPD(value, 'lastIndex');
                var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
                if (!hasLastIndexDataProperty) return false;
                try {
                    $exec(value, badStringifier);
                } catch (e) {
                    return e === isRegexMarker;
                }
            };
        } else {
            var $toString = callBound('Object.prototype.toString');
            var regexClass = '[object RegExp]';
            fn = function isRegex(value) {
                if (!value || 'object' != typeof value && 'function' != typeof value) return false;
                return $toString(value) === regexClass;
            };
        }
        module.exports = fn;
    },
    "../../node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var whichTypedArray = __webpack_require__("../../node_modules/.pnpm/which-typed-array@1.1.20/node_modules/which-typed-array/index.js");
        module.exports = function isTypedArray(value) {
            return !!whichTypedArray(value);
        };
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js" (module) {
        module.exports = Math.abs;
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js" (module) {
        module.exports = Math.floor;
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js" (module) {
        module.exports = Number.isNaN || function isNaN1(a) {
            return a !== a;
        };
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js" (module) {
        module.exports = Math.max;
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js" (module) {
        module.exports = Math.min;
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js" (module) {
        module.exports = Math.pow;
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js" (module) {
        module.exports = Math.round;
    },
    "../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js" (module, __unused_rspack_exports, __webpack_require__) {
        var $isNaN = __webpack_require__("../../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js");
        module.exports = function sign(number) {
            if ($isNaN(number) || 0 === number) return number;
            return number < 0 ? -1 : 1;
        };
    },
    "../../node_modules/.pnpm/os-browserify@0.3.0/node_modules/os-browserify/browser.js" (__unused_rspack_module, exports) {
        exports._r = function() {
            if ("u" > typeof navigator) return navigator.appVersion;
            return '';
        };
        '\n';
    },
    "../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.browser.js" (module) {
        var x = String;
        var create = function() {
            return {
                isColorSupported: false,
                reset: x,
                bold: x,
                dim: x,
                italic: x,
                underline: x,
                inverse: x,
                hidden: x,
                strikethrough: x,
                black: x,
                red: x,
                green: x,
                yellow: x,
                blue: x,
                magenta: x,
                cyan: x,
                white: x,
                gray: x,
                bgBlack: x,
                bgRed: x,
                bgGreen: x,
                bgYellow: x,
                bgBlue: x,
                bgMagenta: x,
                bgCyan: x,
                bgWhite: x,
                blackBright: x,
                redBright: x,
                greenBright: x,
                yellowBright: x,
                blueBright: x,
                magentaBright: x,
                cyanBright: x,
                whiteBright: x,
                bgBlackBright: x,
                bgRedBright: x,
                bgGreenBright: x,
                bgYellowBright: x,
                bgBlueBright: x,
                bgMagentaBright: x,
                bgCyanBright: x,
                bgWhiteBright: x
            };
        };
        module.exports = create();
        module.exports.createColors = create;
    },
    "../../node_modules/.pnpm/possible-typed-array-names@1.1.0/node_modules/possible-typed-array-names/index.js" (module) {
        module.exports = [
            'Float16Array',
            'Float32Array',
            'Float64Array',
            'Int8Array',
            'Int16Array',
            'Int32Array',
            'Uint8Array',
            'Uint8ClampedArray',
            'Uint16Array',
            'Uint32Array',
            'BigInt64Array',
            'BigUint64Array'
        ];
    },
    "../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js" (module) {
        var process = module.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }
        (function() {
            try {
                cachedSetTimeout = 'function' == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = 'function' == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        })();
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) return;
            draining = false;
            if (currentQueue.length) queue = currentQueue.concat(queue);
            else queueIndex = -1;
            if (queue.length) drainQueue();
        }
        function drainQueue() {
            if (draining) return;
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while(len){
                currentQueue = queue;
                queue = [];
                while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
            queue.push(new Item(fun, args));
            if (1 === queue.length && !draining) runTimeout(drainQueue);
        };
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = '';
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
            return [];
        };
        process.binding = function(name) {
            throw new Error('process.binding is not supported');
        };
        process.cwd = function() {
            return '/';
        };
        process.chdir = function(dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function() {
            return 0;
        };
    },
    "../../node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var callBound = __webpack_require__("../../node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js");
        var isRegex = __webpack_require__("../../node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js");
        var $exec = callBound('RegExp.prototype.exec');
        var $TypeError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
        module.exports = function regexTester(regex) {
            if (!isRegex(regex)) throw new $TypeError('`regex` must be a RegExp');
            return function test(s) {
                return null !== $exec(regex, s);
            };
        };
    },
    "../../node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var GetIntrinsic = __webpack_require__("../../node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js");
        var define = __webpack_require__("../../node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js");
        var hasDescriptors = __webpack_require__("../../node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js")();
        var gOPD = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
        var $TypeError = __webpack_require__("../../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
        var $floor = GetIntrinsic('%Math.floor%');
        module.exports = function setFunctionLength(fn, length) {
            if ('function' != typeof fn) throw new $TypeError('`fn` is not a function');
            if ('number' != typeof length || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) throw new $TypeError('`length` must be a positive 32-bit integer');
            var loose = arguments.length > 2 && !!arguments[2];
            var functionLengthIsConfigurable = true;
            var functionLengthIsWritable = true;
            if ('length' in fn && gOPD) {
                var desc = gOPD(fn, 'length');
                if (desc && !desc.configurable) functionLengthIsConfigurable = false;
                if (desc && !desc.writable) functionLengthIsWritable = false;
            }
            if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) hasDescriptors ? define(fn, 'length', length, true, true) : define(fn, 'length', length);
            return fn;
        };
    },
    "../../node_modules/.pnpm/tty-browserify@0.0.1/node_modules/tty-browserify/index.js" (__unused_rspack_module, exports) {
        exports.vq = function() {
            return false;
        };
    },
    "../../node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js" (module) {
        module.exports = function isBuffer(arg) {
            return arg && 'object' == typeof arg && 'function' == typeof arg.copy && 'function' == typeof arg.fill && 'function' == typeof arg.readUInt8;
        };
    },
    "../../node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js" (__unused_rspack_module, exports, __webpack_require__) {
        var isArgumentsObject = __webpack_require__("../../node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js");
        var isGeneratorFunction = __webpack_require__("../../node_modules/.pnpm/is-generator-function@1.1.2/node_modules/is-generator-function/index.js");
        var whichTypedArray = __webpack_require__("../../node_modules/.pnpm/which-typed-array@1.1.20/node_modules/which-typed-array/index.js");
        var isTypedArray = __webpack_require__("../../node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js");
        function uncurryThis(f) {
            return f.call.bind(f);
        }
        var BigIntSupported = "u" > typeof BigInt;
        var SymbolSupported = "u" > typeof Symbol;
        var ObjectToString = uncurryThis(Object.prototype.toString);
        var numberValue = uncurryThis(Number.prototype.valueOf);
        var stringValue = uncurryThis(String.prototype.valueOf);
        var booleanValue = uncurryThis(Boolean.prototype.valueOf);
        if (BigIntSupported) var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
        if (SymbolSupported) var symbolValue = uncurryThis(Symbol.prototype.valueOf);
        function checkBoxedPrimitive(value, prototypeValueOf) {
            if ('object' != typeof value) return false;
            try {
                prototypeValueOf(value);
                return true;
            } catch (e) {
                return false;
            }
        }
        exports.isArgumentsObject = isArgumentsObject;
        exports.isGeneratorFunction = isGeneratorFunction;
        exports.isTypedArray = isTypedArray;
        function isPromise(input) {
            return "u" > typeof Promise && input instanceof Promise || null !== input && 'object' == typeof input && 'function' == typeof input.then && 'function' == typeof input.catch;
        }
        exports.isPromise = isPromise;
        function isArrayBufferView(value) {
            if ("u" > typeof ArrayBuffer && ArrayBuffer.isView) return ArrayBuffer.isView(value);
            return isTypedArray(value) || isDataView(value);
        }
        exports.isArrayBufferView = isArrayBufferView;
        function isUint8Array(value) {
            return 'Uint8Array' === whichTypedArray(value);
        }
        exports.isUint8Array = isUint8Array;
        function isUint8ClampedArray(value) {
            return 'Uint8ClampedArray' === whichTypedArray(value);
        }
        exports.isUint8ClampedArray = isUint8ClampedArray;
        function isUint16Array(value) {
            return 'Uint16Array' === whichTypedArray(value);
        }
        exports.isUint16Array = isUint16Array;
        function isUint32Array(value) {
            return 'Uint32Array' === whichTypedArray(value);
        }
        exports.isUint32Array = isUint32Array;
        function isInt8Array(value) {
            return 'Int8Array' === whichTypedArray(value);
        }
        exports.isInt8Array = isInt8Array;
        function isInt16Array(value) {
            return 'Int16Array' === whichTypedArray(value);
        }
        exports.isInt16Array = isInt16Array;
        function isInt32Array(value) {
            return 'Int32Array' === whichTypedArray(value);
        }
        exports.isInt32Array = isInt32Array;
        function isFloat32Array(value) {
            return 'Float32Array' === whichTypedArray(value);
        }
        exports.isFloat32Array = isFloat32Array;
        function isFloat64Array(value) {
            return 'Float64Array' === whichTypedArray(value);
        }
        exports.isFloat64Array = isFloat64Array;
        function isBigInt64Array(value) {
            return 'BigInt64Array' === whichTypedArray(value);
        }
        exports.isBigInt64Array = isBigInt64Array;
        function isBigUint64Array(value) {
            return 'BigUint64Array' === whichTypedArray(value);
        }
        exports.isBigUint64Array = isBigUint64Array;
        function isMapToString(value) {
            return '[object Map]' === ObjectToString(value);
        }
        isMapToString.working = "u" > typeof Map && isMapToString(new Map());
        function isMap(value) {
            if ("u" < typeof Map) return false;
            return isMapToString.working ? isMapToString(value) : value instanceof Map;
        }
        exports.isMap = isMap;
        function isSetToString(value) {
            return '[object Set]' === ObjectToString(value);
        }
        isSetToString.working = "u" > typeof Set && isSetToString(new Set());
        function isSet(value) {
            if ("u" < typeof Set) return false;
            return isSetToString.working ? isSetToString(value) : value instanceof Set;
        }
        exports.isSet = isSet;
        function isWeakMapToString(value) {
            return '[object WeakMap]' === ObjectToString(value);
        }
        isWeakMapToString.working = "u" > typeof WeakMap && isWeakMapToString(new WeakMap());
        function isWeakMap(value) {
            if ("u" < typeof WeakMap) return false;
            return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
        }
        exports.isWeakMap = isWeakMap;
        function isWeakSetToString(value) {
            return '[object WeakSet]' === ObjectToString(value);
        }
        isWeakSetToString.working = "u" > typeof WeakSet && isWeakSetToString(new WeakSet());
        function isWeakSet(value) {
            return isWeakSetToString(value);
        }
        exports.isWeakSet = isWeakSet;
        function isArrayBufferToString(value) {
            return '[object ArrayBuffer]' === ObjectToString(value);
        }
        isArrayBufferToString.working = "u" > typeof ArrayBuffer && isArrayBufferToString(new ArrayBuffer());
        function isArrayBuffer(value) {
            if ("u" < typeof ArrayBuffer) return false;
            return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
        }
        exports.isArrayBuffer = isArrayBuffer;
        function isDataViewToString(value) {
            return '[object DataView]' === ObjectToString(value);
        }
        isDataViewToString.working = "u" > typeof ArrayBuffer && "u" > typeof DataView && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
        function isDataView(value) {
            if ("u" < typeof DataView) return false;
            return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
        }
        exports.isDataView = isDataView;
        var SharedArrayBufferCopy = "u" > typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;
        function isSharedArrayBufferToString(value) {
            return '[object SharedArrayBuffer]' === ObjectToString(value);
        }
        function isSharedArrayBuffer(value) {
            if (void 0 === SharedArrayBufferCopy) return false;
            if (void 0 === isSharedArrayBufferToString.working) isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
            return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
        }
        exports.isSharedArrayBuffer = isSharedArrayBuffer;
        function isAsyncFunction(value) {
            return '[object AsyncFunction]' === ObjectToString(value);
        }
        exports.isAsyncFunction = isAsyncFunction;
        function isMapIterator(value) {
            return '[object Map Iterator]' === ObjectToString(value);
        }
        exports.isMapIterator = isMapIterator;
        function isSetIterator(value) {
            return '[object Set Iterator]' === ObjectToString(value);
        }
        exports.isSetIterator = isSetIterator;
        function isGeneratorObject(value) {
            return '[object Generator]' === ObjectToString(value);
        }
        exports.isGeneratorObject = isGeneratorObject;
        function isWebAssemblyCompiledModule(value) {
            return '[object WebAssembly.Module]' === ObjectToString(value);
        }
        exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
        function isNumberObject(value) {
            return checkBoxedPrimitive(value, numberValue);
        }
        exports.isNumberObject = isNumberObject;
        function isStringObject(value) {
            return checkBoxedPrimitive(value, stringValue);
        }
        exports.isStringObject = isStringObject;
        function isBooleanObject(value) {
            return checkBoxedPrimitive(value, booleanValue);
        }
        exports.isBooleanObject = isBooleanObject;
        function isBigIntObject(value) {
            return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
        }
        exports.isBigIntObject = isBigIntObject;
        function isSymbolObject(value) {
            return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
        }
        exports.isSymbolObject = isSymbolObject;
        function isBoxedPrimitive(value) {
            return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
        }
        exports.isBoxedPrimitive = isBoxedPrimitive;
        function isAnyArrayBuffer(value) {
            return "u" > typeof Uint8Array && (isArrayBuffer(value) || isSharedArrayBuffer(value));
        }
        exports.isAnyArrayBuffer = isAnyArrayBuffer;
        [
            'isProxy',
            'isExternal',
            'isModuleNamespaceObject'
        ].forEach(function(method) {
            Object.defineProperty(exports, method, {
                enumerable: false,
                value: function() {
                    throw new Error(method + ' is not supported in userland');
                }
            });
        });
    },
    "../../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js" (__unused_rspack_module, exports, __webpack_require__) {
        var process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
        var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
            var keys = Object.keys(obj);
            var descriptors = {};
            for(var i = 0; i < keys.length; i++)descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
            return descriptors;
        };
        var formatRegExp = /%[sdj%]/g;
        exports.format = function(f) {
            if (!isString(f)) {
                var objects = [];
                for(var i = 0; i < arguments.length; i++)objects.push(inspect(arguments[i]));
                return objects.join(' ');
            }
            var i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, function(x) {
                if ('%%' === x) return '%';
                if (i >= len) return x;
                switch(x){
                    case '%s':
                        return String(args[i++]);
                    case '%d':
                        return Number(args[i++]);
                    case '%j':
                        try {
                            return JSON.stringify(args[i++]);
                        } catch (_) {
                            return '[Circular]';
                        }
                    default:
                        return x;
                }
            });
            for(var x = args[i]; i < len; x = args[++i])if (isNull(x) || !isObject(x)) str += ' ' + x;
            else str += ' ' + inspect(x);
            return str;
        };
        exports.deprecate = function(fn, msg) {
            if (void 0 !== process && true === process.noDeprecation) return fn;
            if (void 0 === process) return function() {
                return exports.deprecate(fn, msg).apply(this, arguments);
            };
            var warned = false;
            function deprecated() {
                if (!warned) {
                    if (process.throwDeprecation) throw new Error(msg);
                    if (process.traceDeprecation) console.trace(msg);
                    else console.error(msg);
                    warned = true;
                }
                return fn.apply(this, arguments);
            }
            return deprecated;
        };
        var debugs = {};
        var debugEnvRegex = /^$/;
        if (process.env.NODE_DEBUG) {
            var debugEnv = process.env.NODE_DEBUG;
            debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '.*').replace(/,/g, '$|^').toUpperCase();
            debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
        }
        exports.debuglog = function(set) {
            set = set.toUpperCase();
            if (!debugs[set]) if (debugEnvRegex.test(set)) {
                var pid = process.pid;
                debugs[set] = function() {
                    var msg = exports.format.apply(exports, arguments);
                    console.error('%s %d: %s', set, pid, msg);
                };
            } else debugs[set] = function() {};
            return debugs[set];
        };
        function inspect(obj, opts) {
            var ctx = {
                seen: [],
                stylize: stylizeNoColor
            };
            if (arguments.length >= 3) ctx.depth = arguments[2];
            if (arguments.length >= 4) ctx.colors = arguments[3];
            if (isBoolean(opts)) ctx.showHidden = opts;
            else if (opts) exports._extend(ctx, opts);
            if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
            if (isUndefined(ctx.depth)) ctx.depth = 2;
            if (isUndefined(ctx.colors)) ctx.colors = false;
            if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
            if (ctx.colors) ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
        }
        exports.inspect = inspect;
        inspect.colors = {
            bold: [
                1,
                22
            ],
            italic: [
                3,
                23
            ],
            underline: [
                4,
                24
            ],
            inverse: [
                7,
                27
            ],
            white: [
                37,
                39
            ],
            grey: [
                90,
                39
            ],
            black: [
                30,
                39
            ],
            blue: [
                34,
                39
            ],
            cyan: [
                36,
                39
            ],
            green: [
                32,
                39
            ],
            magenta: [
                35,
                39
            ],
            red: [
                31,
                39
            ],
            yellow: [
                33,
                39
            ]
        };
        inspect.styles = {
            special: 'cyan',
            number: 'yellow',
            boolean: 'yellow',
            undefined: 'grey',
            null: 'bold',
            string: 'green',
            date: 'magenta',
            regexp: 'red'
        };
        function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
            return str;
        }
        function stylizeNoColor(str, styleType) {
            return str;
        }
        function arrayToHash(array) {
            var hash = {};
            array.forEach(function(val, idx) {
                hash[val] = true;
            });
            return hash;
        }
        function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
                var ret = value.inspect(recurseTimes, ctx);
                if (!isString(ret)) ret = formatValue(ctx, ret, recurseTimes);
                return ret;
            }
            var primitive = formatPrimitive(ctx, value);
            if (primitive) return primitive;
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) keys = Object.getOwnPropertyNames(value);
            if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
            if (0 === keys.length) {
                if (isFunction(value)) {
                    var name = value.name ? ': ' + value.name : '';
                    return ctx.stylize('[Function' + name + ']', 'special');
                }
                if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
                if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), 'date');
                if (isError(value)) return formatError(value);
            }
            var base = '', array = false, braces = [
                '{',
                '}'
            ];
            if (isArray(value)) {
                array = true;
                braces = [
                    '[',
                    ']'
                ];
            }
            if (isFunction(value)) {
                var n = value.name ? ': ' + value.name : '';
                base = ' [Function' + n + ']';
            }
            if (isRegExp(value)) base = ' ' + RegExp.prototype.toString.call(value);
            if (isDate(value)) base = ' ' + Date.prototype.toUTCString.call(value);
            if (isError(value)) base = ' ' + formatError(value);
            if (0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
            if (recurseTimes < 0) if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            else return ctx.stylize('[Object]', 'special');
            ctx.seen.push(value);
            var output;
            output = array ? formatArray(ctx, value, recurseTimes, visibleKeys, keys) : keys.map(function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
            if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
            if (isString(value)) {
                var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
                return ctx.stylize(simple, 'string');
            }
            if (isNumber(value)) return ctx.stylize('' + value, 'number');
            if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
            if (isNull(value)) return ctx.stylize('null', 'null');
        }
        function formatError(value) {
            return '[' + Error.prototype.toString.call(value) + ']';
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for(var i = 0, l = value.length; i < l; ++i)if (hasOwnProperty(value, String(i))) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
            else output.push('');
            keys.forEach(function(key) {
                if (!key.match(/^\d+$/)) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
            });
            return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || {
                value: value[key]
            };
            if (desc.get) str = desc.set ? ctx.stylize('[Getter/Setter]', 'special') : ctx.stylize('[Getter]', 'special');
            else if (desc.set) str = ctx.stylize('[Setter]', 'special');
            if (!hasOwnProperty(visibleKeys, key)) name = '[' + key + ']';
            if (!str) if (ctx.seen.indexOf(desc.value) < 0) {
                str = isNull(recurseTimes) ? formatValue(ctx, desc.value, null) : formatValue(ctx, desc.value, recurseTimes - 1);
                if (str.indexOf('\n') > -1) str = array ? str.split('\n').map(function(line) {
                    return '  ' + line;
                }).join('\n').slice(2) : '\n' + str.split('\n').map(function(line) {
                    return '   ' + line;
                }).join('\n');
            } else str = ctx.stylize('[Circular]', 'special');
            if (isUndefined(name)) {
                if (array && key.match(/^\d+$/)) return str;
                name = JSON.stringify('' + key);
                if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                    name = name.slice(1, -1);
                    name = ctx.stylize(name, 'name');
                } else {
                    name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                    name = ctx.stylize(name, 'string');
                }
            }
            return name + ': ' + str;
        }
        function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0;
            var length = output.reduce(function(prev, cur) {
                numLinesEst++;
                if (cur.indexOf('\n') >= 0) numLinesEst++;
                return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
            }, 0);
            if (length > 60) return braces[0] + ('' === base ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
            return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }
        exports.types = __webpack_require__("../../node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js");
        function isArray(ar) {
            return Array.isArray(ar);
        }
        exports.isArray = isArray;
        function isBoolean(arg) {
            return 'boolean' == typeof arg;
        }
        exports.isBoolean = isBoolean;
        function isNull(arg) {
            return null === arg;
        }
        exports.isNull = isNull;
        function isNullOrUndefined(arg) {
            return null == arg;
        }
        exports.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
            return 'number' == typeof arg;
        }
        exports.isNumber = isNumber;
        function isString(arg) {
            return 'string' == typeof arg;
        }
        exports.isString = isString;
        function isSymbol(arg) {
            return 'symbol' == typeof arg;
        }
        exports.isSymbol = isSymbol;
        function isUndefined(arg) {
            return void 0 === arg;
        }
        exports.isUndefined = isUndefined;
        function isRegExp(re) {
            return isObject(re) && '[object RegExp]' === objectToString(re);
        }
        exports.isRegExp = isRegExp;
        exports.types.isRegExp = isRegExp;
        function isObject(arg) {
            return 'object' == typeof arg && null !== arg;
        }
        exports.isObject = isObject;
        function isDate(d) {
            return isObject(d) && '[object Date]' === objectToString(d);
        }
        exports.isDate = isDate;
        exports.types.isDate = isDate;
        function isError(e) {
            return isObject(e) && ('[object Error]' === objectToString(e) || e instanceof Error);
        }
        exports.isError = isError;
        exports.types.isNativeError = isError;
        function isFunction(arg) {
            return 'function' == typeof arg;
        }
        exports.isFunction = isFunction;
        function isPrimitive(arg) {
            return null === arg || 'boolean' == typeof arg || 'number' == typeof arg || 'string' == typeof arg || 'symbol' == typeof arg || void 0 === arg;
        }
        exports.isPrimitive = isPrimitive;
        exports.isBuffer = __webpack_require__("../../node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js");
        function objectToString(o) {
            return Object.prototype.toString.call(o);
        }
        function pad(n) {
            return n < 10 ? '0' + n.toString(10) : n.toString(10);
        }
        var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        function timestamp() {
            var d = new Date();
            var time = [
                pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())
            ].join(':');
            return [
                d.getDate(),
                months[d.getMonth()],
                time
            ].join(' ');
        }
        exports.log = function() {
            console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
        };
        exports.inherits = __webpack_require__("../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js");
        exports._extend = function(origin, add) {
            if (!add || !isObject(add)) return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while(i--)origin[keys[i]] = add[keys[i]];
            return origin;
        };
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        var kCustomPromisifiedSymbol = "u" > typeof Symbol ? Symbol('util.promisify.custom') : void 0;
        exports.promisify = function promisify(original) {
            if ('function' != typeof original) throw new TypeError('The "original" argument must be of type Function');
            if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
                var fn = original[kCustomPromisifiedSymbol];
                if ('function' != typeof fn) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                    value: fn,
                    enumerable: false,
                    writable: false,
                    configurable: true
                });
                return fn;
            }
            function fn() {
                var promiseResolve, promiseReject;
                var promise = new Promise(function(resolve, reject) {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
                var args = [];
                for(var i = 0; i < arguments.length; i++)args.push(arguments[i]);
                args.push(function(err, value) {
                    if (err) promiseReject(err);
                    else promiseResolve(value);
                });
                try {
                    original.apply(this, args);
                } catch (err) {
                    promiseReject(err);
                }
                return promise;
            }
            Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
            if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                value: fn,
                enumerable: false,
                writable: false,
                configurable: true
            });
            return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
        };
        exports.promisify.custom = kCustomPromisifiedSymbol;
        function callbackifyOnRejected(reason, cb) {
            if (!reason) {
                var newReason = new Error('Promise was rejected with a falsy value');
                newReason.reason = reason;
                reason = newReason;
            }
            return cb(reason);
        }
        function callbackify(original) {
            if ('function' != typeof original) throw new TypeError('The "original" argument must be of type Function');
            function callbackified() {
                var args = [];
                for(var i = 0; i < arguments.length; i++)args.push(arguments[i]);
                var maybeCb = args.pop();
                if ('function' != typeof maybeCb) throw new TypeError('The last argument must be of type Function');
                var self = this;
                var cb = function() {
                    return maybeCb.apply(self, arguments);
                };
                original.apply(this, args).then(function(ret) {
                    process.nextTick(cb.bind(null, null, ret));
                }, function(rej) {
                    process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
                });
            }
            Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
            Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
            return callbackified;
        }
        exports.callbackify = callbackify;
    },
    "../../node_modules/.pnpm/which-typed-array@1.1.20/node_modules/which-typed-array/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var forEach = __webpack_require__("../../node_modules/.pnpm/for-each@0.3.5/node_modules/for-each/index.js");
        var availableTypedArrays = __webpack_require__("../../node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js");
        var callBind = __webpack_require__("../../node_modules/.pnpm/call-bind@1.0.9/node_modules/call-bind/index.js");
        var callBound = __webpack_require__("../../node_modules/.pnpm/call-bound@1.0.4/node_modules/call-bound/index.js");
        var gOPD = __webpack_require__("../../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
        var getProto = __webpack_require__("../../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js");
        var $toString = callBound('Object.prototype.toString');
        var hasToStringTag = __webpack_require__("../../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
        var g = "u" < typeof globalThis ? __webpack_require__.g : globalThis;
        var typedArrays = availableTypedArrays();
        var $slice = callBound('String.prototype.slice');
        var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
            for(var i = 0; i < array.length; i += 1)if (array[i] === value) return i;
            return -1;
        };
        var cache = {
            __proto__: null
        };
        hasToStringTag && gOPD && getProto ? forEach(typedArrays, function(typedArray) {
            var arr = new g[typedArray]();
            if (Symbol.toStringTag in arr && getProto) {
                var proto = getProto(arr);
                var descriptor = gOPD(proto, Symbol.toStringTag);
                if (!descriptor && proto) {
                    var superProto = getProto(proto);
                    descriptor = gOPD(superProto, Symbol.toStringTag);
                }
                if (descriptor && descriptor.get) {
                    var bound = callBind(descriptor.get);
                    cache['$' + typedArray] = bound;
                }
            }
        }) : forEach(typedArrays, function(typedArray) {
            var arr = new g[typedArray]();
            var fn = arr.slice || arr.set;
            if (fn) {
                var bound = callBind(fn);
                cache['$' + typedArray] = bound;
            }
        });
        var tryTypedArrays = function(value) {
            var found = false;
            forEach(cache, function(getter, typedArray) {
                if (!found) try {
                    if ('$' + getter(value) === typedArray) found = $slice(typedArray, 1);
                } catch (e) {}
            });
            return found;
        };
        var trySlices = function(value) {
            var found = false;
            forEach(cache, function(getter, name) {
                if (!found) try {
                    getter(value);
                    found = $slice(name, 1);
                } catch (e) {}
            });
            return found;
        };
        module.exports = function whichTypedArray(value) {
            if (!value || 'object' != typeof value) return false;
            if (!hasToStringTag) {
                var tag = $slice($toString(value), 8, -1);
                if ($indexOf(typedArrays, tag) > -1) return tag;
                if ('Object' !== tag) return false;
                return trySlices(value);
            }
            if (!gOPD) return null;
            return tryTypedArrays(value);
        };
    },
    "../../node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        var possibleNames = __webpack_require__("../../node_modules/.pnpm/possible-typed-array-names@1.1.0/node_modules/possible-typed-array-names/index.js");
        var g = "u" < typeof globalThis ? __webpack_require__.g : globalThis;
        module.exports = function availableTypedArrays() {
            var out = [];
            for(var i = 0; i < possibleNames.length; i++)if ('function' == typeof g[possibleNames[i]]) out[out.length] = possibleNames[i];
            return out;
        };
    }
});
var dist_namespaceObject = {};
__webpack_require__.r(dist_namespaceObject);
__webpack_require__.d(dist_namespaceObject, {
    DEFAULT_OPTIONS: ()=>DEFAULT_OPTIONS,
    format: ()=>dist_format,
    plugins: ()=>dist_plugins
});
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
const ROOT_SUITE_NAME = 'Rstest:_internal_root_suite';
const RSTEST_ENV_SYMBOL_KEY = 'rstest.env';
Symbol('defaultBuildCacheDirectory');
const globalApiList = [
    'test',
    'describe',
    'it',
    'expect',
    'afterAll',
    'afterEach',
    'beforeAll',
    'beforeEach',
    'rstest',
    'rs',
    'assert',
    'onTestFinished',
    'onTestFailed'
];
const globalApis = globalApiList;
const SYNTHETIC_STACK_ERROR_MESSAGE = 'STACK_TRACE_ERROR';
const util_0 = __webpack_require__("../../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js");
const process_browser = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
const browser = __webpack_require__("../../node_modules/.pnpm/os-browserify@0.3.0/node_modules/os-browserify/browser.js");
const tty_browserify = __webpack_require__("../../node_modules/.pnpm/tty-browserify@0.0.1/node_modules/tty-browserify/index.js");
var process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
function checkNodeVersion() {
    const { versions } = process;
    if ("styleText" in util_0 || !versions.node || versions.bun || versions.deno) return;
    throw new Error(`Unsupported Node.js version: "${process.versions.node || 'unknown'}". Expected Node.js >= 20.`);
}
checkNodeVersion();
const createStyler = (style)=>(text)=>util_0.styleText(style, String(text));
const dist_color = {
    dim: createStyler('dim'),
    red: createStyler('red'),
    bold: createStyler('bold'),
    blue: createStyler('blue'),
    cyan: createStyler('cyan'),
    gray: createStyler('gray'),
    black: createStyler('black'),
    green: createStyler('green'),
    white: createStyler('white'),
    reset: createStyler('reset'),
    yellow: createStyler('yellow'),
    magenta: createStyler('magenta'),
    underline: createStyler('underline'),
    strikethrough: createStyler('strikethrough')
};
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process_browser.argv) {
    const prefix = flag.startsWith('-') ? '' : 1 === flag.length ? '-' : '--';
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf('--');
    return -1 !== position && (-1 === terminatorPosition || position < terminatorPosition);
}
const { env: env } = process_browser;
let flagForceColor;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) flagForceColor = 0;
else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) flagForceColor = 1;
function envForceColor() {
    if (!('FORCE_COLOR' in env)) return;
    if ('true' === env.FORCE_COLOR) return 1;
    if ('false' === env.FORCE_COLOR) return 0;
    if (0 === env.FORCE_COLOR.length) return 1;
    const level = Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
    if (![
        0,
        1,
        2,
        3
    ].includes(level)) return;
    return level;
}
function translateLevel(level) {
    if (0 === level) return false;
    return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
    const noFlagForceColor = envForceColor();
    if (void 0 !== noFlagForceColor) flagForceColor = noFlagForceColor;
    const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
    if (0 === forceColor) return 0;
    if (sniffFlags) {
        if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) return 3;
        if (hasFlag('color=256')) return 2;
    }
    if ('TF_BUILD' in env && 'AGENT_NAME' in env) return 1;
    if (haveStream && !streamIsTTY && void 0 === forceColor) return 0;
    const min = forceColor || 0;
    if ('dumb' === env.TERM) return min;
    if ('win32' === process_browser.platform) {
        const osRelease = browser._r().split('.');
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ('CI' in env) {
        if ([
            'GITHUB_ACTIONS',
            'GITEA_ACTIONS',
            'CIRCLECI'
        ].some((key)=>key in env)) return 3;
        if ([
            'TRAVIS',
            'APPVEYOR',
            'GITLAB_CI',
            'BUILDKITE',
            'DRONE'
        ].some((sign)=>sign in env) || 'codeship' === env.CI_NAME) return 1;
        return min;
    }
    if ('TEAMCITY_VERSION' in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    if ('truecolor' === env.COLORTERM) return 3;
    if ('xterm-kitty' === env.TERM) return 3;
    if ('xterm-ghostty' === env.TERM) return 3;
    if ('wezterm' === env.TERM) return 3;
    if ('TERM_PROGRAM' in env) {
        const version = Number.parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
        switch(env.TERM_PROGRAM){
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Apple_Terminal':
                return 2;
        }
    }
    if (/-256(color)?$/i.test(env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
    if ('COLORTERM' in env) return 1;
    return min;
}
function createSupportsColor(stream, options = {}) {
    const level = _supportsColor(stream, {
        streamIsTTY: stream && stream.isTTY,
        ...options
    });
    return translateLevel(level);
}
const supportsColor = {
    stdout: createSupportsColor({
        isTTY: tty_browserify.vq(1)
    }),
    stderr: createSupportsColor({
        isTTY: tty_browserify.vq(2)
    })
};
const supports_color = supportsColor;
const colorLevel = supports_color.stdout ? supports_color.stdout.level : 0;
const errorStackRegExp = /at [^\r\n]{0,200}:\d+:\d+[\s\)]*$/;
const anonymousErrorStackRegExp = /at [^\r\n]{0,200}\(<anonymous>\)$/;
const indexErrorStackRegExp = /at [^\r\n]{0,200}\(index\s\d+\)$/;
const isErrorStackMessage = (message)=>errorStackRegExp.test(message) || anonymousErrorStackRegExp.test(message) || indexErrorStackRegExp.test(message);
const startColor = [
    189,
    255,
    243
];
const endColor = [
    74,
    194,
    154
];
const isWord = (char)=>!/[\s\n]/.test(char);
const gradient = (message)=>{
    if (colorLevel < 3) return 2 === colorLevel ? dist_color.cyan(message) : message;
    const chars = [
        ...message
    ];
    const steps = chars.filter(isWord).length;
    let r = startColor[0];
    let g = startColor[1];
    let b = startColor[2];
    const rStep = (endColor[0] - r) / steps;
    const gStep = (endColor[1] - g) / steps;
    const bStep = (endColor[2] - b) / steps;
    let output = '';
    for (const char of chars){
        if (isWord(char)) {
            r += rStep;
            g += gStep;
            b += bStep;
        }
        output += `\x1b[38;2;${Math.round(r)};${Math.round(g)};${Math.round(b)}m${char}\x1b[39m`;
    }
    return dist_color.bold(output);
};
const LOG_LEVEL = {
    silent: -1,
    error: 0,
    warn: 1,
    info: 2,
    log: 2,
    verbose: 3
};
const LOG_TYPES = {
    error: {
        label: 'error',
        level: 'error',
        color: dist_color.red
    },
    warn: {
        label: 'warn',
        level: 'warn',
        color: dist_color.yellow
    },
    info: {
        label: 'info',
        level: 'info',
        color: dist_color.cyan
    },
    start: {
        label: 'start',
        level: 'info',
        color: dist_color.cyan
    },
    ready: {
        label: 'ready',
        level: 'info',
        color: dist_color.green
    },
    success: {
        label: 'success',
        level: 'info',
        color: dist_color.green
    },
    log: {
        level: 'info'
    },
    debug: {
        label: 'debug',
        level: 'verbose',
        color: dist_color.magenta
    }
};
const normalizeErrorMessage = (err)=>{
    if (err.stack) {
        const [rawName, ...rest] = err.stack.split('\n');
        const name = rawName.startsWith('Error: ') ? rawName.slice(7) : rawName;
        return `${name}\n${dist_color.gray(rest.join('\n'))}`;
    }
    return err.message;
};
const createLogger = (options = {})=>{
    const { level = 'info', prefix, console: console1 = globalThis.console } = options;
    let maxLevel = level;
    const log = (type, message, ...args)=>{
        const logType = LOG_TYPES[type];
        const { level } = logType;
        if (LOG_LEVEL[level] > LOG_LEVEL[maxLevel]) return;
        if (null == message) return console1.log();
        let label = '';
        let text = '';
        if ('label' in logType) {
            label = (logType.label || '').padEnd(7);
            label = dist_color.bold(logType.color ? logType.color(label) : label);
        }
        if (message instanceof Error) {
            text += normalizeErrorMessage(message);
            const { cause } = message;
            if (cause) {
                text += dist_color.yellow('\n  [cause]: ');
                text += cause instanceof Error ? normalizeErrorMessage(cause) : String(cause);
            }
        } else if ('error' === level && 'string' == typeof message) {
            const lines = message.split('\n');
            text = lines.map((line)=>isErrorStackMessage(line) ? dist_color.gray(line) : line).join('\n');
        } else text = `${message}`;
        if (prefix) text = `${prefix} ${text}`;
        const method = 'error' === level || 'warn' === level ? level : 'log';
        console1[method](label.length ? `${label} ${text}` : text, ...args);
    };
    const logger = {
        greet: (message)=>log('log', gradient(message))
    };
    Object.keys(LOG_TYPES).forEach((key)=>{
        logger[key] = (...args)=>log(key, ...args);
    });
    Object.defineProperty(logger, 'level', {
        get: ()=>maxLevel,
        set (val) {
            maxLevel = val;
        }
    });
    Object.defineProperty(logger, 'options', {
        get: ()=>({
                ...options
            })
    });
    logger.override = (customLogger)=>{
        Object.assign(logger, customLogger);
    };
    return logger;
};
const src_logger = createLogger();
__webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
const picocolors_browser = __webpack_require__("../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.browser.js");
var logger_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
const isDebug = ()=>{
    if (!logger_process.env.DEBUG) return false;
    const values = logger_process.env.DEBUG.toLocaleLowerCase().split(',');
    return [
        'rstest',
        'rsbuild',
        'builder',
        '*'
    ].some((key)=>values.includes(key));
};
const logger_color = (0, picocolors_browser.createColors)();
if (isDebug()) src_logger.level = 'verbose';
function getTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
src_logger.override({
    debug: (message, ...args)=>{
        if ('verbose' !== src_logger.level) return;
        const time = logger_color.gray(getTime());
        console.log(`  ${logger_color.magenta('rstest')} ${time} ${message}`, ...args);
    }
});
({
    ...src_logger,
    stderr: (message, ...args)=>{
        console.error(message, ...args);
    }
});
var helper_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
function generateFilePathHash(project, testPath) {
    const str = `${project}\0${testPath}`;
    let h1 = 0x811c9dc5;
    let h2 = 0x811c9dc5;
    for(let i = 0; i < str.length; i++){
        h1 ^= str.charCodeAt(i);
        h1 = Math.imul(h1, 0x01000193);
    }
    for(let i = str.length - 1; i >= 0; i--){
        h2 ^= str.charCodeAt(i);
        h2 = Math.imul(h2, 0x01000193);
    }
    const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
    return (hex1 + hex2).slice(0, 10);
}
const helper_isObject = (obj)=>'[object Object]' === Object.prototype.toString.call(obj);
const castArray = (arr)=>{
    if (void 0 === arr) return [];
    return Array.isArray(arr) ? arr : [
        arr
    ];
};
const getTaskNames = (test)=>(test.parentNames || []).concat(test.name).filter(Boolean);
const getTaskNameWithPrefix = (test, delimiter = ">")=>getTaskNames(test).join(delimiter ? ` ${delimiter} ` : ' ');
const getFileTaskId = (testPath)=>`file:${testPath}`;
void 0 !== helper_process && helper_process.versions?.deno;
var chunk_BVHSVHOK_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
var chunk_BVHSVHOK_f = {
    reset: [
        0,
        0
    ],
    bold: [
        1,
        22,
        "\x1B[22m\x1B[1m"
    ],
    dim: [
        2,
        22,
        "\x1B[22m\x1B[2m"
    ],
    italic: [
        3,
        23
    ],
    underline: [
        4,
        24
    ],
    inverse: [
        7,
        27
    ],
    hidden: [
        8,
        28
    ],
    strikethrough: [
        9,
        29
    ],
    black: [
        30,
        39
    ],
    red: [
        31,
        39
    ],
    green: [
        32,
        39
    ],
    yellow: [
        33,
        39
    ],
    blue: [
        34,
        39
    ],
    magenta: [
        35,
        39
    ],
    cyan: [
        36,
        39
    ],
    white: [
        37,
        39
    ],
    gray: [
        90,
        39
    ],
    bgBlack: [
        40,
        49
    ],
    bgRed: [
        41,
        49
    ],
    bgGreen: [
        42,
        49
    ],
    bgYellow: [
        43,
        49
    ],
    bgBlue: [
        44,
        49
    ],
    bgMagenta: [
        45,
        49
    ],
    bgCyan: [
        46,
        49
    ],
    bgWhite: [
        47,
        49
    ],
    blackBright: [
        90,
        39
    ],
    redBright: [
        91,
        39
    ],
    greenBright: [
        92,
        39
    ],
    yellowBright: [
        93,
        39
    ],
    blueBright: [
        94,
        39
    ],
    magentaBright: [
        95,
        39
    ],
    cyanBright: [
        96,
        39
    ],
    whiteBright: [
        97,
        39
    ],
    bgBlackBright: [
        100,
        49
    ],
    bgRedBright: [
        101,
        49
    ],
    bgGreenBright: [
        102,
        49
    ],
    bgYellowBright: [
        103,
        49
    ],
    bgBlueBright: [
        104,
        49
    ],
    bgMagentaBright: [
        105,
        49
    ],
    bgCyanBright: [
        106,
        49
    ],
    bgWhiteBright: [
        107,
        49
    ]
}, chunk_BVHSVHOK_h = Object.entries(chunk_BVHSVHOK_f);
function chunk_BVHSVHOK_a(n) {
    return String(n);
}
chunk_BVHSVHOK_a.open = "";
chunk_BVHSVHOK_a.close = "";
function chunk_BVHSVHOK_C(n = !1) {
    let e = void 0 !== chunk_BVHSVHOK_process ? chunk_BVHSVHOK_process : void 0, i = (null == e ? void 0 : e.env) || {}, g = (null == e ? void 0 : e.argv) || [];
    return !("NO_COLOR" in i || g.includes("--no-color")) && ("FORCE_COLOR" in i || g.includes("--color") || (null == e ? void 0 : e.platform) === "win32" || n && "dumb" !== i.TERM || "CI" in i) || "u" > typeof window && !!window.chrome;
}
function chunk_BVHSVHOK_p(n = !1) {
    let e = chunk_BVHSVHOK_C(n), i = (r, t, c, o)=>{
        let l = "", s = 0;
        do l += r.substring(s, o) + c, s = o + t.length, o = r.indexOf(t, s);
        while (~o)
        return l + r.substring(s);
    }, g = (r, t, c = r)=>{
        let o = (l)=>{
            let s = String(l), b = s.indexOf(t, r.length);
            return ~b ? r + i(s, t, c, b) + t : r + s + t;
        };
        return o.open = r, o.close = t, o;
    }, u = {
        isColorSupported: e
    }, d = (r)=>`\x1B[${r}m`;
    for (let [r, t] of chunk_BVHSVHOK_h)u[r] = e ? g(d(t[0]), d(t[1]), t[2]) : chunk_BVHSVHOK_a;
    return u;
}
var browser_s = chunk_BVHSVHOK_p();
var dist_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
function _mergeNamespaces(n, m) {
    m.forEach(function(e) {
        e && 'string' != typeof e && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
            if ('default' !== k && !(k in n)) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function() {
                        return e[k];
                    }
                });
            }
        });
    });
    return Object.freeze(n);
}
function getKeysOfEnumerableProperties(object, compareKeys) {
    const rawKeys = Object.keys(object);
    const keys = null === compareKeys ? rawKeys : rawKeys.sort(compareKeys);
    if (Object.getOwnPropertySymbols) {
        for (const symbol of Object.getOwnPropertySymbols(object))if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) keys.push(symbol);
    }
    return keys;
}
function printIteratorEntries(iterator, config, indentation, depth, refs, printer, separator = ": ") {
    let result = "";
    let width = 0;
    let current = iterator.next();
    if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while(!current.done){
            result += indentationNext;
            if (width++ === config.maxWidth) {
                result += "…";
                break;
            }
            const name = printer(current.value[0], config, indentationNext, depth, refs);
            const value = printer(current.value[1], config, indentationNext, depth, refs);
            result += name + separator + value;
            current = iterator.next();
            if (current.done) {
                if (!config.min) result += ",";
            } else result += `,${config.spacingInner}`;
        }
        result += config.spacingOuter + indentation;
    }
    return result;
}
function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
    let result = "";
    let width = 0;
    let current = iterator.next();
    if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while(!current.done){
            result += indentationNext;
            if (width++ === config.maxWidth) {
                result += "…";
                break;
            }
            result += printer(current.value, config, indentationNext, depth, refs);
            current = iterator.next();
            if (current.done) {
                if (!config.min) result += ",";
            } else result += `,${config.spacingInner}`;
        }
        result += config.spacingOuter + indentation;
    }
    return result;
}
function printListItems(list, config, indentation, depth, refs, printer) {
    let result = "";
    list = list instanceof ArrayBuffer ? new DataView(list) : list;
    const isDataView = (l)=>l instanceof DataView;
    const length = isDataView(list) ? list.byteLength : list.length;
    if (length > 0) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for(let i = 0; i < length; i++){
            result += indentationNext;
            if (i === config.maxWidth) {
                result += "…";
                break;
            }
            if (isDataView(list) || i in list) result += printer(isDataView(list) ? list.getInt8(i) : list[i], config, indentationNext, depth, refs);
            if (i < length - 1) result += `,${config.spacingInner}`;
            else if (!config.min) result += ",";
        }
        result += config.spacingOuter + indentation;
    }
    return result;
}
function printObjectProperties(val, config, indentation, depth, refs, printer) {
    let result = "";
    const keys = getKeysOfEnumerableProperties(val, config.compareKeys);
    if (keys.length > 0) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            const name = printer(key, config, indentationNext, depth, refs);
            const value = printer(val[key], config, indentationNext, depth, refs);
            result += `${indentationNext + name}: ${value}`;
            if (i < keys.length - 1) result += `,${config.spacingInner}`;
            else if (!config.min) result += ",";
        }
        result += config.spacingOuter + indentation;
    }
    return result;
}
const asymmetricMatcher = "function" == typeof Symbol && Symbol.for ? Symbol.for("jest.asymmetricMatcher") : 1267621;
const SPACE$2 = " ";
const serialize$5 = (val, config, indentation, depth, refs, printer)=>{
    const stringedValue = val.toString();
    if ("ArrayContaining" === stringedValue || "ArrayNotContaining" === stringedValue) {
        if (++depth > config.maxDepth) return `[${stringedValue}]`;
        return `${stringedValue + SPACE$2}[${printListItems(val.sample, config, indentation, depth, refs, printer)}]`;
    }
    if ("ObjectContaining" === stringedValue || "ObjectNotContaining" === stringedValue) {
        if (++depth > config.maxDepth) return `[${stringedValue}]`;
        return `${stringedValue + SPACE$2}{${printObjectProperties(val.sample, config, indentation, depth, refs, printer)}}`;
    }
    if ("StringMatching" === stringedValue || "StringNotMatching" === stringedValue) return stringedValue + SPACE$2 + printer(val.sample, config, indentation, depth, refs);
    if ("StringContaining" === stringedValue || "StringNotContaining" === stringedValue) return stringedValue + SPACE$2 + printer(val.sample, config, indentation, depth, refs);
    if ("function" != typeof val.toAsymmetricMatcher) throw new TypeError(`Asymmetric matcher ${val.constructor.name} does not implement toAsymmetricMatcher()`);
    return val.toAsymmetricMatcher();
};
const test$5 = (val)=>val && val.$$typeof === asymmetricMatcher;
const plugin$5 = {
    serialize: serialize$5,
    test: test$5
};
const SPACE$1 = " ";
const OBJECT_NAMES = new Set([
    "DOMStringMap",
    "NamedNodeMap"
]);
const ARRAY_REGEXP = /^(?:HTML\w*Collection|NodeList)$/;
function testName(name) {
    return OBJECT_NAMES.has(name) || ARRAY_REGEXP.test(name);
}
const test$4 = (val)=>val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
function isNamedNodeMap(collection) {
    return "NamedNodeMap" === collection.constructor.name;
}
const serialize$4 = (collection, config, indentation, depth, refs, printer)=>{
    const name = collection.constructor.name;
    if (++depth > config.maxDepth) return `[${name}]`;
    return (config.min ? "" : name + SPACE$1) + (OBJECT_NAMES.has(name) ? `{${printObjectProperties(isNamedNodeMap(collection) ? [
        ...collection
    ].reduce((props, attribute)=>{
        props[attribute.name] = attribute.value;
        return props;
    }, {}) : {
        ...collection
    }, config, indentation, depth, refs, printer)}}` : `[${printListItems([
        ...collection
    ], config, indentation, depth, refs, printer)}]`);
};
const plugin$4 = {
    serialize: serialize$4,
    test: test$4
};
function escapeHTML(str) {
    return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function printProps(keys, props, config, indentation, depth, refs, printer) {
    const indentationNext = indentation + config.indent;
    const colors = config.colors;
    return keys.map((key)=>{
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);
        if ("string" != typeof value) {
            if (printed.includes("\n")) printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
            printed = `{${printed}}`;
        }
        return `${config.spacingInner + indentation + colors.prop.open + key + colors.prop.close}=${colors.value.open}${printed}${colors.value.close}`;
    }).join("");
}
function printChildren(children, config, indentation, depth, refs, printer) {
    return children.map((child)=>config.spacingOuter + indentation + ("string" == typeof child ? printText(child, config) : printer(child, config, indentation, depth, refs))).join("");
}
function printText(text, config) {
    const contentColor = config.colors.content;
    return contentColor.open + escapeHTML(text) + contentColor.close;
}
function printComment(comment, config) {
    const commentColor = config.colors.comment;
    return `${commentColor.open}<!--${escapeHTML(comment)}-->${commentColor.close}`;
}
function printElement(type, printedProps, printedChildren, config, indentation) {
    const tagColor = config.colors.tag;
    return `${tagColor.open}<${type}${printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open}${printedChildren ? `>${tagColor.close}${printedChildren}${config.spacingOuter}${indentation}${tagColor.open}</${type}` : `${printedProps && !config.min ? "" : " "}/`}>${tagColor.close}`;
}
function printElementAsLeaf(type, config) {
    const tagColor = config.colors.tag;
    return `${tagColor.open}<${type}${tagColor.close} …${tagColor.open} />${tagColor.close}`;
}
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const FRAGMENT_NODE = 11;
const ELEMENT_REGEXP = /^(?:(?:HTML|SVG)\w*)?Element$/;
function testHasAttribute(val) {
    try {
        return "function" == typeof val.hasAttribute && val.hasAttribute("is");
    } catch  {
        return false;
    }
}
function testNode(val) {
    const constructorName = val.constructor.name;
    const { nodeType, tagName } = val;
    const isCustomElement = "string" == typeof tagName && tagName.includes("-") || testHasAttribute(val);
    return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && "Text" === constructorName || nodeType === COMMENT_NODE && "Comment" === constructorName || nodeType === FRAGMENT_NODE && "DocumentFragment" === constructorName;
}
const test$3 = (val)=>{
    var _val$constructor;
    return (null == val || null == (_val$constructor = val.constructor) ? void 0 : _val$constructor.name) && testNode(val);
};
function nodeIsText(node) {
    return node.nodeType === TEXT_NODE;
}
function nodeIsComment(node) {
    return node.nodeType === COMMENT_NODE;
}
function nodeIsFragment(node) {
    return node.nodeType === FRAGMENT_NODE;
}
const serialize$3 = (node, config, indentation, depth, refs, printer)=>{
    if (nodeIsText(node)) return printText(node.data, config);
    if (nodeIsComment(node)) return printComment(node.data, config);
    const type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
    if (++depth > config.maxDepth) return printElementAsLeaf(type, config);
    return printElement(type, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes, (attr)=>attr.name).sort(), nodeIsFragment(node) ? {} : [
        ...node.attributes
    ].reduce((props, attribute)=>{
        props[attribute.name] = attribute.value;
        return props;
    }, {}), config, indentation + config.indent, depth, refs, printer), printChildren(Array.prototype.slice.call(node.childNodes || node.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
};
const plugin$3 = {
    serialize: serialize$3,
    test: test$3
};
const IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
const IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
const IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
const IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
const getImmutableName = (name)=>`Immutable.${name}`;
const printAsLeaf = (name)=>`[${name}]`;
const SPACE = " ";
const LAZY = "…";
function printImmutableEntries(val, config, indentation, depth, refs, printer, type) {
    return ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : `${getImmutableName(type) + SPACE}{${printIteratorEntries(val.entries(), config, indentation, depth, refs, printer)}}`;
}
function getRecordEntries(val) {
    let i = 0;
    return {
        next () {
            if (i < val._keys.length) {
                const key = val._keys[i++];
                return {
                    done: false,
                    value: [
                        key,
                        val.get(key)
                    ]
                };
            }
            return {
                done: true,
                value: void 0
            };
        }
    };
}
function printImmutableRecord(val, config, indentation, depth, refs, printer) {
    const name = getImmutableName(val._name || "Record");
    return ++depth > config.maxDepth ? printAsLeaf(name) : `${name + SPACE}{${printIteratorEntries(getRecordEntries(val), config, indentation, depth, refs, printer)}}`;
}
function printImmutableSeq(val, config, indentation, depth, refs, printer) {
    const name = getImmutableName("Seq");
    if (++depth > config.maxDepth) return printAsLeaf(name);
    if (val[IS_KEYED_SENTINEL]) return `${name + SPACE}{${val._iter || val._object ? printIteratorEntries(val.entries(), config, indentation, depth, refs, printer) : LAZY}}`;
    return `${name + SPACE}[${val._iter || val._array || val._collection || val._iterable ? printIteratorValues(val.values(), config, indentation, depth, refs, printer) : LAZY}]`;
}
function printImmutableValues(val, config, indentation, depth, refs, printer, type) {
    return ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : `${getImmutableName(type) + SPACE}[${printIteratorValues(val.values(), config, indentation, depth, refs, printer)}]`;
}
const serialize$2 = (val, config, indentation, depth, refs, printer)=>{
    if (val[IS_MAP_SENTINEL]) return printImmutableEntries(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map");
    if (val[IS_LIST_SENTINEL]) return printImmutableValues(val, config, indentation, depth, refs, printer, "List");
    if (val[IS_SET_SENTINEL]) return printImmutableValues(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set");
    if (val[IS_STACK_SENTINEL]) return printImmutableValues(val, config, indentation, depth, refs, printer, "Stack");
    if (val[IS_SEQ_SENTINEL]) return printImmutableSeq(val, config, indentation, depth, refs, printer);
    return printImmutableRecord(val, config, indentation, depth, refs, printer);
};
const test$2 = (val)=>val && (true === val[IS_ITERABLE_SENTINEL] || true === val[IS_RECORD_SENTINEL]);
const plugin$2 = {
    serialize: serialize$2,
    test: test$2
};
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
var reactIs$1 = {
    exports: {}
};
var reactIs_production = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hasRequiredReactIs_production;
function requireReactIs_production() {
    if (hasRequiredReactIs_production) return reactIs_production;
    hasRequiredReactIs_production = 1;
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
    function typeOf(object) {
        if ("object" == typeof object && null !== object) {
            var $$typeof = object.$$typeof;
            switch($$typeof){
                case REACT_ELEMENT_TYPE:
                    switch(object = object.type){
                        case REACT_FRAGMENT_TYPE:
                        case REACT_PROFILER_TYPE:
                        case REACT_STRICT_MODE_TYPE:
                        case REACT_SUSPENSE_TYPE:
                        case REACT_SUSPENSE_LIST_TYPE:
                        case REACT_VIEW_TRANSITION_TYPE:
                            return object;
                        default:
                            switch(object = object && object.$$typeof){
                                case REACT_CONTEXT_TYPE:
                                case REACT_FORWARD_REF_TYPE:
                                case REACT_LAZY_TYPE:
                                case REACT_MEMO_TYPE:
                                    return object;
                                case REACT_CONSUMER_TYPE:
                                    return object;
                                default:
                                    return $$typeof;
                            }
                    }
                case REACT_PORTAL_TYPE:
                    return $$typeof;
            }
        }
    }
    reactIs_production.ContextConsumer = REACT_CONSUMER_TYPE;
    reactIs_production.ContextProvider = REACT_CONTEXT_TYPE;
    reactIs_production.Element = REACT_ELEMENT_TYPE;
    reactIs_production.ForwardRef = REACT_FORWARD_REF_TYPE;
    reactIs_production.Fragment = REACT_FRAGMENT_TYPE;
    reactIs_production.Lazy = REACT_LAZY_TYPE;
    reactIs_production.Memo = REACT_MEMO_TYPE;
    reactIs_production.Portal = REACT_PORTAL_TYPE;
    reactIs_production.Profiler = REACT_PROFILER_TYPE;
    reactIs_production.StrictMode = REACT_STRICT_MODE_TYPE;
    reactIs_production.Suspense = REACT_SUSPENSE_TYPE;
    reactIs_production.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
    reactIs_production.isContextConsumer = function(object) {
        return typeOf(object) === REACT_CONSUMER_TYPE;
    };
    reactIs_production.isContextProvider = function(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
    };
    reactIs_production.isElement = function(object) {
        return "object" == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    };
    reactIs_production.isForwardRef = function(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
    };
    reactIs_production.isFragment = function(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
    };
    reactIs_production.isLazy = function(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
    };
    reactIs_production.isMemo = function(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
    };
    reactIs_production.isPortal = function(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
    };
    reactIs_production.isProfiler = function(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
    };
    reactIs_production.isStrictMode = function(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
    };
    reactIs_production.isSuspense = function(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
    };
    reactIs_production.isSuspenseList = function(object) {
        return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
    };
    reactIs_production.isValidElementType = function(type) {
        return "string" == typeof type || "function" == typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || "object" == typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || void 0 !== type.getModuleId);
    };
    reactIs_production.typeOf = typeOf;
    return reactIs_production;
}
var reactIs_development$1 = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hasRequiredReactIs_development$1;
function requireReactIs_development$1() {
    if (hasRequiredReactIs_development$1) return reactIs_development$1;
    hasRequiredReactIs_development$1 = 1;
    "production" !== dist_process.env.NODE_ENV && function() {
        function typeOf(object) {
            if ("object" == typeof object && null !== object) {
                var $$typeof = object.$$typeof;
                switch($$typeof){
                    case REACT_ELEMENT_TYPE:
                        switch(object = object.type){
                            case REACT_FRAGMENT_TYPE:
                            case REACT_PROFILER_TYPE:
                            case REACT_STRICT_MODE_TYPE:
                            case REACT_SUSPENSE_TYPE:
                            case REACT_SUSPENSE_LIST_TYPE:
                            case REACT_VIEW_TRANSITION_TYPE:
                                return object;
                            default:
                                switch(object = object && object.$$typeof){
                                    case REACT_CONTEXT_TYPE:
                                    case REACT_FORWARD_REF_TYPE:
                                    case REACT_LAZY_TYPE:
                                    case REACT_MEMO_TYPE:
                                        return object;
                                    case REACT_CONSUMER_TYPE:
                                        return object;
                                    default:
                                        return $$typeof;
                                }
                        }
                    case REACT_PORTAL_TYPE:
                        return $$typeof;
                }
            }
        }
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
        reactIs_development$1.ContextConsumer = REACT_CONSUMER_TYPE;
        reactIs_development$1.ContextProvider = REACT_CONTEXT_TYPE;
        reactIs_development$1.Element = REACT_ELEMENT_TYPE;
        reactIs_development$1.ForwardRef = REACT_FORWARD_REF_TYPE;
        reactIs_development$1.Fragment = REACT_FRAGMENT_TYPE;
        reactIs_development$1.Lazy = REACT_LAZY_TYPE;
        reactIs_development$1.Memo = REACT_MEMO_TYPE;
        reactIs_development$1.Portal = REACT_PORTAL_TYPE;
        reactIs_development$1.Profiler = REACT_PROFILER_TYPE;
        reactIs_development$1.StrictMode = REACT_STRICT_MODE_TYPE;
        reactIs_development$1.Suspense = REACT_SUSPENSE_TYPE;
        reactIs_development$1.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        reactIs_development$1.isContextConsumer = function(object) {
            return typeOf(object) === REACT_CONSUMER_TYPE;
        };
        reactIs_development$1.isContextProvider = function(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
        };
        reactIs_development$1.isElement = function(object) {
            return "object" == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        };
        reactIs_development$1.isForwardRef = function(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
        };
        reactIs_development$1.isFragment = function(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
        };
        reactIs_development$1.isLazy = function(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
        };
        reactIs_development$1.isMemo = function(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
        };
        reactIs_development$1.isPortal = function(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
        };
        reactIs_development$1.isProfiler = function(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
        };
        reactIs_development$1.isStrictMode = function(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
        };
        reactIs_development$1.isSuspense = function(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
        };
        reactIs_development$1.isSuspenseList = function(object) {
            return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        };
        reactIs_development$1.isValidElementType = function(type) {
            return "string" == typeof type || "function" == typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || "object" == typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || void 0 !== type.getModuleId);
        };
        reactIs_development$1.typeOf = typeOf;
    }();
    return reactIs_development$1;
}
var hasRequiredReactIs$1;
function requireReactIs$1() {
    if (hasRequiredReactIs$1) return reactIs$1.exports;
    hasRequiredReactIs$1 = 1;
    if ('production' === dist_process.env.NODE_ENV) reactIs$1.exports = requireReactIs_production();
    else reactIs$1.exports = requireReactIs_development$1();
    return reactIs$1.exports;
}
var reactIsExports$1 = requireReactIs$1();
var index$1 = /*@__PURE__*/ getDefaultExportFromCjs(reactIsExports$1);
var ReactIs19 = /*#__PURE__*/ _mergeNamespaces({
    __proto__: null,
    default: index$1
}, [
    reactIsExports$1
]);
var reactIs = {
    exports: {}
};
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
    if (hasRequiredReactIs_production_min) return reactIs_production_min;
    hasRequiredReactIs_production_min = 1;
    var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
    u = Symbol.for("react.module.reference");
    function v(a) {
        if ("object" == typeof a && null !== a) {
            var r = a.$$typeof;
            switch(r){
                case b:
                    switch(a = a.type){
                        case d:
                        case f:
                        case e:
                        case m:
                        case n:
                            return a;
                        default:
                            switch(a = a && a.$$typeof){
                                case k:
                                case h:
                                case l:
                                case q:
                                case p:
                                case g:
                                    return a;
                                default:
                                    return r;
                            }
                    }
                case c:
                    return r;
            }
        }
    }
    reactIs_production_min.ContextConsumer = h;
    reactIs_production_min.ContextProvider = g;
    reactIs_production_min.Element = b;
    reactIs_production_min.ForwardRef = l;
    reactIs_production_min.Fragment = d;
    reactIs_production_min.Lazy = q;
    reactIs_production_min.Memo = p;
    reactIs_production_min.Portal = c;
    reactIs_production_min.Profiler = f;
    reactIs_production_min.StrictMode = e;
    reactIs_production_min.Suspense = m;
    reactIs_production_min.SuspenseList = n;
    reactIs_production_min.isAsyncMode = function() {
        return false;
    };
    reactIs_production_min.isConcurrentMode = function() {
        return false;
    };
    reactIs_production_min.isContextConsumer = function(a) {
        return v(a) === h;
    };
    reactIs_production_min.isContextProvider = function(a) {
        return v(a) === g;
    };
    reactIs_production_min.isElement = function(a) {
        return "object" == typeof a && null !== a && a.$$typeof === b;
    };
    reactIs_production_min.isForwardRef = function(a) {
        return v(a) === l;
    };
    reactIs_production_min.isFragment = function(a) {
        return v(a) === d;
    };
    reactIs_production_min.isLazy = function(a) {
        return v(a) === q;
    };
    reactIs_production_min.isMemo = function(a) {
        return v(a) === p;
    };
    reactIs_production_min.isPortal = function(a) {
        return v(a) === c;
    };
    reactIs_production_min.isProfiler = function(a) {
        return v(a) === f;
    };
    reactIs_production_min.isStrictMode = function(a) {
        return v(a) === e;
    };
    reactIs_production_min.isSuspense = function(a) {
        return v(a) === m;
    };
    reactIs_production_min.isSuspenseList = function(a) {
        return v(a) === n;
    };
    reactIs_production_min.isValidElementType = function(a) {
        return "string" == typeof a || "function" == typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" == typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId);
    };
    reactIs_production_min.typeOf = v;
    return reactIs_production_min;
}
var reactIs_development = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hasRequiredReactIs_development;
function requireReactIs_development() {
    if (hasRequiredReactIs_development) return reactIs_development;
    hasRequiredReactIs_development = 1;
    if ("production" !== dist_process.env.NODE_ENV) (function() {
        var REACT_ELEMENT_TYPE = Symbol.for('react.element');
        var REACT_PORTAL_TYPE = Symbol.for('react.portal');
        var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
        var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
        var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
        var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
        var REACT_CONTEXT_TYPE = Symbol.for('react.context');
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
        var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
        var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
        var REACT_MEMO_TYPE = Symbol.for('react.memo');
        var REACT_LAZY_TYPE = Symbol.for('react.lazy');
        var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
        function isValidElementType(type) {
            if ('string' == typeof type || 'function' == typeof type) return true;
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) return true;
            if ('object' == typeof type && null !== type) {
                if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || void 0 !== type.getModuleId) return true;
            }
            return false;
        }
        function typeOf(object) {
            if ('object' == typeof object && null !== object) {
                var $$typeof = object.$$typeof;
                switch($$typeof){
                    case REACT_ELEMENT_TYPE:
                        var type = object.type;
                        switch(type){
                            case REACT_FRAGMENT_TYPE:
                            case REACT_PROFILER_TYPE:
                            case REACT_STRICT_MODE_TYPE:
                            case REACT_SUSPENSE_TYPE:
                            case REACT_SUSPENSE_LIST_TYPE:
                                return type;
                            default:
                                var $$typeofType = type && type.$$typeof;
                                switch($$typeofType){
                                    case REACT_SERVER_CONTEXT_TYPE:
                                    case REACT_CONTEXT_TYPE:
                                    case REACT_FORWARD_REF_TYPE:
                                    case REACT_LAZY_TYPE:
                                    case REACT_MEMO_TYPE:
                                    case REACT_PROVIDER_TYPE:
                                        return $$typeofType;
                                    default:
                                        return $$typeof;
                                }
                        }
                    case REACT_PORTAL_TYPE:
                        return $$typeof;
                }
            }
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element1 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                hasWarnedAboutDeprecatedIsAsyncMode = true;
                console['warn']("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
            return false;
        }
        function isConcurrentMode(object) {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
                hasWarnedAboutDeprecatedIsConcurrentMode = true;
                console['warn']("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
            return false;
        }
        function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
            return 'object' == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
            return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        reactIs_development.ContextConsumer = ContextConsumer;
        reactIs_development.ContextProvider = ContextProvider;
        reactIs_development.Element = Element1;
        reactIs_development.ForwardRef = ForwardRef;
        reactIs_development.Fragment = Fragment;
        reactIs_development.Lazy = Lazy;
        reactIs_development.Memo = Memo;
        reactIs_development.Portal = Portal;
        reactIs_development.Profiler = Profiler;
        reactIs_development.StrictMode = StrictMode;
        reactIs_development.Suspense = Suspense;
        reactIs_development.SuspenseList = SuspenseList;
        reactIs_development.isAsyncMode = isAsyncMode;
        reactIs_development.isConcurrentMode = isConcurrentMode;
        reactIs_development.isContextConsumer = isContextConsumer;
        reactIs_development.isContextProvider = isContextProvider;
        reactIs_development.isElement = isElement;
        reactIs_development.isForwardRef = isForwardRef;
        reactIs_development.isFragment = isFragment;
        reactIs_development.isLazy = isLazy;
        reactIs_development.isMemo = isMemo;
        reactIs_development.isPortal = isPortal;
        reactIs_development.isProfiler = isProfiler;
        reactIs_development.isStrictMode = isStrictMode;
        reactIs_development.isSuspense = isSuspense;
        reactIs_development.isSuspenseList = isSuspenseList;
        reactIs_development.isValidElementType = isValidElementType;
        reactIs_development.typeOf = typeOf;
    })();
    return reactIs_development;
}
var hasRequiredReactIs;
function requireReactIs() {
    if (hasRequiredReactIs) return reactIs.exports;
    hasRequiredReactIs = 1;
    if ('production' === dist_process.env.NODE_ENV) reactIs.exports = requireReactIs_production_min();
    else reactIs.exports = requireReactIs_development();
    return reactIs.exports;
}
var reactIsExports = requireReactIs();
var dist_index = /*@__PURE__*/ getDefaultExportFromCjs(reactIsExports);
var ReactIs18 = /*#__PURE__*/ _mergeNamespaces({
    __proto__: null,
    default: dist_index
}, [
    reactIsExports
]);
const reactIsMethods = [
    "isAsyncMode",
    "isConcurrentMode",
    "isContextConsumer",
    "isContextProvider",
    "isElement",
    "isForwardRef",
    "isFragment",
    "isLazy",
    "isMemo",
    "isPortal",
    "isProfiler",
    "isStrictMode",
    "isSuspense",
    "isSuspenseList",
    "isValidElementType"
];
const ReactIs = Object.fromEntries(reactIsMethods.map((m)=>[
        m,
        (v)=>ReactIs18[m](v) || ReactIs19[m](v)
    ]));
function getChildren(arg, children = []) {
    if (Array.isArray(arg)) for (const item of arg)getChildren(item, children);
    else if (null != arg && false !== arg && "" !== arg) children.push(arg);
    return children;
}
function getType(element) {
    const type = element.type;
    if ("string" == typeof type) return type;
    if ("function" == typeof type) return type.displayName || type.name || "Unknown";
    if (ReactIs.isFragment(element)) return "React.Fragment";
    if (ReactIs.isSuspense(element)) return "React.Suspense";
    if ("object" == typeof type && null !== type) {
        if (ReactIs.isContextProvider(element)) return "Context.Provider";
        if (ReactIs.isContextConsumer(element)) return "Context.Consumer";
        if (ReactIs.isForwardRef(element)) {
            if (type.displayName) return type.displayName;
            const functionName = type.render.displayName || type.render.name || "";
            return "" === functionName ? "ForwardRef" : `ForwardRef(${functionName})`;
        }
        if (ReactIs.isMemo(element)) {
            const functionName = type.displayName || type.type.displayName || type.type.name || "";
            return "" === functionName ? "Memo" : `Memo(${functionName})`;
        }
    }
    return "UNDEFINED";
}
function getPropKeys$1(element) {
    const { props } = element;
    return Object.keys(props).filter((key)=>"children" !== key && void 0 !== props[key]).sort();
}
const serialize$1 = (element, config, indentation, depth, refs, printer)=>++depth > config.maxDepth ? printElementAsLeaf(getType(element), config) : printElement(getType(element), printProps(getPropKeys$1(element), element.props, config, indentation + config.indent, depth, refs, printer), printChildren(getChildren(element.props.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
const test$1 = (val)=>null != val && ReactIs.isElement(val);
const plugin$1 = {
    serialize: serialize$1,
    test: test$1
};
const testSymbol = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.test.json") : 245830487;
function getPropKeys(object) {
    const { props } = object;
    return props ? Object.keys(props).filter((key)=>void 0 !== props[key]).sort() : [];
}
const serialize = (object, config, indentation, depth, refs, printer)=>++depth > config.maxDepth ? printElementAsLeaf(object.type, config) : printElement(object.type, object.props ? printProps(getPropKeys(object), object.props, config, indentation + config.indent, depth, refs, printer) : "", object.children ? printChildren(object.children, config, indentation + config.indent, depth, refs, printer) : "", config, indentation);
const dist_test = (val)=>val && val.$$typeof === testSymbol;
const dist_plugin = {
    serialize: serialize,
    test: dist_test
};
const dist_toString = Object.prototype.toString;
const toISOString = Date.prototype.toISOString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
function getConstructorName(val) {
    return "function" == typeof val.constructor && val.constructor.name || "Object";
}
function isWindow(val) {
    return "u" > typeof window && val === window;
}
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
const NEWLINE_REGEXP = /\n/g;
class PrettyFormatPluginError extends Error {
    constructor(message, stack){
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
    }
}
function isToStringedArrayType(toStringed) {
    return "[object Array]" === toStringed || "[object ArrayBuffer]" === toStringed || "[object DataView]" === toStringed || "[object Float32Array]" === toStringed || "[object Float64Array]" === toStringed || "[object Int8Array]" === toStringed || "[object Int16Array]" === toStringed || "[object Int32Array]" === toStringed || "[object Uint8Array]" === toStringed || "[object Uint8ClampedArray]" === toStringed || "[object Uint16Array]" === toStringed || "[object Uint32Array]" === toStringed;
}
function printNumber(val) {
    return Object.is(val, -0) ? "-0" : String(val);
}
function printBigInt(val) {
    return String(`${val}n`);
}
function printFunction(val, printFunctionName) {
    if (!printFunctionName) return "[Function]";
    return `[Function ${val.name || "anonymous"}]`;
}
function printSymbol(val) {
    return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
}
function printError(val) {
    return `[${errorToString.call(val)}]`;
}
function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
    if (true === val || false === val) return `${val}`;
    if (void 0 === val) return "undefined";
    if (null === val) return "null";
    const typeOf = typeof val;
    if ("number" === typeOf) return printNumber(val);
    if ("bigint" === typeOf) return printBigInt(val);
    if ("string" === typeOf) {
        if (escapeString) return `"${val.replaceAll(/"|\\/g, "\\$&")}"`;
        return `"${val}"`;
    }
    if ("function" === typeOf) return printFunction(val, printFunctionName);
    if ("symbol" === typeOf) return printSymbol(val);
    const toStringed = dist_toString.call(val);
    if ("[object WeakMap]" === toStringed) return "WeakMap {}";
    if ("[object WeakSet]" === toStringed) return "WeakSet {}";
    if ("[object Function]" === toStringed || "[object GeneratorFunction]" === toStringed) return printFunction(val, printFunctionName);
    if ("[object Symbol]" === toStringed) return printSymbol(val);
    if ("[object Date]" === toStringed) return Number.isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
    if ("[object Error]" === toStringed) return printError(val);
    if ("[object RegExp]" === toStringed) {
        if (escapeRegex) return regExpToString.call(val).replaceAll(/[$()*+.?[\\\]^{|}]/g, "\\$&");
        return regExpToString.call(val);
    }
    if (val instanceof Error) return printError(val);
    return null;
}
function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
    if (refs.includes(val)) return "[Circular]";
    refs = [
        ...refs
    ];
    refs.push(val);
    const hitMaxDepth = ++depth > config.maxDepth;
    const min = config.min;
    if (config.callToJSON && !hitMaxDepth && val.toJSON && "function" == typeof val.toJSON && !hasCalledToJSON) return dist_printer(val.toJSON(), config, indentation, depth, refs, true);
    const toStringed = dist_toString.call(val);
    if ("[object Arguments]" === toStringed) return hitMaxDepth ? "[Arguments]" : `${min ? "" : "Arguments "}[${printListItems(val, config, indentation, depth, refs, dist_printer)}]`;
    if (isToStringedArrayType(toStringed)) return hitMaxDepth ? `[${val.constructor.name}]` : `${min ? "" : !config.printBasicPrototype && "Array" === val.constructor.name ? "" : `${val.constructor.name} `}[${printListItems(val, config, indentation, depth, refs, dist_printer)}]`;
    if ("[object Map]" === toStringed) return hitMaxDepth ? "[Map]" : `Map {${printIteratorEntries(val.entries(), config, indentation, depth, refs, dist_printer, " => ")}}`;
    if ("[object Set]" === toStringed) return hitMaxDepth ? "[Set]" : `Set {${printIteratorValues(val.values(), config, indentation, depth, refs, dist_printer)}}`;
    return hitMaxDepth || isWindow(val) ? `[${getConstructorName(val)}]` : `${min ? "" : !config.printBasicPrototype && "Object" === getConstructorName(val) ? "" : `${getConstructorName(val)} `}{${printObjectProperties(val, config, indentation, depth, refs, dist_printer)}}`;
}
const ErrorPlugin = {
    test: (val)=>val && val instanceof Error,
    serialize (val, config, indentation, depth, refs, printer) {
        if (refs.includes(val)) return "[Circular]";
        refs = [
            ...refs,
            val
        ];
        const hitMaxDepth = ++depth > config.maxDepth;
        const { message, cause, ...rest } = val;
        const entries = {
            message,
            ...void 0 !== cause ? {
                cause
            } : {},
            ...val instanceof AggregateError ? {
                errors: val.errors
            } : {},
            ...rest
        };
        const name = "Error" !== val.name ? val.name : getConstructorName(val);
        return hitMaxDepth ? `[${name}]` : `${name} {${printIteratorEntries(Object.entries(entries).values(), config, indentation, depth, refs, printer)}}`;
    }
};
function isNewPlugin(plugin) {
    return null != plugin.serialize;
}
function printPlugin(plugin, val, config, indentation, depth, refs) {
    let printed;
    try {
        printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, dist_printer) : plugin.print(val, (valChild)=>dist_printer(valChild, config, indentation, depth, refs), (str)=>{
            const indentationNext = indentation + config.indent;
            return indentationNext + str.replaceAll(NEWLINE_REGEXP, `\n${indentationNext}`);
        }, {
            edgeSpacing: config.spacingOuter,
            min: config.min,
            spacing: config.spacingInner
        }, config.colors);
    } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
    }
    if ("string" != typeof printed) throw new TypeError(`pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`);
    return printed;
}
function findPlugin(plugins, val) {
    for (const plugin of plugins)try {
        if (plugin.test(val)) return plugin;
    } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
    }
    return null;
}
function dist_printer(val, config, indentation, depth, refs, hasCalledToJSON) {
    const plugin = findPlugin(config.plugins, val);
    if (null !== plugin) return printPlugin(plugin, val, config, indentation, depth, refs);
    const basicResult = printBasicValue(val, config.printFunctionName, config.escapeRegex, config.escapeString);
    if (null !== basicResult) return basicResult;
    return printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON);
}
const DEFAULT_THEME = {
    comment: "gray",
    content: "reset",
    prop: "yellow",
    tag: "cyan",
    value: "green"
};
const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
const DEFAULT_OPTIONS = {
    callToJSON: true,
    compareKeys: void 0,
    escapeRegex: false,
    escapeString: true,
    highlight: false,
    indent: 2,
    maxDepth: 1 / 0,
    maxWidth: 1 / 0,
    min: false,
    plugins: [],
    printBasicPrototype: true,
    printFunctionName: true,
    theme: DEFAULT_THEME
};
function validateOptions(options) {
    for (const key of Object.keys(options))if (!Object.prototype.hasOwnProperty.call(DEFAULT_OPTIONS, key)) throw new Error(`pretty-format: Unknown option "${key}".`);
    if (options.min && void 0 !== options.indent && 0 !== options.indent) throw new Error("pretty-format: Options \"min\" and \"indent\" cannot be used together.");
}
function getColorsHighlight() {
    return DEFAULT_THEME_KEYS.reduce((colors, key)=>{
        const value = DEFAULT_THEME[key];
        const color = value && browser_s[value];
        if (color && "string" == typeof color.close && "string" == typeof color.open) colors[key] = color;
        else throw new Error(`pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`);
        return colors;
    }, Object.create(null));
}
function getColorsEmpty() {
    return DEFAULT_THEME_KEYS.reduce((colors, key)=>{
        colors[key] = {
            close: "",
            open: ""
        };
        return colors;
    }, Object.create(null));
}
function getPrintFunctionName(options) {
    return (null == options ? void 0 : options.printFunctionName) ?? DEFAULT_OPTIONS.printFunctionName;
}
function getEscapeRegex(options) {
    return (null == options ? void 0 : options.escapeRegex) ?? DEFAULT_OPTIONS.escapeRegex;
}
function getEscapeString(options) {
    return (null == options ? void 0 : options.escapeString) ?? DEFAULT_OPTIONS.escapeString;
}
function getConfig(options) {
    return {
        callToJSON: (null == options ? void 0 : options.callToJSON) ?? DEFAULT_OPTIONS.callToJSON,
        colors: (null == options ? void 0 : options.highlight) ? getColorsHighlight() : getColorsEmpty(),
        compareKeys: "function" == typeof (null == options ? void 0 : options.compareKeys) || (null == options ? void 0 : options.compareKeys) === null ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
        escapeRegex: getEscapeRegex(options),
        escapeString: getEscapeString(options),
        indent: (null == options ? void 0 : options.min) ? "" : createIndent((null == options ? void 0 : options.indent) ?? DEFAULT_OPTIONS.indent),
        maxDepth: (null == options ? void 0 : options.maxDepth) ?? DEFAULT_OPTIONS.maxDepth,
        maxWidth: (null == options ? void 0 : options.maxWidth) ?? DEFAULT_OPTIONS.maxWidth,
        min: (null == options ? void 0 : options.min) ?? DEFAULT_OPTIONS.min,
        plugins: (null == options ? void 0 : options.plugins) ?? DEFAULT_OPTIONS.plugins,
        printBasicPrototype: (null == options ? void 0 : options.printBasicPrototype) ?? true,
        printFunctionName: getPrintFunctionName(options),
        spacingInner: (null == options ? void 0 : options.min) ? " " : "\n",
        spacingOuter: (null == options ? void 0 : options.min) ? "" : "\n"
    };
}
function createIndent(indent) {
    return Array.from({
        length: indent + 1
    }).join(" ");
}
function dist_format(val, options) {
    if (options) {
        validateOptions(options);
        if (options.plugins) {
            const plugin = findPlugin(options.plugins, val);
            if (null !== plugin) return printPlugin(plugin, val, getConfig(options), "", 0, []);
        }
    }
    const basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));
    if (null !== basicResult) return basicResult;
    return printComplexValue(val, getConfig(options), "", 0, []);
}
const dist_plugins = {
    AsymmetricMatcher: plugin$5,
    DOMCollection: plugin$4,
    DOMElement: plugin$3,
    Immutable: plugin$2,
    ReactElement: plugin$1,
    ReactTestComponent: dist_plugin,
    Error: ErrorPlugin
};
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
var Buffer = __webpack_require__("../../node_modules/.pnpm/buffer@5.7.1/node_modules/buffer/index.js").hp;
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
var promise_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
let getPromiseValue = ()=>'Promise{…}';
try {
    const { getPromiseDetails, kPending, kRejected } = promise_process.binding('util');
    if (Array.isArray(getPromiseDetails(Promise.resolve()))) getPromiseValue = (value, options)=>{
        const [state, innerValue] = getPromiseDetails(value);
        if (state === kPending) return 'Promise{<pending>}';
        return `Promise${state === kRejected ? '!' : ''}{${options.inspect(innerValue, options)}}`;
    };
} catch (notNode) {}
const lib_promise = getPromiseValue;
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
    Promise: lib_promise,
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
function chunk_commonjsHelpers_format(...args) {
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
function chunk_commonjsHelpers_getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
function assertTypes(value, name, types) {
    const receivedType = typeof value;
    const pass = types.includes(receivedType);
    if (!pass) throw new TypeError(`${name} value must be ${types.join(" or ")}, received "${receivedType}"`);
}
function helpers_isObject(item) {
    return null != item && "object" == typeof item && !Array.isArray(item);
}
function isFinalObj(obj) {
    return obj === Object.prototype || obj === Function.prototype || obj === RegExp.prototype;
}
function helpers_getType(value) {
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
    return helpers_clone(val, seen, options);
}
function helpers_clone(val, seen, options = defaultCloneOptions) {
    let k, out;
    if (seen.has(val)) return seen.get(val);
    if (Array.isArray(val)) {
        out = Array.from({
            length: k = val.length
        });
        seen.set(val, out);
        while(k--)out[k] = helpers_clone(val[k], seen, options);
        return out;
    }
    if ("[object Object]" === Object.prototype.toString.call(val)) {
        out = Object.create(Object.getPrototypeOf(val));
        seen.set(val, out);
        const props = getOwnProperties(val);
        for (const k of props){
            const descriptor = Object.getOwnPropertyDescriptor(val, k);
            if (!descriptor) continue;
            const cloned = helpers_clone(val[k], seen, options);
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
var diffSequences = /*@__PURE__*/ chunk_commonjsHelpers_getDefaultExportFromCjs(buildExports);
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
        aColor: browser_s.green,
        aIndicator: "-",
        bAnnotation: "Received",
        bColor: browser_s.red,
        bIndicator: "+",
        changeColor: browser_s.inverse,
        changeLineTrailingSpaceColor: noColor,
        commonColor: browser_s.dim,
        commonIndicator: " ",
        commonLineTrailingSpaceColor: noColor,
        compareKeys: void 0,
        contextLines: DIFF_CONTEXT_DEFAULT,
        emptyFirstOrLastLinePlaceholder: "",
        expand: false,
        includeChangeCounts: false,
        omitAnnotationLines: false,
        patchColor: browser_s.yellow,
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
    const type = helpers_getType(data);
    return "Object" === type && "function" == typeof data.asymmetricMatch;
}
function isReplaceable(obj1, obj2) {
    const obj1Type = helpers_getType(obj1);
    const obj2Type = helpers_getType(obj2);
    return obj1Type === obj2Type && ("Object" === obj1Type || "Array" === obj1Type);
}
function printDiffOrStringify(received, expected, options) {
    const { aAnnotation, bAnnotation } = normalizeDiffOptions(options);
    if ("string" == typeof expected && "string" == typeof received && expected.length > 0 && received.length > 0 && expected.length <= MAX_DIFF_STRING_LENGTH && received.length <= MAX_DIFF_STRING_LENGTH && expected !== received) {
        if (expected.includes("\n") || received.includes("\n")) return diffStringsUnified(expected, received, options);
        const [diffs] = diffStringsRaw(expected, received, true);
        const hasCommonDiff = diffs.some((diff)=>diff[0] === DIFF_EQUAL);
        const printLabel = getLabelPrinter(aAnnotation, bAnnotation);
        const expectedLine = printLabel(aAnnotation) + diff_printExpected(getCommonAndChangedSubstrings(diffs, DIFF_DELETE, hasCommonDiff));
        const receivedLine = printLabel(bAnnotation) + diff_printReceived(getCommonAndChangedSubstrings(diffs, DIFF_INSERT, hasCommonDiff));
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
function diff_printReceived(object) {
    return browser_s.red(replaceTrailingSpaces(stringify(object)));
}
function diff_printExpected(value) {
    return browser_s.green(replaceTrailingSpaces(stringify(value)));
}
function getCommonAndChangedSubstrings(diffs, op, hasCommonDiff) {
    return diffs.reduce((reduced, diff)=>reduced + (diff[0] === DIFF_EQUAL ? diff[1] : diff[0] === op ? hasCommonDiff ? browser_s.inverse(diff[1]) : diff[1] : ""), "");
}
function dist_S(e, t) {
    if (!e) throw new Error(t);
}
function dist_f(e, t) {
    return typeof t === e;
}
function dist_w(e) {
    return e instanceof Promise;
}
function dist_u(e, t, r) {
    Object.defineProperty(e, t, r);
}
function dist_l(e, t, r) {
    dist_u(e, t, {
        value: r,
        configurable: !0,
        writable: !0
    });
}
var dist_y = Symbol.for("tinyspy:spy");
var dist_x = /* @__PURE__ */ new Set(), dist_h = (e)=>{
    e.called = !1, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, dist_k = (e)=>(dist_u(e, dist_y, {
        value: {
            reset: ()=>dist_h(e[dist_y])
        }
    }), e[dist_y]), dist_T = (e)=>e[dist_y] || dist_k(e);
function dist_R(e) {
    dist_S(dist_f("function", e) || dist_f("undefined", e), "cannot spy on a non-function value");
    let t = function(...s) {
        let n = dist_T(t);
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
        return dist_w(o) && o.then((a)=>n.resolves[p] = [
                "ok",
                a
            ], (a)=>n.resolves[p] = [
                "error",
                a
            ]), n.results.push(g), o;
    };
    dist_l(t, "_isMockFunction", !0), dist_l(t, "length", e ? e.length : 0), dist_l(t, "name", e && e.name || "spy");
    let r = dist_T(t);
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
}, dist_P = (e, t)=>{
    null != t && "function" == typeof t && null != t.prototype && Object.setPrototypeOf(e.prototype, t.prototype);
};
function dist_M(e, t, r) {
    dist_S(!dist_f("undefined", e), "spyOn could not find an object to spy upon"), dist_S(dist_f("object", e) || dist_f("function", e), "cannot spyOn on a primitive value");
    let [s, n] = (()=>{
        if (!dist_f("object", t)) return [
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
    dist_S(o || s in e, `${String(s)} does not exist`);
    let c = !1;
    "value" === n && o && !o.value && o.get && (n = "get", c = !0, r = o.get());
    let p;
    o ? p = o[n] : "value" !== n ? p = ()=>e[s] : p = e[s], p && dist_j(p) && (p = p[dist_y].getOriginal());
    let g = (I)=>{
        let { value: F, ...O } = o || {
            configurable: !0,
            writable: !0
        };
        "value" !== n && delete O.writable, O[n] = I, dist_u(e, s, O);
    }, a = ()=>{
        d !== e ? Reflect.deleteProperty(e, s) : o && !p ? dist_u(e, s, o) : g(p);
    };
    r || (r = p);
    let i = dist_E(dist_R(r), r);
    "value" === n && dist_P(i, p);
    let m = i[dist_y];
    return dist_l(m, "restore", a), dist_l(m, "getOriginal", ()=>c ? p() : p), dist_l(m, "willCall", (I)=>(m.impl = I, i)), g(c ? ()=>(dist_P(i, r), i) : i), dist_x.add(i), i;
}
var dist_K = /* @__PURE__ */ new Set([
    "length",
    "name",
    "prototype"
]);
function dist_D(e) {
    let t = /* @__PURE__ */ new Set(), r = {};
    for(; e && e !== Object.prototype && e !== Function.prototype;){
        let s = [
            ...Object.getOwnPropertyNames(e),
            ...Object.getOwnPropertySymbols(e)
        ];
        for (let n of s)r[n] || dist_K.has(n) || (t.add(n), r[n] = Object.getOwnPropertyDescriptor(e, n));
        e = Object.getPrototypeOf(e);
    }
    return {
        properties: t,
        descriptors: r
    };
}
function dist_E(e, t) {
    if (!t || dist_y in t) return e;
    let { properties: r, descriptors: s } = dist_D(t);
    for (let n of r){
        let d = s[n];
        dist_b(e, n) || dist_u(e, n, d);
    }
    return e;
}
function dist_j(e) {
    return dist_v(e) && "getOriginal" in e[dist_y];
}
new Set();
function dist_isMockFunction(fn) {
    return "function" == typeof fn && "_isMockFunction" in fn && fn._isMockFunction;
}
var error_Buffer = __webpack_require__("../../node_modules/.pnpm/buffer@5.7.1/node_modules/buffer/index.js").hp;
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
    if (void 0 !== error_Buffer && val instanceof error_Buffer) return `<Buffer(${val.length}) ...>`;
    if ("u" > typeof Uint8Array && val instanceof Uint8Array) return `<Uint8Array(${val.length}) ...>`;
    if (isImmutable(val)) return serializeValue(val.toJSON(), seen);
    if (val instanceof Promise || val.constructor && "AsyncFunction" === val.constructor.prototype) return "Promise";
    if ("u" > typeof Element && val instanceof Element) return val.tagName;
    if ("function" == typeof val.asymmetricMatch) return `${val.toString()} ${chunk_commonjsHelpers_format(val.sample)}`;
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
function error_normalizeErrorMessage(message) {
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
        if ("string" == typeof err.message) err.message = error_normalizeErrorMessage(err.message);
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
var chai_Buffer = __webpack_require__("../../node_modules/.pnpm/buffer@5.7.1/node_modules/buffer/index.js").hp;
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
    flag: ()=>chai_flag,
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
    objDisplay: ()=>chai_objDisplay,
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
    getConstructorName: ()=>chai_getConstructorName,
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
function chai_getConstructorName(errorLike) {
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
__name(chai_getConstructorName, "getConstructorName");
function getMessage(errorLike) {
    let msg = "";
    if (errorLike && errorLike.message) msg = errorLike.message;
    else if ("string" == typeof errorLike) msg = errorLike;
    return msg;
}
__name(getMessage, "getMessage");
function chai_flag(obj, key, value) {
    let flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
    if (3 !== arguments.length) return flags[key];
    flags[key] = value;
}
__name(chai_flag, "flag");
function chai_test(obj, args) {
    let negate = chai_flag(obj, "negate"), expr = args[0];
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
__name(chai_colorise, "colorise");
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
__name(chai_normaliseOptions, "normaliseOptions");
function chai_isHighSurrogate(char) {
    return char >= "\uD800" && char <= "\uDBFF";
}
__name(chai_isHighSurrogate, "isHighSurrogate");
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
__name(chai_truncate, "truncate");
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
__name(chai_inspectList, "inspectList");
function chai_quoteComplexKey(key) {
    if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) return key;
    return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
__name(chai_quoteComplexKey, "quoteComplexKey");
function chai_inspectProperty([key, value], options) {
    options.truncate -= 2;
    if ("string" == typeof key) key = chai_quoteComplexKey(key);
    else if ("number" != typeof key) key = `[${options.inspect(key, options)}]`;
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key}: ${value}`;
}
__name(chai_inspectProperty, "inspectProperty");
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
__name(chai_inspectArray, "inspectArray");
var chai_getArrayName = /* @__PURE__ */ __name((array)=>{
    if ("function" == typeof chai_Buffer && array instanceof chai_Buffer) return "Buffer";
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
__name(chai_inspectTypedArray, "inspectTypedArray");
function chai_inspectDate(dateObject, options) {
    const stringRepresentation = dateObject.toJSON();
    if (null === stringRepresentation) return "Invalid Date";
    const split = stringRepresentation.split("T");
    const date = split[0];
    return options.stylize(`${date}T${chai_truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
__name(chai_inspectDate, "inspectDate");
function chai_inspectFunction(func, options) {
    const functionType = func[Symbol.toStringTag] || "Function";
    const name = func.name;
    if (!name) return options.stylize(`[${functionType}]`, "special");
    return options.stylize(`[${functionType} ${chai_truncate(name, options.truncate - 11)}]`, "special");
}
__name(chai_inspectFunction, "inspectFunction");
function chai_inspectMapEntry([key, value], options) {
    options.truncate -= 4;
    key = options.inspect(key, options);
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key} => ${value}`;
}
__name(chai_inspectMapEntry, "inspectMapEntry");
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
__name(chai_mapToEntries, "mapToEntries");
function chai_inspectMap(map, options) {
    if (0 === map.size) return "Map{}";
    options.truncate -= 7;
    return `Map{ ${chai_inspectList(chai_mapToEntries(map), options, chai_inspectMapEntry)} }`;
}
__name(chai_inspectMap, "inspectMap");
var chai_isNaN = Number.isNaN || ((i)=>i !== i);
function chai_inspectNumber(number, options) {
    if (chai_isNaN(number)) return options.stylize("NaN", "number");
    if (number === 1 / 0) return options.stylize("Infinity", "number");
    if (number === -1 / 0) return options.stylize("-Infinity", "number");
    if (0 === number) return options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number");
    return options.stylize(chai_truncate(String(number), options.truncate), "number");
}
__name(chai_inspectNumber, "inspectNumber");
function chai_inspectBigInt(number, options) {
    let nums = chai_truncate(number.toString(), options.truncate - 1);
    if (nums !== chai_truncator) nums += "n";
    return options.stylize(nums, "bigint");
}
__name(chai_inspectBigInt, "inspectBigInt");
function chai_inspectRegExp(value, options) {
    const flags = value.toString().split("/")[2];
    const sourceLength = options.truncate - (2 + flags.length);
    const source = value.source;
    return options.stylize(`/${chai_truncate(source, sourceLength)}/${flags}`, "regexp");
}
__name(chai_inspectRegExp, "inspectRegExp");
function chai_arrayFromSet(set2) {
    const values = [];
    set2.forEach((value)=>{
        values.push(value);
    });
    return values;
}
__name(chai_arrayFromSet, "arrayFromSet");
function chai_inspectSet(set2, options) {
    if (0 === set2.size) return "Set{}";
    options.truncate -= 7;
    return `Set{ ${chai_inspectList(chai_arrayFromSet(set2), options)} }`;
}
__name(chai_inspectSet, "inspectSet");
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
function chai_escape(char) {
    return chai_escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(chai_hex)}`.slice(-chai_unicodeLength)}`;
}
__name(chai_escape, "escape");
function chai_inspectString(string, options) {
    if (chai_stringEscapeChars.test(string)) string = string.replace(chai_stringEscapeChars, chai_escape);
    return options.stylize(`'${chai_truncate(string, options.truncate - 2)}'`, "string");
}
__name(chai_inspectString, "inspectString");
function chai_inspectSymbol(value) {
    if ("description" in Symbol.prototype) return value.description ? `Symbol(${value.description})` : "Symbol()";
    return value.toString();
}
__name(chai_inspectSymbol, "inspectSymbol");
var chai_getPromiseValue = /* @__PURE__ */ __name(()=>"Promise{\u2026}", "getPromiseValue");
var promise_default = chai_getPromiseValue;
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
__name(chai_inspectObject, "inspectObject");
var chai_toStringTag = "u" > typeof Symbol && Symbol.toStringTag ? Symbol.toStringTag : false;
function chai_inspectClass(value, options) {
    let name = "";
    if (chai_toStringTag && chai_toStringTag in value) name = value[chai_toStringTag];
    name = name || value.constructor.name;
    if (!name || "_class" === name) name = "<Anonymous Class>";
    options.truncate -= name.length;
    return `${name}${chai_inspectObject(value, options)}`;
}
__name(chai_inspectClass, "inspectClass");
function chai_inspectArguments(args, options) {
    if (0 === args.length) return "Arguments[]";
    options.truncate -= 13;
    return `Arguments[ ${chai_inspectList(args, options)} ]`;
}
__name(chai_inspectArguments, "inspectArguments");
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
function inspectObject2(error, options) {
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
__name(inspectObject2, "inspectObject");
function chai_inspectAttribute([key, value], options) {
    options.truncate -= 3;
    if (!value) return `${options.stylize(String(key), "yellow")}`;
    return `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}`;
}
__name(chai_inspectAttribute, "inspectAttribute");
function chai_inspectNodeCollection(collection, options) {
    return chai_inspectList(collection, options, chai_inspectNode, "\n");
}
__name(chai_inspectNodeCollection, "inspectNodeCollection");
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
__name(chai_inspectNode, "inspectNode");
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
__name(chai_inspectHTML, "inspectHTML");
var chai_symbolsSupported = "function" == typeof Symbol && "function" == typeof Symbol.for;
var chai_chaiInspect = chai_symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
var chai_nodeInspect = Symbol.for("nodejs.util.inspect.custom");
var chai_constructorMap = /* @__PURE__ */ new WeakMap();
var chai_stringTagMap = {};
var chai_baseTypesMap = {
    undefined: /* @__PURE__ */ __name((value, options)=>options.stylize("undefined", "undefined"), "undefined"),
    null: /* @__PURE__ */ __name((value, options)=>options.stylize("null", "null"), "null"),
    boolean: /* @__PURE__ */ __name((value, options)=>options.stylize(String(value), "boolean"), "boolean"),
    Boolean: /* @__PURE__ */ __name((value, options)=>options.stylize(String(value), "boolean"), "Boolean"),
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
    Promise: promise_default,
    WeakSet: /* @__PURE__ */ __name((value, options)=>options.stylize("WeakSet{\u2026}", "special"), "WeakSet"),
    WeakMap: /* @__PURE__ */ __name((value, options)=>options.stylize("WeakMap{\u2026}", "special"), "WeakMap"),
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
    Generator: /* @__PURE__ */ __name(()=>"", "Generator"),
    DataView: /* @__PURE__ */ __name(()=>"", "DataView"),
    ArrayBuffer: /* @__PURE__ */ __name(()=>"", "ArrayBuffer"),
    Error: inspectObject2,
    HTMLCollection: chai_inspectNodeCollection,
    NodeList: chai_inspectNodeCollection
};
var chai_inspectCustom = /* @__PURE__ */ __name((value, options, type3)=>{
    if (chai_chaiInspect in value && "function" == typeof value[chai_chaiInspect]) return value[chai_chaiInspect](options);
    if (chai_nodeInspect in value && "function" == typeof value[chai_nodeInspect]) return value[chai_nodeInspect](options.depth, options);
    if ("inspect" in value && "function" == typeof value.inspect) return value.inspect(options.depth, options);
    if ("constructor" in value && chai_constructorMap.has(value.constructor)) return chai_constructorMap.get(value.constructor)(value, options);
    if (chai_stringTagMap[type3]) return chai_stringTagMap[type3](value, options);
    return "";
}, "inspectCustom");
var chai_toString = Object.prototype.toString;
function chai_inspect(value, opts = {}) {
    const options = chai_normaliseOptions(opts, chai_inspect);
    const { customInspect } = options;
    let type3 = null === value ? "null" : typeof value;
    if ("object" === type3) type3 = chai_toString.call(value).slice(8, -1);
    if (type3 in chai_baseTypesMap) return chai_baseTypesMap[type3](value, options);
    if (customInspect && value) {
        const output = chai_inspectCustom(value, options, type3);
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
__name(chai_inspect, "inspect");
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
    return chai_inspect(obj, options);
}
__name(inspect2, "inspect");
function chai_objDisplay(obj) {
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
__name(chai_objDisplay, "objDisplay");
function getMessage2(obj, args) {
    let negate = chai_flag(obj, "negate");
    let val = chai_flag(obj, "object");
    let expected = args[3];
    let actual = getActual(obj, args);
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
    if (!memoizeMap || chai_isPrimitive(leftHandOperand) || chai_isPrimitive(rightHandOperand)) return null;
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
        var result = leftHandMap.get(rightHandOperand);
        if ("boolean" == typeof result) return result;
    }
    return null;
}
__name(memoizeCompare, "memoizeCompare");
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
    if (!memoizeMap || chai_isPrimitive(leftHandOperand) || chai_isPrimitive(rightHandOperand)) return;
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
    if (chai_isPrimitive(leftHandOperand) || chai_isPrimitive(rightHandOperand)) return false;
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
function chai_isPrimitive(value) {
    return null === value || "object" != typeof value;
}
__name(chai_isPrimitive, "isPrimitive");
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
        chai_flag(this, "ssfi", ssfi || _Assertion);
        chai_flag(this, "lockSsfi", lockSsfi);
        chai_flag(this, "object", obj);
        chai_flag(this, "message", msg);
        chai_flag(this, "eql", chai_config.deepEqual || deep_eql_default);
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
            throw new chai_AssertionError(msg, assertionErrorObjectProperties, chai_config.includeStack ? this.assert : chai_flag(this, "ssfi"));
        }
    }
    get _obj() {
        return chai_flag(this, "object");
    }
    set _obj(val) {
        chai_flag(this, "object", val);
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
            if (!isProxyEnabled() && !chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", propertyGetter);
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
            if (-1 === builtins.indexOf(property) && !chai_flag(target, "lockSsfi")) chai_flag(target, "ssfi", proxyGetter);
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
        if (!chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", methodWrapper);
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
            if (!isProxyEnabled() && !chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", overwritingPropertyGetter);
            let origLockSsfi = chai_flag(this, "lockSsfi");
            chai_flag(this, "lockSsfi", true);
            let result = getter(_super).call(this);
            chai_flag(this, "lockSsfi", origLockSsfi);
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
        if (!chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", overwritingMethodWrapper);
        let origLockSsfi = chai_flag(this, "lockSsfi");
        chai_flag(this, "lockSsfi", true);
        let result = method(_super).apply(this, arguments);
        chai_flag(this, "lockSsfi", origLockSsfi);
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
                if (!chai_flag(this, "lockSsfi")) chai_flag(this, "ssfi", chainableMethodWrapper);
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
    let operator = chai_flag(obj, "operator");
    let negate = chai_flag(obj, "negate");
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
    this.assert(result, "expected #{this} to satisfy " + chai_objDisplay(matcher), "expected #{this} to not satisfy" + chai_objDisplay(matcher), !flag2(this, "negate"), result);
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
    const actual = chai_flag(this, "object");
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
    test2.assert(exp == chai_flag(test2, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", exp, act, true);
};
chai_assert.notEqual = function(act, exp, msg) {
    let test2 = new Assertion(act, msg, chai_assert.notEqual, true);
    test2.assert(exp != chai_flag(test2, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", exp, act, true);
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
    return chai_flag(assertErr, "object");
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
    test2.assert(true === chai_flag(test2, "object"), "expected " + inspect2(val) + " to be " + operator + " " + inspect2(val2), "expected " + inspect2(val) + " to not be " + operator + " " + inspect2(val2));
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
const EXPECTED_COLOR = browser_s.green;
const RECEIVED_COLOR = browser_s.red;
const INVERTED_COLOR = browser_s.inverse;
const BOLD_WEIGHT = browser_s.bold;
const DIM_COLOR = browser_s.dim;
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
const dist_SPACE_SYMBOL = "·";
function dist_replaceTrailingSpaces(text) {
    return text.replace(/\s+$/gm, (spaces)=>dist_SPACE_SYMBOL.repeat(spaces.length));
}
function dist_printReceived(object) {
    return RECEIVED_COLOR(dist_replaceTrailingSpaces(stringify(object)));
}
function dist_printExpected(value) {
    return EXPECTED_COLOR(dist_replaceTrailingSpaces(stringify(value)));
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
    const type = helpers_getType(value);
    const hasType = "null" !== type && "undefined" !== type ? `${name} has type:  ${type}\n` : "";
    const hasValue = `${name} has value: ${print(value)}`;
    return hasType + hasValue;
}
function addCustomEqualityTesters(newTesters) {
    if (!Array.isArray(newTesters)) throw new TypeError(`expect.customEqualityTesters: Must be set to an array of Testers. Was given "${helpers_getType(newTesters)}"`);
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
const dist_IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const dist_IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const dist_IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
const dist_IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
const dist_IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[dist_IS_KEYED_SENTINEL] && !maybeKeyed[dist_IS_ORDERED_SENTINEL]);
}
function isImmutableUnorderedSet(maybeSet) {
    return !!(maybeSet && maybeSet[dist_IS_SET_SENTINEL] && !maybeSet[dist_IS_ORDERED_SENTINEL]);
}
function isObjectLiteral(source) {
    return null != source && "object" == typeof source && !Array.isArray(source);
}
function isImmutableList(source) {
    return Boolean(source && isObjectLiteral(source) && source[dist_IS_LIST_SENTINEL]);
}
function isImmutableOrderedKeyed(source) {
    return Boolean(source && isObjectLiteral(source) && source[dist_IS_KEYED_SENTINEL] && source[dist_IS_ORDERED_SENTINEL]);
}
function isImmutableOrderedSet(source) {
    return Boolean(source && isObjectLiteral(source) && source[dist_IS_SET_SENTINEL] && source[dist_IS_ORDERED_SENTINEL]);
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
class dist_AsymmetricMatcher {
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
dist_AsymmetricMatcher.prototype[Symbol.for("chai/inspect")] = function(options) {
    const result = stringify(this, options.depth, {
        min: true
    });
    if (result.length <= options.truncate) return result;
    return `${this.toString()}{…}`;
};
class StringContaining extends dist_AsymmetricMatcher {
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
class Anything extends dist_AsymmetricMatcher {
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
class ObjectContaining extends dist_AsymmetricMatcher {
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
class ArrayContaining extends dist_AsymmetricMatcher {
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
class Any extends dist_AsymmetricMatcher {
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
class StringMatching extends dist_AsymmetricMatcher {
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
class CloseTo extends dist_AsymmetricMatcher {
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
    if (spy.mock.calls.length) msg += browser_s.gray(`\n\nReceived: \n\n${spy.mock.calls.map((callArg, i)=>{
        let methodCall = browser_s.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call:\n\n`);
        if (showActualCall) methodCall += diff_diff(showActualCall, callArg, {
            omitAnnotationLines: true
        });
        else methodCall += stringify(callArg).split("\n").map((line)=>`    ${line}`).join("\n");
        methodCall += "\n";
        return methodCall;
    }).join("\n")}`);
    msg += browser_s.gray(`\n\nNumber of calls: ${browser_s.bold(spy.mock.calls.length)}\n`);
    return msg;
}
function formatReturns(spy, results, msg, showActualReturn) {
    if (results.length) msg += browser_s.gray(`\n\nReceived: \n\n${results.map((callReturn, i)=>{
        let methodCall = browser_s.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call return:\n\n`);
        if (showActualReturn) methodCall += diff_diff(showActualReturn, callReturn.value, {
            omitAnnotationLines: true
        });
        else methodCall += stringify(callReturn).split("\n").map((line)=>`    ${line}`).join("\n");
        methodCall += "\n";
        return methodCall;
    }).join("\n")}`);
    msg += browser_s.gray(`\n\nNumber of calls: ${browser_s.bold(spy.mock.calls.length)}\n`);
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
            class CustomMatcher extends dist_AsymmetricMatcher {
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
var node_modules_chai_Buffer = __webpack_require__("../../node_modules/.pnpm/buffer@5.7.1/node_modules/buffer/index.js").hp;
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
    flag: ()=>node_modules_chai_flag,
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
    objDisplay: ()=>node_modules_chai_objDisplay,
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
    getConstructorName: ()=>node_modules_chai_getConstructorName,
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
function node_modules_chai_getConstructorName(errorLike) {
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
chai_name(node_modules_chai_getConstructorName, "getConstructorName");
function chai_getMessage(errorLike) {
    let msg = "";
    if (errorLike && errorLike.message) msg = errorLike.message;
    else if ("string" == typeof errorLike) msg = errorLike;
    return msg;
}
chai_name(chai_getMessage, "getMessage");
function node_modules_chai_flag(obj, key, value) {
    let flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
    if (3 !== arguments.length) return flags[key];
    flags[key] = value;
}
chai_name(node_modules_chai_flag, "flag");
function node_modules_chai_test(obj, args) {
    let negate = node_modules_chai_flag(obj, "negate"), expr = args[0];
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
    let flagMsg = node_modules_chai_flag(obj, "message");
    let ssfi = node_modules_chai_flag(obj, "ssfi");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    obj = node_modules_chai_flag(obj, "object");
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
var node_modules_chai_ansiColors = {
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
var node_modules_chai_styles = {
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
var node_modules_chai_truncator = "\u2026";
function node_modules_chai_colorise(value, styleType) {
    const color = node_modules_chai_ansiColors[node_modules_chai_styles[styleType]] || node_modules_chai_ansiColors[styleType] || "";
    if (!color) return String(value);
    return `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m`;
}
chai_name(node_modules_chai_colorise, "colorise");
function node_modules_chai_normaliseOptions({ showHidden = false, depth = 2, colors = false, customInspect = true, showProxy = false, maxArrayLength = 1 / 0, breakLength = 1 / 0, seen = [], truncate: truncate2 = 1 / 0, stylize = String } = {}, inspect3) {
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
    if (options.colors) options.stylize = node_modules_chai_colorise;
    return options;
}
chai_name(node_modules_chai_normaliseOptions, "normaliseOptions");
function node_modules_chai_isHighSurrogate(char) {
    return char >= "\uD800" && char <= "\uDBFF";
}
chai_name(node_modules_chai_isHighSurrogate, "isHighSurrogate");
function node_modules_chai_truncate(string, length, tail = node_modules_chai_truncator) {
    string = String(string);
    const tailLength = tail.length;
    const stringLength = string.length;
    if (tailLength > length && stringLength > tailLength) return tail;
    if (stringLength > length && stringLength > tailLength) {
        let end = length - tailLength;
        if (end > 0 && node_modules_chai_isHighSurrogate(string[end - 1])) end -= 1;
        return `${string.slice(0, end)}${tail}`;
    }
    return string;
}
chai_name(node_modules_chai_truncate, "truncate");
function node_modules_chai_inspectList(list, options, inspectItem, separator = ", ") {
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
        truncated = `${node_modules_chai_truncator}(${list.length - i})`;
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
            truncated = `${node_modules_chai_truncator}(${list.length - i - 1})`;
            break;
        }
        truncated = "";
    }
    return `${output}${truncated}`;
}
chai_name(node_modules_chai_inspectList, "inspectList");
function node_modules_chai_quoteComplexKey(key) {
    if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) return key;
    return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
chai_name(node_modules_chai_quoteComplexKey, "quoteComplexKey");
function node_modules_chai_inspectProperty([key, value], options) {
    options.truncate -= 2;
    if ("string" == typeof key) key = node_modules_chai_quoteComplexKey(key);
    else if ("number" != typeof key) key = `[${options.inspect(key, options)}]`;
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key}: ${value}`;
}
chai_name(node_modules_chai_inspectProperty, "inspectProperty");
function node_modules_chai_inspectArray(array, options) {
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return "[]";
    options.truncate -= 4;
    const listContents = node_modules_chai_inspectList(array, options);
    options.truncate -= listContents.length;
    let propertyContents = "";
    if (nonIndexProperties.length) propertyContents = node_modules_chai_inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, node_modules_chai_inspectProperty);
    return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
chai_name(node_modules_chai_inspectArray, "inspectArray");
var node_modules_chai_getArrayName = /* @__PURE__ */ chai_name((array)=>{
    if ("function" == typeof node_modules_chai_Buffer && array instanceof node_modules_chai_Buffer) return "Buffer";
    if (array[Symbol.toStringTag]) return array[Symbol.toStringTag];
    return array.constructor.name;
}, "getArrayName");
function node_modules_chai_inspectTypedArray(array, options) {
    const name = node_modules_chai_getArrayName(array);
    options.truncate -= name.length + 4;
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length) return `${name}[]`;
    let output = "";
    for(let i = 0; i < array.length; i++){
        const string = `${options.stylize(node_modules_chai_truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
        options.truncate -= string.length;
        if (array[i] !== array.length && options.truncate <= 3) {
            output += `${node_modules_chai_truncator}(${array.length - array[i] + 1})`;
            break;
        }
        output += string;
    }
    let propertyContents = "";
    if (nonIndexProperties.length) propertyContents = node_modules_chai_inspectList(nonIndexProperties.map((key)=>[
            key,
            array[key]
        ]), options, node_modules_chai_inspectProperty);
    return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
chai_name(node_modules_chai_inspectTypedArray, "inspectTypedArray");
function node_modules_chai_inspectDate(dateObject, options) {
    const stringRepresentation = dateObject.toJSON();
    if (null === stringRepresentation) return "Invalid Date";
    const split = stringRepresentation.split("T");
    const date = split[0];
    return options.stylize(`${date}T${node_modules_chai_truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
chai_name(node_modules_chai_inspectDate, "inspectDate");
function node_modules_chai_inspectFunction(func, options) {
    const functionType = func[Symbol.toStringTag] || "Function";
    const name = func.name;
    if (!name) return options.stylize(`[${functionType}]`, "special");
    return options.stylize(`[${functionType} ${node_modules_chai_truncate(name, options.truncate - 11)}]`, "special");
}
chai_name(node_modules_chai_inspectFunction, "inspectFunction");
function node_modules_chai_inspectMapEntry([key, value], options) {
    options.truncate -= 4;
    key = options.inspect(key, options);
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key} => ${value}`;
}
chai_name(node_modules_chai_inspectMapEntry, "inspectMapEntry");
function node_modules_chai_mapToEntries(map) {
    const entries = [];
    map.forEach((value, key)=>{
        entries.push([
            key,
            value
        ]);
    });
    return entries;
}
chai_name(node_modules_chai_mapToEntries, "mapToEntries");
function node_modules_chai_inspectMap(map, options) {
    if (0 === map.size) return "Map{}";
    options.truncate -= 7;
    return `Map{ ${node_modules_chai_inspectList(node_modules_chai_mapToEntries(map), options, node_modules_chai_inspectMapEntry)} }`;
}
chai_name(node_modules_chai_inspectMap, "inspectMap");
var node_modules_chai_isNaN = Number.isNaN || ((i)=>i !== i);
function node_modules_chai_inspectNumber(number, options) {
    if (node_modules_chai_isNaN(number)) return options.stylize("NaN", "number");
    if (number === 1 / 0) return options.stylize("Infinity", "number");
    if (number === -1 / 0) return options.stylize("-Infinity", "number");
    if (0 === number) return options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number");
    return options.stylize(node_modules_chai_truncate(String(number), options.truncate), "number");
}
chai_name(node_modules_chai_inspectNumber, "inspectNumber");
function node_modules_chai_inspectBigInt(number, options) {
    let nums = node_modules_chai_truncate(number.toString(), options.truncate - 1);
    if (nums !== node_modules_chai_truncator) nums += "n";
    return options.stylize(nums, "bigint");
}
chai_name(node_modules_chai_inspectBigInt, "inspectBigInt");
function node_modules_chai_inspectRegExp(value, options) {
    const flags = value.toString().split("/")[2];
    const sourceLength = options.truncate - (2 + flags.length);
    const source = value.source;
    return options.stylize(`/${node_modules_chai_truncate(source, sourceLength)}/${flags}`, "regexp");
}
chai_name(node_modules_chai_inspectRegExp, "inspectRegExp");
function node_modules_chai_arrayFromSet(set2) {
    const values = [];
    set2.forEach((value)=>{
        values.push(value);
    });
    return values;
}
chai_name(node_modules_chai_arrayFromSet, "arrayFromSet");
function node_modules_chai_inspectSet(set2, options) {
    if (0 === set2.size) return "Set{}";
    options.truncate -= 7;
    return `Set{ ${node_modules_chai_inspectList(node_modules_chai_arrayFromSet(set2), options)} }`;
}
chai_name(node_modules_chai_inspectSet, "inspectSet");
var node_modules_chai_stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g");
var node_modules_chai_escapeCharacters = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\"
};
var node_modules_chai_hex = 16;
var node_modules_chai_unicodeLength = 4;
function node_modules_chai_escape(char) {
    return node_modules_chai_escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(node_modules_chai_hex)}`.slice(-node_modules_chai_unicodeLength)}`;
}
chai_name(node_modules_chai_escape, "escape");
function node_modules_chai_inspectString(string, options) {
    if (node_modules_chai_stringEscapeChars.test(string)) string = string.replace(node_modules_chai_stringEscapeChars, node_modules_chai_escape);
    return options.stylize(`'${node_modules_chai_truncate(string, options.truncate - 2)}'`, "string");
}
chai_name(node_modules_chai_inspectString, "inspectString");
function node_modules_chai_inspectSymbol(value) {
    if ("description" in Symbol.prototype) return value.description ? `Symbol(${value.description})` : "Symbol()";
    return value.toString();
}
chai_name(node_modules_chai_inspectSymbol, "inspectSymbol");
var node_modules_chai_getPromiseValue = /* @__PURE__ */ chai_name(()=>"Promise{\u2026}", "getPromiseValue");
var chai_promise_default = node_modules_chai_getPromiseValue;
function node_modules_chai_inspectObject(object, options) {
    const properties = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
    if (0 === properties.length && 0 === symbols.length) return "{}";
    options.truncate -= 4;
    options.seen = options.seen || [];
    if (options.seen.includes(object)) return "[Circular]";
    options.seen.push(object);
    const propertyContents = node_modules_chai_inspectList(properties.map((key)=>[
            key,
            object[key]
        ]), options, node_modules_chai_inspectProperty);
    const symbolContents = node_modules_chai_inspectList(symbols.map((key)=>[
            key,
            object[key]
        ]), options, node_modules_chai_inspectProperty);
    options.seen.pop();
    let sep = "";
    if (propertyContents && symbolContents) sep = ", ";
    return `{ ${propertyContents}${sep}${symbolContents} }`;
}
chai_name(node_modules_chai_inspectObject, "inspectObject");
var node_modules_chai_toStringTag = "u" > typeof Symbol && Symbol.toStringTag ? Symbol.toStringTag : false;
function node_modules_chai_inspectClass(value, options) {
    let name = "";
    if (node_modules_chai_toStringTag && node_modules_chai_toStringTag in value) name = value[node_modules_chai_toStringTag];
    name = name || value.constructor.name;
    if (!name || "_class" === name) name = "<Anonymous Class>";
    options.truncate -= name.length;
    return `${name}${node_modules_chai_inspectObject(value, options)}`;
}
chai_name(node_modules_chai_inspectClass, "inspectClass");
function node_modules_chai_inspectArguments(args, options) {
    if (0 === args.length) return "Arguments[]";
    options.truncate -= 13;
    return `Arguments[ ${node_modules_chai_inspectList(args, options)} ]`;
}
chai_name(node_modules_chai_inspectArguments, "inspectArguments");
var node_modules_chai_errorKeys = [
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
    const properties = Object.getOwnPropertyNames(error).filter((key)=>-1 === node_modules_chai_errorKeys.indexOf(key));
    const name = error.name;
    options.truncate -= name.length;
    let message = "";
    if ("string" == typeof error.message) message = node_modules_chai_truncate(error.message, options.truncate);
    else properties.unshift("message");
    message = message ? `: ${message}` : "";
    options.truncate -= message.length + 5;
    options.seen = options.seen || [];
    if (options.seen.includes(error)) return "[Circular]";
    options.seen.push(error);
    const propertyContents = node_modules_chai_inspectList(properties.map((key)=>[
            key,
            error[key]
        ]), options, node_modules_chai_inspectProperty);
    return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
chai_name(chai_inspectObject2, "inspectObject");
function node_modules_chai_inspectAttribute([key, value], options) {
    options.truncate -= 3;
    if (!value) return `${options.stylize(String(key), "yellow")}`;
    return `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}`;
}
chai_name(node_modules_chai_inspectAttribute, "inspectAttribute");
function node_modules_chai_inspectNodeCollection(collection, options) {
    return node_modules_chai_inspectList(collection, options, node_modules_chai_inspectNode, "\n");
}
chai_name(node_modules_chai_inspectNodeCollection, "inspectNodeCollection");
function node_modules_chai_inspectNode(node, options) {
    switch(node.nodeType){
        case 1:
            return node_modules_chai_inspectHTML(node, options);
        case 3:
            return options.inspect(node.data, options);
        default:
            return options.inspect(node, options);
    }
}
chai_name(node_modules_chai_inspectNode, "inspectNode");
function node_modules_chai_inspectHTML(element, options) {
    const properties = element.getAttributeNames();
    const name = element.tagName.toLowerCase();
    const head = options.stylize(`<${name}`, "special");
    const headClose = options.stylize(">", "special");
    const tail = options.stylize(`</${name}>`, "special");
    options.truncate -= 2 * name.length + 5;
    let propertyContents = "";
    if (properties.length > 0) {
        propertyContents += " ";
        propertyContents += node_modules_chai_inspectList(properties.map((key)=>[
                key,
                element.getAttribute(key)
            ]), options, node_modules_chai_inspectAttribute, " ");
    }
    options.truncate -= propertyContents.length;
    const truncate2 = options.truncate;
    let children = node_modules_chai_inspectNodeCollection(element.children, options);
    if (children && children.length > truncate2) children = `${node_modules_chai_truncator}(${element.children.length})`;
    return `${head}${propertyContents}${headClose}${children}${tail}`;
}
chai_name(node_modules_chai_inspectHTML, "inspectHTML");
var node_modules_chai_symbolsSupported = "function" == typeof Symbol && "function" == typeof Symbol.for;
var node_modules_chai_chaiInspect = node_modules_chai_symbolsSupported ? /* @__PURE__ */ Symbol.for("chai/inspect") : "@@chai/inspect";
var node_modules_chai_nodeInspect = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var node_modules_chai_constructorMap = /* @__PURE__ */ new WeakMap();
var node_modules_chai_stringTagMap = {};
var node_modules_chai_baseTypesMap = {
    undefined: /* @__PURE__ */ chai_name((value, options)=>options.stylize("undefined", "undefined"), "undefined"),
    null: /* @__PURE__ */ chai_name((value, options)=>options.stylize("null", "null"), "null"),
    boolean: /* @__PURE__ */ chai_name((value, options)=>options.stylize(String(value), "boolean"), "boolean"),
    Boolean: /* @__PURE__ */ chai_name((value, options)=>options.stylize(String(value), "boolean"), "Boolean"),
    number: node_modules_chai_inspectNumber,
    Number: node_modules_chai_inspectNumber,
    bigint: node_modules_chai_inspectBigInt,
    BigInt: node_modules_chai_inspectBigInt,
    string: node_modules_chai_inspectString,
    String: node_modules_chai_inspectString,
    function: node_modules_chai_inspectFunction,
    Function: node_modules_chai_inspectFunction,
    symbol: node_modules_chai_inspectSymbol,
    Symbol: node_modules_chai_inspectSymbol,
    Array: node_modules_chai_inspectArray,
    Date: node_modules_chai_inspectDate,
    Map: node_modules_chai_inspectMap,
    Set: node_modules_chai_inspectSet,
    RegExp: node_modules_chai_inspectRegExp,
    Promise: chai_promise_default,
    WeakSet: /* @__PURE__ */ chai_name((value, options)=>options.stylize("WeakSet{\u2026}", "special"), "WeakSet"),
    WeakMap: /* @__PURE__ */ chai_name((value, options)=>options.stylize("WeakMap{\u2026}", "special"), "WeakMap"),
    Arguments: node_modules_chai_inspectArguments,
    Int8Array: node_modules_chai_inspectTypedArray,
    Uint8Array: node_modules_chai_inspectTypedArray,
    Uint8ClampedArray: node_modules_chai_inspectTypedArray,
    Int16Array: node_modules_chai_inspectTypedArray,
    Uint16Array: node_modules_chai_inspectTypedArray,
    Int32Array: node_modules_chai_inspectTypedArray,
    Uint32Array: node_modules_chai_inspectTypedArray,
    Float32Array: node_modules_chai_inspectTypedArray,
    Float64Array: node_modules_chai_inspectTypedArray,
    Generator: /* @__PURE__ */ chai_name(()=>"", "Generator"),
    DataView: /* @__PURE__ */ chai_name(()=>"", "DataView"),
    ArrayBuffer: /* @__PURE__ */ chai_name(()=>"", "ArrayBuffer"),
    Error: chai_inspectObject2,
    HTMLCollection: node_modules_chai_inspectNodeCollection,
    NodeList: node_modules_chai_inspectNodeCollection
};
var node_modules_chai_inspectCustom = /* @__PURE__ */ chai_name((value, options, type3, inspectFn)=>{
    if (node_modules_chai_chaiInspect in value && "function" == typeof value[node_modules_chai_chaiInspect]) return value[node_modules_chai_chaiInspect](options);
    if (node_modules_chai_nodeInspect in value && "function" == typeof value[node_modules_chai_nodeInspect]) return value[node_modules_chai_nodeInspect](options.depth, options, inspectFn);
    if ("inspect" in value && "function" == typeof value.inspect) return value.inspect(options.depth, options);
    if ("constructor" in value && node_modules_chai_constructorMap.has(value.constructor)) return node_modules_chai_constructorMap.get(value.constructor)(value, options);
    if (node_modules_chai_stringTagMap[type3]) return node_modules_chai_stringTagMap[type3](value, options);
    return "";
}, "inspectCustom");
var node_modules_chai_toString = Object.prototype.toString;
function node_modules_chai_inspect(value, opts = {}) {
    const options = node_modules_chai_normaliseOptions(opts, node_modules_chai_inspect);
    const { customInspect } = options;
    let type3 = null === value ? "null" : typeof value;
    if ("object" === type3) type3 = node_modules_chai_toString.call(value).slice(8, -1);
    if (type3 in node_modules_chai_baseTypesMap) return node_modules_chai_baseTypesMap[type3](value, options);
    if (customInspect && value) {
        const output = node_modules_chai_inspectCustom(value, options, type3, node_modules_chai_inspect);
        if (output) {
            if ("string" == typeof output) return output;
            return node_modules_chai_inspect(output, options);
        }
    }
    const proto = value ? Object.getPrototypeOf(value) : false;
    if (proto === Object.prototype || null === proto) return node_modules_chai_inspectObject(value, options);
    if (value && "function" == typeof HTMLElement && value instanceof HTMLElement) return node_modules_chai_inspectHTML(value, options);
    if ("constructor" in value) {
        if (value.constructor !== Object) return node_modules_chai_inspectClass(value, options);
        return node_modules_chai_inspectObject(value, options);
    }
    if (value === Object(value)) return node_modules_chai_inspectObject(value, options);
    return options.stylize(String(value), type3);
}
chai_name(node_modules_chai_inspect, "inspect");
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
    return node_modules_chai_inspect(obj, options);
}
chai_name(chai_inspect2, "inspect");
function node_modules_chai_objDisplay(obj) {
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
chai_name(node_modules_chai_objDisplay, "objDisplay");
function chai_getMessage2(obj, args) {
    let negate = node_modules_chai_flag(obj, "negate");
    let val = node_modules_chai_flag(obj, "object");
    let expected = args[3];
    let actual = chai_getActual(obj, args);
    let msg = negate ? args[2] : args[1];
    let flagMsg = node_modules_chai_flag(obj, "message");
    if ("function" == typeof msg) msg = msg();
    msg = msg || "";
    msg = msg.replace(/#\{this\}/g, function() {
        return node_modules_chai_objDisplay(val);
    }).replace(/#\{act\}/g, function() {
        return node_modules_chai_objDisplay(actual);
    }).replace(/#\{exp\}/g, function() {
        return node_modules_chai_objDisplay(expected);
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
    if (!memoizeMap || node_modules_chai_isPrimitive(leftHandOperand) || node_modules_chai_isPrimitive(rightHandOperand)) return null;
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
        var result = leftHandMap.get(rightHandOperand);
        if ("boolean" == typeof result) return result;
    }
    return null;
}
chai_name(chai_memoizeCompare, "memoizeCompare");
function chai_memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
    if (!memoizeMap || node_modules_chai_isPrimitive(leftHandOperand) || node_modules_chai_isPrimitive(rightHandOperand)) return;
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
    if (node_modules_chai_isPrimitive(leftHandOperand) || node_modules_chai_isPrimitive(rightHandOperand)) return false;
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
function node_modules_chai_isPrimitive(value) {
    return null === value || "object" != typeof value;
}
chai_name(node_modules_chai_isPrimitive, "isPrimitive");
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
        node_modules_chai_flag(this, "ssfi", ssfi || _Assertion);
        node_modules_chai_flag(this, "lockSsfi", lockSsfi);
        node_modules_chai_flag(this, "object", obj);
        node_modules_chai_flag(this, "message", msg);
        node_modules_chai_flag(this, "eql", node_modules_chai_config.deepEqual || chai_deep_eql_default);
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
            throw new chai_6_2_2_node_modules_chai_AssertionError(msg, assertionErrorObjectProperties, node_modules_chai_config.includeStack ? this.assert : node_modules_chai_flag(this, "ssfi"));
        }
    }
    get _obj() {
        return node_modules_chai_flag(this, "object");
    }
    set _obj(val) {
        node_modules_chai_flag(this, "object", val);
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
            if (!chai_isProxyEnabled() && !node_modules_chai_flag(this, "lockSsfi")) node_modules_chai_flag(this, "ssfi", propertyGetter);
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
            if (-1 === chai_builtins.indexOf(property) && !node_modules_chai_flag(target, "lockSsfi")) node_modules_chai_flag(target, "ssfi", proxyGetter);
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
        if (!node_modules_chai_flag(this, "lockSsfi")) node_modules_chai_flag(this, "ssfi", methodWrapper);
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
            if (!chai_isProxyEnabled() && !node_modules_chai_flag(this, "lockSsfi")) node_modules_chai_flag(this, "ssfi", overwritingPropertyGetter);
            let origLockSsfi = node_modules_chai_flag(this, "lockSsfi");
            node_modules_chai_flag(this, "lockSsfi", true);
            let result = getter(_super).call(this);
            node_modules_chai_flag(this, "lockSsfi", origLockSsfi);
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
        if (!node_modules_chai_flag(this, "lockSsfi")) node_modules_chai_flag(this, "ssfi", overwritingMethodWrapper);
        let origLockSsfi = node_modules_chai_flag(this, "lockSsfi");
        node_modules_chai_flag(this, "lockSsfi", true);
        let result = method(_super).apply(this, arguments);
        node_modules_chai_flag(this, "lockSsfi", origLockSsfi);
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
                if (!node_modules_chai_flag(this, "lockSsfi")) node_modules_chai_flag(this, "ssfi", chainableMethodWrapper);
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
    let operator = node_modules_chai_flag(obj, "operator");
    let negate = node_modules_chai_flag(obj, "negate");
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
    this.assert(result, "expected #{this} to satisfy " + node_modules_chai_objDisplay(matcher), "expected #{this} to not satisfy" + node_modules_chai_objDisplay(matcher), !chai_flag2(this, "negate"), result);
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
    const actual = node_modules_chai_flag(this, "object");
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
    test2.assert(exp == node_modules_chai_flag(test2, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", exp, act, true);
};
node_modules_chai_assert.notEqual = function(act, exp, msg) {
    let test2 = new node_modules_chai_Assertion(act, msg, node_modules_chai_assert.notEqual, true);
    test2.assert(exp != node_modules_chai_flag(test2, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", exp, act, true);
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
    return node_modules_chai_flag(assertErr, "object");
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
    test2.assert(true === node_modules_chai_flag(test2, "object"), "expected " + chai_inspect2(val) + " to be " + operator + " " + chai_inspect2(val2), "expected " + chai_inspect2(val) + " to not be " + operator + " " + chai_inspect2(val2));
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
__webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
const normalizeTestOptions = (input)=>{
    if ('number' == typeof input) return {
        timeout: input
    };
    return input ?? {};
};
const loadDiffModules = async ()=>{
    const [{ diff }, { format, plugins }] = await Promise.all([
        Promise.resolve(diff_namespaceObject),
        Promise.resolve(dist_namespaceObject)
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
Date.now.bind(Date);
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
const util_formatRegExp = /%[sdjifoOc%]/;
const formatTemplate = (template, values)=>{
    if (!util_formatRegExp.test(template)) return template;
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
        if (util_formatRegExp.test(templateStr)) return formatTemplate(templateStr, param);
        return templateStr;
    }
    if (util_formatRegExp.test(templateStr)) templateStr = formatTemplate(templateStr, [
        param
    ]);
    return templateStr.replace(/\$([$\w.]+)/g, (_, key)=>{
        const value = util_getValue(param, key);
        return value?.toString();
    });
};
function util_getValue(source, path, defaultValue) {
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
var runner_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
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
                    }while (retryCount <= retryBudget && 'fail' === result.status)
                    totalRetryCount += retryCount - 1;
                    retryErrors.push(...repeatRetryErrors);
                    if ('fail' === result.status) break;
                }
                result.duration = RealDate.now() - start;
                result.retryCount = totalRetryCount;
                if ('pass' === result.status && retryErrors.length > 0) result.retryErrors = retryErrors;
                result.heap = state.runtimeConfig.logHeapUsage ? runner_process.memoryUsage().heapUsed : void 0;
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
                heap: state.runtimeConfig.logHeapUsage ? runner_process.memoryUsage().heapUsed : void 0,
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
                heap: state.runtimeConfig.logHeapUsage ? runner_process.memoryUsage().heapUsed : void 0,
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
var pathe_M_eThtNZ_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
    if (!input) return input;
    return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r)=>r.toUpperCase());
}
const _UNC_REGEX = /^[/\\]{2}/;
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const pathe_M_eThtNZ_normalize = function(path) {
    if (0 === path.length) return ".";
    path = normalizeWindowsPath(path);
    const isUNCPath = path.match(_UNC_REGEX);
    const isPathAbsolute = pathe_M_eThtNZ_isAbsolute(path);
    const trailingSeparator = "/" === path[path.length - 1];
    path = normalizeString(path, !isPathAbsolute);
    if (0 === path.length) {
        if (isPathAbsolute) return "/";
        return trailingSeparator ? "./" : ".";
    }
    if (trailingSeparator) path += "/";
    if (_DRIVE_LETTER_RE.test(path)) path += "/";
    if (isUNCPath) {
        if (!isPathAbsolute) return `//./${path}`;
        return `//${path}`;
    }
    return isPathAbsolute && !pathe_M_eThtNZ_isAbsolute(path) ? `/${path}` : path;
};
function cwd() {
    if (void 0 !== pathe_M_eThtNZ_process && "function" == typeof pathe_M_eThtNZ_process.cwd) return pathe_M_eThtNZ_process.cwd().replace(/\\/g, "/");
    return "/";
}
const pathe_M_eThtNZ_resolve = function(...arguments_) {
    arguments_ = arguments_.map((argument)=>normalizeWindowsPath(argument));
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--){
        const path = index >= 0 ? arguments_[index] : cwd();
        if (path && 0 !== path.length) {
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = pathe_M_eThtNZ_isAbsolute(path);
        }
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute && !pathe_M_eThtNZ_isAbsolute(resolvedPath)) return `/${resolvedPath}`;
    return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let char = null;
    for(let index = 0; index <= path.length; ++index){
        if (index < path.length) char = path[index];
        else if ("/" === char) break;
        else char = "/";
        if ("/" === char) {
            if (lastSlash === index - 1 || 1 === dots) ;
            else if (2 === dots) {
                if (res.length < 2 || 2 !== lastSegmentLength || "." !== res[res.length - 1] || "." !== res[res.length - 2]) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf("/");
                        if (-1 === lastSlashIndex) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                        }
                        lastSlash = index;
                        dots = 0;
                        continue;
                    } else if (res.length > 0) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = index;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    res += res.length > 0 ? "/.." : "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += `/${path.slice(lastSlash + 1, index)}`;
                else res = path.slice(lastSlash + 1, index);
                lastSegmentLength = index - lastSlash - 1;
            }
            lastSlash = index;
            dots = 0;
        } else if ("." === char && -1 !== dots) ++dots;
        else dots = -1;
    }
    return res;
}
const pathe_M_eThtNZ_isAbsolute = function(p) {
    return _IS_ABSOLUTE_RE.test(p);
};
var UNKNOWN_FUNCTION = '<unknown>';
function stack_trace_parser_esm_parse(stackString) {
    var lines = stackString.split('\n');
    return lines.reduce(function(stack, line) {
        var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);
        if (parseResult) stack.push(parseResult);
        return stack;
    }, []);
}
var chromeRe = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRe = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function parseChrome(line) {
    var parts = chromeRe.exec(line);
    if (!parts) return null;
    var isNative = parts[2] && 0 === parts[2].indexOf('native');
    var isEval = parts[2] && 0 === parts[2].indexOf('eval');
    var submatch = chromeEvalRe.exec(parts[2]);
    if (isEval && null != submatch) {
        parts[2] = submatch[1];
        parts[3] = submatch[2];
        parts[4] = submatch[3];
    }
    return {
        file: isNative ? null : parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: isNative ? [
            parts[2]
        ] : [],
        lineNumber: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
    };
}
var winjsRe = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseWinjs(line) {
    var parts = winjsRe.exec(line);
    if (!parts) return null;
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
    };
}
var geckoRe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function parseGecko(line) {
    var parts = geckoRe.exec(line);
    if (!parts) return null;
    var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
    var submatch = geckoEvalRe.exec(parts[3]);
    if (isEval && null != submatch) {
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = null;
    }
    return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: parts[2] ? parts[2].split(',') : [],
        lineNumber: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
    };
}
var javaScriptCoreRe = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function parseJSC(line) {
    var parts = javaScriptCoreRe.exec(line);
    if (!parts) return null;
    return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[4],
        column: parts[5] ? +parts[5] : null
    };
}
var nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseNode(line) {
    var parts = nodeRe.exec(line);
    if (!parts) return null;
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
    };
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
            const frames = stack_trace_parser_esm_parse(stack);
            for (const frame of frames){
                let filename = frame.file ?? '';
                if (filename.startsWith('file://')) filename = fileURLToPath(filename);
                filename = pathe_M_eThtNZ_normalize(filename);
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
function mockObject_isPlainObject(value) {
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
        if (mockObject_isPlainObject(value)) {
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
        const spyImpl = dist_M(obj, methodName, mockFn);
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
        const spyState = dist_T(spyImpl);
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
var utilities_process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
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
    const { FakeTimers } = await import("./2~fake-timers.js");
    let _timers;
    let currentFakeTimersConfig;
    let originalConfig;
    const resolveRuntimeEnv = ()=>{
        const globalRef = globalThis;
        const runtimeEnv = globalRef[RSTEST_ENV_SYMBOL];
        if (runtimeEnv && 'object' == typeof runtimeEnv) return runtimeEnv;
        if (void 0 !== utilities_process && utilities_process.env) return utilities_process.env;
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
        import("./2~snapshot.js").then((m)=>m.snapshot_namespaceObject)
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
const public_check = (name)=>{
    if (!globalThis.RSTEST_API?.[name]) throw new Error(`Rstest API '${name}' is not registered yet, please make sure you are running in a rstest environment.`);
};
const wrapRstestAPI = (name)=>{
    const fn = (...args)=>{
        public_check(name);
        return globalThis.RSTEST_API[name].call(globalThis.RSTEST_API[name], ...args);
    };
    return new Proxy(fn, {
        get (_target, key, receiver) {
            if (!globalThis.RSTEST_API?.[name]) return Reflect.get(fn, key, receiver);
            return Reflect.get(globalThis.RSTEST_API[name], key, receiver);
        }
    });
};
const wrapRstestUtilitiesAPI = (name)=>new Proxy({}, {
        get (_target, key, receiver) {
            public_check(name);
            return Reflect.get(globalThis.RSTEST_API?.[name] || {}, key, receiver);
        }
    });
const public_expect = wrapRstestAPI('expect');
const public_assert = wrapRstestAPI('assert');
const public_it = wrapRstestAPI('it');
const public_test = wrapRstestAPI('test');
const public_describe = wrapRstestAPI('describe');
const beforeAll = wrapRstestAPI('beforeAll');
const afterAll = wrapRstestAPI('afterAll');
const beforeEach = wrapRstestAPI('beforeEach');
const afterEach = wrapRstestAPI('afterEach');
const public_rstest = wrapRstestUtilitiesAPI('rstest');
const rs = wrapRstestUtilitiesAPI('rs');
const onTestFinished = wrapRstestAPI('onTestFinished');
const onTestFailed = wrapRstestAPI('onTestFailed');
const createBrowserTaskContext = ()=>{
    let fallback;
    return {
        getCurrent: ()=>fallback,
        run: async (task, fn)=>{
            const previous = fallback;
            fallback = task;
            try {
                return await fn();
            } finally{
                fallback = previous;
            }
        },
        setFallback: (task)=>{
            fallback = task;
        }
    };
};
const REGEXP_FLAG_PREFIX = 'RSTEST_REGEXP:';
const unwrapRegex = (value)=>{
    if (!value.startsWith(REGEXP_FLAG_PREFIX)) return value;
    const raw = value.slice(REGEXP_FLAG_PREFIX.length);
    const match = raw.match(/^\/(.+)\/([dgimsuvy]*)$/);
    if (!match) return value;
    const [, pattern, flags] = match;
    return new RegExp(pattern, flags);
};
export { __webpack_require__temp as __webpack_require__, RSTEST_ENV_SYMBOL_KEY, afterAll, afterEach, beforeAll, beforeEach, createBrowserTaskContext, createRstestRuntime, diff_namespaceObject, dist_equals, dist_format, dist_namespaceObject, dist_plugins, getTaskNameWithPrefix, globalApis, iterableEquality, onTestFailed, onTestFinished, pathe_M_eThtNZ_resolve, public_assert as assert, public_describe as describe, public_expect as expect, public_it as it, public_rstest as rstest, public_test as test, rs, setRealTimers, subsetEquality, unwrapRegex };
