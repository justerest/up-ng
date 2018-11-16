import { existsSync, lstat } from 'fs';
import glob = require('glob');
import { bindNodeCallback, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { add } from './utils';

export function getFileList(options: { paths: string[] }): Observable<string> {
    return of(options).pipe(
        add('path', mergeMap((s) => s.paths)),
        add('isExist', map((s) => existsSync(s.path))),
        add('isDir', mergeMap((s) => s.isExist ? checkDir(s.path) : of(false))),
        add('getPattern', map((s) => s.isDir ? getDirPattern : getComponentPattern)),
        add('pattern', map((s) => s.getPattern(s.path))),
        mergeMap((s) => globByPattern(s.pattern)),
    );
}

function checkDir(path: string): Observable<boolean> {
    return bindNodeCallback(lstat)(path).pipe(map((stat) => stat.isDirectory()));
}

function globByPattern(pattern: string): Observable<string> {
    return bindNodeCallback<string, glob.IOptions, string[]>(glob)(pattern, { nodir: true }).pipe(
        mergeMap((paths) => paths),
    );
}

function getDirPattern(path: string): string {
    return `${path}/**/*.component.?(ts|html)`;
}

function getComponentPattern(path: string): string {
    return /(\.\w{2,4})$/.test(path) ? path : `${path}.?(ts|html)`;
}
