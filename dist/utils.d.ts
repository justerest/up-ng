import { Observable, ObservableInput, OperatorFunction } from 'rxjs';
export declare function init<T, K extends string>(key: K): OperatorFunction<T, {
    [P in K]: T;
}>;
export declare function set<T extends object, R, K extends string>(key: K extends keyof T ? never : K, fn: (scope: T) => ObservableInput<R>): (scope: T) => Observable<{
    [P in keyof (T & {
        [k in K]: R;
    })]: (T & {
        [k in K]: R;
    })[P];
}>;
export declare function add<T extends object, R, K extends string>(key: K extends keyof T ? never : K, fn: (scope: T) => R): (scope: T) => {
    [P in keyof (T & {
        [k in K]: R;
    })]: (T & {
        [k in K]: R;
    })[P];
};
export declare function omit<T extends object, R>(fn: (scope: T) => ObservableInput<R>): (scope: T) => Observable<{
    [P in keyof T]: T[P];
}>;
