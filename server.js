import express from 'express';

import 'dotenv/config';


import apiDocConfigjson from './config/openapi.json' assert {type: 'json'};

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import productRouter from './routes/product.route.js';

import authRouter from './routes/auth.route.js';

import purchaseRouter from './routes/purchase.route.js';

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

app.use('/api/v1/purchase', purchaseRouter)





const options = {
    definition: apiDocConfigjson,
    apis: ["./routes/*.js"],
  };
  
//   const options = {
//     definition: {
//       openapi: "3.1.0",
//       info: {
//         title: "Barb shoe store Express API with Swagger",
//         version: "0.1.0",
//         description:
//           "This is an e-commerce API application made with Express and documented with Swagger",
//         license: {
//           name: "MIT",
//           url: "https://spdx.org/licenses/MIT.html",
//         },
//         contact: {
//           name: "Admin",
//           url: "https://barbstore.com",
//           email: "admin@barbstore.com",
//         },
//       },
//       servers: [
//         {
//           url: `http://localhost:${PORT}`,
//         },
//       ],
//     },
//     apis: ["./routes/*.js"],
//   };
  
  const specs = swaggerJsdoc(options);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
  );


  app.use('*', (req, res) => {
    res.status(404).json({message: 'not found'});
});

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
})

