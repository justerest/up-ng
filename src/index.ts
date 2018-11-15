import chalk from 'chalk';
import { from } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { getFileList } from './getFileList';
import { PATHS } from './options';
import { upgradeFile } from './upgradeFile';

from(PATHS).pipe(
    mergeMap(getFileList),
    mergeMap(upgradeFile, (path) => path),
    finalize(() => console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`)),
)
    .subscribe((path) => console.log(chalk.greenBright(' UPGRADE '), chalk.yellowBright(path)));
