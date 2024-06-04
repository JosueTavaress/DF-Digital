import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../services/auth-service';
import { UnauthorizedError } from '../errors/errors-http';

const validateAuthorization = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const tempToken = authorization?.substring(7);
  if (!tempToken) {
    throw new UnauthorizedError("Bearer token is required")
  }
  validateToken("login", tempToken);
  next();
}

export {
  validateAuthorization
}