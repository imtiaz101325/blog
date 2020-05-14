import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import Debug from "debug";

import usersRouter from "./routes/users";
import authRouter from "./routes/auth";

import knex from "./db";

export const debug = Debug("backend:server");
async function checkConnection() {
  try {
    await knex.raw("select 1+1 as result");

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

app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/auth/", authRouter);

export default app;
