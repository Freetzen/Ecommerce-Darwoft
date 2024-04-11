import 'dotenv/config'
import jwt from 'jsonwebtoken'

const authUser = async(req, res, next) => {
  try {
    const {token} = req.body
    
    if(!token) {
        return res.json('El token no existe')
    }

    const validPayload = jwt.verify(token, process.env.SECRET_SIGN_JWT)
    next()
  } catch (error) {
    res.status(401).json({res: false, message: 'No podemos procesar la solicitud'}) //401 sin autorización
  }
}

export default authUser