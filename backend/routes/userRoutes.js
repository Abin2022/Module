import express from "express";
const router = express.Router();
import { multerImage } from "../config/multerConfig.js";

import { protectRoute } from "../middleware/authMiddleware.js";
import { isBlocked } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  subscriptionHistory,
  removePlanStatus,
  getTutorList,
  getSingleCourse,
  // getAllVideo,
  getApprovedCourses,
  getUserPlans,
  createOrder,
  paymentVerification,
  checkPlanStatus,
  addCourseRating,
  addCourseReview,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", protectRoute, logOutUser);

router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(multerImage.single("image"), updateUserProfile);

router.get("/get-subscriptions", protectRoute, subscriptionHistory);
router.post ("/remove-plan",protectRoute,removePlanStatus)

router.get("/instructor", protectRoute, getTutorList);

// router.get("/getApprovedCourses/:courseId", protectRoute,getApprovedCourses);
router.get("/getApprovedCourses", protectRoute, getApprovedCourses);

router.get("/single-course", protectRoute, getSingleCourse);

router.get("/get-user-plans", isBlocked, getUserPlans);
router.post("/create-order", createOrder);

router.post("/verify-payment", protectRoute, paymentVerification);
router.post("/check-plan-status", checkPlanStatus);

router.post("/course-rating", addCourseRating);
router.post("/course-review", protectRoute, addCourseReview);

export default router;
