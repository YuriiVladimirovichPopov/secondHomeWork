"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationErrors = exports.inputPostsValidation = exports.inputBlogsValidation = exports.authorizationValidation = void 0;
const express_validator_1 = require("express-validator");
const blogs_repository_1 = require("../repositories/blogs-repository");
const users_repository_1 = require("../repositories/users_repository");
exports.authorizationValidation = (0, express_validator_1.header)('authorization').custom((value) => {
    if (!users_repository_1.usersRepository.find(user => user.loginPassword === value)) {
        throw new Error('401');
    }
    return true;
});
exports.inputBlogsValidation = {
    name: (0, express_validator_1.body)('name')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({ min: 1, max: 15 })
        .withMessage('Length must be from 1 to 15 simbols'),
    description: (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({ min: 1, max: 500 })
        .withMessage('Length must be from 1 to 500 simbols'),
    websiteURL: (0, express_validator_1.body)('websiteURL')
        .isURL()
        .withMessage('Must be a URL')
};
exports.inputPostsValidation = {
    title: (0, express_validator_1.body)('title')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({ min: 1, max: 30 })
        .withMessage('Length must be from 1 to 30 simbols'),
    shortDescription: (0, express_validator_1.body)('shortDescription')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Length must be from 1 to 100 simbols'),
    content: (0, express_validator_1.body)('content')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({ min: 1, max: 1000 })
        .withMessage('Length must be from 1 to 1000 simbols'),
    blogId: (0, express_validator_1.body)('blogID')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({ min: 1, max: 100 })
        .withMessage('Length must be from 1 to 100 simbols')
        .custom((value) => {
        if (!blogs_repository_1.blogsRepository.findBlogById(value)) {
            throw new Error('Blog is not found');
        }
        return true;
    })
};
const inputValidationErrors = (req, res, next) => {
    const errorFormat = ({ msg, params }) => {
        return { message: msg, field: params };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormat);
    if (!errors.isEmpty()) {
        if (errors.array().find((err) => err.message === '401')) {
            return res.status(401).send('Unauthorized');
        }
        res.status(400).send('Bad Request').json({ errorMessages: errors.array() });
        return;
    }
    else {
        next();
    }
};
exports.inputValidationErrors = inputValidationErrors;
