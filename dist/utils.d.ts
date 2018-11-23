import { ObservableInput, OperatorFunction } from 'rxjs';
export declare function setAll<T, K extends string | symbol>(key: K): OperatorFunction<T, {
    [P in K]: T;
}>;
export declare function set<T, R, K extends string | symbol>(key: K, fn: (a1: T) => R): OperatorFunction<T, {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function scanSet<T, R, K extends string | symbol>(key: K, fn: (a1: R, a2: T) => R, seed: R): OperatorFunction<T, {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function mergeSet<T, R, K extends string | symbol>(key: K, fn: (a1: T) => ObservableInput<R>): OperatorFunction<T, {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function mergeTap<T, R>(fn: (state: T) => ObservableInput<R>): OperatorFunction<T, T>;
