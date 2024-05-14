import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true
  },
  stock:{
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
  
const productModel = model("product", ProductSchema)

export default productModel;