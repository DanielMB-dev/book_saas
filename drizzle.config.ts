import  { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config()

const url_db = (process.env.DATABASE_URL || "").toString

console.log(url_db)
export default defineConfig ({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
} )
