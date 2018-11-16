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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function add(key, operator) {
    var tmp;
    return rxjs_1.pipe(operators_1.tap(function (scope) { return tmp = scope; }), operator, operators_1.map(function (response) {
        var _a;
        return (__assign({}, tmp, (_a = {}, _a[key] = response, _a)));
    }));
}
exports.add = add;
function omit(operator) {
    var tmp;
    return rxjs_1.pipe(operators_1.tap(function (scope) { return tmp = scope; }), operator, operators_1.map(function () { return tmp; }));
}
exports.omit = omit;
