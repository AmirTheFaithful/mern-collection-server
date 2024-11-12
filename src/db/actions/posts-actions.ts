import { ObjectId } from "mongodb";

import PostModel from "../models/post-model";

export const getAllPosts = async () => PostModel.find();
export const getPostById = async (id: ObjectId) => PostModel.findById(id);
export const createNewPost = async (value: Record<string, any>) =>
  new PostModel(value).save().then((post) => post.toObject());
export const deletePostById = async (id: ObjectId) =>
  PostModel.findByIdAndDelete(id);
