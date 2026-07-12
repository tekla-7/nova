///@desc get   user orders
///@route GET /api/order/me

import {addNewOrder, getUserOrder} from "../data/orders.js";

export const getOrder = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const orders = await getUserOrder(userId);
        return res.json({orders});

    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc add orders
///@route add /api/orders
export const addOrder = async (req, res, next) => {
    const userId = req.user.id;

    if (!Object.keys(req.body).length) {
        const error = new Error('Product is required.');
        error.status = 400;
        return next(error);
    }
    try {
        await addNewOrder(userId ,req.body);
        return res.status(200).json({message: 'Order added'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}