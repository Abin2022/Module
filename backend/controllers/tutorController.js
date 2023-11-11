import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import generateToken from "../utils/genJwtToken.js";
import Domain from "../models/domainModel.js";
import Courses from "../models/courseModel.js";
import { s3 } from "../config/s3BucketConfig.js";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
 
import crypto from "crypto";

import { fetchAllCoursesList, deleteCourse } from "../helpers/tutorHelpers.js";
const randomImgName = (bytes =32) =>crypto.randomBytes(bytes).toString('hex')




const authTutor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tutor = await Tutor.findOne({ email });
  
  if (tutor  && (await tutor.matchPassword(password))) {   //here
    generateToken(res, tutor._id, "tutor");
    console.log(tutor._id, tutor.name, tutor.email);
    res.status(201).json({
      _id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      // qualification: tutor.qualification,
      // experience: tutor.experience,
      // image: tutor.tutorImageUrl,
    });
    console.log("tutor._id",tutor._id)
  } 
  //here
  // else if (tutor.isBlocked) {
  //   res.status(400);
  //   throw new Error("You have been blocked");
  // }
  else {
    console.log("invalid email or password");
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const registerTutor = asyncHandler(async (req, res) => {
  const { name, email, password, qualification, experience } = req.body;

  // console.log(name, email, password, qualification, experience, "req body");
  const tutorExists = await Tutor.findOne({ email: email });

  if (tutorExists) {
    res.status(400);
    throw new Error("tutor email already exists");
  }

  const tutor = await Tutor.create({
    name,
    email,
    qualification,
    experience,
    password,
  });

  if (tutor) {
    generateToken(res, tutor._id, "tutor");
    res.status(201).json({
      _id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      qualification: tutor.qualification,
      experience: tutor.experience,
    });
  } else {
    res.status(400);
    throw new Error("invalid tutor data");
  }
});

const logoutTutor = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " tutor logout" });
});

const getTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.tutor._id);
  // const tutor = await Tutor.findOne({ email });
  const tutorData = {
    _id: req.tutor._id,
    name: req.tutor.name,
    email: req.tutor.email,
    qualification: tutor.qualification,
    experience: tutor.experience,
    
  };
  console.log("tutor._id",tutor._id)

  res.status(200).json(tutorData);
});



const updateTutorProfile = asyncHandler(async (req, res) => {
  const tutorId = req.body._id;
  const tutor = await Tutor.findById(tutorId);

  if (!tutor) {
    res.status(404);
    throw new Error("Tutor not found");
  }

  const email = req.body.email;

  if (email !== tutor.email) {
    const tutorExists = await Tutor.findOne({ email: email });

    if (tutorExists) {
      res.status(400);
      throw new Error("Email already exists");
    }
  }

  tutor.email = req.body.email || tutor.email;
  tutor.name = req.body.name || tutor.name;
  tutor.qualification = req.body.qualification || tutor.qualification;
  tutor.experience = req.body.experience || tutor.experience;

  s3.destroy();

  if (req.file) {
    if (tutor.tutorImageName) {
      const params = {
        Bucket: "module-mernapp",
        Key: tutor.tutorImageName,
      };
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }

    const tutorImg = randomImgName();
    const params = {
      Bucket: "module-mernapp",
      Key: tutorImg,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
    const getObjectParams = {
      Bucket:'module-mernapp',
      Key: tutorImg,
    };
    const getCommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
    tutor.tutorImageName = tutorImg;
    tutor.tutorImageUrl = url;
  }

  const updatedTutor = await tutor.save();

  if (!updatedTutor) {
    res.status(500);
    throw new Error("Tutor update failed");
  }

  res.status(200).json({
    _id: updatedTutor._id,
    name: updatedTutor.name,
    email: updatedTutor.email,
    qualification: updatedTutor.qualification,
    about: updatedTutor.about,
    experience: updatedTutor.experience,
    image: updatedTutor.tutorImageUrl,
  });
});




 

// const addCourse = asyncHandler(async (req, res) => {
//   // const tutorId = req.tutor._id;
//   // console.log(tutorId,"tutorid form tutorcontroller");
//   const domainName = req.body.domainName;
//    const domain = await Domain.findOne({ domainName });
 
//   const { courseName, description, price, requiredSkills,videos } = req.body;
//   // console.log(req.body);
//   const createdCourse = await Courses.create({
//    domain: domain._id,
//     // tutorId: tutorId,
//     courseName,
//     description,
//     requiredSkills,
//     price,
//     videos,


//   });
//   // console.log(createdCourse);
//   res.status(201).json(createdCourse);
// });


//add course new 

const addCourse = asyncHandler(async (req, res) => {
  // const tutorId = req.body._id;
  // const tutor = await Tutor.findById(tutorId);

  const tutorId = req.body._id;
  const domainName = req.body.domain;

  const domain = await Domain.findOne({ domainName });

  const { courseName, description, price, requiredSkill, caption } = req.body;
  // s3.destroy();
  const thumbnail = randomImgName();
  const params = {
    Bucket: "module-mernapp",
    Key: thumbnail,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
 

  await s3.send(command);
  const getObjectParams = {
    Bucket: "module-mernapp",
    Key: thumbnail,
  };
  const getCommand = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
  const createdCourse = await Courses.create({
    domain: domain._id,
    tutorId: tutorId,
    courseName,
    description,
    requiredSkills: requiredSkill,
    caption,
    price,
    thumbnail: url,
  });
  res.status(201).json(createdCourse);
});






const deleteCourseData = asyncHandler( async (req, res) => {

  const tutorId = req.body.tutorId;
  const courseDeleteStatus = await deleteCourse(tutorId);
  if(courseDeleteStatus.success){

      const response = courseDeleteStatus.message;

      res.status(200).json({ message:response });

  }else{

      res.status(404);

      const response = courseDeleteStatus.message;

      throw new Error(response);

  }

});



const courseListing =asyncHandler(async (req,res ) => {
  fetchAllCoursesList()
  .then((course)=>{
    res.status(200).json({course})
  })
  .catch((error)=>{
    console.log(error)
    toast.error(err?.data?.message || err?.error)
  })
})




// const addVideo = asyncHandler(async (req, res) => {
//   const { videoName, courseId } = req.body;
//   const course = await Courses.findById(courseId);
//   // const randomVideo = randomImgName();
//   // const params = {
//   //   Bucket: "module-mernapp",
//   //   Key: randomVideo,
//   //   Body: req.file.buffer,
//   //   ContentType: req.file.mimetype,
//   // };
//   // const command = new PutObjectCommand(params);

//   // await s3.send(command);
//   // const getObjectParams = {
//   //   Bucket: "module-mernapp",
//   //   Key: randomVideo,
//   // };
//   // const getCommand = new GetObjectCommand(getObjectParams);
//   // const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });

//   const newVideo = {
//     videoName: videoName,
//     videoUrl: url,
//     videoUniqueId: randomVideo,
//   };
//   course.videos.push(newVideo);
//   await course.save();
//   res.status(201).json({ url, videoName, courseId });
// });


const addVideo = asyncHandler(async (req, res) => {
  const { videoName, courseId } = req.body;
  const course = await Courses.findById(courseId);
  const randomVideo = randomImgName();
  const params = {
     Bucket: "module-mernapp",
    Key: randomVideo,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3.send(command);
  const getObjectParams = {
     Bucket: "module-mernapp",
    Key: randomVideo,
  };
  const getCommand = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });

  const newVideo = {
    videoName: videoName,
    videoUrl: url,
    videoUniqueId: randomVideo,
  };
  course.videos.push(newVideo);
  await course.save();
  res.status(201).json({ url, videoName, courseId });
});



const getAllCourses = asyncHandler(async (req, res) => {
  const tutorId = req.tutor._id;
  try {
    const courses = await Courses.find({ tutorId: tutorId });

    if (courses) {
      res.status(200).json(courses);
    } else {
      res.status(404).json({ message: "No courses found for this tutor." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



const videoDelete = asyncHandler(async (req, res) => {
  const { videoId, courseId } = req.body;

  try {
    // Find the course by its ID
    const course = await Courses.findById(courseId);
    if (course) {
      if (course.videos.length === 1) {
        res.status(400).json({ message: "Course must have atleast one Video" });
      } else {
        const specificVideo = course.videos.find(
          (video) => video.videoUniqueId === videoId
        );

        if (specificVideo) {
          const params = {
            Bucket: "module-mernapp",
            Key: videoId,
          };

          // Delete the video from the S3 bucket
          const command = new DeleteObjectCommand(params);
          await s3.send(command);

          // Remove the video from the videos array
          course.videos = course.videos.filter(
            (video) => video.videoUniqueId !== videoId
          );

          // Save the updated course document
          await course.save();

          res.status(200).json({ message: "Video deleted successfully" });
        } else {
          res.status(404).json({ error: "Video not found in course" });
        }
      }
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting video from S3:", error);
    res.status(500).json({ error: "Video deletion failed" });
  }
});


const courseDelete = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  console.log(courseId,"courseId in tutor controleer 433");

  const course = await Courses.findById(courseId);

  if (course) {
    try {
      for (const video of course.videos) {
        const params = {
          Bucket: "module-mernapp",
          Key: video.videoUniqueId,
        };
        const command = new DeleteObjectCommand(params);
        const buk = await s3.send(command);
      }

      const result = await Courses.deleteOne({ _id: courseId });

      res
        .status(200)
        .json({ message: "Course and associated videos deleted successfully" });
    } catch (error) {
      console.error("Error deleting course and associated videos:", error);
      res.status(500).json({ error: "Course and video deletion failed" });
    }
  } else {
    res.status(404).json({ error: "Course not found" });
  }
});


export { registerTutor, authTutor, logoutTutor ,getTutorProfile ,updateTutorProfile,
  addCourse,


  addVideo,
  courseListing,
  // courseListingUpdate,
  // deleteCourseData,
   getAllCourses,

  videoDelete,
  courseDelete
 
  
};