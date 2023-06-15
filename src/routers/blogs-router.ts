import {Request, Response, Router } from "express";
import { DB } from "..";
import {blogsRepository} from "../repositories/blogs-repository";
import { sendStatus } from "./send-status";
import { authorizationValidation,
          inputBlogsValidation,
          inputValidationErrors } from "../middlewares/input-validation-middleware";
export const blogsRouter = Router({})

const db: DB = {
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
}

blogsRouter.get('/', (_req: Request, res: Response) => {
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
const newBlogCreate = blogsRepository.createBlog(name, description, websiteUrl)
  res.sendStatus(sendStatus.CREATED_201).send(newBlogCreate)
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
    res.status(sendStatus.NO_CONTENT_204).send(updateBlog)
})
  
blogsRouter.delete('/:id', 
authorizationValidation,
inputValidationErrors, 
(req: Request, res: Response) => {
  const foundBlog = blogsRepository.deleteBlog(req.params.id);
  if (!foundBlog) {
    return res.status(404).send('Not found')
  }
res.status(204).send('No Content')
})