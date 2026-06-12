import { __webpack_require__ } from "./314.js";
import "./314.js";
__webpack_require__.add({
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/called-in-order.js" (module, __unused_rspack_exports, __webpack_require__) {
        var every = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/array.js").every;
        function hasCallsLeft(callMap, spy) {
            if (void 0 === callMap[spy.id]) callMap[spy.id] = 0;
            return callMap[spy.id] < spy.callCount;
        }
        function checkAdjacentCalls(callMap, spy, index, spies) {
            var calledBeforeNext = true;
            if (index !== spies.length - 1) calledBeforeNext = spy.calledBefore(spies[index + 1]);
            if (hasCallsLeft(callMap, spy) && calledBeforeNext) {
                callMap[spy.id] += 1;
                return true;
            }
            return false;
        }
        function calledInOrder(spies) {
            var callMap = {};
            var _spies = arguments.length > 1 ? arguments : spies;
            return every(_spies, checkAdjacentCalls.bind(null, callMap));
        }
        module.exports = calledInOrder;
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/class-name.js" (module) {
        function className(value) {
            const name = value.constructor && value.constructor.name;
            return name || null;
        }
        module.exports = className;
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/deprecated.js" (__unused_rspack_module, exports, __webpack_require__) {
        var process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
        exports.wrap = function(func, msg) {
            var wrapped = function() {
                exports.printWarning(msg);
                return func.apply(this, arguments);
            };
            if (func.prototype) wrapped.prototype = func.prototype;
            return wrapped;
        };
        exports.defaultMsg = function(packageName, funcName) {
            return `${packageName}.${funcName} is deprecated and will be removed from the public API in a future version of ${packageName}.`;
        };
        exports.printWarning = function(msg) {
            if ("object" == typeof process && process.emitWarning) process.emitWarning(msg);
            else if (console.info) console.info(msg);
            else console.log(msg);
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/every.js" (module) {
        module.exports = function every(obj, fn) {
            var pass = true;
            try {
                obj.forEach(function() {
                    if (!fn.apply(this, arguments)) throw new Error();
                });
            } catch (e) {
                pass = false;
            }
            return pass;
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/function-name.js" (module) {
        module.exports = function functionName(func) {
            if (!func) return "";
            try {
                return func.displayName || func.name || (String(func).match(/function ([^\s(]+)/) || [])[1];
            } catch (e) {
                return "";
            }
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/global.js" (module, __unused_rspack_exports, __webpack_require__) {
        var globalObject;
        globalObject = void 0 !== __webpack_require__.g ? __webpack_require__.g : "u" > typeof window ? window : self;
        module.exports = globalObject;
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        module.exports = {
            global: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/global.js"),
            calledInOrder: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/called-in-order.js"),
            className: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/class-name.js"),
            deprecated: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/deprecated.js"),
            every: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/every.js"),
            functionName: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/function-name.js"),
            orderByFirstCall: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/order-by-first-call.js"),
            prototypes: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/index.js"),
            typeOf: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/type-of.js"),
            valueToString: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/value-to-string.js")
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/order-by-first-call.js" (module, __unused_rspack_exports, __webpack_require__) {
        var sort = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/array.js").sort;
        var slice = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/array.js").slice;
        function comparator(a, b) {
            var aCall = a.getCall(0);
            var bCall = b.getCall(0);
            var aId = aCall && aCall.callId || -1;
            var bId = bCall && bCall.callId || -1;
            return aId < bId ? -1 : 1;
        }
        function orderByFirstCall(spies) {
            return sort(slice(spies), comparator);
        }
        module.exports = orderByFirstCall;
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/array.js" (module, __unused_rspack_exports, __webpack_require__) {
        var copyPrototype = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js");
        module.exports = copyPrototype(Array.prototype);
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js" (module, __unused_rspack_exports, __webpack_require__) {
        var call = Function.call;
        var throwsOnProto = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/throws-on-proto.js");
        var disallowedProperties = [
            "size",
            "caller",
            "callee",
            "arguments"
        ];
        if (throwsOnProto) disallowedProperties.push("__proto__");
        module.exports = function copyPrototypeMethods(prototype) {
            return Object.getOwnPropertyNames(prototype).reduce(function(result, name) {
                if (disallowedProperties.includes(name)) return result;
                if ("function" != typeof prototype[name]) return result;
                result[name] = call.bind(prototype[name]);
                return result;
            }, Object.create(null));
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/function.js" (module, __unused_rspack_exports, __webpack_require__) {
        var copyPrototype = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js");
        module.exports = copyPrototype(Function.prototype);
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/index.js" (module, __unused_rspack_exports, __webpack_require__) {
        module.exports = {
            array: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/array.js"),
            function: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/function.js"),
            map: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/map.js"),
            object: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/object.js"),
            set: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/set.js"),
            string: __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/string.js")
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/map.js" (module, __unused_rspack_exports, __webpack_require__) {
        var copyPrototype = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js");
        module.exports = copyPrototype(Map.prototype);
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/object.js" (module, __unused_rspack_exports, __webpack_require__) {
        var copyPrototype = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js");
        module.exports = copyPrototype(Object.prototype);
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/set.js" (module, __unused_rspack_exports, __webpack_require__) {
        var copyPrototype = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js");
        module.exports = copyPrototype(Set.prototype);
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/string.js" (module, __unused_rspack_exports, __webpack_require__) {
        var copyPrototype = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js");
        module.exports = copyPrototype(String.prototype);
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/prototypes/throws-on-proto.js" (module) {
        let throwsOnProto;
        try {
            const object = {};
            object.__proto__;
            throwsOnProto = false;
        } catch (_) {
            throwsOnProto = true;
        }
        module.exports = throwsOnProto;
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/type-of.js" (module, __unused_rspack_exports, __webpack_require__) {
        var type = __webpack_require__("../../node_modules/.pnpm/type-detect@4.0.8/node_modules/type-detect/type-detect.js");
        module.exports = function typeOf(value) {
            return type(value).toLowerCase();
        };
    },
    "../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/value-to-string.js" (module) {
        function valueToString(value) {
            if (value && value.toString) return value.toString();
            return String(value);
        }
        module.exports = valueToString;
    },
    "../../node_modules/.pnpm/@sinonjs+fake-timers@15.4.0/node_modules/@sinonjs/fake-timers/src/fake-timers-src.js" (__unused_rspack_module, exports, __webpack_require__) {
        const globalObject = __webpack_require__("../../node_modules/.pnpm/@sinonjs+commons@3.0.1/node_modules/@sinonjs/commons/lib/index.js").global;
        let timersModule, timersPromisesModule;
        try {
            timersModule = __webpack_require__("?ab50");
        } catch  {}
        try {
            timersPromisesModule = __webpack_require__("?190b");
        } catch  {}
        function withGlobal(_global) {
            const maxTimeout = Math.pow(2, 31) - 1;
            const idCounterStart = 1e12;
            const NOOP = function() {};
            const NOOP_ARRAY = function() {
                return [];
            };
            const isPresent = {};
            let timeoutResult, addTimerReturnsObject = false;
            if (_global.setTimeout) {
                isPresent.setTimeout = true;
                timeoutResult = _global.setTimeout(NOOP, 0);
                addTimerReturnsObject = "object" == typeof timeoutResult;
            }
            isPresent.clearTimeout = Boolean(_global.clearTimeout);
            isPresent.setInterval = Boolean(_global.setInterval);
            isPresent.clearInterval = Boolean(_global.clearInterval);
            isPresent.hrtime = _global.process && "function" == typeof _global.process.hrtime;
            isPresent.hrtimeBigint = isPresent.hrtime && "function" == typeof _global.process.hrtime.bigint;
            isPresent.nextTick = _global.process && "function" == typeof _global.process.nextTick;
            const utilPromisify = _global.process && __webpack_require__("../../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js").promisify;
            isPresent.performance = _global.performance && "function" == typeof _global.performance.now;
            const hasPerformancePrototype = _global.Performance && (typeof _global.Performance).match(/^(function|object)$/);
            const hasPerformanceConstructorPrototype = _global.performance && _global.performance.constructor && _global.performance.constructor.prototype;
            isPresent.queueMicrotask = Object.prototype.hasOwnProperty.call(_global, "queueMicrotask");
            isPresent.requestAnimationFrame = _global.requestAnimationFrame && "function" == typeof _global.requestAnimationFrame;
            isPresent.cancelAnimationFrame = _global.cancelAnimationFrame && "function" == typeof _global.cancelAnimationFrame;
            isPresent.requestIdleCallback = _global.requestIdleCallback && "function" == typeof _global.requestIdleCallback;
            isPresent.cancelIdleCallback = _global.cancelIdleCallback && "function" == typeof _global.cancelIdleCallback;
            isPresent.setImmediate = _global.setImmediate && "function" == typeof _global.setImmediate;
            isPresent.clearImmediate = _global.clearImmediate && "function" == typeof _global.clearImmediate;
            isPresent.Intl = _global.Intl && "object" == typeof _global.Intl;
            isPresent.Temporal = null !== _global.Temporal && "object" == typeof _global.Temporal && void 0 !== _global.Temporal.Now && void 0 !== _global.Temporal.Instant;
            if (_global.clearTimeout) _global.clearTimeout(timeoutResult);
            const NativeDate = _global.Date;
            const NativeIntl = isPresent.Intl ? Object.defineProperties(Object.create(null), Object.getOwnPropertyDescriptors(_global.Intl)) : void 0;
            const NativeTemporal = isPresent.Temporal ? _global.Temporal : void 0;
            let uniqueTimerId = idCounterStart;
            let uniqueTimerOrder = 0;
            if (void 0 === NativeDate) throw new Error("The global scope doesn't have a `Date` object (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)");
            isPresent.Date = true;
            class FakePerformanceEntry {
                constructor(name, entryType, startTime, duration){
                    this.name = name;
                    this.entryType = entryType;
                    this.startTime = startTime;
                    this.duration = duration;
                }
                toJSON() {
                    return JSON.stringify({
                        ...this
                    });
                }
            }
            function isNumberFinite(num) {
                if (Number.isFinite) return Number.isFinite(num);
                return isFinite(num);
            }
            function checkIsNearInfiniteLimit(clock, i) {
                if (clock.loopLimit && i === clock.loopLimit - 1) clock.isNearInfiniteLimit = true;
            }
            function resetIsNearInfiniteLimit(clock) {
                if (clock) clock.isNearInfiniteLimit = false;
            }
            function parseTime(str) {
                if (!str) return 0;
                const strings = str.split(":");
                const l = strings.length;
                let i = l;
                let ms = 0;
                let parsed;
                if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) throw new Error("tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits");
                while(i--){
                    parsed = parseInt(strings[i], 10);
                    if (parsed >= 60) throw new Error(`Invalid time ${str}`);
                    ms += parsed * Math.pow(60, l - i - 1);
                }
                return 1000 * ms;
            }
            function nanoRemainder(msFloat) {
                const modulo = 1e6;
                const remainder = 1e6 * msFloat % modulo;
                const positiveRemainder = remainder < 0 ? remainder + modulo : remainder;
                return Math.floor(positiveRemainder);
            }
            function getEpoch(epoch) {
                if (!epoch) return 0;
                if ("number" == typeof epoch) return epoch;
                if ("function" == typeof epoch.getTime) return epoch.getTime();
                if ("number" == typeof epoch.epochMilliseconds) return epoch.epochMilliseconds;
                throw new TypeError("now should be milliseconds since UNIX epoch");
            }
            function inRange(from, to, timer) {
                return timer && timer.callAt >= from && timer.callAt <= to;
            }
            function getInfiniteLoopError(clock, job) {
                const infiniteLoopError = new Error(`Aborting after running ${clock.loopLimit} timers, assuming an infinite loop!`);
                if (!job.error) return infiniteLoopError;
                const computedTargetPattern = /target\.*[<|(|[].*?[>|\]|)]\s*/;
                let clockMethodPattern = new RegExp(String(Object.keys(clock).join("|")));
                if (addTimerReturnsObject) clockMethodPattern = new RegExp(`\\s+at (Object\\.)?(?:${Object.keys(clock).join("|")})\\s+`);
                let matchedLineIndex = -1;
                job.error.stack.split("\n").some(function(line, i) {
                    const matchedComputedTarget = line.match(computedTargetPattern);
                    if (matchedComputedTarget) {
                        matchedLineIndex = i;
                        return true;
                    }
                    const matchedClockMethod = line.match(clockMethodPattern);
                    if (matchedClockMethod) {
                        matchedLineIndex = i;
                        return false;
                    }
                    return matchedLineIndex >= 0;
                });
                const stack = `${infiniteLoopError}\n${job.type || "Microtask"} - ${job.func.name || "anonymous"}\n${job.error.stack.split("\n").slice(matchedLineIndex + 1).join("\n")}`;
                try {
                    Object.defineProperty(infiniteLoopError, "stack", {
                        value: stack
                    });
                } catch  {}
                return infiniteLoopError;
            }
            function createDate() {
                class ClockDate extends NativeDate {
                    static clock;
                    constructor(...args){
                        if (0 === args.length) super(ClockDate.clock.now);
                        else super(...args);
                        Object.defineProperty(this, "constructor", {
                            value: NativeDate,
                            enumerable: false
                        });
                    }
                    static [Symbol.hasInstance](instance) {
                        return instance instanceof NativeDate;
                    }
                }
                ClockDate.isFake = true;
                if (NativeDate.now) ClockDate.now = function now() {
                    return ClockDate.clock.now;
                };
                const NativeDateWithToSource = NativeDate;
                if (NativeDateWithToSource.toSource) ClockDate.toSource = function toSource() {
                    return NativeDateWithToSource.toSource();
                };
                ClockDate.toString = function toString() {
                    return NativeDateWithToSource.toString();
                };
                const ClockDateProxy = new Proxy(ClockDate, {
                    apply () {
                        if (this instanceof ClockDate) throw new TypeError("A Proxy should only capture `new` calls with the `construct` handler. This is not supposed to be possible, so check the logic.");
                        return new NativeDate(ClockDate.clock.now).toString();
                    }
                });
                return ClockDateProxy;
            }
            function createIntl(clock) {
                const IntlWithClock = {
                    clock: clock
                };
                Object.getOwnPropertyNames(NativeIntl).forEach((property)=>IntlWithClock[property] = NativeIntl[property]);
                IntlWithClock.DateTimeFormat = function(...args) {
                    const realFormatter = new NativeIntl.DateTimeFormat(...args);
                    const formatter = {};
                    [
                        "formatRange",
                        "formatRangeToParts",
                        "resolvedOptions"
                    ].forEach((method)=>{
                        formatter[method] = realFormatter[method].bind(realFormatter);
                    });
                    [
                        "format",
                        "formatToParts"
                    ].forEach((method)=>{
                        formatter[method] = function(date) {
                            return realFormatter[method](date || IntlWithClock.clock.now);
                        };
                    });
                    return formatter;
                };
                IntlWithClock.DateTimeFormat.prototype = Object.create(NativeIntl.DateTimeFormat.prototype);
                IntlWithClock.DateTimeFormat.supportedLocalesOf = NativeIntl.DateTimeFormat.supportedLocalesOf;
                return IntlWithClock;
            }
            function createTemporal(clock, getNanos) {
                const fakeNow = {
                    instant () {
                        return NativeTemporal.Instant.fromEpochNanoseconds(1_000_000n * BigInt(clock.now) + BigInt(getNanos()));
                    },
                    timeZoneId () {
                        return NativeTemporal.Now.timeZoneId();
                    },
                    zonedDateTimeISO (timeZone) {
                        const tz = timeZone ?? NativeTemporal.Now.timeZoneId();
                        return fakeNow.instant().toZonedDateTimeISO(tz);
                    },
                    plainDateTimeISO (timeZone) {
                        return fakeNow.zonedDateTimeISO(timeZone).toPlainDateTime();
                    },
                    plainDateISO (timeZone) {
                        return fakeNow.zonedDateTimeISO(timeZone).toPlainDate();
                    },
                    plainTimeISO (timeZone) {
                        return fakeNow.zonedDateTimeISO(timeZone).toPlainTime();
                    }
                };
                const TemporalWithClock = Object.create(Object.getPrototypeOf(NativeTemporal));
                [
                    ...Object.getOwnPropertyNames(NativeTemporal),
                    ...Object.getOwnPropertySymbols(NativeTemporal)
                ].forEach((prop)=>{
                    Object.defineProperty(TemporalWithClock, prop, Object.getOwnPropertyDescriptor(NativeTemporal, prop));
                });
                Object.defineProperty(TemporalWithClock, "Now", {
                    value: fakeNow,
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
                return TemporalWithClock;
            }
            function enqueueJob(clock, job) {
                if (!clock.jobs) clock.jobs = [];
                clock.jobs.push(job);
            }
            function runJobs(clock) {
                if (!clock.jobs) return;
                const wasNearLimit = clock.isNearInfiniteLimit;
                for(let i = 0; i < clock.jobs.length; i++){
                    const job = clock.jobs[i];
                    job.func.apply(null, job.args);
                    checkIsNearInfiniteLimit(clock, i);
                    if (clock.loopLimit && i > clock.loopLimit) throw getInfiniteLoopError(clock, job);
                }
                if (!wasNearLimit) resetIsNearInfiniteLimit(clock);
                clock.jobs = [];
            }
            class TimerHeap {
                constructor(){
                    this.timers = [];
                }
                peek() {
                    return this.timers[0];
                }
                push(timer) {
                    this.timers.push(timer);
                    this.bubbleUp(this.timers.length - 1);
                }
                pop() {
                    if (0 === this.timers.length) return;
                    const first = this.timers[0];
                    const last = this.timers.pop();
                    if (this.timers.length > 0) {
                        this.timers[0] = last;
                        last.heapIndex = 0;
                        this.bubbleDown(0);
                    }
                    delete first.heapIndex;
                    return first;
                }
                remove(timer) {
                    const index = timer.heapIndex;
                    if (void 0 === index || this.timers[index] !== timer) return false;
                    const last = this.timers.pop();
                    if (timer !== last) {
                        this.timers[index] = last;
                        last.heapIndex = index;
                        if (compareTimers(last, timer) < 0) this.bubbleUp(index);
                        else this.bubbleDown(index);
                    }
                    delete timer.heapIndex;
                    return true;
                }
                bubbleUp(index) {
                    const timer = this.timers[index];
                    let currentIndex = index;
                    while(currentIndex > 0){
                        const parentIndex = Math.floor((currentIndex - 1) / 2);
                        const parent = this.timers[parentIndex];
                        if (compareTimers(timer, parent) < 0) {
                            this.timers[currentIndex] = parent;
                            parent.heapIndex = currentIndex;
                            currentIndex = parentIndex;
                        } else break;
                    }
                    this.timers[currentIndex] = timer;
                    timer.heapIndex = currentIndex;
                }
                bubbleDown(index) {
                    const timer = this.timers[index];
                    let currentIndex = index;
                    const halfLength = Math.floor(this.timers.length / 2);
                    while(currentIndex < halfLength){
                        const leftIndex = 2 * currentIndex + 1;
                        const rightIndex = leftIndex + 1;
                        let bestChildIndex = leftIndex;
                        let bestChild = this.timers[leftIndex];
                        if (rightIndex < this.timers.length && compareTimers(this.timers[rightIndex], bestChild) < 0) {
                            bestChildIndex = rightIndex;
                            bestChild = this.timers[rightIndex];
                        }
                        if (compareTimers(bestChild, timer) < 0) {
                            this.timers[currentIndex] = bestChild;
                            bestChild.heapIndex = currentIndex;
                            currentIndex = bestChildIndex;
                        } else break;
                    }
                    this.timers[currentIndex] = timer;
                    timer.heapIndex = currentIndex;
                }
            }
            function ensureTimerState(clock) {
                if (!clock.timers) {
                    clock.timers = new Map();
                    clock.timerHeap = new TimerHeap();
                }
            }
            function hasTimer(clock, id) {
                return clock.timers ? clock.timers.has(id) : false;
            }
            function getTimer(clock, id) {
                return clock.timers ? clock.timers.get(id) : void 0;
            }
            function setTimer(clock, timer) {
                ensureTimerState(clock);
                clock.timers.set(timer.id, timer);
            }
            function deleteTimer(clock, id) {
                return clock.timers ? clock.timers.delete(id) : false;
            }
            function forEachActiveTimer(clock, callback) {
                if (!clock.timers) return;
                for (const timer of clock.timers.values())callback(timer);
            }
            function rebuildTimerHeap(clock) {
                clock.timerHeap = new TimerHeap();
                forEachActiveTimer(clock, (timer)=>{
                    clock.timerHeap.push(timer);
                });
            }
            function addTimer(clock, timer) {
                if (void 0 === timer.func) throw new Error("Callback must be provided to timer calls");
                if ("function" != typeof timer.func) throw new TypeError(`[ERR_INVALID_CALLBACK]: Callback must be a function. Received ${timer.func} of type ${typeof timer.func}`);
                if (clock.isNearInfiniteLimit) timer.error = new Error();
                timer.type = timer.immediate ? "Immediate" : "Timeout";
                if (Object.prototype.hasOwnProperty.call(timer, "delay")) {
                    if ("number" != typeof timer.delay) timer.delay = parseInt(timer.delay, 10);
                    if (!isNumberFinite(timer.delay)) timer.delay = 0;
                    timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
                    timer.delay = Math.max(0, timer.delay);
                }
                if (Object.prototype.hasOwnProperty.call(timer, "interval")) {
                    timer.type = "Interval";
                    timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
                }
                if (Object.prototype.hasOwnProperty.call(timer, "animation")) {
                    timer.type = "AnimationFrame";
                    timer.animation = true;
                }
                if (Object.prototype.hasOwnProperty.call(timer, "requestIdleCallback")) {
                    if (!timer.delay) timer.type = "IdleCallback";
                    timer.requestIdleCallback = true;
                }
                ensureTimerState(clock);
                while(hasTimer(clock, uniqueTimerId)){
                    uniqueTimerId++;
                    if (uniqueTimerId >= Number.MAX_SAFE_INTEGER) uniqueTimerId = idCounterStart;
                }
                timer.id = uniqueTimerId++;
                if (uniqueTimerId >= Number.MAX_SAFE_INTEGER) uniqueTimerId = idCounterStart;
                timer.order = uniqueTimerOrder++;
                timer.createdAt = clock.now;
                timer.callAt = clock.now + (parseInt(String(timer.delay)) || (clock.duringTick ? 1 : 0));
                setTimer(clock, timer);
                clock.timerHeap.push(timer);
                if (addTimerReturnsObject) {
                    const res = {
                        refed: true,
                        ref: function() {
                            this.refed = true;
                            return this;
                        },
                        unref: function() {
                            this.refed = false;
                            return this;
                        },
                        hasRef: function() {
                            return this.refed;
                        },
                        refresh: function() {
                            timer.callAt = clock.now + (parseInt(String(timer.delay)) || (clock.duringTick ? 1 : 0));
                            clock.timerHeap.remove(timer);
                            timer.order = uniqueTimerOrder++;
                            setTimer(clock, timer);
                            clock.timerHeap.push(timer);
                            return this;
                        },
                        [Symbol.toPrimitive]: function() {
                            return timer.id;
                        }
                    };
                    return res;
                }
                return timer.id;
            }
            function compareTimers(a, b) {
                if ("IdleCallback" === a.type && "IdleCallback" !== b.type) return 1;
                if ("IdleCallback" !== a.type && "IdleCallback" === b.type) return -1;
                if (a.callAt < b.callAt) return -1;
                if (a.callAt > b.callAt) return 1;
                if (a.immediate && !b.immediate) return -1;
                if (!a.immediate && b.immediate) return 1;
                if (a.order < b.order) return -1;
                if (a.order > b.order) return 1;
                if (a.createdAt < b.createdAt) return -1;
                if (a.createdAt > b.createdAt) return 1;
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            }
            function firstTimerInRange(clock, from, to) {
                if (!clock.timerHeap) return null;
                const timers = clock.timerHeap.timers;
                if (1 === timers.length && timers[0].requestIdleCallback) return timers[0];
                const first = clock.timerHeap.peek();
                if (first && inRange(from, to, first)) return first;
                let timer = null;
                for(let i = 0; i < timers.length; i++)if (inRange(from, to, timers[i]) && (!timer || 1 === compareTimers(timer, timers[i]))) timer = timers[i];
                return timer;
            }
            function firstTimer(clock) {
                if (!clock.timerHeap) return null;
                return clock.timerHeap.peek() || null;
            }
            function lastTimer(clock) {
                if (!clock.timerHeap) return null;
                const timers = clock.timerHeap.timers;
                let timer = null;
                for(let i = 0; i < timers.length; i++)if (!timer || -1 === compareTimers(timer, timers[i])) timer = timers[i];
                return timer;
            }
            function callTimer(clock, timer) {
                if ("number" == typeof timer.interval) {
                    clock.timerHeap.remove(timer);
                    timer.callAt += timer.interval;
                    timer.order = uniqueTimerOrder++;
                    if (clock.isNearInfiniteLimit) timer.error = new Error();
                    clock.timerHeap.push(timer);
                } else {
                    deleteTimer(clock, timer.id);
                    clock.timerHeap.remove(timer);
                }
                if ("function" == typeof timer.func) timer.func.apply(null, timer.args);
            }
            function getClearHandler(ttype) {
                if ("IdleCallback" === ttype || "AnimationFrame" === ttype) return `cancel${ttype}`;
                return `clear${ttype}`;
            }
            function getScheduleHandler(ttype) {
                if ("IdleCallback" === ttype || "AnimationFrame" === ttype) return `request${ttype}`;
                return `set${ttype}`;
            }
            function createWarnOnce() {
                let calls = 0;
                return function(msg) {
                    calls++ || console.warn(msg);
                };
            }
            const warnOnce = createWarnOnce();
            function clearTimer(clock, timerId, ttype) {
                if (!timerId) return;
                const id = Number(timerId);
                if (Number.isNaN(id) || id < idCounterStart) {
                    const handlerName = getClearHandler(ttype);
                    if (true === clock.shouldClearNativeTimers) {
                        const nativeHandler = clock[`_${handlerName}`];
                        return "function" == typeof nativeHandler ? nativeHandler(timerId) : void 0;
                    }
                    const stackTrace = new Error().stack.split("\n").slice(1).join("\n");
                    warnOnce(`FakeTimers: ${handlerName} was invoked to clear a native timer instead of one created by this library.\nTo automatically clean-up native timers, use \`shouldClearNativeTimers\`.\n${stackTrace}`);
                }
                if (hasTimer(clock, id)) {
                    const timer = getTimer(clock, id);
                    if (timer.type === ttype || "Timeout" === timer.type && "Interval" === ttype || "Interval" === timer.type && "Timeout" === ttype) {
                        deleteTimer(clock, id);
                        clock.timerHeap.remove(timer);
                    } else {
                        const clear = getClearHandler(ttype);
                        const schedule = getScheduleHandler(timer.type);
                        throw new Error(`Cannot clear timer: timer created with ${schedule}() but cleared with ${clear}()`);
                    }
                }
            }
            function hijackMethod(target, method, clock) {
                clock[method].hasOwnProperty = Object.prototype.hasOwnProperty.call(target, method);
                clock[`_${method}`] = target[method];
                if ("Date" === method) target[method] = clock[method];
                else if ("Intl" === method) target[method] = clock[method];
                else if ("Temporal" === method) target[method] = clock[method];
                else if ("performance" === method) {
                    const originalPerfDescriptor = Object.getOwnPropertyDescriptor(target, method);
                    if (originalPerfDescriptor && originalPerfDescriptor.get && !originalPerfDescriptor.set) {
                        Object.defineProperty(clock, `_${method}`, originalPerfDescriptor);
                        const perfDescriptor = Object.getOwnPropertyDescriptor(clock, method);
                        Object.defineProperty(target, method, perfDescriptor);
                    } else target[method] = clock[method];
                } else {
                    target[method] = function() {
                        return clock[method].apply(clock, arguments);
                    };
                    Object.defineProperties(target[method], Object.getOwnPropertyDescriptors(clock[method]));
                }
                target[method].clock = clock;
            }
            function doIntervalTick(clock, advanceTimeDelta) {
                clock.tick(advanceTimeDelta);
            }
            const timers = {
                setTimeout: _global.setTimeout,
                clearTimeout: _global.clearTimeout,
                setInterval: _global.setInterval,
                clearInterval: _global.clearInterval,
                Date: _global.Date
            };
            if (isPresent.setImmediate) timers.setImmediate = _global.setImmediate;
            if (isPresent.clearImmediate) timers.clearImmediate = _global.clearImmediate;
            if (isPresent.hrtime) timers.hrtime = _global.process.hrtime;
            if (isPresent.nextTick) timers.nextTick = _global.process.nextTick;
            if (isPresent.performance) timers.performance = _global.performance;
            if (isPresent.requestAnimationFrame) timers.requestAnimationFrame = _global.requestAnimationFrame;
            if (isPresent.queueMicrotask) timers.queueMicrotask = _global.queueMicrotask;
            if (isPresent.cancelAnimationFrame) timers.cancelAnimationFrame = _global.cancelAnimationFrame;
            if (isPresent.requestIdleCallback) timers.requestIdleCallback = _global.requestIdleCallback;
            if (isPresent.cancelIdleCallback) timers.cancelIdleCallback = _global.cancelIdleCallback;
            if (isPresent.Intl) timers.Intl = NativeIntl;
            if (isPresent.Temporal) timers.Temporal = NativeTemporal;
            const originalSetTimeout = _global.setImmediate || _global.setTimeout;
            const originalClearInterval = _global.clearInterval;
            const originalSetInterval = _global.setInterval;
            function createClock(start, loopLimit) {
                start = Math.floor(getEpoch(start));
                const startTimestamp = start;
                loopLimit = loopLimit || 1000;
                let nanos = 0;
                let uninstalled = false;
                const adjustedSystemTime = [
                    0,
                    0
                ];
                const clock = {
                    now: start,
                    Date: createDate(),
                    loopLimit: loopLimit,
                    isNearInfiniteLimit: false,
                    tickMode: {
                        mode: "manual",
                        counter: 0,
                        delta: void 0
                    }
                };
                clock.Date.clock = clock;
                function getTimeToNextFrame() {
                    return 16 - (clock.now - startTimestamp) % 16;
                }
                function hrtime(prev) {
                    const millisSinceStart = clock.now - adjustedSystemTime[0] - startTimestamp;
                    const secsSinceStart = Math.floor(millisSinceStart / 1000);
                    const remainderInNanos = (millisSinceStart - 1e3 * secsSinceStart) * 1e6 + nanos - adjustedSystemTime[1];
                    if (Array.isArray(prev)) {
                        if (prev[1] > 1e9) throw new TypeError("Number of nanoseconds can't exceed a billion");
                        const oldSecs = prev[0];
                        let nanoDiff = remainderInNanos - prev[1];
                        let secDiff = secsSinceStart - oldSecs;
                        if (nanoDiff < 0) {
                            nanoDiff += 1e9;
                            secDiff -= 1;
                        }
                        return [
                            secDiff,
                            nanoDiff
                        ];
                    }
                    return [
                        secsSinceStart,
                        remainderInNanos
                    ];
                }
                function fakePerformanceNow() {
                    const hrt = hrtime();
                    const millis = 1000 * hrt[0] + hrt[1] / 1e6;
                    return millis;
                }
                if (isPresent.hrtimeBigint) hrtime.bigint = function() {
                    const parts = hrtime();
                    return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]);
                };
                if (isPresent.Intl) {
                    clock.Intl = createIntl(clock);
                    clock.Intl.clock = clock;
                }
                if (isPresent.Temporal) clock.Temporal = createTemporal(clock, ()=>nanos);
                clock.setTickMode = function(tickModeConfig) {
                    const { mode: newMode, delta: newDelta } = tickModeConfig;
                    const { mode: oldMode, delta: oldDelta } = clock.tickMode;
                    if (newMode === oldMode && newDelta === oldDelta) return;
                    if ("interval" === oldMode) originalClearInterval(clock.attachedInterval);
                    clock.tickMode = {
                        counter: clock.tickMode.counter + 1,
                        mode: newMode,
                        delta: newDelta
                    };
                    if ("nextAsync" === newMode) advanceUntilModeChanges();
                    else if ("interval" === newMode) createIntervalTick(clock, newDelta || 20);
                };
                async function advanceUntilModeChanges() {
                    async function newMacrotask() {
                        const channel = new MessageChannel();
                        await new Promise((resolve)=>{
                            channel.port1.onmessage = ()=>{
                                resolve(void 0);
                                channel.port1.close();
                            };
                            channel.port2.postMessage(void 0);
                        });
                        channel.port1.close();
                        channel.port2.close();
                        await new Promise((resolve)=>{
                            originalSetTimeout(resolve);
                        });
                    }
                    const { counter } = clock.tickMode;
                    while(clock.tickMode.counter === counter){
                        await newMacrotask();
                        if (clock.tickMode.counter !== counter) return;
                        clock.next();
                    }
                }
                function pauseAutoTickUntilFinished(promise) {
                    if ("nextAsync" !== clock.tickMode.mode) return promise;
                    clock.setTickMode({
                        mode: "manual"
                    });
                    return promise.finally(()=>{
                        if (!uninstalled) clock.setTickMode({
                            mode: "nextAsync"
                        });
                    });
                }
                function getTimeToNextIdlePeriod() {
                    let timeToNextIdlePeriod = 0;
                    if (clock.countTimers() > 0) timeToNextIdlePeriod = 50;
                    return timeToNextIdlePeriod;
                }
                clock.requestIdleCallback = function requestIdleCallback(func, { timeout } = {}) {
                    const idleDeadline = {
                        didTimeout: true,
                        timeRemaining: getTimeToNextIdlePeriod
                    };
                    const result = addTimer(clock, {
                        func: func,
                        args: [
                            idleDeadline
                        ],
                        delay: timeout,
                        requestIdleCallback: true
                    });
                    return Number(result);
                };
                clock.cancelIdleCallback = function cancelIdleCallback(timerId) {
                    return clearTimer(clock, timerId, "IdleCallback");
                };
                clock.setTimeout = function setTimeout(func, timeout) {
                    return addTimer(clock, {
                        func: func,
                        args: Array.prototype.slice.call(arguments, 2),
                        delay: timeout
                    });
                };
                if (void 0 !== _global.Promise && utilPromisify) clock.setTimeout[utilPromisify.custom] = function promisifiedSetTimeout(timeout, arg) {
                    return new _global.Promise(function setTimeoutExecutor(resolve) {
                        addTimer(clock, {
                            func: resolve,
                            args: [
                                arg
                            ],
                            delay: timeout
                        });
                    });
                };
                clock.clearTimeout = function clearTimeout(timerId) {
                    return clearTimer(clock, timerId, "Timeout");
                };
                clock.nextTick = function nextTick(func) {
                    return enqueueJob(clock, {
                        func: func,
                        args: Array.prototype.slice.call(arguments, 1),
                        error: clock.isNearInfiniteLimit ? new Error() : null
                    });
                };
                clock.queueMicrotask = function queueMicrotask(func) {
                    return clock.nextTick(func);
                };
                clock.setInterval = function setInterval(func, timeout) {
                    timeout = parseInt(String(timeout), 10);
                    return addTimer(clock, {
                        func: func,
                        args: Array.prototype.slice.call(arguments, 2),
                        delay: timeout,
                        interval: timeout
                    });
                };
                clock.clearInterval = function clearInterval(timerId) {
                    return clearTimer(clock, timerId, "Interval");
                };
                if (isPresent.setImmediate) {
                    clock.setImmediate = function setImmediate(func) {
                        return addTimer(clock, {
                            func: func,
                            args: Array.prototype.slice.call(arguments, 1),
                            immediate: true
                        });
                    };
                    if (void 0 !== _global.Promise && utilPromisify) clock.setImmediate[utilPromisify.custom] = function promisifiedSetImmediate(arg) {
                        return new _global.Promise(function setImmediateExecutor(resolve) {
                            addTimer(clock, {
                                func: resolve,
                                args: [
                                    arg
                                ],
                                immediate: true
                            });
                        });
                    };
                    clock.clearImmediate = function clearImmediate(timerId) {
                        return clearTimer(clock, timerId, "Immediate");
                    };
                }
                clock.countTimers = function countTimers() {
                    return (clock.timerHeap ? clock.timerHeap.timers.length : 0) + (clock.jobs || []).length;
                };
                clock.requestAnimationFrame = function requestAnimationFrame(func) {
                    const result = addTimer(clock, {
                        func: func,
                        delay: getTimeToNextFrame(),
                        get args () {
                            return [
                                fakePerformanceNow()
                            ];
                        },
                        animation: true
                    });
                    return Number(result);
                };
                clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
                    return clearTimer(clock, timerId, "AnimationFrame");
                };
                clock.runMicrotasks = function runMicrotasks() {
                    runJobs(clock);
                };
                function durationToMs(duration) {
                    const relativeTo = NativeTemporal.Instant.fromEpochMilliseconds(clock.now).toZonedDateTimeISO(NativeTemporal.Now.timeZoneId());
                    return duration.total({
                        unit: "millisecond",
                        relativeTo
                    });
                }
                function tickValueToMs(tickValue) {
                    if ("number" == typeof tickValue) return tickValue;
                    if (isPresent.Temporal && null !== tickValue && "object" == typeof tickValue && "function" == typeof tickValue.total) return durationToMs(tickValue);
                    return parseTime(tickValue);
                }
                function createTickState(tickValue) {
                    const msFloat = tickValueToMs(tickValue);
                    const ms = Math.floor(msFloat);
                    const remainder = nanoRemainder(msFloat);
                    let nanosTotal = nanos + remainder;
                    let tickTo = clock.now + ms;
                    if (msFloat < 0) throw new TypeError("Negative ticks are not supported");
                    if (nanosTotal >= 1e6) {
                        tickTo += 1;
                        nanosTotal -= 1e6;
                    }
                    return {
                        msFloat: msFloat,
                        ms: ms,
                        nanosTotal: nanosTotal,
                        tickFrom: clock.now,
                        tickTo: tickTo,
                        previous: clock.now,
                        timer: null,
                        firstException: null,
                        oldNow: null
                    };
                }
                function applyClockChangeCompensation(state, oldNow, options) {
                    if (oldNow !== clock.now) {
                        const difference = clock.now - oldNow;
                        state.tickFrom += difference;
                        state.tickTo += difference;
                        if (options && options.includePrevious) state.previous += difference;
                    }
                }
                function runInitialJobs(state) {
                    state.oldNow = clock.now;
                    runJobs(clock);
                    applyClockChangeCompensation(state, state.oldNow);
                }
                function runPostLoopJobs(state) {
                    state.oldNow = clock.now;
                    runJobs(clock);
                    applyClockChangeCompensation(state, state.oldNow);
                }
                function selectNextTimerInRange(state) {
                    state.timer = firstTimerInRange(clock, state.previous, state.tickTo);
                    state.previous = state.tickFrom;
                }
                function runTimersInRange(state, isAsync, nextPromiseTick, compensationCheck) {
                    state.timer = firstTimerInRange(clock, state.tickFrom, state.tickTo);
                    while(state.timer && state.tickFrom <= state.tickTo){
                        if (hasTimer(clock, state.timer.id)) {
                            state.tickFrom = state.timer.callAt;
                            clock.now = state.timer.callAt;
                            state.oldNow = clock.now;
                            try {
                                runJobs(clock);
                                callTimer(clock, state.timer);
                            } catch (e) {
                                state.firstException = state.firstException || e;
                            }
                            if (isAsync) {
                                originalSetTimeout(nextPromiseTick);
                                return true;
                            }
                            compensationCheck();
                        }
                        selectNextTimerInRange(state);
                    }
                    return false;
                }
                function finalizeTick(state, isAsync, resolve) {
                    state.timer = firstTimerInRange(clock, state.tickFrom, state.tickTo);
                    if (state.timer) try {
                        clock.tick(state.tickTo - clock.now);
                    } catch (e) {
                        state.firstException = state.firstException || e;
                    }
                    else {
                        clock.now = state.tickTo;
                        nanos = state.nanosTotal;
                    }
                    if (state.firstException) throw state.firstException;
                    if (!isAsync) return clock.now;
                    resolve(clock.now);
                }
                function doTick(tickValue, isAsync, resolve, reject) {
                    const state = createTickState(tickValue);
                    nanos = state.nanosTotal;
                    clock.duringTick = true;
                    runInitialJobs(state);
                    const compensationCheck = function() {
                        applyClockChangeCompensation(state, state.oldNow, {
                            includePrevious: true
                        });
                    };
                    const nextPromiseTick = isAsync && function() {
                        try {
                            compensationCheck();
                            selectNextTimerInRange(state);
                            doTickInner();
                        } catch (e) {
                            reject(e);
                        }
                    };
                    function doTickInner() {
                        if (runTimersInRange(state, isAsync, nextPromiseTick, compensationCheck)) return;
                        runPostLoopJobs(state);
                        clock.duringTick = false;
                        return finalizeTick(state, isAsync, resolve);
                    }
                    return doTickInner();
                }
                clock.tick = function tick(tickValue) {
                    return doTick(tickValue, false);
                };
                clock.next = function next() {
                    runJobs(clock);
                    const timer = firstTimer(clock);
                    if (!timer) return clock.now;
                    clock.duringTick = true;
                    try {
                        clock.now = timer.callAt;
                        callTimer(clock, timer);
                        runJobs(clock);
                        return clock.now;
                    } finally{
                        clock.duringTick = false;
                    }
                };
                function runAsyncWithNativeTimeout(callback) {
                    return pauseAutoTickUntilFinished(new _global.Promise(function(resolve, reject) {
                        originalSetTimeout(function() {
                            try {
                                callback(resolve, reject);
                            } catch (e) {
                                reject(e);
                            }
                        });
                    }));
                }
                clock.runAll = function runAll() {
                    runJobs(clock);
                    for(let i = 0; i < clock.loopLimit; i++){
                        if (!clock.timers) {
                            resetIsNearInfiniteLimit(clock);
                            return clock.now;
                        }
                        const numTimers = clock.timerHeap.timers.length;
                        if (0 === numTimers) {
                            resetIsNearInfiniteLimit(clock);
                            return clock.now;
                        }
                        checkIsNearInfiniteLimit(clock, i);
                        clock.next();
                    }
                    const excessJob = firstTimer(clock);
                    throw getInfiniteLoopError(clock, excessJob);
                };
                clock.runToFrame = function runToFrame() {
                    return clock.tick(getTimeToNextFrame());
                };
                clock.runToLast = function runToLast() {
                    const timer = lastTimer(clock);
                    if (!timer) {
                        runJobs(clock);
                        return clock.now;
                    }
                    return clock.tick(timer.callAt - clock.now);
                };
                if (void 0 !== _global.Promise) {
                    clock.tickAsync = function tickAsync(tickValue) {
                        return runAsyncWithNativeTimeout(function(resolve, reject) {
                            doTick(tickValue, true, resolve, reject);
                        });
                    };
                    clock.nextAsync = function nextAsync() {
                        return runAsyncWithNativeTimeout(function(resolve, reject) {
                            const timer = firstTimer(clock);
                            if (!timer) return void resolve(clock.now);
                            let err;
                            clock.duringTick = true;
                            clock.now = timer.callAt;
                            try {
                                callTimer(clock, timer);
                            } catch (e) {
                                err = e;
                            }
                            clock.duringTick = false;
                            originalSetTimeout(function() {
                                if (err) reject(err);
                                else resolve(clock.now);
                            });
                        });
                    };
                    clock.runAllAsync = function runAllAsync() {
                        let i = 0;
                        function doRun(resolve, reject) {
                            try {
                                runJobs(clock);
                                let numTimers;
                                if (i < clock.loopLimit) {
                                    if (!clock.timerHeap) {
                                        resetIsNearInfiniteLimit(clock);
                                        resolve(clock.now);
                                        return;
                                    }
                                    numTimers = clock.timerHeap.timers.length;
                                    if (0 === numTimers) {
                                        resetIsNearInfiniteLimit(clock);
                                        resolve(clock.now);
                                        return;
                                    }
                                    checkIsNearInfiniteLimit(clock, i);
                                    clock.next();
                                    i++;
                                    originalSetTimeout(function() {
                                        doRun(resolve, reject);
                                    });
                                    return;
                                }
                                const excessJob = firstTimer(clock);
                                reject(getInfiniteLoopError(clock, excessJob));
                            } catch (e) {
                                reject(e);
                            }
                        }
                        return runAsyncWithNativeTimeout(function(resolve, reject) {
                            doRun(resolve, reject);
                        });
                    };
                    clock.runToLastAsync = function runToLastAsync() {
                        return runAsyncWithNativeTimeout(function(resolve) {
                            const timer = lastTimer(clock);
                            if (!timer) {
                                runJobs(clock);
                                resolve(clock.now);
                                return;
                            }
                            resolve(clock.tickAsync(timer.callAt - clock.now));
                        });
                    };
                }
                clock.reset = function reset() {
                    nanos = 0;
                    clock.timers = new Map();
                    clock.timerHeap = new TimerHeap();
                    clock.jobs = [];
                    clock.now = start;
                };
                clock.setSystemTime = function setSystemTime(systemTime) {
                    const newNow = getEpoch(systemTime);
                    const difference = newNow - clock.now;
                    adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
                    adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
                    clock.now = newNow;
                    nanos = 0;
                    forEachActiveTimer(clock, (timer)=>{
                        timer.createdAt += difference;
                        timer.callAt += difference;
                    });
                };
                clock.jump = function jump(tickValue) {
                    const msFloat = tickValueToMs(tickValue);
                    const ms = Math.floor(msFloat);
                    forEachActiveTimer(clock, (timer)=>{
                        if (clock.now + ms > timer.callAt) timer.callAt = clock.now + ms;
                    });
                    rebuildTimerHeap(clock);
                    clock.tick(ms);
                    return clock.now;
                };
                if (isPresent.performance) {
                    clock.performance = Object.create(null);
                    clock.performance.now = fakePerformanceNow;
                }
                if (isPresent.hrtime) clock.hrtime = hrtime;
                clock.uninstall = function() {
                    uninstalled = true;
                    clock.setTickMode({
                        mode: "manual"
                    });
                    if (clock.methods) {
                        const installedHrTime = "_hrtime";
                        const installedNextTick = "_nextTick";
                        let method, i, l;
                        for(i = 0, l = clock.methods.length; i < l; i++){
                            method = clock.methods[i];
                            if ("hrtime" === method && _global.process) _global.process.hrtime = clock[installedHrTime];
                            else if ("nextTick" === method && _global.process) _global.process.nextTick = clock[installedNextTick];
                            else if ("performance" === method) {
                                const originalPerfDescriptor = Object.getOwnPropertyDescriptor(clock, `_${method}`);
                                if (originalPerfDescriptor && originalPerfDescriptor.get && !originalPerfDescriptor.set) Object.defineProperty(_global, method, originalPerfDescriptor);
                                else if (originalPerfDescriptor.configurable) _global[method] = clock[`_${method}`];
                            } else if (clock[method] && clock[method].hasOwnProperty) _global[method] = clock[`_${method}`];
                            else try {
                                delete _global[method];
                            } catch  {}
                            if (void 0 !== clock.timersModuleMethods) for(let j = 0; j < clock.timersModuleMethods.length; j++){
                                const entry = clock.timersModuleMethods[j];
                                timersModule[entry.methodName] = entry.original;
                            }
                            if (void 0 !== clock.timersPromisesModuleMethods) for(let j = 0; j < clock.timersPromisesModuleMethods.length; j++){
                                const entry = clock.timersPromisesModuleMethods[j];
                                timersPromisesModule[entry.methodName] = entry.original;
                            }
                        }
                        clock.methods = [];
                    }
                    if (clock.abortListenerMap) for (const [listener, signal] of clock.abortListenerMap.entries()){
                        signal.removeEventListener("abort", listener);
                        clock.abortListenerMap.delete(listener);
                    }
                    if (!clock.timerHeap) return [];
                    return clock.timerHeap.timers.slice();
                };
                return clock;
            }
            function createIntervalTick(clock, delta) {
                const intervalTick = doIntervalTick.bind(null, clock, delta);
                const intervalId = originalSetInterval(intervalTick, delta);
                clock.attachedInterval = intervalId;
            }
            function install(config) {
                if (arguments.length > 1 || config instanceof Date || Array.isArray(config) || "number" == typeof config) throw new TypeError(`FakeTimers.install called with ${String(config)} install requires an object parameter`);
                if (true === _global.Date.isFake) throw new TypeError("Can't install fake timers twice on the same global object.");
                config = void 0 !== config ? config : {};
                config.shouldAdvanceTime = config.shouldAdvanceTime || false;
                config.advanceTimeDelta = config.advanceTimeDelta || 20;
                config.shouldClearNativeTimers = config.shouldClearNativeTimers || false;
                const hasToFake = Object.prototype.hasOwnProperty.call(config, "toFake");
                const hasToNotFake = Object.prototype.hasOwnProperty.call(config, "toNotFake");
                if (hasToFake && hasToNotFake) throw new TypeError("config.toFake and config.toNotFake cannot be used together");
                if (config.target) throw new TypeError("config.target is no longer supported. Use `withGlobal(target)` instead.");
                function handleMissingTimer(timer) {
                    if (config.ignoreMissingTimers) return;
                    throw new ReferenceError(`non-existent timers and/or objects cannot be faked: '${timer}'`);
                }
                let i, l;
                const clock = createClock(config.now, config.loopLimit);
                clock.shouldClearNativeTimers = config.shouldClearNativeTimers;
                clock.abortListenerMap = new Map();
                if (hasToFake) {
                    clock.methods = config.toFake || [];
                    if (0 === clock.methods.length) clock.methods = Object.keys(timers);
                } else if (hasToNotFake) {
                    const methodsToNotFake = config.toNotFake || [];
                    clock.methods = Object.keys(timers).filter((method)=>!methodsToNotFake.includes(method));
                } else clock.methods = Object.keys(timers);
                if (true === config.shouldAdvanceTime) clock.setTickMode({
                    mode: "interval",
                    delta: config.advanceTimeDelta
                });
                if (clock.methods.includes("performance")) {
                    const proto = (()=>{
                        if (hasPerformanceConstructorPrototype) return _global.performance.constructor.prototype;
                        if (hasPerformancePrototype) return _global.Performance.prototype;
                    })();
                    if (proto) {
                        Object.getOwnPropertyNames(proto).forEach(function(name) {
                            if ("now" !== name) clock.performance[name] = 0 === name.indexOf("getEntries") ? NOOP_ARRAY : NOOP;
                        });
                        clock.performance.mark = (name)=>new FakePerformanceEntry(name, "mark", 0, 0);
                        clock.performance.measure = (name)=>new FakePerformanceEntry(name, "measure", 0, 100);
                        clock.performance.timeOrigin = getEpoch(config.now);
                    } else if ((config.toFake || []).includes("performance")) handleMissingTimer("performance");
                }
                if (_global === globalObject && timersModule) clock.timersModuleMethods = [];
                if (_global === globalObject && timersPromisesModule) clock.timersPromisesModuleMethods = [];
                for(i = 0, l = clock.methods.length; i < l; i++){
                    const nameOfMethodToReplace = clock.methods[i];
                    if (!isPresent[nameOfMethodToReplace]) {
                        handleMissingTimer(nameOfMethodToReplace);
                        continue;
                    }
                    if ("hrtime" === nameOfMethodToReplace) {
                        if (_global.process && "function" == typeof _global.process.hrtime) hijackMethod(_global.process, nameOfMethodToReplace, clock);
                    } else if ("nextTick" === nameOfMethodToReplace) {
                        if (_global.process && "function" == typeof _global.process.nextTick) hijackMethod(_global.process, nameOfMethodToReplace, clock);
                    } else hijackMethod(_global, nameOfMethodToReplace, clock);
                    if (void 0 !== clock.timersModuleMethods && timersModule[nameOfMethodToReplace]) {
                        const original = timersModule[nameOfMethodToReplace];
                        clock.timersModuleMethods.push({
                            methodName: nameOfMethodToReplace,
                            original: original
                        });
                        timersModule[nameOfMethodToReplace] = _global[nameOfMethodToReplace];
                    }
                    if (void 0 !== clock.timersPromisesModuleMethods) {
                        if ("setTimeout" === nameOfMethodToReplace) {
                            clock.timersPromisesModuleMethods.push({
                                methodName: "setTimeout",
                                original: timersPromisesModule.setTimeout
                            });
                            timersPromisesModule.setTimeout = (delay, value, options = {})=>new Promise((resolve, reject)=>{
                                    const abort = ()=>{
                                        options.signal.removeEventListener("abort", abort);
                                        clock.abortListenerMap.delete(abort);
                                        clock.clearTimeout(handle);
                                        reject(options.signal.reason);
                                    };
                                    const handle = clock.setTimeout(()=>{
                                        if (options.signal) {
                                            options.signal.removeEventListener("abort", abort);
                                            clock.abortListenerMap.delete(abort);
                                        }
                                        resolve(value);
                                    }, delay);
                                    if (options.signal) if (options.signal.aborted) abort();
                                    else {
                                        options.signal.addEventListener("abort", abort);
                                        clock.abortListenerMap.set(abort, options.signal);
                                    }
                                });
                        } else if ("setImmediate" === nameOfMethodToReplace) {
                            clock.timersPromisesModuleMethods.push({
                                methodName: "setImmediate",
                                original: timersPromisesModule.setImmediate
                            });
                            timersPromisesModule.setImmediate = (value, options = {})=>new Promise((resolve, reject)=>{
                                    const abort = ()=>{
                                        options.signal.removeEventListener("abort", abort);
                                        clock.abortListenerMap.delete(abort);
                                        clock.clearImmediate(handle);
                                        reject(options.signal.reason);
                                    };
                                    const handle = clock.setImmediate(()=>{
                                        if (options.signal) {
                                            options.signal.removeEventListener("abort", abort);
                                            clock.abortListenerMap.delete(abort);
                                        }
                                        resolve(value);
                                    });
                                    if (options.signal) if (options.signal.aborted) abort();
                                    else {
                                        options.signal.addEventListener("abort", abort);
                                        clock.abortListenerMap.set(abort, options.signal);
                                    }
                                });
                        } else if ("setInterval" === nameOfMethodToReplace) {
                            clock.timersPromisesModuleMethods.push({
                                methodName: "setInterval",
                                original: timersPromisesModule.setInterval
                            });
                            timersPromisesModule.setInterval = (delay, value, options = {})=>({
                                    [Symbol.asyncIterator]: ()=>{
                                        const createResolvable = ()=>{
                                            let resolve, reject;
                                            const promise = new Promise((res, rej)=>{
                                                resolve = res;
                                                reject = rej;
                                            });
                                            promise.resolve = resolve;
                                            promise.reject = reject;
                                            return promise;
                                        };
                                        let done = false;
                                        let hasThrown = false;
                                        let returnCall;
                                        let nextAvailable = 0;
                                        const nextQueue = [];
                                        const handle = clock.setInterval(()=>{
                                            if (nextQueue.length > 0) nextQueue.shift().resolve();
                                            else nextAvailable++;
                                        }, delay);
                                        const abort = ()=>{
                                            options.signal.removeEventListener("abort", abort);
                                            clock.abortListenerMap.delete(abort);
                                            clock.clearInterval(handle);
                                            done = true;
                                            for (const resolvable of nextQueue)resolvable.resolve();
                                        };
                                        if (options.signal) if (options.signal.aborted) done = true;
                                        else {
                                            options.signal.addEventListener("abort", abort);
                                            clock.abortListenerMap.set(abort, options.signal);
                                        }
                                        return {
                                            next: async ()=>{
                                                if (options.signal?.aborted && !hasThrown) {
                                                    hasThrown = true;
                                                    throw options.signal.reason;
                                                }
                                                if (done) return {
                                                    done: true,
                                                    value: void 0
                                                };
                                                if (nextAvailable > 0) {
                                                    nextAvailable--;
                                                    return {
                                                        done: false,
                                                        value: value
                                                    };
                                                }
                                                const resolvable = createResolvable();
                                                nextQueue.push(resolvable);
                                                await resolvable;
                                                if (returnCall && 0 === nextQueue.length) returnCall.resolve();
                                                if (options.signal?.aborted && !hasThrown) {
                                                    hasThrown = true;
                                                    throw options.signal.reason;
                                                }
                                                if (done) return {
                                                    done: true,
                                                    value: void 0
                                                };
                                                return {
                                                    done: false,
                                                    value: value
                                                };
                                            },
                                            return: async ()=>{
                                                if (done) return {
                                                    done: true,
                                                    value: void 0
                                                };
                                                if (nextQueue.length > 0) {
                                                    returnCall = createResolvable();
                                                    await returnCall;
                                                }
                                                clock.clearInterval(handle);
                                                done = true;
                                                if (options.signal) {
                                                    options.signal.removeEventListener("abort", abort);
                                                    clock.abortListenerMap.delete(abort);
                                                }
                                                return {
                                                    done: true,
                                                    value: void 0
                                                };
                                            }
                                        };
                                    }
                                });
                        }
                    }
                }
                return clock;
            }
            return {
                timers: timers,
                createClock: createClock,
                install: install,
                withGlobal: withGlobal
            };
        }
        const defaultImplementation = withGlobal(globalObject);
        defaultImplementation.timers;
        defaultImplementation.createClock;
        defaultImplementation.install;
        exports.withGlobal = withGlobal;
    },
    "../../node_modules/.pnpm/type-detect@4.0.8/node_modules/type-detect/type-detect.js" (module, __unused_rspack_exports, __webpack_require__) {
        (function(global, factory) {
            module.exports = factory();
        })(0, function() {
            'use strict';
            var promiseExists = 'function' == typeof Promise;
            var globalObject = 'object' == typeof self ? self : __webpack_require__.g;
            var symbolExists = "u" > typeof Symbol;
            var mapExists = "u" > typeof Map;
            var setExists = "u" > typeof Set;
            var weakMapExists = "u" > typeof WeakMap;
            var weakSetExists = "u" > typeof WeakSet;
            var dataViewExists = "u" > typeof DataView;
            var symbolIteratorExists = symbolExists && void 0 !== Symbol.iterator;
            var symbolToStringTagExists = symbolExists && void 0 !== Symbol.toStringTag;
            var setEntriesExists = setExists && 'function' == typeof Set.prototype.entries;
            var mapEntriesExists = mapExists && 'function' == typeof Map.prototype.entries;
            var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
            var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
            var arrayIteratorExists = symbolIteratorExists && 'function' == typeof Array.prototype[Symbol.iterator];
            var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
            var stringIteratorExists = symbolIteratorExists && 'function' == typeof String.prototype[Symbol.iterator];
            var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
            var toStringLeftSliceLength = 8;
            var toStringRightSliceLength = -1;
            function typeDetect(obj) {
                var typeofObj = typeof obj;
                if ('object' !== typeofObj) return typeofObj;
                if (null === obj) return 'null';
                if (obj === globalObject) return 'global';
                if (Array.isArray(obj) && (false === symbolToStringTagExists || !(Symbol.toStringTag in obj))) return 'Array';
                if ('object' == typeof window && null !== window) {
                    if ('object' == typeof window.location && obj === window.location) return 'Location';
                    if ('object' == typeof window.document && obj === window.document) return 'Document';
                    if ('object' == typeof window.navigator) {
                        if ('object' == typeof window.navigator.mimeTypes && obj === window.navigator.mimeTypes) return 'MimeTypeArray';
                        if ('object' == typeof window.navigator.plugins && obj === window.navigator.plugins) return 'PluginArray';
                    }
                    if (('function' == typeof window.HTMLElement || 'object' == typeof window.HTMLElement) && obj instanceof window.HTMLElement) {
                        if ('BLOCKQUOTE' === obj.tagName) return 'HTMLQuoteElement';
                        if ('TD' === obj.tagName) return 'HTMLTableDataCellElement';
                        if ('TH' === obj.tagName) return 'HTMLTableHeaderCellElement';
                    }
                }
                var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
                if ('string' == typeof stringTag) return stringTag;
                var objPrototype = Object.getPrototypeOf(obj);
                if (objPrototype === RegExp.prototype) return 'RegExp';
                if (objPrototype === Date.prototype) return 'Date';
                if (promiseExists && objPrototype === Promise.prototype) return 'Promise';
                if (setExists && objPrototype === Set.prototype) return 'Set';
                if (mapExists && objPrototype === Map.prototype) return 'Map';
                if (weakSetExists && objPrototype === WeakSet.prototype) return 'WeakSet';
                if (weakMapExists && objPrototype === WeakMap.prototype) return 'WeakMap';
                if (dataViewExists && objPrototype === DataView.prototype) return 'DataView';
                if (mapExists && objPrototype === mapIteratorPrototype) return 'Map Iterator';
                if (setExists && objPrototype === setIteratorPrototype) return 'Set Iterator';
                if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) return 'Array Iterator';
                if (stringIteratorExists && objPrototype === stringIteratorPrototype) return 'String Iterator';
                if (null === objPrototype) return 'Object';
                return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
            }
            return typeDetect;
        });
    },
    "?ab50" () {},
    "?190b" () {}
});
var process = __webpack_require__("../../node_modules/.pnpm/process@0.11.10/node_modules/process/browser.js");
const RealDate = Date;
const cloneFakeTimerRecord = (record)=>({
        ...record,
        args: record.args ? [
            ...record.args
        ] : void 0
    });
const loadFakeTimersModule = ()=>{
    const loaded = __webpack_require__("../../node_modules/.pnpm/@sinonjs+fake-timers@15.4.0/node_modules/@sinonjs/fake-timers/src/fake-timers-src.js");
    return {
        withGlobal: loaded.withGlobal
    };
};
class FakeTimers {
    _clock;
    _config;
    _fakingTime;
    _fakeTimers;
    constructor({ global, config = {} }){
        this._config = config;
        this._fakingTime = false;
        this._fakeTimers = loadFakeTimersModule().withGlobal(global);
    }
    clearAllTimers() {
        if (this._fakingTime) this._clock.reset();
    }
    dispose() {
        this.useRealTimers();
    }
    runAllTimers() {
        if (this._checkFakeTimers()) this._clock.runAll();
    }
    async runAllTimersAsync() {
        if (this._checkFakeTimers()) await this._clock.runAllAsync();
    }
    runOnlyPendingTimers() {
        if (this._checkFakeTimers()) this._clock.runToLast();
    }
    async runOnlyPendingTimersAsync() {
        if (this._checkFakeTimers()) await this._clock.runToLastAsync();
    }
    advanceTimersToNextTimer(steps = 1) {
        if (this._checkFakeTimers()) for(let i = steps; i > 0; i--){
            this._clock.next();
            this._clock.tick(0);
            if (0 === this._clock.countTimers()) break;
        }
    }
    async advanceTimersToNextTimerAsync(steps = 1) {
        if (this._checkFakeTimers()) for(let i = steps; i > 0; i--){
            await this._clock.nextAsync();
            await this._clock.tickAsync(0);
            if (0 === this._clock.countTimers()) break;
        }
    }
    advanceTimersByTime(msToRun) {
        if (this._checkFakeTimers()) this._clock.tick(msToRun);
    }
    async advanceTimersByTimeAsync(msToRun) {
        if (this._checkFakeTimers()) await this._clock.tickAsync(msToRun);
    }
    advanceTimersToNextFrame() {
        if (this._checkFakeTimers()) this._clock.runToFrame();
    }
    runAllTicks() {
        if (this._checkFakeTimers()) this._clock.runMicrotasks();
    }
    useRealTimers() {
        if (this._fakingTime) {
            this._clock.uninstall();
            this._fakingTime = false;
        }
    }
    useFakeTimers({ toNotFake = [], ...restFakeTimersConfig } = {}) {
        if (this._fakingTime) this._clock.uninstall();
        const ignoreTimers = [
            'Intl',
            'nextTick',
            'queueMicrotask'
        ].concat(toNotFake);
        const toFake = Object.keys(this._fakeTimers.timers).filter((timer)=>!ignoreTimers.includes(timer));
        const isChildProcess = void 0 !== process && !!process.send;
        if (this._config?.toFake?.includes('nextTick') && isChildProcess) throw new Error('process.nextTick cannot be mocked inside child_process');
        this._clock = this._fakeTimers.install({
            loopLimit: 10000,
            shouldClearNativeTimers: true,
            now: Date.now(),
            toFake: [
                ...toFake
            ],
            ignoreMissingTimers: true,
            ...restFakeTimersConfig
        });
        this._clock.reset();
        this._fakingTime = true;
    }
    reset() {
        if (this._checkFakeTimers()) {
            const { now } = this._clock;
            this._clock.reset();
            this._clock.setSystemTime(now);
        }
    }
    setSystemTime(now) {
        if (this._checkFakeTimers()) this._clock.setSystemTime(now);
    }
    snapshot() {
        if (!this._fakingTime) return;
        return {
            now: this._clock.now,
            timers: [
                ...this._clock.timers ?? new Map()
            ].map(([id, timer])=>[
                    id,
                    cloneFakeTimerRecord(timer)
                ]),
            jobs: (this._clock.jobs ?? []).map(cloneFakeTimerRecord)
        };
    }
    restore(snapshot) {
        if (this._checkFakeTimers()) {
            this._clock.setSystemTime(snapshot.now);
            const timerEntries = snapshot.timers.map(([id, timer])=>[
                    id,
                    cloneFakeTimerRecord(timer)
                ]);
            const timers = timerEntries.map(([, timer])=>timer);
            this._clock.timers = new Map(timerEntries);
            if (this._clock.timerHeap) {
                this._clock.timerHeap.timers = [];
                for (const timer of timers)this._clock.timerHeap.push(timer);
            }
            this._clock.jobs = snapshot.jobs.map(cloneFakeTimerRecord);
        }
    }
    getRealSystemTime() {
        return RealDate.now();
    }
    now() {
        if (this._fakingTime) return this._clock.now;
        return Date.now();
    }
    getTimerCount() {
        if (this._checkFakeTimers()) return this._clock.countTimers();
        return 0;
    }
    _checkFakeTimers() {
        if (!this._fakingTime) throw new Error('Timers are not mocked. Try calling "rstest.useFakeTimers()" first.');
        return this._fakingTime;
    }
    isFakeTimers() {
        return this._fakingTime;
    }
}
export { FakeTimers };
