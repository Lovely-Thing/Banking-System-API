import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';
import { Min } from 'class-validator';
import { Account } from './account';

export enum TransactionTypes {
	TRANSFER = 'transfer',
	DEPOSIT = 'deposit',
	WITHDRAWAL = 'withdrawal',
}

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	transactionId!: string;

	@Column('double precision')
	@Min(0)
	amount!: number;

	@Column({
		type: 'enum',
		enum: TransactionTypes,
		default: TransactionTypes.TRANSFER,
	})
	transactionType!: TransactionTypes;

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	date!: string;

	@ManyToOne(() => Account, transaction => transaction.accountNumber, {
		nullable: true,
	})
	receivedAccount?: Account;

	@ManyToOne(() => Account, transaction => transaction.accountNumber)
	senderAccount!: Account;

	constructor(
		amount: number,
		senderAccount: Account,
		transactionType: TransactionTypes,
		receivedAccount?: Account
	) {
		this.amount = amount;
		this.senderAccount = senderAccount;
		this.receivedAccount = receivedAccount;
		this.transactionType = transactionType;
	}
}
