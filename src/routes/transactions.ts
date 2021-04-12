import { Router } from 'express';
import { Transaction, TransactionTypes } from '../models/Transaction';
import { createTransaction, getTransactions } from '../controllers/transaction';
import { authByToken } from '../middleware/authByToken';
// import { createTransaction } from '../controllers/transaction';

const route = Router();

route.get('/', async (req, res) => {
	try {
		const transactions = await getTransactions();
		return res.status(201).json(transactions);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Could not get transactions'] },
		});
	}
});

route.post('/deposit', authByToken, async (req, res) => {
	if (!req.body)
		return res.status(400).json({
			message: { body: ['Please provide the transaction details'] },
		});

	const { senderAccount, amount } = req.body;

	if (!senderAccount)
		return res.status(400).json({
			message: { body: ['Please provide the sender account details'] },
		});

	if (!amount)
		return res.status(400).json({
			message: { body: ['Please provide the amount in encrypted form'] },
		});

	try {
		const transaction = await createTransaction({
			senderAmount: amount,
			senderAccountNumber: senderAccount,
			transactionType: TransactionTypes.DEPOSIT,
		});

		res.status(200).json(transaction);
	} catch (e) {
		return res.status(500).json({
			message: { body: ['Transaction Unsuccessful'] },
		});
	}
});

export const transactionRoutes = route;
