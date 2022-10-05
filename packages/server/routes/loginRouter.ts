import express, { RequestHandler } from "express";
import { body, validationResult, matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";

import { LoginToUser } from "../types/userTypes";
import config from "../utils/config";

import { clearOldTokens } from "../services/userService";

const loginRouter = express.Router();

loginRouter.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = <{ email: string; password: string }>(
      matchedData(req, {
        locations: ["body"],
        includeOptionals: true,
      })
    );

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const correctPassword = await bcrypt.compare(password, user.hash);

    if (!correctPassword)
      return res.status(401).json({ error: "incorrect password" });

    const newRefreshToken = uuidv4();

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

    const userToSend: LoginToUser = {
      token,
      refreshToken: newRefreshToken,
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    };

    user.refreshTokens = clearOldTokens(user.refreshTokens).concat({
      token: newRefreshToken,
      creationDate: new Date(),
    });
    await user.save();

    return res.status(200).send(userToSend);
  }) as RequestHandler
);

loginRouter.post(
  "/signout",
  body("refreshToken").isLength({ max: 255 }).exists(),
  body("userId").isLength({ max: 255 }).exists(),
  (async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken, userId } = <{ refreshToken: string; userId: string }>(
      matchedData(req, {
        locations: ["body"],
        includeOptionals: true,
      })
    );

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ error: "user not found" });

    user.refreshTokens = user.refreshTokens.filter(
      (refreshTokenObj) => refreshTokenObj.token !== refreshToken
    );
    await user.save();

    return res.status(204).end();
  }) as RequestHandler
);

export default loginRouter;
