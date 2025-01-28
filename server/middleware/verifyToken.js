import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(createError(401, "You are not authenticated!"));
    console.log(token)

    const decoded = jwt.verify(token, process.env.JWT);
    if (!decoded || !decoded.id) {
      return next(createError(403, "Invalid token!"));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    req.user = user.toObject();
    next();
  } catch (err) {
    next(createError(403, "Token is invalid or expired!"));
  }
};
