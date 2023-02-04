import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(Schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true, // stop it from crashing if unknown apparels
            stripUnknown: true, // get ride of unknown stuff
        };

        try {
            const value = await Schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (err: any) {
            const errors: string[] = [];
            err.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });

            res.status(400).send({ errors: errors });
        }
    };
}

export default validationMiddleware;
