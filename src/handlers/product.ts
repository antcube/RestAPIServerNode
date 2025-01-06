import { Request, Response } from "express"
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
    try {
        // First way to create a new product in the database using the save method
        // const product = new Product(req.body);
        // const productSaved = await product.save();
        
        // Second way to create a new product in the database using the create method
        const product = await Product.create(req.body);
        res.json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al guardar el producto' });
    }
}