import { resolve } from 'path';
import { OPTIONS } from './options';

export const resolver = OPTIONS.out ? resolveOutPath : (path: string) => path;

function resolveOutPath(filePath: string): string {
    const pathFromCurDir = filePath.replace(/^(\.\.\/)+/, '');
    return resolve(OPTIONS.out, pathFromCurDir);
}
