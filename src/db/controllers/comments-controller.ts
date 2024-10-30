import { Request, Response } from "express";

import * as actions from "../actions/comments-actions";
import { logControllerException } from "../../utils/controllers";

// Sends GET request for sing comment document.
export const getComments = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const comments = await actions.getAllComments();

    if (!comments) {
      return res.status(404).json({ message: "Comments not found." });
    }

    return res.status(200).json({
      data: comments,
      message: "Comments has been fetched successfully.",
    });
  } catch (error: unknown) {
    logControllerException("getComments", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
