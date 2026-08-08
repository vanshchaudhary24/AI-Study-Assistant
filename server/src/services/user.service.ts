import User from "../models/User";
import jwt from "jsonwebtoken";
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken,
} from "./auth.service";
import {
  generateOTP,
  hashOTP,
  otpExpiry,
} from "../utils/otp";
import { sendOTPEmail } from "./email.service";
import is from "zod/v4/locales/is.js";

interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

interface VerifyOTPInput {
  email: string;
  otp: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface ResetPasswordInput {
  email: string;
  otp: string;
  password: string;
}

// --------------------register user-----------------------
export const registerUser = async ({
  fullName,
  email,
  password,
}: RegisterUserInput) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await hashPassword(password);

  const otp = generateOTP();

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    otp: hashOTP(otp),
    otpExpires: otpExpiry(),
    isEmailVerified: false,
  });

  await sendOTPEmail(email, otp);

  return user;
};

// --------------verify otp---------------------
export const verifyOTP = async ({
  email,
  otp,
}: VerifyOTPInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.otp || !user.otpExpires) {
    throw new Error("OTP not found");
  }

  if (new Date() > user.otpExpires) {
    throw new Error("OTP has expired.");
  }

  const hashedOTP = hashOTP(otp);

  if (hashedOTP !== user.otp) {
    throw new Error("Invalid OTP.");
  }

  user.isEmailVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return user;
};
// =============logout user ==========================
export const logoutUser = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.refreshToken = undefined;

    await user.save();
};

// ----------------Login User function() ----------------------------
export const loginUser = async ({
  email,
  password,
}: LoginUserInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email first.");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password.");
  }

  const accessToken = generateToken(String(user._id));

const refreshToken = generateRefreshToken(String(user._id));

user.refreshToken = refreshToken;

await user.save();

return {
    accessToken,
    refreshToken,
    user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
    },
};
}

export const forgotPassword = async ({
  email,
}: ForgotPasswordInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  const otp = generateOTP();

  user.otp = hashOTP(otp);
  user.otpExpires = otpExpiry();

  await user.save();

  await sendOTPEmail(
    email,
    otp
  );

  return;
};

// =====================reset password==============================

export const resetPassword = async ({
  email,
  otp,
  password,
}: ResetPasswordInput) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.otp || !user.otpExpires) {
    throw new Error("OTP not found.");
  }

  if (new Date() > user.otpExpires) {
    throw new Error("OTP has expired.");
  }
  const hashedOTP = hashOTP(otp);

  if (hashedOTP !== user.otp) {
    throw new Error("Invalid OTP.");
  }
  user.password = await hashPassword(password);

  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();
  return;
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password -otp");

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

export const refreshAccessToken = async (
    refreshToken: string
) => {

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
    ) as jwt.JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token.");
    }

    const accessToken = generateToken(user.id);

    return accessToken;
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const isMatch = await comparePassword(
    oldPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Old password is incorrect.");
  }

  if (oldPassword === newPassword) {
    throw new Error(
      "New password must be different from the old password."
    );
  }

  user.password = await hashPassword(newPassword);

  await user.save();
};

export const updateProfile = async (
  userId: string,
  data: {
    fullName?: string;
    avatar?: string;
  }
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (data.fullName !== undefined) {
    user.fullName = data.fullName;
  }

  if (data.avatar !== undefined) {
    user.avatar = data.avatar;
  }

  await user.save();
  return user;
};

export const uploadAvatar = async (
  userId: string,
  filename: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  user.avatar = `/uploads/avatars/${filename}`;

  await user.save();
  return user;
};

// ======================== dlete account========================
export const deleteAccount = async (
  userId: string,
  password: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Incorrect password.");
  }

  await User.findByIdAndDelete(userId);
  return;
  
};