import express from "express";
import PostActions from "../controller/posts";

const router = express.Router();
const postActions = new PostActions();

router.put("/createPost", postActions.createPost);
router.get("/getPosts", postActions.getPosts);

export default router;