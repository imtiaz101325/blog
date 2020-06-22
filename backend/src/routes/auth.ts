import * as express from "express";

import AuthController from "../controllers/AuthController";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.post("/", AuthController.login);

router.delete("/", isAuthenticated, AuthController.logout);

export default router;
