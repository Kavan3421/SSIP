import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    photos: {
      type: [String], // Array of file paths or URLs
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
