import { Observable, ObservableInput, OperatorFunction } from 'rxjs';
export declare function scope<T, K extends string>(key: K): OperatorFunction<T, {
    [P in K]: T;
}>;
export declare function set<T extends object, K extends string, R>(key: K, fn: (state: T) => ObservableInput<K extends keyof T ? T[K] : R>): (state: T) => Observable<{
    [P in keyof (T & {
        [k in K]: R;
    })]: (T & {
        [k in K]: R;
    })[P];
}>;
export declare function add<T extends object, K extends string, R>(key: K, fn: (state: T) => K extends keyof T ? T[K] : R): (state: T) => {
    [P in keyof (T & {
        [k in K]: R;
    })]: (T & {
        [k in K]: R;
    })[P];
};
export declare function omit<T extends object, R>(fn: (state: T) => ObservableInput<R>): (state: T) => Observable<{
    [P in keyof T]: T[P];
}>;
