import "dotenv/config";
import { createUser, findUserByEmail, findUserByEmailAndRestore, findUsers, updateUser } from "../services/userServices.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import emailRegister from "../utils/emailRegister.js";
import { userNotFound, verifyInformation, wrongCredentials, wrongPutUser, wrongUser } from "../utils/errors.js";
import emailBanned from "../utils/emailBanned.js";
import { capitalizeFirstLetter } from "../utils/helpers.js";

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

      const firstname = capitalizeFirstLetter(user.firstname);
      const lastname = capitalizeFirstLetter(user.lastname);
      const securityResponseLower = user.securityResponse.toLowerCase()
      if (user) {
        const passwordEncripted = bcrypt.hashSync(user.password, SALT);
        const securityResponse = bcrypt.hashSync(securityResponseLower, SALT);
        const creatingUser = await createUser({
          firstname,
          lastname,
          email: user.email,
          password: passwordEncripted,
          securityQuestion: user.securityQuestion,
          securityResponse,
        });
        emailRegister(user.email, user.firstname);
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
          emailBanned(email, update.firstname)
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

  async restorePassword(req, res) {
    try {
      const { step, email, securityResponse, password, id } = req.body;

      switch (step) {
        case 1:
          const userStep1 = await findUserByEmailAndRestore(email)
          if (!userStep1) throw new Error("Usuario no encontrado")
          return res.status(200).json({ success: true, step: 1, securityQuestion: userStep1.securityQuestion, id: userStep1._id})
        case 2:
          const userStep2 = await findUserByEmailAndRestore(email);
          const validatePass = bcrypt.compareSync(securityResponse.toLowerCase(), userStep2.securityResponse);
          if (validatePass) {
            return res.status(200).json({success: true, step: 2});
          }
            return res.json({success: false, step: 2, message: "Respuesta de seguridad incorrecta" });
        case 3:
          const passwordEncripted = bcrypt.hashSync(password, SALT);
          const updatePassword = await updateUser(id,{password: passwordEncripted})
          if(updatePassword) return res.json({success: true, step: 3, message: "¡Se modificó su contraseña!" });
          return res.json({success: false, step: 3, message: "Hubo un error. Inténtelo de nuevo más tarde" });
        default:
          throw new Error("Paso inválido")
      }
    } catch (error) {
      console.error(error);
      res.json({success: false, message: error.message });
    }
  },
};

export default userController;