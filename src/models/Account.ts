import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	PrimaryColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { PublicKey } from '../utils/security';
import { Transaction } from './Transaction';
import Randoma from 'randoma';

interface StorePublicKey {
	n: string;
	g: string;
}

export enum AccountTypes {
	SAVINGS = 'savings',
	CURRENT = 'current',
	FD = 'fixed deposit',
	RECURRING = 'recurring',
}

@Entity()
export class Account {
	@PrimaryColumn()
	accountNumber!: string;

	@Column({
		type: 'enum',
		enum: AccountTypes,
		default: AccountTypes.SAVINGS,
	})
	role!: AccountTypes;

	@Column('text')
	balance!: string;

	@Column('json', { nullable: true })
	publicKey!: StorePublicKey;

	@ManyToOne(() => Customer, customer => customer.accounts)
	customer!: Customer;

	@CreateDateColumn()
	accountCreated!: string;

	@OneToMany(() => Transaction, account => account.transactionId)
	transactions!: Transaction[];

	constructor(customer: Customer, publicKey: PublicKey, balance: bigint) {
		this.accountNumber = new Randoma({ seed: 20 }).integer().toString();
		this.customer = customer;
		this.publicKey = {
			n: publicKey?.n.toString() as string,
			g: publicKey?.g.toString() as string,
		};
		this.balance = balance?.toString() as string;
	}
}
