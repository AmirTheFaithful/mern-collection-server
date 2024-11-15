import { model } from "mongoose";

import ReactionSchema from "../schemas/reaction-schema";

const ReactionModel = model("Reaction", ReactionSchema);

export default ReactionModel;
