import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
import { BadRequestError } from "../utils/errorHandler.js";

export const register_user = wrapAsync(async (req, res) => {
    // add jwt register
    const {name, email, password} = req.body
    const {token,user} = await registerUser(name, email, password)
    req.user = user;
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({user: user.toJSON ? user.toJSON() : {_id: user._id.toString(), name: user.name, email: user.email, avatar: user.avatar}, message:"register success"});
});

export const login_user = wrapAsync(async (req, res) => {
    // add jwt login
    const {email, password} = req.body
    const {token,user} = await loginUser(email, password)
    req.user = user;
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({user: user.toJSON ? user.toJSON() : {_id: user._id.toString(), name: user.name, email: user.email, avatar: user.avatar}, message:"login success"});
});

export const logout_user = wrapAsync( async (req, res) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({message:"logout success"})
})

export const get_current_user = wrapAsync( async (req, res) => {
    if(!req.user) {
        throw new BadRequestError("No user found");
    }
    res.status(200).json({user: req.user});
});