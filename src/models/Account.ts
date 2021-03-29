import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Min } from 'class-validator';

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

	//TODO: Link To Transactions and Customers
}
