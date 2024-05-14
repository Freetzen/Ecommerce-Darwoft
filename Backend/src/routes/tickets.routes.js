import express from "express";
import ticketsController from "../controllers/ticketsController.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router()

router.route('/')
.get(ticketsController.getTicket)
.post(ticketsController.postTicket)

router.route('/tickets-admin')
.get(authAdmin, ticketsController.getTicketsAdmin)


export default router