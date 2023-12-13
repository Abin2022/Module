import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
const JWT_SECRET = "abc123"



const protect = asyncHandler(async (req, res, next) => {
  console.log("Entered into admin auth");
  let token;
  // token = req.cookies.jwt;
  token = req.cookies.adminJwt;
  console.log(token,"token");
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = await Admin.findById(decoded.adminId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("invalid token");
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }
});

export { protect };
