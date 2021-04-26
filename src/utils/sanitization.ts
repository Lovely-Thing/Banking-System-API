import { Customer } from '../models/Customer';
import deleteProperty = Reflect.deleteProperty;

export default function sanitizeLogin(customer: Customer) {
	if (customer.hashedPassword) deleteProperty(customer, 'hashedPassword');
	if (customer.address) deleteProperty(customer, 'address');
	return customer;
}
