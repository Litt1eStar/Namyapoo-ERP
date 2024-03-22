import express from 'express'
import { getUesr } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js'
const router = express.Router();

router.get(`/getUser`, verifyToken, getUesr);
export default router;