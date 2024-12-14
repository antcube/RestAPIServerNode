import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    const mensaje = "Hello World from Method GET";
    res.json(mensaje);
})

router.post('/', (req, res) => {
    const mensaje = "Hello World from Method POST";
    res.json(mensaje);
})

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