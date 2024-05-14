import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    statusPayment: {
        type: String,
        enum: ["approve", "pending", "refused"],
        require: true
    },
    products:[{
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            require: true
        },
        quantity:{
            type: Number,
            require: true
        },
        priceByProducts: {
            type: Number,
            require: true
        }
    }],
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    }
}, {timestamps: true});

const ticketModel = model("ticket", ticketSchema)

export default ticketModel;
