import "dotenv/config";

const PORT = process.env.PORT;
const ENVIRONMENT = process.env.NODE_ENV;

const MONGODB_URI = <string>(
  (process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI)
);

export default { PORT, ENVIRONMENT, MONGODB_URI };
