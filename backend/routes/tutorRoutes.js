

import express from "express";

const router = express.Router();
//  import { protect } from "../middleware/authTutorMiddleware";
import { multerImage,  } from "../config/MulterConfiguration.js";
 

import {
  authTutor,
  logoutTutor,
  registerTutor,
  getTutorProfile,
  updateTutorProfile,
  addCourse,
   addVideo,
   videoDelete,
   courseListing,
   courseListingUpdate,
   deleteCourseData,
  
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);

// router
// .route("/profile")
// .get(protect(""),getTutorProfile )

// .put(protect(""),multerImage.single("tutorImage"),updateTutorProfile)


 router.get("/profile",getTutorProfile)
 router.put("/profile", multerImage.single("tutorImage"),updateTutorProfile)

 router.post("/add-course",addCourse)
  // router.post("/add-viedos" ,addVideo)
  
  router.post('/delete-course',  deleteCourseData);
  router.get('/courselisting',courseListing)
  router.post('/courseUpdate',courseListingUpdate)
  
  router.post(
    "/add-video",
    
    multerImage.single("video"),
    addVideo
  );
  router.delete("/delete-video",  videoDelete);


    
export default router;