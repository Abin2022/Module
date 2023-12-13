import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
const JWT_SECRET = "abc123"


const protectRoute = asyncHandler(async (req, res, next) => {
   console.log("in auth  ..tutor.........");
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Decoded JWT:", decoded); // Log decoded JWT for debugging
      req.tutor = await Tutor.findById(decoded.tutorId).select("-password");
      console.log("Tutor information:", req.tutor); 
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});


export { protectRoute };

