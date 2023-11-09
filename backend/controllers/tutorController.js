import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import generateToken from "../utils/genJwtToken.js";
import Domain from "../models/domainModel.js";
import Courses from "../models/courseModel.js";

import { fetchAllCoursesList, deleteCourse } from "../helpers/tutorHelpers.js";

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
    });
  } 
  //here
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



// const getTutorProfile = asyncHandler(async (req, res) => {
//   const tutor = await Tutor.findById(req.tutor._id);
//   console.log(tutor,'here at.. on tutorcontoller 115');
//   const tutorData = {
//     _id: req.tutor._id,
//     name: req.tutor.name,
//     email: req.tutor.email,
//     qualification: tutor.qualification,
//     experience: tutor.experience,
//     about: tutor.about,
//   };
//   res.status(200).json(tutorData);
// });
const getTutorProfile = asyncHandler(async (req, res) => {
  if (!req.tutor) {
    return res.status(404).json({ message: 'Tutor not found' });
  }

  const tutor = await Tutor.findById(req.tutor._id);
  console.log(tutor, 'here at.. on tutorcontroller 115');
  
  if (!tutor) {
    return res.status(404).json({ message: 'Tutor not found' });
  }

  const tutorData = {
    _id: req.tutor._id,
    name: req.tutor.name,
    email: req.tutor.email,
    qualification: tutor.qualification,
    experience: tutor.experience,
    about: tutor.about,
  };

  res.status(200).json(tutorData);
});

const updateTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.tutor._id);
  const email = req.body.email;
  if (email !== tutor.email) {
    const tutorExists = await Tutor.findOne({ email: email });

    if (tutorExists) {
      res.status(400);
      throw new Error("email already exists");
    }
  }

  if (tutor) {
    (tutor.email = req.body.email || tutor.email),
      (tutor.name = req.body.name || tutor.name),
      (tutor.qualification = req.body.qualification || tutor.qualification),
      (tutor.experience = req.body.experience || tutor.experience),
      (tutor.about = req.body.about || tutor.about);
    // if (req.file) {
    //   if (tutor.tutorImageName) {
    //     const params = {
    //       Bucket: process.env.BUCKET_NAME,
    //       Key: tutor.tutorImageName,
    //     };
    //     const command = new DeleteObjectCommand(params);
    //     await s3.send(command);
    //   }
    //   const tutorImg = randomImgName();
    //   const params = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: tutorImg,
    //     Body: req.file.buffer,
    //     ContentType: req.file.mimetype,
    //   };
    //   const command = new PutObjectCommand(params);

    //   await s3.send(command);
    //   const getObjectParams = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: tutorImg,
    //   };
    //   const getCommand = new GetObjectCommand(getObjectParams);
    //   const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
    //   tutor.tutorImageName = tutorImg;
    //   tutor.tutorImageUrl = url;
    // }

    const updatedtutor = await tutor.save();
    res.status(200).json({
      _id: updatedtutor._id,
      name: updatedtutor.name,
      email: updatedtutor.email,
      qualification: updatedtutor.qualification,
      about: updatedtutor.about,
      experience: updatedtutor.experience,
      image: updatedtutor.tutorImageUrl,
    });
  } else {
    res.status(404);
    throw new Error("tutor not find");
  }
});



 

const addCourse = asyncHandler(async (req, res) => {
  // const tutorId = req.tutor._id;
  // console.log(tutorId,"tutorid form tutorcontroller");
  const domainName = req.body.domainName;
   const domain = await Domain.findOne({ domainName });
 
  const { courseName, description, price, requiredSkills,videos } = req.body;
  // console.log(req.body);
  const createdCourse = await Courses.create({
   domain: domain._id,
    // tutorId: tutorId,
    courseName,
    description,
    requiredSkills,
    price,
    videos,


  });
  // console.log(createdCourse);
  res.status(201).json(createdCourse);
});

const addVideo = asyncHandler(async (req, res) => {});



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

const courseListingUpdate = asyncHandler(async(req,res) =>{

})


export { registerTutor, authTutor, logoutTutor ,getTutorProfile ,updateTutorProfile,
  addCourse,
  addVideo,
  courseListing,
  courseListingUpdate,
  deleteCourseData
};