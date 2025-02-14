import express from "express";
import {
  ContactMessage,
  UserLogin,
  UserRegister,
  gatePass,
  generateQrCode,
  getCardByDate,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.get("/databydate", verifyToken, getCardByDate);
router.post("/contact", verifyToken, ContactMessage);
router.post("/gatepass", verifyToken, gatePass);
router.post("/generate-qr", verifyToken, generateQrCode);

export default router;
