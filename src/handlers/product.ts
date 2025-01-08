import { Request, Response } from "express"
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            // attributes: ['id', 'name', 'price']
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        });
        res.json({ data: products });
    } catch (error) {
        res.status(500).json({ message: 'There was an error getting the products' });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'There was an error getting the product' });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'There was an error creating the product' });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        
        await product.update(req.body);
        res.json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the product' });
    }
}

export const upadteAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // await product.update({ availability: !product.availability });
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product });
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the availability of the product' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'There was an error deleting the product' });
    }
}
