#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var getFileList_1 = require("./getFileList");
var options_1 = require("./options");
var resolve_1 = require("./resolve");
var upgradeFile_1 = require("./upgradeFile");
var utils_1 = require("./utils");
rxjs_1.from(options_1.OPTIONS.paths)
    .pipe(utils_1.scope('pattern'), operators_1.mergeMap(utils_1.set('filePath', function (_a) {
    var pattern = _a.pattern;
    return getFileList_1.getFileList(pattern);
})), operators_1.map(utils_1.add('outFilePath', function (_a) {
    var filePath = _a.filePath;
    return resolve_1.resolve(filePath);
})), operators_1.mergeMap(utils_1.omit(function (_a) {
    var filePath = _a.filePath, outFilePath = _a.outFilePath;
    return upgradeFile_1.upgradeFile(filePath, outFilePath);
})), operators_1.finalize(function () { return console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n"); }))
    .subscribe(function (_a) {
    var filePath = _a.filePath, outFilePath = _a.outFilePath;
    console.log(chalk_1.default.greenBright('\n UPGRADE '), chalk_1.default.yellow(filePath), '->');
    console.log(chalk_1.default.yellowBright(outFilePath));
});
