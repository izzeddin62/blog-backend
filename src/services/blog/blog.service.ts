import { blogPersistance, BlogPersistance } from '../../persistance/blog.persistance';
import { BlogProperties } from './blog';

export class BlogService {

  constructor(private blogRepository: BlogPersistance) {
    this.blogRepository = blogRepository;
  }

  create(data: Omit<BlogProperties, 'id' | 'done'>) {
    return this.blogRepository.create(data);
  }

  getOneById(id: number) {
    return this.blogRepository.getOneById(id);
  }

  getAllMyBlogs(ownerId: number) {
    return this.blogRepository.getMyBlogs(ownerId);
  }

  getAll() {
    return this.blogRepository.getAll();
  }

  update(blogId: number, ownerId: number, data: Partial<Omit<BlogProperties, 'id' | 'done'>>) {
    return this.blogRepository.update(data, blogId, ownerId);
  }

  delete(blogId: number, ownerId: number) {
    return this.blogRepository.delete(blogId, ownerId);
  }
}

export const blogService = new BlogService(blogPersistance);