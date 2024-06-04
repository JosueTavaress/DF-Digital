import userModel from '../models/user-model/user-model';
import { IUsers, IUserWithTags, IUpdateUser } from '../models/user-model/interface';
import { hashPassword } from './utils/hash';
import { HTTP_CODE } from '../errors/errors-http';
import { IObjectResponse } from './utils/error-object';

const getAll = async (): Promise<IObjectResponse<Omit<IUserWithTags, "password">[]>> => {
  const users = await userModel.getAllUsers();
  const objectData = {
    isValidRequest: true,
    statusCode: HTTP_CODE.HTTP_OK,
    data: users.map((el) => {
      return { name: el.name, email: el.email, id: el.id, tags: el.tags }
    })
  }
  return objectData;
}

const create = async (user: Omit<IUsers, "id">): Promise<IObjectResponse<number>> => {
  const userExist = await userModel.getUserByEmail(user.email);
  if (userExist) {
    const objectError = {
      isValidRequest: false,
      message: `O email ${user.email} já está registrado.`,
      statusCode: HTTP_CODE.HTTP_CONFLICT,
    }
    return objectError;
  }
  const password = user.password ? user.password : "default";
  const encodePassword = hashPassword(password);
  const newUserId = await userModel.createUser({ ...user, password: encodePassword });
  const objectData = {
    isValidRequest: true,
    statusCode: HTTP_CODE.HTTP_OK,
    data: newUserId
  }
  return objectData;
}

const update = async (userId: number, data: IUpdateUser) => {
  const userLinksTag = [...new Set(data.user_links_tag)];
  data.user_links_tag = userLinksTag;
  const updated = await userModel.updateUser(userId, data);
  const objectResponse = {
    isValidRequest: true,
    statusCode: HTTP_CODE.HTTP_OK,
    data: updated
  }
  return objectResponse;
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