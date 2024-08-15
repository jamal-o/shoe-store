import { db } from "../config/database.js";

import { ObjectId } from "mongodb";
import {
	createVariation,
	deleteProductVariations,
	getProductVariations,
} from "./product_variation.controller.js";

const collection = await db.collection("products");

export const getProduct = async (req, res, next) => {
	try {
		const query = { _id: new ObjectId(req.params.id) };
		let product = await collection.findOne(query);

		if (!product) {
			return next({ status: 404, message: "Product not found!" });
		}

		//add variations
		const variations = getProductVariations(req.params.id);

		product.variations = variations;

		res.status(200).json(product);
	} catch (error) {
		next({ status: 500, error });
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const query = { _id: new ObjectId(req.params.id) };
		let result = await collection.deleteOne(query);

		if (result.deletedCount === 0) {
			res
				.status(200)
				.json({ message: "Product does not exist. No product was deleted!" });
			return;
		}

		deleteProductVariations(req.params.id);

		res.status(200).json({ message: "Product has been deleted!" });
	} catch (error) {
		next({ status: 500, error });
	}
};

export const createProduct = async (req, res, next) => {
	try {
		const { variations, ...rest } = req.body;

		const data = {
			...rest,

			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const options = {
			returnDocument: "after",
		};

		const createdProduct = await collection.insertOne(data, options);

		//create variations
		let results = req.body.variations.forEach((element) => {
			element.product_id = createdProduct.product_id;

			createVariation(element);
		});

		res.status(200).json(createdProduct);
	} catch (error) {
		next({ status: 500, error });
	}
};

export const updateProduct = async (req, res, next) => {
	try {
		// if ()
		const query = { _id: new ObjectId(req.params.id) };
		const { variations, ...rest } = req.body;
		const data = {
			$set: {
				...rest,
				updatedAt: new Date().toISOString(),
			},
		};

		const options = {
			returnDocument: "after",
		};

		const updatedProduct = await collection.findOneAndUpdate(
			query,
			data,
			options
		);

		res.status(200).json(updatedProduct);

		deleteProductVariations(req.params.id);

		//create variations
		let results = req.body.variations.forEach((element) => {
			element.product_id = createdProduct.product_id;

			createVariation(element);
		});
	} catch (error) {
		next({ status: 500, error });
	}
};

export const getAllProducts = async (req, res, next) => {
	try {
		let results = await collection.find({}).toArray();
		res.status(200).json(results);
	} catch (error) {
		next({ status: 500, error });
	}
};
