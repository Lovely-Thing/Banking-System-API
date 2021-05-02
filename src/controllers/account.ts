import { Customer } from '../models/Customer';
import { getRepository } from 'typeorm';
import { Account } from '../models/Account';
import { cipherValue, generateKeys } from '../utils/security';
import { createPrivateKeyRow } from './privateKeyTable';
import dotenv from 'dotenv';

dotenv.config();

export async function createAccount(customer: Customer) {
	try {
		const repo = getRepository(Account);
		const { publicKey, privateKey } = await generateKeys(128);
		const balance = await cipherValue(0, publicKey);
		const account = new Account(customer, publicKey, balance);
		await repo.save(account);

		await createPrivateKeyRow(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			account.accountNumber,
			privateKey
		);

		return account;
	} catch (e) {
		console.error(e);
	}
}

export async function getAccountByNumber(accountNumber: string) {
	const repo = getRepository(Account);
	const account = await repo.findOne(accountNumber, {
		relations: ['customer'],
	});
	if (!account) throw new Error('Account not found');
	return account;
}

export async function getAccounts() {
	const repo = getRepository(Account);
	const account = await repo.find();
	if (!account) throw new Error('No Accounts Found');
	return account;
}

export async function getAccountsOfCustomer(customerID: string) {
	const customerRepo = getRepository(Customer);

	const customer = await customerRepo.findOne(customerID);

	if (!customer) throw new Error('Invalid Customer ID');
	try {
		const repo = getRepository(Customer);

		const customer = await repo.findOne(customerID, {
			relations: ['accounts'],
		});

		return (customer as any).accounts;
	} catch (e) {
		console.error(e);
	}
}
