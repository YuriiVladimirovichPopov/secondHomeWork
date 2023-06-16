"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogs_router_1 = require("./routers/blogs-router");
const posts_router_1 = require("./routers/posts-router");
const testing_router_1 = require("./routers/testing-router");
exports.app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
exports.app.use(corsMiddleware);
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3002;
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.use('/posts', posts_router_1.postsRouter);
exports.app.use('/testing', testing_router_1.testingRouter);
exports.app.listen(port, () => {
    console.log(`Listen ${port}`);
});
