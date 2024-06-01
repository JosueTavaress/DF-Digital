import { Router } from 'express';
import { login } from '../controllers/auth-controller';
import bodyValidator from '../middlewares/body-validator';

export const authRouter = Router();

authRouter.post('/', [bodyValidator, login]);

