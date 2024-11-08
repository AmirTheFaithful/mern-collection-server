import { ObjectId } from "mongodb";

import CommentModel from "../models/comment-model";

export const getCommentById = async (id: ObjectId) => CommentModel.findById(id);
export const getRepliesById = async (id: ObjectId) =>
  CommentModel.find({ parentID: id });
export const getAllComments = async () => CommentModel.find();
export const createNewComment = async (values: Record<string, any>) =>
  new CommentModel(values).save().then((comment) => comment.toObject());
export const updateCommentById = async (
  id: ObjectId,
  values: Record<string, any>
) => CommentModel.findByIdAndUpdate(id, values);
export const deleteCommentById = async (id: ObjectId) =>
  CommentModel.findByIdAndDelete(id);
