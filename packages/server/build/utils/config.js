"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.NODE_ENV;
const MONGODB_URI = ((process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI));
exports.default = { PORT, ENVIRONMENT, MONGODB_URI };
//# sourceMappingURL=config.js.map