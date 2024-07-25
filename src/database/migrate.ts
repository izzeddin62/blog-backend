import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { config } from 'dotenv';
import postgres = require('postgres');
config();


const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dbUrl = `postgresql://${DB_USER}${DB_PASSWORD ? `:${DB_PASSWORD}` : ''}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const migrationClient = postgres(dbUrl, { max: 1 });

async function main() {
  const result = await migrationClient`SELECT 1 FROM pg_database WHERE datname = ${DB_NAME as string}`;
  if (result.length === 0) {
    console.log(`Creating database ${DB_NAME}...`);
    await migrationClient`CREATE DATABASE ${DB_NAME as string}`;
    console.log(`Database ${DB_NAME} created successfully.`);
  } else {
    console.log(`Database ${DB_NAME} already exists.`);
  }
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './src/database/migrations',
  });

  await migrationClient.end();
}

main();
