import { authenticate } from "../middleware/auth.middleware";
import { Router } from "express";
import { authLimiter } from "../middleware/rateLimiter";

import {
  getMe, register, refreshToken,
  verifyOTP,
  login, forgotPassword,
  resetPassword, logout,
  changeUserPassword, updateUserProfile,
  uploadUserAvatar,
  deleteUserAccount,
} from "../controllers/auth.controller";

import { upload } from "../middleware/upload.middleware";

const router = Router();

router.get("/me", authenticate, getMe);

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/verify-otp", authLimiter, verifyOTP);
router.post("/reset-password", authLimiter, resetPassword);

router.post("/refresh-token", refreshToken);

router.post("/logout", authenticate, logout);
router.post("/change-password", authenticate, changeUserPassword);
router.post("/upload-avatar",
  authenticate,
  upload.single("avatar"), 
  uploadUserAvatar
);

router.put("/profile", authenticate, updateUserProfile);

router.delete(
  "/account",
  authenticate,
  deleteUserAccount
);

export default router;