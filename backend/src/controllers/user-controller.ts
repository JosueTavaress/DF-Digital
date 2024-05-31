import { Response, Request } from 'express';
import { getAll } from '../services/user-service';

const getAllUsers = (_req: Request, res: Response) => {
  return res.send(getAll());
};

export {
  getAllUsers
}