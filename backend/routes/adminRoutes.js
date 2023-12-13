import express from "express";
const router = express.Router();
//   import {protect } from '../middleware/authAdminMiddleware.js'

import {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAllUsers,
  updateUserData,
  deleteUserData,
  blockUser,
  unblockUser,
  getAllTutors,
  deleteTutorData,
  blockTutor,
  unblockTutor,
  getDomains,
  addDomain,
  deleteDomain,
  // deleteCourseData,
  // courseListing,
  allCourses,
  approveCourse,
  rejectCourse,
  addPlans,
  getPlans,
  getSubscriptions,
} from "../controllers/adminController.js";


router.post("/authAdmin", authAdmin);
router.post("/admin", registerAdmin);
router.post("/adminLogout", logoutAdmin);
router.get("/usersList", getAllUsers);
router.get("/tutorList", getAllTutors);
router.post("/delete-user", deleteUserData);
router.put("/update-user", updateUserData);
router.post("/block-user", blockUser);
router.post("/unblock-user", unblockUser);

router.post("/delete-tutor", deleteTutorData);
router.post("/block-tutor", blockTutor);
router.post("/unblock-tutor", unblockTutor);

router.get("/domain", getDomains);
router.post("/add-domain", addDomain);
router.delete("/domains/:domainName", deleteDomain);

router.get("/get-courses", allCourses);
router.post("/approve-course", approveCourse);
router.post("/reject-course", rejectCourse);

router.post("/add-plans", addPlans);
router.get("/get-plans", getPlans);
// router.get("/get-subscription", getSubscriptions);
router.get('/getsubscriptionlist',getSubscriptions)


export default router;
