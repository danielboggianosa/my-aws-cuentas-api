"use strict";

const http = require("http");
const hostname = "localhost";
const port = 3000;
const { router } = require("./build/infrastructure/webserver/load-routes");

const bootstrap = require("./build/infrastructure/config/inMemoryBootstrap");
const appContext = bootstrap;

const app = router(appContext);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
