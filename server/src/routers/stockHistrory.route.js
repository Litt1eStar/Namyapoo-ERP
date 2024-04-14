import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.js'
import { getAll, create, getDataByYear, getDataFromMonthAndYear } from '../controllers/stockHistory.controller.js';
import { stockHistoryCaching } from '../caching/stockHistory.caching.js'
const router = express.Router();

router.get('/getAll', verifyToken, getAll);
router.get('/getData/:year/:product', verifyToken, getDataByYear);
router.get('/getDataFromMonthAndYear/:month/:year/:product', verifyToken, getDataFromMonthAndYear);
router.post('/create', verifyToken, create);

export default router;