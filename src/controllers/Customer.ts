import { getRepository } from 'typeorm';
import { Customer } from '../models/Customer';

interface CustomerSignUpData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	age: string;
}

export async function createCustomer(data: CustomerSignUpData) {
	const { firstName, lastName, email, phone, age } = data;

	if (!firstName) throw new Error('Please Enter First Name of the Customer');
	if (!lastName) throw new Error('Please Enter Last Name of the Customer');
	if (!phone) throw new Error('Please Enter Phone Number of the Customer');
	if (!age) throw new Error('Please Enter the age of the Customer');

	const repo = await getRepository(Customer);

	const existingCustomer = await repo.findOne({ phone });

	if (existingCustomer)
		throw new Error('Customer with the details already exists');
	// TODO: Add multiple accounts feature

	try {
		const customer = new Customer(firstName, lastName, phone, age, email);
		await repo.save(customer);
		return customer;
	} catch (e) {
		console.error(e);
	}
}

export async function getCustomers() {
	const repo = await getRepository(Customer);
	const customers: Customer[] = await repo.find();
	if (customers.length < 1) throw new Error('No Customers in the Bank');
	return customers;
}
