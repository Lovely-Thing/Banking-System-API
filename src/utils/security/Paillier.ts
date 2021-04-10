// All the variables are described as per this video:
// https://www.youtube.com/watch?v=zsRmNT5Nc_0&t=616s

// Implementation
// https://en.wikipedia.org/wiki/Paillier_cryptosystem

import {
	generateKeys,
	cipherValue,
	decipherValue,
	multiplyMultipleCiphers,
	multiplyTwoCiphers,
} from './index';

const BIT_SIZE = 128;

// Choose two large prime numbers
async function generator() {
	const keys = await generateKeys(BIT_SIZE);
	// const keys = await generateKeys(BIT_SIZE);

	const cipherText1 = await cipherValue(BigInt(-10), keys.publicKey);
	console.log(cipherText1);
	const cipherText2 = await cipherValue(BigInt(42), keys.publicKey);
	// const cipherText3 = await cipherValue(BigInt(8), keys.publicKey);
	const multipliedResult = multiplyTwoCiphers(cipherText1, cipherText2);

	// const multipliedResult = multiplyMultipleCiphers([
	// 	cipherText1,
	// 	cipherText2,
	// 	cipherText3,
	// ]);
	// console.log(multipliedResult);

	const decipheredValue = await decipherValue(
		multipliedResult,
		keys.publicKey,
		keys.privateKey
	);
	console.log('decipher', decipheredValue);
}

generator();
