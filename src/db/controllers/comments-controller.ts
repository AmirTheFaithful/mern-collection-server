import { Request, Response } from "express";
import { ObjectId } from "mongodb";

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

export const getComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const existingComment = await actions.getCommentById(
      new ObjectId(req.params.id)
    );

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res.status(200).json({
      data: existingComment,
      message: "Comment has been fetched successfully.",
    });
  } catch (error: unknown) {
    logControllerException("getComment", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
