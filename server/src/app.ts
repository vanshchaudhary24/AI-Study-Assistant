import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import session from "express-session"
import passport from "./config/passport";
import googleRoutes from "./routes/google.routes";
import path from "path";
import { errorHandler, notFound } from "./middleware/error.middleware";
import { timeStamp } from "console";
import documentRoutes from "./routes/document.routes";
import chatRoutes from "./routes/chat.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import analyticsRoutes from "./routes/analytics.routes";


const app = express();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet({
  crossOriginResourcePolicy: false,
})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", googleRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/api/documents", documentRoutes);
app.use( "/api/chat" , chatRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);


// health check route ==============================================
// ================================================================


app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "AI Study Assistant API is running 🚀",
    uptime: process.uptime(),
    timeStamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(notFound);
app.use(errorHandler);

export default app;