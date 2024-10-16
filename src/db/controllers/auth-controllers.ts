import { Request, Response } from "express";

import { logControllerException } from "../../utils/controllers";
import { randomizer, authenticate } from "../../utils/auth";
import { getUserByEmail, createUser } from "../actions/users-actions";

interface RequestCredentials {
  username: string;
  email: string;
  password: string;
}

export const registerController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Get credentials sent by user from the request body,
    const { username, email, password }: RequestCredentials = req.body;
    // And then check for their presence:
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "The username, email and password should be provided.",
      });
    }

    // Check if the user with such email is existing
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message:
          "User with the provided email address already exists in the database.",
      });
    }

    const salt: string = randomizer();
    const newUser = await createUser({
      username,
      email,
      auth: {
        salt: salt,
        password: authenticate(salt, password),
      },
    });

    return res.status(201).json({
      message: "Successfully registered a new user to the database.",
      data: newUser,
    });
  } catch (error: unknown) {
    logControllerException("registerController", error as Error);
    return res.status(500).json({ message: "Internal server exception." });
  }
};
