import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (name: string, mobileNumber: number, address: string) => {
  const newUser = userRepo.create({ name, mobileNumber, address });
  return await userRepo.save(newUser);
};

export const getAllUsers = async () => {
  return await userRepo.find({ relations: ["posts"] });
};
