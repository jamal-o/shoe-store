import 'dotenv/config';

import {db} from './config/database.js';

const products  = [
    {
        
        name: 'loafer',        
        description: 'loafer shoes',
        price: 10.00,
        stock_quantity: 50,
        is_visible: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    },
    {
        
        name: 'slides',        
        description: 'casual slides',
        price: 5.00,
        stock_quantity: 20,
        is_visible: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

    }

]

try{
    let collection = db.collection('products');
    console.log('[seed]', "Seeding products...");

    const result = await collection.insertMany(products);
    console.log(result.insertedIds);

    console.log('[seed]', "Done seeding products");

}catch(error){
    console.log('[seed]', 'Error: ', error);
}

process.exit();