import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";



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
    // profileImage: req.user.profileImage,
  };
  res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
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

const getCourseList = asyncHandler(async (req,res)=>{
  const course = {
    _id :req.user.id,
    name:req.user.name,
    email:req.user.email,
    course:req.user.course
  }
  res.status(200).json(course)
})

const getAllViedo = asyncHandler (async (req,res)=>{
  const viedo = {
    _id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    viedo:req.user.viedo
  }
  res.status(200).json(viedo)
})




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
  getCourseList,
  getAllViedo
};
