// import { getRepository } from 'typeorm';
// import { Account } from '../models/Account';
// import { Transaction, TransactionTypes } from '../models/transaction';
// import checkTransactionType from '../utils/checkTransactionType';

// interface TransactionData {
// 	amount: number;
// 	senderAccountNumber: string;
// 	receiverAccountNumber?: string;
// 	transactionType?: string;
// }

// export async function createTransaction(data: TransactionData) {
// 	const {
// 		amount,
// 		senderAccountNumber,
// 		receiverAccountNumber,
// 		transactionType: type,
// 	} = data;
//
// 	const accountRepo = await getRepository(Account);
//
// 	const sender = await accountRepo.findOne(senderAccountNumber);
// 	if (!sender) throw new Error(`Invalid Sender's Account Number`);
//
// 	const transactionType = checkTransactionType(
// 		type || TransactionTypes.TRANSFER
// 	);
//
// 	let receiver;
// 	if (transactionType === TransactionTypes.TRANSFER) {
// 		receiver = await accountRepo.findOne(receiverAccountNumber);
// 		if (!receiver) throw new Error(`Invalid Receiver's Account Number`);
// 	}
//
// 	try {
// 		const repo = await getRepository(Transaction);
// 		const transaction = new Transaction(
// 			amount,
// 			sender,
// 			transactionType,
// 			receiver
// 		);
// 		await repo.save(transaction);
// 		return transaction;
// 	} catch (e) {
// 		console.error(e);
// 	}
// }

// TODO: Write function to view all transactions of each customer
