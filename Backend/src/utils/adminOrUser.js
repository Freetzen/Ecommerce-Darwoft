import { errorInToken } from "./errors.js";
import jwt from 'jsonwebtoken'

const adminOrUser = async (req, res) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization;
    if (!token) throw new Error(errorInToken);

    const validPayload = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET_SIGN_JWT
    );
    console.log(validPayload)
    if (validPayload.role === "admin") return res.json({isAdmin: true})

    res.json({isAdmin: false})
  } catch (error) {
    res.json({ message: error.message });
  }
};

export default adminOrUser;
