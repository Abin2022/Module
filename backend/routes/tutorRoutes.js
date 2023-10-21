

import express from "express";

const router = express.Router();
// import { protect } from "../middleware/authTutorMiddleware";


import {
  authTutor,
  logoutTutor,
  registerTutor,
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);

export default router;