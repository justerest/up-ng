// tslint:disable:max-line-length
import { from, ObservableInput, OperatorFunction } from 'rxjs';
import { map, mapTo, mergeMap, scan } from 'rxjs/operators';

export function setAll<T, K extends string | symbol>(key: K): OperatorFunction<T, { [P in K]: T; }>;
export function setAll(key: string) {
    return map((data: any) => ({ [key]: data }));
}

export function set<T, R, K extends string | symbol>(key: K, fn: (a1: T) => R): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set(key: string, fn: any) {
    return map((data: any) => ({ ...data, [key]: fn(data) }));
}

export function scanSet<T, R, K extends string | symbol>(key: K, fn: (a1: R, a2: T) => R, seed: R): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function scanSet(key: string, fn: any, seed: any) {
    return scan((res: any, data: any) => ({ ...data, [key]: fn(res[key], data) }), { [key]: seed });
}

export function mergeSet<T, R, K extends string | symbol>(key: K, fn: (a1: T) => ObservableInput<R>): OperatorFunction<T, { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function mergeSet(key: string, fn?: any) {
    return mergeMap((data: any) => from(fn(data)).pipe(map((response) => ({ ...data, [key]: response }))));
}

export function mergeTap<T, R>(fn: (state: T) => ObservableInput<R>): OperatorFunction<T, T>;
export function mergeTap(fn?: any) {
    return mergeMap((data: any) => from(fn(data)).pipe(mapTo(data)));
}
