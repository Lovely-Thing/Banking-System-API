import { TransactionTypes } from '../models/Transaction';

export default function checkTransactionType(transactionType: string) {
	const value = transactionType.toLowerCase();

	if (value === TransactionTypes.WITHDRAWAL) return TransactionTypes.WITHDRAWAL;
	else if (value === TransactionTypes.DEPOSIT) return TransactionTypes.DEPOSIT;
	else if (value === TransactionTypes.TRANSFER)
		return TransactionTypes.TRANSFER;
	else throw new Error('Invalid Transaction type');
}

// Test
// console.log(checkTransactionType('Wihdrawal'));
