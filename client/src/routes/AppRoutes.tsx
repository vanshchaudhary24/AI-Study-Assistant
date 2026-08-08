import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

import Dashboard from "../pages/Dashboard/Dashboard";
import Upload from "../pages/Upload/Upload";
import Quiz from "../pages/Quiz/Quiz";
import Profile from "../pages/Profile/Profile";
import GoogleSuccess  from "../pages/Auth/GoogleSuccess";
import Documents from "../pages/Documents/Documents";
import Chat from "../pages/Chat/Chat";
import Settings from "../pages/Settings/Settings";


import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- Public ++++++++++++++ */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOTP />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route 
        path="/auth/google-success"
        element={<GoogleSuccess/>}
        />

        {/* ---------- Protected +++++++++++++++ */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<Upload />}
          />

          <Route 
          path="/documents"
          element={<Documents />}
          />

          <Route 
          path="/chat"
          element={<Chat />}
          />

          <Route
            path="/quiz"
            element={<Quiz />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
          path="/settings"
          element={<Settings/>}
          />


        </Route>

        {/* ---------- 404 ---------- */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;