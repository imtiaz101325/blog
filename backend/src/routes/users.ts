import * as express from "express";

import UserController from "../controllers/UserController";
import isAuthenticated from "../middleware/auth";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getUsers);

router.post("/", UserController.createUser);

// TODO: add api docs
router.delete("/", UserController.deleteUser);

export default router;
