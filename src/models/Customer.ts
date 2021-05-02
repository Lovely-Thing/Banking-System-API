import {
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { IsDate, IsEmail, IsInt, IsPhoneNumber, Min } from 'class-validator';
import { Account } from './Account';
import Randoma from 'randoma';

@Entity()
export class Customer {
	@PrimaryColumn()
	id!: string;

	@Column('varchar', { nullable: false })
	hashedPassword!: string;

	@Column('varchar', { nullable: false })
	firstName!: string;

	@Column('varchar', { nullable: false })
	lastName!: string;

	@Column('varchar', { nullable: false, unique: true })
	@IsPhoneNumber()
	phone!: string;

	@Column('varchar', { nullable: true })
	@IsEmail()
	email?: string;

	@Column('int', { nullable: false })
	@IsInt()
	@Min(18)
	age!: number;

	@Column('date', { nullable: true })
	@IsDate()
	dob?: string;

	@Column(() => Address)
	address?: Address;

	@OneToMany(() => Account, account => account.customer)
	accounts!: Account[];

	token?: string;

	constructor(
		firstName: string,
		lastName: string,
		phone: string,
		age: string,
		password: string,
		email?: string
	) {
		this.id = new Randoma({ seed: 5 }).integer().toString();
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.email = email;
		this.age = +age;
		this.hashedPassword = password;
	}
}
