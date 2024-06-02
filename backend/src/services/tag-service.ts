import { getAllTags as getAllTagsModel } from '../models/tags-model/tag-model';

const getAllTags = async () => {
  return getAllTagsModel();
}

export {
  getAllTags
}