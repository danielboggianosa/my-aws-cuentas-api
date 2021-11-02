const express = require("express");
const userController = require("../webserver/controllers/userController");
// const authController = require('../webserver/controllers/authController');
const cuentaController = require("../webserver/controllers/cuentaController");

module.exports = (appContext) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/users", userController(appContext));
  app.use("/cuentas", cuentaController(appContext));
  // app.use('/auth', authController(appContext));

  app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
  });

  app.use((err, req, res, _next) => {
    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  });

  return app;
};
