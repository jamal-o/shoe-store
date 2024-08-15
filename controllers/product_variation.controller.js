import { ObjectId, ReturnDocument } from "mongodb";
import { db } from "../config/database.js";

const collection = await db.collection('product_variations');

export const getProductVariations = async (productId)=>{
    try {
        const query = {product_id: new ObjectId(productId)};

        const variations = await collection.find(query);

        if(variations){
            return null;
        }else{
            
            return variations;
        }

    } catch (error) {
        return null;
    }
}


export const deleteProductVariations = async(productId)=>{
    try {
        const query = {product_id: new ObjectId(productId)};

        let result = await collection.deleteMany(query);

        if (result.deletedCount ===0) {
            return "product has no variations to delete";
        }else {
            return 'variations have been deleted';
        }

       

    } catch (error) {
        return "An error occured while deleting";
    }
}


export const deleteVariationById = async(variationId)=>{
    try {
        const query = {_id: new ObjectId(variationId)};

        let result = await collection.deleteOne(query);

        if (result.deletedCount ===0) {
            return "product has no variations to delete";
        }else {
            return 'variations have been deleted';
        }

       

    } catch (error) {
        return "An error occured while deleting";
    }
}

export const createVariation = async (body)=>{

    try {
        const data = {
            quantity: body.quantity,
            properties:body.properties,
            product_id: body.product_id,
            createdAt: new Date().toISOString,
            
        }

        const options = {
            returnDocument: "after",
        }

        const createdVariation = await collection.insertOne(data, options);
        return true;
    } catch (error) {
        return false;
    }
}



export const updateVariation = async (body)=>{

    //update only the quantity

    try {
    const query  = {_id: new ObjectId(body._id)};
        const data = {
            $set: {

                quantity: body.quantity,
                
                
                
                updatedAt: new Date().toISOString
            }
        }

        const options = {
            returnDocument: "after",
        }

        const createdVariation = await collection.findOneAndUpdate(data, options);
        return true;
    } catch (error) {
        return false;
    }
}