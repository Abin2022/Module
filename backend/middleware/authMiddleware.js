import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
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



const isBlocked = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId);

      if (!user.blocked) {
        next();
      } else {
        // Clear the JWT cookie
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

        // Redirect to the login page
        res.redirect('/login');
      }
    } catch (error) {
      // Clear the JWT cookie on token verification failure
      res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

      // Redirect to the login page
      res.redirect('/login');
    }
  } else {
    // No token provided
    res.status(401);
    throw new Error("not authorized, no token");
  }
});


export { protect,isBlocked };


