import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import setupEnv from "./lib/setupEnv.js";

import makeTypeRouter from "./routes/type.js";

import ErrorMiddleware from "./middleware/error.js";

export default function (database) {
  // Set up dotenv environment from .env file.
  setupEnv("../.env");

  const app = express();

  // Enable logging of request hits
  app.use(morgan("combined"));

  // Enable parsing of JSON in req.body
  app.use(bodyParser.json());

  // Enable CORS (Cross Origin Resource Sharing w/ frontend app)
  const corsOptions = {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_APP_URL
        : process.env.FRONTEND_APP_URL_LOCAL,
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  // Routes
  app.use("/api/types", makeTypeRouter(database));

  // Default Route
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  //
  app.get("*", (req, res) => {
    res.status(404).send("Route not found");
  });

  // error handling middleware
  app.use(ErrorMiddleware.handleError);

  return app;
}
