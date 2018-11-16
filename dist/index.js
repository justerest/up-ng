#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var commandLineArgs = require("command-line-args");
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
        .pipe(operators_1.mergeMap(utils_1.set('filePath', function (s) { return getFileList_1.getFileList(s); })), operators_1.mergeMap(utils_1.set('outPath', function (s) { return upgradeFile_1.upgradeFile(s); })), operators_1.finalize(function () { return console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n"); }))
        .subscribe(function (s) {
        console.log();
        console.log(chalk_1.default.greenBright(' UPGRADE '), chalk_1.default.yellow(s.filePath), '->');
        console.log(chalk_1.default.yellowBright(s.outPath));
    });
})();
