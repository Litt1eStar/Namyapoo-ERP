import experss from 'express'

import { createOrder, getAllOrder } from '../controllers/order.controller.js'
import { verifyToken } from "../middlewares/verifyToken.js";
const router = experss.Router();

router.get('/getAllOrder/:workspace_id', verifyToken, getAllOrder)
router.post('/create/:workspace_id', verifyToken, createOrder);

export default router;