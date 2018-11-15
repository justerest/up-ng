"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var commandLineArgs = require("command-line-args");
var create_angular_template_1 = require("create-angular-template");
var fs_extra_1 = require("fs-extra");
var glob = require("glob");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var _a = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'out', alias: 'o', type: String, defaultValue: '' },
    { name: 'replace', type: Boolean, defaultValue: false },
]), PATHS = _a.paths, OUTDIR = _a.out, REPLACE = _a.replace;
(function main() {
    rxjs_1.from(PATHS).pipe(operators_1.mergeMap(getFileList), operators_1.mergeMap(upgradeFile, function (path) { return path; }), operators_1.finalize(function () { return console.log("\n" + chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH ')) + "\n"); }))
        .subscribe(function (path) { return console.log(chalk_1.default.greenBright('UPGRADE'), chalk_1.default.yellowBright(path)); });
})();
function upgradeFile(path) {
    return rxjs_1.from(fs_extra_1.readFile(path, 'UTF-8')).pipe(operators_1.map(function (data) { return /ts$/.test(path) ? upgradeTs(data) : upgradeHtml(data); }), operators_1.switchMap(function (data) { return OUTDIR || REPLACE ? forceRecord(path, data) : safeRecord(path, data); }));
}
function forceRecord(path, data) {
    return __awaiter(this, void 0, void 0, function () {
        var outPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outPath = path_1.resolve(OUTDIR, path.replace(/^(\.\.\/)+/, ''));
                    return [4 /*yield*/, fs_extra_1.ensureDir(path_1.dirname(outPath))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.writeFile(outPath, data)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function safeRecord(path, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.writeFile(path + ".tmp", data)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, backupFile(path)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs_extra_1.rename(path + ".tmp", path)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function backupFile(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.rename(path, path.replace(/\.(\w+)$/, '.old.$1'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function upgradeHtml(data) {
    return create_angular_template_1.transformTemplate(data)
        .replace(/async\s*:\s*this/g, 'async');
}
function upgradeTs(data) {
    return data.replace(/ng-metadata/g, '@angular');
}
function getFileList(path) {
    return getPattern(path).pipe(operators_1.switchMap(globFiles), operators_1.mergeAll());
}
function globFiles(pattern) {
    return new Promise(function (res) { return glob(pattern, { nodir: true }, function (_, matches) { return res(matches); }); });
}
function getPattern(path) {
    return rxjs_1.from(fs_extra_1.pathExists(path)).pipe(operators_1.filter(Boolean), operators_1.switchMap(function () { return fs_extra_1.lstat(path); }), operators_1.map(function (stat) { return stat.isDirectory(); }), operators_1.defaultIfEmpty(false), operators_1.map(function (isDir) { return isDir ? dirPattern(path) : componentPattern(path); }));
}
function componentPattern(path) {
    return /(\.\w{2,4})$/.test(path) ? path : path + ".?(ts|html)";
}
function dirPattern(path) {
    return path + "/**/*.component.?(ts|html)";
}
