#!/usr/bin/env node
import chalk from 'chalk';
import commandLineArgs = require('command-line-args');
import { resolve } from 'path';
import { of } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { getFileList } from './getFileList';
import { upgradeFile } from './upgradeFile';
import { add, omit } from './utils';

interface Options {
    paths: string[];
    out: string;
    replace: boolean;
}

(function main() {
    const options = commandLineArgs([
        { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
        { name: 'out', alias: 'o', type: String, defaultValue: '' },
        { name: 'replace', type: Boolean, defaultValue: false },
    ]) as Options;

    of(options)
        .pipe(
            add('filePath', mergeMap(({ paths }) => getFileList({ paths }))),
            add('outFilePath', map((s) => s.out ? resolve(s.out, s.filePath.replace(/^(\.\.\/)+/, '')) : s.filePath)),
            add('force', map((s) => !!(s.out || s.filePath))),
            omit(mergeMap(({ filePath, outFilePath, force }) => upgradeFile({ filePath, outFilePath, force }))),
            finalize(() => console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`)),
        )
        .subscribe((s) => {
            console.log();
            console.log(chalk.greenBright(' UPGRADE '), chalk.yellow(s.filePath), '->');
            console.log(chalk.yellowBright(s.outFilePath));
        });
})();
