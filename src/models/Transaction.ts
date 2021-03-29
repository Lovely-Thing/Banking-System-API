import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from 'typeorm';
import { Min } from 'class-validator';

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	transactionId!: string;

	@Column('double precision')
	@Min(0)
	amount!: number;

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	date!: string;
}

//TODO: Relate Customer
//TODO: Relate Account
