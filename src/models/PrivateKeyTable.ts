import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PrivateKey } from '../utils/security';

interface StorePrivateKey {
	lambda: string;
	mu: string;
}

@Entity()
export class PrivateKeyTable {
	@PrimaryColumn('text')
	hashIdentifier!: string;

	@Column('json', { nullable: true })
	privateKey!: StorePrivateKey;

	constructor(hash: string, privateKey: PrivateKey) {
		this.hashIdentifier = hash;
		this.privateKey = {
			lambda: privateKey?.lambda.toString() as string,
			mu: privateKey?.mu.toString() as string,
		};
	}
}
