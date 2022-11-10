import { RefreshTokenObj } from "../types/userTypes";
import config from "../utils/config";

export const clearOldTokens = (
  tokenObjList: RefreshTokenObj[]
): RefreshTokenObj[] => {
  return tokenObjList.filter((tokenObj) => !tokenExpired(tokenObj));
};

export const tokenExpired = (tokenObj: RefreshTokenObj): boolean => {
  return (
    new Date().getTime() - tokenObj.creationDate.getTime() >
    config.REFRESH_TOKEN_EXPIRY
  );
};
