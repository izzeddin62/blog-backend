import { BlogPersistance } from '../../persistance/blog.persistance';


export type BlogPersistanceMock = jest.Mocked<BlogPersistance>

export function mockBlogPersistance(): BlogPersistanceMock {
  return {
    create: jest.fn(),
    getOneById: jest.fn(),
    getAll: jest.fn(),
    getMyBlogs: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}