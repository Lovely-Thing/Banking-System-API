import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/jwt';

export async function authByToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Check if authorization header exists
	const authHeader = req.header('Authorization')?.split(' ');
	if (!authHeader)
		return res.status(401).json({
			error: { body: ['Authorization Failed', 'No Authorization Header'] },
		});

	// Check if authorization type is token
	if (authHeader[0] !== 'Token')
		return res.status(401).json({
			error: { body: ['Authorization Failed', 'Token Missing'] },
		});

	// Check is token is  valid
	const token = authHeader[1];
	try {
		const customer = await decodeToken(token);

		if (!customer) throw new Error('No customer details found in token');

		(req as any).customer = customer;
		return next();
	} catch (e) {
		return res.status(401).json({
			error: { body: ['Authorization Failed', e.message] },
		});
	}
}
