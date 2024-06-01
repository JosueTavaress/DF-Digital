import modelUser from '../models/user-model/user-model';
import { compare } from './utils/hash';
import jwt from 'jsonwebtoken';
import ms from 'ms';

const validateLogin = async (email: string, password: string): Promise<number> => {
  const user = await modelUser.getUserByEmail(email);
  const passwordCrypt = user ? user.password : 'denied';
  const error = {
    message: "Password or Email incorrect",
    code: 401
  }
  if (!user) {
    throw error;
  }
  const validPassword = await compare(password, passwordCrypt)
  if (!validPassword) {
    throw error;
  }
  const { id } = user;
  return id;
}

const generateToken = (scope: string, data: { id: number }, expiresIn = '1d'): { tempToken: string, expiresAt: Date } => {
  const jwtPass = process.env.JWT_SECRET;
  const tempToken = jwt.sign({ scope, data }, jwtPass!, {
    expiresIn,
  });
  const expiresAt = new Date(Date.now() + ms(expiresIn));
  return {
    tempToken,
    expiresAt,
  };
};


const decodeJwt = (token: string) => {
  const decode = jwt.decode(token, { complete: true });
  return decode?.payload;
};

const validateToken = (scope: string, token: string): number => {
  const jwtPass = process.env.JWT_SECRET;
  jwt.verify(token, jwtPass!);
  const decode = decodeJwt(token) as { scope: string; data: { id: number } };
  if (decode.scope !== scope) {
    throw Error;
  };
  const { data: { id } } = decode;
  return id;
};

export {
  validateLogin,
  generateToken,
  validateToken
}