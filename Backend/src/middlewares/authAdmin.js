import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { errorInToken } from '../utils/errors.js';

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new Error(errorInToken);
    
    const validPayload = jwt.verify(token, process.env.SECRET_SIGN_JWT);
    if (validPayload.role === "admin") return next();

    throw new Error("Error al verificar el token:", err.message);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;