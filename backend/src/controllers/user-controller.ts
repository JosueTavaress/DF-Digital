import { Response, Request, NextFunction } from 'express';
import { getAll, create, update, deleteUser as modeDeleteUser } from '../services/user-service';
import { ApiError, InternalServerError } from '../errors/errors-http';

const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getAll();
    return res.status(response.statusCode).json(response.data);
  } catch (_error) {
    next(new InternalServerError());
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await create(req.body);
    if (!data.isValidRequest) {
      next(new ApiError(data.message!, data.statusCode))
    }
    return res.status(data.statusCode).json({ id: data, ...req.body });
  } catch (_error) {
    next(new InternalServerError());
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, statusCode } = await update(Number(req.params.id), req.body);
    res.status(statusCode).json(data);
  } catch (_error) {
    next(new InternalServerError());
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await modeDeleteUser(id);
    res.status(200).json({ message: "user deleted" })
  } catch (_error) {
    next(new InternalServerError());
  }
}

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}