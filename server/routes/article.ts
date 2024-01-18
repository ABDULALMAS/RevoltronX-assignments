import express, {Router} from "express";

<<<<<<< HEAD
import { createArticle, getArticles, commentPost,  getArticle,deletePost, likePost, updatePost } from "../controllers/article.ts";
=======
import { createArticle, getArticles, 
    commentPost,  getArticle,deletePost,
     likePost, updatePost, 
     getArticlesTableData,
     updateArticleStatus,

} from "../controllers/article.ts";
>>>>>>> role-based-access-control
import { getArticlesBySearch } from "../controllers/article.ts";

import auth from "../middleware/auth.ts";

const router: Router = express.Router();

router.get("/search", getArticlesBySearch);

router.get("/",getArticles);
<<<<<<< HEAD
router.get("/:id", getArticle);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
=======
router.get("/articlesTableData", getArticlesTableData)
router.get("/:id", getArticle);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/updateArticleStatus/:id", updateArticleStatus)
>>>>>>> role-based-access-control


router.post("/", auth,createArticle);
router.post("/:id/commentPost", auth, commentPost);
router.patch("/:id/likePost", auth,likePost);


export default router;

