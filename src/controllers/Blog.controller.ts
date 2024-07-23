import { Request, Response } from 'express';
import { BlogService, blogService } from '../services/blog/blog.service';
import { NotFound } from '../services/errors/not-found.error';
import { BlogProperties } from '../services/blog/blog';

interface CreateBlogRequest extends Request {
  body: Omit<BlogProperties, 'id'>;
  user: {
    id: number;
  };
}
interface UpdateBlogRequest extends Request {
  body: Partial<Omit<BlogProperties, 'id' | 'done'>>;
  user: {
    id: number;
  };
}
interface GetBlogRequest extends Request {
  user: {
    id: number;
  };
}

export class BlogController {
  constructor(private blogService: BlogService) {
    this.blogService = blogService;
  }

  async create(req: CreateBlogRequest, res: Response) {
    try {
      const { title, content } = req.body;
      const owner = req.user.id;
      const data = { title, content, owner };
      const blog = await this.blogService.create(data);
      return res.status(201).json({ blog: blog.getBlogProperties() });
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Server error. Please try again later' });
    }
  }

  async getOneById(req: GetBlogRequest, res: Response) {
    const { id } = req.params;
    const blog = await this.blogService.getOneById(Number(id));
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }
    return res.json({ blog: blog.getBlogProperties() });
  }

  async getAll(req: GetBlogRequest, res: Response) {
    const blogs = await this.blogService.getAll();
    res.json({ blogs: blogs.map((blog) => blog.getBlogProperties()) });
  }

  async update(req: UpdateBlogRequest, res: Response) {
    const { id: blogId } = req.params;
    const { id: userId } = req.user;
    const data = req.body;
    const blog = await this.blogService.update(Number(blogId), userId, data);
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }
    return res.json({ blog: blog.getBlogProperties() });
  }

  async delete(req: GetBlogRequest, res: Response) {
    const { id: blogId } = req.params;
    const { id: userId } = req.user;
    const blog = await this.blogService.delete(Number(blogId), userId);
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }
    return res.status(204).end();
  }
}

export const blogController = new BlogController(blogService);
