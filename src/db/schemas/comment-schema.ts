import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const CommentSchema = new Schema({
  parentID: {
    type: String,
    required: false, // Set for clarity.
  },
  authorID: {
    type: ObjectId,
    required: true,
  },
  media: {
    content: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    // Property describing content type.
    kind: {
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
