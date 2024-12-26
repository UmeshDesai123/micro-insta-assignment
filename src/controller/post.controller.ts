import { Request, Response } from "express";
import { createPost, deletePost, getAllPosts, getPostsByUser, updatePost } from "../repositories/post.repo";

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const { title, description, images, userId } = req.body;
    const post = await createPost(title, description, images, userId);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostsByUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const posts = await getPostsByUser(userId);
    res.json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updatePostHandler = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const updatedPost = await updatePost(postId, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deletePostHandler = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    await deletePost(postId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllPostsHandler = async (_req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
