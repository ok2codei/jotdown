import fs from "fs";
import db from "../config/db.js";

async function initDB() {
 try {

  const sql = fs.readFileSync(
   new URL("./schema.sql", import.meta.url)
  ).toString();

  await db.query(sql);

  console.log("Database schema initialized");

 } catch (error) {
  console.error("Database init failed:", error);
 }
}

export default initDB;