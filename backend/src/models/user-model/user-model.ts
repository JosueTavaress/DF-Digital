import { pool } from '../../db/connection';
import { IUsers, IUpdateUser, IUserWithTags } from './interface';
import { RowDataPacket } from 'mysql2'

const getAllUsers = async (): Promise<IUserWithTags[]> => {
  const sql = `
    SELECT 
      u.id as user_id, u.name as user_name, u.email as user_email, u.password as user_password,
      t.id as tag_id, t.name as tag_name, t.description as tag_description, t.color as tag_color
    FROM dfDigital.user u
    LEFT JOIN dfDigital.user_tag ut ON u.id = ut.user_id
    LEFT JOIN dfDigital.tag t ON ut.tag_id = t.id
  `;
  const [rows] = await pool.execute<RowDataPacket[]>(sql);
  const userMap: { [key: number]: IUserWithTags } = {};
  for (const row of rows) {
    const userId = row.user_id;
    if (!userMap[userId]) {
      userMap[userId] = {
        id: userId,
        name: row.user_name,
        email: row.user_email,
        password: row.user_password,
        tags: []
      };
    }

    if (row.tag_id) {
      userMap[userId].tags.push({
        id: row.tag_id,
        name: row.tag_name,
        description: row.tag_description,
        color: row.tag_color
      });
    }
  }
  return Object.values(userMap);
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