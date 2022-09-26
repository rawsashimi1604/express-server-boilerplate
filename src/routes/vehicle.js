import express from "express";

import VehicleController from "../controller/vehicle.js";
import asyncErrorHandler from "../lib/asyncErrorHandler.js";

export default function (database) {
  const router = express.Router();

  // Middleware that is specific to Vehicle Router..
  router.use((req, res, next) => {
    // Inject database to controllers (Dependency Injection)
    res.locals.database = database;

    // Continue next middleware function or route...
    next();
  });

  // Routes
  router.get("/", VehicleController.handleIndex);
  router.get("/all", asyncErrorHandler(VehicleController.handleAllVehicles));

  return router;
}
