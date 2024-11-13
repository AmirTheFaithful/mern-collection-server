import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import CommentInterface from "../types/comment.interface";
import * as actions from "../db/actions/comments-actions";
import {
  logControllerException,
  createObjId,
  isCommentMediaValid,
} from "../utils/controllers";

/* Interfaces describing request objects data. */
interface UpdateRequestData {
  media?: string;
}

interface PartialUpdateFields {
  media?: string;
}

// Sends GET request for all comment documents.
export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const comments = await actions.getAllComments();

    if (!comments || comments.length === 0) {
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
    // Check for ID presence:
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is not provided." });
    }

    // If it was provided - convert it to needed type.
    const objId: ObjectId = createObjId(req.params.id);

    // Fetch the comment.
    const existingComment = await actions.getCommentById(objId);

    // Handle 404 case:
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

// Gets replies to some comment by it's ID.
export const getReplies = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "The ID parameter should be provided." });
    }

    const id: ObjectId = createObjId(req.params.id);

    const existingComment = await actions.getCommentById(id);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const replies = await actions.getRepliesByCommentId(id);

    if (!replies) {
      return res.status(404).json({ message: "No reply comments found." });
    }

    return res
      .status(200)
      .json({ data: replies, message: "Successfully fetched replies." });
  } catch (error: unknown) {
    logControllerException("getReplies", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { parentID, authorID, media }: CommentInterface = req.body;

    // Check whether the mandatory fields are present:
    if (!authorID || !media) {
      return res.status(400).json({
        message: "The field 'authorID' and 'media' object should be provided.'",
      });
    }

    // Check the validity of the media object:
    if (!media.content || !media.kind) {
      return res.status(400).json({
        message: "The fields 'content' and 'kind' should be provided.",
      });
    }

    // Check if the kind of the content is valid:
    if (!isCommentMediaValid(media.kind)) {
      return res.status(400).json({
        message: "The content type of the comment is not valid.",
      });
    }

    // Perform posting.
    const newComment = await actions.createNewComment({
      parentID,
      authorID,
      media,
      publicationDate: new Date(),
    });

    return res.status(201).json({
      data: newComment,
      message: "A new comment has been successfully added to the DB.",
    });
  } catch (error: unknown) {
    logControllerException("createComment", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Updates ENTIRE document by performing PUT request.
export const updateCommentCompletely = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is not provided." });
    }

    // Check if the media present:
    if (!req.body.media) {
      return res
        .status(400)
        .json({ message: "The 'media' object should be provided." });
    }

    // Check if the media object is valid:
    if (!req.body.media.content || !req.body.media.kind) {
      return res.status(400).json({
        message: "The 'content' and the 'kind' fields should be provided.",
      });
    }

    const objId: ObjectId = createObjId(req.params.id);

    // Get name(s) of field(s) to update from the request body.
    const updatedData: UpdateRequestData = req.body.media;

    // Modifying all comment's fields.
    await actions.updateCommentById(objId, updatedData);

    return res
      .status(200)
      .json({ data: updatedData, message: "Successfully updated a comment." });
  } catch (error: unknown) {
    logControllerException("updateCommentCompletely", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateCommentPartially = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is not provided." });
    }

    const objId: ObjectId = new ObjectId(req.params.id);
    const existingComment = await actions.getCommentById(objId);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // Object to contain all fields to be modified.
    const updatingFields: PartialUpdateFields = {};

    switch (req.body) {
      case req.body.media:
        updatingFields.media = req.body.media;
        break;
      default:
        console.log("No fields to update.");
        break;
    }

    const updatedComment = await actions.updateCommentById(
      objId,
      updatingFields
    );
    return res
      .status(200)
      .json({ data: updatedComment, message: "Successfully updated comment." });
  } catch (error: unknown) {
    logControllerException("updateCommentPartially", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID parameter is not provided." });
    }

    const objId: ObjectId = new ObjectId(req.params.id);

    const existingComment = await actions.getCommentById(objId);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    await actions.deleteCommentById(objId);

    return res.status(200).json({
      data: existingComment,
      message: "Successfully deleted comment from the DB.",
    });
  } catch (error: unknown) {
    logControllerException("deleteComment", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
