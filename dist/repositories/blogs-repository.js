"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db_1 = require("../db/db");
exports.blogsRepository = {
    findAllBlogs() {
        return db_1.db.blogs;
    },
    findBlogById(id) {
        const foundBlogById = db_1.db.blogs.find(b => b.id === id);
        return foundBlogById;
    },
    createBlog(name, description, website) {
        const newBlog = {
            id: (db_1.db.blogs.length + 1).toString(),
            name: name,
            description: description,
            websiteUrl: website
        };
        db_1.db.blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name, description, website) {
        const foundBlogById = db_1.db.blogs.find(b => b.id === id);
        if (foundBlogById) {
            foundBlogById.name = name;
            foundBlogById.description = description;
            foundBlogById.websiteUrl = website;
            return true;
        }
        return false;
    },
    deleteBlog(id) {
        const foundBlogById = db_1.db.blogs.find(b => b.id === id);
        if (foundBlogById) {
            db_1.db.blogs = db_1.db.blogs.filter(b => b !== foundBlogById);
            return true;
        }
        return false;
    },
    deleteAllBlogs() {
        db_1.db.blogs.splice(0, db_1.db.blogs.length);
    }
};
