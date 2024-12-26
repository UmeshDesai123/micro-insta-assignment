import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import userRouter from './routes/user-route';
import postRouter from './routes/post-route';

const PORT = process.env.PORT || 8000;
const app: Express = express();

//middlewares
app.use(express.json());

AppDataSource.initialize()
    .then(async () => {
        console.log('DB initialized successfully');
    })
    .catch(error => {
        console.error('Error during DB initialization:', error);
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
