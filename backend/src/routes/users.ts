import express from "express";

import User, { getRole } from "../db/user";
import { generateHash } from "../helpers/auth";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, username, about, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .end("Request must contain username, email and password");
  }

  const users = await User.select("username", "email").where({
    username,
    email,
  });

  if (users.length) {
    return res.status(400).end("The username or email already exists");
  }

  const { salt, hash } = generateHash(password);
  try {
    const [{ id, createdAt }] = await User.insert(
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
    console.error(err);

    return res.status(400).end("Could not create database entry.");
  }
});

export default router;
