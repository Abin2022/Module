

import express from "express";

const router = express.Router();
// import { protect } from "../middleware/authTutorMiddleware";


import {
  authTutor,
  logoutTutor,
  registerTutor,
  getTutorProfile,
  updateTutorProfile,
  addCourse,
  addVideo
  
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);
router.get("/tutor/profile" ,getTutorProfile)
router.put("/tutor/profile",updateTutorProfile)

// router
// .route("/tutor/profile")
// .get(protect,getTutorProfile )
// .put(protect,mullterTutorImage.single("tutorImage"),updateTutorProfile)
 router.post("/tutor/add-course",addCourse)
 router.get("/tutor/add-viedos" ,addVideo)
export default router;