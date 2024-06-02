import { pool } from '../../db/connection';
import { IUsers, IUpdateUser } from './interface';
import { RowDataPacket } from 'mysql2'

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
  const sql = 'INSERT INTO dfDigital.user (name, email, password) VALUES (?,?,?)';
  const [{ insertId }]: any = await pool.execute(sql, [name, email, password]);
  return insertId;
};

const updateUser = async (userId: number, data: IUpdateUser): Promise<IUpdateUser> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const updateUserQuery = `
      UPDATE dfDigital.user
      SET name = ?, email = ?
      WHERE id = ?
    `;
    await connection.execute(updateUserQuery, [data.name, data.email, userId]);

    const deleteUserTagsQuery = `
      DELETE FROM dfDigital.user_tag
      WHERE user_id = ?
    `;
    await connection.execute(deleteUserTagsQuery, [userId]);

    const insertUserTagQuery = `
      INSERT INTO dfDigital.user_tag (user_id, tag_id)
      VALUES (?, ?)
    `;
    for (const tagId of data.user_links_tag) {
      await connection.execute(insertUserTagQuery, [userId, tagId]);
    }
    await connection.commit();
    return {
      name: data.name,
      email: data.email,
      user_links_tag: data.user_links_tag
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export default {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser
};