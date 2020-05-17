import * as express from "express";

import AuthController from "../controllers/AuthController";

const router = express.Router();

router.post("/", AuthController.login);

export default router;
