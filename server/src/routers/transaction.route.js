import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.js';
import { createTransactoin, getTransaction, getTransactionById, getTransactionByWorkspaceId } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/create/:workspace_id', verifyToken, createTransactoin)
router.get('/getTransaction', verifyToken, getTransaction)
router.get('/getFrom/:workspace_id', getTransactionByWorkspaceId)
router.get('/:id', getTransactionById)
export default router;