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
    return function (data) {
        var _a;
        return (_a = {}, _a[key] = data, _a);
    };
}
exports.scope = scope;
function set(key, prop1, prop2, fn) {
    var composedFn = composeFn(prop1, prop2, fn);
    return function (data) {
        var _a;
        return (__assign({}, data, (_a = {}, _a[key] = composedFn(data), _a)));
    };
}
exports.set = set;
function set$(key, prop1, prop2, fn) {
    var composedFn = composeFn(prop1, prop2, fn);
    return function (data) { return rxjs_1.from(composedFn(data)).pipe(operators_1.map(function (response) {
        var _a;
        return (__assign({}, data, (_a = {}, _a[key] = response, _a)));
    })); };
}
exports.set$ = set$;
function omit$(prop1, prop2, fn) {
    var composedFn = composeFn(prop1, prop2, fn);
    return function (data) { return rxjs_1.from(composedFn(data)).pipe(operators_1.mapTo(data)); };
}
exports.omit$ = omit$;
function composeFn(prop1, prop2, fn) {
    return typeof prop1 === 'function' ? function (data) { return prop1(data); } :
        typeof prop2 === 'function' ? function (data) { return prop2(data[prop1]); } :
            function (data) { return fn(data[prop1], data[prop2]); };
}
