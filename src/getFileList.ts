import { existsSync, lstat } from 'fs';
import glob = require('glob');
import { bindNodeCallback, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { add, set } from './utils';

export function getFileList(options: { paths: string[] }): Observable<string> {
    return of(options).pipe(
        mergeMap(set('path', (s) => s.paths)),
        map(add('isExist', (s) => existsSync(s.path))),
        mergeMap(set('isDir', (s) => s.isExist ? checkDir(s.path) : of(false))),
        map(add('getPattern', (s) => s.isDir ? getDirPattern : getComponentPattern)),
        map(add('pattern', (s) => s.getPattern(s.path))),
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
