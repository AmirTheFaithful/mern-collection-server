/* Util and helper functions for controllers */

import { ObjectId } from "mongodb"; // for "createObjId" function.

/**
 * Error handler which logs human-readable information
 * about the error that happened on mentioned controller.
 *
 * @param controllerName {string} - The name of controller.
 * @param error {Error} - The object of the happened error.
 */
export const logControllerException = (
  controllerName: string,
  error: Error
): void => {
  console.log("\x1b[35m%s\x1b[1m", "\n*------------------*");
  console.log(
    "\x1b[31m%s\x1b[5m",
    `\nA "${error.name}" has occurred in the "${controllerName}" controller.\n`
  );
  console.log("\x1b[33m%s\x1b[1m", `\nMessage: ${error.message}.`);
  console.log("\x1b[33m%s\x1b[1m", `\nStack: ${error.stack}`);
  console.log(
    "\x1b[36m%s\x1b[1m",
    "\nWish you the success in solving this error!\n"
  );
  console.log("\x1b[35m", "*------------------*\n");
};

/**
 * Converts given id to an MongoDB ObjectId type.
 *
 * @param {string} id - ID of the document.
 * @returns {ObjectId} - Converted to ObjectId value.
 */
export const createObjId = (id: string): ObjectId => {
  try {
    const objId: ObjectId = new ObjectId(id);
    return objId;
  } catch (error: unknown) {
    console.log(error);
  }
};

/**
 * Checks if the provided value meets possible values of MedaType.
 *
 * @param value - value to be checked.
 * @returns - either true if the value coresponds, otherwise - false.
 */
export const isCommentMediaValid = (value: string): boolean => {
  switch (value) {
    case "paragraph":
    case "paragraphs":
    case "image":
    case "video":
    case "gif":
      return true;
    default:
      false;
  }
};
