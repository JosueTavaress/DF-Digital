import { pool } from '../../db/connection';
import { RowDataPacket } from 'mysql2'
import { ITags } from './interface';

const getAllTags = async (): Promise<ITags[]> => {
  const sql = 'SELECT * FROM dfDigital.tag';
  const [tags] = await pool.execute<RowDataPacket[]>(sql) as [ITags[], any];
  return tags;
}

const createTag = async (tag: { name: string, description: string, color: string }): Promise<ITags> => {
  const { name, description, color } = tag;
  const sql = 'INSERT INTO dfDigital.tag (name, description, color) VALUES (?,?,?)';
  const [{ insertId }]: any = await pool.execute(sql, [name, description, color]);

  const sqlSelect = 'SELECT * FROM dfDigital.tag WHERE id = ?';
  const [[row]]: any = await pool.execute(sqlSelect, [insertId]);
  return row;
};

export {
  getAllTags,
  createTag
}