import ticketModel from "../models/ticketsModel.js";
import { findProductById } from "../services/productServices.js";
import { updateUser } from "../services/userServices.js";
import emailOrder from "../utils/emailOrder.js";

const ticketsController = {
  async postTicket(req, res) {
    try {
      const { info, totalPrice, idClient, status } = req.body;
      let newTicket;
  
      switch (status) {
        case 'approve':
          newTicket = await ticketModel.create({
            statusPayment: status,
            products: info.map((item) => ({
              idProduct: item.idProduct,
              quantity: item.quantity,
              priceByProducts: item.priceByProducts,
            })),
            client: idClient,
            totalPrice,
          });
  
          for (const item of info) {
            try {
              const product = await findProductById(item.idProduct);
              if (!product) {
                throw new Error(`No se encontró el producto con ID ${item.idProduct}`);
              }
              product.stock -= item.quantity;
              await product.save();
            } catch (error) {
              console.error(`Error al actualizar el stock del producto ${item.idProduct}: ${error.message}`);
            }
          }
          emailOrder(req.body)
          break;
        case 'pending':
        case 'refused':
          newTicket = await ticketModel.create({
            statusPayment: status,
            products: info.map((item) => ({
              idProduct: item.idProduct,
              quantity: item.quantity,
              priceByProducts: item.priceByProducts,
            })),
            client: idClient,
            totalPrice,
          });
          break;
        default:
          throw new Error("Estado de pago desconocido");
      }
  
      if (newTicket) {
        const userToUpdate = await updateUser(idClient, {
          purchases: newTicket._id,
        });
  
        if (status === 'refused') return res.json({ success: false, message: 'Lamentablemente, hubo un problema con el procesamiento de tu pago. Por favor, vuelve a intentarlo' });

        if (status === 'pending') return res.json({ success: true, message: "¡Gracias por tu compra! Estamos revisando tu pedido y te contactaremos pronto para confirmar los detalles" });

        if (status === 'approve') return res.json({ success: true, status: 'approve', message: "¡Tu compra ha sido exitosa!", data: req.body });
  
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
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