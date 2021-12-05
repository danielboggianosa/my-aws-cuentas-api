import express from "express";
import SubcategoriaUseCases from "../../../application/use-cases/subcategoriaUseCases";
import { AppContext } from "../../config/AppContext";

const subcategoriaController = (appContext: AppContext) => {
    const router = express.Router();
    const subcategoriaUseCases = new SubcategoriaUseCases(appContext);

    router.get('/getby-categoria/:categoriaId', async (req, res, next) => {
        try {
            const data = await subcategoriaUseCases.getAllSubcategoryByCategoriaId(req.params.categoriaId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    })

    router.get('/getby-id/:subcategoriaId', async (req, res, next) => {
        try {
            const data = await subcategoriaUseCases.getSubcategoryById(req.params.subcategoriaId);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    })

    router.post('/', async (req, res, next) => {
        try {
            const data = await subcategoriaUseCases.createSubcategory(req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    })

    router.put('/:subcategoriaId', async (req, res, next) => {
        try {
            const data = await subcategoriaUseCases.updateSubcategory(req.params.subcategoriaId, req.body);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:subcategoriaId', async (req, res, next) => {
        try {
            await subcategoriaUseCases.deleteSubcategory(req.params.subcategoriaId);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    })

    return router;
}

export default subcategoriaController;