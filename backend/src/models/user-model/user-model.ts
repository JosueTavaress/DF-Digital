import { connection } from '../../db/connection';
export interface IUsers {
  name: string,
  email: string,
  password: string
}

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
  const instance = await connection;
  const [users] = await instance.execute(sql);
  return users as IUsers[];
}

export default {
  getAllUsers
};