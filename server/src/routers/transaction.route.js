import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.js';
import { createTransactoin, getTransaction, getTransactionById, getTransactionByWorkspaceId, updateSaleValue, updateStatus } from '../controllers/transaction.controller.js';
import { transactionCaching} from '../caching/transaction.caching.js'
const router = express.Router();

router.post('/create/:workspace_id', verifyToken, createTransactoin)
router.get('/getTransaction', verifyToken, transactionCaching, getTransaction)
router.get('/getFrom/:workspace_id', getTransactionByWorkspaceId)
router.get('/:id', getTransactionById)
router.put('/:id', updateStatus);
router.put('/sales/:id', verifyToken, updateSaleValue);
export default router;