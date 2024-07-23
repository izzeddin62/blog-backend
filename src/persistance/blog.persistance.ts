import { and, eq } from 'drizzle-orm';
import { db } from '../database/db';
import { BlogTable } from '../database/schema';
import { Blog, BlogProperties } from '../services/blog/blog';
import { PostgresError } from 'postgres';
import { NotFound } from '../services/errors/not-found.error';

type Row = {
  id: number;
  title: string;
  owner: number;
  content: string;
};

function rowToDomain(row: Row): Blog {
  return new Blog({
    id: row.id,
    title: row.title,
    owner: row.owner,
    content: row.content,
  
  });
}

export class BlogPersistance {
  async create(data: Omit<BlogProperties, 'id' | 'done'>) {
    try {
      const { title, owner, content } = data;
      const [blog] = await db
        .insert(BlogTable)
        .values({
          owner,
          title,
          content,
        })
        .returning();
      return rowToDomain(blog);
    } catch (error) {
      if (error instanceof PostgresError && error.code === '23503') {
        throw new NotFound('blog owner', 'id', String(data.owner));
      }
      throw error;
    }
  }

  async getOneById(id: number) {
    const [blog] = await db
      .select()
      .from(BlogTable)
      .where(eq(BlogTable.id, id));
    if (!blog) {
      return null;
    }
    return rowToDomain(blog);
  }

  async getAll() {
    const blogs = await db.select().from(BlogTable);
    return blogs.map(rowToDomain);
  }

  async getMyBlogs(ownerId: number) {
    const blogs = await db
      .select()
      .from(BlogTable)
      .where(eq(BlogTable.owner, ownerId));
    return blogs.map(rowToDomain);
  }

  async update(
    data: Partial<Omit<BlogProperties, 'id' | 'owner'>>,
    id: number,
    ownerId: number
  ) {
    const [blog] = await db
      .update(BlogTable)
      .set(data)
      .where(and(eq(BlogTable.id, id), eq(BlogTable.owner, ownerId)))
      .returning();
    if (!blog) {
      return null;
    }
    return rowToDomain(blog);
  }

  async delete(id: number, ownerId: number) {
    const [blog] = await db
      .delete(BlogTable)
      .where(and(eq(BlogTable.id, id), eq(BlogTable.owner, ownerId)))
      .returning();
    
    if (!blog) {
      return null;
    }
    return rowToDomain(blog);
  }
}

export const blogPersistance = new BlogPersistance();
