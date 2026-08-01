import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const accessToken =
      params.get("accessToken");

    const refreshToken =
      params.get("refreshToken");

    if (
      accessToken &&
      refreshToken
    ) {

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "refreshToken",
        refreshToken
      );

      navigate("/dashboard");

    } else {

      navigate("/login");

    }

  }, []);

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

      Signing you in...

    </div>

  );

};

export default GoogleSuccess;