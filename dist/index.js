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
    .pipe(operators_1.map(utils_1.scope('pattern')), operators_1.mergeMap(utils_1.set$('filePath', 'pattern', getFileList_1.getFileList)), operators_1.map(utils_1.set('outFilePath', 'filePath', resolve_1.resolve)), operators_1.mergeMap(utils_1.set$('isSuccess', 'filePath', 'outFilePath', upgradeFile_1.upgradeFile)))
    .subscribe({
    next: function (_a) {
        var filePath = _a.filePath, outFilePath = _a.outFilePath, isSuccess = _a.isSuccess;
        var status = isSuccess ? chalk_1.default.greenBright('UPGRADE') : chalk_1.default.bgRedBright('FAIL');
        console.log("\n" + status + ":");
        console.log(chalk_1.default.yellow(filePath), '->');
        console.log(chalk_1.default.yellowBright(outFilePath));
    },
    complete: function () {
        console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n");
    },
});
