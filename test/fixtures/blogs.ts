import { Blog, BlogProperties } from '../../src/services/blog/blog';

export const blogDtos: BlogProperties[] = [
  { title: 'My first blog', content: 'This is my first blog', id: 1, owner: 1 },
  { title: 'Second blog', content: 'This is my second blog', id: 2, owner: 2 },
  { title: 'Third blog', content: 'This is my third blog', id: 3, owner: 3 },
  { title: 'Fourth blog', content: 'This is my fourth blog', id: 4, owner: 4 },
  { title: 'Fifth blog', content: 'This is my fifth blog', id: 5, owner: 5 },
  { title: 'Sixth blog', content: 'This is my sixth blog', id: 6, owner: 6 },
  { title: 'Second blog', content: 'This is my second blog', id: 2, owner: 2 },
  { title: 'Third blog', content: 'This is my third blog', id: 3, owner: 3 },
  { title: 'Fourth blog', content: 'This is my fourth blog', id: 4, owner: 4 },
  { title: 'Fifth blog', content: 'This is my fifth blog', id: 5, owner: 5 },
  { title: 'Sixth blog', content: 'This is my sixth blog', id: 6, owner: 6 },
];


export const blogs = blogDtos.map((blog) => new Blog(blog));
