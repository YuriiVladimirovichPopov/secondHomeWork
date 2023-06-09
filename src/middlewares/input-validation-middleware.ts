import {NextFunction, Response, Request } from "express";
import {header, body, validationResult, ValidationError} from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";
import { usersRepository } from "../repositories/users_repository";
import { isParameter } from "typescript";


export const authorizationValidation = header('authorization').custom((value) => {
    if (!usersRepository.find(user => user.loginPassword === value)) {
        throw new Error('401')
    }
    return true
})

export const inputBlogsValidation = {
    name: body('name')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({min: 1, max: 15})
        .withMessage('Length must be from 1 to 15 simbols'),
    description: body('description')
        .trim()
        .isString()
        .withMessage('Must be string')
        .isLength({min: 1, max: 500})
        .withMessage('Length must be from 1 to 500 simbols'),
    websiteURL: body('websiteURL')
        .isURL()
        .withMessage('Must be a URL')

}
export const inputPostsValidation = {
    title: body('title')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 30})
    .withMessage('Length must be from 1 to 30 simbols'),
shortDescription: body('shortDescription')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 100})
    .withMessage('Length must be from 1 to 100 simbols'),
content: body('content')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 1000})
    .withMessage('Length must be from 1 to 1000 simbols'),
blogId: body('blogID')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 100})
    .withMessage('Length must be from 1 to 100 simbols')
    .custom((value: any) => {
        if (!blogsRepository.findBlogById(value)) {
            throw new Error('Blog is not found');
        }
        return true;
        })
    }

export const inputValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errorFormat = ({msg, param} : ValidationError) => {
        return {message: msg, field: param}
    }
    const errors = validationResult(req).formatWith(errorFormat)
    if (!errors.isEmpty()) {
        if (errors.array().find((err: { message: string; }) => err.message === '401')) {
            return res.status(401).send('Unauthorized');
        }
        res.status(400).send('Bad Request').json({ errorMessages: errors.array()})
        return 
    } else {
        next()
    }
}
