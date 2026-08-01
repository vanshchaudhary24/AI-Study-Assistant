import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { uploadAvatar } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

const AvatarUpload = () => {

  const inputRef =
    useRef<HTMLInputElement>(null);

  const {
     user,
     refreshUser,
   } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async (
    file: File
  ) => {

    try {

      setLoading(true);

      const response =
        await uploadAvatar(file);

      toast.success(
        response.message
      );

     await refreshUser;

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Upload failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Profile Picture
      </h2>

      <div className="flex flex-col items-center gap-5">

        <img
          src={
            user?.avatar
              ? `${import.meta.env.VITE_API_URL?.replace("/api","")}${user.avatar}`
              : "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user?.fullName || "User")
          }
          alt="avatar"
          className="h-36 w-36 rounded-full border-4 border-slate-700 object-cover"
        />

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e)=>{

            if(
              e.target.files &&
              e.target.files.length>0
            ){

              handleUpload(
                e.target.files[0]
              );

            }

          }}
        />

        <button
          disabled={loading}
          onClick={()=>
            inputRef.current?.click()
          }
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >

          {loading
            ? "Uploading..."
            : "Upload Avatar"}

        </button>

      </div>

    </div>

  );

};

export default AvatarUpload;