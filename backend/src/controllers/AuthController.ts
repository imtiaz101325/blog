import * as express from "express";
import validator from "validator";
import jwt from "jsonwebtoken";

import BaseController from "./BaseController";
import User from "../models/user";
import { getHash, secret } from "../helpers/auth";
import knex from "../models/knex";
import { debug } from "../app";

export default class AuthController extends BaseController {
  static async login(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
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
      const user = await User.query()
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
        const { id, username, email, role } = user;
        const expiresAt = new Date(Date.now() + 12096e5);

        const token = jwt.sign(
          {
            id,
            username,
            email,
            role,
            expiresAt: expiresAt,
          },
          secret
        );

        await User.query().where(where).first().update({
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
  }
}
