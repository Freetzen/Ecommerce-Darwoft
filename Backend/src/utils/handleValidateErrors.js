import { validationResult } from "express-validator"

export const handleValidateErrors = (req, res, next) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const errorsMessages = errors.array().map(error => error.msg)
        return res.json({ success: false, message: errorsMessages.join(', ') });
    }
    next()
}