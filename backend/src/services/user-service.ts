import users from '../models/user-model/user-model';
import { IUsers } from '../models/user-model/user-model';

const getAll = (): IUsers[] => {
  return users;
}

export {
  getAll
}