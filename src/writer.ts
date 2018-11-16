import { ensureDir, rename, writeFile } from 'fs-extra';
import { dirname } from 'path';
import { OPTIONS } from './options';

export const writer = OPTIONS.out || OPTIONS.replace ? writeForce : writeSafe;

async function writeForce(path: string, data: string): Promise<void> {
    await ensureDir(dirname(path));
    await writeFile(path, data);
}

async function writeSafe(path: string, data: string): Promise<void> {
    await writeFile(`${path}.tmp`, data);
    await backupFile(path);
    await rename(`${path}.tmp`, path);
}

async function backupFile(path: string): Promise<void> {
    await rename(path, path.replace(/\.(\w+)$/, '.old.$1'));
}
