import * as express from "express";

import { debug } from "../app";

export default function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.user) {
    const { role } = req.user;

    if (
      role === "admin"
    ) {
      next();
    } else {
      debug("Only admin can access this route.");

      res.status(401).send({
        error: "User not an admin.",
      });
    }
  } else {
    debug("User does not appear to be authenticated.");

    return res.status(401).send({
      error: "User not authenticated.",
    });
  }
}
