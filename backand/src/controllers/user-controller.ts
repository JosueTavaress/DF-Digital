import { Response, Request } from 'express';
import { getAllUsersModel } from '../services/user-service';

const getAllUsers = (_req: Request, res: Response) => {
  return res.send(getAllUsersModel());
};

export {
  getAllUsers
}