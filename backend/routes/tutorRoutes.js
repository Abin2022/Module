import express from "express";

const router = express.Router();
 import { protect } from "../middleware/protect.js";
import { multerImage } from "../config/MulterConfiguration.js";

import {
  authTutor,
  logoutTutor,
  registerTutor,
  getTutorProfile,
  updateTutorProfile,
  addCourse,
  addVideo,
  getAllCourses,
  videoDelete,
  courseDelete,
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);

router.get("/profile", getTutorProfile);
router.put("/profile", multerImage.single("image"), updateTutorProfile);


 router.post("/add-course", multerImage.single("image"), 
//  multerImage.single("previewVideo"),
 addCourse);


// router.post(
//   "/add-course",
//   protect("tutor"),
//   multerImage.fields([
    
//     { name: "image" ,maxCount:1},
//     { name: "previewVideo" ,maxCount:1},
//   ]),
//   addCourse
// );

router.post("/add-video", multerImage.single("video"), addVideo);

router.get("/get-courses", getAllCourses);

router.delete("/delete-video", videoDelete);
router.delete("/delete-course", courseDelete);

export default router;
