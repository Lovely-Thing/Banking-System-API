import { Customer } from '../models/customer';
import deleteProperty = Reflect.deleteProperty;

export default function sanitizeLogin(customer: Customer) {
	if (customer.hashedPassword) deleteProperty(customer, 'hashedPassword');
	if (customer.aadhaar) deleteProperty(customer, 'aadhaar');
	if (customer.address) deleteProperty(customer, 'address');
	return customer;
}
