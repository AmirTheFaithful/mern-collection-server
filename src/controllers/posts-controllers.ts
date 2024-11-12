import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import PostInterface from "types/post.interface";
import * as actions from "../db/actions/posts-actions";
import { logControllerException, createObjId } from "../utils/controllers";

export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await actions.getAllPosts();

    if (!posts) {
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

export const createPost = async (req: Request, res: Response): Promise<any> => {
  try {
    // Firstly, check if all required fields are provided:
    if (!req.body.authorID || !req.body.media) {
      return res.status(400).json({
        message: "The authorID field and the media object should be provided.",
      });
    }

    // Next, check if the media object has it's fields:
    if (!req.body.media.content || !req.body.media.kind) {
      return res.status(400).json({
        message:
          "Both content and it's kind should be provided in media object.",
      });
    }

    // Retrieve required data from the request's body object.
    const { authorID, media, publishedOn }: PostInterface = req.body;

    // Send POST request to the database.
    const post = await actions.createNewPost({
      authorID,
      media,
      publishedOn,
    });

    // Return success response as the result.
    return res.status(201).json({
      data: post,
      message: "A new post has been published successfully.",
    });
  } catch (error: unknown) {
    logControllerException("createPost", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "The parameter 'id' should be provided." });
    }

    const id: ObjectId = new ObjectId(req.params.id);

    const existingPost = await actions.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    await actions.deletePostById(id);

    return res.status(200).json({
      data: existingPost,
      message: "Post has been successfully deleted.",
    });
  } catch (error: unknown) {
    logControllerException("deletePost", error as Error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
