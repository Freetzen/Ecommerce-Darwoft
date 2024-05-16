import userModel from "../models/userModel.js";

export const findUsers = async () => {
    try {
        return await userModel.find().select('-password -securityQuestion -securityResponse');
    } catch (error) {
        throw new Error(error);
    }
}

export const findUserById = async (id) => {
    try {
        return await userModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email: { $regex: new RegExp('^' + email, 'i') } });
        return user
    } catch (error) {
        throw new Error(error);
    }
}
export const findUserByEmailAndRestore = async (email) => {
    try {
        const user = await userModel.findOne({ email }).select('securityQuestion securityResponse email').exec();
        return user
    } catch (error) {
        throw new Error(error);
    }
}

export const createUser = async (user) => {
    try {
        const newUser = await userModel.create(user);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateUser = async (id, info) => {
    try {
        return await userModel.findByIdAndUpdate(id, info,{new: true});
    } catch (error) {
        throw new Error(error);
    }
}