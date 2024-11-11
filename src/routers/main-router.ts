import { Router } from "express";

import usersRouter from "./users-router";
import authRouter from "./auth-router";
import commentsRouter from "./comments-router";
import postsRouter from "./posts-router";

const router: Router = Router();

export default (): Router => {
  usersRouter(router);
  authRouter(router);
  commentsRouter(router);
  postsRouter(router);

  return router;
};
