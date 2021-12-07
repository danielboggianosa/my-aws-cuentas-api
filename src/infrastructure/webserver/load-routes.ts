import express, {NextFunction, Request, Response } from "express";
import { tokenAuthentication } from "../../application/validations/securityValidations";
import { CustomRequest } from "../../domain/types/customTypes";
import authController from "./controllers/authController";
import categoriaController from "./controllers/categoriaController";
import cuentaController from "./controllers/cuentaController";
import empresaController from "./controllers/empresaController";
import registroController from "./controllers/registroController";
import subcategoriaController from "./controllers/subcategoriaController";
import userController from "./controllers/userController";

const router = (appContext: any) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/auth", authController(appContext));
  app.use("/categorias", tokenAuthentication, categoriaController(appContext));
  app.use("/cuentas", tokenAuthentication, cuentaController(appContext));
  app.use("/empresas", tokenAuthentication, empresaController(appContext));
  app.use("/registros", tokenAuthentication, registroController(appContext));
  app.use("/subcategorias", tokenAuthentication, subcategoriaController(appContext));
  app.use("/users", tokenAuthentication, userController(appContext));

  app.use((req, res, next) => {
    res.status(404).send("<h1>404 Not Found</h1>");
  });

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  });

  return app;
};

export { router };
