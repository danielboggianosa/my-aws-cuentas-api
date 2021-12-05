import express from 'express';
import CuentaUseCases from '../../../application/use-cases/cuentaUseCases';
import { AppContext } from '../../config/AppContext';


const cuentaController = (appContext: AppContext) => {
  const router = express.Router();
  const cuentaUseCases = new CuentaUseCases(appContext);

  router.get("/", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.getCuentas();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:cuentaId", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.getCuentaById(req.params.cuentaId);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  });

  router.get("/usuario/:usuarioId", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.getCuentasByUsuarioId(req.params.usuarioId);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.createCuenta(req.body);
      res.json({ success: true, data });
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
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:cuentaId", async (req, res, next) => {
    try {
      const data = await cuentaUseCases.deleteCuenta(req.params.cuentaId);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

export default cuentaController;