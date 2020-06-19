import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import Debug from "debug";
import { Model } from "objection";
import * as swaggerUi from "swagger-ui-express";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import openAPISpec from "./openapi.json";

import knex from "./models/knex";

export const debug = Debug("backend:server");
async function checkConnection() {
  try {
    await knex.raw("select 1+1 as result");

    // Bind all Models to a knex instance.
    Model.knex(knex);

    debug("Successfully connected to database.");
  } catch (err) {
    debug("Unable to connect to the database:", err);
  }
}

checkConnection();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openAPISpec));
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/posts/", postsRouter);

export default app;
