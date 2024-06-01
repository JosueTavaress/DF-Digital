import dotenv from 'dotenv';
dotenv.config();

import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'user',
  database: process.env.DB_NAME || 'dfDigital',
  waitForConnections: true,
  queueLimit: 0,
});

export {
  pool
};