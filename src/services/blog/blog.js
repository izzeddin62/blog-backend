"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
class Blog {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.owner = data.owner;
        this.content = data.content;
    }
    getBlogProperties() {
        return {
            id: this.id,
            title: this.title,
            owner: this.owner,
            content: this.content,
        };
    }
}
exports.Blog = Blog;
