import * as express from "express";

import UserController from "../controllers/UserController";
import isAuthenticated from "../middleware/auth";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getUsers);

router.get("/:id/", isAuthenticated, UserController.getUser);

router.post("/", UserController.createUser);

router.delete("/:id/", isAuthenticated, UserController.deleteUser);

router.patch("/:id/", isAuthenticated, UserController.updateUser);

export default router;
