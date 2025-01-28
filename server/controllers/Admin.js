import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

export const AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    // Connect to the "test" database
    const db = mongoose.connection.useDb("test");

    // Access the "admin" collection
    const adminCollection = db.collection("admin");

    // Find the admin user with the provided email
    const admin = await adminCollection.findOne({ email });
    if (!admin) {
      return next(createError(404, "Admin not found"));
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT, {
      expiresIn: "24h",
    });

    // Respond with the token and admin details (excluding the password)
    return res.status(200).json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name, // Adjust based on available fields
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getCardByDate = async (req, res, next) => {
  try {
    // Get the date from the query or use the current date
    const date = req.query.date ? new Date(req.query.date) : new Date();
    console.log(date);

    // Define the start and end of the day
    // const startOfDay = new Date(
    //   date.getFullYear(),
    //   date.getMonth(),
    //   date.getDate()
    // );
    // const endOfDay = new Date(
    //   date.getFullYear(),
    //   date.getMonth(),
    //   date.getDate() + 1
    // );
    const startOfDay = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const endOfDay = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    );

    // Access the database and collections
    const db = mongoose.connection.db;
    const entryCollection = db.collection("rfid_logs_entry");
    const exitCollection = db.collection("rfid_logs_exit");
    const usersCollection = db.collection("users");
    // Fetch entry and exit logs for the given date range
    const entryLogs = await entryCollection
      .find({ timestamp: { $gte: startOfDay, $lt: endOfDay } })
      .toArray();
    const exitLogs = await exitCollection
      .find({ timestamp: { $gte: startOfDay, $lt: endOfDay } })
      .toArray();
      
    // Check if logs are found
    if (!entryLogs.length && !exitLogs.length) {
      return res
        .status(404)
        .json({ message: "No logs found for the specified date." });
    }

    // Combine and categorize logs by RFID tag
    const logsByTag = {};
    const allLogs = [...entryLogs, ...exitLogs];

    for (const log of allLogs) {
      const { rfid_tag, timestamp } = log;

      // Determine log type (entry or exit)
      const type = entryLogs.includes(log) ? "entry" : "exit";

      // Adjust timestamp for IST (UTC+5:30)
      const utcDate = new Date(timestamp);
      const adjustedDate = new Date(utcDate.getTime() - 5.5 * 60 * 60 * 1000);
      const formattedTimestamp = adjustedDate.toLocaleString("en-IN", {
        hour12: true,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const user = await usersCollection.findOne({ rfid_tag });
      const enrollmentNumber = user ? user.enrollmentNumber : "Unknown";
      const name = user ? user.name : "Unknown";

      // Group logs by RFID tag
      if (!logsByTag[rfid_tag]) {
        logsByTag[rfid_tag] = { logs: [] };
      }
      logsByTag[rfid_tag].logs.push({
        type,
        enrollmentNumber,
        name,
        timestamp: formattedTimestamp,
      });
    }

    // Respond with the grouped logs
    res.status(200).json({ logs: logsByTag });
  } catch (err) {
    console.error("Error in getCardByDate:", err);
    next(err);
  }
};
