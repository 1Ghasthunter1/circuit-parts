import { Types } from "mongoose";
import { UserRole } from "./universalTypes";
export interface DatabaseUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  refreshTokens: {
    token: string;
    creationDate: Date;
  }[];
  hash: string;
}

export interface NewUser extends Omit<DatabaseUser, "id"> {
  password: string;
}

export interface LoginToUser {
  token: string;
  refreshToken: string;
  username: string;
  firstName: string;
  lastName: string;
  id: Types.ObjectId;
  role: UserRole;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface RefreshTokenObj {
  token: string;
  creationDate: Date;
}
