import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { logControllerException, createObjId } from "../utils/controllers";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
} from "../db/actions/users-actions";

export const getRegisteredUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await getAllUsers();

    if (!users) {
      return res
        .status(404)
        .json({ message: "No users found in the database." });
    }

    return res.status(200).json({
      message: "Successfully fetched all registered users.",
      data: users,
    });
  } catch (error: unknown) {
    logControllerException("getRegisteredUsers", error as Error);
    return res.status(500).json({ message: "Internal server exception." });
  }
};

export const getRegisteredUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is not provided." });
    }

    const objId: ObjectId = createObjId(req.params.id);
    const user = await getUserById(objId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Successfully fetched user from the database.",
      data: user,
    });
  } catch (error: unknown) {
    logControllerException("getRegisteredUser", error as Error);
    return res.status(500).json({ message: "Internal server exception." });
  }
};

export const getRegisteredUserByEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.email) {
      return res
        .status(400)
        .json({ message: "The 'email' field should be provided. " });
    }

    const user = await getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ data: user, message: "User has been successfully fetched." });
  } catch (error: unknown) {
    logControllerException("getRegisteredUserByEmail", error as Error);
    return res.status(500).json({ message: "Internal server exception." });
  }
};
