import { Response, Request, NextFunction } from 'express';
import { getAll, create, update, deleteUser as modeDeleteUser } from '../services/user-service';
import { HTTP_CODE } from '../errors/errors-http';

const getAllUsers = async (_req: Request, res: Response) => {
  const response = await getAll();
  return res.status(HTTP_CODE.HTTP_OK).json(response);
};

const createUser = async (req: Request, res: Response) => {
  const userId = await create(req.body);
  return res.status(HTTP_CODE.HTTP_CREATED).json({ id: userId, ...req.body });
}

const updateUser = async (req: Request, res: Response) => {
  const data = await update(Number(req.params.id), req.body);
  res.status(HTTP_CODE.HTTP_OK).json(data);
}

const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await modeDeleteUser(id);
  res.status(HTTP_CODE.HTTP_OK).json({ message: "user deleted" });
}

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}