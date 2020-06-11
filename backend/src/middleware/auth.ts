import * as express from "express";
import * as jwt from "jsonwebtoken";

import { secret } from "../helpers/auth";

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

      if (user && new Date() > new Date((<IUser>user).expiresAt)) {
        return res.status(401).send("Token Expired.");
      }

      req.user = <IUser>user;
      next();
    });
  } else {
    res.status(401).send({
      error: "Please supply authentication token to access protected route.",
    });
  }
}
