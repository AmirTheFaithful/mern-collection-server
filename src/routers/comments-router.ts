import { Router } from "express";

import {
  getComment,
  getComments,
  createComment,
  updateComment,
} from "../db/controllers/comments-controller";

export default (router: Router): void => {
  router.get("/api/comments", getComments);
  router.get("/api/comments/:id", getComment);
  router.post("/api/comments", createComment);
  router.put("/api/comments/:id", updateComment);
};
