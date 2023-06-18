import {Request, Response, Router } from "express";
import { blogsRepository, } from '../repositories/blogs-repository';
import { sendStatus } from "./send-status";
import { authorizationValidation,
          inputValidationErrors } from "../middlewares/input-validation-middleware";
import { db } from "../db/db";
import { CreateBlogValidation, UpdateBlogValidation } from "../middlewares/validations/blogs.validation";
export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    console.log(db.blogs);
    
    res.status(sendStatus.OK_200).send(db.blogs)
  })
  
blogsRouter.post('/',
  authorizationValidation,
  ...CreateBlogValidation,
(req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
  console.log(newBlog);
  
  res.status(sendStatus.CREATED_201).send(newBlog)
})
  
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogById(req.params.id)
    if (foundBlog) {
      res.status(sendStatus.OK_200).send(foundBlog)
    } else {
      res.sendStatus(sendStatus.NOT_FOUND_404)
    }
  })
  
blogsRouter.put('/:id',
  authorizationValidation,
  UpdateBlogValidation,
(req: Request, res: Response) => {
  const id = req.params.id
  const name = req.body.name  //body
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const updateBlog = blogsRepository.updateBlog(id, name, description, websiteUrl)
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