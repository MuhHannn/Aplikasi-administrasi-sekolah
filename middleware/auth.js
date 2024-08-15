import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export function requireAuth(handler) {
    return async (req, res) => {
        const { token } = parse(req.headers.cookie || '');

        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return handler(req, res);
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' });
        }
    };
}