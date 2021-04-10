import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
} from 'typeorm';
import { Min } from 'class-validator';
import { Customer } from './customer';
import { Transaction } from './transaction';
import { cipherValue, generateKeys } from '../utils/security';

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

	@Column('text', { default: 0 })
	@Min(0)
	balance!: string;

	@Column('json', { nullable: true })
	publicKey?: StorePublicKey;

	@ManyToOne(() => Customer, customer => customer.accounts)
	customer!: Customer;

	@CreateDateColumn()
	accountCreated!: string;

	@OneToMany(() => Transaction, account => account.transactionId)
	transactions!: Transaction[];

	constructor(customer: Customer, balance?: number) {
		this.customer = customer;
		this.balance = balance?.toString() || '0';
		generateKeys(128)
			.then(keys => {
				const { publicKey } = keys;
				this.publicKey = {
					n: publicKey.n.toString(),
					g: publicKey.g.toString(),
				};
				return cipherValue(0, publicKey);
			})
			.then(cypher => (this.balance = cypher.toString()))
			.catch(err => {
				console.error(err);
				throw new Error('Cannot Generate Keys');
			});
	}
}
