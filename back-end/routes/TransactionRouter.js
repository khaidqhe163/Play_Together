import express from 'express'
import jwt from '../middleware/jwt.js';
import {TransactionController} from '../controllers/index.js';

const TransactionRouter = express.Router();

// TransactionRouter.post('/', jwt.verifyAccessToken, TransactionController.getTransactions);
TransactionRouter.get('/', jwt.verifyAccessToken, TransactionController.getTransactions);

export default TransactionRouter;