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
export declare function set<T, R, K extends string | symbol, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => R): OperatorFunction<T, {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function set<T, R, K extends string | symbol, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => R): OperatorFunction<T, {
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
export declare function mergeSet<T, R, K extends string | symbol, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): OperatorFunction<T, {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function mergeSet<T, R, K extends string | symbol, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): OperatorFunction<T, {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function mergeTap<T, R>(fn: (state: T) => ObservableInput<R>): OperatorFunction<T, T>;
export declare function mergeTap<T, R, P1 extends keyof T>(prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): OperatorFunction<T, T>;
export declare function mergeTap<T, R, P1 extends keyof T, P2 extends keyof T>(prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): OperatorFunction<T, T>;
