import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';
import { Min } from 'class-validator';
import { Account } from './Account';

export enum TransactionTypes {
	TRANSFER = 'transfer',
	DEPOSIT = 'deposit',
	WITHDRAWAL = 'withdrawal',
}

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	transactionId!: string;

	@Column('varchar')
	@Min(0)
	senderEncryptedAmount!: string;

	@Column('varchar', { nullable: true })
	receiverEncryptedAmount?: string;

	@Column({
		type: 'enum',
		enum: TransactionTypes,
		default: TransactionTypes.TRANSFER,
	})
	transactionType!: TransactionTypes;

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	date!: string;

	@ManyToOne(() => Account)
	senderAccount!: Account;

	@ManyToOne(() => Account, { nullable: true })
	receiverAccount?: Account;

	constructor(
		senderAccount: Account,
		senderAmount: string,
		transactionType: TransactionTypes,
		receiverAccount?: Account,
		receiverAmount?: string
	) {
		this.senderAccount = senderAccount;
		this.senderEncryptedAmount = senderAmount;
		this.transactionType = transactionType;
		this.receiverAccount = receiverAccount;
		this.receiverEncryptedAmount = receiverAmount;
	}
}
