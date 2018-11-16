#!/usr/bin/env node
import chalk from 'chalk';
import { from } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { getFileList$ } from './getFileList';
import { OPTIONS } from './options';
import { resolver } from './resolveOutPath';
import { upgrade } from './upgradeFile';
import { add, omit, set } from './utils';

from(OPTIONS.paths)
    .pipe(
        map((pattern) => ({ pattern })),
        mergeMap(set('filePath', ({ pattern }) => getFileList$(pattern))),
        map(add('outFilePath', ({ filePath }) => resolver(filePath))),
        mergeMap(omit(({ filePath, outFilePath }) => upgrade(filePath, outFilePath))),
        finalize(() => console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`)),
    )
    .subscribe(({ filePath, outFilePath }) => {
        console.log(chalk.greenBright('\n UPGRADE '), chalk.yellow(filePath), '->');
        console.log(chalk.yellowBright(outFilePath));
    });
