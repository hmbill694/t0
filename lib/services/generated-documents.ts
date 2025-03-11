import { readdir } from 'node:fs/promises';
import { Result } from '../utils/result';

export async function getFileNames(directoryPath: string): Promise<string[]> {
    const readFileResult = await Result.fromAsync(() => readdir(directoryPath))
    return readFileResult.getOrThrow()
}