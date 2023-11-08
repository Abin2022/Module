

import express from "express";

const router = express.Router();
// import { protect } from "../middleware/authTutorMiddleware";
import { multerImage, multerPDF } from "../config/MulterConfiguration.js";


import {
  authTutor,
  logoutTutor,
  registerTutor,
  getTutorProfile,
  updateTutorProfile,
  addCourse,
   addVideo,
 
  
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);
// router.get("/profile" ,getTutorProfile)
// router.put("/profile",updateTutorProfile)

router
.route("/profile")
.get(getTutorProfile )
.put(multerImage.single("tutorImage"),updateTutorProfile)

 router.post("/add-course",addCourse)
  router.post("/add-viedos" ,addVideo)
export default router;