import { authenticate } from "../middleware/auth.middleware";
import { Router } from "express";
import { authLimiter }  from "../middleware/rateLimiter";

import {
  getMe, register,  refreshToken,
  verifyOTP,
  login,  forgotPassword,
  resetPassword, logout,
  changeUserPassword,updateUserProfile, 
  uploadUserAvatar , 
} from "../controllers/auth.controller";
import {upload } from "../middleware/upload.middleware";

const router = Router();

router.get("/me",authenticate, getMe);

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token",refreshToken);
router.post("/logout",authenticate,logout);
router.post("/change-password",authenticate,changeUserPassword);
router.post("/upload-avatar", authenticate, upload.single("avatar"),uploadUserAvatar);

router.post( "/register" , authLimiter , register);
router.post( "/login" , authLimiter ,login);
router.post("/forgot-password",authLimiter, forgotPassword );
router.post("/verify-otp",authLimiter, verifyOTP );
router.post("/reset-password", authLimiter, resetPassword);

router.put("/profile",authenticate,updateUserProfile);

export default router;