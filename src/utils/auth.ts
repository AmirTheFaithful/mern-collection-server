import { randomBytes, createHmac } from "crypto";

export const randomizer = (): string => {
  return randomBytes(128).toString("base64");
};
