// tslint:disable:max-line-length
import { from, ObservableInput } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export function scope<T, K extends string>(key: K): (data: T) => { [P in K]: T; };
export function scope(key: string) {
    return (data: any) => ({ [key]: data });
}

export function set<T, R, K extends string>(key: K, fn: (a1: T) => R): (data: T) => { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; };
export function set<T, R, K extends string, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => R): (data: T) => { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; };
export function set<T, R, K extends string, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => R): (data: T) => { [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; };
export function set(key: string, prop1: any, prop2?: any, fn?: any) {
    const composedFn = composeFn(prop1, prop2, fn);
    return (data: any) => ({ ...data, [key]: composedFn(data) });
}

export function set$<T, R, K extends string>(key: K, fn: (a1: T) => ObservableInput<R>): (data: T) => ObservableInput<{ [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set$<T, R, K extends string, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): (data: T) => ObservableInput<{ [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set$<T, R, K extends string, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): (data: T) => ObservableInput<{ [P in keyof (T & { [F in K]: R; })]: (T & { [F in K]: R; })[P]; }>;
export function set$(key: string, prop1: any, prop2?: any, fn?: any) {
    const composedFn = composeFn(prop1, prop2, fn);
    return (data: any) => from(composedFn(data)).pipe(map((response) => ({ ...data, [key]: response })));
}

export function omit$<T, R>(fn: (state: T) => ObservableInput<R>): (state: T) => ObservableInput<T>;
export function omit$<T, R, P1 extends keyof T>(prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): (data: T) => ObservableInput<T>;
export function omit$<T, R, P1 extends keyof T, P2 extends keyof T>(prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): (data: T) => ObservableInput<T>;
export function omit$(prop1: any, prop2?: any, fn?: any) {
    const composedFn = composeFn(prop1, prop2, fn);
    return (data: any) => from(composedFn(data)).pipe(mapTo(data));
}

function composeFn(prop1: any, prop2: any, fn: any): any {
    return typeof prop1 === 'function' ? (data: any) => prop1(data) :
        typeof prop2 === 'function' ? (data: any) => prop2(data[prop1]) :
            (data: any) => fn(data[prop1], data[prop2]);
}
