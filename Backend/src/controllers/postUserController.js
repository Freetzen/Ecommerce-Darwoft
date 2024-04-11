import 'dotenv/config'
import { createUser } from "../services/userServices.js";
import { createHash } from "../utils/bcrypt.js";
import jwt from 'jsonwebtoken'
import emailRegister from '../utils/emailRegister.js';

const postUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if(firstname && lastname && email && password){
            const passwordEncripted = createHash(password)
            const user = await createUser({ 
                firstname, 
                lastname,
                email, 
                password: passwordEncripted
            });
            emailRegister(email, firstname)
            const payload = {
                email,
                firstname, 
                lastname,
                role: user.role,
                id: user._id
            }
            const token = jwt.sign(payload, process.env.SECRET_SIGN_JWT)
            return res.status(200).json({ login: true, data: payload, token });

        }

        return res.status(201).json({ login: false, message: 'Falta información.' });
        
    } catch (error) {
        res.status(500).json(error.message);
    }
    }
    
    export default postUserController