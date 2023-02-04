//add user object to a request interface in express
import User from '@/resources/user/user.interface';

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
