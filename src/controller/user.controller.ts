import { Request, Response } from "express";
import { createUser, getAllUsers } from "../repositories/user.repo";

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const { name, mobileNumber, address } = req.body;
        const user = await createUser(name, mobileNumber, address);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllUsersHandler = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
