import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  auth: {
    salt: {
      type: String,
      required: true,
      selected: false,
    },
    password: {
      type: String,
      required: true,
      selected: false,
      min: 12,
    },
    sessionToken: {
      type: String,
      required: true,
      selected: false,
    },
  },
});

export default UserSchema;
