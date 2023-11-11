

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
  

   getAllCourses,
   videoDelete,
   courseDelete

 

  
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);



 router.get("/profile",getTutorProfile)
 router.put("/profile", multerImage.single("image"),updateTutorProfile)

//  router.post("/add-course",addCourse);
 router.post(
  "/add-course",
  multerImage.single("image"),
  addCourse
);

router.post(
  "/add-video",
  multerImage.single("video"),
  addVideo
);
  
router.get("/get-courses", getAllCourses);

router.delete("/delete-video",  videoDelete);
router.delete("/delete-course",  courseDelete);
  
  // router.post('/delete-course',  deleteCourseData);
  // router.get('/courselisting',courseListing)
  
  
 
  // router.delete("/delete-video",  videoDelete);


    
export default router;