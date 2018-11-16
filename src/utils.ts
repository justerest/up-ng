import { OperatorFunction, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export function add<T extends object, R, K extends string>(
    key: K extends keyof T ? never : K,
    operator: OperatorFunction<T, R>,
) {
    type S = T & { [k in K]: R };
    let tmp: T;
    return pipe(
        tap((scope: T) => tmp = scope),
        operator,
        map((response) => ({ ...tmp as object, [key]: response }) as any as { [P in keyof S]: S[P] }),
    );
}

export function omit<T extends object, R>(
    operator: OperatorFunction<T, R>,
) {
    let tmp: T;
    return pipe(
        tap((scope: T) => tmp = scope),
        operator,
        map(() => tmp),
    );
}
