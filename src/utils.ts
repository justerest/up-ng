// tslint:disable:max-line-length
import { from, Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export function init<T, K extends string>(key: K): OperatorFunction<T, { [P in K]: T; }>;
export function init(key: string) {
    return map((data) => ({ [key]: data }));
}

export function set<T extends object, R, K extends string>(key: K extends keyof T ? never : K, fn: (scope: T) => ObservableInput<R>): (scope: T) => Observable<{ [P in keyof (T & { [k in K]: R; })]: (T & { [k in K]: R; })[P]; }>;
export function set(key: string, fn: any) {
    return (scope) => from(fn(scope)).pipe(
        map((response) => ({ ...scope, [key]: response })),
    );
}

export function add<T extends object, R, K extends string>(key: K extends keyof T ? never : K, fn: (scope: T) => R): (scope: T) => { [P in keyof (T & { [k in K]: R; })]: (T & { [k in K]: R; })[P]; };
export function add(key: string, fn: any) {
    return (scope) => ({ ...scope, [key]: fn(scope) });
}

export function omit<T extends object, R>(fn: (scope: T) => ObservableInput<R>): (scope: T) => Observable<{ [P in keyof T]: T[P]; }>;
export function omit(fn: any) {
    return (scope) => from(fn(scope)).pipe(mapTo(scope));
}
