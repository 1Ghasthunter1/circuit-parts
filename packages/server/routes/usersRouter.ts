require("express-async-errors");
import express, { RequestHandler } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import { NewUser, DatabaseUser } from "../types/userTypes";
import UserModel from "../models/user";

import { newUserSchema } from "../validation/userValidation";

const usersRouter = express.Router();

usersRouter.get("/", (async (_req, res) => {
  const allUsers = await UserModel.find({});
  res.status(200).json(allUsers);
}) as RequestHandler);

usersRouter.get("/:id", (async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) return res.status(404).end();
  return res.status(200).json(user);
}) as RequestHandler);

usersRouter.post("/", checkSchema(newUserSchema), (async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = <NewUser>matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });

  const passwordHash = await bcrypt.hash(newUser.password, 10);

  const newUserObject: Omit<DatabaseUser, "id"> = {
    username: newUser.username,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    hash: passwordHash,
  };

  const user = await new UserModel(newUserObject).save();
  return res.status(200).json(user);
}) as RequestHandler);
export default usersRouter;
