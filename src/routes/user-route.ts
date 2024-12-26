import { Router } from "express";
import { validationMiddleware } from "../middleware/validation";
import { CreateUserDto } from "../dto/create-user.dto";
import { createUserHandler, getAllUsersHandler } from "../controller/user.controller";

const userRouter: Router = Router();

userRouter.post('/', validationMiddleware(CreateUserDto), createUserHandler);
userRouter.get('/', getAllUsersHandler);

export default userRouter;