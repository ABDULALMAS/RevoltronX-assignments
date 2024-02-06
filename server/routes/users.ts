import express, {Router} from "express";
const router: Router = express.Router();

import { signin, signup } from "../controllers/user.ts";

router.post("/signin", signin);
router.post("/signup", signup);

export default router;