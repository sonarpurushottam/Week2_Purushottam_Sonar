import express from "express";
import pool from "../pgConfig";

const router = express.Router();

async function ensureTableExists(tableName: string, createTableQuery: string) {
  try {
    const client = await pool.connect();

    const tableExists = await client.query(
      `SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = $1
      )`,
      [tableName]
    );

    if (!tableExists.rows[0].exists) {
      console.log(`Table "${tableName}" does not exist. Creating it...`);
      await client.query(createTableQuery);
      console.log(`Table "${tableName}" created successfully.`);
      return { created: true };
    } else {
      console.log(`Table "${tableName}" already exists.`);
      return { created: false };
    }

    await client.release();
  } catch (error) {
    console.error("Error checking or creating table:", error);
    throw error;
  }
}

router.post("/create-table", async (req, res) => {
  try {
    const { tableName, createTableQuery } = req.body;

    const result = await ensureTableExists(tableName, createTableQuery);

    if (result.created) {
      res.json({ message: "Table created successfully." });
    } else {
      res.json({ message: "Table already exists." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
