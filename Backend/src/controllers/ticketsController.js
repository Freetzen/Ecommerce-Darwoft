import ticketModel from "../models/ticketsModel.js";
import { updateUser } from "../services/userServices.js";

const ticketsController = {
  async postTicket(req, res) {
    try {
      const { info, totalPrice, idClient, status } = req.body;
      const newTicket = await ticketModel.create({
        statusPayment: status,
        products: info.map((item) => ({
          idProduct: item.idProduct,
          quantity: item.quantity,
          priceByProducts: item.priceByProducts,
        })),
        client: idClient,
        totalPrice,
      });
      if (newTicket) {
        const userToUpdate = await updateUser(idClient, {
          purchases: newTicket._id,
        });
        return res.json({ message: "Creado correctamente", userToUpdate });
      }

      throw new Error("Problemas");
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  async getTicket(req, res) {
    try {
        const { id } = req.query;
        const userPurchases = await ticketModel.find({ client: id }).populate('products.idProduct')
        if (!userPurchases.length) throw new Error("Aún no hay compras");

        return res.status(200).json({ success: true, data: userPurchases });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  async getTicketsAdmin(req, res) {
    try {
      const getTickets = await ticketModel.find();
      if (!getTickets) throw new Error("Todavía no han realizado ninguna compra");
      
      return res.status(200).json({ success: true, data: getTickets });
    } catch (error) {
      res.json({success: false, message: error.message });
    }
  },
};

export default ticketsController