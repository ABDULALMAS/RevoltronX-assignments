import express from "express";

import { createArticle, getArticles, commentPost,  getArticle,deletePost, likePost, updatePost } from "../controllers/article.js";
import { getArticlesBySearch } from "../controllers/article.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getArticlesBySearch);

router.get("/",getArticles);
router.get("/:id", getArticle);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);


router.post("/", auth,createArticle);
router.post("/:id/commentPost", auth, commentPost);
router.patch("/:id/likePost", auth,likePost);


export default router;
