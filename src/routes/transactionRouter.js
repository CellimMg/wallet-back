import { Router } from 'express';
import validateToken from '../middlewares/verificationMiddleware.js';
import { readTransactions, createTransaction } from '../controllers/transactionController.js';

const router = Router();



router.post("/transactions", validateToken, createTransaction);
router.get("/transactions", validateToken, readTransactions);

export default router;