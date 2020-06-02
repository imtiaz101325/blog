import * as express from "express";

import BaseController from "./BaseController";
import User from "../models/user";
import { debug } from "../app";
import { generateHash } from "../helpers/auth";

export default class UserController extends BaseController {
  static async getUsers(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const users = await User.query().select(
        "id",
        "firstName",
        "lastName",
        "username",
        "about",
        "lastLogin",
        "status",
        "isAdmin",
        "isAuthor",
        "email",
        "createdAt",
        "updatedAt"
      );
      return res.send(users);
    } catch (err) {
      debug("Error fetching users: ", err);

      return res.status(400).end("Could not process request.");
    }
  }

  static async createUser(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const { firstName, lastName, username, about, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .end("Request must contain username, email and password");
    }

    // TODO: check if email or username exists currently checking both using logical and
    try {
      const users = await User.query().select("username", "email").where({
        username,
        email,
      });

      if (users.length) {
        return res.status(401).end("The username or email already exists");
      }

      const { salt, hash } = generateHash(password);
      try {
        const { id, createdAt, role } = await User.query()
          .insert({
            firstName,
            lastName,
            username,
            about,
            email,
            salt,
            password: hash,
          })
          .returning(["id", "createdAt"]);
        
        // TODO: return name
        return res.send({
          id,
          username,
          role,
          email,
          createdAt,
        });
      } catch (err) {
        debug("Error inserting User into database", err);

        return res.status(500).end("Could not create database entry.");
      }
    } catch (err) {
      debug("Error querying database", err);

      return res.status(500).end("Could not query database.");
    }
  }
}
