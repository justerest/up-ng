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
// tslint:disable:max-line-length
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function scope(key) {
    return operators_1.map(function (data) {
        var _a;
        return (_a = {}, _a[key] = data, _a);
    });
}
exports.scope = scope;
function set(key, fn) {
    return function (state) { return rxjs_1.from(fn(state)).pipe(operators_1.map(function (response) {
        var _a;
        return (__assign({}, state, (_a = {}, _a[key] = response, _a)));
    })); };
}
exports.set = set;
function add(key, fn) {
    return function (state) {
        var _a;
        return (__assign({}, state, (_a = {}, _a[key] = fn(state), _a)));
    };
}
exports.add = add;
function omit(fn) {
    return function (state) { return rxjs_1.from(fn(state)).pipe(operators_1.mapTo(state)); };
}
exports.omit = omit;
