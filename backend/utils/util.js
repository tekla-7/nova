import fs from 'node:fs/promises';
import path from "node:path";

const filePath = path.resolve("data/users.json");
const orderFilePath = path.resolve("data/orders.json");

export async function readUserData() {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

export async function writeUserData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function readOrdersData() {
    const data = await fs.readFile(orderFilePath, 'utf8');
    return JSON.parse(data);
}

export async function writeOrdersData(data) {
    await fs.writeFile(orderFilePath, JSON.stringify(data, null, 2));
}