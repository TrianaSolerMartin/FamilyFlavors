import { verifyToken } from '../utils/token.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];
        if (!authToken) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const dataToken = verifyToken(authToken);
        if (!dataToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = dataToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid authentication' });
    }
};