import {Request, Response, Router } from "express";
import { blogsRepository, } from '../repositories/blogs-repository';
import { sendStatus } from "./send-status";
import { authorizationValidation,
          inputBlogsValidation,
          inputValidationErrors } from "../middlewares/input-validation-middleware";
import { db } from "../db/db";
export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    console.log(req.params);
    res.status(sendStatus.OK_200).send(db.blogs)
  })
  
blogsRouter.post('/',
  authorizationValidation,
  inputBlogsValidation.name,
  inputBlogsValidation.description,
  inputBlogsValidation.websiteURL,
  inputValidationErrors, 
(req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
  res.sendStatus(sendStatus.CREATED_201).send(newBlog)
})
  
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogById(req.params.id)
    if (!foundBlog) {
      res.sendStatus(sendStatus.NOT_FOUND_404)
    } else {
      res.status(sendStatus.OK_200).send(foundBlog)
    }
  })
  
blogsRouter.put('/:id',
  authorizationValidation,
  inputBlogsValidation.name,
  inputBlogsValidation.description,
  inputBlogsValidation.websiteURL,
  inputValidationErrors,
(req: Request, res: Response) => {
  const id = req.params.id
  const name = req.params.name
  const description = req.params.description
  const websiteURL = req.params.websiteUrl
  const updateBlog = blogsRepository.updateBlog(id, name, description, websiteURL)
    if (!updateBlog) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    }
    res.sendStatus(sendStatus.NO_CONTENT_204)
})
  
blogsRouter.delete('/:id', 
  authorizationValidation,
  inputValidationErrors, 
(req: Request, res: Response) => {
  const foundBlog = blogsRepository.deleteBlog(req.params.id);
  if (!foundBlog) {
    return res.sendStatus(sendStatus.NOT_FOUND_404)
  }
  res.sendStatus(sendStatus.NO_CONTENT_204)
})