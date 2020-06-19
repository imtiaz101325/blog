import * as express from "express";

import { debug } from "../app";

export default function isAdminOrSelf(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.user) {
    const { role } = req.user;

    if (
      role === "admin" ||
      (role !== "admin" && req.user.id === parseInt(req.params.id, 10))
    ) {
      next();
    } else {
      debug("Only admin or user himself can access this route.");

      res.status(401).send({
        error: "User not authorized.",
      });
    }
  } else {
    debug("User does not appear to be authenticated.");

    return res.status(401).send({
      error: "User not authenticated.",
    });
  }
}
