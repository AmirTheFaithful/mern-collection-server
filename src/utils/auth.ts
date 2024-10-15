import { randomBytes, createHmac } from "crypto";

const SECRET: string = "9x@l/$^%-_-091";

export const randomizer = (): string => {
  return randomBytes(128).toString("base64");
};

export const authenticate = (salt: string, password: string): string => {
  return createHmac("sha256", [salt, password].join(":"))
    .update(SECRET)
    .digest("hex");
};
