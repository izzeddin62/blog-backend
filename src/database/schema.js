"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTable = exports.UserTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.UserTable = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull().unique(),
    email: (0, pg_core_1.varchar)('email').notNull().unique(),
    password: (0, pg_core_1.varchar)('password').notNull(),
});
exports.BlogTable = (0, pg_core_1.pgTable)('blog', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull().unique(),
    title: (0, pg_core_1.varchar)('title').notNull(),
    content: (0, pg_core_1.varchar)('content').notNull(),
    owner: (0, pg_core_1.integer)('owner')
        .notNull()
        .references(() => exports.UserTable.id),
});
