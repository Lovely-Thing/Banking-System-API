import { getRepository } from 'typeorm';
import { Customer } from '../models/Customer';
import { createAccount } from './Account';

interface CustomerSignUpData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	age: string;
}

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

export async function createCustomer(data: CustomerSignUpData) {
	const { firstName, lastName, email, phone, age } = data;

	if (!firstName) throw new Error('Please Enter First Name of the Customer');
	if (!lastName) throw new Error('Please Enter Last Name of the Customer');
	if (!phone) throw new Error('Please Enter Phone Number of the Customer');
	if (!age) throw new Error('Please Enter the age of the Customer');

	if (+age < 18) throw new Error('Customer should be above 18 years old');

	const repo = await getRepository(Customer);

	const existingCustomer = await repo.findOne({ phone });

	if (existingCustomer)
		throw new Error('Customer with the details already exists');
	// TODO: Add multiple accounts feature

	try {
		const customer = new Customer(firstName, lastName, phone, age, email);
		await repo.save(customer);
		const account = await createAccount(customer);

		return { account };
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
		console.error(e);
	}
}
