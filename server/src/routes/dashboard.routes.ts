import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getDashboardData,
} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  getDashboardData
);

export default router;