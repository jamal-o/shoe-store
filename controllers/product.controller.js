

import {db} from '../config/database.js';

import { ObjectId } from 'mongodb';

const collection = await db.collection('products');

export const getProduct = async (req, res, next) => {
    try{
        const query = {_id: new ObjectId(req.params.id)};
        const product = await collection.findOne(query);
        console.log(`id: ${req.params.id}`);
        if(!product){
            return next({status: 404, message: 'Product not found!'});
        }

        res.status(200).json(product);


    }catch(error){
        next({status: 500, error});
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};
        await collection.deleteOne(query);
        res.status(200).json({message: "Product has been deleted!"});
        
    } catch (error) {
        next({status: 500, error});

    }
}

export const createProduct = async (req, res, next) =>{
    try {
        
        const data = {
            $set:{
                ...req.body,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        };

        const options = {
            returnDocument: "after",
        }

        const createdProduct = await collection.insertOne(data, options);
        
        res.status(200).json(createdProduct);

    } catch (error) {
        next({status: 500, error});
    }
}


export const updateProduct = async (req, res, next) =>{
    try {
        // if ()
        const query = {_id: new ObjectId(req.params.id)};

        const data = {
            $set:{
                ...req.body,
                updatedAt: new Date().toISOString(),
            },
        };

        const options = {
            returnDocument: "after",
        }

        const updatedProduct = await collection.findOneAndUpdate(query,data, options);
        
        res.status(200).json(updatedProduct);

    } catch (error) {
        next({status: 500, error});
    }
}

export const test = async (req,res,next) => {
  try {
      let results = await collection.find({}).toArray();
      console.log("Test route");
      res.status(200).json(results);
  } catch (error) {
    next({status: 500, error});
  }
};