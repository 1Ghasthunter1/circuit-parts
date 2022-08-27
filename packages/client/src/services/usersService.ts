import axios from "axios";
import { NewUser, User, EditedUser } from "../types/userTypes";
import { apiBaseUrl } from "../constants";

export const fetchAllUsers = async () => {
  const { data } = await axios.get<Omit<User, "token">[]>(
    `${apiBaseUrl}/users`
  );
  return data;
};

export const createNewUser = async (user: NewUser) => {
  return await axios.post<User>(`${apiBaseUrl}/users`, user);
};

export const updateUserById = async (user: EditedUser) => {
  return await axios.put<User>(`${apiBaseUrl}/users/${user.id}`, user);
};

export const deleteUserById = async (userId: string) => {
  return await axios.delete<NewUser>(`${apiBaseUrl}/users/${userId}`);
};
