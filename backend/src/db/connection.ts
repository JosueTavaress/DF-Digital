import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  user: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'user',
  database: process.env.DB_NAME || 'dfDigital',
});

export {
  connection
};