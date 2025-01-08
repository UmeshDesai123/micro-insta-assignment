
import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME_DB,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST_DB,
        dialect: 'mysql'
    }
);
// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./entity/User";
// import { Post } from "./entity/post";

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.HOST_DB,
//     port: Number(process.env.PORT_DB),
//     username: process.env.USERNAME_DB,
//     password: process.env.PASSWORD_DB,
//     database: process.env.DATABASE,
//     synchronize: true,
//     logging: true,
//     entities: [User, Post],
//     migrations: [],
//     subscribers: [],
// });

