// tslint:disable:max-line-length
import { from, ObservableInput, OperatorFunction } from 'rxjs';
import { map, mapTo, mergeMap, scan } from 'rxjs/operators';

export function setAll<T, K extends string | symbol>(key: K): OperatorFunction<T, { [P in K]: T; }>;
export function setAll(key: string) {
    return map((data: any) => ({ [key]: data }));
}

export function set<T, R, K extends string | symbol>(key: K, fn: (a1: T) => R): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set<T, R, K extends string | symbol, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => R): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set<T, R, K extends string | symbol, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => R): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set(key: string, prop1: any, prop2?: any, fn?: any) {
    const composedFn = composeFn(prop1, prop2, fn);
    return map((data: any) => ({ ...data, [key]: composedFn(data) }));
}

export function scanSet<T, R, K extends string | symbol>(key: K, fn: (a1: R, a2: T) => R, seed: R): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function scanSet(key: string, fn: any, seed: any) {
    const composedFn = fn;
    return scan((res: any, data: any) => ({ ...data, [key]: composedFn(res[key], data) }), { [key]: seed });
}

export function mergeSet<T, R, K extends string | symbol>(key: K, fn: (a1: T) => ObservableInput<R>): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function mergeSet<T, R, K extends string | symbol, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function mergeSet<T, R, K extends string | symbol, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function mergeSet(key: string, prop1: any, prop2?: any, fn?: any) {
    const composedFn = composeFn(prop1, prop2, fn);
    return mergeMap((data: any) => from(composedFn(data)).pipe(map((response) => ({ ...data, [key]: response }))));
}

export function mergeTap<T, R>(fn: (state: T) => ObservableInput<R>): OperatorFunction<T, T>;
export function mergeTap<T, R, P1 extends keyof T>(prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): OperatorFunction<T, T>;
export function mergeTap<T, R, P1 extends keyof T, P2 extends keyof T>(prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): OperatorFunction<T, T>;
export function mergeTap(prop1: any, prop2?: any, fn?: any) {
    const composedFn = composeFn(prop1, prop2, fn);
    return mergeMap((data: any) => from(composedFn(data)).pipe(mapTo(data)));
}

function composeFn(prop1: any, prop2: any, fn: any): any {
    return typeof prop1 === 'function' ? (data: any) => prop1(data) :
        typeof prop2 === 'function' ? (data: any) => prop2(data[prop1]) :
            (data: any) => fn(data[prop1], data[prop2]);
}
