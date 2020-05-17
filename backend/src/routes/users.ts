import * as express from "express";

import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/", UserController.getUsers);

router.post("/", UserController.createUser);

export default router;
