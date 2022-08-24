import { Types } from "mongoose";
import { UserRole } from "./universalTypes";
export interface DatabaseUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  hash: string;
}

export interface NewUser extends Omit<DatabaseUser, "id"> {
  password: string;
}

export interface LoginToUser {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  id: Types.ObjectId;
  role: UserRole;
}
