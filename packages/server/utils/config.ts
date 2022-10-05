import "dotenv/config";
import { Logger } from "tslog";
const log = new Logger({ name: "configLogger" });
import { isNumber } from "./validations";

const PORT = process.env.PORT;

const getMongoURI = (): string | undefined => {
  const ENVIRONMENT = process.env.NODE_ENV;
  switch (ENVIRONMENT) {
    case "test":
      return process.env.TEST_MONGODB_URI;
    case "development":
      return process.env.DEV_MONGODB_URI;
    case "production":
      return process.env.MONGODB_URI;
    default:
      throw new Error(
        `NODE_ENV: '${ENVIRONMENT}' is not configured correctly `
      );
  }
};

const getAccessTokenExpiry = (): number => {
  const envAccessTokenExpiryMinutes = process.env.ACCESS_TOKEN_EXPIRY_MINUTES;
  if (!isNumber(envAccessTokenExpiryMinutes))
    throw new Error(
      `process.env.ACCESS_TOKEN_EXPIRY_MINUTES: '${envAccessTokenExpiryMinutes}' is not a number.`
    );
  return Math.round(envAccessTokenExpiryMinutes * 60);
};

const getRefreshTokenExpiry = (): number => {
  const envRefreshTokenExpiryHours = process.env.REFRESH_TOKEN_EXPIRY_HOURS;
  if (!isNumber(envRefreshTokenExpiryHours))
    throw new Error(
      `process.env.REFRESH_TOKEN_EXPIRY_HOURS: '${envRefreshTokenExpiryHours}' is not a number.`
    );
  return Math.round(envRefreshTokenExpiryHours * 60 * 60 * 1000);
};

const MONGODB_URI = getMongoURI();

const ACCESS_TOKEN_EXPIRY = getAccessTokenExpiry();
const REFRESH_TOKEN_EXPIRY = getRefreshTokenExpiry();

log.info(
  `ACCESS_TOKEN_EXPIRY: ${ACCESS_TOKEN_EXPIRY} s (${ACCESS_TOKEN_EXPIRY/60} min)`
);
log.info(
  `REFRESH_TOKEN_EXPIRY: ${REFRESH_TOKEN_EXPIRY} ms (${
    REFRESH_TOKEN_EXPIRY / 60 / 60 / 1000
  } hr)`
);

const ENVIRONMENT = process.env.NODE_ENV;
export default {
  PORT,
  ENVIRONMENT,
  MONGODB_URI,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
};
