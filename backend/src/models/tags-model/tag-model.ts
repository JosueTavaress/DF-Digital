import { pool } from '../../db/connection';
import { RowDataPacket } from 'mysql2'
import { ITags } from './interface';

const getAllTags = async (): Promise<ITags[]> => {
  const sql = 'SELECT * FROM dfDigital.tag';
  const [tags] = await pool.execute<RowDataPacket[]>(sql) as [ITags[], any];
  return tags;
}

export {
  getAllTags
}