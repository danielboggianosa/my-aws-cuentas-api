"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userUseCases_1 = __importDefault(require("../../../application/use-cases/userUseCases"));
const userController = (appContext) => {
    const router = express_1.default.Router();
    const userUseCases = new userUseCases_1.default(appContext);
    router.get("/", async (req, res, next) => {
        try {
            const users = await userUseCases.getUsers();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    });
    router.get("/:userId", async (req, res, next) => {
        try {
            const data = await userUseCases.getUserById(req.params.userId);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.get("/email/:email", async (req, res, next) => {
        try {
            const data = await userUseCases.getUserByEmail(req.params.email);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.post("/", async (req, res, next) => {
        try {
            const data = await userUseCases.createUser(req.body);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.put("/:userId", async (req, res, next) => {
        try {
            const data = await userUseCases.updateUser(req.params.userId, req.body);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    router.delete("/:userId", async (req, res, next) => {
        try {
            const data = await userUseCases.deleteUser(req.params.userId);
            res.json({ success: true, data: data });
        }
        catch (error) {
            next(error);
        }
    });
    return router;
};
exports.default = userController;
