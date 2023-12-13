
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
 import userHelper from "../helpers/userHelpers.js";
const JWT_SECRET = "abc123"


const protectRoute = asyncHandler(async (req, res, next) => {

  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
       req.user = await userHelper.findUserByIdForMiddleWare(decoded.userId);

      next();
    } catch (error) {
      res.status(401);

      throw new Error("not authorizes,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorizes,no token");
  }
});

const isBlocked = asyncHandler(async (req, res, next) => {
  // console.log("Entered into user auth middleware..");

  let token;

  token = req.cookies.jwt;
  // console.log(token,"isblocked userauth token");

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await userHelper.findUserByIdForMiddleWare(
        decoded.userId
      );
      // console.log(!user.blocked,"!user.blocked");
      if (!user.blocked) {

        next();
      }

      // else if (user.blocked === true) {
      //   res.status(403); // Forbidden
    
      //   throw new Error("User is blocked. Please contact support for assistance.");
      // }
      
      else {
       
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

        res.status(401);

        throw new Error("not authorizes,invalid token");
        
      }
    } catch (error) {
      res.status(401);

      throw new Error("not authorizes,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorizes,no token");
  }
});

const loginBlockCheck = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  const user = await userHelper.findByEmail({ email });

  if (!user) {
    res.status(403); // Forbidden

    throw new Error("please signup to login");
  }

  if (user.blocked === true) {
    res.status(403); // Forbidden

    throw new Error("User is blocked. Please contact support for assistance.");
  }

  next();
});

export { protectRoute, isBlocked, loginBlockCheck };