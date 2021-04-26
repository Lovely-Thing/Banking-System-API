import dotenv from 'dotenv';
import { hashPassword, matchPassword } from '../utils/hashPassword';
import { PrivateKey } from '../utils/security';
import { getRepository } from 'typeorm';
import { PrivateKeyTable } from '../models/PrivateKeyTable';

dotenv.config();

export async function createPrivateKeyRow(
	secretPassword: string,
	privateKey: PrivateKey
) {
	const repo = getRepository(PrivateKeyTable);

	try {
		const key = `${process.env.PADDING_FOR_PRIVATEKEY_LEFT}${secretPassword}${process.env.PADDING_FOR_PRIVATEKEY_RIGHT}`;
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

export async function getPrivateKey(secretPassword: string) {
	const repo = getRepository(PrivateKeyTable);

	try {
		const secret = `${process.env.PADDING_FOR_PRIVATEKEY_LEFT}${secretPassword}${process.env.PADDING_FOR_PRIVATEKEY_RIGHT}`;
		const keys = await repo.find();

		const matchPromises = keys.map(async key => {
			return await matchPassword(secret, key.hashIdentifier);
		});

		const result = await Promise.all(matchPromises);

		let resultantIndex = -1;
		result.forEach((booleanValue, index) => {
			if (booleanValue) resultantIndex = index;
		});

		console.log(resultantIndex);

		if (resultantIndex == -1) throw new Error('Invalid Credentials');

		return keys[resultantIndex as number].privateKey;
	} catch (e) {
		console.error(e);
	}
}

export async function getAllPrivateKeys() {
	const repo = getRepository(PrivateKeyTable);
	return await repo.find();
}
