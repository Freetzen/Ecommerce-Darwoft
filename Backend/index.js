import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session';
import MongoStore from 'connect-mongo'
import dbConfig from './src/config/dbConfig.js'
import routerUser from './src/routes/users.routes.js';
import routerProducts from './src/routes/products.routes.js';

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.use(cors());


server.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

server.use('/api/auth', routerUser); // USUARIO
server.use('/', routerProducts); // PRODUCTO


const connectionMongoose = async () => {
  try {
    await dbConfig();
    server.listen(process.env.PORT, () => {
      console.log(`The server is ON`);
      console.log(`Database connected to MongoDB`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectionMongoose();