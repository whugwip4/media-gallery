import mysql from "mysql2/promise";

// Пул подключений к MySQL из XAMPP. Настройки лежат в .env.local (образец в .env.example).
// В режиме разработки пул хранится в globalThis, чтобы горячая перезагрузка
// не открывала новые подключения при каждом сохранении файла.

const globalForDb = globalThis as unknown as { dbPool?: mysql.Pool };

export const db =
  globalForDb.dbPool ??
  mysql.createPool({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3307),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "media_gallery",
    charset: "utf8mb4",
    connectionLimit: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbPool = db;
}
