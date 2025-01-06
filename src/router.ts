import { Router } from "express";
import { createProduct } from "./handlers/product";

// Create instance of the Router
const router = Router();

router.get('/', (req, res) => {
    const mensaje = "Hello World from Method GET";
    res.json(mensaje);
})

router.post('/', createProduct);

router.put('/', (req, res) => {
    const mensaje = "Hello World from Method PUT";
    res.json(mensaje);
})

router.patch('/', (req, res) => {
    const mensaje = "Hello World from Method PATCH";
    res.json(mensaje);
})

router.delete('/', (req, res) => {
    const mensaje = "Hello World from Method DELETE";
    res.json(mensaje);
})

export default router;