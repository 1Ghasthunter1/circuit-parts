"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({ name: "configLogger" });
const validations_1 = require("./validations");
const PORT = process.env.PORT;
const getMongoURI = () => {
    const ENVIRONMENT = process.env.NODE_ENV;
    switch (ENVIRONMENT) {
        case "test":
            return process.env.TEST_MONGODB_URI;
        case "development":
            return process.env.DEV_MONGODB_URI;
        case "production":
            return process.env.MONGODB_URI;
        default:
            throw new Error(`NODE_ENV: '${ENVIRONMENT}' is not configured correctly `);
    }
};
const getAccessTokenExpiryMinutes = () => {
    const envAccessTokenExpiryMinutes = process.env.ACCESS_TOKEN_EXPIRY_MINUTES;
    if (!(0, validations_1.isNumber)(envAccessTokenExpiryMinutes))
        throw new Error(`process.env.ACCESS_TOKEN_EXPIRY_MINUTES: '${envAccessTokenExpiryMinutes}' is not a number.`);
    return envAccessTokenExpiryMinutes;
};
const getRefreshTokenExpiryHours = () => {
    const envRefreshTokenExpiryHours = process.env.REFRESH_TOKEN_EXPIRY_HOURS;
    if (!(0, validations_1.isNumber)(envRefreshTokenExpiryHours))
        throw new Error(`process.env.REFRESH_TOKEN_EXPIRY_HOURS: '${envRefreshTokenExpiryHours}' is not a number.`);
    return envRefreshTokenExpiryHours;
};
const MONGODB_URI = getMongoURI();
const ACCESS_TOKEN_EXPIRY_MINUTES = getAccessTokenExpiryMinutes();
const REFRESH_TOKEN_EXPIRY_HOURS = getRefreshTokenExpiryHours();
log.info(`ACCESS_TOKEN_EXPIRY_MINUTES: ${ACCESS_TOKEN_EXPIRY_MINUTES}`);
log.info(`REFRESH_TOKEN_EXPIRY_HOURS: ${REFRESH_TOKEN_EXPIRY_HOURS}`);
const ENVIRONMENT = process.env.NODE_ENV;
exports.default = {
    PORT,
    ENVIRONMENT,
    MONGODB_URI,
    ACCESS_TOKEN_EXPIRY_MINUTES,
    REFRESH_TOKEN_EXPIRY_HOURS,
};
//# sourceMappingURL=config.js.map