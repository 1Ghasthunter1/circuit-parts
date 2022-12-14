"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./utils/config"));
const tslog_1 = require("tslog");
const serverInitialization_1 = require("./utils/serverInitialization");
const log = new tslog_1.Logger({ name: "myLogger" });
const server = http_1.default.createServer(app_1.default);
server.listen(config_1.default.PORT, () => {
    void (0, serverInitialization_1.initializeUsers)();
    log.info(`PORT: ${config_1.default.PORT}`);
});
//# sourceMappingURL=index.js.map