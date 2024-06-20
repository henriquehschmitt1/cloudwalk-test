import express from "express";
import QuakeController from "../controllers/QuakeController.js";

const router = express.Router();
const quakeController = new QuakeController();

function routeErrorHandler(route) {
  return async (req, res) => {
    try {
      await route(req, res);
    } catch (error) {
      const errorMessage = error.message || "Internal server error";
      res.status(error.status || 500).json({ errorMessage });
    }
  };
}

router.get("/data", routeErrorHandler(quakeController.getData));

export default router;
