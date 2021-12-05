import express from 'express';
import EmpresaUseCases from '../../../application/use-cases/empresaUseCases';
import { AppContext } from '../../config/AppContext';

const categoriaController = (appContext: AppContext) => {
    const router = express.Router();
    const empresaUseCases = new EmpresaUseCases(appContext);

    router.get('/getby-user/:userId', async (req, res, next) => {
        try {
            const data = await empresaUseCases.getEmpresasByUserId(req.params.userId);
            res.json({ success: true, data });
        }
        catch (err) {
            next(err);
        }
    });

    router.get('/getby-id/:empresaId', async (req, res, next) => {
        try {
            const data = await empresaUseCases.getEmpresaById(req.params.empresaId);
            res.json({ success: true, data });
        }
        catch (err) {
            next(err);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const data = await empresaUseCases.createEmpresa(req.body);
            res.json({ success: true, data });
        }
        catch (err) {
            next(err);
        }
    });

    router.put('/:empresaId', async (req, res, next) => {
        try {
            const data = await empresaUseCases.updateEmpresa(req.params.empresaId, req.body);
            res.json({ success: true, data });
        }
        catch (err) {
            next(err);
        }
    });

    router.delete('/:empresaId', async (req, res, next) => {
        try {
            await empresaUseCases.deleteEmpresa(req.params.empresaId);
            res.json({ success: true });
        }
        catch (err) {
            next(err);
        }
    });

    return router;

}

export default categoriaController;