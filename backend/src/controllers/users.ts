import express from "express";

import UserTable, { getRole } from "../models/user";
import { generateHash } from "../helpers/auth";
import { debug } from "../app";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const users = await UserTable().select(
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
    return res.send(
      users.map(({ isAdmin, isAuthor, ...rest }) => ({
        ...rest,
        role: getRole(isAdmin, isAuthor),
      }))
    );
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
  const users = await UserTable().select("username", "email").where({
    username,
    email,
  });

  if (users.length) {
    return res.status(400).end("The username or email already exists");
  }

  const { salt, hash } = generateHash(password);
  try {
    const [{ id, createdAt }] = await UserTable().insert(
      {
        firstName,
        lastName,
        username,
        about,
        email,
        salt,
        password: hash,
      },
      ["id", "createdAt"]
    );

    return res.send({
      id,
      username,
      role: getRole(false, false),
      email,
      createdAt,
    });
  } catch (err) {
    debug("Error inserting User into database", err);

    return res.status(400).end("Could not create database entry.");
  }
});

export default router;
