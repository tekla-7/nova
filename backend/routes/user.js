import express from 'express';
import {
    addUserAddresses,
    addUserCart,
    addUserWishlist, deleteUserAddresses, deleteUserCart, deleteUserWishlist, getCart,
    getUser, getWishlist, updateUserCart,
    updateUserDetails,
    updateUserNotificationPreferences
} from "../controllers/user.js";
import {addCart} from "../data/users.js";
const router = express.Router();

router.get('/', getUser);
router.get('/cart', getCart);
router.get('/wishlist', getWishlist);

router.patch('/',updateUserDetails)
router.post('/wishlist', addUserWishlist)
router.post('/cart', addUserCart)
router.post('/addresses', addUserAddresses)
router.patch('/notifications',updateUserNotificationPreferences)
router.patch('/cart/:cartId', updateUserCart)
// DELETE /api/users/me/wishlist/:productId
//  DELETE /api/users/me/cart/:productId
//  DELETE /api/users/me/cart/:addresses
router.delete('/wishlist/:productId',deleteUserWishlist)
router.delete('/cart/:cartId',deleteUserCart)
router.delete('/addresses/:addressesId',deleteUserAddresses)


export default router;