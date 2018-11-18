import { lstat, pathExists } from 'fs-extra';
import glob = require('glob');
import { bindNodeCallback, defer, Observable } from 'rxjs';
import { mergeAll, mergeMap } from 'rxjs/operators';

/**
 * @returns observable collection of file paths
 */
export function getFileList(path: string): Observable<string> {
    return defer(() => getPattern(path)).pipe(mergeMap(globFiles));
}

async function getPattern(path: string): Promise<string> {
    return checkExtension(path) ? path :
        await checkDir(path) ? `${path}/**/*.component.?(ts|html)` :
            `${path}.?(ts|html)`;
}

function checkExtension(path: string): boolean {
    return /\.(ts|html)$/.test(path);
}

async function checkDir(path: string): Promise<boolean> {
    return await pathExists(path) && (await lstat(path)).isDirectory();
}

function globFiles(pattern: string): Observable<string> {
    const glob$ = bindNodeCallback<string, glob.IOptions, string[]>(glob);
    return glob$(pattern, { nodir: true }).pipe(mergeAll());
}
