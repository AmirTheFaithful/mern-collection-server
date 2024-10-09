import { model } from "mongoose";

import UserSchema from "../schemas/user-scheme";

const UserModel = model("User", UserSchema);

export default UserModel;
