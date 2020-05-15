import express from "express";
import validator from "validator";
import jwt from "jsonwebtoken";

import { getHash } from "../helpers/auth";
import UserTable, { getRole } from "../models/user";
import { debug } from "../app";
import knex from "../models";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    username,
    password,
  }: { username: string; password: string } = req.body;

  let where:
    | {
        username: string;
      }
    | {
        email: string;
      } = { username };
  if (validator.isEmail(username)) {
    where = { email: username };
  }

  try {
    const user = await UserTable()
      .select(
        "id",
        "username",
        "email",
        "password",
        "salt",
        "isAdmin",
        "isAuthor"
      )
      .where(where)
      .first();

    const hash = user && getHash(password, user.salt);
    if (user && user.password === hash) {
      const { id, username, email, isAdmin, isAuthor } = user;
      const expiresAt = new Date(Date.now() + 12096e5);
      const secret = process.env.JWT_SECRET || "top-secret";
      const token = jwt.sign(
        {
          id,
          username,
          email,
          role: getRole(isAdmin, isAuthor),
          expiresAt: expiresAt,
        },
        secret
      );

      await UserTable().where(where).first().update({
        token,
        expiresAt,
        lastLogin: knex.fn.now(),
      });

      return res.json({
        token,
      });
    } else {
      return res.status(401).end("Incorrect username or password");
    }
  } catch (err) {
    debug("Error querying user table", err);

    return res.status(400).end("Server error");
  }
});

export default router;
