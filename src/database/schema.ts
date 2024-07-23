import {
  pgTable,
  integer,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
  id: serial('id').primaryKey().notNull().unique(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
});

export const BlogTable = pgTable('blog', {
  id: serial('id').primaryKey().notNull().unique(),
  title: varchar('title').notNull(),
  content: varchar('content').notNull(),
  owner: integer('owner')
    .notNull()
    .references(() => UserTable.id),
});
