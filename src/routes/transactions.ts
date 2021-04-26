import { Router } from 'express';
import { TransactionTypes } from '../models/Transaction';
import {
	createTransaction,
	getTransactions,
	getTransactionsOfAccount,
} from '../controllers/transaction';
import { authByToken } from '../middleware/authByToken';

const route = Router();

// Test GET / --> Retrieve All Transactions
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

	// TODO: Add check to match account owner and logged in customer

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

route.post('/withdraw', authByToken, async (req, res) => {
	if (!req.body)
		return res.status(400).json({
			message: { body: ['Please provide the transaction details'] },
		});

	const { senderAccount, amount, negativeMultiplier } = req.body;

	if (!senderAccount)
		return res.status(400).json({
			message: { body: ['Please provide the sender account details'] },
		});

	if (!amount)
		return res.status(400).json({
			message: { body: ['Please provide the amount in encrypted form'] },
		});

	// TODO: Add check to match account owner and logged in customer

	try {
		const transaction = await createTransaction({
			senderAmount: amount,
			senderAccountNumber: senderAccount,
			transactionType: TransactionTypes.WITHDRAWAL,
			negativeMultiplier,
		});

		res.status(200).json(transaction);
	} catch (e) {
		return res.status(500).json({
			message: { body: ['Transaction Unsuccessful'] },
		});
	}
});

route.post('/transfer', authByToken, async (req, res) => {
	if (!req.body)
		return res.status(400).json({
			message: { body: ['Please provide the transaction details'] },
		});

	const {
		senderAccount,
		senderAmount,
		receiverAccount,
		receiverAmount,
		negativeMultiplier,
	} = req.body;

	if (!senderAccount)
		return res.status(400).json({
			message: { body: ['Please provide the sender account details'] },
		});

	if (!senderAmount)
		return res.status(400).json({
			message: { body: ['Please provide the amount in encrypted form'] },
		});

	if (!receiverAccount)
		return res.status(400).json({
			message: { body: ['Please provide the sender account details'] },
		});

	if (!receiverAmount)
		return res.status(400).json({
			message: { body: ['Please provide the amount in encrypted form'] },
		});

	// TODO: Add check to match account owner and logged in customer

	try {
		const transaction = await createTransaction({
			senderAmount: senderAmount,
			senderAccountNumber: senderAccount,
			transactionType: TransactionTypes.TRANSFER,
			receiverAccountNumber: receiverAccount,
			receiverAmount: receiverAmount,
			negativeMultiplier,
		});

		// res.status(200).json(transaction);
		res.status(200).json({});
	} catch (e) {
		return res.status(500).json({
			message: { body: ['Transaction Unsuccessful'] },
		});
	}
});

route.get('/:accountNumber', authByToken, async (req, res) => {
	const accountNumber = req.params.accountNumber;

	try {
		const transactions = await getTransactionsOfAccount(accountNumber);
		res.status(200).json(transactions);
	} catch (e) {
		return res.status(500).json({
			message: { body: ['Cannot Pull the transactions', e.message] },
		});
	}
});

export const transactionRoutes = route;
