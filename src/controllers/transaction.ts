import { getRepository } from 'typeorm';
import { Account } from '../models/Account';
import { Transaction, TransactionTypes } from '../models/Transaction';
import checkTransactionType from '../utils/checkTransactionType';
import { multiplyTwoCiphers } from '../utils/security';

interface TransactionData {
	senderAmount: string;
	senderAccountNumber: string;
	receiverAccountNumber?: string;
	receiverAmount?: string;
	transactionType?: string;
}

export async function createTransaction(data: TransactionData) {
	const {
		senderAmount,
		senderAccountNumber,
		receiverAccountNumber,
		receiverAmount,
		transactionType: type,
	} = data;

	const accountRepo = getRepository(Account);

	const sender = await accountRepo.findOne(senderAccountNumber);
	if (!sender) throw new Error(`Invalid Sender's Account Number`);

	const transactionType = checkTransactionType(
		type || TransactionTypes.TRANSFER
	);

	let receiver;
	if (transactionType === TransactionTypes.TRANSFER) {
		receiver = await accountRepo.findOne(receiverAccountNumber);
		if (!receiver) throw new Error(`Invalid Receiver's Account Number`);
	}

	try {
		const repo = await getRepository(Transaction);

		const transaction = new Transaction(
			sender,
			senderAmount,
			transactionType,
			receiver,
			receiverAmount
		);

		await repo.save(transaction);

		sender.balance = await multiplyTwoCiphers(
			BigInt(sender.balance),
			BigInt(senderAmount)
		).toString();

		await accountRepo.save(sender);

		if (receiver) {
			receiver.balance = await multiplyTwoCiphers(
				BigInt(receiver.balance),
				BigInt(receiverAmount)
			).toString();

			await accountRepo.save(receiver);
		}

		return transaction;
	} catch (e) {
		console.error(e);
	}
}

export async function getTransactions() {
	try {
		const repo = getRepository(Transaction);
		return await repo.find();
	} catch (e) {
		console.log(e);
	}
}

// TODO: Write function to view all transactions of each customer
