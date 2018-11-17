import { Observable, ObservableInput, OperatorFunction } from 'rxjs';
export declare function init<T, K extends string>(key: K): OperatorFunction<T, {
    [P in K]: T;
}>;
export declare function set<T extends object, K extends keyof T>(key: K, fn: (scope: T) => ObservableInput<T[K]>): (scope: T) => Observable<T>;
export declare function set<T extends object, K extends string, R>(key: K, fn: (scope: T) => ObservableInput<R>): (scope: T) => Observable<{
    [P in keyof (T & {
        [S in K]: R;
    })]: (T & {
        [S in K]: R;
    })[P];
}>;
export declare function add<T extends object, K extends keyof T>(key: K, fn: (scope: T) => T[K]): (scope: T) => T;
export declare function add<T extends object, K extends string, R>(key: K, fn: (scope: T) => R): (scope: T) => {
    [P in keyof (T & {
        [S in K]: R;
    })]: (T & {
        [S in K]: R;
    })[P];
};
export declare function omit<T extends object>(fn: (scope: T) => ObservableInput<any>): (scope: T) => Observable<{
    [P in keyof T]: T[P];
}>;
