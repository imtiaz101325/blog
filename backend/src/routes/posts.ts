import * as express from "express";

import PostController from "../controllers/PostController";
import isAuthenticated from "../middleware/isAuthenticated";
import isAuthor from "../middleware/isAuthor";

const router = express.Router();

//TODO: Add API spec
router.get("/", PostController.getPosts);

router.post("/", isAuthenticated, isAuthor, PostController.cratePosts);

export default router;
