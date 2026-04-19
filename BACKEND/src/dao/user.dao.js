import user from '../models/user.model.js';
import UrlModel from '../models/shortUrlmodel.js'

export const findUserByEmail = async (email) => {
    return await user.findOne({ email });
}

export const findUserByEmailByPassword = async (email) => {
    return await user.findOne({ email }).select('+password');
}

export const findUserById = async (id) => {
    return await user.findById(id);
}

export const createUser = async (name, email, password) => {
    const newUser = new user({ name, email, password });
    await newUser.save();
    return newUser;
}

export const getAllUserUrlsDao = async (id) =>{
    if (!id) throw new Error("User ID is required");
    return await UrlModel.find({user: id});
}