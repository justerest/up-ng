import chalk from 'chalk';
import { readFile } from 'fs-extra';
import { transformHtml } from './transformHtml';
import { transformTs } from './transformTs';
import { writeFile } from './writeFile';

/**
 * @returns success status of operation
 */
export async function upgradeFile(filePath: string, outFilePath: string): Promise<boolean> {
    try {
        const data = await readFile(filePath, 'UTF-8');
        const transform = /\.ts$/.test(filePath) ? transformTs : transformHtml;
        const transformedData = transform(data);
        await writeFile(outFilePath, transformedData);
        return true;
    }
    catch (e) {
        return false;
    }
}
