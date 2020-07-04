import AppError from './AppError';
import { Response } from 'express';

export default function errorHandler(err: Error | AppError, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  console.error(err);
  return res.status(500).send({ message: 'Server error' });
}
