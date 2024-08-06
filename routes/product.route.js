import express from "express";

import { verifyToken } from "../middlewares/auth.js";

import { getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,

} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/',getAllProducts);

router.post('/add', verifyToken, createProduct);

router.get('/:id', verifyToken, getProduct);

router.patch('/update/:id', verifyToken, updateProduct);


router.delete('/delete/:id', verifyToken, deleteProduct);

export default router;