import { hash, compare } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = +(process.env.SALT_ROUNDS_PASSWORD as string);

export function hashPassword(password: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		hash(password, SALT_ROUNDS)
			.then(encrypted => resolve(encrypted))
			.catch(err => reject(err));
	});
}

export function matchPassword(
	password: string,
	hash: string
): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		compare(password, hash)
			.then(match => resolve(match))
			.catch(err => reject(err));
	});
}

// Test
// async function test() {
// 	const result = await hashPassword('shubhasya');
// 	const match = await compare('shubhasya', result);
// 	console.log(result);
// }
//
// test();
