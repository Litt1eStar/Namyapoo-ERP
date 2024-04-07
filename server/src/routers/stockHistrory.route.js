import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.js'
import { getAll, create } from '../controllers/stockHistory.controller.js';
import { stockHistoryCaching } from '../caching/stockHistory.caching.js'
const router = express.Router();

router.get('/getAll', verifyToken, stockHistoryCaching, getAll)
router.post('/create', verifyToken, create);

export default router;