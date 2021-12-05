import express from "express";
import RegistroUseCases from "../../../application/use-cases/registroUseCases";
import { AppContext } from "../../config/AppContext";

const registroController = (appContext: AppContext) => {
    const router = express.Router();
    const registroUseCases = new RegistroUseCases(appContext);

    router.get('/getby-cuenta/:cuentaId', async (req, res, next) => {
        try {
            const data = await registroUseCases.getAllByCuentaId(req.params.cuentaId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.get('/getby-id/:registroId', async (req, res, next) => {
        try {
            const data = await registroUseCases.getById(req.params.registroId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    })

    router.post('/', async (req, res, next) => {
        try {
            console.log("CONTROLLER");
            const data = await registroUseCases.create(req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.put('/:registroId', async (req, res, next) => {
        try {
            const data = await registroUseCases.update(req.params.registroId, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:registroId', async (req, res, next) => {
        try {
            await registroUseCases.delete(req.params.registroId);
            res.json({ sucess: true });
        } catch (error) {
            next(error);
        }
    });

    return router;
}

export default registroController;