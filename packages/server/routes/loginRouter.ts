import express, { RequestHandler } from "express";
import { body, validationResult, matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

import { LoginToUser } from "../types/userTypes";

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
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.hash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(
      userForToken,
      process.env["SECRET"] || "RandomSecret!@@@Z===AS()_%)(!*",
      {
        expiresIn: 60 * 60,
      }
    );

    const userToSend: LoginToUser = {
      token,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    };

    return res.status(200).send(userToSend);
  }) as RequestHandler
);

export default loginRouter;
