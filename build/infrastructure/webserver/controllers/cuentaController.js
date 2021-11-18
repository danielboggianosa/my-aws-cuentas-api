"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cuentaUseCases_1 = __importDefault(require("../../../application/use-cases/cuentaUseCases"));
const cuentaController = (appContext) => {
    const router = express_1.default.Router();
    const cuentaUseCases = new cuentaUseCases_1.default(appContext);
    router.get("/", async (req, res, next) => {
        try {
            const cuentas = await cuentaUseCases.getCuentas();
            res.json(cuentas);
        }
        catch (error) {
            next(error);
        }
    });
    router.get("/:cuentaId", async (req, res, next) => {
        try {
            const data = await cuentaUseCases.getCuentaById(req.params.cuentaId);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.get("/usuario/:usuarioId", async (req, res, next) => {
        try {
            const data = await cuentaUseCases.getCuentasByUsuarioId(req.params.usuarioId);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.post("/", async (req, res, next) => {
        try {
            const data = await cuentaUseCases.createCuenta(req.body);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.put("/:cuentaId", async (req, res, next) => {
        try {
            const data = await cuentaUseCases.updateCuenta(req.params.cuentaId, req.body);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.delete("/:cuentaId", async (req, res, next) => {
        try {
            const data = await cuentaUseCases.deleteCuenta(req.params.cuentaId);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    return router;
};
exports.default = cuentaController;
