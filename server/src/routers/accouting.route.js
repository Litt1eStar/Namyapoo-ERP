import express from 'express'
import { create, getAll, getAllAccDataByYear, getItemByFilteringDate } from '../controllers/Account/accounting.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.post(`/create`, verifyToken, create);
router.get(`/getAll`, verifyToken, getAll);
router.get(`/getData/all/:year`, verifyToken, getAllAccDataByYear)
router.get(`/filterDate/:month/:year`, verifyToken, getItemByFilteringDate);

export default router;