import { Request, Response, NextFunction } from "express";
import schemas from '../validator/index';
import { HTTP_CODE } from '../errors/errors-http';

const bodyValidator = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const configSchema = schemas.find((config) => config.path === req.baseUrl && req.method === config.method);
  const validator = configSchema?.schema.safeParse(data); // dependency zod
  if (validator?.success) return next();
  const errorResponse = validator?.error.errors;
  res.status(HTTP_CODE.HTTP_BAD_REQUEST).send(errorResponse);
}

export default bodyValidator;