import productModel from "../models/productModel.js";

export const findProducts = async () => {
    try {
        return await productModel.find();
    } catch (error) {
        throw new Error(error);
    }
}

export const findProductById = async (id) => {
    try {
        return await productModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const findProductByName = async (name) => {
    try {
        const product = await productModel.find({ title: { $regex: new RegExp(name, 'i') } });
        return product
    } catch (error) {
        throw new Error(error);
    }
}

export const createProduct = async (user) => {
    try {
        const newproduct = await productModel.create(user);
        return newproduct;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProductById = async (id) => {
    try {
        return await productModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (id, info) => {
    try {
        return await productModel.findByIdAndUpdate(id, info, { new: true });
    } catch (error) {
        throw new Error(error);
    }
}