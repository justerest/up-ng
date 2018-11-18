import { ObservableInput } from 'rxjs';
export declare function scope<T, K extends string>(key: K): (data: T) => {
    [P in K]: T;
};
export declare function set<T, R, K extends string>(key: K, fn: (a1: T) => R): (data: T) => {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
};
export declare function set<T, R, K extends string, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => R): (data: T) => {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
};
export declare function set<T, R, K extends string, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => R): (data: T) => {
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
};
export declare function set$<T, R, K extends string>(key: K, fn: (a1: T) => ObservableInput<R>): (data: T) => ObservableInput<{
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function set$<T, R, K extends string, P1 extends keyof T>(key: K, prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): (data: T) => ObservableInput<{
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function set$<T, R, K extends string, P1 extends keyof T, P2 extends keyof T>(key: K, prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): (data: T) => ObservableInput<{
    [P in keyof (T & {
        [F in K]: R;
    })]: (T & {
        [F in K]: R;
    })[P];
}>;
export declare function omit$<T, R>(fn: (state: T) => ObservableInput<R>): (state: T) => ObservableInput<T>;
export declare function omit$<T, R, P1 extends keyof T>(prop1: P1, fn: (a1: T[P1]) => ObservableInput<R>): (data: T) => ObservableInput<T>;
export declare function omit$<T, R, P1 extends keyof T, P2 extends keyof T>(prop1: P1, prop2: P2, fn: (a1: T[P1], a2: T[P2]) => ObservableInput<R>): (data: T) => ObservableInput<T>;
