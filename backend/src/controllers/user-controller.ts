import { Response, Request } from 'express';
import { getAll, create, update, deleteUser as modeDeleteUser } from '../services/user-service';
import { ErrorService } from '../services/interface';

const getAllUsers = async (_req: Request, res: Response) => {
  const response = await getAll();
  return res.status(200).json(response);
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userId = await create(req.body);
    return res.status(201).json({ id: userId, ...req.body });
  } catch (err: ErrorService & any) {
    return res.status(err.code).json({ message: err.message });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const data = await update(Number(req.params.id), req.body);
  res.status(200).json(data);
}

const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await modeDeleteUser(id);
  res.status(200).json({ message: "user deleted" })
}

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}