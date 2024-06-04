import { Request, Response } from 'express';
import { getAllTags, createTag as createTagService } from '../services/tag-service';
import { HTTP_CODE } from '../errors/errors-http';

const getTags = async (_req: Request, res: Response) => {
  const tags = await getAllTags();
  res.status(HTTP_CODE.HTTP_OK).json(tags);
}

const createTag = async (req: Request, res: Response) => {
   const tag = req.body;
   const newTag = await createTagService(tag);
   return res.status(HTTP_CODE.HTTP_CREATED).json(newTag);
}

export {
  getTags,
  createTag
}