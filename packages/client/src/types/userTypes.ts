import { UserRole } from "./universalTypes";

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  role: UserRole;
}

export interface UserFromAPI {
  token: string;
  refreshToken: string;
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  role: UserRole;
}
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}
export interface AuthUser extends User {
  token: string;
}
export interface NewUser extends Omit<User, "id"> {
  password: string;
}

export interface EditedUser extends Omit<User, "password"> {
  password?: string;
}

export interface NewUserPassword {
  oldPassword: string;
  newPassword: string;
}
