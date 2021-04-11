import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
} from 'typeorm';
import { Customer } from './Customer';
// import { Transaction } from './transaction';
import { PublicKey } from '../utils/security';

interface StorePublicKey {
	n: string;
	g: string;
}

export enum accountTypes {
	SAVINGS = 'savings',
	CURRENT = 'current',
	FD = 'fixed deposit',
	RECURRING = 'recurring',
}

@Entity()
export class Account {
	@PrimaryGeneratedColumn('uuid')
	accountNumber!: string;

	@Column({
		type: 'enum',
		enum: accountTypes,
		default: accountTypes.SAVINGS,
	})
	role!: accountTypes;

	@Column('text')
	balance!: string;

	@Column('json', { nullable: true })
	publicKey!: StorePublicKey;

	@ManyToOne(() => Customer, customer => customer.accounts)
	customer!: Customer;

	@CreateDateColumn()
	accountCreated!: string;

	// @OneToMany(() => Transaction, account => account.transactionId)
	// transactions!: Transaction[];

	constructor(customer: Customer, publicKey: PublicKey, balance: bigint) {
		this.customer = customer;
		this.publicKey = {
			n: publicKey?.n.toString() as string,
			g: publicKey?.g.toString() as string,
		};
		this.balance = balance?.toString() as string;
	}
}
