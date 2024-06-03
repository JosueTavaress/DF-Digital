import axios from "axios";
import { IResponseLogin, IResponseCreateUser, IResponseUser } from './http-request-interface';
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
  })
  return response.data;
}

export default {
  getUsers,
  login,
  createUser
}