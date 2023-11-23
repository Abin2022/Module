import express from "express";
const router = express.Router();
import { multerImage } from "../config/multerConfig.js";

import { protect } from "../middleware/protect.js";
// import authenticateUser from '../middlewares/userAuthMiddleware.js';
import { isBlocked } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getTutorList,
  getSingleCourse,
  getAllVideo,
  getApprovedCourses,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
// router
//   .route("/profile")
//   .get( isBlocked , getUserProfile)
//   .put( multerImage.single("userImage"), updateUserProfile);

  router
  .route("/profile")
  .get(protect, getUserProfile)
   .put( multerImage.single("image"), updateUserProfile);


router.get("/instructor", getTutorList);
router.get("/viedos",isBlocked, getAllVideo);



router.get("/get-approvedCourses", getApprovedCourses);
router.get("/single-course/:courseId", protect("user"), getSingleCourse);


export default router;
