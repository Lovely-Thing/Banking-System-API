import { Customer } from '../models/Customer';
import { getRepository } from 'typeorm';
import { Account } from '../models/Account';

export async function createAccount(customer: Customer) {
	try {
		const repo = getRepository(Account);
		const account = new Account(customer);
		await repo.save(account);
		return account;
	} catch (e) {
		console.error(e);
	}
}

export async function getAccountByNumber(accountNumber: string) {
	const repo = getRepository(Account);

	const account = repo.findOne(accountNumber);

	if (!account) throw new Error('Account not found');
}
