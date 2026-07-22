import {
    addAddresses, addCard,
    addCart,
    addWishlist, changeCartProductQuantity, deleteAddressesItem, deleteCard, deleteCartItem,
    deleteWishlistItem,
    getUserById, updateAddresses,
    updateNotification, updatePassword,
    updateUser
} from "../data/users.js";


///@desc get   user
///@route GET /api/user/me
export const getUser = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const user = await getUserById(userId);
        return res.json(user);

    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc get   user cart
///@route GET /api/user/me/cart
export const getCart = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const response = await getUserById(userId);
        return res.json(response.cart);
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc get   user wishlist
///@route GET /api/user/me/wishlist
export const getWishlist = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const response = await getUserById(userId);
        return res.json(response.wishlist);
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}

///@desc update   user
///@route PATCH /api/user/me
export const updateUserDetails = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('User details is required.');
        error.status = 400;
        return next(error);
    }
    const allowedFields = ["name", "lastName", "phoneNumber", "email", 'password'];
    const data = {};
    allowedFields.forEach(field => {
        if (req.body[field]) {
            data[field] = req.body[field];
        }
    });

    try {
        const updatedUserData = await updateUser(userId, data);
        return res.status(200).json({
            message: "User updated successfully"
        });
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}

///@desc update   user password
///@route PATCH /api/user/me/password
export const updateUserPassword = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('User details is required.');
        error.status = 400;
        return next(error);
    }
    if (!req.body.currentPassword) {
        const error = new Error('Current password is required.');
        error.status = 400;
        return next(error);
    }
    if(req.body.currentPassword === req.body.newPassword) {
        const error = new Error('New password need to be different.');
        error.status = 400;
        return next(error);
    }
    try {
      await updatePassword(userId, req.body);

        return res.status(200).json({message: "Password updated successfully"});
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc add   user wishlist
///@route POST /api/user/me/wishlist
export const addUserWishlist = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('Product is required.');
        error.status = 400;
        return next(error);
    }
    try {
        await addWishlist(userId, req.body);
        return res.status(200).json({message: 'Wishlist added'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}
///@desc add   user cart
///@route POST /api/user/me/cart
export const addUserCart = async (req, res, next) => {
    const userId = req.user.id;
    console.log(req.body)
    if (!Object.keys(req.body).length) {
        const error = new Error('Product is required.');
        error.status = 400;
        return next(error);
    }
    try {
        await addCart(userId, req.body);
        return res.status(200).json({message: 'ShoppingBag added'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc add   user addresses
///@route POST /api/user/me/addresses
export const addUserAddresses = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('Data is required.');
        error.status = 400;
        return next(error);
    }
    try {
        await addAddresses(userId, req.body);
        return res.status(200).json({message: 'Address added'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }
}

///@desc add   user card
///@route POST /api/user/me/card
export const  addUserCard = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('Card is required.');
        error.status = 400;
        return next(error);
    }
    try {
        await addCard(userId, req.body);

        return res.status(200).json({message: 'Card added'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc update   user addresses
///@route PATCH /api/user/me/addresses
export const updateUserAddresses = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('Product is required.');
        error.status = 400;
        return next(error);
    }
    const addressesId = req.params.addressesId;
    if (!addressesId) {
        const error = new Error('Id is required.');
        error.status = 400;
        return next(error);
    }
    try {
        await updateAddresses(userId,addressesId, req.body);
        return res.status(200).json({message: 'Update address'});
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}
///@desc update   user Notification
///@route PATCH /api/user/me/notification
export const updateUserNotificationPreferences = async (req, res, next) => {
    const userId = req.user.id;
    if (!Object.keys(req.body).length) {
        const error = new Error('User notification is required.');
        error.status = 400;
        return next(error);
    }

    try {
        const updatedUserData = await updateNotification(userId, req.body);
        return res.status(200).json({user: updatedUserData});
    } catch (error) {
        error.status = 404;
        return next(error);
    }
}


///@desc delete   user wishlist
///@route DELETE /api/user/me/wishlist/:productId
export const deleteUserWishlist = async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    if (!productId) {
        const error = new Error('Product id required.');
        error.status = 400;
        return next(error);
    }
    try {
        await deleteWishlistItem(userId, productId);
        return res.status(200).json({message: 'Wishlist deleted'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}
///@desc delete   user cartItem
///@route DELETE /api/user/me/cart/:productId
export const deleteUserCart = async (req, res, next) => {
    const userId = req.user.id;
    const cartId = req.params.cartId;
    if (!cartId) {
        const error = new Error('Product id required.');
        error.status = 400;
        return next(error);
    }
    try {
        await deleteCartItem(userId, cartId);
        return res.status(200).json({message: 'ShoppingBag deleted'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}
///@desc delete   user addresses
///@route DELETE /api/user/me/addresses/:addressesId
export const deleteUserAddresses = async (req, res, next) => {
    const userId = req.user.id;
    const addressesId = req.params.addressesId;
    if (!addressesId) {
        const error = new Error('Product id required.');
        error.status = 400;
        return next(error);
    }
    try {
        await deleteAddressesItem(userId, addressesId);
        return res.status(200).json({message: 'Addresses deleted'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}
///@desc delete   user card
///@route DELETE /api/user/me/card/:cardId
export const deleteUserCard = async (req, res, next) => {
    const userId = req.user.id;
    const cardId = req.params.cardId;
    if (!cardId) {
        const error = new Error('Card id required.');
        error.status = 400;
        return next(error);
    }
    try {
        await deleteCard(userId, cardId);
        return res.status(200).json({message: 'card deleted'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}
///@desc change  cart item quantity
///@route PATCH /api/user/me/cart/:productId
export const updateUserCart = async (req, res, next) => {
    const userId = req.user.id;
    const cartId = req.params.cartId;
    const quantity = Number(req.body.quantity)

    if (!cartId) {
        const error = new Error('Product id required.');
        error.status = 400;
        return next(error);
    }
    if (quantity === undefined) {
        const error = new Error('Quantity is required.');
        error.status = 400;
        return next(error);
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
        const error = new Error('Quantity must be greater than 0.');
        error.status = 400;
        return next(error);
    }
    try {
        await changeCartProductQuantity(userId, cartId, quantity);
        return res.status(200).json({message: 'ShoppingBag quantity update'});

    } catch (error) {
        error.status = 404;
        return next(error);
    }

}