import { readFile, writeFile } from 'fs/promises';
import path from "node:path";


const filePath = path.resolve("data/refreshTokens.json");

export async function readTokenData() {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

export async function writeTokenData(data) {
    await writeFile(filePath, JSON.stringify(data, null, 2));

}
