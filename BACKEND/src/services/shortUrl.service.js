import { generateNanoId } from '../utils/helper.js';
import { getCustomShortUrl, saveShortUrl } from '../dao/shortUrl.js';
import { BadRequestError } from '../utils/errorHandler.js';

export const createShortUrlWithoutUser = async (Url) => {
  if (!Url) {
    throw new BadRequestError("URL is required");
  }
  
  const shortUrl = generateNanoId(7);
  if(!shortUrl) {
    throw new Error("Short URL not generated");
  }
  await saveShortUrl(shortUrl, Url);
  return shortUrl;
};
export const createShortUrlWithUser = async (Url, userId, customUrl=null) => {
  if (!Url) {
    throw new BadRequestError("URL is required");
  }
  
  if (!userId) {
    throw new BadRequestError("User ID is required");
  }
  
  const shortUrl = customUrl || generateNanoId(7);
  const exist = await getCustomShortUrl(customUrl);
  if(exist) {
    throw new BadRequestError("Custom URL already exists");
  }
  await saveShortUrl(shortUrl, Url, userId);
  return shortUrl;
};