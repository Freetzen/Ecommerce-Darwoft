import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_SIGN_JWT, { expiresIn: "24h" })
    return token
}