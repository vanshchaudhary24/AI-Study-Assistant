import api from "./api";

import type {
  RegisterRequest,
  VerifyOTPRequest,
  LoginRequest,
  User,
} from "../types/auth.types";

export const registerUser = async (
  data: RegisterRequest
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const verifyOTP = async (
  data: VerifyOTPRequest
) => {
  const response = await api.post(
    "/auth/verify-otp",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginRequest
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get(
    "/auth/me"
  );

  return response.data;
};

export const forgotPassword = async (
  email: string
) => {
  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      password,
    }
  );

  return response.data;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {

  const response = await api.post(
    "/auth/change-password",
    {
      oldPassword,
      newPassword,
    }
  );

  return response.data;

};

export const updateProfile = async (
  fullName: string
) => {

  const response = await api.put(
    "/auth/profile",
    {
      fullName,
    }
  );

  return response.data;

};

export const uploadAvatar = async (
  file: File
) => {

  const formData = new FormData();

  formData.append(
    "avatar",
    file
  );

  const response =
    await api.post(
      "/auth/upload-avatar",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;

};

export const refreshToken = async (
  refreshToken: string
) => {

  const response =
    await api.post(
      "/auth/refresh-token",
      {
        refreshToken,
      }
    );

  return response.data;

};