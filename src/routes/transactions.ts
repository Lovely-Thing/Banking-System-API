import { Router } from 'express';
import { createTransaction } from '../controllers/Transaction';

const route = Router();

route.post('/', async (req, res) => {
	try {
		const senderAccountNumber = ''; //TODO: Add Header Details
		const transaction = await createTransaction({
			senderAccountNumber,
			...req.body,
		});
		return res.status(201).json(transaction);
	} catch (e) {
		res.status(400).json({
			message: { body: ['Could not process transaction', e.message] },
		});
	}
});

export const transactionRoutes = route;
