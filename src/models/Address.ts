import { Entity, Column } from 'typeorm';

@Entity()
export class Address {
	@Column('varchar', { length: 6, nullable: false })
	zipCode!: string;

	@Column('varchar')
	street!: string;

	@Column('varchar')
	city!: string;

	@Column('varchar')
	state!: string;
}
