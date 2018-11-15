#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var getFileList_1 = require("./getFileList");
var options_1 = require("./options");
var upgradeFile_1 = require("./upgradeFile");
rxjs_1.from(options_1.PATHS).pipe(operators_1.mergeMap(getFileList_1.getFileList), operators_1.mergeMap(upgradeFile_1.upgradeFile, function (path) { return path; }), operators_1.finalize(function () { return console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n"); }))
    .subscribe(function (path) { return console.log(chalk_1.default.greenBright(' UPGRADE '), chalk_1.default.yellowBright(path)); });
