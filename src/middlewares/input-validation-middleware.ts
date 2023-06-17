import {NextFunction, Response, Request } from "express";
import { header, body, validationResult, ValidationError} from 'express-validator';
import { blogsRepository} from '../repositories/blogs-repository';
import { usersRepository } from "../repositories/users-repository";
import { sendStatus } from "../routers/send-status";



export const authorizationValidation = header('authorization').custom((value) => {
    const user = usersRepository.find(user => user.loginPassword === value)
    
    if (!user) {
        throw new Error('UNAUTHORIZED_401');
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
    websiteURL: body('websiteUrl')
        .isURL({})
        .withMessage('Must be a Url')

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
    
    const errorFormat = (error : ValidationError ) => {
        return {message: error.msg, field: error.msg}
    }
    const errors = validationResult(req).formatWith(errorFormat)
    if (!errors.isEmpty()) {
        if (errors.array().find((err: { message: string }) => err.message === 'UNAUTHORIZED_401')) {
            return res.sendStatus(sendStatus.UNAUTHORIZED_401);
        }
        const errorMessages = errors.array({onlyFirstError: true})
        console.log(errorMessages);
        
        res.status(sendStatus.BAD_REQUEST_400).json({ errorMessages })
        return 
    } else {
        next()
    }
}
