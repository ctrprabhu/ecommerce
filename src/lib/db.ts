import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: import.meta.env.VITE_DB_HOST || "localhost",
  port: Number(import.meta.env.VITE_DB_PORT) || 3306,
  user: import.meta.env.VITE_DB_USER || "user",
  password: import.meta.env.VITE_DB_PASSWORD || "password",
  database: import.meta.env.VITE_DB_NAME || "electroshop",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
