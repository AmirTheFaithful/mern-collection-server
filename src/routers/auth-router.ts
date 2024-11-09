import { Router } from "express";

import { registerController } from "../controllers/auth-controllers";

export default (router: Router): void => {
  router.post("/auth/sign-in", registerController);
};
