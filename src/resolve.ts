import { resolve as resolvePath } from 'path';
import { OPTIONS } from './options';

export const resolve = OPTIONS.out ? resolveOutPath : (path: string) => path;

function resolveOutPath(filePath: string): string {
    const pathFromCurDir = filePath.replace(/^(\.\.\/)+/, '');
    return resolvePath(OPTIONS.out, pathFromCurDir);
}
