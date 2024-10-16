import { Router } from "express";

import {
  getRegisteredUser,
  getRegisteredUsers,
} from "../db/controllers/users-controllers";

export default (router: Router): void => {
  router.get("/api/users", getRegisteredUsers);
  router.get("/api/users/:id", getRegisteredUser);
};
