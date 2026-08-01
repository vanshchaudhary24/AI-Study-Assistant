import dotenv from "dotenv";
dotenv.config();
import "./config/env";

import app from "./app";
import connectDatabase from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("Server failed to start");
    process.exit(1);
  }
};

startServer();