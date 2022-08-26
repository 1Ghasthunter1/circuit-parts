import axios from "axios";
import { NewUser, User } from "../types/userTypes";
import { apiBaseUrl } from "../constants";

export const fetchAllUsers = async () => {
  const { data } = await axios.get<Omit<User, "token">[]>(
    `${apiBaseUrl}/users`
  );
  return data;
};

export const createNewUser = async (user: NewUser) => {
  return await axios.post<NewUser>(`${apiBaseUrl}/users`, user);
};
