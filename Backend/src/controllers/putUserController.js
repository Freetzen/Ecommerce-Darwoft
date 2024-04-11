import { updateUser } from "../services/userServices.js"

const putUserController = async (req, res) => {
    try {
        const {firstname, lastname, image, id} = req.query

        if(firstname || lastname || image){

            const update = await updateUser(id, {
                firstname,
                lastname,
                image
            })
            return res.status(200).json({message: 'Usuario actualizado!!'})

        }

        return res.status(200).json({message: 'Usuario no actualizado'})

    } catch (error) {
        res.status(500).json(error.message)
    }
}
    
export default putUserController