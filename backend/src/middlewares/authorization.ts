import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../services/auth-service';

const validateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const tempToken = authorization?.substring(7);
  if (!tempToken) {
    return res.status(401).json({ message: "Bearer token is required" });
  }
  try {
    validateToken("login", tempToken);
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
  next();
}

export {
  validateAuthorization
}