import { Router } from "express";

import {
  getPosts,
  getPost,
  createPost,
  deletePost,
} from "../controllers/posts-controllers";

export default (router: Router): void => {
  router.get("/api/posts", getPosts);
  router.get("/api/posts/:id", getPost);
  router.post("/api/posts", createPost);
  router.delete("/api/posts/:id", deletePost);
};
