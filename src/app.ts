import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Customer } from './models/Customer';
import { Account } from './models/Account';
import { customersRoutes } from './routes/customers';
import { PrivateKeyTable } from './models/PrivateKeyTable';
import { accountsRoutes } from './routes/accounts';
import { privateKeysRoutes } from './routes/privateKeys';
import { Transaction } from './models/Transaction';
import { transactionRoutes } from './routes/transactions';

dotenv.config();
const port = process.env['PORT'] || 8000;
const url = process.env['DATABASE_URL'];

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hey World!');
});

app.use('/api/customers', customersRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/private', privateKeysRoutes);
app.use('/api/transactions', transactionRoutes);

async function start() {
	await createConnection({
		type: 'postgres',
		url,
		ssl: { rejectUnauthorized: !url }, // Only for Remote DB
		entities: [Customer, Account, PrivateKeyTable, Transaction],
		logger: 'simple-console',
		// synchronize: true, // Only for Development
		logging: true,
		// dropSchema: true, // Only for Development
	});

	app.listen(port, () =>
		console.log(`Server running on http://localhost:${port}`)
	);
}

start();
