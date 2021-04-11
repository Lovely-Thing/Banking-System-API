import { sign, verify } from 'jsonwebtoken';
import { Customer } from '../models/Customer';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function signToken(customer: Customer): Promise<string> {
	return new Promise((resolve, reject) => {
		sign(
			{
				id: customer.id,
			},
			JWT_SECRET,
			(err: Error | null, encoded?: string) => {
				if (err) return reject(err);
				else return resolve(encoded as string);
			}
		);
	});
}

export async function decodeToken(token: string): Promise<Customer> {
	return new Promise((resolve, reject) => {
		verify(token, JWT_SECRET, (err, decoded) => {
			if (err) return reject(err);
			else return resolve(decoded as Customer);
		});
	});
}
