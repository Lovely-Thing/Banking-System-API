import { Router } from 'express';
import {
	createCustomer,
	getCustomers,
	loginCustomer,
} from '../controllers/customer';

const route = Router();

route.post('/', async (req, res) => {
	try {
		const customer = await createCustomer(req.body);
		return res.status(201).json(customer);
	} catch (e) {
		// console.log(e);
		res.status(400).json({
			message: { body: ['Could not create customer', e.message] },
		});
	}
});

route.get('/', async (req, res) => {
	try {
		const customers = await getCustomers();
		return res.status(200).json(customers);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Customers Not Found', e.message] },
		});
	}
});

route.post('/login', async (req, res) => {
	try {
		const customer = await loginCustomer(req.body);
		return res.status(200).json(customer);
	} catch (e) {
		res.status(422).json({
			errors: { body: ['Login Failed', e.message] },
		});
	}
});

export const customersRoutes = route;
