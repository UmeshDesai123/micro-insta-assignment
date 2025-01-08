// import { AppDataSource } from "../data-source";
// import { Post } from "../entity/post";
// import { User } from "../entity/User";
// const postRepo = AppDataSource.getRepository(Post);
// const userRepo = AppDataSource.getRepository(User);

import { sequelize } from "../data-source";
import { CreatePostDto } from "../dto/create-post.dto";
import { User } from "../entity/User";
import { Post } from "../entity/post";

export const createPost = async (postData: CreatePostDto) => {
  // Start a transaction
  const transaction = await sequelize.transaction();
  try {
    // Check if the user exists
    const user: any = await User.findByPk(postData.userId, { transaction });
    if (!user) {
      throw new Error("User not found");
    }

    // Create a new post
    const newPost = await Post.create(
      {
        title: postData.title,
        description: postData.description,
        images: postData.images,
        userId: postData.userId,
      },
      { transaction }
    );

    // Update the user's postCount
    user.postCount += 1;
    await user.save({ transaction });

    // Commit the transaction
    await transaction.commit();

    return newPost;
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    throw error;
  }
};

// export const createPost = async (postData: CreatePostDto) => {
//   const user = await userRepo.findOne({ where: { id: userId } });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const newPost = postRepo.create({ title, description, images, user });
//   const savedPost = await postRepo.save(newPost);

//   // Increment the user's post count
//   user.postCount += 1;
//   await userRepo.save(user);

//   savedPost.user.postCount += 1;

//   return savedPost;
// };

export const getPostsByUser = async (userId: number) => {
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Post, as: 'posts'},
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;

  // const user = await userRepo.findOne({
  //   where: { id: userId },
  //   relations: ["posts"],
  // });

  // if (!user) {
  //   throw new Error("User not found");
  // }

  // return user.posts;
};

export const updatePost = async (postId: number, data) => {
  const post: any = await Post.findByPk(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Update the post fields
  if (data.title) post.title = data.title;
  if (data.description) post.description = data.description;
  if (data.images) post.images = data.images;

  // Save the updated post
  return await post.save();
};

// export const updatePost = async (postId: number, data) => {
//   const post = await postRepo.findOne({ where: { id: postId } });

//   if (!post) {
//     throw new Error("Post not found");
//   }

//   Object.assign(post, data);
//   return await postRepo.save(post);
// };

export const deletePost = async (postId: number) => {
  const transaction = await sequelize.transaction();

  try {
    // Find the post by ID
    const post: any = await Post.findByPk(postId, { transaction });

    if (!post) {
      throw new Error("Post not found");
    }

    // Find the associated user
    const user: any = await User.findByPk(post.userId, { transaction });

    if (!user) {
      throw new Error("User not found for this post");
    }

    // Delete the post
    await post.destroy({ transaction });

    // Decrement the user's post count
    user.postCount -= 1;
    if (user.postCount < 0) user.postCount = 0; // Prevent negative post counts
    await user.save({ transaction });

    // Commit the transaction
    await transaction.commit();

    return { message: "Post deleted successfully" };
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    throw error;
  }
};

// export const deletePost = async (postId: number) => {
//   const post = await postRepo.findOne({ 
//     where: { id: postId }, 
//     relations: ["user"]
//   });

//   if (!post) {
//     throw new Error("Post not found");
//   }

//   console.log('post>>>>>>>>.', post);

//   const user = post.user;

//   if (!user) {
//     throw new Error("User not associated with this post");
//   }

//   // Remove the post
//   await postRepo.remove(post);

//   // Decrement the user's post count
//   user.postCount -= 1;
//   await userRepo.save(user);
//   return;
// };

export const getAllPosts = async () => {
  return await Post.findAll({ include: [{ model: User, as: "user" }] });
  // return await postRepo.find({ relations: ["user"] });
};
