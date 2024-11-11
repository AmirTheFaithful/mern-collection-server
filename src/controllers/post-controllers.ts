import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import * as actions from "../db/actions/posts-actions";
import { logControllerException, createObjId } from "../utils/controllers";

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await actions.getAllPosts();

    if (!posts || posts.length) {
      return res.status(404).json({ message: "No posts were found." });
    }

    return res
      .status(200)
      .json({ data: posts, message: "Posts has been successfully fetched." });
  } catch (error: unknown) {
    logControllerException("getPosts", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getPost = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "The parameter 'id' should be provided." });
    }

    const id: ObjectId = createObjId(req.params.id);

    const post = await actions.getPostById(id);

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
