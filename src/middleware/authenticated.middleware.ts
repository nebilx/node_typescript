import { Request, Response, NextFunction } from 'express';
import token from '@/utils/token';
import userModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exceptions';
import jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (bearer || !bearer?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const accessToken = bearer.split('Bearer: ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
            accessToken
        );
        if (payload instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await userModel
            .findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        req.user = user;
    } catch (error: any) {
        return next(new HttpException(401, 'Unauthorized'));
        // return next( new HttpException(401, error.message))
    }
}

export default authenticatedMiddleware;
