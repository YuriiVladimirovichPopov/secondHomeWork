"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.blogsRouter = (0, express_1.Router)({});
const db = {
    blogs: [
        {
            "id": "0",
            "name": "string",
            "description": "string",
            "websiteUrl": "string"
        },
        {
            "id": "1",
            "name": "string",
            "description": "string",
            "websiteUrl": "string"
        }
    ],
    posts: []
};
exports.blogsRouter.get('/', (_req, res) => {
    res.status(200).send(db.blogs);
});
exports.blogsRouter.post('/', input_validation_middleware_1.authorizationValidation, input_validation_middleware_1.inputBlogsValidation.name, input_validation_middleware_1.inputBlogsValidation.description, input_validation_middleware_1.inputBlogsValidation.websiteURL, input_validation_middleware_1.inputValidationErrors, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const newBlogCreate = blogs_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res.status(201).send(newBlogCreate);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const foundBlog = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (!foundBlog) {
        res.status(404).send('No blog found');
    }
    else {
        res.status(200).send(foundBlog);
    }
});
exports.blogsRouter.put('/:id', input_validation_middleware_1.authorizationValidation, input_validation_middleware_1.inputBlogsValidation.name, input_validation_middleware_1.inputBlogsValidation.description, input_validation_middleware_1.inputBlogsValidation.websiteURL, input_validation_middleware_1.inputValidationErrors, (_req, _res) => {
    const id = _req.params.id;
    const name = _req.params.name;
    const description = _req.params.description;
    const websiteURL = _req.params.websiteUrl;
    const updateBlog = blogs_repository_1.blogsRepository.updateBlog(id, name, description, websiteURL);
    if (!updateBlog) {
        return _res.status(404).send('Not Found');
    }
    _res.status(204).send(updateBlog);
});
exports.blogsRouter.delete('/:id', input_validation_middleware_1.authorizationValidation, input_validation_middleware_1.inputValidationErrors, (req, res) => {
    const foundBlog = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (!foundBlog) {
        return res.status(404).send('Blog not found');
    }
    res.status(204).send('No Content');
});
