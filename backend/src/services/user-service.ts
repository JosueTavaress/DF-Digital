import users from '../models/user-model/user-model';
import { IUsers } from '../models/user-model/user-model';

const getAllUsersModel = (): IUsers[] => {
  return users;
}

export {
  getAllUsersModel
}