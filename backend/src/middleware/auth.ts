import * as express from "express";
import * as jwt from "jsonwebtoken";

import { secret } from "../helpers/auth";

interface IRequestUser extends express.Request {
  user: object | undefined;
}

export default function isAuthenticated(
  req: IRequestUser,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).end("Could not verify access token");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).end("Please supply authentication token to access protected route.");
  }
}
