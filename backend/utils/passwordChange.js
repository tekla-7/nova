import {hash} from "bcryptjs";
import {readUserData, writeUserData} from "./util.js";
import {isValidPassword} from "./validation.js";

export async function passwordHelper(userId,data,isPasswordChange){
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    if (data.currentPassword&&isPasswordChange) {
        const pwIsValid = await isValidPassword(data.currentPassword, storedData[userIndex].password);
        if (!pwIsValid) {
            throw new Error('Current password is not correct')
        }
    }
    let hashedPassword = '';
    try {
        hashedPassword = await hash(data.newPassword, 10);
    } catch (err) {
        throw new Error("Password hashing failed");
    }
    try {
        storedData[userIndex] = {
            ...storedData[userIndex],
            password: hashedPassword,
            lastPasswordChangeAt: new Date().toISOString(),
        };

        await writeUserData(storedData);
        return storedData[userIndex];

    } catch (error) {
        throw new Error(error?.message || 'Could not update user password');
    }
}