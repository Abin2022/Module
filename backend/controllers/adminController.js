

import asyncHandler from 'express-async-handler'
 import generateToken from '../utils/generateTokenAdmin.js'
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import Tutor from '../models/tutorModel.js'
import { fetchAllUsers , updateUser, deleteUser, fetchAllTutors ,
  deleteTutor,
} from "../helpers/adminHelpers.js";

import Domain from '../models/domainModel.js'
import Courses from "../models/courseModel.js";
import Plan from "../models/plans.js";
 import { toast } from 'react-toastify';
import Payment from '../models/Payments.js'


//new admin auth
const authAdmin =asyncHandler (async (req,res)=>{
    const {email,password} =req.body;
    
    const admin = await Admin.findOne({ email:email} )
  
    if(admin && (await admin.matchPassword(password))){
      generateToken(res,admin._id)
      res.status(201).json({
          _id:admin._id,
          name:admin.name,
          email:admin.email
      })
    }else{
      res.status(401);
      throw new Error('Invalid email or password')
    }
})







//register admin
const registerAdmin =asyncHandler (async (req,res)=>{
    const { name,email, password } = req.body; 
  const adminExist = await Admin.findOne({ email })
  
  if(adminExist){
    res.status(400)
    throw new Error('Admin already exists')
  }
  const admin = await Admin.create({
    email,
    password,
    name,
  })

  if(admin){
    generateToken(res,admin._id)
    res.status(201).json({
        _id:admin._id,
        name:admin.name,
        email:admin.email
    })
  }else{
    res.status(400);
    throw new Error('Invalid admin data')
  }

    res.status(200).json({ message: 'Register Admin'})
})

const logoutAdmin =asyncHandler (async (req,res)=>{
  res.cookie('jwt','',{
httpOnly:true,
 expires:new Date(0)
  })
    res.status(200).json({ message: ' Admin Logged out sucessfully'})
})



const getAllUsers = asyncHandler(async (req,res) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).json({users}); 
    })
    
    .catch((error) => {
      console.log(error);
    });
})
console.log(getAllUsers,"getAllUsers");


const getAllTutors = asyncHandler(async (req,res)=>{
  fetchAllTutors()
  .then((tutor)=>{
    res.status(200).json({tutor})
  })
  .catch((error)=>{
    console.log(error);
  })
})


const updateUserData = asyncHandler( async (req, res) => {

  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;

  if(!userId){

      res.status(404);;

      throw new Error("UserId not received in request. User update failed.");

  }

  const userData = {userId: userId, name: name, email: email};

  const usersUpdateStatus = await updateUser(userData);

  if(usersUpdateStatus.success){

      const response = usersUpdateStatus.message;

      res.status(200).json({ message:response });

  }else{

      res.status(404);;

      throw new Error("User update failed.");

  }

});

const deleteUserData = asyncHandler( async (req, res) => {

  const userId = req.body.userId;

  const usersDeleteStatus = await deleteUser(userId);

  if(usersDeleteStatus.success){

      const response = usersDeleteStatus.message;

      res.status(200).json({ message:response });

  }else{

      res.status(404);

      const response = usersDeleteStatus.message;

      throw new Error(response);

  }

});
const listUserProfile = asyncHandler(async (req, res) => {
  const userList = await User.find();

  res.status(200).json(userList);
});

const listTutorList = asyncHandler(async(req,res)=>{
  const tutorList = await Tutor.find();
  res.status(200).json(tutorList)
})

const blockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const blockTrue = {
    isBlocked: true,
  };
  const blockUser = await User.findByIdAndUpdate(userId, blockTrue);
  if (blockUser) {
    res.status(200).json({ message: "user blocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  console.log(req.body.userId, "req.body.userId");
  const unblockFalse = {
    isBlocked: false,
  };
  const blockUser = await User.findByIdAndUpdate(userId, unblockFalse);

  if (blockUser) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});


//tutor listing and edit in admin side 


const deleteTutorData = asyncHandler( async (req, res) => {

  const tutorId = req.body.tutorId;

  const tutorDeleteStatus = await deleteTutor(tutorId);

  if(tutorDeleteStatus.success){

      const response = tutorDeleteStatus.message;

      res.status(200).json({ message:response });

  }else{

      res.status(404);

      const response = tutorDeleteStatus.message;

      throw new Error(response);

  }

});


const blockTutor = asyncHandler(async (req, res) => {
  const tutorId = req.body.tutorId;
  const blockTrue = {
    isBlocked: true,
  };
  const blockTutor = await Tutor.findByIdAndUpdate(tutorId, blockTrue);
  if (blockTutor) {
    res.status(200).json({ message: "Tutor blocked sucessfully" });
  } else {
    res.status(404).json({ message: "Tutor not found" });
  }
});

const unblockTutor = asyncHandler(async (req, res) => {
  const tutorId = req.body.tutorId;
  console.log(req.body.tutorId, "req.body.tutorId");
  const unblockFalse = {
    isBlocked: false,
  };
  const blockTutor = await Tutor.findByIdAndUpdate(tutorId, unblockFalse);

  if (blockTutor) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});


const getDomains = asyncHandler(async(req,res)=>{
  const domains = await Domain.find();
  res.status(200).json(domains)
})

const addDomain = asyncHandler(async(req,res)=>{
  const domainName = req.body.domainName;
  if(Domain.domainName !== domainName){
    const domain = await Domain.create({
      domainName
    })
    res.status(200).json({domain : domain.domainName})
  }else{
    res.status(400).json({ message : "Domain already exist "})
  }

})

const deleteDomain = asyncHandler(async (req, res) => {
  const domainName = req.params.domainName;
  const deleteDomain = await Domain.findOneAndDelete({ domainName });
  if (deleteDomain) {
    res.status(200).json({ message: "Domain deleted Successfully" });
  } else {
    res.status(404).json({ message: "Domain not found" });
  }
});



// const deleteCourseData = asyncHandler( async (req, res) => {

//   const tutorId = req.body.tutorId;
//   const courseDeleteStatus = await deleteCourse(tutorId);
//   if(courseDeleteStatus.success){

//       const response = courseDeleteStatus.message;

//       res.status(200).json({ message:response });

//   }else{

//       res.status(404);

//       const response = courseDeleteStatus.message;

//       throw new Error(response);

//   }

// });




const allCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find()
    .populate("tutorId", "name")
    .populate("domain", "domainName");
  res.status(200).json(courses);
});

const approveCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const approve = { approved: true, rejected: false };
  const course = await Courses.findByIdAndUpdate(courseId, approve);
  if (course) {
    res.status(200).json({ message: "successfully updated the course" });
  } else {
    res.status(404).json({ Error: "Course not found" });
  }
});


// const rejectCourse = asyncHandler(async (req, res) => {
//   const { courseId } = req.body;
//   const reject = { approved: false, rejected: true };
//   const course = await Courses.findByIdAndUpdate(courseId, reject);
//   if (course) {
//     res.status(200).json({ message: "successfully updated the course" });
//   } else {
//     res.status(404).json({ Error: "Course not found" });
//   }
// });

const rejectCourse = asyncHandler(async (req, res) => {
  const { courseId, rejectionReason } = req.body;
  const reject = { approved: false, rejected: true, rejectionReason };
  const course = await Courses.findByIdAndUpdate(courseId, reject);
  if (course) {
    res.status(200).json({ message: "successfully updated the course" });
  } else {
    res.status(404).json({ Error: "Course not found" });
  }
});




const addPlans = asyncHandler(async (req, res) => {
  const plan = req.body;

  try {
    const addedPlan = await Plan.create(plan);

    if (addedPlan) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    // Handle errors, you might want to customize this part based on your needs
    console.error(error);
    toast.error(ValidationError)
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const getPlans = asyncHandler(async (req, res) => {
  try {
    const plans = await Plan.find({}).sort({ _id: -1 });

    if (plans) {
      res.status(200).json(plans);
    } else {
      res.status(404).json({ message: "Plans not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// export default getPlans;



const getSubscriptions = asyncHandler(async (req, res) => {
  try {
    console.log("In the admin getsubbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    const subscriptions = await Payment.find({}).sort({ _id: -1 });
  //  console.log(subscriptions,"subscriptions");

    if (subscriptions) {
      res.status(200).json(subscriptions);
    } else {
      res.status(404).json({ message: "Subscriptions not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const getCounts = asyncHandler(async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const tutorCount = await Tutor.countDocuments();
    const coursesCount = await Courses.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        usersCount,
        tutorCount,
        coursesCount,
      },
      message: "Total revenue and shares calculated successfully.",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});



const getCourseCountPerDomain = asyncHandler(async (req, res) => {
  try {
    // Use aggregation to count courses for each domain
    const domainCourseCounts = await Courses.aggregate([
      {
        $group: {
          _id: "$domain",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "domains", // Use the actual name of your Domain collection
          localField: "_id",
          foreignField: "_id",
          as: "domainInfo",
        },
      },
      {
        $unwind: "$domainInfo",
      },
      {
        $project: {
          domainName: "$domainInfo.domainName",
          count: 1,
        },
      },
    ]);

    // Map domainCourseCounts to an object for easy access in the frontend
    const courseCountsPerDomain = {};
    domainCourseCounts.forEach((entry) => {
      courseCountsPerDomain[entry.domainName] = entry.count;
    });

    res.status(200).json(courseCountsPerDomain);
  } catch (error) {
    console.error("Error getting course count per domain:", error);
    throw error;
  }
});


const getCoursePurchaseData = asyncHandler(async (req, res) => {
  try {
    // Fetch course name and purchase count data
    const courseData = await Courses.find({}, "courseName purchaseCount");

    const payment = await Payment.find({})

    const courseNames = courseData.map((course) => course.courseName);
    
    const purchaseCount = payment.map((payement)=> payement.purchaseCount )

    res.status(200).json({
      success: true,
      data: {
        courseNames,
        
        purchaseCount
      },
      message: "Course purchase data retrieved successfully.",
    });
  } catch (error) {
    console.error("Error getting course purchase data:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});










// const getTotalSalesPerMonth = asyncHandler(async (req, res) => {
//   try {
//     const result = await Orders.aggregate([
//       {
//         $unwind: "$purchasedCourses",
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$purchasedCourses.date" },
//             month: { $month: "$purchasedCourses.date" },
//           },
//           totalSales: { $sum: "$purchasedCourses.price" },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Total sales per month retrieved successfully.",
//     });
//   } catch (error) {
//     console.error("Error getting total sales per month:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// });
// const getTotalSalesPerDay = asyncHandler(async (req, res) => {
//   try {
//     const result = await Orders.aggregate([
//       {
//         $unwind: "$purchasedCourses",
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$purchasedCourses.date" },
//             month: { $month: "$purchasedCourses.date" },
//             day: { $dayOfMonth: "$purchasedCourses.date" },
//           },
//           totalSales: { $sum: "$purchasedCourses.price" },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Total sales per day retrieved successfully.",
//     });
//   } catch (error) {
//     console.error("Error getting total sales per day:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// });
// const getTotalSalesPerWeek = asyncHandler(async (req, res) => {
//   try {
//     const result = await Orders.aggregate([
//       {
//         $unwind: "$purchasedCourses",
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$purchasedCourses.date" },
//             month: { $month: "$purchasedCourses.date" },
//             week: { $week: "$purchasedCourses.date" },
//           },
//           totalSales: { $sum: "$purchasedCourses.price" },
//         },
//       },
//     ]);
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Total sales per week retrieved successfully.",
//     });
//   } catch (error) {
//     console.error("Error getting total sales per week:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// });




export  {authAdmin ,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    updateUserData,
    deleteUserData,
    blockUser,
    unblockUser,
    listUserProfile,
    listTutorList,
    getAllTutors,


    deleteTutorData,
    unblockTutor,
    blockTutor,

    getDomains,
    addDomain,
    deleteDomain,

    // courseListing,
    // deleteCourseData,

    allCourses,
    approveCourse,
    rejectCourse,

    addPlans,
    getPlans,
    getSubscriptions,

    getCounts,
    getCourseCountPerDomain,
  //   getTotalSalesPerMonth,
  // getTotalSalesPerDay,
  // getTotalSalesPerWeek,

   getCoursePurchaseData,



}





