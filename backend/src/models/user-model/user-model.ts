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

export default {
  getAllUsers,
};