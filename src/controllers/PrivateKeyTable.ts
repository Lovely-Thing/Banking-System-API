import dotenv from 'dotenv';
import { hashPassword } from '../utils/hashPassword';
import { PrivateKey } from '../utils/security';
import { PrivateKeyTable } from '../models/privateKey';
import { getRepository } from 'typeorm';

dotenv.config();

export async function createPrivateKeyRow(pin: string, privateKey: PrivateKey) {
	const repo = await getRepository(PrivateKeyTable);

	try {
		const key = `${process.env.PADDING_FOR_PRIVATEKEY_LEFT}${pin}${process.env.PADDING_FOR_PRIVATEKEY_RIGHT}`;
		const privateKeyRow = new PrivateKeyTable(
			await hashPassword(key),
			privateKey
		);

		await repo.save(privateKeyRow);

		return privateKeyRow;
	} catch (e) {
		console.log(e);
	}
}
