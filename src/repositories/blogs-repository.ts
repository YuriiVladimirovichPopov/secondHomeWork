import { db } from "../db/db";

export type blogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string, 
  }

export type blogsArrayType = Array<blogsType>

export const blogsRepository = {
    findAllBlogs(): blogsArrayType { 
        return db.blogs 
    },

    findBlogById(id: string): blogsType | undefined {
        const foundBlogById = db.blogs.find(b => b.id === id) 
        return foundBlogById
    },
    
    createBlog(name: string, description: string, website: string) {
        const newBlog: blogsType = {
            id: (db.blogs.length + 1).toString(),
            name: name,
            description: description,
            websiteUrl: website
        }
        db.blogs.push(newBlog)
        return newBlog
    },

    updateBlog(id: string, name: string, description: string, website: string) {
        const foundBlogById = db.blogs.find(b => b.id === id)
        if (foundBlogById) {
            foundBlogById.name = name
            foundBlogById.description = description
            foundBlogById.websiteUrl = website
            return true
        }
        return false
    },

    deleteBlog(id: string) {
        const foundBlogById = db.blogs.find(b => b.id === id)
        if (foundBlogById) {
            db.blogs = db.blogs.filter(b => b !== foundBlogById);
     return true
        } 
        return false
    },

    deleteAllBlogs() {
        db.blogs.splice(0, db.blogs.length)
    }
}