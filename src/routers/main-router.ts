import { Router } from "express";

import usersRouter from "./users-router";
import authRouter from "./auth-router";

const router: Router = Router();

export default (): Router => {
  usersRouter(router);

  return router;
};
