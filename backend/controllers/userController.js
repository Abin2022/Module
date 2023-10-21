import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
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
};
