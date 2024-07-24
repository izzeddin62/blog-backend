"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPersistance = exports.BlogPersistance = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../database/db");
const schema_1 = require("../database/schema");
const blog_1 = require("../services/blog/blog");
const postgres_1 = require("postgres");
const not_found_error_1 = require("../services/errors/not-found.error");
function rowToDomain(row) {
    return new blog_1.Blog({
        id: row.id,
        title: row.title,
        owner: row.owner,
        content: row.content,
    });
}
class BlogPersistance {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, owner, content } = data;
                const [blog] = yield db_1.db
                    .insert(schema_1.BlogTable)
                    .values({
                    owner,
                    title,
                    content,
                })
                    .returning();
                return rowToDomain(blog);
            }
            catch (error) {
                if (error instanceof postgres_1.PostgresError && error.code === '23503') {
                    throw new not_found_error_1.NotFound('blog owner', 'id', String(data.owner));
                }
                throw error;
            }
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [blog] = yield db_1.db
                .select()
                .from(schema_1.BlogTable)
                .where((0, drizzle_orm_1.eq)(schema_1.BlogTable.id, id));
            if (!blog) {
                return null;
            }
            return rowToDomain(blog);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.db.select().from(schema_1.BlogTable);
            return blogs.map(rowToDomain);
        });
    }
    getMyBlogs(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.db
                .select()
                .from(schema_1.BlogTable)
                .where((0, drizzle_orm_1.eq)(schema_1.BlogTable.owner, ownerId));
            return blogs.map(rowToDomain);
        });
    }
    update(data, id, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [blog] = yield db_1.db
                .update(schema_1.BlogTable)
                .set(data)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.BlogTable.id, id), (0, drizzle_orm_1.eq)(schema_1.BlogTable.owner, ownerId)))
                .returning();
            if (!blog) {
                return null;
            }
            return rowToDomain(blog);
        });
    }
    delete(id, ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [blog] = yield db_1.db
                .delete(schema_1.BlogTable)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.BlogTable.id, id), (0, drizzle_orm_1.eq)(schema_1.BlogTable.owner, ownerId)))
                .returning();
            if (!blog) {
                return null;
            }
            return rowToDomain(blog);
        });
    }
}
exports.BlogPersistance = BlogPersistance;
exports.blogPersistance = new BlogPersistance();
