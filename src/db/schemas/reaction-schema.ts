import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const ReactionSchema = new Schema({
  authorID: {
    type: ObjectId,
    required: true,
  },
  postID: {
    type: ObjectId,
    required: true,
  },
  emoji: {
    type: String,
    enum: ["like", "dislike", "heart", "angry", "laugh", "sad"],
    required: true,
  },
});

export default ReactionSchema;
