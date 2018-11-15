import { lstat, pathExists } from 'fs-extra';
import glob = require('glob');
import { from, Observable } from 'rxjs';
import { defaultIfEmpty, filter, map, mergeAll, switchMap } from 'rxjs/operators';

export function getFileList(path: string): Observable<string> {
    return getPattern(path).pipe(
        switchMap(globFiles),
        mergeAll(),
    );
}

function globFiles(pattern: string): Promise<string[]> {
    return new Promise((res) => glob(pattern, { nodir: true }, (_, matches) => res(matches)));
}

function getPattern(path: string): Observable<string> {
    return from(pathExists(path)).pipe(
        filter(Boolean),
        switchMap(() => lstat(path)),
        map((stat) => stat.isDirectory()),
        defaultIfEmpty(false),
        map((isDir) => isDir ? dirPattern(path) : componentPattern(path)),
    );
}

function dirPattern(path: string): string {
    return `${path}/**/*.component.?(ts|html)`;
}

function componentPattern(path: string): string {
    return /(\.\w{2,4})$/.test(path) ? path : `${path}.?(ts|html)`;
}
