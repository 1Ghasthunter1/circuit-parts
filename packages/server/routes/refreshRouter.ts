import express, { RequestHandler } from "express";
import { body, validationResult, matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";

import { RefreshTokenResponse } from "../types/userTypes";

const refreshRouter = express.Router();

refreshRouter.post(
  "/",
  body("refreshToken").isString().isLength({ max: 255 }),
  (async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken } = <{ refreshToken: string }>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const user = await User.findOne({
      "refreshToken.token": refreshToken,
    });

    if (!user) return res.status(401).json({ error: "invalid refresh token" });
    const existingToken = user.refreshToken;
    const expireTime =
      (process.env["REFRESH_TOKEN_EXPIRY_HOURS"] as unknown as number) *
        60 *
        60 *
        1000 || 12 * 60 * 60 * 1000;

    if (
      new Date().getTime() - existingToken.creationDate.getTime() >
      expireTime
    )
      return res.status(401).json({ error: "refresh token expired" });

    const newRefreshToken = uuidv4();

    user.refreshToken = { token: newRefreshToken, creationDate: new Date() };
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(
      userForToken,
      process.env["SECRET"] || "RandomSecret!@@@Z===AS()_%)(!*",
      {
        expiresIn:
          (process.env["ACCESS_TOKEN_EXPIRY_MINUTES"] as unknown as number) *
          60,
      }
    );

    const tokenDataToSend: RefreshTokenResponse = {
      token,
      refreshToken: newRefreshToken,
    };

    return res.status(200).send(tokenDataToSend);
  }) as RequestHandler
);

export default refreshRouter;
