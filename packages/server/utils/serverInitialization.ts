import UserModel from "../models/user";
import { DatabaseUser } from "../types/userTypes";
import bcrypt from "bcrypt";

export const initializeUsers = async () => {
  const existingUsers = await UserModel.find({});
  if (existingUsers.length !== 0) {
    return;
  }

  const passwordHash = await bcrypt.hash("password", 10);

  const newUserObject: Omit<DatabaseUser, "id"> = {
    username: "CircuitAdmin",
    firstName: "Circuit",
    lastName: "Admin",
    email: "circuitadmin@team696.org",
    role: "admin",
    hash: passwordHash,
  };

  await new UserModel(newUserObject).save();
};
