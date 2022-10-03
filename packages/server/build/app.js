"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const partsRouter_1 = __importDefault(require("./routes/partsRouter"));
const projectsRouter_1 = __importDefault(require("./routes/projectsRouter"));
const assemblyRouter_1 = __importDefault(require("./routes/assemblyRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
require("express-async-errors");
const middleware_1 = require("./utils/middleware/middleware");
const middleware_2 = require("./utils/middleware/middleware");
const tslog_1 = require("tslog");
const path_1 = __importDefault(require("path"));
const refreshRouter_1 = __importDefault(require("./routes/refreshRouter"));
const log = new tslog_1.Logger({ name: "myLogger" });
log.info(`MONGO_URI: ${config_1.default.MONGODB_URI}`);
log.info(`NODE_ENV: ${process.env.NODE_ENV}`);
mongoose_1.default
    .connect(config_1.default.MONGODB_URI || "")
    .then(() => {
    log.info("connected to MongoDB");
})
    .catch((error) => {
    log.error("error connecting to MongoDB:", error.message);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "./build")));
app.use("/api/refresh", refreshRouter_1.default);
app.use("/api/login", loginRouter_1.default);
app.use("/api/*", middleware_2.tokenExtractor);
app.use("/api/*", middleware_2.userExtractor);
app.use("/api/users", usersRouter_1.default);
app.use("/api/parts", partsRouter_1.default);
app.use("/api/projects", projectsRouter_1.default);
app.use("/api/assemblies", assemblyRouter_1.default);
app.use("/api/*", middleware_2.adminRequired);
app.use("/api/*", middleware_1.errorHandler);
app.get("*", function (_req, res) {
    res.sendFile("index.html", {
        root: path_1.default.join(__dirname, "./build"),
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map