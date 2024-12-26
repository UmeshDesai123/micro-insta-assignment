import express, { Router } from "express";
import {
    createPostHandler,
    getPostsByUserHandler,
    updatePostHandler,
    deletePostHandler,
    getAllPostsHandler,
} from "../controller/post.controller";
import { validationMiddleware } from "../middleware/validation";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";

const postRouter: Router = express.Router();

postRouter.post("/", validationMiddleware(CreatePostDto), createPostHandler); //Create post
postRouter.get("/", getAllPostsHandler); // Get all posts
postRouter.get("/user/:userId", getPostsByUserHandler); // Get all posts of a user
postRouter.put("/:postId", validationMiddleware(UpdatePostDto), updatePostHandler); // Edit a post
postRouter.delete("/:postId", deletePostHandler); // Delete a post

export default postRouter;
