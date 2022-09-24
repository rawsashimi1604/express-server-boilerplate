import express from "express";

import TypeController from "../controller/type.js";
import asyncErrorHandler from "../lib/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Middleware that is specific to Type Router..
  router.use((req, res, next) => {
    // Inject database to controllers (Dependency Injection)
    res.locals.database = database;

    // Continue next middleware function or route...
    next();
  });

  // Routes
  router.get("/", TypeController.handleIndex);
  router.get("/all", asyncErrorHandler(TypeController.handleAllTypes));

  return router;
}
