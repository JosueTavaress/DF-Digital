import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/errors-http';

export const handlerError = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.statusCode ? err.statusCode : 500;
  const message = err.statusCode ? err.message : "Internal Server Error";
  res.status(status).json({ message });
}