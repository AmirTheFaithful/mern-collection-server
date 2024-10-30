import { model } from "mongoose";

import CommentSchema from "../schemas/comment-scheme";

const CommentModel = model("Comment", CommentSchema);

export default CommentModel;
