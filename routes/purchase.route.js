import express from 'express';

import{ createPurchase, deletePurchaseById, getUserPurchaseById, getUserPurchases, updateTaskById } from '../controllers/purchase_controller.js';

import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, getUserPurchases);

router.get('/:id', verifyToken, getUserPurchaseById);

router.post('/create', verifyToken, createPurchase);

router.patch('/:id', verifyToken, updateTaskById);

router.delete(':/id', verifyToken, deletePurchaseById)

export default router;