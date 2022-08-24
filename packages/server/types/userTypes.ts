import { Types } from "mongoose";
export interface DatabaseUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
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
}
