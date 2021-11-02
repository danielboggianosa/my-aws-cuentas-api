"use strict";

const UserRepository = require("../repositories/userRepository");
const CuentasRepository = require("../repositories/cuentasRepository");

module.exports = () => {
  const userRepository = new UserRepository();
  const cuentasRepository = new CuentasRepository();

  const appContext = {
    repositories: {
      userRepository,
      cuentasRepository,
    },
  };

  return appContext;
};
