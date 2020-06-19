import * as express from "express";

import PostController from "../controllers/PostController";

const router = express.Router();

router.get("/", PostController.getPosts);

export default router;
