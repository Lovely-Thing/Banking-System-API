import {
	Entity,
	Column,
	CreateDateColumn,
	ManyToOne,
	PrimaryColumn,
} from 'typeorm';
import { Account } from './Account';
import randomize from 'randomatic';

export enum TransactionTypes {
	TRANSFER = 'transfer',
	DEPOSIT = 'deposit',
	WITHDRAWAL = 'withdrawal',
}

@Entity()
export class Transaction {
	@PrimaryColumn('varchar')
	transactionId!: string;

	@Column('varchar')
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
		this.transactionId = randomize('0a', 16);
		this.senderAccount = senderAccount;
		this.senderEncryptedAmount = senderAmount;
		this.transactionType = transactionType;
		if (receiverAccount) this.receiverAccount = receiverAccount;
		if (receiverAmount) this.receiverEncryptedAmount = receiverAmount;
	}
}
