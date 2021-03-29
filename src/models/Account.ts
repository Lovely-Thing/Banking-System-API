import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Min } from 'class-validator';
import { Customer } from './Customer';
import { Transaction } from './Transaction';

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

	@Column('double precision')
	@Min(0)
	balance!: number;

	// @ManyToOne(() => Customer, customer => customer.accounts)
	// customer!: Customer;

	@OneToMany(() => Transaction, account => account.transactionId)
	transactions!: Transaction[];

	//TODO: Link To Transactions and Customers
}
