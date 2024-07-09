import { TransactionService } from "../services/index.js";

const getTransactions = async (req, res) => {
  const userId = req.payload.id;
  try {
    const transactions = await TransactionService.getTransactionsByUserId(userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  getTransactions,
};
