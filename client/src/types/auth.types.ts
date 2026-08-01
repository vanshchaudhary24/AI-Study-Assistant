export interface User {
  _id?: string;
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role?: string;
  isEmailVerified?: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;

  data: {
    accessToken: string;
    refreshToken: string;

    user: User;
  };
}