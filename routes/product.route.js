import express from "express";

import {test,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,

} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/',test);

router.get('/:id', getProduct);

router.patch('/update/:id', updateProduct);

router.post('/add/:id', createProduct);

router.delete('/delete/:id', deleteProduct);

export default router;