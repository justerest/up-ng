#!/usr/bin/env node
import chalk from 'chalk';
import { from } from 'rxjs';
import { getFileList } from './getFileList';
import { OPTIONS } from './options';
import { resolve } from './resolve';
import { upgradeFile } from './upgradeFile';
import { mergeSet, scanSet, set, setAll } from './utils';

from(OPTIONS.paths)
    .pipe(
        setAll('pattern'),
        mergeSet('filePath', ({ pattern }) => getFileList(pattern)),
        set('outFilePath', ({ filePath }) => resolve(filePath)),
        mergeSet('isSuccess', ({ filePath, outFilePath }) => upgradeFile(filePath, outFilePath)),
        scanSet('counter', (acc, { pattern }) => {
            const index = acc[pattern] || 0;
            return ({ ...acc, [pattern]: index + 1 });
        }, {} as Record<string, number>),
    )
    .subscribe({
        next({ filePath, outFilePath, isSuccess, counter, pattern }) {
            const status = isSuccess ? chalk.greenBright('UPGRADE') : chalk.bgRedBright('FAIL');
            console.log(counter[pattern]);
            console.log(`\n${status}:`);
            console.log(chalk.yellow(filePath), '->');
            console.log(chalk.yellowBright(outFilePath));
        },
        complete() {
            console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
        },
    });
