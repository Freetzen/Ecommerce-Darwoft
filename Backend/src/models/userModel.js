import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'
  },
  banned: {
    type: Boolean,
    default: false,
  },
  purchases:{
    type: Array,
    default: []
  },
  role: {
    type: String,
    default: 'user'
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model("user", userSchema)

export default userModel;
