import pg from "pg";
import env from "dotenv";
env.config();

const isProduction = process.env.NODE_ENV === "production";

// Render PostgreSQL bağlantısı için DATABASE_URL kullan, yoksa lokal ayarlar
const db = new pg.Client(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
      }
);

db.connect().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

export default db;