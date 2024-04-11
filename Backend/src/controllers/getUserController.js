import 'dotenv/config'
import { findUserByEmail } from "../services/userServices.js"
import { validatePassword } from "../utils/bcrypt.js"
import jwt from 'jsonwebtoken'

const getUserController = async (req, res) => {
    try {
        const {email, password} = req.body

        if(email && password){
            const userDB = await findUserByEmail(email)

            if(userDB.email){
                const validatePass = validatePassword(password, userDB.password)

                if(validatePass){
                    const payload = {
                        email: userDB.email,
                        firstname: userDB.firstname, 
                        lastname: userDB.lastname,
                        role: userDB.role,
                        id: userDB._id
                    }
                    const token = jwt.sign(payload, process.env.SECRET_SIGN_JWT)
                    return res.status(200).json({ login: true, data: payload, token });

                }
                return res.status(200).json({ login: false, message: "Credenciales incorrectas." });

            }

            return res.status(200).json({ login: false, message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    }
    
    export default getUserController