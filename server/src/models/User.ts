import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;

  googleId?: string;
  
  isEmailVerified: boolean;
  
  otp: string | undefined;
  otpExpires?: Date | undefined;

  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    avatar: {
      type: String,
      default: "",
    },
    googleId: {
        type: String,
        default: undefined,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: undefined,
    },
    otpExpires: {
        type: Date,
        default: undefined,
    },
    refreshToken: {
      type: String,
      default: undefined,
    },

    },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
