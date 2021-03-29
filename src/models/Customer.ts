import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';
import { IsEmail, IsInt, IsPhoneNumber, Min } from 'class-validator';

@Entity()
export class Customer {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('varchar', { nullable: false })
	firstName!: string;

	@Column('varchar', { nullable: false })
	lastName!: string;

	@Column('varchar', { nullable: false, unique: true, length: 10 })
	@IsPhoneNumber()
	phone!: string;

	@Column('varchar', { nullable: false, unique: true })
	@IsEmail()
	email!: string;

	@Column(() => Address)
	address!: Address;

	@Column('int', { nullable: false })
	@IsInt()
	@Min(18)
	age!: number;
}

//TODO: DOB
//TODO: Last Transaction
//TODO: Account Relation
//TODO: Transaction Relation
