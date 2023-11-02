import express from "express";
const router = express.Router();
import { mullterUserImage } from "../config/multerConfig.js";

import { protect } from "../middleware/authMiddleware.js";
// import authenticateUser from '../middlewares/userAuthMiddleware.js';

import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getTutorList,       
  getCourseList,
  getAllViedo,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, mullterUserImage.single("userImage"), updateUserProfile);

 




router.get("/tutor", getTutorList);
// router.route('/profile').get( protect, getUserProfile ).put( protect, multerUploadUserProfile.single('profileImage'), updateUserProfile );
router.get("/courseList", getCourseList);
router.get("/viedos", getAllViedo);

export default router;
