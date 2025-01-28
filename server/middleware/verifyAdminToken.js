import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { createError } from "../error.js";

export const verifyAdminToken = async (req, res, next) => {
  try {
    // Check if the authorization header exists
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Extract the token
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(createError(401, "You are not authenticated!"));

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT);
    if (!decoded || !decoded.id) {
      return next(createError(403, "Invalid token!"));
    }

    // Connect to the "test" database and access the "admin" collection
    const db = mongoose.connection.useDb("test");
    const adminCollection = db.collection("admin");

    // Find the admin using the decoded ID from the token
    const admin = await adminCollection.findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
    if (!admin) {
      return next(createError(404, "Admin not found!"));
    }

    // Attach the admin details to the request object
    req.admin = admin;
    next();
  } catch (err) {
    console.error("Error in verifyAdminToken:", err);
    next(createError(403, "Token is invalid or expired!"));
  }
};
