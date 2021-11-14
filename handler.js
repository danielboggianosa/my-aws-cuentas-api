"use strict";

const serverless = require("serverless-http");
const { router } = require("./build/infrastructure/webserver/load-routes");

const bootstrap = require("./build/infrastructure/config/dynamoDbBootstrap");
const appContext = bootstrap;

const app = router(appContext);

module.exports.handler = serverless(app);
