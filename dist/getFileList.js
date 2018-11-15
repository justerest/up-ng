"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var glob = require("glob");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function getFileList(path) {
    return getPattern(path).pipe(operators_1.switchMap(globFiles), operators_1.mergeAll());
}
exports.getFileList = getFileList;
function globFiles(pattern) {
    return new Promise(function (res) { return glob(pattern, { nodir: true }, function (_, matches) { return res(matches); }); });
}
function getPattern(path) {
    return rxjs_1.from(fs_extra_1.pathExists(path)).pipe(operators_1.filter(Boolean), operators_1.switchMap(function () { return fs_extra_1.lstat(path); }), operators_1.map(function (stat) { return stat.isDirectory(); }), operators_1.defaultIfEmpty(false), operators_1.map(function (isDir) { return isDir ? dirPattern(path) : componentPattern(path); }));
}
function dirPattern(path) {
    return path + "/**/*.component.?(ts|html)";
}
function componentPattern(path) {
    return /(\.\w{2,4})$/.test(path) ? path : path + ".?(ts|html)";
}
