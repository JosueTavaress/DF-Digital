import userModel from '../../models/user-model/user-model';
import { TUser } from './types';

const getAll = async (): Promise<TUser[]> => {
  const users = await userModel.getAllUsers();
  return users.map((el) => {
    return { name: el.name, email: el.email, id: el.id }
  });
}

export {
  getAll
}