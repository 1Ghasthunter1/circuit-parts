import { UserRole } from "./universalTypes";

export interface User {
  token: string;
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  role: UserRole;
}

export interface NewUser extends Omit<User, "id"> {
  password: string;
}

