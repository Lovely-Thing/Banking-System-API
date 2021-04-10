import { Customer } from '../models/customer';
import { getRepository } from 'typeorm';
import { Account } from '../models/account';
import { generateKeys } from '../utils/security';

export async function createAccount(customer: Customer) {
	try {
		const repo = await getRepository(Account);
		const account = new Account(customer);
		const { publicKey } = await generateKeys(128);
		console.log('generating key', publicKey);
		account.publicKey = {
			n: publicKey.n.toString(),
			g: publicKey.g.toString(),
		};
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
	return account;
}
