import mongoose from "mongoose";
import { DatabaseUser } from "../types/userTypes";

const userSchema = new mongoose.Schema<DatabaseUser>({
  firstName: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    min: 3,
    max: 255,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    min: 6,
    max: 255,
    index: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    errorMessage: "role must be either admin or user",
  },
  hash: { type: String, required: true },
});

userSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hash;
  },
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
