"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commandLineArgs = require("command-line-args");
exports.OPTIONS = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'out', alias: 'o', type: String, defaultValue: '' },
    { name: 'replace', type: Boolean, defaultValue: false },
]);
