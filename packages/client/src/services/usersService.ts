import axios from "axios";
import { User } from "../types/userTypes";
import { apiBaseUrl } from "../constants";

export const fetchAllUsers = async () => {
  const { data } = await axios.get<Omit<User, "token">[]>(
    `${apiBaseUrl}/users`
  );
  return data;
};
