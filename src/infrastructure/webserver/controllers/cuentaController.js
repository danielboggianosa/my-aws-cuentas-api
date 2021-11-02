const express = require("express");
const CuentaUseCases = require("../../../application/use-cases/cuentaUseCases");

module.exports = (appContext) => {
  const router = express.Router();
  const cuentaUseCases = new CuentaUseCases(appContext);

  router.get("/:cuentaId", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.getCuenta(req.params.cuentaId);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.createCuenta(req.body);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:cuentaId", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.updateCuenta(
        req.params.cuentaId,
        req.body
      );
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:cuentaId", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.deleteCuenta(req.params.cuentaId);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
