import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from "express";
// import { AppDataSource } from "./data-source";
import userRouter from './routes/user-route';
import postRouter from './routes/post-route';
import { sequelize } from './data-source';
// import { Sequelize } from 'sequelize';

const PORT = process.env.PORT || 8000;
const app: Express = express();

//middlewares
app.use(express.json());

// AppDataSource.initialize()
//     .then(async () => {
//         console.log('DB initialized successfully');
//     })
//     .catch(error => {
//         console.error('Error during DB initialization:', error);
//     });

// const sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.USERNAME_DB,
//     process.env.PASSWORD_DB,
//     {
//         host: process.env.HOST_DB,
//         dialect: 'mysql'
//     }
// );

sequelize.authenticate().then(() => {
    console.log('DB Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

app.get('/', (req: Request, res: Response) => {
    res.send('hiii');
});


//Routes
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
