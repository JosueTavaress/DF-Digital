import axios from "axios";
import { IResponseLogin, IResponseCreateUser, IResponseUser, IResponseTag, IResponseUpdateUser } from './http-request-interface';
import { getToken } from '../utils/storage-browser';

const request = axios.create({
  baseURL: "http://localhost:4000"
});

const login = async (email: string, password: string): Promise<IResponseLogin> => {
  const response = await request({
    method: "POST",
    url: "/auth",
    data: {
      email,
      password
    }
  });
  return response.data;
}

const createUser = async (data: { email: string, password?: string, name: string }): Promise<IResponseCreateUser> => {
  const response = await request({
    method: "POST",
    url: "/user",
    data: {
      email: data.email,
      password: data.password,
      name: data.name
    }
  });

  return response.data;
}

const getUsers = async (): Promise<IResponseUser[]> => {
  const token = getToken();
  const response = await request({
    method: "GET",
    url: "/user",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

const updateUser = async (id: number, data: { name?: string, email?: string, tags?: number[] }): Promise<IResponseUpdateUser> => {
  const token = getToken();
  const response = await request({
    method: "PUT",
    url: `/user/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      name: data.name,
      email: data.email,
      user_links_tag: data.tags
    }
  });
  return response.data;
}

const deleteUser = async (id: number): Promise<void> => {
  const token = getToken();
  await request({
    method: "DELETE",
    url: `/user/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

const getTags = async (): Promise<IResponseTag[]> => {
  const token = getToken();
  const response = await request({
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
    url: "/tag"
  });
  return response.data;
}

export default {
  getUsers,
  login,
  createUser,
  getTags,
  updateUser,
  deleteUser
}