"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.postsRouter = (0, express_1.Router)({});
const db = {
    posts: [
        {
            "id": "Leva",
            "title": "First steps",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        },
        {
            "id": "Platon",
            "title": "First words",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        }
    ],
    blogs: []
};
exports.postsRouter.get('/', (_req, res) => {
    res.status(200).send(db.posts);
});
exports.postsRouter.post('/', input_validation_middleware_1.authorizationValidation, input_validation_middleware_1.inputPostsValidation.title, input_validation_middleware_1.inputPostsValidation.shortDescription, input_validation_middleware_1.inputPostsValidation.content, input_validation_middleware_1.inputPostsValidation.blogId, input_validation_middleware_1.inputValidationErrors, (req, res) => {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const newPost = posts_repository_1.postsRepository.createPost(title, shortDescription, content, blogId);
    res.status(201).send(newPost);
});
exports.postsRouter.get('/:id', (req, res) => {
    const foundPost = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (foundPost) {
        res.status(200).send('Ok');
    }
    else {
        res.status(404).send('Not Found');
    }
});
exports.postsRouter.put('/:id', input_validation_middleware_1.authorizationValidation, input_validation_middleware_1.inputPostsValidation.title, input_validation_middleware_1.inputPostsValidation.shortDescription, input_validation_middleware_1.inputPostsValidation.content, input_validation_middleware_1.inputPostsValidation.blogId, input_validation_middleware_1.inputValidationErrors, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const updatePost = posts_repository_1.postsRepository.updatePost(id, title, shortDescription, content, blogId);
    if (!updatePost) {
        return res.status(404).send('No post found');
    }
    res.status(204).send('No content');
});
exports.postsRouter.delete('/:id', input_validation_middleware_1.authorizationValidation, input_validation_middleware_1.inputValidationErrors, (req, res) => {
    const foundPost = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (!foundPost) {
        return res.status(404).send('Not Found');
    }
    res.status(204).send('No content');
});
