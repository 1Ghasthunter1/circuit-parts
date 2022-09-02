import "dotenv/config";

const PORT = process.env.PORT;
const ENVIRONMENT = process.env.NODE_ENV;

const getMongoURI = (): string | undefined => {
  switch (ENVIRONMENT) {
    case "test":
      return process.env.TEST_MONGODB_URI;
    case "development":
      return process.env.DEV_MONGODB_URI;
    case "production":
      return process.env.MONGODB_URI;
    default:
      throw new Error(
        `NODE_ENV is '${ENVIRONMENT}' is not configured correctly `
      );
  }
};
const MONGODB_URI = getMongoURI();

export default { PORT, ENVIRONMENT, MONGODB_URI };
