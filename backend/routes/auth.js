import express from 'express';
import {signup, login, refresh, logout, resetPassword} from "../controllers/auth.js";

const router = express.Router();
router.post('/signup', signup)
router.post('/login', login)
router.post("/refresh", refresh);
router.post('/logout', logout);
router.post('/resetPassword',resetPassword)

export default router;