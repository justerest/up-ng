"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var options_1 = require("./options");
exports.resolve = options_1.OPTIONS.out ? resolveOutPath : function (path) { return path; };
function resolveOutPath(filePath) {
    var pathFromCurDir = filePath.replace(/^(\.\.\/)+/, '');
    return path_1.resolve(options_1.OPTIONS.out, pathFromCurDir);
}
