import express from 'express';
import {getUserOrder} from "../data/orders.js";
import {addOrder} from "../controllers/orders.js";
const router = express.Router();
router.get('/',addOrder)
router.get('/me',getUserOrder)
export default router