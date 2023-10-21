


import jwt from "jsonwebtoken";

const genToken = (res, tutorId) => {
  const token = jwt.sign({ tutorId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    //30 days 
   maxAge: 30 * 24 * 60 * 60 * 1000,

    // 2 minute expiration time
    // maxAge: 120 * 1000,
  });
};
export default genToken;
