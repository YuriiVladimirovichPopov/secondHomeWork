"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const blogs_repository_1 = require("./blogs-repository");
let postsArray = [];
exports.postsRepository = {
    findPostById(id) {
        return postsArray.find(post => post.id === id);
    },
    findAllPosts() {
        return postsArray;
    },
    createPost(title, shortDescription, content, blogId) {
        const postById = blogs_repository_1.blogsRepository.findBlogById(blogId);
        const newPost = {
            id: (postsArray.length + 1).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: postById.id,
            blogName: postById.name
        };
        postsArray.push(newPost);
        return newPost;
    },
    updatePost(id, title, shortDescription, content, blogId) {
        const foundPostById = postsArray.find(post => post.id === id);
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
        const foundPostById = postsArray.find(p => p.id === id);
        if (foundPostById) {
            postsArray = postsArray.filter(p => p !== foundPostById);
            return true;
        }
        return false;
    },
    deleteAllPosts() {
        postsArray.splice(0, postsArray.length);
    }
};
