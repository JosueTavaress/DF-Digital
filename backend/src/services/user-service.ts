import userModel from '../models/user-model/user-model';
import { IUsers } from '../models/user-model/interface';
import { hashPassword } from './utils/hash';

const getAll = async (): Promise<Omit<IUsers, "password">[]> => {
  const users = await userModel.getAllUsers();
  return users.map((el) => {
    return { name: el.name, email: el.email, id: el.id }
  });
}

const create = async (user: Omit<IUsers, "id">): Promise<number> => {
  const userExist = await userModel.getUserByEmail(user.email);
  if (userExist) {
    const error = {
      message: `O email ${user.email} já está registrado.`,
      code: 409
    }
    throw error;
  }
  const password = user.password ? user.password : "default";
  const encodePassword = hashPassword(password);
  const newUserId = await userModel.createUser({ ...user, password: encodePassword });
  return newUserId;
}

const update = async (userId: number, data: any) => {
  return userModel.updateUser(userId, data);
}

export {
  getAll,
  create,
  update
}