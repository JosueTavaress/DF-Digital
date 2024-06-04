import { Request, Response } from 'express';
import { validateLogin, generateToken } from '../services/auth-service';
import { HTTP_CODE } from '../errors/errors-http';

const login = async (req: Request, res: Response) => {
  const userId = await validateLogin(req.body.email, req.body.password);
  const result = generateToken("login", { id: userId });
  res.status(HTTP_CODE.HTTP_OK).json(result);
}

export {
  login
}