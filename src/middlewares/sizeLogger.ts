import { Request, Response, NextFunction } from "express";

const logMiddlewareError = (error: Error): void => {
  console.log(
    `An ${error.name} has occurred in line ${error.stack}.\nMessage: ${error.message}`
  );
};

const sizeLogger = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const requestSize: number = JSON.stringify(req.body).length;
    console.log(`Request size: ${requestSize} b.`);

    const originalSend = res.send.bind(res);
    res.send = function (body?: any) {
      const responseSize = Buffer.byteLength(body, "utf8");
      console.log(`Response size: ${responseSize} b.`);

      return originalSend(body);
    };
  } catch (error: unknown) {
    logMiddlewareError(error as Error);
  }

  next();
};

export default sizeLogger;
