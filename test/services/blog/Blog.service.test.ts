import { BlogService } from '../../../src/services/blog/blog.service';
import { blogDtos, blogs } from '../../fixtures/blogs';
import {
  BlogPersistanceMock,
  mockBlogPersistance,
} from '../../mocks/blog.persistance.mock';

describe('Blog service', () => {
  let blogService: BlogService;
  let mockedBlogPersistance: BlogPersistanceMock;

  beforeEach(() => {
    mockedBlogPersistance = mockBlogPersistance();
    blogService = new BlogService(mockedBlogPersistance);
  });

  describe('GET BLOG', () => {
    it('should return a blog when getOneById is called with an valid id', async () => {
      const blog = blogs[0];
      mockedBlogPersistance.getOneById.mockResolvedValueOnce(blog);
      const returnedBlog = await blogService.getOneById(blog.id);
      expect(returnedBlog).toEqual(blog);
      expect(mockedBlogPersistance.getOneById).toHaveBeenCalledWith(blog.id);
    });

    it('should return null when getOneById is called with an invalid id', async () => {
      mockedBlogPersistance.getOneById.mockResolvedValueOnce(null);
      const returnedBlog = await blogService.getOneById(0);
      expect(returnedBlog).toBeNull();
      expect(mockedBlogPersistance.getOneById).toHaveBeenCalledWith(0);
    });
  });

  describe('GET ALL BLOGS', () => {
    it('should return all blogs when getAll is called', async () => {
      mockedBlogPersistance.getAll.mockResolvedValueOnce(blogs);
      const returnedBlogs = await blogService.getAll();
      expect(returnedBlogs).toEqual(blogs);
      expect(mockedBlogPersistance.getAll).toHaveBeenCalledOnce();
    });
  });

  describe('GET MY BLOGS', () => {
    it('should return all blogs when getAllMyBlogs is called with an ownerId', async () => {
      const ownerId = 1;
      const myBlogs = blogs.filter((blog) => blog.owner === ownerId);
      mockedBlogPersistance.getMyBlogs.mockResolvedValueOnce(myBlogs);
      const returnedBlogs = await blogService.getAllMyBlogs(ownerId);
      expect(returnedBlogs).toEqual(myBlogs);
      expect(mockedBlogPersistance.getMyBlogs).toHaveBeenCalledWith(ownerId);
    });
  });


  describe('CREATE BLOG', () => {
    it('should create a blog when create is called with valid data', async () => {
      const blog = blogs[0];
      const blogDTO = blogDtos[0];
      mockedBlogPersistance.create.mockResolvedValueOnce(blog);
      const returnedBlog = await blogService.create(blogDTO);
      expect(returnedBlog).toEqual(blog);
      expect(mockedBlogPersistance.create).toHaveBeenCalledWith(blogDTO);
    });
  });

  describe('UPDATE BLOG', () => {
    it('should update a blog when update is called with valid data', async () => {
      const blog = blogs[0];
      const blogDTO = blogDtos[0];
      mockedBlogPersistance.update.mockResolvedValueOnce(blog);
      const returnedBlog = await blogService.update(blog.id, blog.owner, blogDTO);
      expect(returnedBlog).toEqual(blog);
      expect(mockedBlogPersistance.update).toHaveBeenCalledWith(blogDTO, blog.id, blog.owner);
    });
  });

  describe('DELETE BLOG', () => {
    it('should delete a blog when delete is called with valid data', async () => {
      const blog = blogs[0];
      mockedBlogPersistance.delete.mockResolvedValueOnce(blog);
      const returnedBlog = await blogService.delete(blog.id, blog.owner);
      expect(returnedBlog).toEqual(blog);
      expect(mockedBlogPersistance.delete).toHaveBeenCalledWith(blog.id, blog.owner);
    });
  });
});
