#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var rxjs_1 = require("rxjs");
var rxjs_set_operators_1 = require("rxjs-set-operators");
var getFileList_1 = require("./getFileList");
var options_1 = require("./options");
var resolve_1 = require("./resolve");
var upgradeFile_1 = require("./upgradeFile");
rxjs_1.from(options_1.OPTIONS.paths)
    .pipe(rxjs_set_operators_1.setAll('pattern'), rxjs_set_operators_1.mergeSet('filePath', function (_a) {
    var pattern = _a.pattern;
    return getFileList_1.getFileList(pattern);
}), rxjs_set_operators_1.set('outFilePath', function (_a) {
    var filePath = _a.filePath;
    return resolve_1.resolve(filePath);
}), rxjs_set_operators_1.mergeSet('isSuccess', function (_a) {
    var filePath = _a.filePath, outFilePath = _a.outFilePath;
    return upgradeFile_1.upgradeFile(filePath, outFilePath);
}), rxjs_set_operators_1.scanSet('counter', function (acc, _a) {
    var pattern = _a.pattern;
    var _b;
    var index = acc[pattern] || 0;
    return (__assign({}, acc, (_b = {}, _b[pattern] = index + 1, _b)));
}, {}))
    .subscribe({
    next: function (_a) {
        var filePath = _a.filePath, outFilePath = _a.outFilePath, isSuccess = _a.isSuccess, counter = _a.counter, pattern = _a.pattern;
        var status = isSuccess ? chalk_1.default.greenBright('UPGRADE') : chalk_1.default.bgRedBright('FAIL');
        console.log(counter[pattern]);
        console.log("\n" + status + ":");
        console.log(chalk_1.default.yellow(filePath), '->');
        console.log(chalk_1.default.yellowBright(outFilePath));
    },
    complete: function () {
        console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n");
    },
});
