import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.js";

///Check if user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Login first to access this resource", 401)); /// 401 status code for unauthorized
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
})

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if(!roles.includes(req.user.role)) {
            return next( new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))

        }
     next();
    };
};