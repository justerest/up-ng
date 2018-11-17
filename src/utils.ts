// tslint:disable:max-line-length
import { from, Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export function scope<T, K extends string>(key: K): OperatorFunction<T, { [P in K]: T; }>;
export function scope(key: string) {
    return map((data) => ({ [key]: data }));
}

export function set<T extends object, K extends string, R>(key: K, fn: (state: T) => ObservableInput<K extends keyof T ? T[K] : R>): (state: T) => Observable<{ [P in keyof (T & { [k in K]: R; })]: (T & { [k in K]: R; })[P]; }>;
export function set(key: string, fn: any) {
    return (state: any) => from(fn(state)).pipe(map((response) => ({ ...state, [key]: response })));
}

export function add<T extends object, K extends string, R>(key: K, fn: (state: T) => K extends keyof T ? T[K] : R): (state: T) => { [P in keyof (T & { [k in K]: R; })]: (T & { [k in K]: R; })[P]; };
export function add(key: string, fn: any) {
    return (state: any) => ({ ...state, [key]: fn(state) });
}

export function omit<T extends object, R>(fn: (state: T) => ObservableInput<R>): (state: T) => Observable<{ [P in keyof T]: T[P]; }>;
export function omit(fn: any) {
    return (state: any) => from(fn(state)).pipe(mapTo(state));
}
