import express from 'express';

import 'dotenv/config';
import {db} from './config/database.js';

import productRouter from './routes/product.route.js';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/v1/products', productRouter);

app.use('*', (req, res) => {
    res.status(404).json({message: 'not found'});
});

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
})

