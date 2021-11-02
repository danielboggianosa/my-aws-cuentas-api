const express = require("express");
const UserUseCases = require("../../../application/use-cases/userUseCases");

module.exports = (appContext) => {
  const router = express.Router();
  const userUseCases = new UserUseCases(appContext);

  router.get("/:userId", async (req, res, next) => {
    try {
      const data = await userUseCases.getUser(req.params.userId);
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
