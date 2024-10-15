import { Request, Response } from "express";

import { logControllerException } from "../../utils/controllers";
import { getAllUsers } from "../actions/users-actions";

export const getRegisteredUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
