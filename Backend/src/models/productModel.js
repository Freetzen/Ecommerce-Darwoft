

const ProductSchema = new Schema({
  name: {
    type: String,
    required: tru
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock:{
    type: Number,
    default: 0
  },
  category: {
    type: Array,
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
  