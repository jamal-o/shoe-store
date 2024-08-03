import express from "express";

import {test,
    getProduct,
    updateProduct,
    deleteProduct,

} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/',test);

router.get('/:id', getProduct);

router.patch('/update/:id', updateProduct);

router.delete('/delete/:id', deleteProduct);

export default router;