import express from 'express';
import AuthSecurity from '../../../application/security/authSecurity';
import { AppContext } from '../../config/AppContext';

const authController = (appContext: AppContext) => {
    const router = express.Router();
    const authSecurity = new AuthSecurity(appContext);

    router.post('/login', async (req, res, next) => {
        try {
            const token = await authSecurity.login(req.body);
            res.json({ success: true, token });
        } catch (error) {
            next(error);
        }
    });

    router.get('/logout', async (req, res, next) => {
        try {
            await authSecurity.logout();
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    });

    router.post('/register', async (req, res, next) => {
        try {
            const token = await authSecurity.register(req.body);
            res.json({ success: true, token });
        } catch (error) {
            next(error);
        }
    });

    return router;
}

export default authController;