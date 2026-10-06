// Создаёт базу media_gallery с таблицами и заполняет справочник категорий.
// Запуск: npm run db:setup (перед этим запустить MySQL в панели XAMPP).
// Скрипты написаны через IF NOT EXISTS / INSERT IGNORE, поэтому повторный запуск ничего не ломает.

import { readFile } from "node:fs/promises";
import mysql from "mysql2/promise";

const SQL_FILES = ["database/schema.sql", "database/seed.sql"];
const TABLES = ["users", "categories", "materials", "sessions"];

const connection = await mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3307),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  charset: "utf8mb4",
  multipleStatements: true,
});

try {
  for (const file of SQL_FILES) {
    const sql = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    await connection.query(sql);
    console.log(`Выполнен ${file}`);
  }

  console.log("\nЗаписей в таблицах:");
  for (const table of TABLES) {
    const [[row]] = await connection.query(`SELECT COUNT(*) AS count FROM media_gallery.${table}`);
    console.log(`  ${table}: ${row.count}`);
  }
} catch (error) {
  console.error(`Не удалось создать базу: ${error.message}`);
  process.exitCode = 1;
} finally {
  await connection.end();
}
