import {db} from '../config/database.js';
import { ObjectId } from "mongodb";

const collection = await db.collection('purchases');

export const getUserPurchases = async (req, res, next) => {
    try {
        const query = {user_id: new ObjectId(req.params.id)};

        const purchases = await collection.find(query).toArray();

        res.status(200).json({purchases});
    } catch (error) {
        next({status: 500, error});
    }
    
}


export const getUserPurchaseById = async (req, res, next) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};

        const purchase = await collection.findOne(query);

        if (!purchase) {
            return next({status: 404, message: 'Purchase not found!'});
        }

        res.status(200).json({purchase});
    } catch (error) {
        next({status: 500, error});
    }
    
}

export const createPurchase = async (req, res, next) => {
    try {
        const newPurchase = req.body;
        newPurchase.user_id = new ObjectId(req.user.id);
        newPurchase.createdAt = new Date().toISOString();
        newPurchase.updatedAt = new Date().toISOString();

        const purchase = await collection.insertOne(newPurchase);
        return res.status(200).json(purchase);
    } catch (error) {
        next({status: 500, error});
        
    }
    
}

export const updateTaskById = async (req, res, next) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};

        const data = {
            $set:{
                ...req.body,
                user_id: new ObjectId(req.user.id),
                updatedAt: new Date().toISOString(),
            }
        };

        const options = {
            returnDocument: 'after',
        }

        const updatedTask = await collection.findOneAndUpdate(query, data, options);
        

        


        if (!purchase) {
            return next({status: 404, message: 'Purchase not found!'});
        }

        res.status(200).json({purchase});
    } catch (error) {
        next({status: 500, error});
        
    }
    
}

export const deletePurchaseById = async (req, res, next) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};

      
        await collection.deleteOne(query,);
        


        res.status(200).json('Purchase has been deleted');
    } catch (error) {
        next({status: 500, error});
        
    }
    
}