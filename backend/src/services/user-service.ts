import userModel from '../models/user-model/user-model';
import { IUsers } from '../models/user-model/interface';

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
      message: `O email ${user.email} já está registado.`,
      code: 409
    }
    throw error;
  }
  const newUserId = await userModel.createUser(user);
  return newUserId;
}

export {
  getAll,
  create
}