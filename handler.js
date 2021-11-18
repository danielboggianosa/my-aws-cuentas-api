"use strict";

const serverless = require("serverless-http");
const { router } = require("./build/infrastructure/webserver/load-routes");

const { AppContext } = require("./build/infrastructure/config/bootstrap");

const app = router(new AppContext());

module.exports.handler = serverless(app);
