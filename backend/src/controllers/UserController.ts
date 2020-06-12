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
    if (req.user && req.user.role === "admin") {
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

        return res.status(400).send({
          error: "Could not process request.",
        });
      }
    } else {
      debug("Either user is not authenticated or user is not a admin.");

      return res.status(401).send({
        error: "User not an admin.",
      });
    }
  }

  static async getUser(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const id = req.params.id;

    if (req.user) {
      const { role } = req.user;

      if (
        role === "admin" ||
        (role !== "admin" && req.user.id === parseInt(id, 10))
      ) {
        try {
          const user = await User.query()
            .select(
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
            )
            .where({ id })
            .first();

          return res.send(user);
        } catch (err) {
          debug(`Error fetching user with id ${id}: `, err);

          return res.status(500).send({
            error: "Could not process request.",
          });
        }
      } else {
        debug("Only admin or user himself can get this data.");

        res.status(401).send({
          error: "User not an admin.",
        });
      }
    } else {
      debug("User does not appear to be authenticated.");

      return res.status(401).send({
        error: "User not an admin.",
      });
    }
  }

  static async createUser(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const { firstName, lastName, username, about, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        error: "Request must contain username/email and password",
      });
    }

    try {
      const users = await User.query()
        .select("username", "email")
        .where({
          username,
        })
        .orWhere({
          email,
        });

      if (users.length) {
        return res.status(401).send({
          error: "The username or email already exists",
        });
      }

      const { salt, hash } = generateHash(password);
      try {
        const { id, createdAt, role, name } = await User.query()
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

        return res.send({
          id,
          name,
          username,
          role,
          email,
          createdAt,
        });
      } catch (err) {
        debug("Error inserting User into database: ", err);

        return res.status(500).send({
          error: "Could not create database entry.",
        });
      }
    } catch (err) {
      debug("Error querying database: ", err);

      return res.status(500).send({
        error: "Could not query database.",
      });
    }
  }

  static async deleteUser(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const id = req.params.id;

    if (req.user) {
      const { role } = req.user;

      if (
        role === "admin" ||
        (role !== "admin" && req.user.id === parseInt(id, 10))
      ) {
        try {
          const users = await User.query().select().where({ id });

          if (users.length) {
            const rows = await User.query().where({ id }).del();

            res.send(`Deleted ${rows} user(s) with id ${id}.`);
          } else {
            res.status(400).send({
              error: `User with id ${id} not found.`,
            });
          }
        } catch (err) {
          debug("Error querying database: ", err);

          return res.status(500).send({
            error: "Could not query database.",
          });
        }
      } else {
        debug("Only admin or user himself can delete this data.");

        res.status(401).send({
          error: "User not an admin.",
        });
      }
    } else {
      debug("User does not appear to be authenticated.");

      return res.status(401).send({
        error: "User not authenticated.",
      });
    }
  }

  static async updateUser(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const id = req.params.id;

    if (req.user) {
      const { role } = req.user;

      if (
        role === "admin" ||
        (role !== "admin" && req.user.id === parseInt(id, 10))
      ) {
        const {
          firstName,
          lastName,
          username,
          about,
          status,
          isAdmin,
          isAuthor,
          email,
        } = req.body;

        const fields: {
          [key: string]: string | boolean;
        } = {
          firstName,
          lastName,
          username,
          about,
          status,
          isAdmin,
          isAuthor,
          email,
        };

        if (req.method === "PATCH") {
          const data = Object.keys(fields)
            .filter((key) => Boolean(fields[key]))
            .reduce((acc, key) => ({ ...acc, [key]: fields[key] }), {});

          try {
            await User.query().where({ id }).update(data);

            res.send("Successfully updated user.");
          } catch (err) {
            debug("Error updating database: ", err);

            return res.status(500).send({
              error: "Could not update database.",
            });
          }
        }
      } else {
        debug("Only admin or user himself can update this data.");

        res.status(401).send({
          error: "User not an admin.",
        });
      }
    } else {
      debug("User does not appear to be authenticated.");

      return res.status(401).send({
        error: "User not authenticated.",
      });
    }
  }
}
