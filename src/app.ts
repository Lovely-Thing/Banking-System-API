import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { Customer } from './models/Customer';
import { Account } from './models/Account';
import { Transaction } from './models/Transaction';
import { customersRoutes } from './routes/Customers';
import { customerRoutes } from './routes/Customer';

dotenv.config();
const port = process.env.PORT || 3000;
// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const database = process.env.DB;
const URI = process.env.URI;

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hey World!');
});

app.use('/api/customers', customersRoutes);
app.use('/api/customer', customerRoutes);

async function start() {
	await createConnection({
		type: 'postgres',
		url: URI,
		// username,
		// password,
		// database,
		ssl: { rejectUnauthorized: !URI }, // Only for Remote DB
		entities: [Customer, Account, Transaction],
		logger: 'simple-console',
		synchronize: true, // Only for Development
		logging: true,
		// dropSchema: true,
	});

	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
}

start();
