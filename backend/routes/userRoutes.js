import express from "express";
const router = express.Router();
import { multerImage } from "../config/multerConfig.js";

 import { protectRoute } from "../middleware/authMiddleware.js";
import { isBlocked  } from "../middleware/authMiddleware.js";


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
  getUserPlans,
  createOrder,
  paymentVerification,
  checkPlanStatus

} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);


  router
  .route("/profile")
  .get(protectRoute, getUserProfile)
   .put( multerImage.single("image"), updateUserProfile);


 router.get("/instructor", getTutorList);
 router.get("/viedos",isBlocked, getAllVideo);

router.get("/getApprovedCourses", protectRoute,getApprovedCourses);
router.get("/single-course",protectRoute, getSingleCourse);




  //new

 router.get('/get-user-plans',isBlocked,getUserPlans)
 router.post('/create-order',createOrder)
 
 router.post('/verify-payment',protectRoute,paymentVerification)
 router.post('/check-plan-status',checkPlanStatus)



export default router;
