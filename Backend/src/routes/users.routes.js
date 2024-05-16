import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import userController from "../controllers/userController.js";
import validateUser from "../utils/validateUser.js";
import userValidate from "../middlewares/user.validate.js";
import adminOrUser from "../utils/adminOrUser.js";

const router = express.Router()

router.post('/validate', validateUser) //Persistencia de datos
router.get('/validate', adminOrUser) //Validamos si es Admin o User

//Users
router.post('/login',userValidate.validateLoginUser,  userController.getUser) //Login
router.post('/register', userValidate.validatePostUser, userController.postUser) //Register
router.put('/user', userController.putUser) //Update user
router.post('/user/restore-password', userController.restorePassword) //Restore Password

//Admin
router.route('/user-admin')
    .get(authAdmin , userController.getAllUsers) //Get all users
    .post(authAdmin, userController.putAdminUser) //Update user (banned, role)

export default router