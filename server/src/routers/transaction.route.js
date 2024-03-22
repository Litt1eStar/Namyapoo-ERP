import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.js';
import { createTransactoin, getTransaction, getTransactionById } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createTransactoin)
router.get('/getTransaction', verifyToken, getTransaction)
router.get('/:id', getTransactionById)
export default router;