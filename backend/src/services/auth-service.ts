import modelUser from '../models/user-model/user-model';
import { compare } from './utils/hash';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { HTTP_CODE, UnauthorizedError } from '../errors/errors-http';

const validateLogin = async (email: string, password: string): Promise<number> => {
  const user = await modelUser.getUserByEmail(email);
  const passwordCrypt = user ? user.password : 'denied';
  if (!user) {
    throw new UnauthorizedError("Password or Email incorrect");
  }
  const validPassword = await compare(password, passwordCrypt)
  if (!validPassword) {
    throw new UnauthorizedError("Password or Email incorrect");
  }
  return user.id;
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
  try {
    jwt.verify(token, jwtPass!);
  } catch (error) {
    throw new UnauthorizedError("invalid token or token expire")
  }
  const decode = decodeJwt(token) as { scope: string; data: { id: number } };
  if (decode.scope !== scope) {
    throw new UnauthorizedError("you do not have permission to access this route", HTTP_CODE.HTTP_FORBIDDEN);
  };
  const { data: { id } } = decode;
  return id;
};

export {
  validateLogin,
  generateToken,
  validateToken
}