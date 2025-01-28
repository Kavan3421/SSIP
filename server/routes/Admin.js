import express from "express";
import {
  AdminLogin,
  getCardByDate
} from "../controllers/Admin.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.post("/signin", AdminLogin);

router.get("/databydate", verifyAdminToken, getCardByDate);

export default router;
