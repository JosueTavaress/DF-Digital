import { pool } from '../../db/connection';
import { IUsers } from './interface';
import { RowDataPacket } from 'mysql2'

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        e-mail:
 *          type: string
 */

const getAllUsers = async (): Promise<IUsers[]> => {
  const sql = 'SELECT * FROM dfDigital.user';
  const [users] = await pool.execute<RowDataPacket[]>(sql) as [IUsers[], any];
  return users;
}

const getUserByEmail = async (email: string): Promise<IUsers | null> => {
  const sql = 'SELECT * FROM dfDigital.user WHERE email = ?';
  const [user] = await pool.execute<(IUsers & RowDataPacket)[]>(sql, [email]);
  if (user.length === 0) return null;
  const [userData] = user;
  return userData;
}

const createUser = async (user: Omit<IUsers, "id">): Promise<number> => {
  const { name, password, email } = user;
  const passwordNotNull = password ? password : "123";
  const sql = 'INSERT INTO dfDigital.user (name, email, password) VALUES (?,?,?)';
  const [{ insertId }]: any = await pool.execute(sql, [name, email, passwordNotNull]);
  return insertId;
};

export default {
  getAllUsers,
  getUserByEmail,
  createUser
};