import { from, Observable, ObservableInput } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export function init<T, K extends string>(key: K) {
    return map((data: T) => ({ [key]: data }) as { [P in K]: T });
}

export function set<T extends object, R, K extends string>(
    key: K extends keyof T ? never : K,
    fn: (scope: T) => ObservableInput<R>,
) {
    type S = T & { [k in K]: R };
    return (scope: T) => from(fn(scope)).pipe(
        map((response) => ({ ...scope as object, [key]: response })),
    ) as any as Observable<{ [P in keyof S]: S[P] }>;
}

export function add<T extends object, R, K extends string>(
    key: K extends keyof T ? never : K,
    fn: (scope: T) => R,
) {
    type S = T & { [k in K]: R };
    return (scope: T) => ({ ...scope as object, [key]: fn(scope) }) as any as { [P in keyof S]: S[P] };
}

export function omit<T extends object, R>(
    fn: (scope: T) => ObservableInput<R>,
): (scope: T) => Observable<{ [t in keyof T]: T[t] }> {
    return (scope) => from(fn(scope)).pipe(mapTo(scope));
}
