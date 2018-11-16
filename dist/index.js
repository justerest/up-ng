#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var commandLineArgs = require("command-line-args");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var getFileList_1 = require("./getFileList");
var upgradeFile_1 = require("./upgradeFile");
var utils_1 = require("./utils");
(function main() {
    var options = commandLineArgs([
        { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
        { name: 'out', alias: 'o', type: String, defaultValue: '' },
        { name: 'replace', type: Boolean, defaultValue: false },
    ]);
    rxjs_1.of(options)
        .pipe(utils_1.add('filePath', operators_1.mergeMap(function (_a) {
        var paths = _a.paths;
        return getFileList_1.getFileList({ paths: paths });
    })), utils_1.add('outFilePath', operators_1.map(function (s) { return s.out ? path_1.resolve(s.out, s.filePath.replace(/^(\.\.\/)+/, '')) : s.filePath; })), utils_1.add('force', operators_1.map(function (s) { return !!(s.out || s.filePath); })), utils_1.omit(operators_1.mergeMap(function (_a) {
        var filePath = _a.filePath, outFilePath = _a.outFilePath, force = _a.force;
        return upgradeFile_1.upgradeFile({ filePath: filePath, outFilePath: outFilePath, force: force });
    })), operators_1.finalize(function () { return console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n"); }))
        .subscribe(function (s) {
        console.log();
        console.log(chalk_1.default.greenBright(' UPGRADE '), chalk_1.default.yellow(s.filePath), '->');
        console.log(chalk_1.default.yellowBright(s.outFilePath));
    });
})();
