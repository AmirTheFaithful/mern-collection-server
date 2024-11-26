import { ObjectId } from "mongodb";

import ReactionModel from "../models/reaction-model";

export const getReactionById = (id: ObjectId) => ReactionModel.findById(id);
export const getReactionsByPostId = (id: ObjectId) =>
  ReactionModel.find({ postID: id });
export const createNewReaction = (values: Record<string, any>) =>
  new ReactionModel(values).save().then((reaction) => reaction.toObject());
export const updateReactionById = (id: ObjectId, values: Record<string, any>) =>
  ReactionModel.findByIdAndUpdate(id, values);
export const deleteReactionById = (id: ObjectId) =>
  ReactionModel.findByIdAndDelete(id);
