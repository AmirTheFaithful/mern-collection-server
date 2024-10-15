/* Util and helper functions for controllers */

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
