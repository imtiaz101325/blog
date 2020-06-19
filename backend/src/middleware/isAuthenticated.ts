import * as express from "express";
import * as jwt from "jsonwebtoken";

import { secret } from "../helpers/auth";
import { debug } from "../app";

export default function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).send({
          error: "Could not verify access token.",
        });
      }

      if (user) {
        if (new Date() > new Date((<IUser>user).expiresAt)) {
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
