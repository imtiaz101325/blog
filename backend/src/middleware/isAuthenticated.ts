import * as express from "express";
import * as jwt from "jsonwebtoken";

import { secret } from "../helpers/auth";
import { debug } from "../app";
import User from "../models/user";

export default function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, async (err, user) => {
      if (err) {
        return res.status(403).send({
          error: "Could not verify access token.",
        });
      }

      if (user) {
        const { token: dbToken } = await User.query()
          .select("token")
          .where({ id: (<IUser>user).id })
          .first();

        if (!dbToken) {
          debug("Token not found in database.");

          return res.status(401).send("Token Expired.");
        }

        if (dbToken && dbToken !== token) {
          debug("Access token with same user ID does not match with database token.");

          return res.status(500).send({
            error: "Faulty token.",
          });
        }
        
        if (new Date() > new Date((<IUser>user).expiresAt)) {
          debug("Token past two weeks expiration period.");

          return res.status(401).send("Token Expired.");
        }

        req.user = <IUser>user;
        next();
      } else {
        debug("No user data found in access token.");

        //TODO: add API spec.
        return res.status(500).send({
          error: "Faulty token.",
        });
      }
    });
  } else {
    res.status(401).send({
      error: "Please supply authentication token to access protected route.",
    });
  }
}
