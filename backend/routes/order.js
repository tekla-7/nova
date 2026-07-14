import express from 'express';
import {addOrder, getOrder, getOrders} from "../controllers/orders.js";
const router = express.Router();
router.post('/',addOrder)
router.get('/me',getOrders)
router.get('/:orderId',getOrder)
export default router