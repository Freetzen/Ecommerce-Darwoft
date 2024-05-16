import axios from "axios"
import localStorageProvider from "../localStorageProvider/localStorageProvider"

const ticketsProvider = {
  async getTicketUser(id) {
    try {
        const purchase = await axios (`/api/ticket?id=${id}`)
        return purchase
    } catch (error) {
        
    }
  },
  async getAllTicketsAdmin() {
    try {
        const token = localStorageProvider.getToken()
        const allTickets = await axios.get('api/ticket/tickets-admin',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return allTickets.data
    } catch (error) {
        console.log(error.message)
    }
  },
  async postTicketUser(ticket) {
    try {
        const newTicket = await axios.post('/api/ticket', ticket)
        return newTicket
    } catch (error) {
        console.log(error.message)
    }
  },
}

export default ticketsProvider