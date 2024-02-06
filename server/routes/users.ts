import express, {Router} from "express";
const router: Router = express.Router();


import { signin, signup , getUsers, updateRole} from "../controllers/user.ts";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUsers", getUsers);
router.patch("/:id", updateRole)


export default router;