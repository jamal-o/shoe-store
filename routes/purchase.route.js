import express, { json } from 'express';

import{ createPurchase, deletePurchaseById, getUserPurchaseById, getUserPurchases, updatePurchaseById } from '../controllers/purchase_controller.js';

import { verifyAdmin, verifyToken } from '../middlewares/auth.js';
import { jsonValidator, purchaseSchema } from '../middlewares/validators.js';

const router = express.Router();

router.get('/', verifyToken, getUserPurchases);

router.get('/:id', verifyToken, getUserPurchaseById);

router.post('/create', verifyToken, jsonValidator({body: purchaseSchema}), createPurchase);

router.patch('/:id', verifyToken, verifyAdmin, jsonValidator({body: purchaseSchema}), updatePurchaseById);

//it might not be proper to delete purchases
// router.delete(':/id', verifyToken, deletePurchaseById)

export default router;