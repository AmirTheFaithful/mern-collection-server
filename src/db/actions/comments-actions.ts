import { ObjectId } from "mongodb";

import CommentModel from "../models/comment-model";

export const getCommentById = async (id: ObjectId) => CommentModel.findById(id);
export const getRepliesByCommentId = async (id: ObjectId) =>
  CommentModel.find({ parentID: id });
export const getCommentsByPostId = (id: ObjectId) =>
  CommentModel.find({ postID: id });
export const getAllComments = async () => CommentModel.find();
export const createNewComment = async (values: Record<string, any>) =>
  new CommentModel(values).save().then((comment) => comment.toObject());
export const updateCommentById = async (
  id: ObjectId,
  values: Record<string, any>
) => CommentModel.findByIdAndUpdate(id, values);
export const deleteCommentById = async (id: ObjectId) =>
  CommentModel.findByIdAndDelete(id);
