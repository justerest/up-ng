import { ensureDir, readFile, rename, writeFile } from 'fs-extra';
import { dirname, resolve } from 'path';
import { Observable, of } from 'rxjs';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { transformHtml } from './transformHtml';
import { transformTs } from './transformTs';
import { add, omit } from './utils';

export function upgradeFile(options: { filePath: string; outFilePath: string; force: boolean }): Observable<void> {
    return of(options).pipe(
        add('text', mergeMap((s) => readFile(s.filePath, 'UTF-8'))),
        add('transformedText', map((s) => /ts$/.test(s.filePath) ? transformTs(s.text) : transformHtml(s.text))),
        add('record', map((s) => s.force ? forceRecord : safeRecord)),
        omit(mergeMap((s) => s.record(s.outFilePath, s.transformedText))),
        mapTo(null),
    );
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
