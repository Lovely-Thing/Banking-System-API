import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { IsEmail, IsInt, IsPhoneNumber, Min } from 'class-validator';
import { Account } from './Account';

@Entity()
export class Customer {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('varchar', { nullable: false })
	firstName: string;

	@Column('varchar', { nullable: false })
	lastName: string;

	@Column('varchar', { nullable: false, unique: true })
	@IsPhoneNumber()
	phone: string;

	@Column('varchar', { nullable: true })
	@IsEmail()
	email?: string;

	@Column('int', { nullable: false })
	@IsInt()
	@Min(18)
	age!: number;

	@Column(() => Address)
	address?: Address;

	// @OneToMany(() => Account, account => account.customer)
	// accounts!: Account[];

	constructor(
		firstName: string,
		lastName: string,
		phone: string,
		age: string,
		email?: string,
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.email = email;
		this.age = +age;
	}
}

//TODO: DOB
//TODO: Last Transaction
//TODO: Account Relation
//TODO: Transaction Relation
