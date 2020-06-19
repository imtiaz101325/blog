import * as express from "express";

import PostController from "../controllers/PostController";

const router = express.Router();

//TODO: Add API spec
router.get("/", PostController.getPosts);

export default router;
