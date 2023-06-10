"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const posts_repository_1 = require("../repositories/posts-repository");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => {
    blogs_repository_1.blogsRepository.deleteAllBlogs();
    posts_repository_1.postsRepository.deleteAllPosts();
    res.status(204).send('All data is deleted');
});
