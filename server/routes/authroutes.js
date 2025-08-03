// ✅ routes/authroutes.js
import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser
} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser)
export default router;
