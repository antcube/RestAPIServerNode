import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { check, param } from "express-validator";
import { handleInputErrors } from "./middleware";

// Create instance of the Router
const router = Router();

// Define schema for the Product model
/** 
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: The product ID
 *      example: 1
 *     name:
 *      type: string
 *      description: The product name
 *      example: "Mouse Logitech"
 *     price:
 *      type: number
 *      description: The product price
 *      example: 25.99
 *     availability:
 *      type: boolean
 *      description: The product availability
 *      example: true
 */

// Define the routes - Routing
/** 
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags: 
 *          - Products
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *                      
 */
router.get('/', getProducts);

/** 
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request
 */
router.get('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    handleInputErrors,
    getProductById
);

/** 
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Returns a new product in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Teclado Gamer"
 *                          price:
 *                              type: number
 *                              example: 150
 *      responses:
 *          201:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 *                          
 */
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

/** 
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product by ID
 *      tags:
 *          - Products
 *      description: Update a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Laptop Lenovo"
 *                          price:
 *                              type: number
 *                              example: 2900
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid id or input data
 *          404:
 *              description: Product not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Toggle availability of a product by ID
 *      tags:
 *          - Products
 *      description: Toggle availability of a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to toggle availability
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product availability toggled successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid id or input data
 *          404:
 *              description: Product not found
 */
router.patch('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Product deleted'
 *          400:
 *              description: Bad request - invalid id or input data
 *          404:
 *              description: Product not found
 */
router.delete('/:id', 
    // Middleware to validate the request
    param('id')
        .isInt().withMessage('The id must be an integer'),
    handleInputErrors,
    deleteProduct
);

export default router;