import { ensureDir, readFile, rename, writeFile } from 'fs-extra';
import { dirname, resolve } from 'path';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { transformHtml } from './transformHtml';
import { transformTs } from './transformTs';
import { add, omit, set } from './utils';

export function upgradeFile(options: { filePath: string; out: string; replace: boolean }): Observable<string> {
    return of({}).pipe(
        mergeMap(set('text', () => readFile(options.filePath, 'UTF-8'))),
        map(add('transformedText', (s) => /ts$/.test(options.filePath) ? transformTs(s.text) : transformHtml(s.text))),
        map(add('outPath', () => resolveOutPath(options.filePath, options.out))),
        map(add('recorder', () => options.out || options.replace ? forceRecord : safeRecord)),
        mergeMap(omit((s) => s.recorder(s.outPath, s.transformedText))),
        map((s) => s.outPath),
    );
}

function resolveOutPath(path: string, out: string): string {
    return out ? resolve(out, path.replace(/^(\.\.\/)+/, '')) : path;
}

async function forceRecord(path: string, data: string): Promise<void> {
    await ensureDir(dirname(path));
    await writeFile(path, data);
}

async function safeRecord(path: string, data: string): Promise<void> {
    await writeFile(`${path}.tmp`, data);
    await backupFile(path);
    await rename(`${path}.tmp`, path);
}

async function backupFile(path: string): Promise<void> {
    await rename(path, path.replace(/\.(\w+)$/, '.old.$1'));
}
