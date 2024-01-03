import express , {Router}from "express";

import {
  getProfile,
  createProfile,
  updateProfile,
  
} from "../controllers/profile.ts";

// import auth from "../middleware/auth.js";

const router: Router = express.Router();

router.get("/", getProfile);

router.post("/",  createProfile);
router.patch("/:id", updateProfile);


export default router;