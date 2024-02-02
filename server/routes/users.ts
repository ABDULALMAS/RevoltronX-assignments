import express, {Router} from "express";
const router: Router = express.Router();

<<<<<<< HEAD
import { signin, signup } from "../controllers/user.ts";

router.post("/signin", signin);
router.post("/signup", signup);
=======
import { signin, signup , getUsers, updateRole} from "../controllers/user.ts";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUsers", getUsers);
router.patch("/:id", updateRole)
>>>>>>> role-based-access-control

export default router;