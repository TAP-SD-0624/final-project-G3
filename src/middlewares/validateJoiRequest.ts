import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateJoiRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
};

export default validateJoiRequest;
