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
// type Merge<T> = { [K in keyof T]: T[K] };
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
function pick() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (scope) { return keys.reduce(function (res, key) {
        res[key] = scope[key];
        return res;
    }, {}); };
}
exports.pick = pick;
