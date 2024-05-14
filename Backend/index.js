import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dbConfig from './src/config/dbConfig.js'
import routerUser from './src/routes/users.routes.js';
import routerProducts from './src/routes/products.routes.js';
import routerTickets from './src/routes/tickets.routes.js';

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
  origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: true
}));

server.use('/api/auth', routerUser); // USUARIO
server.use('/api', routerProducts); // PRODUCTO
server.use('/api/ticket', routerTickets); // TICKETS


const connectionMongoose = async () => {
  try {
    await dbConfig();
    server.listen(process.env.PORT, () => {
      console.log(`The server is ON`);
      console.log(`Database connected to MongoDB`);
    });
  } catch (error) {
    console.log(error) //Enviar mensaje general
  }
};

connectionMongoose();