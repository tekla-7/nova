import {readOrdersData, readUserData, writeOrdersData, writeUserData} from "../utils/util.js";
import {v4 as uuidv4} from "uuid";

export async function getUserOrders(userId) {
    const orders = await readOrdersData();
    if (!orders || orders.length === 0) {
        return [];
    }

    return orders.filter(order => order?.userId === userId);
}

export async function getUserOrder(userId, orderId) {
    const orders = await readOrdersData();
    if (!orders || orders.length === 0) {
        return new Error('Could not find any orders');
    }
    const order = orders.find((ev) => ev.userId === userId && ev.id === orderId);
    if (!order) {
        return new Error('Could not find any order');
    }

    return {
        ...order, tracking: {
            orderConfirm: {
                date: order.tracking.orderConfirm.date,
                isConfirmed: true,
            },

            processing: {
                date: order.tracking.processing.date,
                isConfirmed: getStatus(order.tracking.processing.date),
            },

            dispatched: {
                date: order.tracking.dispatched.date,
                isConfirmed: getStatus(order.tracking.dispatched.date),
            },

            outForDelivery: {
                date: order.tracking.outForDelivery.date,
                isConfirmed: getStatus(order.tracking.outForDelivery.date),
            },

            delivered: {
                date: order.tracking.delivered.date,
                isConfirmed: getStatus(order.tracking.delivered.date),
            },


        }
    };
}

export async function addNewOrder(userId, order ,userName) {
    const orders = await readOrdersData();
    if (!orders) {
        return new Error('Cannot add order ,try again');
    }
    if (!order) {
        return new Error('order is necessary');
    }
    const tracking = trackingHandler(order.deliveryMethod.price)

    const newProduct = {
        id: uuidv4(),
        userId: userId,
        userName:userName,
        email: order.email,
        phone: order.phone,
        orderNumber: `NV-` + Math.floor(1000 + Math.random() * 9000),
        paid: order.paid,
        payment: order.payment,
        paymentMethod: order.paymentMethod,
        deliveryMethod: order.deliveryMethod,
        items: order.items,
        createdAt: order.createdAt,
        address: order.address,
        tracking: tracking
    }


    orders.push(newProduct);
    try {
        await writeOrdersData(orders);
        return newProduct.id
    } catch (error) {
        return new Error(error?.message || 'Cannot add order ,try again');

    }
}

function trackingHandler(shippingType) {
    const now = new Date();

    const addMinutes = (minutes) => {
        const date = new Date(now);
        date.setMinutes(date.getMinutes() + minutes);
        return date.toISOString();
    };

    const addDays = (days) => {
        const date = new Date(now);
        date.setDate(date.getDate() + days);
        return date.toISOString();
    };

    let delivery;

    if (shippingType === 24) {
        delivery = [now.toISOString(), now.toISOString()];
    } else if (shippingType === 12) {
        delivery = [addDays(1), addDays(2)];
    } else {
        delivery = [addDays(3), addDays(5)];
    }
    return {
        orderConfirm: {
            date: [now.toISOString()],
            isConfirmed: true,
        },

        processing: {
            date: [addMinutes(shippingType === 24 ? 10 : 30)],
            isConfirmed: false,
        },

        dispatched: {
            date: [addMinutes(shippingType === 24 ? 60 : 360)],
            isConfirmed: false,
        },

        outForDelivery: {
            date:
            delivery,
            isConfirmed: false,
        },

        delivered: {
            date:
            delivery,
            isConfirmed: false,
        },
    };
}

function getStatus(date) {

        const today = Date.now();

        if (date.length === 1) {
            const startDate = new Date(date[0]).getTime();
            return startDate < today;
        }

        const endDate = new Date(date[1]).getTime();
        return endDate < today;


}