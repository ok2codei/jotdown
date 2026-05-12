import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
console.log("Attempting to connect with URL:", process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ':****@'));

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
        rejectUnauthorized: false
    }
});

export default db;