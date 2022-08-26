import { UserRole } from "./universalTypes";

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  role: UserRole;
}

export interface AuthUser extends User {
  token: string;
}
export interface NewUser extends Omit<User, "id"> {
  password: string;
}
