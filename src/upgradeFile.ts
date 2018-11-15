import { ensureDir, readFile, rename, writeFile } from 'fs-extra';
import { dirname, resolve } from 'path';
import { from, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OUTDIR, REPLACE } from './options';
import { transformHtml } from './transformHtml';
import { transformTs } from './transformTs';

export function upgradeFile(path: string): Observable<void> {
    return from(readFile(path, 'UTF-8')).pipe(
        map((data) => /ts$/.test(path) ? transformTs(data) : transformHtml(data)),
        switchMap((data) => recordFile(path, data)),
    );
}

function recordFile(path: string, data: string): ObservableInput<void> {
    return OUTDIR || REPLACE ? forceRecord(path, data) : safeRecord(path, data);
}

async function forceRecord(path: string, data: string): Promise<void> {
    const outPath = resolveOutPath(path);
    await ensureDir(dirname(outPath));
    await writeFile(outPath, data);
}

function resolveOutPath(path: string) {
    return OUTDIR ? resolve(OUTDIR, path.replace(/^(\.\.\/)+/, '')) : path;
}

async function safeRecord(path: string, data: string): Promise<void> {
    await writeFile(`${path}.tmp`, data);
    await backupFile(path);
    await rename(`${path}.tmp`, path);
}

async function backupFile(path: string): Promise<void> {
    await rename(path, path.replace(/\.(\w+)$/, '.old.$1'));
}
