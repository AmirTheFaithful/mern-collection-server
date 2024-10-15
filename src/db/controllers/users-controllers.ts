import { Request, Response } from "express";

import { logControllerException } from "../../utils/controllers";
import { getAllUsers } from "../actions/users-actions";

export const getRegisteredUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await getAllUsers();
  } catch (error: unknown) {
    logControllerException("getRegisteredUsers", error as Error);
    return res.status(500).json({ message: "Internal server exception." });
  }
};
