///@desc get   user orders
///@route GET /api/order/me
import {addNewOrder, getUserOrder, getUserOrders} from "../data/orders.js";
import {getUserById} from "../data/users.js";

export const getOrders = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const orders = await getUserOrders(userId);
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
    let userName = '';
    try {
        const user = await getUserById(userId);
        userName = user.name + ' ' + user.lastName
    } catch (error) {
    }
    try {
        const id = await addNewOrder(userId, req.body, userName);
        return res.status(200).json(id);

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}
////@desc get order by id
////@router get api/order
export const getOrder = async (req, res, next) => {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    try {
        const order = await getUserOrder(userId, orderId);

        return res.status(200).json(order);

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}