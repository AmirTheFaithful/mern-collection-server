import { ObjectId } from "bson";

import CommentModel from "../models/comment-model";

export const getCommentById = async (id: ObjectId) => CommentModel.findById(id);
export const getAllComments = async () => CommentModel.find();
export const createNewComment = async (values: Record<string, any>) =>
  new CommentModel(values).save().then((comment) => comment.toObject());
export const updateUserById = async (
  id: ObjectId,
  values: Record<string, any>
) => CommentModel.findByIdAndUpdate(id, values);
export const deleteCommentById = async (id: ObjectId) =>
  CommentModel.findByIdAndDelete(id);
