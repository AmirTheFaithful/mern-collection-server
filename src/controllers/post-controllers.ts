import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { getPostById } from "../db/actions/posts-actions";
import { logControllerException, createObjId } from "../utils/controllers";

export const getPost = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "The parameter 'id' should be provided." });
    }

    const id: ObjectId = createObjId(req.params.id);

    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Comment not found." });
    }

    return res
      .status(200)
      .json({ data: post, message: "Succesfully fetched the post." });
  } catch (error: unknown) {
    logControllerException("getPost", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
