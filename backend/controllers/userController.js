import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";
import Courses from "../models/courseModel.js";
import { isBlocked } from "../middleware/authMiddleware.js";
import userHelper from "../helpers/userHelpers.js";
import Plan from "../models/plans.js";
import instance from "../utils/instance.js";
import crypto from "crypto";

const KEY_SECRET= "yXjHwM7lO6wpSg5aVdD6tsbF"

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
   
    if (user.isBlocked) {
      res.status(401); 
      throw new Error("This account is blocked. Please contact support.");
    }

    
    if (await user.matchPassword(password)) {
      genToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked
      });
    } else {
      res.status(401); 
      throw new Error("Invalid password");
    }
  } else {
    res.status(401); 
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

  const viedo = {
    _id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    viedo:req.user.viedo
  }
  res.status(200).json(viedo)
})




const getApprovedCourses = asyncHandler(async (req, res) => {
  console.log('here in usercontri 165');
  const course = await Courses.find({ approved: true })
    .populate("tutorId", "name")
    .populate("domain", "domainName");
    console.log(course,"in controller.................");
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


const getUserPlans = asyncHandler(async (req, res) => {
  try {
    const plans = await Plan.find({ status: "active" }).sort({ _id: -1 });

    if (plans) {
      res.status(200).json(plans);
    } else {
      throw new Error("Active plans not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const createOrder = asyncHandler(async (req, res) => {
  try {
    const price = req.body.price;

    const options = {
      amount: Number(price * 100),
      currency: "INR",
      receipt: "order_rcptid_11" + Date.now(),
    };

    const order = await instance.orders.create(options);
    // console.log(order,"in createorder 220..");


    if (order) {
      res.status(200).json({ statusCode: 200, order });
    } else {
      res.status(500).json({ statusCode: 500, error: "Failed to create order" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
  }
});




const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      userId,
      duration,
    } = req.body;
    
    // console.log(razorpay_payment_id,"id", razorpay_signature,"sign", razorpay_order_id);
   
    const generated_signature = crypto 
      .createHmac("sha256", KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
      
    // console.log(generated_signature,"generated_signature");
    // console.log(razorpay_signature,"razorpay_signature");

    if (generated_signature === razorpay_signature) {
      userHelper.addPayment(req.body);
      await userHelper.addSubscription(userId, plan, duration);

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const checkPlanStatus = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
  //  console.log(userId,"userid");

    if (user) {
      const status = user.subscription_status === "active";
      // console.log(status,"status");
      res.status(200).json({ statusCode: 200, data: { status } });
    } else {
      res.status(200).json({ statusCode: 200, data: { status: false } });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, data: { status: false } });
  }
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
  getApprovedCourses,
  getUserPlans,
  createOrder,
  paymentVerification,
  checkPlanStatus
};
