import { Router } from 'express';
import { getCustomerById, updateCustomer } from '../controllers/Customer';

const route = Router();

route.get('/:id', async (req, res) => {
	try {
		const customer = await getCustomerById(req.params.id as string);
		res.status(200).json(customer);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

route.patch('/:id', async (req, res) => {
	if (!req.body)
		return res.status(400).json({
			message: { body: ['Please enter data to be updated'] },
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

export const customerRoutes = route;
