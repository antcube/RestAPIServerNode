import { Request, Response } from "express"
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ],
        // attributes: ['id', 'name', 'price']
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json({ data: products });
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    res.json({ data: product });
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    
    await product.update(req.body);
    res.json({ data: product });
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    // await product.update({ availability: !product.availability });
    product.availability = !product.availability;
    await product.save();
    res.json({ data: product });
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
}
