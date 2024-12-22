import jwt from 'jsonwebtoken';
import { TK_SECRET } from '../config.js';

export const tokenSign = (user) => {
    const data = {
        userId: user.id,
        role: user.role,
    };
    const token = jwt.sign(data, TK_SECRET, { expiresIn: '2h' }); 
    return token;
};

export const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, TK_SECRET);
    } catch (error) {
        return null;
    }
};

export const refreshToken = async (oldToken) => {
    try {
        const decoded = jwt.verify(oldToken, TK_SECRET, { ignoreExpiration: true });
        const newToken = tokenSign(decoded);
        return newToken;
    } catch (error) {
        throw new Error('Error al refrescar el token');
    }
};