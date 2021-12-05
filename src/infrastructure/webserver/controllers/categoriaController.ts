import express from 'express';
import CategoriaUseCases from '../../../application/use-cases/categoriaUseCases';
import { AppContext } from '../../config/AppContext';

const categoriaController = (appContext: AppContext) => {
    const router = express.Router();
    const categoriaUseCases = new CategoriaUseCases(appContext);

    router.get('/getby-cuenta/:cuentaId', async (req, res, next) => {
        try {
            const data = await categoriaUseCases.getCategoriasByCuentaId(req.params.cuentaId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.get('/getby-id/:categoriaId', async (req, res, next) => {
        try {
            const data = await categoriaUseCases.getCategoriaById(req.params.categoriaId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const data = await categoriaUseCases.createCategoria(req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.put('/:categoriaId', async (req, res, next) => {
        try {
            const data = await categoriaUseCases.updateCategoria(req.params.categoriaId, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:categoriaId', async (req, res, next) => {
        try {
            await categoriaUseCases.deleteCategoria(req.params.categoriaId);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    });

    return router;

}

export default categoriaController;