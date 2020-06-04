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

    interface IUser {
      id: number,
      username: string,
      email: string,
      expiresAt: string,
      iat: string,
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).end("Could not verify access token.");
      }

      if (user && new Date() < new Date((<IUser>user).expiresAt)) {
        res
          .status(401)
          .end("Token Expired.");
      }

      req.user = user;
      next();
    });
  } else {
    res
      .status(401)
      .end("Please supply authentication token to access protected route.");
  }
}
