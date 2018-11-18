#!/usr/bin/env node
import chalk from 'chalk';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { getFileList } from './getFileList';
import { OPTIONS } from './options';
import { resolve } from './resolve';
import { upgradeFile } from './upgradeFile';
import { scope, set, set$ } from './utils';

from(OPTIONS.paths)
    .pipe(
        map(scope('pattern')),
        mergeMap(set$('filePath', 'pattern', getFileList)),
        map(set('outFilePath', 'filePath', resolve)),
        mergeMap(set$('isSuccess', 'filePath', 'outFilePath', upgradeFile)),
    )
    .subscribe({
        next({ filePath, outFilePath, isSuccess }) {
            const status = isSuccess ? chalk.greenBright('UPGRADE') : chalk.bgRedBright('FAIL');
            console.log(`\n${status}:`);
            console.log(chalk.yellow(filePath), '->');
            console.log(chalk.yellowBright(outFilePath));
        },
        complete() {
            console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
        },
    });
