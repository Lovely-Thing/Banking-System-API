import { Router } from 'express';
import { authByToken } from '../middleware/authByToken';
import {
	createAccount,
	getAccountByNumber,
	getAccounts,
	getAccountsOfCustomer,
} from '../controllers/account';
import { matchPassword } from '../utils/hashPassword';
import { getRepository } from 'typeorm';
import { Customer } from '../models/Customer';
import { Account } from '../models/Account';

const route = Router();

// POST / --> Create Account
route.post('/', authByToken, async (req, res) => {
	if (!req.body.id)
		return res.status(401).json({
			error: { body: ['Please enter a valid ID'] },
		});

	if (req.body.id !== (req as any).customer.id)
		return res.status(401).json({
			error: { body: ['Authorization Failed'] },
		});

	const customer = (await getRepository(Customer).findOne({
		id: req.body.id,
	})) as Customer;

	if (!customer)
		return res.status(404).json({
			error: { body: ['Customer Not Found'] },
		});

	const match = await matchPassword(req.body.password, customer.hashedPassword);

	if (!match)
		return res.status(401).json({
			error: { body: ['Incorrect Password'] },
		});

	try {
		const account = (await createAccount(customer)) as Account;
		res.status(200).json(account);
	} catch (e) {
		res.status(400).json({
			message: { body: ['Could not create account', e.message] },
		});
	}
});

// GET /:accountNumber --> Get Details of an account
route.get('/:accountNumber', authByToken, async (req, res) => {
	try {
		const accountNumber = req.params.accountNumber;
		const account = await getAccountByNumber(accountNumber);
		res.status(200).json(account);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

// TEST GET / --> Get all Accounts
route.get('/', async (req, res) => {
	try {
		const accounts = await getAccounts();
		res.status(200).json(accounts);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

route.get('/customer/:customerId', authByToken, async (req, res) => {
	if (!req.params.customerId)
		return res.status(401).json({
			error: { body: ['Please enter a valid Customer ID'] },
		});

	if ((req as any).customer.id !== req.params.customerId)
		return res.status(401).json({
			error: {
				body: ['You are not authorised to access the customer accounts'],
			},
		});

	try {
		const customerId = req.params.customerId;
		const accounts = await getAccountsOfCustomer(customerId);
		res.status(200).json(accounts);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

export const accountsRoutes = route;
