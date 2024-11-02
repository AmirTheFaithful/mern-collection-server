import { ObjectId } from "mongodb";

import UserModel from "../models/user-model";

export const getAllUsers = () => UserModel.find();
export const getUserById = (id: ObjectId) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "auth.sessionToken": sessionToken });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const updateUserById = (id: ObjectId, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
export const deleteUserById = (id: ObjectId) => UserModel.findByIdAndDelete(id);
