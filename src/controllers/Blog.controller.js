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
exports.blogController = exports.BlogController = void 0;
const blog_service_1 = require("../services/blog/blog.service");
const not_found_error_1 = require("../services/errors/not-found.error");
class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
        this.blogService = blogService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                const owner = req.user.id;
                const data = { title, content, owner };
                const blog = yield this.blogService.create(data);
                return res.status(201).json({ blog: blog.getBlogProperties() });
            }
            catch (error) {
                if (error instanceof not_found_error_1.NotFound) {
                    return res.status(404).json({ error: error.message });
                }
                return res.status(500).json({ error: 'Server error. Please try again later' });
            }
        });
    }
    getOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const blog = yield this.blogService.getOneById(Number(id));
            if (!blog) {
                return res.status(404).json({ error: 'blog not found' });
            }
            return res.json({ blog: blog.getBlogProperties() });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield this.blogService.getAll();
            res.json({ blogs: blogs.map((blog) => blog.getBlogProperties()) });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: blogId } = req.params;
            const { id: userId } = req.user;
            const data = req.body;
            const blog = yield this.blogService.update(Number(blogId), userId, data);
            if (!blog) {
                return res.status(404).json({ error: 'blog not found' });
            }
            return res.json({ blog: blog.getBlogProperties() });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: blogId } = req.params;
            const { id: userId } = req.user;
            const blog = yield this.blogService.delete(Number(blogId), userId);
            if (!blog) {
                return res.status(404).json({ error: 'blog not found' });
            }
            return res.status(204).end();
        });
    }
}
exports.BlogController = BlogController;
exports.blogController = new BlogController(blog_service_1.blogService);
