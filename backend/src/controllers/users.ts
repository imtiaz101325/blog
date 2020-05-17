import express from "express";

import User from "../models/user";
import { generateHash } from "../helpers/auth";
import { debug } from "../app";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
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
      "updatedAt",
    );
    return res.send(users);
  } catch (err) {
    debug("Error fetching users: ", err);

    return res.status(400).end("Could not process request.");
  }
});

router.post("/", async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, username, about, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .end("Request must contain username, email and password");
  }

  // const User = knex<User>("Users");
  const users = await User.query().select("username", "email").where({
    username,
    email,
  });

  if (users.length) {
    return res.status(400).end("The username or email already exists");
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

    return res.send({
      id,
      username,
      role,
      email,
      createdAt,
    });
  } catch (err) {
    debug("Error inserting User into database", err);

    return res.status(400).end("Could not create database entry.");
  }
});

export default router;
