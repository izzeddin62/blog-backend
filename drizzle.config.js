/* eslint-disable no-undef */
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config();


/** @type { import("drizzle-kit").Config } */
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dbCredentials: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? 'kaadol',
  },
  verbose: true,
  strict: true
});
