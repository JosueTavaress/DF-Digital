import { Request, Response, NextFunction } from 'express';
import { validateLogin, generateToken } from '../services/auth-service';
import { InternalServerError, UnauthorizedError } from '../errors/errors-http';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isValidRequest, statusCode, data, message } = await validateLogin(req.body.email, req.body.password);
    if (!isValidRequest) {
      next(new UnauthorizedError(message!))
    }
    const result = generateToken("login", { id: data! });
    res.status(statusCode).json(result);
  } catch (_error) {
    next(new InternalServerError());
  }
}

export {
  login
}