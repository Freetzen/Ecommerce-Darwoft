import express from "express";
import postUserController from "../controllers/postUserController.js";
import putUserController from "../controllers/putUserController.js";
import getUserController from "../controllers/getUserController.js";
import authUser from "../middlewares/authUser.js";
import putUserAdminController from "../controllers/putUserAdminController.js";

const router = express.Router()

router.put('/register', putUserController)
router.post('/useradmin', authUser, putUserAdminController)
router.post('/register', postUserController)
router.post('/login', getUserController)

export default router