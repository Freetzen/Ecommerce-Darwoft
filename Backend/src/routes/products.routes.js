import express from "express";

const router = express.Router()

router.get('/products')
router.put('/products')
router.delete('/products')
router.post('/products')

export default router