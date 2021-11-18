"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./controllers/userController"));
const cuentaController_1 = __importDefault(require("./controllers/cuentaController"));
const router = (appContext) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/users", (0, userController_1.default)(appContext));
    app.use("/cuentas", (0, cuentaController_1.default)(appContext));
    app.use((req, res, next) => {
        res.status(404).send("<h1>404 Not Found</h1>");
    });
    app.use((err, req, res, _next) => {
        console.error(err.stack);
        res.status(500).json({
            success: false,
            message: err.message,
            stack: err.stack,
        });
    });
    return app;
};
exports.router = router;
