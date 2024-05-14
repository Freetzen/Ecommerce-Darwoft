import "dotenv/config";
import { createUser, findUserByEmail, findUsers, updateUser } from "../services/userServices.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import emailRegister from "../utils/emailRegister.js";
import { userNotFound, verifyInformation, wrongCredentials, wrongPutUser, wrongUser } from "../utils/errors.js";

const SALT = Number(process.env.SALT);

const userController = {
  async getAllUsers(req, res) {
    try {
      const getUsers = await findUsers();
      res.status(200).json({ data: getUsers });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getUser(req, res) {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const userDB = await findUserByEmail(email);
        if (userDB?.email) {
          //si es null, lo evita. No estamos seguros si existe o no.
          const validatePass = bcrypt.compareSync(password, userDB.password);
          if (validatePass) {
            if(userDB.banned) throw new Error('Usted se encuentra baneado de nuestra App.')
            const payload = {
              email: userDB.email,
              role: userDB.role,
              id: userDB._id,
            };
            const user = {
              email: userDB.email,
              role: userDB.role,
              id: userDB._id,
              firstname: userDB.firstname,
              lastname: userDB.lastname,
              image: userDB.image
            };
            const token = generateToken(payload);
            return res
              .status(200)
              .json({ success: true, data: user, token })
          }
          throw new Error(wrongCredentials);
        }
        throw new Error(userNotFound);
      }
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  },

  async postUser(req, res) {
    try {
      const user = req.body;

      if (user) {
        const passwordEncripted = bcrypt.hashSync(user.password, SALT);
        const creatingUser = await createUser({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: passwordEncripted,
        });
        emailRegister(user.email, user.firstname)
        const payload = {
          email: creatingUser.email,
          role: creatingUser.role,
          id: creatingUser._id,
        };

        const data = {
          email: creatingUser.email,
          role: creatingUser.role,
          id: creatingUser._id,
          firstname: creatingUser.firstname,
          lastname: creatingUser.lastname,
          image: creatingUser.image,
        };
        const token = generateToken(payload);
        return res.status(200).json({ success: true, data, token });
      }
      throw new Error(verifyInformation);
    } catch (error) {
      if (error.message.includes("11000")) {
        return res.json({
          success: false,
          message: "Ya existe un usuario con ese email.",
        });
      }
      res.json({ success: false, message: error.message });
    }
  },

  async putUser(req, res) {
    try {
      const { firstname, lastname, image, id } = req.body;

      if (firstname || lastname || image) {
        const userUpdate = await updateUser(id, {
          firstname,
          lastname,
          image,
        });
        return res
          .status(200)
          .json({ message: "Usuario actualizado!!", data: userUpdate });
      }
      throw new Error(wrongPutUser);
    } catch (error) {
      res.json({ message: error.message });
    }
  },

  async putAdminUser(req, res) {
    try {
      const { role, _id, banned, email } = req.body;
      
      if (role || banned) {
        const update = await updateUser(_id, {
          role,
          banned,
        });

        if (banned) {
          //emailBanned(email) //FALTA TERMINAR
        }
        return res
          .status(200)
          .json({success: true, message: "Usuario modificado con éxito" });
      }
      throw new Error(wrongPutUser);
    } catch (error) {
      res.json({ message: error.message });
    }
  },

  async deleteUSer(req, res) {
    try {
      const { status, id } = req.query;

      if (status || id) {
        const updateStatus = await updateUser(id, {
          status,
        });
        return res.status(200).json({ message: "Usuario dado de baja" });
      }
      throw new Error(wrongUser);
    } catch (error) {
      res.json({ message: error.message });
    }
  },
};

export default userController;
