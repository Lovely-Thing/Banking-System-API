import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
	error: any,
	// req: Request,
	res: Response
	// next: NextFunction
) {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message, data });
}
