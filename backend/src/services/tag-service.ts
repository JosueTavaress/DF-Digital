import { getAllTags as getAllTagsModel, createTag as createTagModel } from '../models/tags-model/tag-model';
import { ITags } from '../models/tags-model/interface';

const getAllTags = async () => {
  return getAllTagsModel();
}

const createTag = async (tag: Omit<ITags, "id">): Promise<ITags> => {
  return createTagModel(tag);
}

export {
  getAllTags,
  createTag
}