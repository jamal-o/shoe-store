import express from "express";

import { verifyAdmin, verifyToken } from "../middlewares/auth.js";



import { getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct,

} from '../controllers/product.controller.js';



import { productSchema, jsonValidator } from "../middlewares/validators.js";

const router = express.Router();




router.get('/',getAllProducts);

router.get('/:id', getProduct);


router.post('/add', verifyToken, verifyAdmin, jsonValidator({body: productSchema}), createProduct);

router.patch('/update/:id', verifyToken, verifyAdmin, jsonValidator({body: productSchema}), updateProduct);


router.delete('/delete/:id', verifyToken, verifyAdmin, deleteProduct);

export default router;