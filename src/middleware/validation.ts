import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware(type: any): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    validate(dto).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
        return res.status(400).json({ errors: errorMessages });
      } else {
        next();
      }
    });
  };
}
