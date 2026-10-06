import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

// GET /api/health показывает, видит ли сервер базу данных.
export async function GET() {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT (SELECT COUNT(*) FROM categories) AS categories, (SELECT COUNT(*) FROM users) AS users",
    );
    return Response.json({ status: "ok", database: "connected", ...rows[0] });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        status: "error",
        database: "unavailable",
        message: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 503 },
    );
  }
}
