import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.js';
import { createTransactoin, getTransaction } from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createTransactoin)
router.get('/:id', verifyToken, getTransaction)

export default router;