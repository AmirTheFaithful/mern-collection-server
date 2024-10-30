import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const CommentSchema = new Schema({
  authorID: {
    type: ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  // Yet, it's all for now.
});

export default CommentSchema;
