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
	negativeMultiplier?: string;
}

export async function createTransaction(data: TransactionData) {
	const {
		senderAmount,
		senderAccountNumber,
		receiverAccountNumber,
		receiverAmount,
		transactionType: type,
		negativeMultiplier,
	} = data;

	console.log(data);
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
		const repo = getRepository(Transaction);

		const transaction = new Transaction(
			sender,
			senderAmount,
			transactionType,
			receiver,
			receiverAmount
		);

		await repo.save(transaction);

		if (transactionType === TransactionTypes.DEPOSIT) {
			sender.balance = multiplyTwoCiphers(
				BigInt(sender.balance),
				BigInt(senderAmount)
			).toString();
		} else {
			sender.balance = multiplyTwoCiphers(
				BigInt(sender.balance),
				BigInt(negativeMultiplier)
			).toString();
		}

		await accountRepo.save(sender);

		if (receiver) {
			receiver.balance = multiplyTwoCiphers(
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

export async function getTransactionsOfAccount(accountNumber: string) {
	console.log(accountNumber);

	try {
		const repo = getRepository(Transaction);
		return await repo.find({
			where: [
				{ senderAccount: accountNumber },
				{ receiverAccount: accountNumber },
			],
			order: { date: -1 },
			relations: ['receiverAccount', 'senderAccount'],
			take: 15,
		});
	} catch (e) {
		console.log(e);
	}
}
