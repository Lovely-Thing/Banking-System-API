import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Customer } from './models/customer';
import { Account } from './models/account';
import { Transaction } from './models/transaction';
import { customersRoutes } from './routes/customers';
import { customerRoutes } from './routes/customer';

dotenv.config();
const port = process.env.PORT || 3000;
const url = process.env.URI;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hey World!');
});

app.use('/api/customers', customersRoutes);
app.use('/api/customer', customerRoutes);

async function start() {
	await createConnection({
		type: 'postgres',
		url,
		ssl: { rejectUnauthorized: !url }, // Only for Remote DB
		entities: [Customer, Account, Transaction],
		logger: 'simple-console',
		synchronize: true, // Only for Development
		// logging: true,
		dropSchema: true,
	});

	app.listen(port, () =>
		console.log(`Server running on http://localhost:${port}`)
	);
}

start();
