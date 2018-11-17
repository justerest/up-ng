// tslint:disable:max-line-length
import { from, Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export function init<T, K extends string>(key: K): OperatorFunction<T, { [P in K]: T; }>;
export function init(key: string) {
    return map((data) => ({ [key]: data }));
}

export function set<T extends object, K extends keyof T>(key: K, fn: (scope: T) => ObservableInput<T[K]>): (scope: T) => Observable<T>;
export function set<T extends object, K extends string, R>(key: K, fn: (scope: T) => ObservableInput<R>): (scope: T) => Observable<{ [P in keyof (T & { [S in K]: R; })]: (T & { [S in K]: R; })[P]; }>;
export function set(key: string, fn: any) {
    return (scope) => from(fn(scope)).pipe(
        map((response) => ({ ...scope, [key]: response })),
    );
}

export function add<T extends object, K extends keyof T>(key: K, fn: (scope: T) => T[K]): (scope: T) => T;
export function add<T extends object, K extends string, R>(key: K, fn: (scope: T) => R): (scope: T) => { [P in keyof (T & { [S in K]: R; })]: (T & { [S in K]: R; })[P]; };
export function add(key: string, fn: any) {
    return (scope) => ({ ...scope, [key]: fn(scope) });
}

export function omit<T extends object>(fn: (scope: T) => ObservableInput<any>): (scope: T) => Observable<{ [P in keyof T]: T[P]; }>;
export function omit(fn: any) {
    return (scope) => from(fn(scope)).pipe(mapTo(scope));
}
