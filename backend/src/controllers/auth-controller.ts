import { Request, Response } from 'express';
import { validateLogin, generateToken } from '../services/auth-service';
import { ErrorService } from '../services/interface';

const login = async (req: Request, res: Response) => {
  try {
    const userId = await validateLogin(req.body.email, req.body.password);
    const data = generateToken("login", { id: userId });
    res.status(200).json(data);
  } catch (err: ErrorService & any) {
    res.status(err.code).json({ message: err.message });
  }
}

export {
  login
}