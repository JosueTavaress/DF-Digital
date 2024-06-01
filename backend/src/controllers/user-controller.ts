import { Response, Request } from 'express';
import { getAll, create } from '../services/user-service';
import { ErrorService } from '../services/interface';

const getAllUsers = async (_req: Request, res: Response) => {
  const response = await getAll();
  return res.send(response);
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userId = await create(req.body);
    return res.status(201).send({ id: userId, ...req.body });
  } catch (err: ErrorService & any) {
    return res.status(err.code).send(err.message);
  }
}

export {
  getAllUsers,
  createUser
}