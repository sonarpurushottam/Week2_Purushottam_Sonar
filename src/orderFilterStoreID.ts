import express from "express";
import { Request, Response } from "express";
import pool from "./pgConfig";

const router = express.Router();

router.post("/items", async (req: Request<{ items: any[] }>, res: Response) => {
  try {
    const { items }: { items: any[] } = req.body;

    if (!items || !Array.isArray(items)) {
      throw new Error(
        "Invalid request body. Expected an array of items with OrderBlocks."
      );
    }

    const filteredItems = items.filter((item) =>
      item.OrderBlocks.some((block: { lineNo: number | number[] }) =>
        Array.isArray(block.lineNo)
          ? block.lineNo.some((lineNo) => lineNo % 3 === 0)
          : block.lineNo % 3 === 0
      )
    );

    if (filteredItems.length === 0) {
      console.log("No orders found to meet the filtering criteria.");
      return res.json({ message: "No matching orders found." });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const orderIdValues = filteredItems.flatMap((item: any) =>
        item.OrderBlocks.map((block: any) => block.lineNo)
          .filter((lineNo: any) => lineNo % 3 === 0)
          .map((lineNo: any) => [item.orderID])
      );

      const insertQuery = `INSERT INTO orders (orderID) VALUES ($1)`;

      await Promise.all(
        orderIdValues.map((values) => client.query(insertQuery, values))
      );

      await client.query("COMMIT");
      console.log("OrderID successfully inserted into database.");
      res.json({
        message:
          "Orders filtered and orderID inserted successfully into database.",
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while processing request." });
  }
});

export default router;
