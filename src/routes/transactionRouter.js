import { Router } from 'express';
import validateToken from '../middlewares/verificationMiddleware.js';
import { createTransaction } from '../controllers/transactionController.js';

const router = Router();



router.post("/transactions", validateToken, createTransaction);

export default router;