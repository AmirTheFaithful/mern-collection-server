import { Schema } from "mongoose";

const PostSchema = new Schema({
  authorID: {
    type: String,
    required: true,
  },
  publishedOn: {
    type: Date,
    retuired: true,
  },
  media: {
    content: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    kind: {
      type: ["paragraph", "paragraphs", "image", "video", "gif"],
      required: true,
    },
  },
});

export default PostSchema;
