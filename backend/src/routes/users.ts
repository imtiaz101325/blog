import * as express from "express";

import UserController from "../controllers/UserController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAdmin from "../middleware/isAdmin";
import isAdminOrSelf from "../middleware/isAdminOrSelf";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, UserController.getUsers);

router.get("/:id/", isAuthenticated, isAdminOrSelf, UserController.getUser);

router.post("/", UserController.createUser);

router.delete("/:id/", isAuthenticated, isAdminOrSelf, UserController.deleteUser);

router.patch("/:id/", isAuthenticated, isAdminOrSelf, UserController.updateUser);

export default router;
