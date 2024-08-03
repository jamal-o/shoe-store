import express from "express";

import { getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,

} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/',getAllProducts);

router.post('/add', createProduct);

router.get('/:id', getProduct);

router.patch('/update/:id', updateProduct);


router.delete('/delete/:id', deleteProduct);

export default router;