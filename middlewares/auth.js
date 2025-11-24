import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
   console.log('Cookies received:', req.cookies); // Debug log
  console.log('Headers received:', req.headers); // Debug log
  const { token } = req.cookies;
  if (!token) {
    console.log('No token found in cookies'); // Debug log
    return next(new ErrorHandler("User not Authenticated!", 400));
  }
   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    console.log('User authenticated:', req.user.email); // Debug log
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message); // Debug log
    return next(new ErrorHandler("User not Authenticated!", 400));
  }
});
