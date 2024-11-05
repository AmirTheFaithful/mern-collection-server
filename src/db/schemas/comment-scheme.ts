import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const CommentSchema = new Schema({
  authorID: {
    type: ObjectId,
    required: true,
  },
  content: {
    type: [Schema.Types.Mixed],
    required: true,
    // Property describing content type.
    mediaType: {
      type: ["paragraph", "paragraphs", "image", "video", "gif"],
      required: true,
    },
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  // More fields, comming soon.
});

export default CommentSchema;
