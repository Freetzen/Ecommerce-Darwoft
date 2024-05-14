import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../services/userServices.js';
const validateUser = async(req, res) => {
try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Error en token");
    
    const validPayload = jwt.verify(token.split(" ")[1],process.env.SECRET_SIGN_JWT);
    if(validPayload){
        const userDB = await findUserByEmail(validPayload.email)
        const user = {
            email: userDB.email,
            firstname: userDB.firstname,
            lastname: userDB.lastname,
            image: userDB.image,
            role: userDB.role,
            id: userDB._id,
        }
        return res.json({success: true, user})
    }

    throw new Error("Error en token");
} catch (error) {
    console.log(error)
}
}

export default validateUser