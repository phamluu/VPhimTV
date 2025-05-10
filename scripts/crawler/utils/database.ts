import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

export async function getDB() {
  if (connection) return connection;

  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vphimtv',
  });

  return connection;
}
