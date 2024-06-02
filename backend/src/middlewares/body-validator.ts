import { Request, Response, NextFunction } from "express";
import schemas from '../validator/index';

const statusCode = {
  invalid_type: 400
}

const bodyValidator = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const configSchema = schemas.find((config) => config.path === req.baseUrl && req.method === config.method);
  const validator = configSchema?.schema.safeParse(data); // dependency zod
  if (validator?.success) return next();
  const errorResponse = validator?.error.errors;
  res.status(statusCode.invalid_type).send(errorResponse);
}

export default bodyValidator;