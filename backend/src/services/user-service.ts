import userModel from '../models/user-model/user-model';
import { IUsers } from '../models/user-model/user-model';

const getAll = async (): Promise<any> => {
  const users = await userModel.getAllUsers();
  return users;
}

export {
  getAll
}