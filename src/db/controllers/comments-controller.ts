import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import * as actions from "../actions/comments-actions";
import { logControllerException } from "../../utils/controllers";

/* Interfaces describing request objects data. */
interface NewCommentData {
  authorID: string;
  content: string;
}

interface UpdateRequestData {
  content?: string;
}

// Sends GET request for all comment documents.
export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
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

// Sends GET:[ID] request for single comment document.
export const getComment = async (req: Request, res: Response): Promise<any> => {
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

export const createComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { authorID, content }: NewCommentData = req.body;

    if (!authorID || !content) {
      return res.status(400).json({
        message: "The fields 'authorID and 'content' should be provided.'",
      });
    }

    const newComment = await actions.createNewComment({ authorID, content });

    return res.status(201).json({
      data: newComment,
      message: "A new comment has been successfully added to the DB.",
    });
  } catch (error: unknown) {
    logControllerException("createComment", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Get name(s) of field(s) to update from the request body.
    const updatedData: UpdateRequestData = req.body;

    await actions.updateUserById(new ObjectId(req.params.id), updatedData);

    return res
      .status(200)
      .json({ data: updatedData, message: "Successfully update a comment." });
  } catch (error: unknown) {
    logControllerException("updateComment", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const existingComment = await actions.getCommentById(new ObjectId(id));

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    await actions.deleteCommentById(new ObjectId(id));

    return res
      .status(200)
      .json({
        data: existingComment,
        message: "Successfully deleted comment from the DB.",
      });
  } catch (error: unknown) {
    logControllerException("deleteComment", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
