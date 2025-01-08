// import { AppDataSource } from "../data-source";
// import { User } from "../entity/User";

import { User } from "../entity/User";
import { Post } from "../entity/post";

// const userRepo = AppDataSource.getRepository(User);

export const createUser = async (name: string, mobileNumber: number, address: string) => {
  const newUser = await User.create({ name, mobileNumber, address });
  return newUser.save();
  // const newUser = userRepo.create({ name, mobileNumber, address });
  // return await userRepo.save(newUser);
};

export const getAllUsers = async () => {
  const users = User.findAll({ include: [{ model: Post, as: "posts" }] });
  return users;
  // return await userRepo.find({ relations: ["posts"] });
};
