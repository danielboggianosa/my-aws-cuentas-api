import express from 'express'
import UserUseCases from '../../../application/use-cases/userUseCases';

const userController = (appContext: any) => {
  const router = express.Router();
  const userUseCases = new UserUseCases(appContext);

  router.get("/", async (req, res, next) => {
    try {
      const users = await userUseCases.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:userId", async (req, res, next) => {
    try {
      const data = await userUseCases.getUserById(req.params.userId);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.get("/email/:email", async (req, res, next) => {
    try {
      const data = await userUseCases.getUserByEmail(req.params.email);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = await userUseCases.createUser(req.body);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.put("/:userId", async (req, res, next) => {
    try {
      const data = await userUseCases.updateUser(req.params.userId, req.body);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:userId", async (req, res, next) => {
    try {
      const data = await userUseCases.deleteUser(req.params.userId);
      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

export default userController;