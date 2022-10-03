require("express-async-errors");
import express, { RequestHandler } from "express";
import {
  checkSchema,
  validationResult,
  matchedData,
  body,
} from "express-validator";
import bcrypt from "bcrypt";
import { NewUser, DatabaseUser } from "../types/userTypes";
import UserModel from "../models/user";
import { IGetUserAuthInfoRequest } from "../types/reuqestTypes";

import { newUserSchema, updateUserSchema } from "../validation/userValidation";
import { UserRole } from "../types/universalTypes";

import { adminRequired } from "../utils/middleware/middleware";
const usersRouter = express.Router();

usersRouter.get("/", adminRequired, (async (_req, res) => {
  const allUsers = await UserModel.find({});
  res.status(200).json(allUsers);
}) as RequestHandler);

usersRouter.get("/:id", (async (req: IGetUserAuthInfoRequest, res) => {
  const currentUser = req.user;
  const userIdToFind = req.params.id;
  if (!currentUser) return res.status(500).end();
  if (currentUser.id !== userIdToFind && currentUser.role !== "admin")
    return res.status(403).end();
  const responseUser = await UserModel.findById(userIdToFind);
  if (!responseUser) return res.status(404).end();
  return res.status(200).json(responseUser);
}) as RequestHandler);

usersRouter.put(
  "/:id/changepassword",
  body("oldPassword").isLength({ min: 6, max: 255 }),
  body("newPassword").isLength({ min: 6, max: 255 }),
  (async (req: IGetUserAuthInfoRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const currentUser = req.user;
    const userIdToFind = req.params.id;
    if (!currentUser) return res.status(500).end();
    if (currentUser.id !== userIdToFind && currentUser.role !== "admin")
      return res.status(403).end();

    const { oldPassword, newPassword } = <
      { oldPassword: string; newPassword: string }
    >matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const userToChange = await UserModel.findById(userIdToFind);
    if (!userToChange) return res.status(404).json({ error: "user not found" });
    const passwordCorrect =
      userToChange === null
        ? false
        : await bcrypt.compare(oldPassword, userToChange.hash);

    if (!passwordCorrect)
      return res.status(403).json({ error: "original password is incorrect" });

    userToChange.hash = await bcrypt.hash(newPassword, 10);

    await userToChange.save();

    return res.status(204).json(userToChange);
  }) as RequestHandler
);

usersRouter.delete("/:id", adminRequired, (async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) return res.status(404).end();
  return res.status(204).json(user);
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
    role: newUser.role,
    refreshToken: {token: "", creationDate: new Date()},
    hash: passwordHash,
  };

  const user = await new UserModel(newUserObject).save();
  return res.status(200).json(user);
}) as RequestHandler);

usersRouter.put("/:id", checkSchema(updateUserSchema), (async (
  req: IGetUserAuthInfoRequest,
  res
) => {
  const id = req.params.id;
  const currentUser = req.user as DatabaseUser;
  const oldUser = await UserModel.findById(id);

  if (!oldUser) return res.status(404).json({ error: "user not found" });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const modifiedUser = <
    Omit<NewUser, "password" | "role"> & { password?: string; role?: UserRole }
  >matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });

  if (currentUser.role === "admin" || currentUser.role === "owner") {
    oldUser.username = modifiedUser.username;
    oldUser.firstName = modifiedUser.firstName;
    oldUser.lastName = modifiedUser.lastName;
    oldUser.email = modifiedUser.email;
    oldUser.role = modifiedUser.role ?? oldUser.role;
    if (modifiedUser.password)
      oldUser.hash = await bcrypt.hash(modifiedUser.password, 10);
  } else {
    oldUser.username = modifiedUser.username;
    oldUser.firstName = modifiedUser.firstName;
    oldUser.lastName = modifiedUser.lastName;
    oldUser.email = modifiedUser.email;

    if (oldUser.role !== modifiedUser.role || modifiedUser.password)
      return res.status(403).json({
        error:
          "cannot change role or change other user's password without satisfied perms",
      });
  }

  const user = await oldUser.save();

  return res.status(200).json(user);
}) as RequestHandler);

export default usersRouter;
