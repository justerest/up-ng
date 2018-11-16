#!/usr/bin/env node
import chalk from 'chalk';
import commandLineArgs = require('command-line-args');
import { of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { getFileList } from './getFileList';
import { upgradeFile } from './upgradeFile';
import { set } from './utils';

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
            mergeMap(set('filePath', (s) => getFileList(s))),
            mergeMap(set('outPath', (s) => upgradeFile(s))),
            finalize(() => console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`)),
        )
        .subscribe((s) => {
            console.log();
            console.log(chalk.greenBright(' UPGRADE '), chalk.yellow(s.filePath), '->');
            console.log(chalk.yellowBright(s.outPath));
        });
})();
