import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';
import { Min } from 'class-validator';
import { Account } from './Account';

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	transactionId!: string;

	@Column('double precision')
	@Min(0)
	amount!: number;

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	date!: string;

	@ManyToOne(() => Account, transaction => transaction.accountNumber)
	receivedAccount!: Account;

	@ManyToOne(() => Account, transaction => transaction.accountNumber)
	senderAccount!: Account;

	constructor(
		amount: number,
		senderAccount: Account,
		receivedAccount: Account
	) {
		this.amount = amount;
		this.senderAccount = senderAccount;
		this.receivedAccount = receivedAccount;
	}
}
