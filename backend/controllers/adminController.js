

import asyncHandler from 'express-async-handler'
 import generateToken from '../utils/generateTokenAdmin.js'
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'
import { fetchAllUsers , updateUser, deleteUser} from "../helpers/adminHelpers.js";


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



export  {authAdmin ,
    registerAdmin,
    logoutAdmin,
    getAllUsers,
    updateUserData,
    deleteUserData,
    blockUser,
    unblockUser

}





