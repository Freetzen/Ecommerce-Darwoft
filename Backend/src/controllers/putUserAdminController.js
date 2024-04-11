import { updateUser} from "../services/userServices.js"
import emailBanned from "../utils/emailBanned.js"

const putUserAdminController = async(req, res) => {
try {
    const {role, id, banned, email} = req.body

    if(role || banned){
        const update = await updateUser(id, {
            role,
            banned
        })

        if(banned){
            emailBanned(email) //FALTA TERMINAR
        }
        return res.status(200).json({message: 'Usuario modificado con éxito'})
    }
        
    return res.status(201).json({message: 'Error al actualizar'})
} catch (error) {
    res.status(500).json(error.message)
}
}

export default putUserAdminController