import { Customer } from '../models/customer';
import { getRepository } from 'typeorm';
import { Account } from '../models/account';
import { generateKeys, cipherValue } from '../utils/security';
import { hashPassword } from '../utils/hashPassword';
import { createPrivateKeyRow } from './PrivateKeyTable';

export async function createAccount(customer: Customer, pin: string) {
	if (pin.length !== 6) throw new Error('Pin should only be of length 6');

	try {
		const repo = await getRepository(Account);
		const { publicKey, privateKey } = await generateKeys(128);
		const balance = await cipherValue(0, publicKey);
		const hashedPin = await hashPassword(pin);
		const account = new Account(customer, publicKey, balance, hashedPin);
		const privateKeyRow = await createPrivateKeyRow(pin, privateKey);
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
