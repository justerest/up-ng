import { ensureDir, rename, writeFile as extraWriteFile } from 'fs-extra';
import { dirname } from 'path';
import { OPTIONS } from './options';

export const writeFile = OPTIONS.out || OPTIONS.replace ? writeFileForce : writeFileSafe;

async function writeFileForce(path: string, data: string): Promise<void> {
    await ensureDir(dirname(path));
    await extraWriteFile(path, data);
}

async function writeFileSafe(path: string, data: string): Promise<void> {
    await extraWriteFile(`${path}.tmp`, data);
    await backupFile(path);
    await rename(`${path}.tmp`, path);
}

async function backupFile(path: string): Promise<void> {
    await rename(path, path.replace(/\.(\w+)$/, '.old.$1'));
}
