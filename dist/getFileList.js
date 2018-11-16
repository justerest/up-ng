"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var glob = require("glob");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var utils_1 = require("./utils");
function getFileList(options) {
    return rxjs_1.of(options).pipe(utils_1.add('path', operators_1.mergeMap(function (s) { return s.paths; })), utils_1.add('isExist', operators_1.map(function (s) { return fs_1.existsSync(s.path); })), utils_1.add('isDir', operators_1.mergeMap(function (s) { return s.isExist ? checkDir(s.path) : rxjs_1.of(false); })), utils_1.add('getPattern', operators_1.map(function (s) { return s.isDir ? getDirPattern : getComponentPattern; })), utils_1.add('pattern', operators_1.map(function (s) { return s.getPattern(s.path); })), operators_1.mergeMap(function (s) { return globByPattern(s.pattern); }));
}
exports.getFileList = getFileList;
function checkDir(path) {
    return rxjs_1.bindNodeCallback(fs_1.lstat)(path).pipe(operators_1.map(function (stat) { return stat.isDirectory(); }));
}
function globByPattern(pattern) {
    return rxjs_1.bindNodeCallback(glob)(pattern, { nodir: true }).pipe(operators_1.mergeMap(function (paths) { return paths; }));
}
function getDirPattern(path) {
    return path + "/**/*.component.?(ts|html)";
}
function getComponentPattern(path) {
    return /(\.\w{2,4})$/.test(path) ? path : path + ".?(ts|html)";
}
