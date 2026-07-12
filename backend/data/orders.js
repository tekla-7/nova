import {readOrdersData, readUserData, writeOrdersData, writeUserData} from "../utils/util.js";

export async function getUserOrder(userId) {
    const orders = await readOrdersData();
    if (!orders || orders.length === 0) {
        return [];
    }

    return orders.filter(order => order?.userId === userId);
}

export async function addNewOrder(product) {
    const orders = await readOrdersData();
    if (!orders) {
        return new Error('Cannot add order ,try again');
    }
    orders.push(product);
    try {
        return await writeOrdersData(orders);
    } catch (error) {
        return new Error(error?.message||'Cannot add order ,try again');

    }
}