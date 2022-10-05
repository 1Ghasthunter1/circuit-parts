import express, { RequestHandler } from "express";
import { body, validationResult, matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";

import { RefreshTokenResponse } from "../types/userTypes";
import config from "../utils/config";

import { clearOldTokens } from "../services/userService";

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
      refreshTokens: { $elemMatch: { token: refreshToken } },
    });

    if (!user) {
      return res.status(401).json({ error: "invalid refresh token" });
    }
    const existingTokenObject = user.refreshTokens.find(
      (tokenObj) => tokenObj.token === refreshToken
    );

    if (!existingTokenObject) {
      return res.status(401).json({ error: "invalid refresh token" });
    }
    const expireTime = config.REFRESH_TOKEN_EXPIRY;

    if (
      new Date().getTime() - existingTokenObject.creationDate.getTime() >
      expireTime
    ) {
      user.refreshTokens = clearOldTokens(user.refreshTokens);
      await user.save();
      return res.status(401).json({ error: "refresh token expired" });
    }

    const newRefreshToken = uuidv4();

    user.refreshTokens = clearOldTokens(user.refreshTokens).map((tokenObj) => {
      if (tokenObj.token === refreshToken) {
        return { token: newRefreshToken, creationDate: new Date() };
      }
      return tokenObj;
    });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(
      userForToken,
      process.env["SECRET"] || "RandomSecret!@@@Z===AS()_%)(!*",
      {
        expiresIn: config.ACCESS_TOKEN_EXPIRY,
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
