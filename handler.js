"use strict";

const serverless = require("serverless-http");
const getApp = require("./src/infrastructure/webserver/load-routes");

const bootstrap = require("./src/infrastructure/config/bootstrap");
const appContext = bootstrap();

const app = getApp(appContext);

module.exports.handler = serverless(app);