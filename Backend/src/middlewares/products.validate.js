import {check} from 'express-validator'
import { handleValidateErrors } from '../utils/handleValidateErrors.js'

const productsValidate = {}

productsValidate.validatePostProduct = [
    check('title').trim().notEmpty().withMessage('Ingrese un titulo'),
    check('description').trim().notEmpty().withMessage('Ingrese una descripción'),
    check('image').trim().notEmpty().withMessage('Ingrese una imagen'),
    check('price').trim().notEmpty().withMessage('Ingrese un precio'),
    check('stock').trim().notEmpty().withMessage('Ingrese el stock del producto'),
    check('category').trim().notEmpty().withMessage('Ingrese una categoria'),
    handleValidateErrors
],

productsValidate.validatePutProduct = [
    check('title').trim().notEmpty().withMessage('Ingrese un titulo'),
    check('description').trim().notEmpty().withMessage('Ingrese una descripción'),
    check('image').trim().notEmpty().withMessage('Ingrese una imagen'),
    check('price').trim().notEmpty().withMessage('Ingrese un precio'),
    check('stock').trim().notEmpty().withMessage('Ingrese el stock del producto'),
    check('category').trim().notEmpty().withMessage('Ingrese una categoria'),
    handleValidateErrors
]

export default productsValidate