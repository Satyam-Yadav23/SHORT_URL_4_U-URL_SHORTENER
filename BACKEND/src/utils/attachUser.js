import { verifyToken } from './helper.js';
import { findUserById } from '../dao/user.dao.js';

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next(); // No token, proceed without attaching user
    }
    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.id);
        if (!user) {
            return next();
        }
        req.user = user;
        next();
    } catch (err) {
        next();
    }
};