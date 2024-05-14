import {check} from 'express-validator'
import { handleValidateErrors } from '../utils/handleValidateErrors.js'

const userValidate = {}

userValidate.validatePostUser = [
    check('firstname').trim().notEmpty().withMessage('Ingrese un Nombre'),
    check('lastname').trim().notEmpty().withMessage('Ingrese un Apellido'),
    check('email').trim().isEmail().withMessage('Ingrese un Email'),
    check('password').trim().notEmpty().withMessage('Ingrese una Contraseña'),
    handleValidateErrors
]

userValidate.validateLoginUser = [
    check('email').trim().isEmail().withMessage('Ingrese un Email'),
    check('password').trim().notEmpty().withMessage('Ingrese una Contraseña'),
    handleValidateErrors
]

userValidate.validateUpdateImage = [
    check('image').trim().notEmpty().withMessage('Ingrese una imagen'),
    handleValidateErrors
]

export default userValidate