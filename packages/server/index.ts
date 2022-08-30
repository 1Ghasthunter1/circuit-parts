import app from "./app";
import http from "http";
import config from "./utils/config";
import { Logger } from "tslog";
const log: Logger = new Logger({ name: "myLogger" });

const server = http.createServer(app);


server.listen(config.PORT, () => {
  log.info(`PORT: ${config.PORT}`);
});
