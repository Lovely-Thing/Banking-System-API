import {
	gcd,
	lcm,
	modInv,
	modPow,
	prime,
	randBetween,
} from 'bigint-crypto-utils';

const L = (x: bigint, n: bigint) => BigInt((x - BigInt(1)) / BigInt(n));

export async function generatePrimeNumbers(BIT_SIZE: number) {
	return await prime(BIT_SIZE);
}

export interface PublicKey {
	n: bigint;
	g: bigint;
}

export interface PrivateKey {
	lambda: bigint;
	mu: bigint;
}

export async function generateKeys(BIT_SIZE: number) {
	const p = await generatePrimeNumbers(BIT_SIZE);
	let q = await generatePrimeNumbers(BIT_SIZE);

	while (p === q) {
		q = await generatePrimeNumbers(BIT_SIZE);
	}

	const n: bigint = p * q;

	let g: bigint = randBetween(n * n);
	while (gcd(g, n * n) !== BigInt(1)) {
		g = randBetween(n * n);
	}

	const lambda: bigint = lcm(p - BigInt(1), q - BigInt(1));
	const l = L(modPow(g, lambda, n * n), n);
	const mu = modInv(l, n);

	return {
		publicKey: { n, g },
		privateKey: { lambda, mu },
	};
}

export async function cipherValue(
	value: number | bigint,
	publicKey: PublicKey
) {
	const { n, g } = publicKey;

	const nSquared = n * n;

	const r: bigint = randBetween(n * n, BigInt(1));

	const c1 = modPow(g, value, nSquared);
	const c2 = modPow(r, n, nSquared);

	return (c1 * c2) % nSquared;
}

export async function decipherValue(
	cipher: bigint,
	publicKey: PublicKey,
	privateKey: PrivateKey
) {
	const { n } = publicKey;
	const { lambda, mu } = privateKey;

	const alpha = modPow(cipher, lambda, n * n);

	return (L(alpha, n) * mu) % n;
}

export function multiplyTwoCiphers(cipher1: bigint, cipher2: bigint) {
	return cipher1 * cipher2;
}

export function multiplyMultipleCiphers(ciphers: bigint[]) {
	return ciphers.reduce((result, item) => result * item, BigInt(1));
}
