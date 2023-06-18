"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../db/db");
const blogs_repository_1 = require("./blogs-repository");
//let postsArray: postsArrayType = []
exports.postsRepository = {
    findPostById(id) {
        return db_1.db.posts.find(post => post.id === id);
    },
    findAllPosts() {
        return db_1.db.posts;
    },
    createPost(title, shortDescription, content, blogId) {
        const postById = blogs_repository_1.blogsRepository.findBlogById(blogId);
        const newPost = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: postById.id,
            blogName: postById.name
        };
        db_1.db.posts.push(newPost);
        return newPost;
    },
    updatePost(id, title, shortDescription, content, blogId) {
        const foundPostById = db_1.db.posts.find(post => post.id === id);
        if (foundPostById) {
            foundPostById.title = title;
            foundPostById.shortDescription = shortDescription;
            foundPostById.content = content;
            foundPostById.blogId = blogId;
            return true;
        }
        return false;
    },
    deletePost(id) {
        const foundPostById = db_1.db.posts.find(p => p.id === id);
        if (foundPostById) {
            db_1.db.posts = db_1.db.posts.filter(p => p !== foundPostById);
            return true;
        }
        return false;
    },
    deleteAllPosts() {
        db_1.db.posts.splice(0, db_1.db.posts.length);
    }
};
