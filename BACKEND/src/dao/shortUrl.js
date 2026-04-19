// data access object for short url
import urlSchema from '../models/shortUrlmodel.js';
import { ConflictError, BadRequestError } from '../utils/errorHandler.js';

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        if (!shortUrl || !longUrl) {
            throw new BadRequestError('Short URL and long URL are required');
        }
        
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl,
        });
        if(userId) {
            newUrl.user = userId.toString();
        }
        await newUrl.save();
    } catch (err){
        if(err.code === 11000) {
            throw new ConflictError("Short URL already exists");
        }
        // Re-throw if it's already an AppError
        if(err.name === 'AppError' || err.constructor.name === 'BadRequestError' || err.constructor.name === 'ConflictError') {
            throw err;
        }
        throw new Error(`Database error: ${err.message}`);
    }
};

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({ short_url: shortUrl }, {$inc: { clicks: 1 }});
};

export const getCustomShortUrl = async (customUrl) => {
    const exist = await urlSchema.findOne({ short_url: customUrl });
    return exist ? customUrl : null;
};