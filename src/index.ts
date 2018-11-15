import chalk from 'chalk';
import commandLineArgs = require('command-line-args');
import { transformTemplate } from 'create-angular-template';
import { ensureDir, lstat, pathExists, readFile, rename, writeFile } from 'fs-extra';
import * as glob from 'glob';
import { dirname, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { defaultIfEmpty, filter, finalize, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';

interface Options {
    paths: string[];
    out: string;
    replace: boolean;
}

const { paths: PATHS, out: OUTDIR, replace: REPLACE } = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'out', alias: 'o', type: String, defaultValue: '' },
    { name: 'replace', type: Boolean, defaultValue: false },
]) as Options;

(function main() {
    from(PATHS).pipe(
        mergeMap(getFileList),
        mergeMap(upgradeFile, (path) => path),
        finalize(() => console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`)),
    )
        .subscribe((path) => console.log(chalk.greenBright('UPGRADE'), chalk.yellowBright(path)));
})();

function upgradeFile(path: string): Observable<void> {
    return from(readFile(path, 'UTF-8')).pipe(
        map((data) => /ts$/.test(path) ? upgradeTs(data) : upgradeHtml(data)),
        switchMap((data) => OUTDIR || REPLACE ? forceRecord(path, data) : safeRecord(path, data)),
    );
}

async function forceRecord(path: string, data: string): Promise<void> {
    const outPath = resolve(OUTDIR, path.replace(/^(\.\.\/)+/, ''));
    await ensureDir(dirname(outPath));
    await writeFile(outPath, data);
}

async function safeRecord(path: string, data: string): Promise<void> {
    await writeFile(`${path}.tmp`, data);
    await backupFile(path);
    await rename(`${path}.tmp`, path);
}

async function backupFile(path: string): Promise<void> {
    await rename(path, path.replace(/\.(\w+)$/, '.old.$1'));
}

function upgradeHtml(data: string): string {
    return transformTemplate(data)
        .replace(/async\s*:\s*this/g, 'async');
}

function upgradeTs(data: string): string {
    return data.replace(/ng-metadata/g, '@angular');
}

function getFileList(path: string): Observable<string> {
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

function componentPattern(path: string): string {
    return /(\.\w{2,4})$/.test(path) ? path : `${path}.?(ts|html)`;
}

function dirPattern(path: string): string {
    return `${path}/**/*.component.?(ts|html)`;
}
