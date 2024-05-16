import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket",
      },
    ],
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmxmyxi1d/image/upload/v1715712595/iBuytech/perfil-default_trj21f.png",
    },
    banned: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    securityQuestion: {
      type: String,
      required: true,
    },
    securityResponse: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = model("user", userSchema);

export default userModel;
