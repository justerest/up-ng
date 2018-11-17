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
function init(key) {
    return operators_1.map(function (data) {
        var _a;
        return (_a = {}, _a[key] = data, _a);
    });
}
exports.init = init;
function set(key, fn) {
    return function (scope) { return rxjs_1.from(fn(scope)).pipe(operators_1.map(function (response) {
        var _a;
        return (__assign({}, scope, (_a = {}, _a[key] = response, _a)));
    })); };
}
exports.set = set;
function add(key, fn) {
    return function (scope) {
        var _a;
        return (__assign({}, scope, (_a = {}, _a[key] = fn(scope), _a)));
    };
}
exports.add = add;
function omit(fn) {
    return function (scope) { return rxjs_1.from(fn(scope)).pipe(operators_1.mapTo(scope)); };
}
exports.omit = omit;
