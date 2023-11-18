import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";
import Courses from "../models/courseModel.js";
import { isBlocked } from "../middleware/authMiddleware.js";


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    // Check if the user is blocked
    if (user.isBlocked) {
      res.status(401); // Unauthorized status code for blocked users
      throw new Error("This account is blocked. Please contact support.");
    }

    // Check if the provided password matches the user's password
    if (await user.matchPassword(password)) {
      genToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked
      });
    } else {
      res.status(401); // Unauthorized status code for invalid passwords
      throw new Error("Invalid password");
    }
  } else {
    res.status(401); // Unauthorized status code for invalid emails
    throw new Error("Invalid email");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("user email already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
   
  });
  if (user) {
    genToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked
      // image:updatedUser.imagePath
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " user logout" });
});



const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  
  res.status(200).json(user);
});


// const getUserProfile = asyncHandler(async (req, res) => {
//   try {
    
//     if (req.user.isBlocked) {
//       res.status(401); // Unauthorized status code for blocked users
//       throw new Error("This account is blocked. Please contact support.");
//     }

//     const user = {
//       _id: req.user._id,
//       name: req.user.name,
//       email: req.user.email,
//       // profileImage: req.user.profileImage,
     
//     };

//     res.status(200).json(user);
//   } catch (error) {
//     // Handle any errors that may occur during the blocking check
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


const updateUserProfile = asyncHandler(async (req, res) => {
 const userId = req.body._id
  const user = await User.findById(userId);
  console.log(userId,"ssss");
  if (user) {
    (user.email = req.body.email || user.email),
      (user.name = req.body.name || user.name);

     if(req.file){
            user.userImage = req.file.filename || user.userImage;
        }

        if (req.body.password) {
          user.password = req.body.password;
        }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.userImage,
    });
  } else {
    res.status(404);
    throw new Error("user not find");
  }
  
});


// const updateUserProfile = asyncHandler(async (req, res) => {
//   const userId = req.body._id
//   const user = await User.findById(userId);
  
//   const email = req.body.email;

//   if (email !== user.email) {
//     const userExists = await User.findOne({ email: email });

//     if (userExists) {
//       res.status(400);
//       throw new Error("email already exists");
//     }
//   }

//   if (user) {
//     (user.email = req.body.email || user.email),
//       (user.name = req.body.name || user.name);
//     if (req.file) {
//       if (user.userImageName) {
//         const params = {
//           Bucket: process.env.BUCKET_NAME,
//           Key: user.userImageName,
//         };
//         const command = new DeleteObjectCommand(params);
//         const buk = await s3.send(command);
//       }
//       const userImg = randomImgName();
//       const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: userImg,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//       };
//       const command = new PutObjectCommand(params);

//       await s3.send(command);

//       //////////////////get the image url///////
//       const getObjectParams = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: userImg,
//       };
//       const getCommand = new GetObjectCommand(getObjectParams);
//       const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
//       user.userImageName = userImg;
//       user.userImageUrl = url;
//     }

//     const updatedUser = await user.save();
//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       image: updatedUser.userImageUrl,
//     });
//   } else {
//     res.status(404);
//     throw new Error("user not find");
//   }
// });

const getSingleCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  // const userId = req.user._id;
  let purchased = false;
  // const order = await Orders.findOne({
  //   userId: userId,
  //   "purchasedCourses.courseId": courseId,
  // });

  // if (order) {
  //   purchased = true;
  // }
  const course = await Courses.findById(courseId)
    .populate("tutorId", "name")
    .populate("domain", "domainName");
  if (course) {
    res.status(200).json({ course, purchased });
  } else {
    res.status(400).json({ message: "course not found" });
  }
});




const getAllVideo = asyncHandler (async (req,res)=>{


  // if (user.isBlocked) {
  //   res.status(401); // Unauthorized status code for blocked users
  //   throw new Error("This account is blocked. Please contact support.");
  // }

  const viedo = {
    _id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    viedo:req.user.viedo
  }
  res.status(200).json(viedo)
})




const getApprovedCourses = asyncHandler(async (req, res) => {
  const course = await Courses.find({ approved: true })
    .populate("tutorId", "name")
    .populate("domain", "domainName");
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(200).json({ message: "There is no approved course" });
  }
});

const getTutorList = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    // profileImage: req.user.profileImage,
  };
  res.status(200).json(user);
});


export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getTutorList,
  getSingleCourse,
  getAllVideo,
  getApprovedCourses
};
