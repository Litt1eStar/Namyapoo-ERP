import experss from 'express'

import { createOrder, getAllOrder } from '../controllers/order.controller.js'

const router = experss.Router();

router.get('/getAllOrder/:workspace_id', getAllOrder)
router.post('/create/:workspace_id', createOrder);

export default router;