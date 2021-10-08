import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { User } from "src/typings";

export const hostMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === "host") {
    next();
  } else {
    next(createHttpError(403, "Hosts only!"));
  }
};
