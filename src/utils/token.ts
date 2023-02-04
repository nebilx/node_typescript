// token functionality to  verify and creating token
import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import Token from './interfaces/token.interface';

const createToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, rejects) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return rejects(err);

                resolve(payload as Token);
            }
        );
    });
};

export default { createToken, verifyToken };
