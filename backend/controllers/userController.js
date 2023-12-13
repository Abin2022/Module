import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";
import Courses from "../models/courseModel.js";
import { isBlocked } from "../middleware/authMiddleware.js";
import userHelper from "../helpers/userHelpers.js";
import Plan from "../models/plans.js";
import instance from "../utils/instance.js";
import crypto from "crypto";
import { log } from "console";
import Payment from "../models/Payments.js";
import Tutor from "../models/tutorModel.js";

const KEY_SECRET = "yXjHwM7lO6wpSg5aVdD6tsbF";

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
        isBlocked: user.isBlocked,
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
      isBlocked: user.isBlocked,
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
    // image : req.file.filename || user.userImage
  };

  res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.body._id;
  const user = await User.findById(userId);
  console.log(userId, "ssss");
  if (user) {
    (user.email = req.body.email || user.email),
      (user.name = req.body.name || user.name);

    if (req.file) {
      user.userImage = req.file.filename || user.userImage;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }
    console.log(req.file, "filre");

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



const subscriptionHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
   
    if (user && user.subscription_status === "active") {
      // Assuming your Payment model has a field user_id that links to the User model
      const subscriptions = await User.find({
        _id: userId,
        subscription_status: "active",
      });
      // console.log("user.subscription_status ", user.subscription_status);

      // console.log(userId, "user ID in controller");
      // console.log(subscriptions, "subscriptions");

      res.status(200).json(subscriptions);
    } else {
      res
        .status(404)
        .json({ message: "User not found or subscription not active" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// const removePlanStatus = asyncHandler(async(req,res) =>{
//   try{
   
//     const userId = req.user;
//     console.log(userId,"ODDDDDDDDDDDD");
//     const user = await User.find({ _id: userId,subscription_status: "active"  })
//     console.log(user,"plansxxxxxxxxxxx");

//     if (user) {  
//       user.subscription_status = false; 
//       // await user.save();
//       res.status(200).json({ message: "Plans updated successfully" });
//     }else{
//       throw new Error("Plan is not removed")
//     }
//   }catch(error){
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// })
const removePlanStatus = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findOne({ _id: userId, subscription_status: "active" });

    console.log(user, "userxxxxxxxxxxx");

    if (user) {
      user.subscription_status = false; 
      await user.save();

      res.status(200).json({ message: "Subscription status updated successfully" });
    } else {
      throw new Error("No user with active subscription found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});






const getSingleCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  let purchased = false;

  const course = await Courses.findById(courseId)
    .populate("tutorId", "name")
    .populate("domain", "domainName");
  if (course) {
    res.status(200).json({ course, purchased });
  } else {
    res.status(400).json({ message: "course not found" });
  }
});

const getApprovedCourses = asyncHandler(async (req, res) => {
  console.log(
    "here in usercontri 165==========================================="
  );
  const course = await Courses.find({ approved: true })
    .populate("tutorId", "name")
    .populate("domain", "domainName");
  console.log(course, "in controller.................");
  if (course) {
    res.status(200).json(course);
  } else {
    res.status(200).json({ message: "There is no approved course" });
  }
});

const getTutorList = asyncHandler(async (req, res) => {
  console.log("Entered into gettutor lsist     224...");
  const user = {
    userId: req.user,
    name: req.user.name,
    email: req.user.email,
    // profileImage: req.user.profileImage,
  };
  console.log(_id, name, email, "tutor page ..........");
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
      res
        .status(500)
        .json({ statusCode: 500, error: "Failed to create order" });
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
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const status = user.subscription_status === "active";
    res.status(200).json({ status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const addCourseRating = asyncHandler(async (req, res) => {
  console.log("Entered into addcourserating .......... ");
  //  const { courseId } = req.params;
  // console.log(courseId);

  const { clickedRating, courseId } = req.body;
  console.log("req.body", req.body);
  console.log(clickedRating, courseId, "clickedRating");

  const userId = req.body.userId;
  console.log(userId, "userId in backend");

  const newRating = {
    userId,
    rate: clickedRating,
  };
  console.log(newRating, "newRating");

  try {
    const course = await Courses.findById(courseId)
      .populate({
        path: "tutorId",
        select: "-password",
      })
      .populate("domain", "domainName")
      .populate("rating.userId", "name")
      .populate("reviews.userId", "name");

    console.log("Found course:", course);

    if (course) {
      const purchased = true;
      course.rating.push(newRating);
      await course.save();
      res.status(200).json({ course, purchased });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error adding course rating:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// const addCourseReview = asyncHandler(async (req, res) => {
//   const { feedback } = req.body;
//   console.log(req.body, "req.body[[[[[[[[[[[[[[[[[[[[[[[[[[[");
//   const { courseId } = req.user;
//   console.log(courseId, "Courseid in controller 445........");
//   console.log(feedback, "feedback");
//   // const userId = req.user._id;
//   const userId = req.user;
//   console.log(userId, "userId");
//   const newReview = {
//     userId,
//     review: feedback,
//   };

//   try {
//     const course = await Courses.findById(courseId)
//       .populate({
//         path: "tutorId",
//         select: "-password",
//       })
//       .populate("domain", "domainName")
//       .populate("rating.userId", "name")
//       .populate("reviews.userId", "name");
//     if (course) {
//       // const purchased = true;
//       course.reviews.push(newReview);
//       await course.save();
//       res.status(200).json({ course, purchased });
//     } else {
//       res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


const addCourseReview = asyncHandler(async (req, res) => {
  const { feedback } = req.body;
  console.log(req.body, "req.body[[[[[[[[[[[[[[[[[[[[[[[[[[[");
  
  // Try getting courseId from req.user
  const { courseId: userIdCourseId } = req.user;
  console.log(userIdCourseId, "CourseId from req.user");

  // If courseId is not present in req.user, try getting it from req.params
  const { courseId: paramsCourseId } = req.params;
  console.log(paramsCourseId, "CourseId from req.params");

  const courseId = userIdCourseId || paramsCourseId;

  console.log(feedback, "feedback");
  const userId = req.user;
  console.log(userId, "userId");
  const newReview = {
    userId,
    review: feedback,
  };

  try {
    const course = await Courses.findById(courseId)
      .populate({
        path: "tutorId",
        select: "-password",
      })
      .populate("domain", "domainName")
      .populate("rating.userId", "name")
      .populate("reviews.userId", "name");
      
    if (course) {
      course.reviews.push(newReview);
      await course.save();
      res.status(200).json({ course, purchased });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
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
  // getAllVideo,
  getApprovedCourses,
  getUserPlans,
  createOrder,
  paymentVerification,
  checkPlanStatus,
  addCourseReview,
  addCourseRating,
  subscriptionHistory,
  removePlanStatus,
};
