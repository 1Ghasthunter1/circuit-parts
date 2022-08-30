/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { ErrorRequestHandler, RequestHandler } from "express";
import { IGetUserAuthInfoRequest } from "../../types/reuqestTypes";

import jwt from "jsonwebtoken";
import UserModel from "../../models/user";

export const tokenExtractor: RequestHandler = (
  req: IGetUserAuthInfoRequest,
  _res,
  next
) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const userExtractor: RequestHandler = async (
  req: IGetUserAuthInfoRequest,
  res,
  next
) => {
  console.log("thin");
  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(
    req.token,
    process.env["SECRET"] as string
  ) as { id: string | undefined };

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = await UserModel.findById(decodedToken.id);
  req.user = user || undefined;
  return next();
};

export const adminRequired: RequestHandler = (
  req: IGetUserAuthInfoRequest,
  res,
  next
) => {
  if (req.user?.role !== "admin")
    return res.status(403).json({ error: "forbidden" });
  return next();
};

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next
) => {
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(403).send({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(403).send({ error: error.message });
  }
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.code === 11000) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const duplicateThing = Object.keys(error.keyPattern)[0];
    return response
      .status(409)
      .json({ error: `${duplicateThing} must be unique` });
  }

  next(error);
  return;
};
