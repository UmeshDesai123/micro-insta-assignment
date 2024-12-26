import { AppDataSource } from "../data-source";
import { Post } from "../entity/post";
import { User } from "../entity/User";

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);

export const createPost = async (
  title: string,
  description: string,
  images: string[],
  userId: number
) => {
  const user = await userRepo.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  const newPost = postRepo.create({ title, description, images, user });
  const savedPost = await postRepo.save(newPost);

  // Increment the user's post count
  user.postCount += 1;
  await userRepo.save(user);

  savedPost.user.postCount += 1;

  return savedPost;
};

export const getPostsByUser = async (userId: number) => {
  const user = await userRepo.findOne({
    where: { id: userId },
    relations: ["posts"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.posts;
};

export const updatePost = async (postId: number, data: Partial<Post>) => {
  const post = await postRepo.findOne({ where: { id: postId } });

  if (!post) {
    throw new Error("Post not found");
  }

  Object.assign(post, data);
  return await postRepo.save(post);
};

export const deletePost = async (postId: number) => {
  const post = await postRepo.findOne({ 
    where: { id: postId }, 
    relations: ["user"]
  });

  if (!post) {
    throw new Error("Post not found");
  }

  console.log('post>>>>>>>>.', post);

  const user = post.user;

  if (!user) {
    throw new Error("User not associated with this post");
  }

  // Remove the post
  await postRepo.remove(post);

  // Decrement the user's post count
  user.postCount -= 1;
  await userRepo.save(user);
  return;
};

export const getAllPosts = async () => {
  return await postRepo.find({ relations: ["user"] });
};
