const express = require("express");

const router = express.Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
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
    const user = await User.create({
      firstName,
      lastName,
      username,
      about,
      email,
      password,
    });

    return res.send(user);
  } catch (err) {
    console.error(err);

    return res.status(400).end("Could not create database entry.");
  }
});

module.exports = router;
