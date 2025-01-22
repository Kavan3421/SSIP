import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    const exitingUser = await User.findOne({ email }).exec();
    if (exitingUser) {
      return next(createError(409, "Email already exists"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const getCardByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const otherUsers = req.query.otherUsers === "true"; // Check for otherUsers flag

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    // Query based on otherUsers flag
    const query = otherUsers
      ? { userId: { $ne: userId }, timestamp: { $gte: startOfDay, $lt: endOfDay } } // Exclude logged-in user's entries
      : { userId: userId, timestamp: { $gte: startOfDay, $lt: endOfDay } };

    const todaysEntries = await EntryExit.find(query); // Assuming "EntryExit" is the model

    // Transform data for the frontend
    const formattedEntries = todaysEntries.map((entry) => ({
      type: entry.type, // Entry or Exit
      time: entry.timestamp.toLocaleString(), // Format timestamp for display
    }));

    return res.status(200).json({ formattedEntries });
  } catch (err) {
    next(err);
  }
};


export const ContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return next(createError(400, "All fields are required."));
    }

    const contactMessage = new Feedback({
      name,
      email,
      message,
    });

    const savedMessage = await contactMessage.save();

    return res
      .status(201)
      .json({ message: "Your message has been submitted successfully.", contact: savedMessage });
  } catch (err) {
    next(err);
  }
};