import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Address {
	@PrimaryColumn('varchar', { length: 6, nullable: false })
	zipCode!: string;

	@Column('varchar')
	street!: string;

	@Column('varchar')
	city!: string;

	@Column('varchar')
	state!: string;
}
