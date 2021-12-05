import express from "express";
import userController from "./controllers/userController";
import cuentaController from "./controllers/cuentaController";
import categoriaController from "./controllers/categoriaController";
import empresaController from "./controllers/empresaController";
import registroController from "./controllers/registroController";
import subcategoriaController from "./controllers/subcategoriaController";

const router = (appContext: any) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/categorias", categoriaController(appContext));
  app.use("/cuentas", cuentaController(appContext));
  app.use("/empresas", empresaController(appContext));
  app.use("/registros", registroController(appContext));
  app.use("/subcategorias", subcategoriaController(appContext));
  app.use("/users", userController(appContext));

  app.use((req, res, next) => {
    res.status(404).send("<h1>404 Not Found</h1>");
  });

  app.use((err: any, req: any, res: any, _next: any) => {
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
