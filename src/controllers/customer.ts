import { getRepository } from 'typeorm';
import { Customer } from '../models/Customer';
import { hashPassword, matchPassword } from '../utils/hashPassword';
import { signToken } from '../utils/jwt';
import sanitizeLogin from '../utils/sanitization';
import { createAccount } from './account';

interface CustomerSignUpData {
	firstName: string;
	lastName: string;
	phone: string;
	email?: string;
	age: string;
	password: string;
}

interface UpdateCustomerData {
	firstName?: string;
	lastName?: string;
	email?: string;
	age?: string;
	password?: string; //TODO
	address?: {
		zipCode?: string;
		street?: string;
		city?: string;
		state?: string;
	};
}

interface CustomerLoginData {
	phoneNumber: string;
	password: string;
}

export async function createCustomer(data: CustomerSignUpData) {
	const { firstName, lastName, email, phone, age, password } = data;

	if (!firstName) throw new Error('Please Enter First Name of the Customer');
	if (!lastName) throw new Error('Please Enter Last Name of the Customer');
	if (!phone) throw new Error('Please Enter Phone Number of the Customer');
	if (!age) throw new Error('Please Enter the age of the Customer');
	if (!password) throw new Error('Please Enter the password');

	if (+age < 18 && +age > 65)
		throw new Error('Customer should be above 18 years old');

	const hashedPassword = await hashPassword(password);

	const repo = getRepository(Customer);

	const existingCustomer = await repo.findOne({ phone });

	if (existingCustomer)
		throw new Error('Customer with the details already exists');

	try {
		const customer = new Customer(
			firstName,
			lastName,
			phone,
			age,
			hashedPassword,
			email
		);
		await repo.save(customer);
		await createAccount(customer);
		return customer;
	} catch (e) {
		console.error(e);
	}
}

export async function getCustomers() {
	const repo = getRepository(Customer);
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

export async function getCustomerByPhone(phone: string) {
	const repo = await getRepository(Customer);
	const customer = await repo.findOne({ phone });
	if (!customer)
		throw new Error('No Customer with this Phone Number in the bank');
	return customer;
}

export async function updateCustomer(id: string, data: UpdateCustomerData) {
	const repo = await getRepository(Customer);

	const existingCustomer = await repo.findOne({ id });

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

export async function loginCustomer(data: CustomerLoginData) {
	const { phoneNumber, password } = data;

	if (!phoneNumber) throw new Error('Please enter your phone number');
	if (!password) throw new Error('Please enter a password');

	const repo = getRepository(Customer);

	const customer = await repo.findOne({ phone: phoneNumber });
	if (!customer) throw new Error('Customer with this phone number not found');

	const match = await matchPassword(password, customer.hashedPassword);
	if (!match) throw new Error('Incorrect Password');

	customer.token = await signToken(customer);

	return sanitizeLogin(customer);
}
