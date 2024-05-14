import express from "express";
import productController from "../controllers/productController.js";
import authAdmin from "../middlewares/authAdmin.js";
import productsValidate from "../middlewares/products.validate.js";

const router = express.Router()

router.route('/products')
    .get(productController.getProducts)
    .put(authAdmin, productsValidate.validatePutProduct, productController.putProduct)
    .delete(authAdmin, productController.deleteProduct)
    .post(authAdmin, productsValidate.validatePostProduct, productController.postProduct)

router.get('/products-admin', authAdmin, productController.getProductsAdmin)

export default router