import userModel from '../models/user-model/user-model';
import { IUsers, IUserWithTags, IUpdateUser } from '../models/user-model/interface';
import { hashPassword } from './utils/hash';
import { ConflictRequestError } from '../errors/errors-http';

const getAll = async (): Promise<Omit<IUserWithTags, "password">[]> => {
  const users = await userModel.getAllUsers();
  return users.map((el) => {
    return { name: el.name, email: el.email, id: el.id, tags: el.tags }
  })
}

const create = async (user: Omit<IUsers, "id">): Promise<number> => {
  const userExist = await userModel.getUserByEmail(user.email);
  if (userExist) {
    throw new ConflictRequestError(`O email ${user.email} já está registrado.`);
  }
  const password = user.password ? user.password : "default";
  const encodePassword = hashPassword(password);
  const newUserId = await userModel.createUser({ ...user, password: encodePassword });
  return newUserId;
}

const update = async (userId: number, data: IUpdateUser) => {
  const userLinksTag = [...new Set(data.user_links_tag)];
  data.user_links_tag = userLinksTag;
  const updated = await userModel.updateUser(userId, data);
  return updated;
}

const deleteUser = async (id: number): Promise<void> => {
  await userModel.deleteUser(id);
}

export {
  getAll,
  create,
  update,
  deleteUser
}