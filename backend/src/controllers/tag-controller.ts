import { Request, Response } from 'express';
import { getAllTags } from '../services/tag-service';

const getTags = async (_req: Request, res: Response) => {
  const tags = await getAllTags();
  res.status(200).json(tags);
}

export {
  getTags
}