import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  console.log("Enter Into MIddleware....");
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded); // Log decoded JWT for debugging
      req.tutor = await Tutor.findById(decoded.tutorId).select("-password");
      console.log("Tutor information:", req.tutor); // Log tutor information for debugging
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

