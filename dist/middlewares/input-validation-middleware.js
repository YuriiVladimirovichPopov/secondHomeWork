"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationErrors = exports.inputPostsValidation = exports.inputBlogsValidation = exports.authorizationValidation = void 0;
const express_validator_1 = require("express-validator");
const blogs_repository_1 = require("../repositories/blogs-repository");
const send_status_1 = require("../routers/send-status");
const authorizationValidation = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.sendStatus(401);
    const [authType, authData] = auth.split(' ');
    if (authType !== 'Basic' || authData !== 'YWRtaW46cXdlcnR5')
        return res.sendStatus(401);
    return next();
};
exports.authorizationValidation = authorizationValidation;
exports.inputBlogsValidation = {
    name: (0, express_validator_1.body)('name')
        .trim()
        .isString()
        .withMessage('Must be string')
        .bail()
        .isLength({ min: 1, max: 15 })
        .withMessage('Length must be from 1 to 15 simbols')
        .bail(),
    description: (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('Must be string')
        .bail()
        .isLength({ min: 1, max: 500 })
        .withMessage('Length must be from 1 to 500 simbols')
        .bail(),
    websiteURL: (0, express_validator_1.body)('websiteUrl')
        .isURL({})
        .withMessage('Must be a Url')
        .bail()
};
exports.inputPostsValidation = {
    title: (0, express_validator_1.body)('title')
        .trim()
        .isString()
        .withMessage('Must be string')
        .bail()
        .isLength({ min: 1, max: 30 })
        .withMessage('Length must be from 1 to 30 simbols')
        .bail(),
    shortDescription: (0, express_validator_1.body)('shortDescription')
        .trim()
        .isString()
        .withMessage('Must be string')
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage('Length must be from 1 to 100 simbols')
        .bail(),
    content: (0, express_validator_1.body)('content')
        .trim()
        .isString()
        .withMessage('Must be string')
        .bail()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Length must be from 1 to 1000 simbols')
        .bail(),
    blogId: (0, express_validator_1.body)('blogID')
        .trim()
        .isString()
        .withMessage('Must be string')
        .bail()
        .isLength({ min: 1, max: 100 })
        .withMessage('Length must be from 1 to 100 simbols')
        .bail()
        .custom((value) => {
        if (!blogs_repository_1.blogsRepository.findBlogById(value)) {
            throw new Error('Blog is not found');
        }
        return true;
    })
};
const inputValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({ onlyFirstError: true });
        const errorsMessages = errorsArray.map((e) => ({ message: e.msg, field: e.path }));
        res.status(send_status_1.sendStatus.BAD_REQUEST_400).json({ errorsMessages });
        return;
    }
    else {
        next();
    }
};
exports.inputValidationErrors = inputValidationErrors;
