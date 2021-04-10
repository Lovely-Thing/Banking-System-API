import { Entity, Column } from 'typeorm';

@Entity()
export class Address {
	@Column('varchar', { length: 6, nullable: true })
	zipCode?: string;

	@Column('varchar', { nullable: true })
	street?: string;

	@Column('varchar', { nullable: true })
	city?: string;

	@Column('varchar', { nullable: true })
	state?: string;
}
