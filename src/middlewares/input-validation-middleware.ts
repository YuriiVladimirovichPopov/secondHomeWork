import {Response, Request, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { sendStatus } from "../routers/send-status";



export const authorizationValidation = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if(!auth) return res.sendStatus(401)
    const [authType, authData] = auth.split(' ')
    if (authType !== 'Basic' || authData !=='YWRtaW46cXdlcnR5') return res.sendStatus(401)
    return next()

}
/*
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
    .bail()
    .isLength({min: 1, max: 1000})
    .withMessage('Length must be from 1 to 1000 simbols')
    .bail(),
blogId: body('blogId')
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
*/
export const inputValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true})   
        const errorsMessages = errorsArray.map((e: any )=> ({message: e.msg, field: e.path}))
        
        res.status(sendStatus.BAD_REQUEST_400).json({ errorsMessages })
        return 
    } else {
        next()
    }
}
