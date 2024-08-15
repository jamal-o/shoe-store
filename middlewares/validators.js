import apiDocConfigjson from '../config/openapi.json' assert {type: 'json'};

import { Validator } from 'express-json-validator-middleware';

const validator = new Validator();

validator.ajv.addVocabulary(["example"]);

// Load the schemas
// const schemaDocument = require("../config/openapi.json")assert {type: 'json'};



validator.ajv.addSchema(apiDocConfigjson.components.schemas.Variation, 'https://example.com/schemas/variation');

export const jsonValidator = validator.validate;


export const schemas = apiDocConfigjson.components.schemas;

export const productResponseSchema = schemas.ProductResponse;

export const userResponseSchema = schemas.UserResponse;

export const messageResponseSchema = schemas.MessageResponse;

export const purchaseResponseSchema = schemas.PurchaseResponse

export const productSchema = schemas.Product;

export const userSignupSchema = schemas.UserSignup;

export const purchaseSchema = schemas.Purchase;

