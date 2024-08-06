import express from "express";

import { verifyAdmin, verifyToken } from "../middlewares/auth.js";

import { getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,

} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/',getAllProducts);

router.get('/:id', getProduct);


router.post('/add', verifyToken, verifyAdmin, createProduct);

router.patch('/update/:id', verifyToken, verifyAdmin, updateProduct);


router.delete('/delete/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;