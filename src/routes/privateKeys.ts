import { Router } from 'express';
import { getPrivateKey } from '../controllers/privateKeyTable';
import { authByToken } from '../middleware/authByToken';
import { getRepository } from 'typeorm';
import { Account } from '../models/Account';

const route = Router();

route.get('/:accountNumber', authByToken, async (req, res) => {
	if (!req.params.accountNumber)
		res.status(404).json({
			message: { body: ['Please enter the Account Number'] },
		});

	const { accountNumber } = req.params;

	const account = await getRepository(Account).findOne({
		where: {
			accountNumber,
			customer: {
				id: (req as any).customer.id,
			},
		},
	});

	if (!account)
		res.status(404).json({
			message: { body: ['Invalid Account Details'] },
		});

	try {
		const keys = await getPrivateKey(req.body.accountNumber);
		res.status(200).json(keys);
	} catch (e) {
		res.status(404).json({
			message: { body: ['Not Found', e.message] },
		});
	}
});

export const privateKeysRoutes = route;
