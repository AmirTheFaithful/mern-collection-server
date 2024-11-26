import { Router } from "express";

import {
  getRegisteredUser,
  getRegisteredUsers,
  getRegisteredUserByEmail,
} from "../controllers/users-controllers";

export default (router: Router): void => {
  router.get("/api/users", getRegisteredUsers);
  router.get("/api/users/:id", getRegisteredUser);
  router.get("/api/special/users/:email", getRegisteredUserByEmail);
};
