import  express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { blogsRouter } from './routers/blogs_router';
import { postsRouter } from './routers/posts_router';
import {testingRouter } from './routers/testing_router';
import { body } from 'express-validator';

export const app = express()
const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
const port = process.env.PORT || 3001


export type blogsType = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string, 
}

export type postsType = {
  id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export type DB = {
  blogs: blogsType[]
  posts: postsType[]
}
app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)

app.use('/testing', testingRouter)

/*app.delete('/testing/all-data', (_req: Request, res: Response) => {
  res.send('all data is deleted').status(204)
})
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//export { postsRouter };
 