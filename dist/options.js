"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var commandLineArgs = require("command-line-args");
exports.PATHS = (_a = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'out', alias: 'o', type: String, defaultValue: '' },
    { name: 'replace', type: Boolean, defaultValue: false },
]), _a.paths), exports.OUTDIR = _a.out, exports.REPLACE = _a.replace;
