import "node:module";
import { styleText as external_node_util_styleText } from "node:util";
import node_process, { stdin, stdout } from "node:process";
import { ReadStream } from "node:tty";
import "node:fs";
import "node:path";
import { __webpack_require__ } from "../0~rslib-runtime.js";
import * as __rspack_external_node_readline_91c31510 from "node:readline";
__webpack_require__.add({
    "../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js" (module) {
        const ESC = '\x1B';
        const CSI = `${ESC}[`;
        const beep = '\u0007';
        const cursor = {
            to (x, y) {
                if (!y) return `${CSI}${x + 1}G`;
                return `${CSI}${y + 1};${x + 1}H`;
            },
            move (x, y) {
                let ret = '';
                if (x < 0) ret += `${CSI}${-x}D`;
                else if (x > 0) ret += `${CSI}${x}C`;
                if (y < 0) ret += `${CSI}${-y}A`;
                else if (y > 0) ret += `${CSI}${y}B`;
                return ret;
            },
            up: (count = 1)=>`${CSI}${count}A`,
            down: (count = 1)=>`${CSI}${count}B`,
            forward: (count = 1)=>`${CSI}${count}C`,
            backward: (count = 1)=>`${CSI}${count}D`,
            nextLine: (count = 1)=>`${CSI}E`.repeat(count),
            prevLine: (count = 1)=>`${CSI}F`.repeat(count),
            left: `${CSI}G`,
            hide: `${CSI}?25l`,
            show: `${CSI}?25h`,
            save: `${ESC}7`,
            restore: `${ESC}8`
        };
        const scroll = {
            up: (count = 1)=>`${CSI}S`.repeat(count),
            down: (count = 1)=>`${CSI}T`.repeat(count)
        };
        const erase = {
            screen: `${CSI}2J`,
            up: (count = 1)=>`${CSI}1J`.repeat(count),
            down: (count = 1)=>`${CSI}J`.repeat(count),
            line: `${CSI}2K`,
            lineEnd: `${CSI}K`,
            lineStart: `${CSI}1K`,
            lines (count) {
                let clear = '';
                for(let i = 0; i < count; i++)clear += this.line + (i < count - 1 ? cursor.up() : '');
                if (count) clear += cursor.left;
                return clear;
            }
        };
        module.exports = {
            cursor,
            scroll,
            erase,
            beep
        };
    }
});
const getCodePointsLength = (()=>{
    const SURROGATE_PAIR_RE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    return (input)=>{
        let surrogatePairsNr = 0;
        SURROGATE_PAIR_RE.lastIndex = 0;
        while(SURROGATE_PAIR_RE.test(input))surrogatePairsNr += 1;
        return input.length - surrogatePairsNr;
    };
})();
const isFullWidth = (x)=>0x3000 === x || x >= 0xFF01 && x <= 0xFF60 || x >= 0xFFE0 && x <= 0xFFE6;
const isWideNotCJKTNotEmoji = (x)=>0x231B === x || 0x2329 === x || x >= 0x2FF0 && x <= 0x2FFF || x >= 0x3001 && x <= 0x303E || x >= 0x3099 && x <= 0x30FF || x >= 0x3105 && x <= 0x312F || x >= 0x3131 && x <= 0x318E || x >= 0x3190 && x <= 0x31E3 || x >= 0x31EF && x <= 0x321E || x >= 0x3220 && x <= 0x3247 || x >= 0x3250 && x <= 0x4DBF || x >= 0xFE10 && x <= 0xFE19 || x >= 0xFE30 && x <= 0xFE52 || x >= 0xFE54 && x <= 0xFE66 || x >= 0xFE68 && x <= 0xFE6B || x >= 0x1F200 && x <= 0x1F202 || x >= 0x1F210 && x <= 0x1F23B || x >= 0x1F240 && x <= 0x1F248 || x >= 0x20000 && x <= 0x2FFFD || x >= 0x30000 && x <= 0x3FFFD;
const ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y;
const CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
const CJKT_WIDE_RE = /(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu;
const TAB_RE = /\t{1,1000}/y;
const EMOJI_RE = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
const LATIN_RE = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
const MODIFIER_RE = /\p{M}+/gu;
const NO_TRUNCATION = {
    limit: 1 / 0,
    ellipsis: ''
};
const getStringTruncatedWidth = (input, truncationOptions = {}, widthOptions = {})=>{
    const LIMIT = truncationOptions.limit ?? 1 / 0;
    const ELLIPSIS = truncationOptions.ellipsis ?? '';
    const ELLIPSIS_WIDTH = truncationOptions?.ellipsisWidth ?? (ELLIPSIS ? getStringTruncatedWidth(ELLIPSIS, NO_TRUNCATION, widthOptions).width : 0);
    const ANSI_WIDTH = 0;
    const CONTROL_WIDTH = widthOptions.controlWidth ?? 0;
    const TAB_WIDTH = widthOptions.tabWidth ?? 8;
    const EMOJI_WIDTH = widthOptions.emojiWidth ?? 2;
    const FULL_WIDTH_WIDTH = 2;
    const REGULAR_WIDTH = widthOptions.regularWidth ?? 1;
    const WIDE_WIDTH = widthOptions.wideWidth ?? FULL_WIDTH_WIDTH;
    const PARSE_BLOCKS = [
        [
            LATIN_RE,
            REGULAR_WIDTH
        ],
        [
            ANSI_RE,
            ANSI_WIDTH
        ],
        [
            CONTROL_RE,
            CONTROL_WIDTH
        ],
        [
            TAB_RE,
            TAB_WIDTH
        ],
        [
            EMOJI_RE,
            EMOJI_WIDTH
        ],
        [
            CJKT_WIDE_RE,
            WIDE_WIDTH
        ]
    ];
    let indexPrev = 0;
    let index = 0;
    let length = input.length;
    let lengthExtra = 0;
    let truncationEnabled = false;
    let truncationIndex = length;
    let truncationLimit = Math.max(0, LIMIT - ELLIPSIS_WIDTH);
    let unmatchedStart = 0;
    let unmatchedEnd = 0;
    let width = 0;
    let widthExtra = 0;
    outer: while(true){
        if (unmatchedEnd > unmatchedStart || index >= length && index > indexPrev) {
            const unmatched = input.slice(unmatchedStart, unmatchedEnd) || input.slice(indexPrev, index);
            lengthExtra = 0;
            for (const char of unmatched.replaceAll(MODIFIER_RE, '')){
                const codePoint = char.codePointAt(0) || 0;
                widthExtra = isFullWidth(codePoint) ? FULL_WIDTH_WIDTH : isWideNotCJKTNotEmoji(codePoint) ? WIDE_WIDTH : REGULAR_WIDTH;
                if (width + widthExtra > truncationLimit) truncationIndex = Math.min(truncationIndex, Math.max(unmatchedStart, indexPrev) + lengthExtra);
                if (width + widthExtra > LIMIT) {
                    truncationEnabled = true;
                    break outer;
                }
                lengthExtra += char.length;
                width += widthExtra;
            }
            unmatchedStart = unmatchedEnd = 0;
        }
        if (index >= length) break;
        for(let i = 0, l = PARSE_BLOCKS.length; i < l; i++){
            const [BLOCK_RE, BLOCK_WIDTH] = PARSE_BLOCKS[i];
            BLOCK_RE.lastIndex = index;
            if (BLOCK_RE.test(input)) {
                lengthExtra = BLOCK_RE === CJKT_WIDE_RE ? getCodePointsLength(input.slice(index, BLOCK_RE.lastIndex)) : BLOCK_RE === EMOJI_RE ? 1 : BLOCK_RE.lastIndex - index;
                widthExtra = lengthExtra * BLOCK_WIDTH;
                if (width + widthExtra > truncationLimit) truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / BLOCK_WIDTH));
                if (width + widthExtra > LIMIT) {
                    truncationEnabled = true;
                    break outer;
                }
                width += widthExtra;
                unmatchedStart = indexPrev;
                unmatchedEnd = index;
                index = indexPrev = BLOCK_RE.lastIndex;
                continue outer;
            }
        }
        index += 1;
    }
    return {
        width: truncationEnabled ? truncationLimit : width,
        index: truncationEnabled ? truncationIndex : length,
        truncated: truncationEnabled,
        ellipsed: truncationEnabled && LIMIT >= ELLIPSIS_WIDTH
    };
};
const dist = getStringTruncatedWidth;
const dist_NO_TRUNCATION = {
    limit: 1 / 0,
    ellipsis: '',
    ellipsisWidth: 0
};
const fastStringWidth = (input, options = {})=>dist(input, dist_NO_TRUNCATION, options).width;
const fast_string_width_dist = fastStringWidth;
const ESC = '\x1B';
const CSI = '\x9B';
const END_CODE = 39;
const ANSI_ESCAPE_BELL = '\u0007';
const ANSI_CSI = '[';
const ANSI_OSC = ']';
const ANSI_SGR_TERMINATOR = 'm';
const ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
const GROUP_REGEX = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`, 'y');
const getClosingCode = (openingCode)=>{
    if (openingCode >= 30 && openingCode <= 37) return 39;
    if (openingCode >= 90 && openingCode <= 97) return 39;
    if (openingCode >= 40 && openingCode <= 47) return 49;
    if (openingCode >= 100 && openingCode <= 107) return 49;
    if (1 === openingCode || 2 === openingCode) return 22;
    if (3 === openingCode) return 23;
    if (4 === openingCode) return 24;
    if (7 === openingCode) return 27;
    if (8 === openingCode) return 28;
    if (9 === openingCode) return 29;
    if (0 === openingCode) return 0;
};
const wrapAnsiCode = (code)=>`${ESC}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
const wrapAnsiHyperlink = (url)=>`${ESC}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
const wrapWord = (rows, word, columns)=>{
    const characters = word[Symbol.iterator]();
    let isInsideEscape = false;
    let isInsideLinkEscape = false;
    let lastRow = rows.at(-1);
    let visible = void 0 === lastRow ? 0 : fast_string_width_dist(lastRow);
    let currentCharacter = characters.next();
    let nextCharacter = characters.next();
    let rawCharacterIndex = 0;
    while(!currentCharacter.done){
        const character = currentCharacter.value;
        const characterLength = fast_string_width_dist(character);
        if (visible + characterLength <= columns) rows[rows.length - 1] += character;
        else {
            rows.push(character);
            visible = 0;
        }
        if (character === ESC || character === CSI) {
            isInsideEscape = true;
            isInsideLinkEscape = word.startsWith(ANSI_ESCAPE_LINK, rawCharacterIndex + 1);
        }
        if (isInsideEscape) {
            if (isInsideLinkEscape) {
                if (character === ANSI_ESCAPE_BELL) {
                    isInsideEscape = false;
                    isInsideLinkEscape = false;
                }
            } else if (character === ANSI_SGR_TERMINATOR) isInsideEscape = false;
        } else {
            visible += characterLength;
            if (visible === columns && !nextCharacter.done) {
                rows.push('');
                visible = 0;
            }
        }
        currentCharacter = nextCharacter;
        nextCharacter = characters.next();
        rawCharacterIndex += character.length;
    }
    lastRow = rows.at(-1);
    if (!visible && void 0 !== lastRow && lastRow.length && rows.length > 1) rows[rows.length - 2] += rows.pop();
};
const stringVisibleTrimSpacesRight = (string)=>{
    const words = string.split(' ');
    let last = words.length;
    while(last){
        if (fast_string_width_dist(words[last - 1])) break;
        last--;
    }
    if (last === words.length) return string;
    return words.slice(0, last).join(' ') + words.slice(last).join('');
};
const exec = (string, columns, options = {})=>{
    if (false !== options.trim && '' === string.trim()) return '';
    let returnValue = '';
    let escapeCode;
    let escapeUrl;
    const words = string.split(' ');
    let rows = [
        ''
    ];
    let rowLength = 0;
    for(let index = 0; index < words.length; index++){
        const word = words[index];
        if (false !== options.trim) {
            const row = rows.at(-1) ?? '';
            const trimmed = row.trimStart();
            if (row.length !== trimmed.length) {
                rows[rows.length - 1] = trimmed;
                rowLength = fast_string_width_dist(trimmed);
            }
        }
        if (0 !== index) {
            if (rowLength >= columns && (false === options.wordWrap || false === options.trim)) {
                rows.push('');
                rowLength = 0;
            }
            if (rowLength || false === options.trim) {
                rows[rows.length - 1] += ' ';
                rowLength++;
            }
        }
        const wordLength = fast_string_width_dist(word);
        if (options.hard && wordLength > columns) {
            const remainingColumns = columns - rowLength;
            const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / columns);
            const breaksStartingNextLine = Math.floor((wordLength - 1) / columns);
            if (breaksStartingNextLine < breaksStartingThisLine) rows.push('');
            wrapWord(rows, word, columns);
            rowLength = fast_string_width_dist(rows.at(-1) ?? '');
            continue;
        }
        if (rowLength + wordLength > columns && rowLength && wordLength) {
            if (false === options.wordWrap && rowLength < columns) {
                wrapWord(rows, word, columns);
                rowLength = fast_string_width_dist(rows.at(-1) ?? '');
                continue;
            }
            rows.push('');
            rowLength = 0;
        }
        if (rowLength + wordLength > columns && false === options.wordWrap) {
            wrapWord(rows, word, columns);
            rowLength = fast_string_width_dist(rows.at(-1) ?? '');
            continue;
        }
        rows[rows.length - 1] += word;
        rowLength += wordLength;
    }
    if (false !== options.trim) rows = rows.map((row)=>stringVisibleTrimSpacesRight(row));
    const preString = rows.join('\n');
    let inSurrogate = false;
    for(let i = 0; i < preString.length; i++){
        const character = preString[i];
        returnValue += character;
        if (inSurrogate) inSurrogate = false;
        else {
            inSurrogate = character >= '\ud800' && character <= '\udbff';
            if (inSurrogate) continue;
        }
        if (character === ESC || character === CSI) {
            GROUP_REGEX.lastIndex = i + 1;
            const groupsResult = GROUP_REGEX.exec(preString);
            const groups = groupsResult?.groups;
            if (groups?.code !== void 0) {
                const code = Number.parseFloat(groups.code);
                escapeCode = code === END_CODE ? void 0 : code;
            } else if (groups?.uri !== void 0) escapeUrl = 0 === groups.uri.length ? void 0 : groups.uri;
        }
        if ('\n' === preString[i + 1]) {
            if (escapeUrl) returnValue += wrapAnsiHyperlink('');
            const closingCode = escapeCode ? getClosingCode(escapeCode) : void 0;
            if (escapeCode && closingCode) returnValue += wrapAnsiCode(closingCode);
        } else if ('\n' === character) {
            if (escapeCode && getClosingCode(escapeCode)) returnValue += wrapAnsiCode(escapeCode);
            if (escapeUrl) returnValue += wrapAnsiHyperlink(escapeUrl);
        }
    }
    return returnValue;
};
const CRLF_OR_LF = /\r?\n/;
function main_wrapAnsi(string, columns, options) {
    return String(string).normalize().split(CRLF_OR_LF).map((line)=>exec(line, columns, options)).join('\n');
}
const src = __webpack_require__("../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js");
function findCursor(s, o, l) {
    if (!l.some((r)=>!r.disabled)) return s;
    const t = s + o, n = Math.max(l.length - 1, 0), e = t < 0 ? n : t > n ? 0 : t;
    return l[e].disabled ? findCursor(e, o < 0 ? -1 : 1, l) : e;
}
const a$2 = [
    "up",
    "down",
    "left",
    "right",
    "space",
    "enter",
    "cancel"
], dist_t = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const dist_settings = {
    actions: new Set(a$2),
    aliases: /* @__PURE__ */ new Map([
        [
            "k",
            "up"
        ],
        [
            "j",
            "down"
        ],
        [
            "h",
            "left"
        ],
        [
            "l",
            "right"
        ],
        [
            "",
            "cancel"
        ],
        [
            "escape",
            "cancel"
        ]
    ]),
    messages: {
        cancel: "Canceled",
        error: "Something went wrong"
    },
    withGuide: true,
    date: {
        monthNames: [
            ...dist_t
        ],
        messages: {
            required: "Please enter a valid date",
            invalidMonth: "There are only 12 months in a year",
            invalidDay: (n, e)=>`There are only ${n} days in ${e}`,
            afterMin: (n)=>`Date must be on or after ${n.toISOString().slice(0, 10)}`,
            beforeMax: (n)=>`Date must be on or before ${n.toISOString().slice(0, 10)}`
        }
    }
};
function isActionKey(n, e) {
    if ("string" == typeof n) return dist_settings.aliases.get(n) === e;
    for (const s of n)if (void 0 !== s && isActionKey(s, e)) return true;
    return false;
}
function diffLines(i, s) {
    if (i === s) return;
    const e = i.split(`
`), t = s.split(`
`), r = Math.max(e.length, t.length), f = [];
    for(let n = 0; n < r; n++)e[n] !== t[n] && f.push(n);
    return {
        lines: f,
        numLinesBefore: e.length,
        numLinesAfter: t.length,
        numLines: r
    };
}
const dist_R = globalThis.process.platform.startsWith("win");
const CANCEL_SYMBOL = Symbol("clack:cancel");
function dist_isCancel(e) {
    return e === CANCEL_SYMBOL;
}
function setRawMode(e, r) {
    const o = e;
    o.isTTY && o.setRawMode(r);
}
function block({ input: e = stdin, output: r = stdout, overwrite: o = true, hideCursor: t = true } = {}) {
    const s = __rspack_external_node_readline_91c31510.createInterface({
        input: e,
        output: r,
        prompt: "",
        tabSize: 1
    });
    __rspack_external_node_readline_91c31510.emitKeypressEvents(e, s), e instanceof ReadStream && e.isTTY && e.setRawMode(true);
    const n = (f, { name: a, sequence: p })=>{
        const c = String(f);
        if (isActionKey([
            c,
            a,
            p
        ], "cancel")) {
            t && r.write(src.cursor.show), process.exit(0);
            return;
        }
        if (!o) return;
        const i = "return" === a ? 0 : -1, m = "return" === a ? -1 : 0;
        __rspack_external_node_readline_91c31510.moveCursor(r, i, m, ()=>{
            __rspack_external_node_readline_91c31510.clearLine(r, 1, ()=>{
                e.once("keypress", n);
            });
        });
    };
    return t && r.write(src.cursor.hide), e.once("keypress", n), ()=>{
        e.off("keypress", n), t && r.write(src.cursor.show), e instanceof ReadStream && e.isTTY && !dist_R && e.setRawMode(false), s.terminal = false, s.close();
    };
}
const dist_getColumns = (e)=>"columns" in e && "number" == typeof e.columns ? e.columns : 80, getRows = (e)=>"rows" in e && "number" == typeof e.rows ? e.rows : 20;
function dist_wrapTextWithPrefix(e, r, o, t = o, s = o, n) {
    const f = dist_getColumns(e ?? stdout);
    return main_wrapAnsi(r, f - o.length, {
        hard: true,
        trim: false
    }).split(`
`).map((c, i, m)=>{
        const d = n ? n(c, i) : c;
        return 0 === i ? `${t}${d}` : i === m.length - 1 ? `${s}${d}` : `${o}${d}`;
    }).join(`
`);
}
function dist_runValidation(e, n) {
    if ("~standard" in e) {
        const a = e["~standard"].validate(n);
        if (a instanceof Promise) throw new TypeError("Schema validation must be synchronous. Update `validate()` and remove any asynchronous logic.");
        return a.issues?.at(0)?.message;
    }
    return e(n);
}
class dist_V {
    input;
    output;
    _abortSignal;
    rl;
    opts;
    _render;
    _track = false;
    _prevFrame = "";
    _subscribers = /* @__PURE__ */ new Map();
    _cursor = 0;
    state = "initial";
    error = "";
    value;
    userInput = "";
    constructor(t, e = true){
        const { input: i = stdin, output: n = stdout, render: s, signal: r, ...o } = t;
        this.opts = o, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = s.bind(this), this._track = e, this._abortSignal = r, this.input = i, this.output = n;
    }
    unsubscribe() {
        this._subscribers.clear();
    }
    setSubscriber(t, e) {
        const i = this._subscribers.get(t) ?? [];
        i.push(e), this._subscribers.set(t, i);
    }
    on(t, e) {
        this.setSubscriber(t, {
            cb: e
        });
    }
    once(t, e) {
        this.setSubscriber(t, {
            cb: e,
            once: true
        });
    }
    emit(t, ...e) {
        const i = this._subscribers.get(t) ?? [], n = [];
        for (const s of i)s.cb(...e), s.once && n.push(()=>i.splice(i.indexOf(s), 1));
        for (const s of n)s();
    }
    prompt() {
        return new Promise((t)=>{
            if (this._abortSignal) {
                if (this._abortSignal.aborted) return this.state = "cancel", this.close(), t(CANCEL_SYMBOL);
                this._abortSignal.addEventListener("abort", ()=>{
                    this.state = "cancel", this.close();
                }, {
                    once: true
                });
            }
            this.rl = __rspack_external_node_readline_91c31510["default"].createInterface({
                input: this.input,
                tabSize: 2,
                prompt: "",
                escapeCodeTimeout: 50,
                terminal: true
            }), this.rl.prompt(), void 0 !== this.opts.initialUserInput && this._setUserInput(this.opts.initialUserInput, true), this.input.on("keypress", this.onKeypress), setRawMode(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", ()=>{
                this.output.write(src.cursor.show), this.output.off("resize", this.render), setRawMode(this.input, false), t(this.value);
            }), this.once("cancel", ()=>{
                this.output.write(src.cursor.show), this.output.off("resize", this.render), setRawMode(this.input, false), t(CANCEL_SYMBOL);
            });
        });
    }
    _isActionKey(t, e) {
        return "	" === t;
    }
    _shouldSubmit(t, e) {
        return true;
    }
    _setValue(t) {
        this.value = t, this.emit("value", this.value);
    }
    _setUserInput(t, e) {
        this.userInput = t ?? "", this.emit("userInput", this.userInput), e && this._track && this.rl && (this.rl.write(this.userInput), this._cursor = this.rl.cursor);
    }
    _clearUserInput() {
        this.rl?.write(null, {
            ctrl: true,
            name: "u"
        }), this._setUserInput("");
    }
    onKeypress(t, e) {
        if (this._track && "return" !== e.name && (e.name && this._isActionKey(t, e) && this.rl?.write(null, {
            ctrl: true,
            name: "h"
        }), this._cursor = this.rl?.cursor ?? 0, this._setUserInput(this.rl?.line)), "error" === this.state && (this.state = "active"), e?.name && (!this._track && dist_settings.aliases.has(e.name) && this.emit("cursor", dist_settings.aliases.get(e.name)), dist_settings.actions.has(e.name) && this.emit("cursor", e.name)), t && ("y" === t.toLowerCase() || "n" === t.toLowerCase()) && this.emit("confirm", "y" === t.toLowerCase()), this.emit("key", t, e), e?.name === "return" && this._shouldSubmit(t, e)) {
            if (this.opts.validate) {
                const i = dist_runValidation(this.opts.validate, this.value);
                i && (this.error = i instanceof Error ? i.message : i, this.state = "error", this.rl?.write(this.userInput));
            }
            "error" !== this.state && (this.state = "submit");
        }
        isActionKey([
            t,
            e?.name,
            e?.sequence
        ], "cancel") && (this.state = "cancel"), ("submit" === this.state || "cancel" === this.state) && this.emit("finalize"), this.render(), ("submit" === this.state || "cancel" === this.state) && this.close();
    }
    close() {
        this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), setRawMode(this.input, false), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
    }
    restoreCursor() {
        const t = main_wrapAnsi(this._prevFrame, process.stdout.columns, {
            hard: true,
            trim: false
        }).split(`
`).length - 1;
        this.output.write(src.cursor.move(-999, -1 * t));
    }
    render() {
        const t = main_wrapAnsi(this._render(this) ?? "", process.stdout.columns, {
            hard: true,
            trim: false
        });
        if (t !== this._prevFrame) {
            if ("initial" === this.state) this.output.write(src.cursor.hide);
            else {
                const e = diffLines(this._prevFrame, t), i = getRows(this.output);
                if (this.restoreCursor(), e) {
                    const n = Math.max(0, e.numLinesAfter - i), s = Math.max(0, e.numLinesBefore - i);
                    let r = e.lines.find((o)=>o >= n);
                    if (void 0 === r) {
                        this._prevFrame = t;
                        return;
                    }
                    if (1 === e.lines.length) {
                        this.output.write(src.cursor.move(0, r - s)), this.output.write(src.erase.lines(1));
                        const o = t.split(`
`);
                        this.output.write(o[r]), this._prevFrame = t, this.output.write(src.cursor.move(0, o.length - r - 1));
                        return;
                    }
                    if (e.lines.length > 1) {
                        if (n < s) r = n;
                        else {
                            const h = r - s;
                            h > 0 && this.output.write(src.cursor.move(0, h));
                        }
                        this.output.write(src.erase.down());
                        const f = t.split(`
`).slice(r);
                        this.output.write(f.join(`
`)), this._prevFrame = t;
                        return;
                    }
                }
                this.output.write(src.erase.down());
            }
            this.output.write(t), "initial" === this.state && (this.state = "active"), this._prevFrame = t;
        }
    }
}
class dist_r extends dist_V {
    get cursor() {
        return this.value ? 0 : 1;
    }
    get _value() {
        return 0 === this.cursor;
    }
    constructor(t){
        super(t, false), this.value = !!t.initialValue, this.on("userInput", ()=>{
            this.value = this._value;
        }), this.on("confirm", (i)=>{
            this.output.write(src.cursor.move(0, -1)), this.value = i, this.state = "submit", this.close();
        }), this.on("cursor", ()=>{
            this.value = !this.value;
        });
    }
}
class dist_a extends dist_V {
    options;
    cursor = 0;
    get _selectedValue() {
        return this.options[this.cursor];
    }
    changeValue() {
        this.value = this._selectedValue.value;
    }
    constructor(t){
        super(t, false), this.options = t.options;
        const i = this.options.findIndex(({ value: s })=>s === t.initialValue), e = -1 === i ? 0 : i;
        this.cursor = this.options[e].disabled ? findCursor(e, 1, this.options) : e, this.changeValue(), this.on("cursor", (s)=>{
            switch(s){
                case "left":
                case "up":
                    this.cursor = findCursor(this.cursor, -1, this.options);
                    break;
                case "down":
                case "right":
                    this.cursor = findCursor(this.cursor, 1, this.options);
                    break;
            }
            this.changeValue();
        });
    }
}
function isUnicodeSupported() {
    if ('win32' !== node_process.platform) return 'linux' !== node_process.env.TERM;
    return Boolean(node_process.env.CI) || Boolean(node_process.env.WT_SESSION) || Boolean(node_process.env.TERMINUS_SUBLIME) || '{cmd::Cmder}' === node_process.env.ConEmuTask || 'Terminus-Sublime' === node_process.env.TERM_PROGRAM || 'vscode' === node_process.env.TERM_PROGRAM || 'xterm-256color' === node_process.env.TERM || 'alacritty' === node_process.env.TERM || 'JetBrains-JediTerm' === node_process.env.TERMINAL_EMULATOR;
}
const unicode = isUnicodeSupported(), isCI = ()=>"true" === process.env.CI, unicodeOr = (e, o)=>unicode ? e : o, S_STEP_ACTIVE = unicodeOr("\u25C6", "*"), S_STEP_CANCEL = unicodeOr("\u25A0", "x"), S_STEP_ERROR = unicodeOr("\u25B2", "x"), S_STEP_SUBMIT = unicodeOr("\u25C7", "o"), S_BAR_START = unicodeOr("\u250C", "T"), S_BAR = unicodeOr("\u2502", "|"), S_BAR_END = unicodeOr("\u2514", "\u2014"), S_RADIO_ACTIVE = unicodeOr("\u25CF", ">"), S_RADIO_INACTIVE = unicodeOr("\u25CB", " "), S_BAR_H = unicodeOr("\u2500", "-"), S_CORNER_TOP_RIGHT = unicodeOr("\u256E", "+"), S_CONNECT_LEFT = unicodeOr("\u251C", "+"), S_CORNER_BOTTOM_RIGHT = unicodeOr("\u256F", "+"), S_CORNER_BOTTOM_LEFT = unicodeOr("\u2570", "+"), S_INFO = unicodeOr("\u25CF", "\u2022"), S_SUCCESS = unicodeOr("\u25C6", "*"), S_WARN = unicodeOr("\u25B2", "!"), S_ERROR = unicodeOr("\u25A0", "x"), symbol = (e)=>{
    switch(e){
        case "initial":
        case "active":
            return external_node_util_styleText("cyan", S_STEP_ACTIVE);
        case "cancel":
            return external_node_util_styleText("red", S_STEP_CANCEL);
        case "error":
            return external_node_util_styleText("yellow", S_STEP_ERROR);
        case "submit":
            return external_node_util_styleText("green", S_STEP_SUBMIT);
    }
}, symbolBar = (e)=>{
    switch(e){
        case "initial":
        case "active":
            return external_node_util_styleText("cyan", S_BAR);
        case "cancel":
            return external_node_util_styleText("red", S_BAR);
        case "error":
            return external_node_util_styleText("yellow", S_BAR);
        case "submit":
            return external_node_util_styleText("green", S_BAR);
    }
};
const E$1 = (l, o, g, c, h, O = false)=>{
    let r = o, w = 0;
    if (O) for(let i = c - 1; i >= g && (r -= l[i].length, w++, !(r <= h)); i--);
    else for(let i = g; i < c && (r -= l[i].length, w++, !(r <= h)); i++);
    return {
        lineCount: r,
        removals: w
    };
};
const limitOptions = ({ cursor: l, options: o, style: g, output: c = process.stdout, maxItems: h = 1 / 0, columnPadding: O = 0, rowPadding: r = 4 })=>{
    const i = dist_getColumns(c) - O, I = getRows(c), C = external_node_util_styleText("dim", "..."), x = Math.max(I - r, 0), m = Math.max(Math.min(h, x), 5);
    let p = 0;
    l >= m - 3 && (p = Math.max(Math.min(l - m + 3, o.length - m), 0));
    let f = m < o.length && p > 0, u = m < o.length && p + m < o.length;
    const W = Math.min(p + m, o.length), e = [];
    let d = 0;
    f && d++, u && d++;
    const v = p + (f ? 1 : 0), P = W - (u ? 1 : 0);
    for(let t = v; t < P; t++){
        const n = main_wrapAnsi(g(o[t], t === l), i, {
            hard: true,
            trim: false
        }).split(`
`);
        e.push(n), d += n.length;
    }
    if (d > x) {
        let t = 0, n = 0, s = d;
        const M = l - v;
        let a = x;
        const T = ()=>E$1(e, s, 0, M, a), L = ()=>E$1(e, s, M + 1, e.length, a, true);
        f ? ({ lineCount: s, removals: t } = T(), s > a && (u || (a -= 1), { lineCount: s, removals: n } = L())) : (u || (a -= 1), { lineCount: s, removals: n } = L(), s > a && (a -= 1, { lineCount: s, removals: t } = T())), t > 0 && (f = true, e.splice(0, t)), n > 0 && (u = true, e.splice(e.length - n, n));
    }
    const b = [];
    f && b.push(C);
    for (const t of e)for (const n of t)b.push(n);
    return u && b.push(C), b;
};
const dist_confirm = (i)=>{
    const a = i.active ?? "Yes", s = i.inactive ?? "No";
    return new dist_r({
        active: a,
        inactive: s,
        signal: i.signal,
        input: i.input,
        output: i.output,
        initialValue: i.initialValue ?? true,
        render () {
            const e = i.withGuide ?? dist_settings.withGuide, u = `${symbol(this.state)}  `, l = e ? `${external_node_util_styleText("gray", S_BAR)}  ` : "", f = dist_wrapTextWithPrefix(i.output, i.message, l, u), o = `${e ? `${external_node_util_styleText("gray", S_BAR)}
` : ""}${f}
`, c = this.value ? a : s;
            switch(this.state){
                case "submit":
                    {
                        const r = e ? `${external_node_util_styleText("gray", S_BAR)}  ` : "";
                        return `${o}${r}${external_node_util_styleText("dim", c)}`;
                    }
                case "cancel":
                    {
                        const r = e ? `${external_node_util_styleText("gray", S_BAR)}  ` : "";
                        return `${o}${r}${external_node_util_styleText([
                            "strikethrough",
                            "dim"
                        ], c)}${e ? `
${external_node_util_styleText("gray", S_BAR)}` : ""}`;
                    }
                default:
                    {
                        const r = e ? `${external_node_util_styleText("cyan", S_BAR)}  ` : "", g = e ? external_node_util_styleText("cyan", S_BAR_END) : "";
                        return `${o}${r}${this.value ? `${external_node_util_styleText("green", S_RADIO_ACTIVE)} ${a}` : `${external_node_util_styleText("dim", S_RADIO_INACTIVE)} ${external_node_util_styleText("dim", a)}`}${i.vertical ? e ? `
${external_node_util_styleText("cyan", S_BAR)}  ` : `
` : ` ${external_node_util_styleText("dim", "/")} `}${this.value ? `${external_node_util_styleText("dim", S_RADIO_INACTIVE)} ${external_node_util_styleText("dim", s)}` : `${external_node_util_styleText("green", S_RADIO_ACTIVE)} ${s}`}
${g}
`;
                    }
            }
        }
    }).prompt();
};
const log = {
    message: (s = [], { symbol: e = external_node_util_styleText("gray", S_BAR), secondarySymbol: r = external_node_util_styleText("gray", S_BAR), output: m = process.stdout, spacing: l = 1, withGuide: c } = {})=>{
        const t = [], o = c ?? dist_settings.withGuide, f = o ? r : "", O = o ? `${e}  ` : "", u = o ? `${r}  ` : "";
        for(let i = 0; i < l; i++)t.push(f);
        const g = Array.isArray(s) ? s : s.split(`
`);
        if (g.length > 0) {
            const [i, ...y] = g;
            i.length > 0 ? t.push(`${O}${i}`) : t.push(o ? e : "");
            for (const p of y)p.length > 0 ? t.push(`${u}${p}`) : t.push(o ? r : "");
        }
        m.write(`${t.join(`
`)}
`);
    },
    info: (s, e)=>{
        log.message(s, {
            ...e,
            symbol: external_node_util_styleText("blue", S_INFO)
        });
    },
    success: (s, e)=>{
        log.message(s, {
            ...e,
            symbol: external_node_util_styleText("green", S_SUCCESS)
        });
    },
    step: (s, e)=>{
        log.message(s, {
            ...e,
            symbol: external_node_util_styleText("green", S_STEP_SUBMIT)
        });
    },
    warn: (s, e)=>{
        log.message(s, {
            ...e,
            symbol: external_node_util_styleText("yellow", S_WARN)
        });
    },
    warning: (s, e)=>{
        log.warn(s, e);
    },
    error: (s, e)=>{
        log.message(s, {
            ...e,
            symbol: external_node_util_styleText("red", S_ERROR)
        });
    }
};
const cancel = (o = "", t)=>{
    const i = t?.output ?? process.stdout, e = t?.withGuide ?? dist_settings.withGuide ? `${external_node_util_styleText("gray", S_BAR_END)}  ` : "";
    i.write(`${e}${external_node_util_styleText("red", o)}

`);
}, intro = (o = "", t)=>{
    const i = t?.output ?? process.stdout, e = t?.withGuide ?? dist_settings.withGuide ? `${external_node_util_styleText("gray", S_BAR_START)}  ` : "";
    i.write(`${e}${o}
`);
}, outro = (o = "", t)=>{
    const i = t?.output ?? process.stdout, e = t?.withGuide ?? dist_settings.withGuide ? `${external_node_util_styleText("gray", S_BAR)}
${external_node_util_styleText("gray", S_BAR_END)}  ` : "";
    i.write(`${e}${o}

`);
};
const W$1 = (o)=>external_node_util_styleText("dim", o), prompts_dist_C = (o, e, s)=>{
    const a = {
        hard: true,
        trim: false
    }, i = main_wrapAnsi(o, e, a).split(`
`), c = i.reduce((n, r)=>Math.max(fast_string_width_dist(r), n), 0), u = i.map(s).reduce((n, r)=>Math.max(fast_string_width_dist(r), n), 0), g = e - (u - c);
    return main_wrapAnsi(o, g, a);
};
const note = (o = "", e = "", s)=>{
    const a = s?.output ?? node_process.stdout, i = s?.withGuide ?? dist_settings.withGuide, c = s?.format ?? W$1, g = [
        "",
        ...prompts_dist_C(o, dist_getColumns(a) - 6, c).split(`
`).map(c),
        ""
    ], n = fast_string_width_dist(e), r = Math.max(g.reduce((m, F)=>{
        const O = fast_string_width_dist(F);
        return O > m ? O : m;
    }, 0), n) + 2, h = g.map((m)=>`${external_node_util_styleText("gray", S_BAR)}  ${m}${" ".repeat(r - fast_string_width_dist(m))}${external_node_util_styleText("gray", S_BAR)}`).join(`
`), T = i ? `${external_node_util_styleText("gray", S_BAR)}
` : "", l$1 = i ? S_CONNECT_LEFT : S_CORNER_BOTTOM_LEFT;
    a.write(`${T}${external_node_util_styleText("green", S_STEP_SUBMIT)}  ${external_node_util_styleText("reset", e)} ${external_node_util_styleText("gray", S_BAR_H.repeat(Math.max(r - n - 1, 1)) + S_CORNER_TOP_RIGHT)}
${h}
${external_node_util_styleText("gray", l$1 + S_BAR_H.repeat(r + 2) + S_CORNER_BOTTOM_RIGHT)}
`);
};
const dist_W = (l)=>external_node_util_styleText("magenta", l);
const spinner = ({ indicator: l = "dots", onCancel: h, output: n = process.stdout, cancelMessage: G, errorMessage: O, frames: E = unicode ? [
    "\u25D2",
    "\u25D0",
    "\u25D3",
    "\u25D1"
] : [
    "\u2022",
    "o",
    "O",
    "0"
], delay: F = unicode ? 80 : 120, signal: m, ...I } = {})=>{
    const u = isCI();
    let M, T, d = false, S = false, s = "", p, w = performance.now();
    const x = dist_getColumns(n), k = I?.styleFrame ?? dist_W, g = (e)=>{
        const r = e > 1 ? O ?? dist_settings.messages.error : G ?? dist_settings.messages.cancel;
        S = 1 === e, d && (a(r, e), S && "function" == typeof h && h());
    }, f = ()=>g(2), i = ()=>g(1), A = ()=>{
        process.on("uncaughtExceptionMonitor", f), process.on("unhandledRejection", f), process.on("SIGINT", i), process.on("SIGTERM", i), process.on("exit", g), m && m.addEventListener("abort", i);
    }, H = ()=>{
        process.removeListener("uncaughtExceptionMonitor", f), process.removeListener("unhandledRejection", f), process.removeListener("SIGINT", i), process.removeListener("SIGTERM", i), process.removeListener("exit", g), m && m.removeEventListener("abort", i);
    }, y = ()=>{
        if (void 0 === p) return;
        u && n.write(`
`);
        const r = main_wrapAnsi(p, x, {
            hard: true,
            trim: false
        }).split(`
`);
        r.length > 1 && n.write(src.cursor.up(r.length - 1)), n.write(src.cursor.to(0)), n.write(src.erase.down());
    }, C = (e)=>e.replace(/\.+$/, ""), _ = (e)=>{
        const r = (performance.now() - e) / 1e3, t = Math.floor(r / 60), o = Math.floor(r % 60);
        return t > 0 ? `[${t}m ${o}s]` : `[${o}s]`;
    }, N = I.withGuide ?? dist_settings.withGuide, P = (e = "")=>{
        d = true, M = block({
            output: n
        }), s = C(e), w = performance.now(), N && n.write(`${external_node_util_styleText("gray", S_BAR)}
`);
        let r = 0, t = 0;
        A(), T = setInterval(()=>{
            if (u && s === p) return;
            y(), p = s;
            const o = k(E[r]);
            let v;
            if (u) v = `${o}  ${s}...`;
            else if ("timer" === l) v = `${o}  ${s} ${_(w)}`;
            else {
                const B = ".".repeat(Math.floor(t)).slice(0, 3);
                v = `${o}  ${s}${B}`;
            }
            const j = main_wrapAnsi(v, x, {
                hard: true,
                trim: false
            });
            n.write(j), r = r + 1 < E.length ? r + 1 : 0, t = t < 4 ? t + 0.125 : 0;
        }, F);
    }, a = (e = "", r = 0, t = false)=>{
        if (!d) return;
        d = false, clearInterval(T), y();
        const o = 0 === r ? external_node_util_styleText("green", S_STEP_SUBMIT) : 1 === r ? external_node_util_styleText("red", S_STEP_CANCEL) : external_node_util_styleText("red", S_STEP_ERROR);
        s = e ?? s, t || ("timer" === l ? n.write(`${o}  ${s} ${_(w)}
`) : n.write(`${o}  ${s}
`)), H(), M();
    };
    return {
        start: P,
        stop: (e = "")=>a(e, 0),
        message: (e = "")=>{
            s = C(e ?? s);
        },
        cancel: (e = "")=>a(e, 1),
        error: (e = "")=>a(e, 2),
        clear: ()=>a("", 0, true),
        get isCancelled () {
            return S;
        }
    };
};
unicodeOr("\u2500", "-"), unicodeOr("\u2501", "="), unicodeOr("\u2588", "#");
const prompts_dist_c = (e, a)=>e.includes(`
`) ? e.split(`
`).map((t)=>a(t)).join(`
`) : a(e);
const dist_select = (e)=>{
    const a = (t, d)=>{
        const s = t.label ?? String(t.value);
        switch(d){
            case "disabled":
                return `${external_node_util_styleText("gray", S_RADIO_INACTIVE)} ${prompts_dist_c(s, (n)=>external_node_util_styleText("gray", n))}${t.hint ? ` ${external_node_util_styleText("dim", `(${t.hint ?? "disabled"})`)}` : ""}`;
            case "selected":
                return `${prompts_dist_c(s, (n)=>external_node_util_styleText("dim", n))}`;
            case "active":
                return `${external_node_util_styleText("green", S_RADIO_ACTIVE)} ${s}${t.hint ? ` ${external_node_util_styleText("dim", `(${t.hint})`)}` : ""}`;
            case "cancelled":
                return `${prompts_dist_c(s, (n)=>external_node_util_styleText([
                        "strikethrough",
                        "dim"
                    ], n))}`;
            default:
                return `${external_node_util_styleText("dim", S_RADIO_INACTIVE)} ${prompts_dist_c(s, (n)=>external_node_util_styleText("dim", n))}`;
        }
    };
    return new dist_a({
        options: e.options,
        signal: e.signal,
        input: e.input,
        output: e.output,
        initialValue: e.initialValue,
        render () {
            const t = e.withGuide ?? dist_settings.withGuide, d = `${symbol(this.state)}  `, s = `${symbolBar(this.state)}  `, n = dist_wrapTextWithPrefix(e.output, e.message, s, d), u = `${t ? `${external_node_util_styleText("gray", S_BAR)}
` : ""}${n}
`;
            switch(this.state){
                case "submit":
                    {
                        const r = t ? `${external_node_util_styleText("gray", S_BAR)}  ` : "", l = dist_wrapTextWithPrefix(e.output, a(this.options[this.cursor], "selected"), r);
                        return `${u}${l}`;
                    }
                case "cancel":
                    {
                        const r = t ? `${external_node_util_styleText("gray", S_BAR)}  ` : "", l = dist_wrapTextWithPrefix(e.output, a(this.options[this.cursor], "cancelled"), r);
                        return `${u}${l}${t ? `
${external_node_util_styleText("gray", S_BAR)}` : ""}`;
                    }
                default:
                    {
                        const r = t ? `${external_node_util_styleText("cyan", S_BAR)}  ` : "", l = t ? external_node_util_styleText("cyan", S_BAR_END) : "", g = u.split(`
`).length, h = t ? 2 : 1;
                        return `${u}${r}${limitOptions({
                            output: e.output,
                            cursor: this.cursor,
                            options: this.options,
                            maxItems: e.maxItems,
                            columnPadding: r.length,
                            rowPadding: g + h,
                            style: (p, b)=>a(p, p.disabled ? "disabled" : b ? "active" : "inactive")
                        }).join(`
${r}`)}
${l}
`;
                    }
            }
        }
    }).prompt();
};
external_node_util_styleText("gray", S_BAR);
export { cancel, dist_confirm as confirm, dist_isCancel as isCancel, dist_select as select, intro, log, note, outro, spinner };
