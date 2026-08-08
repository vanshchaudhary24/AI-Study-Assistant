import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { refreshAccessToken, updateProfile, uploadAvatar } from "../services/user.service";
import { changePasswordSchema, updateProfileSchema } from "../validators/auth.validator";

import {
  registerSchema,
  verifyOTPSchema,
  loginSchema,
  resetPasswordSchema,
  deleteAccountSchema,
} from "../validators/auth.validator";

import {
  getCurrentUser,
  logoutUser,
  changePassword,
  registerUser,
  verifyOTP as verifyOTPService,
  loginUser,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  deleteAccount as deleteAccountService,
} from "../services/user.service";


export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    await registerUser(data);

    res.status(201).json({
      success: true,
      message: "OTP sent successfully. Please verify your email.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = verifyOTPSchema.parse(req.body);

    await verifyOTPService(data);

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    await forgotPasswordService({ email });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = resetPasswordSchema.parse(req.body);

    await resetPasswordService(data);

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMe = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await getCurrentUser(req.userId!);

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const { refreshToken } = req.body;

    const accessToken =
      await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      accessToken,
    });

  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {
    await logoutUser(req.userId!);

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeUserPassword = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const { oldPassword, newPassword } =
      changePasswordSchema.parse(req.body);

    await changePassword(
      req.userId!,
      oldPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================ update profile=========================
export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const body = updateProfileSchema.parse(req.body);

    const user = await updateProfile(
      req.userId!,
      body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= upload avatar=====================
export const uploadUserAvatar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
      return;
    }

    const user = await uploadAvatar(
      req.userId!,
      req.file.filename
    );

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully.",
      data: user,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

// =================== delete Account===========================
export const deleteUserAccount = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { password } =
      deleteAccountSchema.parse(req.body);

    await deleteAccountService(
      req.userId!,
      password
    );

    res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Failed to delete account.",
    });
  }
};