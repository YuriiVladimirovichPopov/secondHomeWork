"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogsArray = [];
exports.blogsRepository = {
    findAllBlogs() {
        return blogsArray;
    },
    findBlogById(id) {
        const foundBlogById = blogsArray.find(b => b.id === id);
        return foundBlogById;
    },
    createBlog(name, description, website) {
        const newBlog = {
            id: (blogsArray.length + 1).toString(),
            name: name,
            description: description,
            websiteUrl: website
        };
        blogsArray.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name, description, website) {
        const foundBlogById = blogsArray.find(b => b.id === id);
        if (foundBlogById) {
            foundBlogById.name = name;
            foundBlogById.description = description;
            foundBlogById.websiteUrl = website;
            return true;
        }
        return false;
    },
    deleteBlog(id) {
        const foundBlogById = blogsArray.find(b => b.id === id);
        if (foundBlogById) {
            blogsArray = blogsArray.filter(b => b !== foundBlogById);
            return true;
        }
        return false;
    },
    deleteAllBlogs() {
        blogsArray.splice(0, blogsArray.length);
    }
};
