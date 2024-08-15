import { ValidationError } from "express-json-validator-middleware";

export const errorHandler = (err, req, res, next) => {
    const defaultMessage = "We're having technical issues. Please try again later";
    const {status, message, error} = err;

      // Check the error is a validation error
  if (err instanceof ValidationError) {
    // Handle the error
    res.status(400).send(err.validationErrors);
    next();
    return;
  } 

    if (error) {
        console.log(error);

        res.status(status).json({message: message || defaultMessage});     
    }else{
        next(err);
    }


   
}