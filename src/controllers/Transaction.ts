import { Customer } from '../models/Customer';
import { getRepository } from 'typeorm';
import { Account } from '../models/Account';
import { Transaction } from '../models/Transaction';

interface TransactionData {
	amount: number;
	senderAccountNumber: string;
	receiverAccountNumber: string;
}

export async function createTransaction(data: TransactionData) {
	const { amount, senderAccountNumber, receiverAccountNumber } = data;

	const accountRepo = await getRepository(Account);

	const sender = await accountRepo.findOne(senderAccountNumber);
	if (!sender) throw new Error(`Invalid Sender's Account Number`);

	const receiver = await accountRepo.findOne(receiverAccountNumber);
	if (!receiver) throw new Error(`Invalid Receiver's Account Number`);

	if (amount <= 0) throw new Error('Transferring Amount cannot be zero');

	if (sender.balance - amount < 0)
		throw new Error('Insufficient Balance to Send');

	try {
		const repo = getRepository(Transaction);
		const transaction = new Transaction(amount, sender, receiver);
		await repo.save(transaction);
		return transaction;
	} catch (e) {
		console.error(e);
	}
}

// TODO: Write function to view all transactions of each customer
