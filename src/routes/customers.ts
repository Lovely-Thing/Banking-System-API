import { Router } from 'express';
import {
	createCustomer,
	getCustomerById,
	getCustomerByPhone,
	getCustomers,
	loginCustomer,
	updateCustomer,
} from '../controllers/customer';
import { authByToken } from '../middleware/authByToken';

const route = Router();

// POST / --> Create Customer
route.post('/signup', async (req, res) => {
	try {
		const customer = await createCustomer(req.body);
		return res.status(201).json(customer);
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: { body: ['Could not create customer', e.message] },
		});
	}
});

// POST /login --> Customer Login
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

// TEST ONLY GET '/' --> Retrieve all Customers
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

route.get('/:id', authByToken, async (req, res) => {
	if (!req.params.id)
		return res.status(401).json({
			error: { body: ['Please enter a valid ID'] },
		});

	try {
		const customer = await getCustomerById(req.params.id as string);
		res.status(200).json(customer);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

route.get('/phone/:number', async (req, res) => {
	try {
		const customer = await getCustomerByPhone(req.params.number as string);
		res.status(200).json(customer);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

route.patch('/:id', authByToken, async (req, res) => {
	if (!req.body)
		return res.status(400).json({
			message: { body: ['Please enter data to be updated'] },
		});

	// if (!req.params.id)
	// 	return res.status(401).json({
	// 		error: { body: ['Please enter a valid ID'] },
	// 	});

	if (req.params.id !== (req as any).customer.id)
		return res.status(401).json({
			error: { body: ['Authorization Failed'] },
		});

	try {
		const updatedCustomer = await updateCustomer(
			req.params.id as string,
			req.body
		);
		return res.status(201).json(updatedCustomer);
	} catch (e) {
		res.status(400).json({
			message: { body: ['Could not update customer', e.message] },
		});
	}
});

export const customersRoutes = route;
