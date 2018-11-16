import { readFile } from 'fs-extra';
import { transformHtml } from './transformHtml';
import { transformTs } from './transformTs';
import { writer } from './writer';

export async function upgrade(filePath: string, outFilePath: string) {
    try {
        const text = await readFile(filePath, 'UTF-8');
        const transformer = /ts$/.test(filePath) ? transformTs : transformHtml;
        const data = transformer(text);
        return await writer(outFilePath, data);
    }
    catch (e) {
        console.error(filePath, outFilePath);
        console.error(e);
    }
}
