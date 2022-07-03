var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/ignore/index.js
var require_ignore = __commonJS({
  "node_modules/ignore/index.js"(exports, module2) {
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_TEST_BLANK_LINE = /^\s+$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
    var SLASH = "/";
    var KEY_IGNORE = typeof Symbol !== "undefined" ? Symbol.for("node-ignore") : "node-ignore";
    var define = (object, key, value) => Object.defineProperty(object, key, { value });
    var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
    var RETURN_FALSE = () => false;
    var sanitizeRange = (range) => range.replace(REGEX_REGEXP_RANGE, (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY);
    var cleanRangeBackSlash = (slashes) => {
      const { length } = slashes;
      return slashes.slice(0, length - length % 2);
    };
    var REPLACERS = [
      [
        /\\?\s+$/,
        (match) => match.indexOf("\\") === 0 ? SPACE : EMPTY
      ],
      [
        /\\\s/g,
        () => SPACE
      ],
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      [
        /^\//,
        () => "^"
      ],
      [
        /\//g,
        () => "\\/"
      ],
      [
        /^\^*\\\*\\\*\\\//,
        () => "^(?:.*\\/)?"
      ],
      [
        /^(?=[^^])/,
        function startingReplacer() {
          return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
        }
      ],
      [
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      [
        /(^|[^\\]+)\\\*(?=.+)/g,
        (_, p1) => `${p1}[^\\/]*`
      ],
      [
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE
      ],
      [
        /\\\\/g,
        () => ESCAPE
      ],
      [
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
      ],
      [
        /(?:[^*])$/,
        (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
      ],
      [
        /(\^|\\\/)?\\\*$/,
        (_, p1) => {
          const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
          return `${prefix}(?=$|\\/$)`;
        }
      ]
    ];
    var regexCache = /* @__PURE__ */ Object.create(null);
    var makeRegex = (pattern, ignoreCase) => {
      let source = regexCache[pattern];
      if (!source) {
        source = REPLACERS.reduce((prev, current) => prev.replace(current[0], current[1].bind(pattern)), pattern);
        regexCache[pattern] = source;
      }
      return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
    };
    var isString = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && pattern.indexOf("#") !== 0;
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
    var IgnoreRule = class {
      constructor(origin, pattern, negative, regex) {
        this.origin = origin;
        this.pattern = pattern;
        this.negative = negative;
        this.regex = regex;
      }
    };
    var createRule = (pattern, ignoreCase) => {
      const origin = pattern;
      let negative = false;
      if (pattern.indexOf("!") === 0) {
        negative = true;
        pattern = pattern.substr(1);
      }
      pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regex = makeRegex(pattern, ignoreCase);
      return new IgnoreRule(origin, pattern, negative, regex);
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path, originalPath, doThrow) => {
      if (!isString(path)) {
        return doThrow(`path must be a string, but got \`${originalPath}\``, TypeError);
      }
      if (!path) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path)) {
        const r = "`path.relative()`d";
        return doThrow(`path should be a ${r} string, but got "${originalPath}"`, RangeError);
      }
      return true;
    };
    var isNotRelative = (path) => REGEX_TEST_INVALID_PATH.test(path);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define(this, KEY_IGNORE, true);
        this._rules = [];
        this._ignoreCase = ignoreCase;
        this._allowRelativePaths = allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      _addPattern(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules);
          this._added = true;
          return;
        }
        if (checkPattern(pattern)) {
          const rule = createRule(pattern, this._ignoreCase);
          this._added = true;
          this._rules.push(rule);
        }
      }
      add(pattern) {
        this._added = false;
        makeArray(isString(pattern) ? splitPattern(pattern) : pattern).forEach(this._addPattern, this);
        if (this._added) {
          this._initCache();
        }
        return this;
      }
      addPattern(pattern) {
        return this.add(pattern);
      }
      _testOne(path, checkUnignored) {
        let ignored = false;
        let unignored = false;
        this._rules.forEach((rule) => {
          const { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
            return;
          }
          const matched = rule.regex.test(path);
          if (matched) {
            ignored = !negative;
            unignored = negative;
          }
        });
        return {
          ignored,
          unignored
        };
      }
      _test(originalPath, cache, checkUnignored, slices) {
        const path = originalPath && checkPath.convert(originalPath);
        checkPath(path, originalPath, this._allowRelativePaths ? RETURN_FALSE : throwError);
        return this._t(path, cache, checkUnignored, slices);
      }
      _t(path, cache, checkUnignored, slices) {
        if (path in cache) {
          return cache[path];
        }
        if (!slices) {
          slices = path.split(SLASH);
        }
        slices.pop();
        if (!slices.length) {
          return cache[path] = this._testOne(path, checkUnignored);
        }
        const parent = this._t(slices.join(SLASH) + SLASH, cache, checkUnignored, slices);
        return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
      }
      ignores(path) {
        return this._test(path, this._ignoreCache, false).ignored;
      }
      createFilter() {
        return (path) => !this.ignores(path);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      test(path) {
        return this._test(path, this._testCache, true);
      }
    };
    var factory = (options) => new Ignore(options);
    var isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
    factory.isPathValid = isPathValid;
    factory.default = factory;
    module2.exports = factory;
    if (typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
    }
  }
});

// index.js
var fs = require("fs");
var ignore = require_ignore();
var child_process = require("child_process");
var nilValue = ["", null, void 0, [], {}, false];
var filterEmpty = (collection) => {
  if (Array.isArray(collection)) {
    let filterDuplicate = new Set(collection);
    nilValue.forEach((i) => filterDuplicate.delete(i));
    return Array.from(filterDuplicate);
  }
};
var gitignore = fs.readFileSync(".gitignore", "utf-8").split("\n");
var ig = ignore().add(filterEmpty(gitignore));
var exclude = ["target", "node_modules"].map((i) => `-xr!${i}/`);
console.log(exclude);
var cmd = ["7z", "a", "-t7z", "sync.7z", "./", ...exclude];
setInterval(() => {
  child_process.spawn(cmd[0], cmd.filter((i) => i !== "7z"));
}, 1e3);
