import { existsSync, lstat } from 'fs';
import glob = require('glob');
import { bindNodeCallback, from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export function getFileList$(path: string): Observable<string> {
    return from(getFileList(path)).pipe(
        mergeMap((filePaths) => filePaths),
    );
}

async function getFileList(path: string): Promise<string[]> {
    const isDir = existsSync(path) && await checkDir(path);

    const pattern = isDir
        ? `${path}/**/*.component.?(ts|html)`
        : /(\.\w{2,4})$/.test(path) ? path : `${path}.?(ts|html)`;

    return getAllFiles(pattern);
}

function checkDir(path: string): Promise<boolean> {
    return bindNodeCallback(lstat)(path).pipe(map((stat) => stat.isDirectory())).toPromise();
}

function getAllFiles(pattern: string): Promise<string[]> {
    return bindNodeCallback<string, glob.IOptions, string[]>(glob)(pattern, { nodir: true }).toPromise();
}
