import { Response, Request } from 'express';
import { getAll } from '../services/user/user-service';

const getAllUsers = async (_req: Request, res: Response) => {
  const response = await getAll();
  return res.send(response);
};

export {
  getAllUsers
}