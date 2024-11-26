import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const ReactionSchema = new Schema({
  authorID: {
    type: ObjectId,
    required: true,
  },
  postID: ObjectId,
  commentID: ObjectId,
  emoji: {
    type: String,
    enum: ["like", "dislike", "heart", "angry", "laugh", "sad"],
    required: true,
  },
});

export default ReactionSchema;
