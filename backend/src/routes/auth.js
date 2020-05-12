const express = require("express");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { getHash } = require("../helpers/auth");

const router = express.Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  let where = { username };
  if (validator.isEmail(username)) {
    where = { email: username };
  }

  try {
    const user = await User.findOne({
      attributes: ["id", "username", "email", "password", "salt", "role"],
      where,
    });

    const hash = getHash(password, user.salt);
    if (user.password === hash) {
      //TODO: move jwt secret to environment variable
      const { id, username, email, role } = user;
      user.expiresAt = new Date(Date.now() + 12096e5);
      user.token = jwt.sign(
        { id, username, email, role, expiresAt: user.expiresAt },
        "super-top-secret"
      );

      await user.save();

      return res.json({
        token: user.token,
      });
    } else {
      return res.status(401).end("Incorrect username or password");
    }
  } catch (err) {
    console.error(err);

    return res.status(400).end("Server error");
  }
});

module.exports = router;
