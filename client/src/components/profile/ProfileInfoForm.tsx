import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/auth.service";

const ProfileInfoForm = () => {

  const { user } = useAuth();

  const [fullName, setFullName] =
    useState(user?.fullName || "");

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {

    try {

      setLoading(true);

      const response =
        await updateProfile(fullName);

      toast.success(
        response.message
      );

      window.location.reload();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Personal Information
      </h2>

      <div className="space-y-5">

        <input
          value={fullName}
          onChange={(e)=>
            setFullName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

        <input
          value={user?.email}
          readOnly
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >

          {loading
            ? "Saving..."
            : "Save Changes"}

        </button>

      </div>

    </div>

  );

};

export default ProfileInfoForm;