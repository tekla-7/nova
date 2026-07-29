import {readTokenData, writeTokenData} from "../utils/refreshToken.js";

import {passwordHelper} from "../utils/passwordChange.js";

export async function saveRefreshToken(userId, token) {
    const store = await readTokenData();
    if (!store[userId]) store[userId] = [];
    store[userId].push({ token, createdAt: new Date().toISOString() });
    await writeTokenData(store);
}

export async function findRefreshToken(token) {
    const store = await readTokenData();
    for (const userId in store) {
        const found = store[userId].find(t => t.token === token);
        if (found) return { userId, ...found };
    }
    return null;
}

export async function deleteRefreshToken(token) {
    const store = await readTokenData();
    console.log(store);
    for (const userId in store) {
        store[userId] = store[userId].filter(t => t.token !== token);
    }

    return  await writeTokenData(store);


}

export async function deleteAllRefreshTokens(userId) {
    const store = await readTokenData();
    delete store[userId];
    await writeTokenData(store);
}
export async function resetPasswordByRecoveryPhrase(userId, data) {
    await passwordHelper(userId, data, false)


}
