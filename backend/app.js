const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const db = require("./models");

async function checkConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("Successfully connected to database.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

checkConnection();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", indexRouter);
app.use("/api/v1/users/", usersRouter);

module.exports = app;
