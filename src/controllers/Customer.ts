import { getRepository } from 'typeorm';
import { Customer } from '../models/Customer';

interface UpdateCustomerData {
	firstName?: string;
	lastName?: string;
	email?: string;
	age?: string;
	address?: {
		zipCode?: string;
		street?: string;
		city?: string;
		state?: string;
	};
}

export async function getCustomerById(id: string) {
	const repo = await getRepository(Customer);

	const customer = await repo.findOne(id);

	if (!customer) throw new Error('No Customer with this ID in the bank');

	return customer;
}

export async function updateCustomer(id: string, data: UpdateCustomerData) {
	const repo = await getRepository(Customer);

	const existingCustomer = await repo.findOne({ id: id });

	if (!existingCustomer)
		throw new Error('Customer with the given ID does not exist');

	if (data.age && +data.age < 18)
		throw new Error('Customer should be above 18 years old');

	try {
		if (data.firstName) existingCustomer.firstName = data.firstName;
		if (data.lastName) existingCustomer.lastName = data.lastName;
		if (data.email) existingCustomer.email = data.email;
		if (data.age) existingCustomer.age = +data.age;

		await repo.save(existingCustomer);

		return existingCustomer;
	} catch (e) {
		console.log(e);
	}
}
