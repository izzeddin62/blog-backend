"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = exports.BlogService = void 0;
const blog_persistance_1 = require("../../persistance/blog.persistance");
class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
        this.blogRepository = blogRepository;
    }
    create(data) {
        return this.blogRepository.create(data);
    }
    getOneById(id) {
        return this.blogRepository.getOneById(id);
    }
    getAllMyBlogs(ownerId) {
        return this.blogRepository.getMyBlogs(ownerId);
    }
    getAll() {
        return this.blogRepository.getAll();
    }
    update(blogId, ownerId, data) {
        return this.blogRepository.update(data, blogId, ownerId);
    }
    delete(blogId, ownerId) {
        return this.blogRepository.delete(blogId, ownerId);
    }
}
exports.BlogService = BlogService;
exports.blogService = new BlogService(blog_persistance_1.blogPersistance);
