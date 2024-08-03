import express from 'express';

import 'dotenv/config';


import productRouter from './routes/product.route.js';

import authRouter from './routes/auth.route.js';

import { errorHandler } from './middlewares/error_handler.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)

app.use('/api/v1/products', productRouter);

app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json({message: 'not found'});
});

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
})

