import userModel from '../models/user-model/user-model';
import { IUsers } from '../models/user-model/interface';

const getAll = async (): Promise<IUsers[]> => {
  const users = await userModel.getAllUsers();
  return users;
}

export {
  getAll
}