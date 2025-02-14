import mongoose from "mongoose";

const QrCodeSchema = new mongoose.Schema({
  qrData: { type: String, required: true, unique: true },
  reason: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("QrCode", QrCodeSchema);
