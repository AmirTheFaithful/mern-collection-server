import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { logControllerException, createObjId } from "../utils/controllers";
import * as actions from "../db/actions/reactions-actions";
import { getCommentById } from "../db/actions/comments-actions";
import { getPostById } from "../db/actions/posts-actions";

export const getReaction = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "The 'id' parameter should be provided." });
    }

    const id: ObjectId = createObjId(req.params.id);
    const reaction = await actions.getReactionById(id);

    if (!reaction) {
      return res.status(404).json({ message: "Reaction not found." });
    }

    return res.status(200).json({
      data: reaction,
      message: "Reaction has been successfully fetched.",
    });
  } catch (error: unknown) {
    logControllerException("getReaction", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getPostReactions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.commentID && !req.params.postID) {
      return res.status(400).json({
        message: "The 'commentID' or 'postID' parameter should be provided.",
      });
    }

    const commentID: ObjectId = createObjId(req.params.commentID);
    const postID: ObjectId = createObjId(req.params.postID);

    let reactions;

    if (commentID) {
      const comment = await getCommentById(commentID);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      reactions = await actions.getReactionsByPostId(commentID);
    }

    if (postID) {
      const post = await getPostById(postID);

      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      reactions = await actions.getReactionsByPostId(postID);
    }

    if (!reactions) {
      return res.status(404).json({ message: "No reactions were found." });
    }

    return res.status(200).json({
      data: reactions,
      message: "Reactions were successfully fetched.",
    });
  } catch (error: unknown) {
    logControllerException("getPostReactions", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const setReaction = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { postID, commentID, authorID, emoji } = req.body;

    if (!(postID && commentID) || !authorID || !emoji) {
      return res
        .status(400)
        .json({
          message:
            "The fields 'postID' or 'commentID', 'authorID' and 'emoji' should be provided.",
        });
    }

    const newReaction = await actions.createNewReaction({
      postID,
      commentID,
      authorID,
      emoji,
    });

    return res
      .status(201)
      .json({
        data: newReaction,
        message: "A new reaction has been successfully set to the DB.",
      });
  } catch (error: unknown) {
    logControllerException("setReaction", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const removeReaction = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "The 'id' parameter should be provided." });
    }

    const reaction = await actions.deleteReactionById(
      new ObjectId(req.params.id)
    );

    if (!reaction) {
      return res.status(404).json({ message: "Reaction not found." });
    }

    return res
      .status(200)
      .json({ data: reaction, message: "Reaction successfully fetched." });
  } catch (error: unknown) {
    logControllerException("removeReaction", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
