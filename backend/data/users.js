import {readUserData, writeUserData} from "../utils/util.js";
import {NotFoundError} from "../utils/errors.js";
import {v4 as uuidv4} from 'uuid';
import {hash} from "bcryptjs";
import {isValidEmail, isValidPassword} from "../utils/validation.js";

export async function getUser(email) {
    const storedData = await readUserData();
    if (!storedData || storedData.length === 0) {
        throw new NotFoundError('Could not find any users.');
    }
    const user = storedData.find((ev) => ev.email === email);
    if (!user) {
        throw new NotFoundError('Could not find user for email ' + email);
    }
    return user;
}

export async function addUser(data) {
    const storedData = await readUserData();
    let hashedPassword;
    try {
        hashedPassword = await hash(data.password, 10);
    } catch (err) {
        throw new Error("Password hashing failed");
    }
    const createdAt = new Date().toISOString();
    const newUser = {
        id: uuidv4(),
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,
        notificationPreferences: {
            "orderUpdates": true,
            "promotions": true,
            "wishlist": true,
            "newsletter": true
        },
        addresses: [...(data?.addresses || [])],
        cart: [...(data?.cart || [])],
        card: [...(data?.card || [])],
        wishlist: [...(data?.wishlist || [])],
        lastPasswordChangeAt: createdAt,
        lastUpdatedAt: createdAt,
        createdAt: createdAt,
    }
    storedData.push(newUser);
    try {
        await writeUserData(storedData);
    } catch (err) {
        throw new Error('Could not write user data');

    }

    return newUser

}

export async function getUserById(id) {
    const storedData = await readUserData();
    if (!storedData || storedData.length === 0) {
        throw new NotFoundError('Could not find any users.');
    }
    const user = storedData.find((ev) => ev.id === id);
    if (!user) {
        throw new NotFoundError('Could not find user for email ' + id);
    }
    const {password, ...safeUser} = user;
    return safeUser;

}

export async function updateUser(userId, data) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    if (data.email && storedData[userIndex].email !== data?.email) {
        if (!isValidEmail(data?.email)) throw new Error('Invalid email format.');
        if (!data.password) throw new Error('Password is necessary');
        const pwIsValid = await isValidPassword(data.password, storedData[userIndex].password);
        if (!pwIsValid) {
            throw new Error('Invalid password.')
        }
    }
    const { password, ...dataWithoutPassword } = data;
    try {
        storedData[userIndex] = {
            ...storedData[userIndex],
            ...dataWithoutPassword,
            lastUpdatedAt: new Date().toISOString(),
        };

        await writeUserData(storedData);
        return storedData[userIndex];

    } catch (error) {
        throw new Error(error?.message || 'Could not update user data');
    }

}
export async function updatePassword(userId,data){
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    if (data.currentPassword) {
        const pwIsValid = await isValidPassword(data.currentPassword, storedData[userIndex].password);
        if (!pwIsValid) {
            throw new Error('Current password is not correct')
        }
    }
    let hashedPassword='';
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
export async function addWishlist(userId, product) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const itemIndex = storedData[userIndex].wishlist.findIndex(ev => ev.productId === product.productId);
    if (itemIndex === -1) {
        storedData[userIndex].wishlist.push(product)
    } else {
        storedData[userIndex].wishlist.splice(itemIndex, 1);
    }
    try {


        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}

export async function addCart(userId, products) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const cart = storedData[userIndex].cart;

    for (const product of products) {
        const productIndex = cart.findIndex(
            el =>
                el.product.productId === product.product.productId &&
                el.size === product.size &&
                el.color === product.color
        );

        if (productIndex !== -1) {
            cart[productIndex].quantity += product.quantity;
        } else {
            cart.push({
                id: uuidv4(),
                ...product,
            });
        }
    }

    storedData[userIndex].cart = cart;
    // const productIndex = cart.findIndex(el => {
    //
    //     return el.product.productId === product.product.productId
    //         && el.size === product.size && el.color === product.color;
    // })
    //
    // if (productIndex === -1) {
    //     cart.push({id: uuidv4(), ...product})
    // } else {
    //     cart[productIndex].quantity += product.quantity;
    // }


    try {
        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}

export async function addAddresses(userId, addresses) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    try {
        const newAddress = {
            id: uuidv4(),
            ...addresses
        };

        storedData[userIndex].addresses.push(newAddress)
        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateNotification(userId, notification) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }

    try {
        storedData[userIndex] = {
            ...storedData[userIndex],
            notificationPreferences: notification
        };

        await writeUserData(storedData);
        return storedData[userIndex];

    } catch (error) {
        throw new Error(error?.message || 'Could not update user notification');
    }
}

export async function deleteWishlistItem(userId, productId) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const id = Number(productId);

    const itemIndex = storedData[userIndex].wishlist.findIndex(ev => ev.productId === id);
    if (itemIndex === -1) {
        throw new Error('Cannot found this wishlist item')
    }
    try {
        storedData[userIndex].wishlist.splice(itemIndex, 1);
        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteCartItem(userId, productId) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    try {
        storedData[userIndex].cart = storedData[userIndex].cart.filter(
            item => item.id !== productId
        );
        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteAddressesItem(userId, id) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    try {
        storedData[userIndex].addresses = storedData[userIndex].addresses.filter(item => item?.id !== id);
        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}

export async function changeCartProductQuantity(userId, productId, quantity) {
    const storedData = await readUserData();
    const userIndex = storedData.findIndex(ev => ev.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const cart = storedData[userIndex].cart;
    const productIndex = cart.findIndex(el => el.id === productId)

    if (productIndex === -1) {
        throw new Error('Product not found');
    } else {
        cart[productIndex].quantity = quantity;
    }

    try {
        await writeUserData(storedData);
        return storedData[userIndex];
    } catch (error) {
        throw new Error(error)
    }
}