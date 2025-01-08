import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, upadteAvailability, updateProduct } from "./handlers/product";
import { check, param } from "express-validator";
import { handleInputErrors } from "./middleware";

// Create instance of the Router
const router = Router();

router.get('/', getProducts);

router.get('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    handleInputErrors,
    getProductById
);

router.post('/', 
    // Middleware to validate the request
    check('name')
        .notEmpty().withMessage('The name is required'),
    check('price')
        .isNumeric().withMessage('The price must be a number')
        .notEmpty().withMessage('The price is required')
        .custom(value => value > 0).withMessage('The price must be greater than 0'),
    handleInputErrors,
    createProduct
);

router.put('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    check('name')
        .notEmpty().withMessage('The name is required'),
    check('price')
        .isNumeric().withMessage('The price must be a number')
        .notEmpty().withMessage('The price is required')
        .custom(value => value > 0).withMessage('The price must be greater than 0'),
    check('availability')
        .isBoolean().withMessage('The availability must be a boolean'),
    handleInputErrors,   
    updateProduct
);

router.patch('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    handleInputErrors,
    upadteAvailability
);

router.delete('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    handleInputErrors,
    deleteProduct
);

export default router;