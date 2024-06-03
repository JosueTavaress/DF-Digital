import { Request, Response } from 'express';
import { getAllTags, createTag as createTagService } from '../services/tag-service';

const getTags = async (_req: Request, res: Response) => {
  const tags = await getAllTags();
  res.status(200).json(tags);
}

const createTag = async (req: Request, res: Response) => {
   const tag = req.body;
   const newTag = await createTagService(tag);
   return res.status(201).json(newTag);
}

export {
  getTags,
  createTag
}