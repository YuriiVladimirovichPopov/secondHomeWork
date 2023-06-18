import { body } from "express-validator"
import { inputValidationErrors } from "../input-validation-middleware"





const titleValidation = body('title')
                                    .isString()
                                    .withMessage('Must be string')
                                    .trim()
                                    .isEmpty()
                                    .isLength({min: 1, max: 30})
                                    .withMessage('Length must be from 1 to 30 simbols')
const shortDescriptionValidation = body('shortDescription')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim().isEmpty()
                                        .isLength({min: 1, max: 100})
                                        .withMessage('Length must be from 1 to 100 simbols')
const contentValidation = body('content')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim().isEmpty()
                                        .isLength({min: 1, max: 1000})
                                        .withMessage('Length must be from 1 to 1000 simbols')  
const blogIdValidation =  body('blogID')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim().isEmpty()
                                        .isLength({min: 1, max: 100})
                                        .withMessage('Length must be from 1 to 100 simbols')

export const CreatePostValidation = 
    [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationErrors]
export const UpdatePostValidation = 
    [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationErrors]