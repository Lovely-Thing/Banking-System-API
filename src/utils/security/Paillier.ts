// All the variables are described as per this video:
// https://www.youtube.com/watch?v=zsRmNT5Nc_0&t=616s

import {
	prime,
	lcm,
	randBetween,
	gcd,
	modPow,
	modInv,
} from 'bigint-crypto-utils';

const BIT_SIZE = 128;

function L(x: bigint, n: bigint) {
	return BigInt((x - BigInt(1)) / BigInt(n));
}

// Choose two large prime numbers
async function generatePrimeNumbers() {
	const p = await prime(BIT_SIZE);
	let q = await prime(BIT_SIZE);

	// p = BigInt(7);
	// q = BigInt(11);

	while (p === q) {
		q = await prime(BIT_SIZE);
	}

	const n: bigint = p * q;
	const nSquared: bigint = n * n;

	let g: bigint = randBetween(n * n);
	// g = BigInt(5652);

	while (gcd(g, nSquared) !== BigInt(1)) {
		g = randBetween(n * n);
	}

	// console.log('p', p);
	// console.log('q', q);
	// console.log('n', n);
	// console.log('n squared', nSquared);
	// console.log('random Integer', g);

	console.log('PUBLIC KEY', n, g);

	//Encryption
	const value = 270395;
	const r: bigint = randBetween(n * n, BigInt(1));
	// r = BigInt(23);

	const c1 = modPow(g, value, nSquared);
	const c2 = modPow(r, n, nSquared);

	const c = (c1 * c2) % nSquared;

	console.log('cypher: ', c);

	// console.log('PRIVATE KEY', lambda, mu);

	//Decryption
	const lambda: bigint = lcm(p - BigInt(1), q - BigInt(1));
	const l = L(modPow(g, lambda, nSquared), n);
	const mu = modInv(l, n);

	console.log('lambda', lambda);
	console.log('l', l);
	console.log('mu', mu);

	const alpha = modPow(c, lambda, nSquared);
	console.log('decipher: ', (L(alpha, n) * mu) % n);
}

generatePrimeNumbers();
