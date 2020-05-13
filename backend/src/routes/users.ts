import express from "express";

const { User } = require("../models");

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, username, about, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .end("Request must contain username, email and password");
  }

  const users = await User.findAll({
    attributes: ["email", "username"],
    where: {
      email,
      username,
    },
  });

  if (users.length) {
    return res.status(400).end("The username or email already exists");
  }

  try {
    const { id, username: resUsername, role, email: resEmail, createdAt } = await User.create({
      firstName,
      lastName,
      username,
      about,
      email,
      password,
    });

    return res.send({
      id,
      username: resUsername,
      role,
      email: resEmail,
      createdAt,
    });
  } catch (err) {
    console.error(err);

    return res.status(400).end("Could not create database entry.");
  }
});

export default router;
