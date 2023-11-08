

import asyncHandler from 'express-async-handler'
 import generateToken from '../utils/generateTokenAdmin.js'
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import Tutor from '../models/tutorModel.js'
import { fetchAllUsers , updateUser, deleteUser, fetchAllTutors ,
  deleteTutor,
} from "../helpers/adminHelpers.js";

import Domain from '../models/domainModel.js'

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
console.log(getAllTutors,"getall tutors");


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
    deleteDomain

}





